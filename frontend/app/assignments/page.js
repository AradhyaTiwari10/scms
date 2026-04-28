"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAssignments, submitAssignment } from "../../services/assignmentService";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionTexts, setSubmissionTexts] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchAssignments();
  }, [router]);

  const fetchAssignments = async () => {
    try {
      const data = await getAssignments();
      setAssignments(data.assignments || data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (id, text) => {
    setSubmissionTexts((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const handleSubmit = async (assignmentId) => {
    const text = submissionTexts[assignmentId];
    if (!text || text.trim() === "") {
      alert("Please enter submission text");
      return;
    }

    try {
      await submitAssignment(assignmentId, text);
      alert("Successfully submitted assignment!");
      setSubmissionTexts((prev) => ({
        ...prev,
        [assignmentId]: "",
      }));
    } catch (err) {
      alert(err.message || "Failed to submit assignment");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading assignments...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Assignments</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {assignments.length === 0 && !error ? (
        <p className="text-gray-500 text-center py-8">No assignments available.</p>
      ) : (
        <div className="space-y-6">
          {assignments.map((assignment) => {
            const id = assignment._id || assignment.id;
            return (
              <div 
                key={id} 
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{assignment.title}</h2>
                  {assignment.dueDate && (
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{assignment.description}</p>
                
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Submission
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3 text-gray-800"
                    rows="3"
                    placeholder="Type your submission here..."
                    value={submissionTexts[id] || ""}
                    onChange={(e) => handleTextChange(id, e.target.value)}
                  />
                  <button
                    onClick={() => handleSubmit(id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-blue-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

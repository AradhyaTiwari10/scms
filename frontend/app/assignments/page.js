"use client";

import { useEffect, useState } from "react";
import { getAssignments, submitAssignment } from "../../services/assignmentService";
import { isAuthenticated } from "../../utils/auth";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionTexts, setSubmissionTexts] = useState({});

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    fetchAssignments();
  }, []);

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

  if (loading) return <div className="p-8 text-center text-gray-500">Loading assignments...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Assignments</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 shadow-md">
          {error}
        </div>
      )}

      {assignments.length === 0 && !error ? (
        <p className="text-gray-500 text-center py-8">No assignments available.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {assignments.map((assignment) => {
            const id = assignment._id || assignment.id;
            return (
              <div 
                key={id} 
                className="bg-white shadow-md rounded-lg p-4 flex flex-col"
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
                    className="w-full border border-gray-300 rounded-lg p-3 mb-3 text-gray-800"
                    rows="3"
                    placeholder="Type your submission here..."
                    value={submissionTexts[id] || ""}
                    onChange={(e) => handleTextChange(id, e.target.value)}
                  />
                  <button
                    onClick={() => handleSubmit(id)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
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

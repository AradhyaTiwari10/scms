"use client";

import { useEffect, useState } from "react";
import { getAssignments, submitAssignment, createAssignment } from "../../services/assignmentService";
import { getUserSubmissions } from "../../services/submissionService";
import { getCourses } from "../../services/courseService";
import { isAuthenticated, getUserRole } from "../../utils/auth";
import { ClipboardList, Plus, X, Calendar, BookOpen, Send, CheckCircle2 } from "lucide-react";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionTexts, setSubmissionTexts] = useState({});
  const [submittedStatus, setSubmittedStatus] = useState({});
  const [role, setRole] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: "", description: "", courseId: "", dueDate: "" });
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    const currentRole = getUserRole();
    setRole(currentRole);
    fetchData(currentRole);
  }, []);

  const fetchData = async (currentRole) => {
    try {
      const data = await getAssignments();
      const assignmentData = data.data || data.assignments || (Array.isArray(data) ? data : []);
      setAssignments(assignmentData);
      
      if (currentRole === "faculty" || currentRole === "admin") {
        const courseData = await getCourses();
        const courseList = courseData.data || courseData.courses || (Array.isArray(courseData) ? courseData : []);
        setCourses(courseList);
      } else if (currentRole === "student") {
        // Fetch student's own submissions to mark as completed in UI
        const subData = await getUserSubmissions();
        const subs = subData.data || [];
        const statusMap = {};
        subs.forEach(s => {
          statusMap[s.assignment] = s; // Store full object to access grade
        });
        setSubmittedStatus(statusMap);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (id, text) => {
    setSubmissionTexts((prev) => ({ ...prev, [id]: text }));
  };

  const handleSubmit = async (assignmentId) => {
    const text = submissionTexts[assignmentId];
    if (!text || text.trim() === "") return;

    try {
      await submitAssignment(assignmentId, text);
      // Immediately fetch again to show submitted status
      fetchData(role);
      setSubmissionTexts((prev) => ({ ...prev, [assignmentId]: "" }));
    } catch (err) {
      alert(err.message || "Failed to submit assignment");
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    if (!newAssignment.title.trim() || !newAssignment.courseId || !newAssignment.dueDate) return;
    
    setCreateLoading(true);
    try {
      await createAssignment(newAssignment);
      setNewAssignment({ title: "", description: "", courseId: "", dueDate: "" });
      setShowAddForm(false);
      fetchData(role);
    } catch (err) {
      alert(err.message || "Failed to create assignment");
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fade-in-up w-full max-w-6xl mx-auto pb-10 pt-4">
      <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          <ClipboardList className="text-indigo-600" /> Assignments
        </h1>
        {(role === "faculty" || role === "admin") && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            {showAddForm ? <><X size={16} /> Close</> : <><Plus size={16} /> New Assignment</>}
          </button>
        )}
      </div>

      {showAddForm && (role === "faculty" || role === "admin") && (
        <div className="p-6 mb-8 bg-white border border-slate-200 shadow-sm rounded-xl">
          <form onSubmit={handleCreateAssignment} className="flex flex-col gap-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full rounded-lg p-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                <select
                  className="w-full rounded-lg p-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white"
                  value={newAssignment.courseId}
                  onChange={(e) => setNewAssignment({ ...newAssignment, courseId: e.target.value })}
                  required
                >
                  <option value="" disabled hidden>Select...</option>
                  {courses.map(course => (
                    <option key={course._id || course.id} value={course._id || course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full rounded-lg p-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                className="w-full rounded-lg p-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white resize-none"
                rows="3"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={createLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              >
                {createLoading ? "Saving..." : "Save Assignment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {assignments.length === 0 && !error ? (
        <div className="text-slate-500 text-sm py-10">No active assignments found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {assignments.map((assignment) => {
            const id = assignment._id || assignment.id;
            const submission = submittedStatus[id];
            return (
              <div 
                key={id} 
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col hover:border-indigo-200 transition-colors shadow-sm"
              >
                <div className="flex justify-between items-start mb-2 gap-3">
                  <h2 className="text-lg font-bold text-slate-900 break-words">{assignment.title}</h2>
                  {assignment.dueDate && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md whitespace-nowrap">
                      <Calendar size={12} />
                      {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>

                {assignment.course && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
                    <BookOpen size={12} className="text-slate-400" />
                    <span className="font-medium">{assignment.course.title || "Course"}</span>
                  </div>
                )}

                <p className="text-slate-500 text-sm mb-5 flex-grow">
                  {assignment.description || "No instructions provided."}
                </p>
                
                {role === "student" && (
                  <div className="mt-auto border-t border-slate-100 pt-4">
                    {submission ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} /> Submitted
                          </div>
                          {submission.grade && (
                            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-sm animate-bounce-subtle">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">Grade:</span>
                              <span className="text-sm font-black text-indigo-600">{submission.grade}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <textarea
                          className="w-full rounded-lg p-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white resize-none"
                          rows="2"
                          placeholder="Your response..."
                          value={submissionTexts[id] || ""}
                          onChange={(e) => handleTextChange(id, e.target.value)}
                        />
                        <button
                          onClick={() => handleSubmit(id)}
                          disabled={!submissionTexts[id]?.trim()}
                          className="flex items-center justify-center gap-1.5 w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        >
                          <Send size={14} /> Submit
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

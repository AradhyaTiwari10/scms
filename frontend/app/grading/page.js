"use client";

import { useEffect, useState } from "react";
import { getAssignments } from "../../services/assignmentService";
import { getSubmissions, gradeSubmission } from "../../services/submissionService";
import { isAuthenticated, getUserRole } from "../../utils/auth";
import { ClipboardList, User, CheckCircle, AlertCircle, Search, Star, BookOpen, Send } from "lucide-react";

export default function GradingPage() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gradingId, setGradingId] = useState(null);
  const [gradeData, setGradeData] = useState({ marks: 0, type: "Numeric" });

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    const currentRole = getUserRole();
    if (currentRole !== "faculty" && currentRole !== "admin") {
      window.location.href = "/dashboard";
      return;
    }
    setRole(currentRole);
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await getAssignments();
      setAssignments(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentSelect = async (assignmentId) => {
    setSelectedAssignment(assignmentId);
    if (!assignmentId) {
      setSubmissions([]);
      return;
    }

    try {
      setLoading(true);
      const data = await getSubmissions(assignmentId);
      setSubmissions(data.data || []);
    } catch (err) {
      setError("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleGrade = async (submissionId) => {
    try {
      setLoading(true);
      await gradeSubmission(submissionId, gradeData.marks, gradeData.type);
      // Refresh list
      const data = await getSubmissions(selectedAssignment);
      setSubmissions(data.data || []);
      setGradingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && assignments.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fade-in-up w-full max-w-6xl mx-auto pb-10 pt-4">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <Star className="text-amber-500" size={28} />
            Grading Center
          </h1>
          <p className="text-slate-500 text-xs mt-1 uppercase font-bold tracking-wider">Evaluate student submissions and provide feedback</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Select Assignment</label>
          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            value={selectedAssignment}
            onChange={(e) => handleAssignmentSelect(e.target.value)}
          >
            <option value="">Choose an assignment...</option>
            {assignments.map(a => (
              <option key={a._id} value={a._id}>{a.title} ({a.course?.title})</option>
            ))}
          </select>
        </div>

        {selectedAssignment && (
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Submissions ({submissions.length})
              </h2>
            </div>

            {submissions.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <ClipboardList size={32} />
                </div>
                <h3 className="text-slate-900 font-bold">No Submissions Found</h3>
                <p className="text-slate-500 text-xs mt-1">Students haven't submitted any work for this assignment yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {submissions.map((sub) => (
                  <div key={sub._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                    <div className="p-6 flex-grow border-b md:border-b-0 md:border-r border-slate-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                          {sub.student?.name?.charAt(0) || "S"}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{sub.student?.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase">{sub.student?.email}</p>
                        </div>
                        <div className="ml-auto text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Submitted {new Date(sub.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p className="text-sm text-slate-700 leading-relaxed italic">"{sub.submissionText}"</p>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-50/50 w-full md:w-72 flex flex-col justify-center gap-4">
                      {sub.grade ? (
                        <div className="text-center">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Grade</label>
                          <div className="text-2xl font-black text-indigo-600">{sub.grade}</div>
                          <button 
                            onClick={() => setGradingId(sub._id)}
                            className="mt-3 text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors"
                          >
                            Update Grade
                          </button>
                        </div>
                      ) : gradingId === sub._id ? (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Grade Strategy</label>
                            <select
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                              value={gradeData.type}
                              onChange={(e) => setGradeData({ ...gradeData, type: e.target.value, marks: e.target.value === "Letter" ? "A" : 0 })}
                            >
                              <option value="Numeric">Numeric (0-100)</option>
                              <option value="Letter">Letter (A-F)</option>
                              <option value="Percentage">Percentage (0-100%)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                              {gradeData.type === "Letter" ? "Select Grade" : "Enter Marks"}
                            </label>
                            {gradeData.type === "Letter" ? (
                              <select
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                value={gradeData.marks}
                                onChange={(e) => setGradeData({ ...gradeData, marks: e.target.value })}
                              >
                                {["A", "B", "C", "D", "E", "F"].map(grade => (
                                  <option key={grade} value={grade}>{grade}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="number"
                                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                value={gradeData.marks}
                                onChange={(e) => setGradeData({ ...gradeData, marks: e.target.value })}
                                min="0"
                                max="100"
                              />
                            )}
                          </div>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => handleGrade(sub._id)}
                              className="flex-grow bg-indigo-600 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-indigo-700 transition-all"
                            >
                              SAVE
                            </button>
                            <button
                              onClick={() => setGradingId(null)}
                              className="px-3 bg-slate-200 text-slate-600 text-[10px] font-bold py-2 rounded-lg hover:bg-slate-300 transition-all"
                            >
                              CANCEL
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setGradingId(sub._id)}
                          className="w-full bg-white border border-indigo-200 text-indigo-600 text-[10px] font-bold py-3 rounded-lg hover:bg-indigo-50 transition-all shadow-sm"
                        >
                          GRADE SUBMISSION
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

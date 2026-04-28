"use client";

import { useEffect, useState } from "react";
import { getCourses } from "../../services/courseService";
import { markAttendance, getStudentAttendance, getCourseAttendance } from "../../services/attendanceService";
import { isAuthenticated, getUserRole } from "../../utils/auth";
import { CheckCircle, XCircle, Calendar, User, Search, BookOpen, AlertCircle } from "lucide-react";

export default function AttendancePage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [history, setHistory] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    const currentRole = getUserRole();
    setRole(currentRole);
    fetchInitialData(currentRole);
  }, []);

  const fetchInitialData = async (currentRole) => {
    try {
      setLoading(true);
      if (currentRole === "faculty" || currentRole === "admin") {
        const data = await getCourses();
        setCourses(data.data || []);
      } else {
        const data = await getStudentAttendance();
        setHistory(data.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = async (courseId) => {
    setSelectedCourse(courseId);
    setError(null);
    if (!courseId) {
      setStudents([]);
      return;
    }

    try {
      const course = courses.find(c => c._id === courseId);
      // In this app, course.students is an array of objects or IDs
      // Assuming it's already populated or we need to map them
      // For now, let's just use the course's student list if available
      if (course && course.students) {
        setStudents(course.students);
        // Initialize attendance as Present for all
        setAttendanceData(course.students.map(s => ({
          studentId: s._id || s,
          status: "Present"
        })));
      }
    } catch (err) {
      setError("Failed to load students");
    }
  };

  const toggleStatus = (studentId) => {
    setAttendanceData(prev => prev.map(item => 
      item.studentId === studentId 
        ? { ...item, status: item.status === "Present" ? "Absent" : "Present" }
        : item
    ));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await markAttendance({
        courseId: selectedCourse,
        date: new Date().toISOString().split('T')[0],
        students: attendanceData
      });
      setSuccess("Attendance marked successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && courses.length === 0 && history.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fade-in-up w-full max-w-5xl mx-auto pb-10 pt-4">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <Calendar className="text-indigo-600" size={28} />
            Attendance Management
          </h1>
          <p className="text-slate-500 text-xs mt-1 uppercase font-bold tracking-wider">
            {role === "student" ? "Your Attendance Record" : "Mark Daily Attendance"}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-lg text-xs font-bold flex items-center gap-2">
          <CheckCircle size={14} /> {success}
        </div>
      )}

      {role === "faculty" || role === "admin" ? (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Select Course</label>
            <div className="flex gap-4">
              <select
                className="flex-grow bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={selectedCourse}
                onChange={(e) => handleCourseSelect(e.target.value)}
              >
                <option value="">Choose a course...</option>
                {courses.map(c => (
                  <option key={c._id} value={c._id}>{c.title}</option>
                ))}
              </select>
              <div className="bg-slate-100 px-4 py-2.5 rounded-lg text-slate-500 text-xs font-bold flex items-center gap-2">
                <Calendar size={14} /> {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {selectedCourse && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Name</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-10 text-center text-slate-400 text-sm italic">
                        No students enrolled in this course yet.
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => {
                      const status = attendanceData.find(a => a.studentId === (student._id || student))?.status;
                      return (
                        <tr key={student._id || student} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                <User size={14} />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{student.name || "Enrolled Student"}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{student.email || "ID: " + (student._id || student)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              status === "Present" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            }`}>
                              {status === "Present" ? <CheckCircle size={10} /> : <XCircle size={10} />}
                              {status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => toggleStatus(student._id || student)}
                              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                                status === "Present" 
                                  ? "text-red-600 border-red-100 hover:bg-red-50" 
                                  : "text-emerald-600 border-emerald-100 hover:bg-emerald-50"
                              }`}
                            >
                              MARK {status === "Present" ? "ABSENT" : "PRESENT"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              {students.length > 0 && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm shadow-indigo-200 transition-all disabled:opacity-50"
                  >
                    {loading ? "SAVING..." : "SAVE ATTENDANCE"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {history.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <BookOpen size={32} />
              </div>
              <h3 className="text-slate-900 font-bold">No Records Yet</h3>
              <p className="text-slate-500 text-xs mt-1">Your attendance data will appear here once marked by faculty.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((record) => (
                    <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">
                        {record.course?.title || "Course"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          record.status === "Present" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        }`}>
                          {record.status === "Present" ? <CheckCircle size={10} /> : <XCircle size={10} />}
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

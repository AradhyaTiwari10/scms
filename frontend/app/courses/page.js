"use client";

import { useEffect, useState } from "react";
import { getCourses, enrollCourse, createCourse } from "../../services/courseService";
import { getFaculty } from "../../services/authService";
import { isAuthenticated, getUserRole, getUserId } from "../../utils/auth";
import { BookOpen, User, Plus, X, Check } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", faculty: "" });
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }
    const currentRole = getUserRole();
    setRole(currentRole);
    setUserId(getUserId());
    fetchData(currentRole);
  }, []);

  const fetchData = async (currentRole) => {
    try {
      const data = await getCourses();
      const courseData = data.data || data.courses || (Array.isArray(data) ? data : []);
      setCourses(courseData);

      if (currentRole === "admin") {
        const facData = await getFaculty();
        setFacultyList(facData.data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await enrollCourse(courseId);
      alert("Successfully enrolled in course!");
      fetchData(role);
    } catch (err) {
      alert(err.message || "Failed to enroll");
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) {
      alert("Title is required");
      return;
    }
    setCreateLoading(true);
    try {
      await createCourse(newCourse);
      alert("Course created successfully!");
      setNewCourse({ title: "", description: "", faculty: "" });
      setShowAddForm(false);
      fetchData(role);
    } catch (err) {
      alert(err.message || "Failed to create course");
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
          <BookOpen className="text-indigo-600" /> Courses
        </h1>
        {role === "admin" && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm"
          >
            {showAddForm ? <><X size={16} /> Close</> : <><Plus size={16} /> New Course</>}
          </button>
        )}
      </div>

      {showAddForm && role === "admin" && (
        <div className="glass-card p-6 mb-8 bg-white border border-slate-200 shadow-sm rounded-xl">
          <form onSubmit={handleCreateCourse} className="flex flex-col gap-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full rounded-lg p-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assign Faculty</label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={newCourse.faculty}
                onChange={(e) => setNewCourse({ ...newCourse, faculty: e.target.value })}
              >
                <option value="">Select Faculty</option>
                {facultyList.length > 0 ? (
                  facultyList.map((f) => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))
                ) : (
                  <option disabled>No faculty members found</option>
                )}
              </select>
              {facultyList.length === 0 && (
                <p className="text-[10px] text-amber-600 mt-1 font-medium italic">
                  Note: You must register a user with the "faculty" role first.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                className="w-full rounded-lg p-2.5 text-sm bg-slate-50 border border-slate-200 focus:bg-white resize-none"
                rows="3"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={createLoading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
              >
                {createLoading ? "Saving..." : "Save Course"}
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

      {courses.length === 0 && !error ? (
        <div className="text-slate-500 text-sm py-10">No courses found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <div 
              key={course._id || course.id} 
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col hover:border-indigo-200 transition-colors shadow-sm"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-2 truncate" title={course.title}>
                {course.title}
              </h2>
              <p className="text-slate-500 text-sm mb-5 flex-grow line-clamp-2">
                {course.description || "No description."}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <User size={14} className="text-slate-400" />
                  <span className="font-medium text-slate-700">
                    {course.faculty?.name || "Unassigned"}
                  </span> 
                </div>
                {role === "student" && (
                  course.students?.includes(userId) ? (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md text-xs font-semibold">
                      <Check size={14} /> Enrolled
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course._id || course.id)}
                      className="bg-slate-100 hover:bg-indigo-50 text-indigo-600 border border-transparent hover:border-indigo-200 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                    >
                      Enroll
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

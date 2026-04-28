"use client";

import { useEffect, useState } from "react";
import { getCourses, enrollCourse } from "../../services/courseService";
import { isAuthenticated } from "../../utils/auth";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.courses || data);
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
      fetchCourses();
    } catch (err) {
      alert(err.message || "Failed to enroll");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading courses...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Courses</h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 shadow-md">
          {error}
        </div>
      )}

      {courses.length === 0 && !error ? (
        <p className="text-gray-500 text-center py-8">No courses available.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <div 
              key={course._id || course.id} 
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
              
              <div className="mt-auto">
                <div className="text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                  <span className="font-semibold text-gray-700">Faculty:</span> {course.faculty?.name || "TBA"}
                </div>
                <button
                  onClick={() => handleEnroll(course._id || course.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

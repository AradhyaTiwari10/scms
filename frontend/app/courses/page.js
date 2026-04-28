"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses, enrollCourse } from "../../services/courseService";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchCourses();
  }, [router]);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data.courses || data); // handle potential response structures
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
      fetchCourses(); // Refetch to potentially show updated enrollment state if backend supports it
    } catch (err) {
      alert(err.message || "Failed to enroll");
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading courses...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Courses</h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {courses.length === 0 && !error ? (
        <p className="text-gray-500 text-center py-8">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div 
              key={course._id || course.id} 
              className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
              
              <div className="mt-auto">
                <div className="text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                  <span className="font-semibold text-gray-700">Faculty:</span> {course.faculty?.name || "TBA"}
                </div>
                
                <button
                  onClick={() => handleEnroll(course._id || course.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-blue-300"
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

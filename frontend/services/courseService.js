const API_URL = "http://localhost:5000/api/courses";

export const getCourses = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return response.json();
};

export const enrollCourse = async (courseId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/enroll/${courseId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to enroll in course");
  }

  return response.json();
};

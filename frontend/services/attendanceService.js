const API_URL = "http://localhost:5001/api/attendance";

export const markAttendance = async (attendanceData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/mark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(attendanceData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to mark attendance");
  }

  return response.json();
};

export const getStudentAttendance = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/student`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch student attendance");
  }

  return response.json();
};

export const getCourseAttendance = async (courseId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/course/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch course attendance");
  }

  return response.json();
};

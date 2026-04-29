const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const API_URL = `${BASE_URL}/submissions`;

export const submitAssignment = async (assignmentId, text) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ assignmentId, text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to submit assignment");
  }

  return response.json();
};

export const getSubmissions = async (assignmentId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/${assignmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch submissions");
  }

  return response.json();
};

export const gradeSubmission = async (submissionId, marks, type) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/grade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ submissionId, marks, type }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to grade submission");
  }

  return response.json();
};

export const getUserSubmissions = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch your submissions");
  }

  return response.json();
};

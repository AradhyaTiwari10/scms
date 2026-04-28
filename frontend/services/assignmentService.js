const ASSIGNMENTS_API_URL = "http://localhost:5001/api/assignments";
const SUBMISSIONS_API_URL = "http://localhost:5001/api/submissions";

export const getAssignments = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(ASSIGNMENTS_API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch assignments");
  }

  return response.json();
};

export const submitAssignment = async (assignmentId, submissionText) => {
  const token = localStorage.getItem("token");
  const response = await fetch(SUBMISSIONS_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assignmentId, submissionText }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to submit assignment");
  }

  return response.json();
};

export const createAssignment = async (assignmentData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(ASSIGNMENTS_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assignmentData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create assignment");
  }

  return response.json();
};

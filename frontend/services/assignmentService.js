const ASSIGNMENTS_API_URL = "http://localhost:5000/api/assignments";
const SUBMISSIONS_API_URL = "http://localhost:5000/api/submissions";

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

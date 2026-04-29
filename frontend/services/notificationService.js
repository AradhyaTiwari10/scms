const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const API_URL = `${BASE_URL}/notifications`;

export const getNotifications = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};

export const markNotificationsAsRead = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/read`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to mark notifications as read");
  }

  return response.json();
};

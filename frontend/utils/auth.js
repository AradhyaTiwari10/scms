import Cookies from "js-cookie";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return Cookies.get("token") || localStorage.getItem("token");
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return !!(Cookies.get("token") || localStorage.getItem("token"));
  }
  return false;
};

export const getUserRole = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch (err) {
    return null;
  }
};

export const getUserId = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id || null;
  } catch (err) {
    return null;
  }
};


"use client";

import { useEffect, useState } from "react";
import { isAuthenticated, getToken } from "../../utils/auth";

const ROLE_CONFIG = {
  admin: {
    title: "Welcome Admin",
    description: "You can manage courses",
    cards: [
      { label: "Manage Courses", icon: "📚" },
      { label: "Manage Users", icon: "👥" },
      { label: "View Reports", icon: "📊" },
    ],
  },
  faculty: {
    title: "Welcome Faculty",
    description: "You can manage assignments and attendance",
    cards: [
      { label: "Manage Assignments", icon: "📝" },
      { label: "Track Attendance", icon: "📋" },
      { label: "Grade Submissions", icon: "✅" },
    ],
  },
  student: {
    title: "Welcome Student",
    description: "You can view courses and submit assignments",
    cards: [
      { label: "View Courses", icon: "📚" },
      { label: "Submit Assignments", icon: "📤" },
      { label: "Check Attendance", icon: "📅" },
    ],
  },
};

export default function DashboardPage() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    try {
      const token = getToken();
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userRole = payload.role;

      if (!userRole || !ROLE_CONFIG[userRole]) {
        window.location.href = "/login";
        return;
      }
      setRole(userRole);
    } catch (err) {
      window.location.href = "/login";
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-8 text-center">Loading dashboard…</div>;
  if (!role) return null;

  const { title, description, cards } = ROLE_CONFIG[role];

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-500 text-base">{description}</p>
      </div>

      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Quick Access
      </h2>
      <div className="flex flex-col gap-4 sm:flex-row">
        {cards.map(({ label, icon }) => (
          <div
            key={label}
            className="bg-white shadow-md rounded-lg p-4 flex-1 flex items-center gap-4 cursor-pointer"
          >
            <div className="text-2xl w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
              {icon}
            </div>
            <span className="font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

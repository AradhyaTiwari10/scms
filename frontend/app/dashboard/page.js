"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ROLE_CONFIG = {
  admin: {
    title: "Welcome, Admin 🛠️",
    description: "You can manage courses, users, and the entire system.",
    color: "indigo",
    cards: [
      { label: "Manage Courses", icon: "📚" },
      { label: "Manage Users", icon: "👥" },
      { label: "View Reports", icon: "📊" },
    ],
  },
  faculty: {
    title: "Welcome, Faculty 🎓",
    description: "You can manage assignments and track student attendance.",
    color: "emerald",
    cards: [
      { label: "Manage Assignments", icon: "📝" },
      { label: "Track Attendance", icon: "📋" },
      { label: "Grade Submissions", icon: "✅" },
    ],
  },
  student: {
    title: "Welcome, Student 📖",
    description: "You can view your courses and submit assignments.",
    color: "sky",
    cards: [
      { label: "View Courses", icon: "📚" },
      { label: "Submit Assignments", icon: "📤" },
      { label: "Check Attendance", icon: "📅" },
    ],
  },
};

const COLOR_MAP = {
  indigo: {
    badge: "bg-indigo-100 text-indigo-700",
    border: "border-indigo-200",
    card: "bg-indigo-50 hover:bg-indigo-100",
    icon: "bg-indigo-100",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-200",
    card: "bg-emerald-50 hover:bg-emerald-100",
    icon: "bg-emerald-100",
  },
  sky: {
    badge: "bg-sky-100 text-sky-700",
    border: "border-sky-200",
    card: "bg-sky-50 hover:bg-sky-100",
    icon: "bg-sky-100",
  },
};

export default function DashboardPage() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      // Decode JWT payload (no external library)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userRole = payload.role;

      if (!userRole || !ROLE_CONFIG[userRole]) {
        // Unknown role — treat as unauthorized
        router.push("/login");
        return;
      }

      setRole(userRole);
    } catch (err) {
      // Malformed token
      console.error("Token decode failed:", err);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg
            className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          />
          <p className="text-sm">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!role) return null;

  const { title, description, color, cards } = ROLE_CONFIG[role];
  const colors = COLOR_MAP[color];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header Card */}
      <div
        className={`bg-white rounded-2xl border ${colors.border} shadow-sm p-8 mb-6`}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
            <p className="mt-2 text-gray-500 text-base">{description}</p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold capitalize ${colors.badge}`}
          >
            {role}
          </span>
        </div>
      </div>

      {/* Quick Access Cards */}
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">
        Quick Access
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ label, icon }) => (
          <div
            key={label}
            className={`rounded-xl border ${colors.border} ${colors.card} p-5 flex items-center gap-4 cursor-pointer transition-colors duration-150`}
          >
            <div
              className={`text-2xl w-12 h-12 flex items-center justify-center rounded-xl ${colors.icon}`}
            >
              {icon}
            </div>
            <span className="font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

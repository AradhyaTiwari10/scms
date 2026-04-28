"use client";

import { useEffect, useState } from "react";
import { isAuthenticated, getToken } from "../../utils/auth";
import { BookOpen, Users, BarChart3, ClipboardList, CheckCircle, LayoutDashboard } from "lucide-react";

const ROLE_CONFIG = {
  admin: {
    title: "Admin Control Center",
    description: "System-wide management and monitoring.",
    cards: [
      { label: "Manage Courses", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", link: "/courses" },
      { label: "Manage Users", icon: Users, color: "text-purple-600", bg: "bg-purple-50", link: "#" },
      { label: "System Reports", icon: BarChart3, color: "text-sky-600", bg: "bg-sky-50", link: "#" },
    ],
  },
  faculty: {
    title: "Faculty Dashboard",
    description: "Curriculum and student performance tracking.",
    cards: [
      { label: "Assignments", icon: ClipboardList, color: "text-indigo-600", bg: "bg-indigo-50", link: "/assignments" },
      { label: "Attendance", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", link: "#" },
      { label: "Grading", icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50", link: "#" },
    ],
  },
  student: {
    title: "Student Portal",
    description: "Academic progress and active coursework.",
    cards: [
      { label: "My Courses", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", link: "/courses" },
      { label: "Assignments", icon: ClipboardList, color: "text-emerald-600", bg: "bg-emerald-50", link: "/assignments" },
      { label: "Performance", icon: BarChart3, color: "text-sky-600", bg: "bg-sky-50", link: "#" },
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!role) return null;

  const { title, description, cards } = ROLE_CONFIG[role];

  return (
    <div className="fade-in-up w-full max-w-6xl mx-auto pb-10 pt-4">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <LayoutDashboard className="text-indigo-600" size={32} />
            {title}
          </h1>
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map(({ label, icon: Icon, color, bg, link }, index) => (
          <button
            key={label}
            onClick={() => link !== "#" && (window.location.href = link)}
            className="group relative flex flex-col items-start p-6 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all text-left"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg} ${color} mb-4 group-hover:scale-105 transition-transform`}>
              <Icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{label}</h3>
            <p className="text-slate-500 text-sm mt-1 mb-4 leading-relaxed">
              Access and manage your {label.toLowerCase()} efficiently.
            </p>
            <div className="mt-auto text-indigo-600 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              Open Module →
            </div>
          </button>
        ))}
      </div>
      
      {/* Secondary Information Section */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-600 border-b border-slate-200/50 pb-2 last:border-0 last:pb-0">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                <span>New update available in {role === 'student' ? 'Course Materials' : 'System Logs'}.</span>
                <span className="ml-auto text-[10px] text-slate-400 uppercase font-bold">{i}h ago</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600 border-b border-slate-200/50 pb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              <span>Midterm Submission Deadline</span>
              <span className="ml-auto text-[10px] text-slate-400 uppercase font-bold">Tomorrow</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
              <span>Faculty General Meeting</span>
              <span className="ml-auto text-[10px] text-slate-400 uppercase font-bold">Fri, 10 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

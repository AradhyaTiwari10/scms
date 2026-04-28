"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, ClipboardList, GraduationCap, CheckCircle, Star } from "lucide-react";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Assignments", href: "/assignments", icon: ClipboardList },
  { label: "Attendance", href: "/attendance", icon: CheckCircle },
  { label: "Grading", href: "/grading", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen flex flex-col bg-slate-50 border-r border-slate-200 py-6 px-3 shrink-0">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
          <GraduationCap size={20} />
        </div>
        <div>
          <span className="text-lg font-bold text-slate-900 block leading-none">SCMS</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Academic Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-grow">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Main Navigation</div>
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Version Info */}
      <div className="mt-auto px-3 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
          <span>v1.0.4 stable</span>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
}

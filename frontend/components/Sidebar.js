"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Courses", href: "/courses" },
  { label: "Assignments", href: "/assignments" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-gray-200 flex flex-col py-8 px-4 shadow-lg shrink-0">
      <div className="mb-10 px-2">
        <span className="text-2xl font-extrabold tracking-widest text-white uppercase">
          SCMS
        </span>
        <p className="text-xs text-gray-500 mt-1">Campus Management</p>
      </div>

      <nav className="flex flex-col gap-2">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

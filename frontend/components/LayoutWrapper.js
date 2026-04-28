"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Define routes that should NOT have the Sidebar/Navbar
  const isAuthPage = pathname === "/login";

  if (isAuthPage) {
    return <main className="flex-1 overflow-y-auto">{children}</main>;
  }

  return (
    <div className="flex h-screen overflow-hidden w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side: Navbar + page content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

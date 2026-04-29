"use client";

import { LogOut, Bell, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getNotifications, markNotificationsAsRead } from "../services/notificationService";
import { isAuthenticated } from "../utils/auth";

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.data || []);
      setUnreadCount(data.data.filter(n => !n.isRead).length);
    } catch (err) {
      console.error("Failed to fetch notifications");
    }
  };

  const handleToggleNotifications = async () => {
    if (!showNotifications && unreadCount > 0) {
      try {
        await markNotificationsAsRead();
        setUnreadCount(0);
      } catch (err) {
        console.error(err);
      }
    }
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    window.location.href = "/login";
  };


  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Network Secure</span>
      </div>
      
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button 
            onClick={handleToggleNotifications}
            className={`p-2 transition-colors relative ${unreadCount > 0 ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-[100] py-2 max-h-[400px] overflow-y-auto">
              <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notifications</span>
                {notifications.length > 0 && (
                  <span className="text-[10px] font-bold text-indigo-600 cursor-pointer" onClick={() => setNotifications([])}>Clear</span>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-slate-400 text-xs">
                  No new notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div key={n._id} className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors ${!n.isRead ? "bg-indigo-50/30" : ""}`}>
                    <p className="text-xs text-slate-700 leading-relaxed">{n.message}</p>
                    <span className="text-[9px] text-slate-400 mt-1 block uppercase font-bold">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Settings size={18} />
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-bold transition-all"
        >
          <LogOut size={14} />
          LOGOUT
        </button>
      </div>
    </header>
  );
}

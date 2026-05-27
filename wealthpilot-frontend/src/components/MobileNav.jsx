import React from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import {
  X,
  LayoutDashboard,
  Users,
  Briefcase,
  BarChart3,
  Sparkles,
  MessageSquareCode,
  Lightbulb,
  FileText,
  ShieldAlert,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const navSections = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/clients", label: "Clients", icon: Users },
      { to: "/portfolio", label: "Portfolio", icon: Briefcase },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "AI Workspace",
    items: [
      { to: "/ai-copilot", label: "AI Copilot", icon: Sparkles },
      { to: "/meetings", label: "Meeting Summaries", icon: MessageSquareCode },
    ],
  },
  {
    label: "Reports",
    items: [
      { to: "/reports", label: "Portfolio Reports", icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export const MobileNav = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Slide-in panel */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-72 bg-[#12151c]/95 backdrop-blur-xl border-r border-[#1e2330] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#1e2330] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 p-2 rounded-xl text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="font-bold text-sm text-white flex items-center gap-1.5">
                    WealthPilot
                    <span className="bg-indigo-500/20 text-indigo-400 text-[8px] font-extrabold px-1 py-0.5 rounded border border-indigo-500/30">
                      AI
                    </span>
                  </h1>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-5">
              {navSections.map((section) => (
                <div key={section.label}>
                  <div className="text-[9px] font-bold text-gray-600 tracking-wider uppercase px-3 mb-2">
                    {section.label}
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${
                              isActive
                                ? "bg-gradient-to-r from-indigo-500/10 to-blue-500/5 text-white font-medium shadow-[inset_2px_0_0_0_#6366f1]"
                                : "text-gray-400 hover:text-gray-200 hover:bg-[#181d27]/75"
                            }`
                          }
                        >
                          <Icon className="h-4.5 w-4.5 shrink-0" />
                          <span className="text-sm">{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* User footer */}
            <div className="p-4 border-t border-[#1e2330] bg-[#0d0f14]/50">
              <div className="flex items-center gap-3 px-2 mb-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm border border-indigo-400/20">
                  {user ? `${user.firstName[0]}${user.lastName[0]}` : "RM"}
                </div>
                <div className="truncate flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-white truncate leading-none">
                      {user ? `${user.firstName} ${user.lastName}` : "Jane Doe"}
                    </p>
                    <ShieldCheck className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5 uppercase font-bold tracking-wider">
                    Relationship Manager
                  </p>
                </div>
              </div>
              <button
                onClick={() => { logout(); onClose(); }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#1e2330] hover:border-red-500/20 hover:bg-red-500/5 text-gray-400 hover:text-red-400 text-xs font-semibold transition-all cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout Session
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

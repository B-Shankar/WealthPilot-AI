import React from "react";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquareCode, 
  LogOut, 
  Sparkles,
  ShieldCheck,
  TrendingUp
} from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: "dashboard", label: "Wealth Dashboard", icon: LayoutDashboard },
    { id: "clients", label: "Client Directory", icon: Users },
    { id: "portfolio", label: "Drift Analyzer", icon: Briefcase },
    { id: "meetings", label: "Meeting Summaries", icon: MessageSquareCode },
    { id: "reports", label: "Reports Hub", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#12151c]/90 border-r border-[#1e2330] flex flex-col justify-between z-20 relative select-none">
      <div>
        {/* Logo Brand Panel with glass effect */}
        <div className="p-6 border-b border-[#1e2330] flex items-center gap-3">
          <div className="bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-600/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-wide leading-none flex items-center gap-1.5">
              WealthPilot
              <span className="bg-indigo-500/20 text-indigo-400 text-[8px] font-extrabold px-1 py-0.5 rounded tracking-wide border border-indigo-500/30">AI</span>
            </h1>
            <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">ENTERPRISE OS</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          <div className="text-[9px] font-bold text-gray-600 tracking-wider uppercase px-4 mb-2">Workspace Navigation</div>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer relative ${
                  isActive 
                    ? "bg-gradient-to-r from-indigo-500/10 to-blue-500/5 text-white font-medium shadow-[inset_1px_0_0_0_#6366f1]" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-[#181d27]/75"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-r-full" />
                )}
                <Icon className={`h-4.5 w-4.5 transition-transform duration-200 ${isActive ? "text-indigo-400 scale-110" : "text-gray-500 hover:scale-105"}`} />
                <span className="text-sm font-medium tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Advisor RM Footer Profile */}
      <div className="p-4 border-t border-[#1e2330] bg-[#0d0f14]/50 flex flex-col gap-3.5">
        <div className="flex items-center gap-3 px-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/10 border border-indigo-400/20 text-sm">
            {user ? `${user.firstName[0]}${user.lastName[0]}` : "RM"}
          </div>
          <div className="truncate flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-white truncate leading-none">{user ? `${user.firstName} ${user.lastName}` : "Jane Doe"}</p>
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
            </div>
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">Relationship Manager</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#1e2330] hover:border-red-500/20 hover:bg-red-500/5 text-gray-400 hover:text-red-400 text-xs font-semibold transition-all duration-200 cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout Session
        </button>
      </div>
    </aside>
  );
};

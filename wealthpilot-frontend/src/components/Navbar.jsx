import React from "react";
import { useCopilot } from "../context/CopilotContext";
import { 
  Bell, 
  Search, 
  Sparkles,
  Server,
  Terminal,
  Activity
} from "lucide-react";

export const Navbar = () => {
  const { toggleCopilot } = useCopilot();

  return (
    <header className="h-16 bg-[#12151c]/60 backdrop-blur-xl border-b border-[#1e2330] px-8 flex items-center justify-between z-10 select-none relative">
      
      {/* 1. Global Terminal-Style Search Bar */}
      <div className="relative w-96 group">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Global Command (Cmd+K) - clients, allocations, compliance..." 
          className="w-full bg-[#0d0f14]/80 border border-[#1e2330] rounded-xl py-2 pl-10 pr-4 text-xs font-mono text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-[#0d0f14] transition-all duration-200"
        />
        <div className="absolute right-2 top-2.5 px-1.5 py-0.5 rounded bg-[#1e2330] border border-gray-800 text-[9px] font-bold text-gray-500 font-mono tracking-tight pointer-events-none group-focus-within:hidden">
          ⌘K
        </div>
      </div>

      {/* 2. System Feed Status Indicators & Actions */}
      <div className="flex items-center gap-6">
        
        {/* Terminal/Network Live Status - Bloomberg Style */}
        <div className="hidden lg:flex items-center gap-4.5 px-3 py-1.5 bg-[#0d0f14]/60 border border-[#1e2330] rounded-xl text-[10px] font-mono text-gray-400 tracking-tight">
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span className="text-gray-500">FEED:</span>
            <span className="text-emerald-400 font-bold uppercase">LIVE</span>
          </div>
          <div className="h-3 w-px bg-gray-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">PING:</span>
            <span className="font-bold text-indigo-400">12ms</span>
          </div>
          <div className="h-3 w-px bg-gray-800" />
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-300 font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Bell with Glowing Dot */}
          <button className="relative p-2 rounded-xl border border-[#1e2330] hover:bg-[#181d27]/75 transition-colors cursor-pointer group">
            <Bell className="h-4 w-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 ring-2 ring-[#12151c] animate-pulse"></span>
          </button>

          {/* AI Floating Toggle Trigger */}
          <button 
            onClick={toggleCopilot}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all border border-indigo-500/30 cursor-pointer active:scale-95 group relative overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Sparkles className="h-3.5 w-3.5 text-indigo-200 animate-pulse" />
            <span>AI Copilot</span>
          </button>
        </div>
      </div>
    </header>
  );
};

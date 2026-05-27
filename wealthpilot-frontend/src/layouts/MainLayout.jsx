import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";
import { CopilotPanel } from "../components/CopilotPanel";

export const MainLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen bg-[#0d0f14] text-gray-200 overflow-hidden font-sans select-none antialiased">
      
      {/* 1. Slim Premium Sidebar Drawer */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Central Cockpit Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top telemetry bar */}
        <Navbar />

        {/* Dynamic viewport panel with scroll bars */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[1600px] mx-auto animate-[fadeIn_0.35s_ease-out]">
            {children}
          </div>
        </main>
      </div>

      {/* 3. AI Copilot Drawer Context */}
      <CopilotPanel />
      
    </div>
  );
};
export default MainLayout;

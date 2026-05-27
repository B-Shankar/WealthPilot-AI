import React, { useState } from "react";
import { useCopilot } from "../context/CopilotContext";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  Mail, 
  Phone,
  FileText,
  FileCheck,
  Zap,
  Activity
} from "lucide-react";

export const ClientDetail = ({ client, setActiveTab }) => {
  const { openCopilot, setContextClient } = useCopilot();
  const [activeSegment, setActiveSegment] = useState("allocation");

  if (!client) return null;

  const allocationSegments = [
    { name: "US Large Cap Equities (AAPL, MSFT)", value: client.netWorth * 0.40, pct: 40, color: "bg-blue-500" },
    { name: "Global Investment Grade Bonds", value: client.netWorth * 0.30, pct: 30, color: "bg-teal-500" },
    { name: "Emerging Market Equities", value: client.netWorth * 0.15, pct: 15, color: "bg-indigo-500" },
    { name: "Liquid Yield Reserves", value: client.netWorth * 0.10, pct: 10, color: "bg-emerald-500" },
    { name: "Alternative Digital Securities", value: client.netWorth * 0.05, pct: 5, color: "bg-purple-500" },
  ];

  const recentActivities = [
    { date: "May 24, 2026", type: "Meeting Logged", detail: "Discussed asset transition models and high-yield fixed-income structures." },
    { date: "May 10, 2026", type: "Portfolio Rebalanced", detail: "Trimming large cap tech gains, shifting 5% to emerging markets." },
    { date: "Apr 28, 2026", type: "Tax Report Sent", detail: "Dispatched automated EOY portfolio capital gains schedules." }
  ];

  const handleTriggerAIRecommendation = () => {
    setContextClient(client);
    openCopilot();
  };

  return (
    <div className="space-y-6">
      
      {/* Back button header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setActiveTab("clients")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </button>
        
        <button 
          onClick={handleTriggerAIRecommendation}
          className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs font-semibold py-2.5 px-4 rounded-xl border border-indigo-500/20 flex items-center gap-2 transition-all shadow-md shadow-indigo-600/5"
        >
          <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          Request Advisor AI Insight
        </button>
      </div>

      {/* Profile Overview Header Card */}
      <div className="bg-gradient-to-r from-[#12151c] to-[#181d27] border border-gray-800/80 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center font-bold text-white text-xl">
              {client.firstName[0]}{client.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-white">{client.firstName} {client.lastName}</h2>
                <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold rounded-full">
                  {client.riskProfile} Risk Profile
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full">
                  {client.onboardingStatus}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {client.email}</span>
                <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {client.phone || "+1 (555) 000-0000"}</span>
              </div>
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-gray-800 pt-4 lg:pt-0 lg:pl-8 text-left">
            <span className="text-xs text-gray-500 block font-semibold uppercase tracking-wider mb-1">Total Client Asset Balance</span>
            <span className="text-3xl font-extrabold text-white tracking-tight flex items-center">
              <DollarSign className="h-7 w-7 text-indigo-500 shrink-0" />
              {client.netWorth.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs navigation panel */}
      <div className="border-b border-gray-800 flex gap-4 text-sm font-semibold">
        <button 
          onClick={() => setActiveSegment("allocation")}
          className={`py-3 px-1 border-b-2 transition-all ${
            activeSegment === "allocation" ? "border-indigo-500 text-white font-bold" : "border-transparent text-gray-400 hover:text-gray-200"
          }`}
        >
          Portfolio Allocation
        </button>
        <button 
          onClick={() => setActiveSegment("timeline")}
          className={`py-3 px-1 border-b-2 transition-all ${
            activeSegment === "timeline" ? "border-indigo-500 text-white font-bold" : "border-transparent text-gray-400 hover:text-gray-200"
          }`}
        >
          Activity Timeline
        </button>
      </div>

      {/* Dynamic Tabs viewports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TAB 1: ALLOCATION BREAKDOWNS */}
        {activeSegment === "allocation" && (
          <>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Asset Class Distribution</h3>
                <div className="space-y-4">
                  {allocationSegments.map((segment, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-semibold">{segment.name}</span>
                        <div className="space-x-2">
                          <span className="text-gray-500">${segment.value.toLocaleString()}</span>
                          <span className="text-indigo-400 font-bold">{segment.pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-[#181d27] h-2.5 rounded-full overflow-hidden border border-gray-850">
                        <div className={`${segment.color} h-full rounded-full`} style={{ width: `${segment.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* VOLATILITY AND RISK ADVISORY SEGMENTS */}
            <div className="space-y-6">
              <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Risk Scorecard</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-[#181d27] border border-gray-850 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-gray-400">Sharpe Ratio (1Y)</span>
                    <span className="font-bold text-white">1.84</span>
                  </div>
                  <div className="p-3 bg-[#181d27] border border-gray-850 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-gray-400">Portfolio Beta</span>
                    <span className="font-bold text-white">1.12</span>
                  </div>
                  <div className="p-3 bg-[#181d27] border border-gray-850 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-gray-400">Annual Volatility</span>
                    <span className="font-bold text-white">12.5%</span>
                  </div>
                  <div className="p-3 bg-[#181d27] border border-gray-850 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-gray-400">Maximum Drawdown</span>
                    <span className="font-bold text-red-400">-14.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: ACTIVITY TIMELINE */}
        {activeSegment === "timeline" && (
          <div className="lg:col-span-3 bg-[#12151c] border border-gray-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Interaction logs</h3>
            <div className="relative border-l border-gray-800 pl-6 space-y-6">
              {recentActivities.map((act, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-[-31px] top-0 h-2.5 w-2.5 bg-indigo-500 rounded-full border-4 border-[#12151c]"></div>
                  <span className="text-[10px] text-gray-500 font-bold block">{act.date}</span>
                  <h4 className="font-bold text-sm text-white mt-1">{act.type}</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{act.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

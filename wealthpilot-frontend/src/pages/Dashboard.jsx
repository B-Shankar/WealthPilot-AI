import React, { useState } from "react";
import { useCopilot } from "../context/CopilotContext";
import { 
  globalMetrics, 
  clientPortfolios, 
  getClientById 
} from "../data/mockPortfolioData";
import { PortfolioAllocationChart } from "../components/PortfolioAllocationChart";
import { RiskAnalyticsCard } from "../components/RiskAnalyticsCard";
import { 
  TrendingUp, 
  ArrowUpRight, 
  AlertTriangle, 
  Users, 
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingDown,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  FileCheck,
  Info,
  Layers
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export const Dashboard = ({ setActiveTab }) => {
  const { openCopilot, setContextClient } = useCopilot();
  const [selectedClient, setSelectedClient] = useState(clientPortfolios[0]);

  // Aggregate Metrics
  const metrics = [
    {
      title: "Assets Under Management (AUM)",
      value: globalMetrics.aum.value,
      change: globalMetrics.aum.change,
      trend: "up",
      icon: TrendingUp,
      color: "from-indigo-600/10 via-blue-600/5 to-transparent border-indigo-500/20 text-indigo-400"
    },
    {
      title: "Monthly Inflows",
      value: globalMetrics.monthlyInflows.value,
      change: globalMetrics.monthlyInflows.change,
      trend: "up",
      icon: ArrowUpRight,
      color: "from-emerald-600/10 via-teal-600/5 to-transparent border-emerald-500/20 text-emerald-400"
    },
    {
      title: "Active HNWI Clients",
      value: globalMetrics.clientsCount.value,
      change: globalMetrics.clientsCount.change,
      trend: "up",
      icon: Users,
      color: "from-purple-600/10 via-violet-600/5 to-transparent border-purple-500/20 text-purple-400"
    },
    {
      title: "Compliance Drift Alerts",
      value: globalMetrics.driftAlerts.value,
      change: globalMetrics.driftAlerts.change,
      trend: "down",
      icon: AlertTriangle,
      color: "from-amber-600/10 via-orange-600/5 to-transparent border-amber-500/20 text-amber-400"
    }
  ];

  const handleReviewDrift = (client) => {
    setSelectedClient(client);
    setContextClient(client);
    openCopilot();
  };

  const handleClientSelect = (e) => {
    const client = clientPortfolios.find(c => c.id === e.target.value);
    if (client) {
      setSelectedClient(client);
    }
  };

  const loadClientIntoCopilot = () => {
    setContextClient(selectedClient);
    openCopilot();
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* 1. Terminal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e2330] pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <Layers className="h-4 w-4" />
            <span>Wealth Management Command Console</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight leading-none">Advisor Cockpit</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Quick Client Switcher */}
          <div className="relative group">
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
            <select
              value={selectedClient.id}
              onChange={handleClientSelect}
              className="bg-[#12151c]/90 border border-[#1e2330] hover:border-indigo-500/30 rounded-xl py-2.5 pl-4 pr-10 text-xs font-semibold text-gray-300 focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer transition-all min-w-[200px]"
            >
              {clientPortfolios.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName} ({c.complianceStatus})
                </option>
              ))}
            </select>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2.5 bg-[#12151c]/40 border border-[#1e2330] rounded-xl text-xs font-mono text-gray-500">
            <Calendar className="h-4 w-4 text-indigo-400" />
            <span>VALUATION EOD: Today, 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* 2. Top-Level High-Fidelity KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx} 
              className={`bg-gradient-to-tr ${m.color} border rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-800`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.title}</span>
                <div className="p-2 bg-[#0d0f14]/80 border border-gray-800 rounded-xl text-white">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none font-mono">{m.value}</h3>
              <p className="text-[10px] text-gray-500 mt-3.5 flex items-center gap-1.5 font-medium">
                {m.trend === "up" ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                ) : (
                  <span className="text-amber-500 font-bold flex items-center gap-0.5">
                    <AlertTriangle className="h-3.5 w-3.5" />
                  </span>
                )}
                {m.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3. Focus Dossier: Client Performance & Metrics */}
      <div className="bg-[#12151c]/25 border border-[#1e2330] rounded-3xl p-6 relative overflow-hidden">
        {/* Background glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.015] to-transparent pointer-events-none" />
        
        {/* Client Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-800/40 pb-5 mb-6 relative">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center font-bold text-indigo-400 text-lg shadow-lg">
              {selectedClient.firstName[0]}{selectedClient.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white tracking-tight">{selectedClient.firstName} {selectedClient.lastName}</h3>
                <span className={`px-2.5 py-0.5 border text-[9px] font-black rounded-full uppercase tracking-wider ${
                  selectedClient.complianceStatus === "ALIGNED"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse"
                }`}>
                  {selectedClient.complianceStatus}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-semibold">
                Risk Tier: <span className="text-gray-300 font-bold">{selectedClient.riskProfile}</span> • Advisor: {selectedClient.advisorName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4.5">
            <div className="px-4 py-2 bg-[#0d0f14]/60 border border-gray-800/60 rounded-xl font-mono text-left">
              <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest block leading-none mb-1">Dossier Net Value</span>
              <span className="text-lg font-black text-white leading-none">${selectedClient.netWorth.toLocaleString()}</span>
            </div>
            
            <button
              onClick={loadClientIntoCopilot}
              className="flex items-center gap-2 px-4.5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/15 transition-all border border-indigo-500/30 cursor-pointer active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
              Analyze Dossier with AI
            </button>
          </div>
        </div>

        {/* Client Risk Cards Row */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Portfolio Risk Coordinates</h4>
            <RiskAnalyticsCard metrics={selectedClient.riskMetrics} />
          </div>

          {/* Allocation Charts */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Asset Allocation Model Analysis</h4>
            <PortfolioAllocationChart allocations={selectedClient.allocations} />
          </div>
        </div>
      </div>

      {/* 4. Book-of-Business Analytics & Drifts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AUM Trajectory History (Recharts) */}
        <div className="lg:col-span-2 bg-[#12151c]/40 border border-[#1e2330] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-0.5">Aggregate Performance</h3>
                <p className="text-xs text-gray-500 font-medium">Consolidated AUM trajectory vs. Tactical Benchmark (Millions USD)</p>
              </div>
              <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold rounded-lg border border-indigo-500/25">6M PERIOD</span>
            </div>

            <div className="h-72 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={globalMetrics.aum.history} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aumColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="benchColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="date" stroke="#4b5563" fontSize={9} tickLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} domain={[30, 45]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#181d27", border: "1px solid #1e2330", borderRadius: "12px", color: "#e5e7eb" }} 
                    itemStyle={{ color: "#818cf8" }}
                    labelStyle={{ color: "#9ca3af" }}
                  />
                  <Area type="monotone" name="Consolidated AUM" dataKey="aum" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#aumColor)" />
                  <Area type="monotone" name="Benchmark" dataKey="benchmark" stroke="#10b981" strokeWidth={1.5} strokeDasharray="3 3" fillOpacity={1} fill="url(#benchColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#181d27]/40 border border-gray-800/40 rounded-xl p-3 text-xs text-gray-500 font-medium">
            <Info className="h-4.5 w-4.5 text-indigo-400 flex-shrink-0" />
            <span>Aggregated inflows remain positive at <span className="text-white font-semibold">+$1.25M</span> this cycle. Global rebalancing transactions are recommended for drifting assets to lock in recent tech equity gains.</span>
          </div>
        </div>

        {/* Compliance Drifts Checklist */}
        <div className="bg-[#12151c]/40 border border-[#1e2330] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="bg-amber-500/10 text-amber-500 p-2 rounded-xl border border-amber-500/20">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Compliance Drift Queue</h3>
            </div>
            <p className="text-xs text-gray-500 mb-6 font-medium leading-relaxed">HNWI portfolios breaching standard IPS allocation thresholds by greater than 5.0% absolute weight delta.</p>

            <div className="space-y-4">
              {clientPortfolios.filter(c => c.complianceStatus === "DRIFTING").map((c) => (
                <div key={c.id} className="p-4 bg-[#0d0f14]/85 border border-[#1e2330] rounded-xl hover:border-gray-800 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white group-hover:text-indigo-400 transition-colors">{c.firstName} {c.lastName}</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-extrabold rounded-full font-mono">
                      {c.driftPercentage} Drift
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2 font-semibold">AUM: <span className="text-gray-300 font-mono">${(c.netWorth/1000000).toFixed(2)}M</span></p>
                  <p className="text-[9px] text-gray-600 mt-1 font-mono uppercase tracking-tight">Factor: {c.primaryDriftAsset}</p>
                  
                  <button 
                    onClick={() => handleReviewDrift(c)}
                    className="w-full flex items-center justify-center gap-1.5 mt-3 py-2 bg-indigo-500/5 hover:bg-indigo-500/10 hover:text-indigo-400 text-indigo-500 text-[10px] font-bold rounded-lg border border-indigo-500/15 transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Review AI Strategy
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setActiveTab("portfolio")}
            className="w-full mt-6 py-3 border border-[#1e2330] hover:border-indigo-500/30 text-gray-400 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 bg-[#181d27]/20 hover:bg-indigo-500/5 cursor-pointer"
          >
            Open Strategic Rebalance Suite
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
export default Dashboard;

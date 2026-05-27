import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, PieChart, Activity, ArrowUpRight } from "lucide-react";

export const Analytics = () => {
  const metrics = [
    { label: "Portfolio Alpha", value: "+2.4%", sublabel: "vs S&P 500", color: "text-emerald-400", icon: TrendingUp },
    { label: "Sharpe Ratio", value: "1.84", sublabel: "Risk-adjusted", color: "text-indigo-400", icon: Activity },
    { label: "Win Rate", value: "72%", sublabel: "Positive trades", color: "text-blue-400", icon: ArrowUpRight },
    { label: "Max Drawdown", value: "-8.3%", sublabel: "Peak-to-trough", color: "text-amber-400", icon: PieChart },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="border-b border-[#1e2330] pb-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
          <BarChart3 className="h-4 w-4" />
          <span>Analytics Engine</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none">Portfolio Analytics</h2>
        <p className="text-gray-500 text-sm mt-2">Deep performance, attribution, and risk analytics across all client portfolios.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#12151c]/40 border border-[#1e2330] rounded-2xl p-6 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{m.label}</span>
                <div className="p-2 bg-[#0d0f14]/80 border border-gray-800 rounded-xl">
                  <Icon className={`h-4 w-4 ${m.color}`} />
                </div>
              </div>
              <h3 className={`text-2xl font-black tracking-tight leading-none font-mono ${m.color}`}>{m.value}</h3>
              <p className="text-[10px] text-gray-600 mt-2 font-medium">{m.sublabel}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Placeholder Chart Area */}
      <div className="bg-[#12151c]/40 border border-[#1e2330] rounded-2xl p-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Performance Attribution Analysis</h3>
        <div className="flex items-center justify-center h-64 border border-dashed border-[#1e2330] rounded-xl">
          <div className="text-center">
            <BarChart3 className="h-10 w-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">Advanced analytics charts loading...</p>
            <p className="text-gray-600 text-xs mt-1">Connect to live data feed for real-time attribution</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

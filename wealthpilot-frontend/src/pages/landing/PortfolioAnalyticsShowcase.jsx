import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, ShieldAlert, Award, ArrowUpRight, Activity } from "lucide-react";

const riskParameters = [
  { label: "Consolidated Sharpe", value: "1.84", sub: "Risk-Adjusted Efficiency", color: "text-indigo-400" },
  { label: "Book Portfolio Beta", value: "1.12", sub: "Standard Volatility Link", color: "text-blue-400" },
  { label: "Consolidated Alpha", value: "+2.4%", sub: "Attribution vs S&P 500", color: "text-emerald-400" },
  { label: "Value at Risk (VaR)", value: "4.2%", sub: "95% Monthly Margin", color: "text-amber-400" }
];

const mockAllocation = [
  { name: "US Equities", pct: 40, color: "bg-blue-500", rawVal: "$17.0M" },
  { name: "Global Bonds", pct: 30, color: "bg-teal-500", rawVal: "$12.75M" },
  { name: "Emerging Markets", pct: 15, color: "bg-indigo-500", rawVal: "$6.37M" },
  { name: "Digital Assets", pct: 10, color: "bg-emerald-500", rawVal: "$4.25M" },
  { name: "Alternative Securities", pct: 5, color: "bg-purple-500", rawVal: "$2.13M" }
];

export const PortfolioAnalyticsShowcase = () => {
  const [hoveredMetric, setHoveredMetric] = useState(null);

  return (
    <section id="analytics" className="relative py-28 overflow-hidden bg-[#0a0c10]">
      {/* Background radial blurs */}
      <div className="absolute top-[30%] left-[-15%] w-[600px] h-[600px] rounded-full bg-emerald-500/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Interactive Analytics Telemetry Mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#12151c]/60 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 shadow-2xl shadow-emerald-950/[0.03] space-y-6"
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                    Live Performance Telemetry
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  STABLE ATRIBUTIONS
                </div>
              </div>

              {/* Chart Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Visual SVG Performance Line Chart */}
                <div className="bg-[#0d0f14]/85 border border-white/[0.03] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">Consolidated NAV</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                      +12.4% YTD <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>

                  <div className="relative h-32 flex items-end">
                    {/* SVG Sparkline Chart */}
                    <svg viewBox="0 0 300 100" className="w-full h-full">
                      <defs>
                        <linearGradient id="analyticsChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M0,80 Q25,75 50,60 T100,55 T150,30 T200,45 T250,20 T300,10"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      />
                      <motion.path
                        d="M0,80 Q25,75 50,60 T100,55 T150,30 T200,45 T250,20 T300,10 L300,100 L0,100 Z"
                        fill="url(#analyticsChartGrad)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-gray-600 font-mono tracking-wider pt-2 border-t border-white/[0.03]">
                    <span>JAN 2026</span>
                    <span>MAR 2026</span>
                    <span>MAY 2026</span>
                  </div>
                </div>

                {/* Asset Allocation segments */}
                <div className="bg-[#0d0f14]/85 border border-white/[0.03] rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest font-mono">Blended Allocations</span>
                      <span className="text-[9px] text-gray-600 font-bold font-mono">Consolidated</span>
                    </div>
                    
                    <div className="space-y-2">
                      {mockAllocation.map((alloc, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[9px] tracking-wide">
                            <span className="text-gray-400 font-medium">{alloc.name}</span>
                            <div className="space-x-1.5 font-bold">
                              <span className="text-gray-500">{alloc.rawVal}</span>
                              <span className="text-emerald-400">{alloc.pct}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-white/[0.02] h-1.5 rounded-full overflow-hidden border border-white/[0.04]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${alloc.pct}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                              className={`h-full rounded-full ${alloc.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Risk Parameters telemetry */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {riskParameters.map((param, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredMetric(idx)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    className={`bg-[#0d0f14]/65 border rounded-2xl p-4.5 transition-all duration-300 relative ${
                      hoveredMetric === idx
                        ? "border-emerald-500/40 shadow-lg shadow-emerald-500/5 bg-[#12151c]"
                        : "border-white/[0.03]"
                    }`}
                  >
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest font-mono block mb-1">
                      {param.label}
                    </span>
                    <span className={`text-xl font-extrabold font-mono tracking-tight ${param.color}`}>
                      {param.value}
                    </span>
                    <span className="text-[8px] text-gray-600 block mt-1.5 font-medium leading-none">
                      {param.sub}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Information Copywriting */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                  Factor Attribution
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                State-of-the-Art{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
                  Portfolio Telemetry
                </span>
              </h2>

              <p className="text-gray-400 text-lg mt-6 leading-relaxed">
                Unlock institutional-grade analytics, tracking drift offsets, volatility ratios, and value-at-risk computations in absolute real-time. Make smarter allocations effortlessly.
              </p>
            </motion.div>

            {/* Performance bullet highlights */}
            <div className="space-y-4">
              {[
                { title: "Dynamic Drift Detection", desc: "Monitors allocation deviations from IPS parameters and triggers rebalancing alerts instantly." },
                { title: "Factor Attribution Metrics", desc: "Isolate true investment performance alpha vs benchmark standards with statistical clarity." },
                { title: "Value at Risk Modelling", desc: "Automate VaR models and stress test historical portfolios under standard market crisis profiles." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all"
                >
                  <div className="h-6 w-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

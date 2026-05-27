import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Users, ShieldCheck, Sparkles } from "lucide-react";

const floatingMetrics = [
  { label: "AUM Managed", value: "$42.5M", icon: TrendingUp, color: "from-indigo-500 to-blue-500" },
  { label: "Active Clients", value: "38", icon: Users, color: "from-emerald-500 to-teal-500" },
  { label: "Compliance", value: "98.2%", icon: ShieldCheck, color: "from-purple-500 to-violet-500" },
  { label: "AI Accuracy", value: "96.7%", icon: Sparkles, color: "from-amber-500 to-orange-500" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-[#0a0c10]" />
      <div className="absolute top-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full bg-indigo-600/[0.07] blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.06] blur-[130px]" />
      <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
                  Now in Private Beta
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05]">
                AI-Native{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Private Banking
                </span>{" "}
                Workspace
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-gray-400 mt-6 leading-relaxed max-w-xl">
                More personalized wealth management powered by AI copilots, portfolio intelligence,
                and advisor workflows. Built for the next generation of private banking.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all border border-indigo-500/30 text-sm"
                >
                  Request Demo
                  <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 px-7 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 text-gray-200 font-semibold rounded-2xl transition-all text-sm"
                >
                  <Play className="h-4 w-4 text-indigo-400" />
                  Launch Workspace
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-10">
                <div className="flex -space-x-2">
                  {["bg-indigo-600", "bg-blue-600", "bg-emerald-600", "bg-purple-600"].map((bg, i) => (
                    <div
                      key={i}
                      className={`h-8 w-8 rounded-full ${bg} border-2 border-[#0a0c10] flex items-center justify-center text-[9px] font-bold text-white`}
                    >
                      {["JD", "AP", "SM", "ER"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-gray-400">
                    <span className="text-white font-semibold">500+</span> wealth advisors already onboarded
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main Dashboard Preview */}
            <div className="relative bg-[#12151c]/60 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 shadow-2xl shadow-indigo-600/[0.05]">
              {/* Fake Title Bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#0d0f14]/80 border border-white/5 rounded-lg px-3 py-1 text-[10px] text-gray-500 font-mono text-center">
                    app.wealthpilot.ai/dashboard
                  </div>
                </div>
              </div>

              {/* Mini KPI Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {floatingMetrics.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.15 }}
                      className="bg-[#0d0f14]/80 border border-white/[0.04] rounded-xl p-3.5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{m.label}</span>
                        <div className={`p-1.5 rounded-lg bg-gradient-to-r ${m.color} bg-opacity-10`}>
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <p className="text-lg font-black text-white font-mono">{m.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Fake Chart Area */}
              <div className="bg-[#0d0f14]/60 border border-white/[0.04] rounded-xl p-4 h-36">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AUM Performance</span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">+12.4% YTD</span>
                </div>
                {/* SVG Sparkline */}
                <svg viewBox="0 0 300 80" className="w-full h-20">
                  <defs>
                    <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0,60 Q30,55 60,50 T120,35 T180,40 T240,20 T300,15"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  <motion.path
                    d="M0,60 Q30,55 60,50 T120,35 T180,40 T240,20 T300,15 L300,80 L0,80 Z"
                    fill="url(#heroChartGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                  />
                </svg>
              </div>
            </div>

            {/* Floating AI Copilot card */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-8 bg-[#12151c]/80 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-4 shadow-xl shadow-indigo-600/10 max-w-[220px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">AI Copilot</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                "Rebalance Elena Rostova's portfolio — tech is 6.5% overweight vs IPS target."
              </p>
            </motion.div>

            {/* Floating risk badge */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-[#12151c]/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl px-4 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Risk Score</p>
                  <p className="text-sm font-black text-white font-mono">LOW — 92/100</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const FinalCTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0c10]">
      {/* Visual glowing overlay spots */}
      <div className="absolute inset-0 bg-[#0a0c10]" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/[0.06] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-r from-[#12151c] to-[#181d27] border border-white/[0.06] rounded-3xl p-12 text-center shadow-2xl shadow-indigo-600/[0.02]"
        >
          {/* Glass background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 opacity-0 hover:opacity-[0.01] rounded-3xl transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Sparkles element */}
            <div className="inline-flex items-center justify-center p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-white shadow-xl shadow-indigo-500/5 mb-3 mx-auto">
              <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Start Managing Wealth{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Smarter
              </span>
            </h2>

            <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto">
              Experience the private wealth management platform powered by context-aware AI agents, deep portfolio analytics, and bulletproof compliance telemetries.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all border border-indigo-500/30 text-sm cursor-pointer"
              >
                Request Beta Access
                <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 text-gray-200 font-semibold rounded-2xl transition-all text-sm cursor-pointer"
              >
                <Play className="h-4 w-4 text-indigo-400" />
                Launch Workspace
              </Link>
            </div>
            
            {/* Fine print */}
            <p className="text-[10px] text-gray-600 font-bold font-mono tracking-widest uppercase pt-6">
              ENTERPRISE PLATFORM • COMPLIANT WITH SEC & SECURE IPS MANDATES
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

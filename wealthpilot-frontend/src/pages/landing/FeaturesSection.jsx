import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  BarChart3,
  MessageSquareCode,
  ShieldAlert,
  FileText,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Wealth Copilot",
    description:
      "Context-aware AI assistant that understands your clients, portfolios, and compliance rules. Get instant recommendations, tax strategies, and rebalancing proposals.",
    gradient: "from-indigo-500 to-blue-500",
    glow: "shadow-indigo-600/20",
  },
  {
    icon: BarChart3,
    title: "Portfolio Analytics",
    description:
      "Deep performance attribution, risk decomposition, and factor analysis across all client portfolios with real-time benchmark comparisons.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-600/20",
  },
  {
    icon: MessageSquareCode,
    title: "AI Meeting Summaries",
    description:
      "Automatically transcribe and summarize client meetings. Extract action items, compliance notes, and generate follow-up recommendations.",
    gradient: "from-purple-500 to-violet-500",
    glow: "shadow-purple-600/20",
  },
  {
    icon: ShieldAlert,
    title: "Risk Intelligence",
    description:
      "Real-time drift monitoring, VaR analysis, stress testing, and automated compliance alerts when portfolios deviate from IPS parameters.",
    gradient: "from-amber-500 to-orange-500",
    glow: "shadow-amber-600/20",
  },
  {
    icon: FileText,
    title: "Automated Reports",
    description:
      "Generate institutional-quality quarterly performance memos, tax reports, and client communications with a single click.",
    gradient: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-600/20",
  },
  {
    icon: RefreshCw,
    title: "Rebalancing Insights",
    description:
      "Intelligent rebalancing recommendations with tax-loss harvesting, wash sale rule compliance, and optimal lot selection strategies.",
    gradient: "from-rose-500 to-pink-500",
    glow: "shadow-rose-600/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0c10]" />
      <div className="absolute top-[50%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.04] blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
            <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Manage Wealth
            </span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            A comprehensive AI-powered platform designed for private bankers, wealth advisors, and
            family offices.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className={`group relative bg-[#12151c]/40 backdrop-blur-sm border border-white/[0.04] hover:border-white/[0.08] rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${feature.glow}`}
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-5 shadow-lg ${feature.glow}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

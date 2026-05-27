import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bot, User, Send, ArrowRight, ShieldCheck, DollarSign, RefreshCw, AlertTriangle } from "lucide-react";

const mockConversations = {
  rebalance: [
    {
      role: "user",
      content: "Generate portfolio rebalance proposal for Elena Rostova"
    },
    {
      role: "assistant",
      content: `📊 STRATEGIC REBALANCING PROPOSAL FOR ELENA ROSTOVA
==================================================

Target Portfolio Status Check: DRIFT LEVEL 6.5% OVERWEIGHT IN TECH.
We recommend the following executions to align back to the standard GROWTH guidelines:

1. SELL Overweight Holdings:
   - Sell $812,500 of Apple Inc. (AAPL) (Current: 40.5% vs. Target: 35.0%).
   - Sell $750,000 of International Equities (Current: 26.0% vs. Target: 20.0%).

2. BUY Underweight Holdings:
   - Buy $1,150,000 of iShares Core US Aggregate Bond ETF (AGG) (Current: 15.8% vs. Target: 25.0%).
   - Buy $225,000 of Private Equity (Current: 8.2% vs. Target: 10.0%).

Total Trade Volumes: Sell $1,562,500 / Buy $1,562,500
Estimated Tax Impact: ~$4,200 Capital Gains (minimised via tax lot selection).

Would you like me to generate the trade compliance approval packet for Elena?`,
      type: "rebalance"
    }
  ],
  tax: [
    {
      role: "user",
      content: "Run tax-loss harvesting audit across Elena's portfolio"
    },
    {
      role: "assistant",
      content: `💸 TAX-LOSS HARVESTING SCAN: AUDIT SUMMARY
==================================================
Client: Elena Rostova | AUM: $12.50M

An audit of current tax lots has identified two active positions trading below cost basis suitable for harvesting:

1. Vanguard FTSE Developed Markets ETF (VEA) (Lot: 2025-11-14)
   - Cost Basis: $48.20 | Current: $42.10
   - Unrealised Loss: -$28,400 (Short-term)
2. iShares MSCI Emerging Markets ETF (EEM) (Lot: 2025-08-05)
   - Cost Basis: $41.50 | Current: $38.90
   - Unrealised Loss: -$16,800 (Long-term)

Harvestable Opportunities: -$45,200 in gross losses.
Strategic Recommendation: Harvest VEA and purchase iShares Core MSCI EAFE ETF (IEFA) as a proxy asset to maintain market exposure without violating the 30-day Wash Sale Rule.

Net Tax Savings Potential (at 20% Capital Gains Rate): ~$9,040

Select 'Execute Harvest' to queue the orders for EOD execution.`,
      type: "tax"
    }
  ],
  risk: [
    {
      role: "user",
      content: "Explain risk metrics for John Sterling's portfolio"
    },
    {
      role: "assistant",
      content: `🛡️ DEEP RISK TELEMETRY EXPLANATION: JOHN STERLING
==================================================

Your client's portfolio is currently configured with the following active risk coordinates:

• Sharpe Ratio: 1.84 (OPTIMAL)
  - Indicating superior risk-adjusted return efficiency, comfortably outperforming the benchmark standard of 1.20.

• Portfolio Beta: 1.12 (BALANCED)
  - Volatility correlation factor indicates standard market alignment.

• Value at Risk (VaR 95%): 4.2%
  - With 95% confidence, the portfolio value is protected against losses exceeding 4.2% (approx. $227,640) in any single month.

• Max Drawdown: -8.3% (SAFE)
  - Historical peak-to-trough drop bounds are well within the standard private banking limit of -15.0%.

Summary: The risk boundary matches the targeted Investment Policy Statement (IPS). The portfolio remains inside all regulatory risk tolerances.`,
      type: "risk"
    }
  ]
};

const suggestedPrompts = [
  { key: "rebalance", text: "Elena's Portfolio Rebalance", icon: RefreshCw },
  { key: "tax", text: "Tax-Loss Harvesting Scan", icon: DollarSign },
  { key: "risk", text: "John Sterling's Risk Audit", icon: ShieldCheck }
];

export const AICopilotShowcase = () => {
  const [activeChat, setActiveChat] = useState("initial");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Welcome, Relationship Manager. I have context-aware access to your book of business, including Elena Rostova, John Sterling, and Arthur Pendelton. Select one of the high-impact queries below to witness my live intelligence in action."
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handlePromptClick = async (key) => {
    if (isTyping) return;
    setIsTyping(true);
    setActiveChat(key);
    
    // Add user message immediately
    const userMsg = mockConversations[key][0];
    setMessages([userMsg]);

    // Simulate AI thinking and outputting
    await new Promise((resolve) => setTimeout(resolve, 800));
    setMessages([userMsg, mockConversations[key][1]]);
    setIsTyping(false);
  };

  const handleReset = () => {
    setActiveChat("initial");
    setMessages([
      {
        role: "assistant",
        content: "Welcome, Relationship Manager. I have context-aware access to your book of business, including Elena Rostova, John Sterling, and Arthur Pendelton. Select one of the high-impact queries below to witness my live intelligence in action."
      }
    ]);
  };

  return (
    <section id="copilot" className="relative py-28 overflow-hidden bg-[#0c0e12]">
      {/* Visual background decorations */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.04] blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Information and Pitch */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
                  Generative Intelligence
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Your Ultra-Capably{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Informed Copilot
                </span>
              </h2>

              <p className="text-gray-400 text-lg mt-6 leading-relaxed">
                Empower your private banking workflows with an AI advisor that maintains full state awareness over client portfolios, investment parameters, and corporate compliance mandates.
              </p>
            </motion.div>

            {/* Core Pillars */}
            <div className="space-y-4">
              {[
                { title: "Context-Aware Telemetry", desc: "Instantly links client portfolios, IPS models, and historical transactions to generate precise solutions." },
                { title: "Rigorous Compliance Safeguards", desc: "Auto-scans recommendations against strict regulatory limits, holding drift ranges, and wash-sale rules." },
                { title: "Click-to-Draft Workspace Flows", desc: "Converts complex rebalancing audits or market reviews into high-quality quarterly emails or secure PDF memos." }
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] transition-all"
                >
                  <div className="h-6 w-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">{pillar.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Chat Mockup */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#12151c]/60 backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 shadow-2xl shadow-indigo-900/[0.05]"
            >
              {/* Terminal Head Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.05] mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono">advisor-copilot.wealthpilot.ai</span>
                </div>
                {activeChat !== "initial" && (
                  <button
                    onClick={handleReset}
                    className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Reset Chat
                  </button>
                )}
              </div>

              {/* Chat Stream Window */}
              <div className="h-[300px] overflow-y-auto space-y-4 mb-6 pr-1 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3.5 ${msg.role === "user" ? "justify-end" : ""}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/10">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`rounded-2xl px-4.5 py-3 text-xs leading-relaxed max-w-[85%] whitespace-pre-wrap font-sans border ${
                          msg.role === "user"
                            ? "bg-indigo-600/10 border-indigo-500/25 text-gray-200"
                            : "bg-[#0d0f14]/80 border-white/[0.03] text-gray-300 font-mono leading-relaxed"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {msg.role === "user" && (
                        <div className="h-8 w-8 rounded-xl bg-gray-800 border border-white/5 flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3.5"
                    >
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-[#0d0f14]/80 border border-white/[0.03] rounded-2xl px-5 py-3.5 flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Suggestions Panel */}
              <div className="space-y-3 pt-4 border-t border-white/[0.04]">
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest px-1">
                  Trigger Mock Advisor Consultation
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {suggestedPrompts.map((p) => {
                    const Icon = p.icon;
                    const isActive = activeChat === p.key;
                    return (
                      <button
                        key={p.key}
                        onClick={() => handlePromptClick(p.key)}
                        disabled={isTyping}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-xs transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group ${
                          isActive
                            ? "bg-indigo-600/15 border-indigo-500/40 text-white font-bold"
                            : "bg-[#0d0f14]/40 border-white/[0.04] text-gray-400 hover:text-gray-200 hover:border-indigo-500/20"
                        }`}
                      >
                        <Icon className={`h-3.5 w-3.5 text-indigo-400 shrink-0 group-hover:scale-110 transition-transform ${isActive ? "scale-110 animate-pulse" : ""}`} />
                        <span className="truncate">{p.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

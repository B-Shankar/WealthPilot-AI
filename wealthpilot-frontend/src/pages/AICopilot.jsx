import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Bot, User, ArrowRight } from "lucide-react";

const suggestedPrompts = [
  "Generate portfolio rebalance proposal for Elena Rostova",
  "Run tax-loss harvesting audit across all client portfolios",
  "Explain risk metrics for John Sterling's dossier",
  "Draft a quarterly performance memo for Arthur Pendelton",
  "Compare sector allocation vs benchmark for all HNWI clients",
  "Identify top 3 underperforming positions across book of business",
];

export const AICopilot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to the AI Copilot workspace. I have full access to your client portfolios, risk models, and compliance parameters. Ask me anything about your book of business, or select a suggested prompt below to get started.",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content: `Analyzing your request: "${input}"...\n\nThis is a placeholder response. In production, the AI engine processes your query against live portfolio data, compliance rules, and market intelligence feeds.`,
      },
    ]);
    setInput("");
  };

  const handlePromptClick = (prompt) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt },
      {
        role: "assistant",
        content: `Processing: "${prompt}"...\n\nThis is a placeholder response. The full AI Copilot integrates with your wealth management backend for real-time portfolio analysis and advisory recommendations.`,
      },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-[calc(100vh-8rem)]"
    >
      {/* Header */}
      <div className="border-b border-[#1e2330] pb-5 mb-5 shrink-0">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
          <Sparkles className="h-4 w-4" />
          <span>AI Copilot Engine</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none">AI Copilot</h2>
        <p className="text-gray-500 text-sm mt-2">
          Your intelligent wealth management assistant with full portfolio context.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="shrink-0 h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center mt-0.5">
                <Bot className="h-4 w-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600/15 border border-indigo-500/20 text-gray-200"
                  : "bg-[#12151c]/60 border border-[#1e2330] text-gray-300"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="shrink-0 h-8 w-8 rounded-xl bg-gray-800 flex items-center justify-center mt-0.5">
                <User className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="mb-4 shrink-0">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2 px-1">Suggested Prompts</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(prompt)}
                className="flex items-center gap-2 text-left px-3.5 py-2.5 bg-[#12151c]/40 border border-[#1e2330] hover:border-indigo-500/30 rounded-xl text-xs text-gray-400 hover:text-gray-200 transition-all group cursor-pointer"
              >
                <ArrowRight className="h-3.5 w-3.5 text-indigo-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                <span className="truncate">{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="shrink-0 flex items-center gap-3 bg-[#12151c]/60 border border-[#1e2330] rounded-2xl p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask the AI Copilot anything about your portfolios..."
          className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-600 focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl text-white hover:from-indigo-500 hover:to-blue-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

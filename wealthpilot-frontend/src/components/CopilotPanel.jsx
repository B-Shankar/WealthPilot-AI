import React, { useState, useRef, useEffect } from "react";
import { useCopilot } from "../context/CopilotContext";
import { 
  Sparkles, 
  X, 
  Send, 
  Loader,
  RefreshCw,
  Scale,
  BadgeAlert,
  Percent,
  FileCheck,
  TrendingUp,
  Cpu
} from "lucide-react";

export const CopilotPanel = () => {
  const { 
    isOpen, 
    toggleCopilot, 
    messages, 
    sendMessage, 
    isSending,
    activeClient
  } = useCopilot();
  const [chatInput, setChatInput] = useState("");
  const scrollRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSending]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    sendMessage(chatInput);
    setChatInput("");
  };

  const handleSuggestedPrompt = (promptText) => {
    if (isSending) return;
    sendMessage(promptText);
  };

  const suggestedPrompts = [
    {
      label: "Portfolio Rebalance",
      icon: Scale,
      prompt: "Generate a strategic rebalancing proposal to resolve current drift bounds.",
      desc: "Sell overweight tech equities, buy corporate bonds"
    },
    {
      label: "Tax Loss Harvesting Scan",
      icon: Percent,
      prompt: "Run a tax-loss harvesting audit across the tax lots.",
      desc: "Harvest capital losses to offset gains"
    },
    {
      label: "Explain Risk Metrics",
      icon: BadgeAlert,
      prompt: "Conduct a multi-factor risk analysis explanation.",
      desc: "Detailed beta, Sharpe ratio, and VaR breakdown"
    },
    {
      label: "Quarterly Review Memo",
      icon: FileCheck,
      prompt: "Draft an institutional-quality Quarterly Performance Review memo.",
      desc: "Draft performance commentary for investor"
    }
  ];

  return (
    <div className={`fixed inset-y-0 right-0 w-[460px] bg-[#12151c]/95 backdrop-blur-2xl border-l border-[#1e2330] shadow-2xl transition-all duration-300 transform z-50 flex flex-col ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } select-none`}>
      
      {/* Panel Header */}
      <div className="p-5 border-b border-[#1e2330] flex items-center justify-between bg-[#181d27]/40 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-3 relative">
          <div className="bg-indigo-500/10 text-indigo-400 p-2 rounded-xl border border-indigo-500/20 flex items-center justify-center">
            <Cpu className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white tracking-wide flex items-center gap-1.5 leading-none">
              WealthPilot Copilot
            </h3>
            <span className="text-[10px] text-gray-500 font-bold uppercase mt-1 inline-block">Advisor AI Assistant</span>
          </div>
        </div>
        
        <button 
          onClick={toggleCopilot}
          className="p-2 rounded-xl border border-[#1e2330] hover:bg-[#1f2635] text-gray-400 hover:text-gray-200 transition-colors cursor-pointer active:scale-95"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Message Feed Display */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
        {messages.map((msg, index) => {
          const isUser = msg.role === "user";
          const isSystem = msg.role === "system";
          
          return (
            <div 
              key={msg.id || index} 
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              {isSystem ? (
                <div className="w-full text-[10px] text-indigo-400 bg-indigo-500/5 py-2 px-3.5 rounded-xl border border-indigo-500/10 font-mono tracking-tight text-center leading-relaxed">
                  🤖 {msg.content}
                </div>
              ) : (
                <div 
                  className={`max-w-[90%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed shadow-sm ${
                    isUser 
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-none" 
                      : "bg-[#181d27]/75 border border-[#1e2330] text-gray-300 rounded-bl-none"
                  }`}
                >
                  {/* Handle formatted text containing structured blocks */}
                  <p className="whitespace-pre-line font-medium leading-relaxed tracking-wide font-sans">{msg.content}</p>
                </div>
              )}
              <span className="text-[9px] font-semibold text-gray-600 mt-1.5 px-2.5 font-mono uppercase tracking-tight">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
        {isSending && (
          <div className="flex items-center gap-2.5 text-gray-400 text-xs pl-3.5 bg-[#181d27]/40 py-3.5 px-4 rounded-xl border border-[#1e2330] max-w-[90%] animate-pulse">
            <Loader className="h-4 w-4 animate-spin text-indigo-400" />
            <span className="font-medium tracking-tight">Analyzing portfolio telemetry context...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Suggested Action Prompts Drawer */}
      <div className="p-4 border-t border-[#1e2330] bg-[#12151c]/60">
        <div className="text-[10px] font-bold text-gray-500 tracking-wider uppercase mb-3 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Context Actions {activeClient ? `for ${activeClient.firstName}` : ""}</span>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          {suggestedPrompts.map((p, idx) => {
            const Icon = p.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSuggestedPrompt(p.prompt)}
                disabled={isSending}
                className="flex flex-col text-left p-2.5 bg-[#0d0f14]/80 border border-[#1e2330] rounded-xl hover:border-indigo-500/40 hover:bg-[#181d27] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">{p.label}</span>
                </div>
                <p className="text-[9px] text-gray-500 font-medium leading-normal truncate w-full">{p.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Input panel */}
      <div className="p-5 border-t border-[#1e2330] bg-[#181d27]/40 relative">
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isSending}
            placeholder={activeClient ? `Ask anything about ${activeClient.firstName}'s portfolio...` : "Load a client dossier to chat..."}
            className="flex-1 bg-[#0d0f14]/80 border border-[#1e2330] rounded-xl py-3 px-4 text-xs font-medium text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:bg-[#0d0f14] transition-all duration-200 disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isSending || !chatInput.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 flex items-center justify-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

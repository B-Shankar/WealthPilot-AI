import React, { useState } from "react";
import { useCopilot } from "../context/CopilotContext";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  RefreshCcw, 
  Info,
  DollarSign,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";

// Mock targets and actual weights for simulation
const mockDrifts = [
  { assetClass: "EQUITY", currentPct: 66.5, targetPct: 60.0, delta: 6.5, status: "over" },
  { assetClass: "FIXED_INCOME", currentPct: 25.8, targetPct: 30.0, delta: -4.2, status: "under" },
  { assetClass: "CASH_EQUIVALENT", currentPct: 7.7, targetPct: 10.0, delta: -2.3, status: "under" }
];

export const PortfolioRebalance = () => {
  const { openCopilot, setContextClient } = useCopilot();
  const [activeClientName, setActiveClientName] = useState("John Sterling");
  const [allocationList, setAllocationList] = useState(mockDrifts);
  const [isSimulated, setIsSimulated] = useState(false);
  const [simulationTrades, setSimulationTrades] = useState([]);

  const handleSimulate = () => {
    // Generate simulated transactional orders based on weights
    const trades = [
      { action: "SELL", asset: "US large Cap Equities (Equity)", amount: 350000, qty: "1,960 units", cost: "$178.50" },
      { action: "BUY", asset: "Global Corporate Bonds (Fixed Income)", amount: 225000, qty: "2,250 units", cost: "$100.00" },
      { action: "BUY", asset: "Liquid Yield Reserves (Cash Equiv)", amount: 125000, qty: "1,250 units", cost: "$100.00" }
    ];
    setSimulationTrades(trades);
    setIsSimulated(true);
  };

  const handleConsultCopilot = () => {
    setContextClient({
      id: "client-1",
      firstName: "John",
      lastName: "Sterling",
      riskProfile: "BALANCED",
      netWorth: 5420000
    });
    openCopilot();
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Rebalancing Sandbox</h2>
          <p className="text-gray-400 text-sm mt-0.5">Optimize portfolio weights to align with defined target model guidelines.</p>
        </div>
        
        <button 
          onClick={handleConsultCopilot}
          className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs font-semibold py-3 px-5 rounded-xl border border-indigo-500/20 flex items-center gap-2 transition-all shadow-md shadow-indigo-600/5"
        >
          <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
          Consult AI Rebalance Strategy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Current Allocation Weights Table */}
        <div className="lg:col-span-2 bg-[#12151c] border border-gray-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Active Account: {activeClientName}</h3>
              <p className="text-gray-500 text-xs mt-0.5 font-medium">Model Mapping: Balanced Multi-Asset ($5.42M Net Asset Value)</p>
            </div>
            <button className="p-2 border border-gray-800 hover:bg-[#181d27] rounded-xl text-gray-400 hover:text-white transition-colors" title="Sync Market prices">
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest pb-2 border-b border-gray-800 px-2">
              <span>Asset Class</span>
              <span className="text-right">Current Weight</span>
              <span className="text-right">Target Weight</span>
              <span className="text-right">Delta</span>
            </div>

            {allocationList.map((item, idx) => (
              <div key={idx} className="grid grid-cols-4 items-center py-3 border-b border-gray-850 px-2 text-sm">
                <span className="font-semibold text-white">{item.assetClass}</span>
                <span className="text-right text-gray-300">{item.currentPct}%</span>
                <span className="text-right text-gray-400">{item.targetPct}%</span>
                <span className={`text-right font-bold ${
                  item.status === "over" ? "text-amber-500" : "text-indigo-400"
                }`}>
                  {item.delta > 0 ? `+${item.delta}%` : `${item.delta}%`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button 
              onClick={handleSimulate}
              className="py-3 px-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/15"
            >
              Generate Rebalance Plan
            </button>
          </div>
        </div>

        {/* Informative Side Card */}
        <div className="space-y-6">
          <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-4.5 w-4.5 text-indigo-400" />
              <h4 className="font-bold text-sm text-white">Tax-Efficient Rebalancing</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              WealthPilot automatically evaluates capital gains taxation rules (such as short-term vs. long-term holding timelines) to minimize execution tax liability prior to order recommendation generation.
            </p>
          </div>
        </div>

      </div>

      {/* Transaction simulation outputs */}
      {isSimulated && (
        <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-6 animate-fadeIn">
          <div className="flex items-center gap-2 mb-6">
            <FileSpreadsheet className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Proposed Rebalancing Transaction Ledger</h3>
          </div>

          <div className="space-y-3">
            {simulationTrades.map((trade, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-[#181d27] border border-gray-850 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-md border ${
                    trade.action === "SELL" 
                      ? "bg-red-500/10 text-red-400 border-red-500/20" 
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {trade.action}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-white">{trade.asset}</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">Est. Qty: {trade.qty} | Index Price: {trade.cost}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white text-sm flex items-center justify-end">
                    <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                    {trade.amount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Approx Trade Weight</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button 
              className="py-3 px-5 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white text-xs font-semibold rounded-xl transition-all"
              onClick={() => setIsSimulated(false)}
            >
              Reset Simulation
            </button>
            <button className="py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/15 border border-indigo-500/15">
              Execute Trades in Brokerage
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

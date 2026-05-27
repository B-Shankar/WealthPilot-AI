import React from "react";
import { 
  TrendingUp, 
  Activity, 
  Percent, 
  ShieldAlert, 
  Sparkles,
  ArrowDownRight,
  Gauge
} from "lucide-react";

export const RiskAnalyticsCard = ({ metrics }) => {
  const {
    sharpeRatio,
    portfolioBeta,
    maxDrawdown,
    volatility,
    varValue
  } = metrics;

  const cards = [
    {
      title: "Sharpe Ratio",
      value: sharpeRatio,
      desc: "Risk-adjusted return ratio",
      benchmark: "Benchmark: 1.20",
      status: parseFloat(sharpeRatio) > 1.5 ? "OPTIMAL" : "WARNING",
      icon: Gauge,
      color: "from-blue-600/10 via-indigo-600/5 to-transparent border-indigo-500/20 text-indigo-400"
    },
    {
      title: "Portfolio Beta",
      value: portfolioBeta,
      desc: "Market sensitivity factor",
      benchmark: "S&P 500 Beta: 1.00",
      status: parseFloat(portfolioBeta) <= 1.0 ? "CONSERVATIVE" : "AGGRESSIVE",
      icon: Activity,
      color: "from-purple-600/10 via-pink-600/5 to-transparent border-purple-500/20 text-purple-400"
    },
    {
      title: "Max Drawdown",
      value: maxDrawdown,
      desc: "Peak-to-trough historical drop",
      benchmark: "Worst standard: -15.0%",
      status: "SAFE",
      icon: ArrowDownRight,
      color: "from-amber-600/10 via-orange-600/5 to-transparent border-amber-500/20 text-amber-400"
    },
    {
      title: "Volatility",
      value: volatility,
      desc: "Annualised standard deviation",
      benchmark: "Core standard: 10.0%",
      status: "STABLE",
      icon: Percent,
      color: "from-teal-600/10 via-emerald-600/5 to-transparent border-emerald-500/20 text-emerald-400"
    },
    {
      title: "Value at Risk (VaR 95%)",
      value: varValue,
      desc: "Worst monthly loss probability",
      benchmark: "Risk limit: 8.0%",
      status: "WITHIN BOUNDS",
      icon: ShieldAlert,
      color: "from-red-600/10 via-rose-600/5 to-transparent border-rose-500/20 text-rose-400"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 select-none">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className={`bg-gradient-to-br ${card.color} border rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-700/80 group flex flex-col justify-between`}
          >
            {/* Background glowing ring on hover */}
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-current opacity-[0.02] group-hover:scale-150 transition-transform duration-500" />
            
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{card.title}</span>
                <div className="p-1.5 bg-[#181d27]/70 border border-gray-800 rounded-lg text-white group-hover:border-indigo-500/30 transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-none mb-1 font-mono">{card.value}</h3>
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{card.desc}</p>
            </div>

            <div className="border-t border-gray-800/40 mt-4.5 pt-3.5 flex items-center justify-between gap-2">
              <span className="text-[9px] font-semibold text-gray-500 tracking-tight font-mono">{card.benchmark}</span>
              <span className="bg-white/5 border border-white/10 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider text-gray-400 scale-90">
                {card.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

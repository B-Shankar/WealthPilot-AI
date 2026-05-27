import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

export const PortfolioAllocationChart = ({ allocations }) => {
  // Format data for the bar chart comparison
  const barData = allocations.map(item => ({
    name: item.category,
    Current: item.current,
    Target: item.target
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#181d27]/95 border border-[#1e2330] rounded-xl p-3.5 shadow-2xl backdrop-blur-md">
          <p className="text-xs font-bold text-white tracking-wide uppercase mb-1.5">{payload[0].name || payload[0].payload.name}</p>
          <div className="space-y-1 text-xs font-mono">
            {payload.map((entry, idx) => (
              <div key={idx} className="flex justify-between gap-6 items-center">
                <span className="text-gray-500 font-sans">{entry.name}:</span>
                <span style={{ color: entry.color || "#818cf8" }} className="font-bold">
                  {entry.value.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 select-none">
      
      {/* Donut Current Allocation Layout */}
      <div className="bg-[#12151c]/40 border border-[#1e2330] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-0.5">Asset Mix Breakdown</h4>
          <p className="text-xs text-gray-500 font-medium">Active structural allocation weight distribution</p>
        </div>

        <div className="h-64 w-full flex items-center justify-center my-4 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocations}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={3}
                dataKey="current"
                nameKey="category"
              >
                {allocations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#12151c" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Central Label for Total Assets */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest leading-none">Net Value</span>
            <span className="text-xl font-black text-white tracking-tight mt-1">100%</span>
            <span className="text-[9px] font-semibold text-emerald-400 font-mono mt-0.5 tracking-wider">SECURE AUDIT</span>
          </div>
        </div>

        {/* Dynamic Legend Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {allocations.map((item, index) => (
            <div key={index} className="flex items-start gap-2 p-2 bg-[#0d0f14]/50 border border-gray-800/40 rounded-xl hover:border-gray-800 transition-colors">
              <span className="h-2 w-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div className="truncate">
                <p className="text-[10px] text-gray-400 font-semibold truncate leading-none mb-0.5">{item.category}</p>
                <p className="text-xs font-bold text-white font-mono leading-none">
                  {item.current}%
                  <span className="text-[9px] text-gray-500 font-normal font-sans ml-1">({((item.current - item.target) >= 0 ? "+" : "") + (item.current - item.target).toFixed(1)}%)</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target vs Current Bar Charts Comparison */}
      <div className="bg-[#12151c]/40 border border-[#1e2330] rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-0.5">Strategic Target Alignment</h4>
          <p className="text-xs text-gray-500 font-medium">Variance bounds comparison versus IPS model limits</p>
        </div>

        <div className="h-64 w-full my-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="name" stroke="#4b5563" fontSize={9} tickLine={false} />
              <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", fontFamily: "sans-serif", color: "#e5e7eb" }}
              />
              <Bar dataKey="Current" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={24} />
              <Bar dataKey="Target" fill="#10b981" opacity={0.65} radius={[4, 4, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#181d27]/40 border border-gray-800/40 rounded-xl p-3.5 text-xs text-gray-400 font-medium leading-relaxed">
          💡 <span className="text-white font-semibold">Variance Review:</span> Current weights show overweight exposure in <span className="text-indigo-400 font-semibold">US Equities</span>, resulting in an active rebalancing drift that requires action to lower overall beta.
        </div>
      </div>

    </div>
  );
};

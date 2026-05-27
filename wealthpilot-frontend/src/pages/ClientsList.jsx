import React, { useState } from "react";
import { useCopilot } from "../context/CopilotContext";
import { 
  Search, 
  UserPlus, 
  ShieldAlert, 
  Mail, 
  DollarSign, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  MessageSquare
} from "lucide-react";

// Robust mock dataset representing the RM's books of HNW individuals
const mockClients = [
  { id: "client-1", firstName: "John", lastName: "Sterling", email: "j.sterling@sterlingholdings.com", riskProfile: "BALANCED", netWorth: 5420000, onboardingStatus: "ACTIVE", phone: "+1 (555) 230-9014" },
  { id: "client-2", firstName: "Arthur", lastName: "Pendelton", email: "arthur@pendeltonpartners.co", riskProfile: "AGGRESSIVE", netWorth: 9800000, onboardingStatus: "ACTIVE", phone: "+1 (555) 890-4320" },
  { id: "client-3", firstName: "Sophia", lastName: "Martinez", email: "sophia.martinez@techgrowth.io", riskProfile: "CONSERVATIVE", netWorth: 3100000, onboardingStatus: "ACTIVE", phone: "+1 (555) 431-0985" },
  { id: "client-4", firstName: "Elena", lastName: "Rostova", email: "elena.rostova@genevagroup.ch", riskProfile: "GROWTH", netWorth: 12500000, onboardingStatus: "ACTIVE", phone: "+41 22 890 4123" },
  { id: "client-5", firstName: "Dev", lastName: "Mehta", email: "dev.mehta@mumbaimatics.in", riskProfile: "AGGRESSIVE", netWorth: 6750000, onboardingStatus: "ACTIVE", phone: "+91 22 5550 1984" },
  { id: "client-6", firstName: "Marcus", lastName: "Vance", email: "m.vance@vanceestates.com", riskProfile: "BALANCED", netWorth: 4900000, onboardingStatus: "ONBOARDING", phone: "+1 (555) 762-9011" }
];

export const ClientsList = ({ setSelectedClient, setActiveTab }) => {
  const { openCopilot, setContextClient } = useCopilot();
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");

  // Filtering criteria based on input states
  const filteredClients = mockClients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = riskFilter === "ALL" || client.riskProfile === riskFilter;
    return matchesSearch && matchesRisk;
  });

  const handleOpenClientDossier = (client) => {
    setSelectedClient(client);
    setContextClient(client); // Pre-feed client context to co-pilot
    setActiveTab("client-detail"); // Route to dossier detail
  };

  const handleQuickCopilot = (e, client) => {
    e.stopPropagation(); // Avoid triggering dossier routing
    setContextClient(client);
    openCopilot();
  };

  const getRiskColor = (profile) => {
    switch(profile) {
      case "CONSERVATIVE": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "BALANCED": return "bg-teal-500/10 text-teal-400 border-teal-500/20";
      case "GROWTH": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "AGGRESSIVE": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header controls section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Client Directory</h2>
          <p className="text-gray-400 text-sm mt-0.5">Manage relationship portfolios and AI communication channels.</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold py-3 px-5 rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all flex items-center gap-2 border border-indigo-500/20">
          <UserPlus className="h-4 w-4" />
          Onboard New Client
        </button>
      </div>

      {/* Filter and Search Bar controls */}
      <div className="flex flex-col md:flex-row gap-4 bg-[#12151c] border border-gray-800/80 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by client name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181d27] border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider pl-2">Filter Risk:</span>
          <select 
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-[#181d27] border border-gray-800 rounded-xl py-2.5 px-4 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50 cursor-pointer"
          >
            <option value="ALL">All Risk Tiers</option>
            <option value="CONSERVATIVE">Conservative</option>
            <option value="BALANCED">Balanced</option>
            <option value="GROWTH">Growth</option>
            <option value="AGGRESSIVE">Aggressive</option>
          </select>
        </div>
      </div>

      {/* Structured Cards Display for Clients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((c) => (
          <div 
            key={c.id}
            onClick={() => handleOpenClientDossier(c)}
            className="bg-[#12151c] border border-gray-800/80 hover:border-gray-700/80 rounded-2xl p-6 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Profile Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center font-bold text-sm border border-indigo-500/10">
                    {c.firstName[0]}{c.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight hover:text-indigo-400 transition-colors">{c.firstName} {c.lastName}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {c.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Aggregation metrics inside card */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-850 my-4 text-xs">
                <div>
                  <span className="text-gray-500 block mb-1">AUM Value</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                    {(c.netWorth / 1000000).toFixed(2)}M
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Risk Profile</span>
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold inline-block ${getRiskColor(c.riskProfile)}`}>
                    {c.riskProfile}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center gap-2 mt-4 pt-2">
              <button 
                onClick={(e) => handleQuickCopilot(e, c)}
                className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-600/5 hover:bg-indigo-600/10 hover:text-indigo-400 text-indigo-500 text-xs font-semibold rounded-xl border border-indigo-500/10 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Copilot Consult
              </button>
              
              <button 
                className="p-2.5 bg-gray-900/30 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white rounded-xl transition-colors"
                title="View Full History"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

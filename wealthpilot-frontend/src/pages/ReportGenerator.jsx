import React, { useState } from "react";
import { 
  Sparkles, 
  FileText, 
  CheckCircle, 
  Download, 
  Settings,
  ShieldCheck,
  ChevronRight,
  Loader
} from "lucide-react";

export const ReportGenerator = () => {
  const [selectedClient, setSelectedClient] = useState("client-1");
  const [reportType, setReportType] = useState("quarterly");
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [customCommentary, setCustomCommentary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPdf, setGeneratedPdf] = useState(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedPdf(null);

    // Simulate PDF template compiling latency in backend S3 buckets
    await new Promise(resolve => setTimeout(resolve, 2500));

    setGeneratedPdf({
      title: "Quarterly Portfolio Review Statement.pdf",
      size: "2.4 MB",
      date: "May 27, 2026",
      url: "#"
    });
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Report Generator Hub</h2>
        <p className="text-gray-400 text-sm mt-0.5">Compile beautiful, secure, client-facing PDF performance statements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Compilation Parameters panel */}
        <div className="lg:col-span-1 bg-[#12151c] border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white">Report Configuration</h3>
            
            {/* Target Client picker */}
            <div className="space-y-1.5 text-xs">
              <label className="text-gray-400 font-semibold uppercase tracking-wider block">Target Client dossier</label>
              <select 
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full bg-[#181d27] border border-gray-800 rounded-xl py-2.5 px-4 text-gray-300 focus:outline-none focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="client-1">John Sterling (Balanced)</option>
                <option value="client-2">Arthur Pendelton (Aggressive)</option>
                <option value="client-3">Sophia Martinez (Conservative)</option>
              </select>
            </div>

            {/* Template picker */}
            <div className="space-y-1.5 text-xs">
              <label className="text-gray-400 font-semibold uppercase tracking-wider block">Template Layout</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-[#181d27] border border-gray-800 rounded-xl py-2.5 px-4 text-gray-300 focus:outline-none focus:border-indigo-500/50 cursor-pointer"
              >
                <option value="quarterly">Quarterly Portfolio Performance Review</option>
                <option value="proposal">AI-native Investment Proposal Profile</option>
                <option value="tax">Capital Gains & Tax Harvesting Report</option>
              </select>
            </div>

            {/* Parameters toggles */}
            <div className="space-y-3 pt-2 text-xs">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={includeMetrics}
                  onChange={(e) => setIncludeMetrics(e.target.checked)}
                  className="rounded bg-[#181d27] border-gray-800 text-indigo-600 focus:ring-0 focus:ring-offset-0 h-4 w-4"
                />
                <span className="text-gray-300 font-semibold">Include Volatility & Sharpe Ratio Metrics</span>
              </label>
            </div>

            {/* Custom commentary text field */}
            <div className="space-y-1.5 text-xs">
              <label className="text-gray-400 font-semibold uppercase tracking-wider block">Advisor Custom Commentary</label>
              <textarea 
                value={customCommentary}
                onChange={(e) => setCustomCommentary(e.target.value)}
                placeholder="Include custom remarks regarding tech overweight trims..."
                rows={4}
                className="w-full bg-[#181d27] border border-gray-800 rounded-xl py-3 px-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
              />
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full mt-6 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all border border-indigo-500/20 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader className="h-4 w-4 animate-spin text-indigo-400" />
                Compiling PDF Statement...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Generate PDF Package
              </>
            )}
          </button>
        </div>

        {/* Dynamic preview loading blocks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skeleton view of compiling progress */}
          {isGenerating && (
            <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 min-h-[350px]">
              <div className="h-10 w-10 rounded-full border-t-2 border-indigo-500 border-r-2 border-indigo-500 animate-spin"></div>
              <h4 className="font-bold text-sm text-white">Generating Portfolio Review Statement</h4>
              <p className="text-gray-500 text-xs text-center max-w-sm">Generating table cells, compiling transaction data models, and embedding vector charts...</p>
            </div>
          )}

          {/* Generated PDF statement card downloads */}
          {!isGenerating && generatedPdf && (
            <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-8 animate-fadeIn flex flex-col items-center justify-center min-h-[350px]">
              <div className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl mb-4">
                <ShieldCheck className="h-10 w-10 text-emerald-500" />
              </div>
              <h3 className="font-bold text-white text-lg">{generatedPdf.title}</h3>
              <p className="text-gray-500 text-xs mt-1">Ready for RM review | Size: {generatedPdf.size} | Compiled: {generatedPdf.date}</p>
              
              <div className="flex gap-3 mt-8">
                <button className="py-2.5 px-4 bg-gray-900 hover:bg-[#181d27] border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold rounded-xl transition-all">
                  Open PDF in Tab
                </button>
                <a 
                  href={generatedPdf.url} 
                  className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/10 transition-all border border-indigo-500/20 flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  Download File
                </a>
              </div>
            </div>
          )}

          {/* Fallback empty workspace display */}
          {!isGenerating && !generatedPdf && (
            <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[350px]">
              <FileText className="h-12 w-12 text-gray-700 mb-4" />
              <h4 className="font-bold text-sm text-white">No Generated statement Ready</h4>
              <p className="text-gray-500 text-xs max-w-sm mt-1">Configure client details and compile parameters in the left panel to initiate automated reports generation.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

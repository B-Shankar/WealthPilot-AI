import React, { useState } from "react";
import { useCopilot } from "../context/CopilotContext";
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  Calendar,
  User,
  AlertTriangle,
  Play,
  ArrowRight,
  ClipboardList
} from "lucide-react";

export const MeetingSummarizer = () => {
  const { openCopilot } = useCopilot();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsProcessing(true);

    // Simulating audio parsing latency (Whisper API -> LLM Prompt engineering)
    await new Promise(resolve => setTimeout(resolve, 3000));

    const mockSummary = {
      clientName: "John Sterling",
      meetingDate: "May 27, 2026",
      summaryText: "Discussed general wealth preservation strategies. John expressed interest in reallocation toward high-yield corporate bonds due to volatile equity market sentiments. He wants to maintain a liquid cash buffer of at least 8% for unexpected corporate venture drawdowns.",
      goals: [
        { goal: "Retire at 55 with stable payout", timeframe: "10 years" },
        { goal: "Establish liquidity reserve for business operations", timeframe: "Immediate" }
      ],
      actionItems: [
        { owner: "Jane Doe (RM)", task: "Draft bond recommendation proposal sheet", due: "May 29, 2026" },
        { owner: "John Sterling (Client)", task: "Confirm capital injection figures", due: "June 2, 2026" }
      ]
    };

    setSummaryData(mockSummary);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Meeting Summarizer</h2>
        <p className="text-gray-400 text-sm mt-0.5">Transcribe advisor-client discussions and generate structured follow-up items.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Portal Section */}
        <div className="lg:col-span-1 bg-[#12151c] border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Audio Touchpoint Upload</h3>
            <p className="text-gray-500 text-xs leading-relaxed">Supported formats: MP3, WAV, M4A (Max 50MB). The AI engine automatically executes diarization and speaker labelling.</p>
            
            {/* Drag and drop sandbox wrapper */}
            <div className="border border-dashed border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center bg-[#181d27]/40 hover:bg-[#181d27]/80 transition-all cursor-pointer relative">
              <input 
                type="file" 
                onChange={handleFileChange}
                accept="audio/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="h-10 w-10 text-indigo-500 mb-3" />
              <span className="text-xs font-semibold text-gray-300">
                {file ? file.name : "Select or Drop Audio File"}
              </span>
              <span className="text-[10px] text-gray-500 mt-1">Estimating 1-2 min processing duration</span>
            </div>
          </div>

          <button 
            onClick={handleUpload}
            disabled={!file || isProcessing}
            className={`w-full mt-6 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-xl transition-all border border-indigo-500/20 flex items-center justify-center gap-2 ${
              (!file || isProcessing) ? "opacity-50 cursor-not-allowed" : "hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-indigo-600/10"
            }`}
          >
            {isProcessing ? "Processing Analytics..." : "Generate AI Summaries"}
          </button>
        </div>

        {/* Processing State Skeleton */}
        {isProcessing && (
          <div className="lg:col-span-2 bg-[#12151c] border border-gray-800/80 rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 min-h-[350px]">
            <div className="h-12 w-12 rounded-full border-t-2 border-indigo-500 border-r-2 border-indigo-500 animate-spin"></div>
            <h4 className="font-bold text-sm text-white">Transcribing & Indexing Discussed Goals...</h4>
            <p className="text-gray-500 text-xs text-center max-w-sm">Whisper engine is executing speaker separation. LangChain AI pipelines are analyzing compliance criteria...</p>
          </div>
        )}

        {/* Structured summary results panel */}
        {!isProcessing && summaryData && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#12151c] border border-gray-800/80 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-850 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Dossier Touchpoint Summary</h3>
                  <span className="text-[10px] text-gray-500 font-bold mt-0.5 block uppercase tracking-wider">Client: {summaryData.clientName} | Date: {summaryData.meetingDate}</span>
                </div>
                <button className="px-3 py-1.5 bg-[#181d27] hover:bg-indigo-600/5 text-gray-400 hover:text-indigo-400 text-[10px] font-bold rounded-lg border border-gray-800 hover:border-indigo-500/15 transition-all">
                  Edit Transcript
                </button>
              </div>

              {/* Summary paragraphs */}
              <div className="space-y-4 text-xs leading-relaxed text-gray-300 bg-[#181d27] p-4.5 rounded-xl border border-gray-850">
                <p className="font-semibold text-white">Executive briefing:</p>
                <p>{summaryData.summaryText}</p>
              </div>

              {/* Goals Discovered Panel */}
              <div className="mt-6 space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <ClipboardList className="h-4.5 w-4.5 text-indigo-400" />
                  Key Financial Goals Extracted
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summaryData.goals.map((g, idx) => (
                    <div key={idx} className="p-3 bg-[#181d27] border border-gray-850 rounded-xl text-xs">
                      <span className="text-indigo-400 font-bold block">{g.goal}</span>
                      <span className="text-[10px] text-gray-500 block mt-1">Timeline: {g.timeframe}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action items details */}
              <div className="mt-6 space-y-3">
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <CheckCircle className="h-4.5 w-4.5 text-indigo-400" />
                  Action Task List
                </h4>
                <div className="space-y-2.5">
                  {summaryData.actionItems.map((act, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 bg-[#181d27] border border-gray-850 rounded-xl text-xs">
                      <div>
                        <span className="font-semibold text-white block">{act.task}</span>
                        <span className="text-[10px] text-gray-500 block mt-0.5">Assigned to: {act.owner}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-gray-900/40 text-gray-400 border border-gray-800 text-[10px] font-bold rounded-lg shrink-0">
                        Due: {act.due}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-850">
                <button className="py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all border border-indigo-500/20">
                  Save Summary to CRM Dossier
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

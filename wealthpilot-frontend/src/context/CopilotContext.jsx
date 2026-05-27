import React, { createContext, useContext, useState } from "react";

const CopilotContext = createContext(null);

export const CopilotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "initial",
      role: "assistant",
      content: "Hello! I am your WealthPilot Copilot. I have access to your active clients, target asset models, and transaction logs. How can I assist you with portfolio analysis or meeting prep today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [activeClient, setActiveClient] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const toggleCopilot = () => setIsOpen((prev) => !prev);
  const openCopilot = () => setIsOpen(true);
  const closeCopilot = () => setIsOpen(false);

  // Injects client context from active page dossiers
  const setContextClient = (client) => {
    setActiveClient(client);
    setMessages((prev) => [
      ...prev,
      {
        id: `context-${Date.now()}`,
        role: "system",
        content: `Copilot context updated: Active Client is now ${client.firstName} ${client.lastName} (${client.riskProfile} Risk Profile, AUM: $${client.netWorth.toLocaleString()}).`,
        timestamp: new Date().toISOString()
      }
    ]);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      // Simulating API latency for high-end AI computation feel
      await new Promise(resolve => setTimeout(resolve, 1200));

      let assistantResponse = "";
      const lowerText = text.toLowerCase();

      if (activeClient) {
        if (lowerText.includes("rebalance") || lowerText.includes("proposal") || lowerText.includes("drift")) {
          const cashAmount = activeClient.cashReserve;
          const rebalanceValue = Math.round(activeClient.netWorth * 0.065);
          
          assistantResponse = `📊 STRATEGIC REBALANCING PROPOSAL FOR ${activeClient.firstName.toUpperCase()} ${activeClient.lastName.toUpperCase()}\n` +
            `==================================================\n\n` +
            `Target Portfolio Status Check: DRIFT LEVEL 6.5% OVERWEIGHT IN TECH / EQUITIES.\n` +
            `We recommend the following executions to align back to the standard ${activeClient.riskProfile} guidelines:\n\n` +
            `1. SELL Overweight Holdings:\n` +
            `   - Sell $${rebalanceValue.toLocaleString()} of Apple Inc. (AAPL) / Tech ETF holdings (Current: 40.5% vs. Target: 35.0%).\n` +
            `   - Sell $${Math.round(activeClient.netWorth * 0.06).toLocaleString()} of International Equities (Current: 26.0% vs. Target: 20.0%).\n\n` +
            `2. BUY Underweight Holdings:\n` +
            `   - Buy $${Math.round(activeClient.netWorth * 0.092).toLocaleString()} of iShares Core US Aggregate Bond ETF (AGG) (Current: 15.8% vs. Target: 25.0%).\n` +
            `   - Buy $${Math.round(activeClient.netWorth * 0.018).toLocaleString()} of Private Equity (Current: 8.2% vs. Target: 10.0%).\n\n` +
            `Total Trade Volumes: Sell $${(rebalanceValue * 2).toLocaleString()} / Buy $${(rebalanceValue * 2).toLocaleString()}\n` +
            `Estimated Tax Impact: ~$4,200 Capital Gains (minimised via lot selection).\n\n` +
            `Would you like me to generate the trade compliance approval packet for ${activeClient.firstName}?`;
            
        } else if (lowerText.includes("tax") || lowerText.includes("harvesting") || lowerText.includes("loss")) {
          assistantResponse = `💸 TAX-LOSS HARVESTING SCAN: AUDIT SUMMARY\n` +
            `==================================================\n` +
            `Client: ${activeClient.firstName} ${activeClient.lastName} | AUM: $${(activeClient.netWorth/1000000).toFixed(2)}M\n\n` +
            `An audit of current tax lots has identified three active positions trading below cost basis suitable for harvesting:\n\n` +
            `1. Vanguard FTSE Developed Markets ETF (VEA) (Lot: 2025-11-14)\n` +
            `   - Cost Basis: $48.20 | Current: $42.10\n   - Unrealised Loss: -$28,400 (Short-term)\n` +
            `2. iShares MSCI Emerging Markets ETF (EEM) (Lot: 2025-08-05)\n` +
            `   - Cost Basis: $41.50 | Current: $38.90\n   - Unrealised Loss: -$16,800 (Long-term)\n\n` +
            `Harvestable Opportunities: -$45,200 in gross losses.\n` +
            `Strategic Recommendation: Harvest VEA and purchase iShares Core MSCI EAFE ETF (IEFA) as a proxy asset to maintain market exposure without violating the 30-day Wash Sale Rule.\n\n` +
            `Net Tax Savings Potential (at 20% Capital Gains Rate): ~$9,040\n\n` +
            `Select 'Execute Harvest' to queue the orders for EOD execution.`;

        } else if (lowerText.includes("explain") || lowerText.includes("risk") || lowerText.includes("metrics") || lowerText.includes("analysis")) {
          assistantResponse = `🛡️ DEEP RISK TELEMETRY EXPLANATION: ${activeClient.firstName.toUpperCase()} ${activeClient.lastName.toUpperCase()}\n` +
            `==================================================\n\n` +
            `Your client's portfolio is currently configured with the following active risk coordinates:\n\n` +
            `• Sharpe Ratio: ${activeClient.riskMetrics.sharpeRatio} (OPTIMAL)\n` +
            `  - Indicating superior risk-adjusted return efficiency, comfortably outperforming the benchmark standard of 1.20.\n\n` +
            `• Portfolio Beta: ${activeClient.riskMetrics.portfolioBeta} (${activeClient.riskMetrics.portfolioBeta > 1 ? "AGGRESSIVE" : "CONSERVATIVE"})\n` +
            `  - Volatility correlation factor of ${activeClient.riskMetrics.portfolioBeta} indicates the portfolio will move ~$${(activeClient.riskMetrics.portfolioBeta * 100).toFixed(0)} for every $100 S&P 500 index movement.\n\n` +
            `• Value at Risk (VaR 95%): ${activeClient.riskMetrics.varValue}\n` +
            `  - With 95% confidence, the portfolio value is protected against losses exceeding ${activeClient.riskMetrics.varValue} (approx. $${Math.round(activeClient.netWorth * parseFloat(activeClient.riskMetrics.varValue)/100).toLocaleString()}) in any single month.\n\n` +
            `• Max Drawdown: ${activeClient.riskMetrics.maxDrawdown} (SAFE)\n` +
            `  - Historical peak-to-trough drop bounds are well within the standard private banking limit of -15.0%.\n\n` +
            `• Volatility: ${activeClient.riskMetrics.volatility} (STABLE)\n` +
            `  - Annualised standard deviation shows highly controlled price swing characteristics.\n\n` +
            `Summary: The risk boundary matches the targeted Investment Policy Statement (IPS). The minor equity drift is the only risk factor requiring attention.`;

        } else if (lowerText.includes("quarterly") || lowerText.includes("memo") || lowerText.includes("review")) {
          const dateStr = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
          assistantResponse = `📄 PRIVATE BANKING QUARTERLY MEMO DRAFT\n` +
            `==================================================\n` +
            `DATE: ${dateStr}\n` +
            `TO: ${activeClient.firstName} ${activeClient.lastName}\n` +
            `FROM: Jane Doe, Senior Private Wealth Advisor\n` +
            `SUBJECT: Q2 2026 Comprehensive Investment Performance & Allocation Memo\n\n` +
            `Dear ${activeClient.firstName},\n\n` +
            `I am pleased to provide this overview of your portfolio performance for the current quarter. Your capital, representing $${activeClient.netWorth.toLocaleString()} in net Assets Under Management, has demonstrated resilient growth, posting a return trajectory of +5.4% vs S&P 500's +4.8%.\n\n` +
            `Key Performance Drivers:\n` +
            `• Core US Equities, specifically tech assets, yielded exceptional performance, driving positive alpha.\n` +
            `• Fixed income hedges maintained stable yield-to-maturity distributions.\n\n` +
            `Strategic Alignments:\n` +
            `Due to capital appreciations, US Equities have drifted slightly overweight. We are recommending a routine rebalancing transaction to reduce risk bounds, transferring gains into institutional fixed income corporate debt. This re-establishes your target risk model parameters.\n\n` +
            `Please review this draft. Click 'Copy to Email' or 'Publish as Secure Document' to send to the investor.`;
            
        } else {
          assistantResponse = `Greetings! Regarding ${activeClient.firstName} ${activeClient.lastName}'s dossier, they are mapped to the ${activeClient.riskProfile} tier with $${activeClient.netWorth.toLocaleString()} AUM.\n\n` +
            `We recommend asking me one of the following to assist you today:\n` +
            `- "Generate portfolio rebalance proposal"\n` +
            `- "Run a tax-loss harvesting audit"\n` +
            `- "Explain risk metrics breakdown"\n` +
            `- "Draft a quarterly performance memo"`;
        }
      } else {
        if (lowerText.includes("aum") || lowerText.includes("book")) {
          assistantResponse = "📊 WORKSPACE BOOK-OF-BUSINESS STATUS\n" +
            "You currently oversee $42.50M in consolidated Assets Under Management across 38 active HNWI client folders. The standard blended Sharpe Ratio across all portfolios is a strong 1.84. There are currently 4 active drift alarms that require compliance adjustments.";
        } else {
          assistantResponse = "Welcome to the WealthPilot AI Advisor Workspace! I have loaded your book of business metadata.\n\n" +
            "To begin analyzing, select any client from the active directory or click 'Review AI Strategy' next to an active drift alarm on your dashboard. This will populate our chat context with their specific holdings, allocations, and compliance parameters.";
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-assistant`,
          role: "assistant",
          content: assistantResponse,
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error("AI Copilot request failed:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-error`,
          role: "assistant",
          content: "Sorry, I encountered an error coordinating with the AI Engine. Please check your network connection.",
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <CopilotContext.Provider
      value={{
        isOpen,
        messages,
        activeClient,
        isSending,
        toggleCopilot,
        openCopilot,
        closeCopilot,
        setContextClient,
        sendMessage
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
};

export const useCopilot = () => {
  const context = useContext(CopilotContext);
  if (!context) {
    throw new Error("useCopilot must be used within a CopilotProvider");
  }
  return context;
};

// Premium High-Fidelity Mock Data for WealthPilot AI Dashboard

// 1. Global Core Book-of-Business Analytics
export const globalMetrics = {
  aum: {
    value: "$42.50M",
    change: "+4.1% MoM",
    trend: "up",
    history: [
      { date: "Dec 2025", aum: 36.8, benchmark: 35.5 },
      { date: "Jan 2026", aum: 38.2, benchmark: 36.9 },
      { date: "Feb 2026", aum: 39.0, benchmark: 37.4 },
      { date: "Mar 2026", aum: 39.8, benchmark: 38.1 },
      { date: "Apr 2026", aum: 41.5, benchmark: 39.2 },
      { date: "May 2026", aum: 42.5, benchmark: 40.0 }
    ]
  },
  monthlyInflows: {
    value: "$1.25M",
    change: "+12.4% vs last month",
    trend: "up"
  },
  clientsCount: {
    value: "38 Active",
    change: "2 new onboarded this month",
    trend: "up"
  },
  driftAlerts: {
    value: "4 Portfolios",
    change: "Action required (>5% drift)",
    trend: "down"
  }
};

// 2. Comprehensive Client Portfolios with Targets and Assets Breakdown
export const clientPortfolios = [
  {
    id: "client-sterling",
    firstName: "John",
    lastName: "Sterling",
    riskProfile: "BALANCED GROWTH",
    netWorth: 5420000,
    cashReserve: 216800,
    advisorName: "Jane Doe",
    lastReviewed: "2026-05-12",
    complianceStatus: "DRIFTING",
    riskMetrics: {
      sharpeRatio: 1.85,
      portfolioBeta: 1.05,
      maxDrawdown: "-12.4%",
      volatility: "9.2%",
      varValue: "5.8%"
    },
    // Target vs Current Allocations
    allocations: [
      { category: "US Equities", current: 40.5, target: 35.0, color: "#6366f1", amount: 2195100 },
      { category: "International Equities", current: 26.0, target: 20.0, color: "#3b82f6", amount: 1409200 },
      { category: "Fixed Income", current: 15.8, target: 25.0, color: "#10b981", amount: 856360 },
      { category: "Private Equity", current: 8.2, target: 10.0, color: "#8b5cf6", amount: 444440 },
      { category: "Commodities", current: 5.5, target: 5.0, color: "#f59e0b", amount: 298100 },
      { category: "Cash", current: 4.0, target: 5.0, color: "#6b7280", amount: 216800 }
    ],
    driftPercentage: "+6.5%",
    primaryDriftAsset: "US Equities (Tech sector overweight)",
    performanceHistory: [
      { month: "Jan", balance: 5120000, sp500: 5100000 },
      { month: "Feb", balance: 5210000, sp500: 5180000 },
      { month: "Mar", balance: 5300000, sp500: 5220000 },
      { month: "Apr", balance: 5350000, sp500: 5280000 },
      { month: "May", balance: 5420000, sp500: 5310000 }
    ],
    recentTransactions: [
      { id: "tx-101", date: "2026-05-18", type: "BUY", asset: "Vanguard Total Stock Market ETF (VTI)", amount: 75000, status: "COMPLETED" },
      { id: "tx-102", date: "2026-05-10", type: "SELL", asset: "iShares Core S&P 500 ETF (IVV)", amount: 120000, status: "COMPLETED" },
      { id: "tx-103", date: "2026-04-28", type: "DIVIDEND", asset: "Apple Inc. (AAPL)", amount: 4850, status: "COMPLETED" }
    ]
  },
  {
    id: "client-pendelton",
    firstName: "Arthur",
    lastName: "Pendelton",
    riskProfile: "AGGRESSIVE CORE",
    netWorth: 9800000,
    cashReserve: 343000,
    advisorName: "Jane Doe",
    lastReviewed: "2026-05-24",
    complianceStatus: "DRIFTING",
    riskMetrics: {
      sharpeRatio: 2.15,
      portfolioBeta: 1.35,
      maxDrawdown: "-18.2%",
      volatility: "14.8%",
      varValue: "8.4%"
    },
    allocations: [
      { category: "US Equities", current: 55.0, target: 50.0, color: "#6366f1", amount: 5390000 },
      { category: "International Equities", current: 25.0, target: 20.0, color: "#3b82f6", amount: 2450000 },
      { category: "Fixed Income", current: 8.2, target: 14.0, color: "#10b981", amount: 803600 },
      { category: "Private Equity", current: 5.3, target: 10.0, color: "#8b5cf6", amount: 519400 },
      { category: "Commodities", current: 3.0, target: 3.0, color: "#f59e0b", amount: 294000 },
      { category: "Cash", current: 3.5, target: 3.0, color: "#6b7280", amount: 343000 }
    ],
    driftPercentage: "-5.8%",
    primaryDriftAsset: "Fixed Income (Underweight bonds)",
    performanceHistory: [
      { month: "Jan", balance: 9150000, sp500: 9100000 },
      { month: "Feb", balance: 9380000, sp500: 9240000 },
      { month: "Mar", balance: 9550000, sp500: 9320000 },
      { month: "Apr", balance: 9710000, sp500: 9420000 },
      { month: "May", balance: 9800000, sp500: 9480000 }
    ],
    recentTransactions: [
      { id: "tx-201", date: "2026-05-22", type: "BUY", asset: "NVIDIA Corp. (NVDA)", amount: 250000, status: "COMPLETED" },
      { id: "tx-202", date: "2026-05-15", type: "BUY", asset: "Microsoft Corp. (MSFT)", amount: 150000, status: "COMPLETED" }
    ]
  },
  {
    id: "client-martinez",
    firstName: "Sophia",
    lastName: "Martinez",
    riskProfile: "CONSERVATIVE INCOME",
    netWorth: 3100000,
    cashReserve: 248000,
    advisorName: "Jane Doe",
    lastReviewed: "2026-04-26",
    complianceStatus: "DRIFTING",
    riskMetrics: {
      sharpeRatio: 1.45,
      portfolioBeta: 0.52,
      maxDrawdown: "-5.2%",
      volatility: "4.8%",
      varValue: "2.4%"
    },
    allocations: [
      { category: "US Equities", current: 27.2, target: 20.0, color: "#6366f1", amount: 843200 },
      { category: "International Equities", current: 15.0, target: 10.0, color: "#3b82f6", amount: 465000 },
      { category: "Fixed Income", current: 42.8, target: 55.0, color: "#10b981", amount: 1326800 },
      { category: "Private Equity", current: 2.0, target: 5.0, color: "#8b5cf6", amount: 62000 },
      { category: "Commodities", current: 5.0, target: 5.0, color: "#f59e0b", amount: 155000 },
      { category: "Cash", current: 8.0, target: 5.0, color: "#6b7280", amount: 248000 }
    ],
    driftPercentage: "+7.2%",
    primaryDriftAsset: "US Equities (Growth stock overweight)",
    performanceHistory: [
      { month: "Jan", balance: 3020000, sp500: 3000000 },
      { month: "Feb", balance: 3040000, sp500: 3050000 },
      { month: "Mar", balance: 3080000, sp500: 3070000 },
      { month: "Apr", balance: 3090000, sp500: 3110000 },
      { month: "May", balance: 3100000, sp500: 3130000 }
    ],
    recentTransactions: [
      { id: "tx-301", date: "2026-05-02", type: "BUY", asset: "iShares Core U.S. Aggregate Bond ETF (AGG)", amount: 80000, status: "COMPLETED" },
      { id: "tx-302", date: "2026-04-20", type: "SELL", asset: "Chevron Corp. (CVX)", amount: 35000, status: "COMPLETED" }
    ]
  },
  {
    id: "client-chen",
    firstName: "Marcus",
    lastName: "Chen",
    riskProfile: "BALANCED CORE",
    netWorth: 12500000,
    cashReserve: 625000,
    advisorName: "Jane Doe",
    lastReviewed: "2026-05-20",
    complianceStatus: "ALIGNED",
    riskMetrics: {
      sharpeRatio: 2.02,
      portfolioBeta: 0.98,
      maxDrawdown: "-11.1%",
      volatility: "8.9%",
      varValue: "5.1%"
    },
    allocations: [
      { category: "US Equities", current: 34.5, target: 35.0, color: "#6366f1", amount: 4312500 },
      { category: "International Equities", current: 20.2, target: 20.0, color: "#3b82f6", amount: 2525000 },
      { category: "Fixed Income", current: 25.1, target: 25.0, color: "#10b981", amount: 3137500 },
      { category: "Private Equity", current: 10.2, target: 10.0, color: "#8b5cf6", amount: 1275000 },
      { category: "Commodities", current: 5.0, target: 5.0, color: "#f59e0b", amount: 625000 },
      { category: "Cash", current: 5.0, target: 5.0, color: "#6b7280", amount: 625000 }
    ],
    driftPercentage: "+0.3%",
    primaryDriftAsset: "None (Fully Aligned)",
    performanceHistory: [
      { month: "Jan", balance: 11900000, sp500: 11800000 },
      { month: "Feb", balance: 12100000, sp500: 12050000 },
      { month: "Mar", balance: 12300000, sp500: 12150000 },
      { month: "Apr", balance: 12450000, sp500: 12350000 },
      { month: "May", balance: 12500000, sp500: 12500000 }
    ],
    recentTransactions: [
      { id: "tx-401", date: "2026-05-19", type: "BUY", asset: "Gold Trust (GLD)", amount: 50000, status: "COMPLETED" }
    ]
  }
];

// Helper to find client by ID
export const getClientById = (id) => {
  return clientPortfolios.find(c => c.id === id) || clientPortfolios[0];
};

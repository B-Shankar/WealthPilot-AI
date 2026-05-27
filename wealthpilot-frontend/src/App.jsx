import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CopilotProvider } from "./context/CopilotContext";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Public Page Components
import { LandingPage } from "./pages/landing/LandingPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

// Protected Page Components
import { Dashboard } from "./pages/Dashboard";
import { ClientsList } from "./pages/ClientsList";
import { ClientDetail } from "./pages/ClientDetail";
import { PortfolioRebalance } from "./pages/PortfolioRebalance";
import { Analytics } from "./pages/Analytics";
import { AICopilot } from "./pages/AICopilot";
import { MeetingSummarizer } from "./pages/MeetingSummarizer";
import { ReportGenerator } from "./pages/ReportGenerator";
import { Settings } from "./pages/Settings";

// Smart Login redirection component that handles returning to the desired protected page
const LoginRedirect = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }
  return <Login />;
};

// Cockpit canvas area encapsulating the MainLayout and Sidebar telemetry
const ProtectedLayout = ({ selectedClient, setSelectedClient }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Calculate active tab highlighting dynamically from route paths
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith("/dashboard")) return "dashboard";
    if (path.startsWith("/clients")) return "clients";
    if (path.startsWith("/portfolio")) return "portfolio";
    if (path.startsWith("/meetings")) return "meetings";
    if (path.startsWith("/reports")) return "reports";
    return "";
  };

  const activeTab = getActiveTab();

  // Keep sidebar navigation compatible with existing callbacks
  const setActiveTab = (tabId) => {
    if (tabId === "client-detail") {
      navigate("/clients/detail");
    } else {
      navigate(`/${tabId}`);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <Routes>
          <Route path="dashboard" element={<Dashboard setActiveTab={setActiveTab} setSelectedClient={setSelectedClient} />} />
          <Route path="clients" element={<ClientsList setSelectedClient={setSelectedClient} setActiveTab={setActiveTab} />} />
          <Route path="clients/detail" element={<ClientDetail client={selectedClient} setActiveTab={setActiveTab} />} />
          <Route path="portfolio" element={<PortfolioRebalance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-copilot" element={<AICopilot />} />
          <Route path="meetings" element={<MeetingSummarizer />} />
          <Route path="reports" element={<ReportGenerator />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </ProtectedRoute>
  );
};

// Switchboard Wrapper
const AppContent = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Workspace */}
        <Route path="/*" element={
          <ProtectedLayout 
            selectedClient={selectedClient} 
            setSelectedClient={setSelectedClient} 
          />
        } />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AuthProvider>
      <CopilotProvider>
        <AppContent />
      </CopilotProvider>
    </AuthProvider>
  );
}

export default App;


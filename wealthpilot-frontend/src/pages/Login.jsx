import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  Lock,
  Mail,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(
        result.error || "Authentication failed. Check your credentials."
      );
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("advisor@wealthpilot.ai");
    setPassword("SecurePassword123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center p-6 relative overflow-hidden font-sans">

      {/* Ambient Glow Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>

      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#12151c]/60 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative z-10">

        {/* Back to Home */}
        <div className="absolute top-6 left-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Branding */}
        <div className="flex flex-col items-center justify-center mb-8 mt-8">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10 mb-3">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight text-center">
            WealthPilot AI
          </h2>

          <p className="text-gray-400 text-xs text-center mt-1 font-medium tracking-wide uppercase">
            Private Banking Workspace
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-500/5 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-500" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="advisor@wealthpilot.ai"
                className="w-full bg-[#181d27]/80 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              Security Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-500" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full bg-[#181d27]/80 border border-gray-800 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all border border-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading
              ? "Authenticating Session..."
              : "Authorize Advisor Account"}

            {!loading && <ArrowRight className="h-4.5 w-4.5" />}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 border-t border-gray-800/80 pt-6 text-center">
          <p className="text-xs text-gray-400 mb-3">
            Testing in prototype / evaluation mode?
          </p>

          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/5 hover:bg-indigo-500/10 px-4 py-2.5 rounded-xl border border-indigo-500/10"
          >
            Auto-fill Mock Advisor Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
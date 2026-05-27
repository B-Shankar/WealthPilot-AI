import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles, Lock, Mail, AlertTriangle, ArrowRight, User, ArrowLeft } from "lucide-react";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    // Simulate registration
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#12151c]/60 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative z-10">
        {/* Back link */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-xs font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>

        {/* Branding */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-gradient-to-tr from-emerald-600 to-indigo-500 p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/10 mb-3">
            <User className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight text-center">Create Account</h2>
          <p className="text-gray-400 text-xs text-center mt-1 font-medium tracking-wide uppercase">
            Join WealthPilot AI Workspace
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-500/5 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Jane"
                className="w-full bg-[#181d27]/80 border border-gray-850 rounded-xl py-3 px-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full bg-[#181d27]/80 border border-gray-850 rounded-xl py-3 px-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="advisor@firm.com"
                className="w-full bg-[#181d27]/80 border border-gray-850 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••••••"
                className="w-full bg-[#181d27]/80 border border-gray-850 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="••••••••••••"
                className="w-full bg-[#181d27]/80 border border-gray-850 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all border border-indigo-500/20 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? "Creating Account..." : "Create Advisor Account"}
            {!loading && <ArrowRight className="h-4.5 w-4.5" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

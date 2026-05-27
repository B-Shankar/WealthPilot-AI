import React from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, Database } from "lucide-react";

const settingSections = [
  {
    title: "Profile",
    icon: User,
    items: [
      { label: "Display Name", value: "Jane Doe" },
      { label: "Email", value: "advisor@wealthpilot.ai" },
      { label: "Role", value: "Relationship Manager" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Email Notifications", value: "Enabled", toggle: true },
      { label: "Drift Alerts", value: "Enabled", toggle: true },
      { label: "Meeting Reminders", value: "Enabled", toggle: true },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { label: "Two-Factor Auth", value: "Enabled", toggle: true },
      { label: "Session Timeout", value: "30 minutes" },
      { label: "API Key", value: "••••••••••••7f3a" },
    ],
  },
  {
    title: "Preferences",
    icon: Palette,
    items: [
      { label: "Theme", value: "Dark" },
      { label: "Language", value: "English" },
      { label: "Currency", value: "USD" },
    ],
  },
];

export const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="border-b border-[#1e2330] pb-6">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
          <SettingsIcon className="h-4 w-4" />
          <span>System Configuration</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none">Settings</h2>
        <p className="text-gray-500 text-sm mt-2">Manage your workspace configuration and preferences.</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingSections.map((section, idx) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-[#12151c]/40 border border-[#1e2330] rounded-2xl p-6 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                  <SectionIcon className="h-4.5 w-4.5 text-indigo-400" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-[#0d0f14]/60 border border-gray-800/40 rounded-xl"
                  >
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    {item.toggle ? (
                      <div className="w-9 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 h-4 w-4 bg-white rounded-full shadow-sm transition-all" />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300 font-semibold">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

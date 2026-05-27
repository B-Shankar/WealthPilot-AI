import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    Product: [
      { label: "AI Copilot", href: "#copilot" },
      { label: "Analytics Engine", href: "#analytics" },
      { label: "Platform Features", href: "#features" },
      { label: "Drift Monitor", href: "/portfolio" }
    ],
    Company: [
      { label: "About WealthPilot", href: "/" },
      { label: "Bank Partners", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Press Office", href: "/" }
    ],
    Resources: [
      { label: "API Documentation", href: "/" },
      { label: "FinTech Blog", href: "/" },
      { label: "Research Papers", href: "/" },
      { label: "Webinars", href: "/" }
    ],
    Legal: [
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
      { label: "Advisor Disclosures", href: "/" },
      { label: "SEC Form ADV", href: "/" }
    ]
  };

  const socialLinks = [
    {
      href: "/",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      href: "/",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      href: "/",
      svg: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#0c0e12] border-t border-white/[0.04] pt-20 pb-12 select-none relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core Sitemap */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-16 border-b border-white/[0.04]">
          {/* Logo Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-tr from-indigo-600 via-blue-500 to-emerald-400 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/20 group-hover:shadow-indigo-600/40 transition-shadow">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-wide">WealthPilot</span>
                <span className="bg-indigo-500/20 text-indigo-400 text-[8px] font-extrabold px-1.5 py-0.5 rounded border border-indigo-500/30">
                  AI
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              WealthPilot AI is a next-generation private banking and family office operating platform. Empowering advisors with context-aware intelligence.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4.5 pt-2">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] text-gray-500 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12">
          <p className="text-[10px] text-gray-600 font-medium">
            © 2026 WealthPilot AI Technologies Inc. All rights reserved.
          </p>
          <p className="text-[9px] text-gray-600 font-mono tracking-tight leading-relaxed max-w-2xl text-center md:text-right">
            Disclaimer: For advisor and institutional platform testing purposes only. Simulated performance telemetry and AI consultation results do not constitute financial advice under SEC regulations.
          </p>
        </div>

      </div>
    </footer>
  );
};


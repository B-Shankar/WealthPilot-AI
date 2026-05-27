import React from "react";
import { motion } from "framer-motion";

const brands = [
  "Goldman Sachs",
  "Morgan Stanley",
  "J.P. Morgan",
  "BlackRock",
  "Vanguard",
  "Fidelity",
  "Charles Schwab",
  "UBS",
];

export const TrustedBySection = () => {
  return (
    <section className="relative py-16 border-y border-white/[0.03] bg-[#0a0c10]/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-10"
        >
          Trusted by Leading Wealth Management Firms
        </motion.p>

        {/* Logo strip */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0c10] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0c10] to-transparent z-10" />

          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 whitespace-nowrap"
          >
            {/* Duplicate for seamless scroll */}
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 shrink-0 opacity-30 hover:opacity-60 transition-opacity duration-500"
              >
                <div className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <span className="text-[9px] font-black text-gray-500">
                    {brand.split(" ").map(w => w[0]).join("")}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-500 tracking-wide">{brand}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

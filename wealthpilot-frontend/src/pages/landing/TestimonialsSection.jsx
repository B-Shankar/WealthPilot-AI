import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, ShieldCheck, TrendingUp, Users } from "lucide-react";

const testimonials = [
  {
    quote: "WealthPilot AI has transformed our relationship management. The AI Copilot scans complex portfolios for drift deviations and tax harvesting options in seconds, saving hours of manual audit work.",
    author: "Richard V. Vance",
    role: "Managing Director, Wealth Management",
    firm: "Morgan Stanley",
    metric: "+35% Advisor Efficiency",
    initials: "RV"
  },
  {
    quote: "Our family office handles complex assets and custom compliance rules. WealthPilot's AI Copilot translates compliance guidelines into actionable rebalancing packets with single-click ease.",
    author: "Elena Rostova",
    role: "Managing Partner & Trustee",
    firm: "Geneva Trust Office",
    metric: "Zero Compliance Drifts",
    initials: "ER"
  },
  {
    quote: "Private banking clients demand personalization. The instant AI-generated performance memos and meeting summaries keep our clients engaged and deeply informed with institutional-grade reports.",
    author: "Sophia Martinez",
    role: "Senior Relationship Manager",
    firm: "Charles Schwab Advisor Services",
    metric: "100% Client Retention",
    initials: "SM"
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-28 overflow-hidden bg-[#0c0e12]">
      {/* Background visual cues */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4"
          >
            <Users className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
              Advisor Telemetry
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-white tracking-tight"
          >
            Endorsed by{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Elite Wealth Advisors
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            See how private bankers and wealth advisors utilize our AI workspace to maximize investment outcomes and scale relationship models.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-[#12151c]/45 backdrop-blur-sm border border-white/[0.04] hover:border-white/[0.08] rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl shadow-indigo-600/[0.02]"
            >
              <div>
                {/* Five Stars Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="h-8 w-8 text-indigo-500/10 absolute -top-4 -left-3.5" />
                  <p className="text-sm text-gray-300 leading-relaxed relative z-10 font-sans italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              {/* Author footer and metrics */}
              <div className="border-t border-white/[0.04] pt-6 mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white shadow-md text-sm border border-indigo-400/20">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">{t.author}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.role}</p>
                    <p className="text-[10px] text-indigo-400 font-medium font-sans mt-0.5">{t.firm}</p>
                  </div>
                </div>
                
                {/* High Impact Success Metric Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  <ShieldCheck className="h-3 w-3 shrink-0" />
                  {t.metric}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

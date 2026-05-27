import React from "react";
import { motion } from "framer-motion";
import { LandingNav } from "./LandingNav";
import { HeroSection } from "./HeroSection";
import { TrustedBySection } from "./TrustedBySection";
import { FeaturesSection } from "./FeaturesSection";
import { AICopilotShowcase } from "./AICopilotShowcase";
import { PortfolioAnalyticsShowcase } from "./PortfolioAnalyticsShowcase";
import { TestimonialsSection } from "./TestimonialsSection";
import { FinalCTASection } from "./FinalCTASection";
import { Footer } from "./Footer";

export const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0d0f14] text-gray-200 overflow-x-hidden"
    >
      {/* 1. Transparent Floating Navigation Bar */}
      <LandingNav />

      {/* 2. Hero Header Section */}
      <HeroSection />

      {/* 3. Infinite Scrolling Trusted-By Partners strip */}
      <TrustedBySection />

      {/* 4. Grid Features list */}
      <FeaturesSection />

      {/* 5. Live Showcase 1: Interactive AI Copilot */}
      <AICopilotShowcase />

      {/* 6. Live Showcase 2: High-Telemetry Analytics */}
      <PortfolioAnalyticsShowcase />

      {/* 7. Client/Advisor Testimonials Section */}
      <TestimonialsSection />

      {/* 8. Call to Action Signup Banner */}
      <FinalCTASection />

      {/* 9. Site Footer Map */}
      <Footer />
    </motion.div>
  );
};

export default LandingPage;

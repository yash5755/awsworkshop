import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-black border-t border-white/10 overflow-hidden py-12 px-4 text-white text-center">
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            AWS & <span className="text-[#9810FA]">DEVOPS</span>
          </h2>
          <p className="text-[#9810FA] text-sm tracking-widest font-semibold uppercase">2026</p>
        </div>
        
        <div className="text-center text-gray-400 text-sm sm:text-base space-y-1">
          <p className="font-semibold text-white/80">June 12, 2026</p>
          <p>Vidyavardhaka College of Engineering, Mysore</p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#9810FA]/30 to-transparent my-6" />

        <div className="text-center">
          <p className="text-white/40 text-xs sm:text-sm">
            © 2026 AWS & DevOps Workshop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

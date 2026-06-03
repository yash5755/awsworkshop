import React, { useRef, useEffect } from "react";
import DottedGlowBackground from "./DottedGlowBackground";

const SOCIETIES = [
  // AWS official logo (external SVG) — used for both AWS and Student Builders
  { name: "AWS", logo: "/Logo/aws.png" },
  // VVCE college main logo (local)
  { name: "VVCE", logo: "/Logo/Logo.png" },
  // AWS Student Builders (reusing AWS mark as the group badge)
  { name: "AWS Student Builders", logo: "/Logo/aws_builder.jpeg" },
  // Dept. of CSE, VVCE (use local club logo as department mark)
  { name: "Dept. of CSE, VVCE", logo: "/Logo/club%20logo.jpeg" }
];

const SocietiesCarousel = () => {
  const scrollContainerRef = useRef(null);

  // Original list duplicated once to form a seamless loop of 10 items
  const duplicatedSocieties = [...SOCIETIES, ...SOCIETIES];

  useEffect(() => {
    let animationFrameId;
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPos = 0;
    const scrollSpeed = 0.5; // Smooth scroll increment speed

    const scrollLoop = () => {
      scrollPos += scrollSpeed;
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full bg-black py-16 md:py-24 overflow-hidden">
      {/* Background grids and effects */}
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.05] opacity-40" />
      <div className="pointer-events-none absolute inset-0 z-0">
        <DottedGlowBackground 
          opacity={0.3} 
          gap={20} 
          radius={2.5} 
          color="rgba(152,16,250,0.08)" 
          glowColor="rgba(12,12,12,0.6)" 
          backgroundOpacity={0} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center space-y-10">
        
        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Powered By <span className="text-[#9810FA]">Our Societies</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Collaborating to make AWS & DevOps Workshop 2026 extraordinary
          </p>
        </div>

        {/* Marquee Row */}
        <div className="relative w-full">
          {/* Side blur linear-gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div 
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex gap-12 md:gap-16 overflow-x-hidden scrollbar-hide py-4"
          >
            {duplicatedSocieties.map((soc, idx) => (
              <div 
                key={`${soc.name}-${idx}`} 
                className="shrink-0 group cursor-pointer"
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-[#9810FA]/50 hover:scale-105 flex items-center justify-center">
                  <img 
                    src={soc.logo} 
                    alt={soc.name} 
                    className="w-full h-full object-contain p-4 society-logo-img transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pulsing indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="w-2 h-2 rounded-full bg-[#9810FA] animate-pulse" />
          <div style={{ animationDelay: "0.2s" }} className="w-2 h-2 rounded-full bg-[#9810FA]/60 animate-pulse" />
          <div style={{ animationDelay: "0.4s" }} className="w-2 h-2 rounded-full bg-[#9810FA]/30 animate-pulse" />
        </div>

      </div>

      <style>{`
        /* Hide scrollbars but keep functionality */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .society-logo-img {
          filter: grayscale(100%);
          opacity: 0.7;
        }
        
        .group:hover .society-logo-img {
          filter: grayscale(0%) !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default SocietiesCarousel;

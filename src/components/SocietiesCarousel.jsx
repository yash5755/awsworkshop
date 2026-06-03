import React, { useRef, useEffect } from "react";
import DottedGlowBackground from "./DottedGlowBackground";

const SOCIETIES = [
  { name: "AWS", logo: "/Logo/aws.png" },
  { name: "VVCE", logo: "/Logo/Logo.png" },
  { name: "AWS Student Builders", logo: "/Logo/aws_builder.jpeg" },
  { name: "Dept. of CSE, VVCE", logo: "/Logo/club%20logo.jpeg" },
];

const SocietiesCarousel = () => {
  const scrollContainerRef = useRef(null);
  const duplicatedSocieties = [...SOCIETIES, ...SOCIETIES];

  useEffect(() => {
    let animationFrameId;
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPos = 0;
    const scrollSpeed = 0.5;

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
    <div className="relative w-full bg-black pt-12 pb-16 sm:pt-16 sm:pb-16 md:py-24 overflow-hidden">
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
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white px-2">
            Powered By <span className="text-[#9810FA]">Our Societies</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">
            Collaborating to make AWS & DevOps Workshop 2026 extraordinary
          </p>
        </div>

        <div className="relative w-full max-w-full">
          <div className="sponsor-marquee-fade-left" aria-hidden />
          <div className="sponsor-marquee-fade-right" aria-hidden />

          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex gap-8 overflow-x-hidden scrollbar-hide py-4"
          >
            {duplicatedSocieties.map((soc, idx) => (
              <div key={`${soc.name}-${idx}`} className="shrink-0 group">
                <div className="sponsor-logo-card">
                  <img
                    src={soc.logo}
                    alt={soc.name}
                    className="society-logo-img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="w-2 h-2 rounded-full bg-[#9810FA] animate-pulse" />
          <div
            style={{ animationDelay: "0.2s" }}
            className="w-2 h-2 rounded-full bg-[#9810FA]/60 animate-pulse"
          />
          <div
            style={{ animationDelay: "0.4s" }}
            className="w-2 h-2 rounded-full bg-[#9810FA]/30 animate-pulse"
          />
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .society-logo-img {
          filter: grayscale(100%);
          opacity: 0.7;
        }

        .group:hover .society-logo-img {
          filter: grayscale(0%);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default SocietiesCarousel;

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DottedGlowBackground from "./DottedGlowBackground";

const MaskReveal = ({ children, revealText, size = 10, revealSize = 600, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ x: null, y: null });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xVal = e.clientX || (e.touches && e.touches[0]?.clientX);
    const yVal = e.clientY || (e.touches && e.touches[0]?.clientY);
    
    if (xVal !== undefined && yVal !== undefined) {
      setMouseCoords({
        x: xVal - rect.left,
        y: yVal - rect.top,
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchmove", handleMouseMove);
      return () => {
        if (container) {
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("touchmove", handleMouseMove);
        }
      };
    }
  }, []);

  const maxRevealSize = isMobile
    ? Math.min(revealSize, Math.min(400, typeof window !== "undefined" ? window.innerWidth * 0.88 : 400))
    : revealSize;
  const currentSize = isHovered ? maxRevealSize : size;

  // Auto-hover on mobile after a short delay
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setIsHovered(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Handle coordinates offset
  const posX = mouseCoords.x !== null ? mouseCoords.x : -currentSize / 2;
  const posY = mouseCoords.y !== null ? mouseCoords.y : -currentSize / 2;

  return (
    <motion.div
      ref={containerRef}
      className={`min-h-screen-safe h-screen-safe relative w-full overflow-hidden ${className}`}
      animate={{ backgroundColor: isHovered ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Mask Layer (revealed inside circle) */}
      <motion.div
        className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl absolute bg-black bg-grid-white/[0.2] text-white"
        style={{
          maskImage: "url(/mask.svg)",
          WebkitMaskImage: "url(/mask.svg)",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
        animate={{
          WebkitMaskPosition: `${posX - currentSize / 2}px ${posY - currentSize / 2}px`,
          WebkitMaskSize: `${currentSize}px`,
          maskPosition: `${posX - currentSize / 2}px ${posY - currentSize / 2}px`,
          maskSize: `${currentSize}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        {/* Dimming overlay on top of video */}
        <div className="absolute inset-0 bg-black h-full w-full z-0 opacity-50" />
        
        {/* Reveal content (video overlay) - no w-full h-full to let aspect ratio center */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          className="max-w-4xl mx-auto text-center text-white text-2xl sm:text-3xl md:text-4xl font-bold relative z-20 px-4"
        >
          {revealText}
        </div>
      </motion.div>

      {/* Non-masked Layer (default visible bottom layer) */}
      <div className="w-full h-full flex items-center justify-center text-slate-800 pointer-events-none select-none">
        {children}
      </div>
    </motion.div>
  );
};

const TechverseMaskEffect = () => {
  return (
    <div className="relative flex min-h-screen-safe h-screen-safe w-full items-center justify-center overflow-hidden bg-black">
      {/* Grid Overlay background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.08] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />

      {/* Reusable Dotted glow background */}
      <div className="pointer-events-none absolute inset-0">
        <DottedGlowBackground 
          opacity={0.6}
          gap={20}
          radius={2.5}
          color="rgba(255,255,255,0.08)"
          glowColor="rgba(12,12,12,0.6)"
          backgroundOpacity={0}
          style={{
            maskImage: "radial-gradient(circle at center, transparent 35%, black 70%)",
            WebkitMaskImage: "radial-gradient(circle at center, transparent 35%, black 70%)"
          }}
        />
      </div>

      {/* Mask Reveal Layout */}
      <MaskReveal
        className="relative min-h-screen-safe h-screen-safe border-none bg-transparent"
        revealText={
          <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6">
            <video
              src="/Videos/TextVideo.mp4"
              className="h-full w-full object-cover rounded-xl sm:rounded-2xl md:rounded-[2.5rem]"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-black/40" />
            <p className="absolute mx-auto max-w-3xl text-center text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white px-4 sm:px-6 leading-snug sm:leading-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]">
              <span className="hidden sm:inline">
                Hover to explore the AWS workshop journey — the cloud concepts, the hands-on builds, the live deployments.
              </span>
              <span className="sm:hidden">
                Tap to explore the AWS workshop — cloud fundamentals, hands-on builds, and live deployments.
              </span>
            </p>
          </div>
        }
      >
        <div className="mx-auto max-w-5xl text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-400 px-4 sm:px-6 md:px-8 leading-snug sm:leading-tight">
          Discover the world of cloud computing at our{" "}
          <span className="text-purple-600">AWS Workshop</span>. Learn AWS fundamentals,{" "}
          <span className="text-purple-600">build your portfolio website,</span> and deploy it to the cloud using EC2 and CI/CD.
        </div>
      </MaskReveal>
    </div>
  );
};

export default TechverseMaskEffect;

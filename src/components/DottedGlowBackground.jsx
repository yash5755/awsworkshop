import React, { useMemo } from "react";

const DottedGlowBackground = ({
  className = "",
  opacity = 0.75,
  gap = 20,
  radius = 2.5,
  color = "rgba(255,255,255,0.08)",
  glowColor = "rgba(12,12,12,0.6)",
  backgroundOpacity = 0,
  speedMin = 0.4,
  speedMax = 1.4,
  speedScale = 1,
  style = {}
}) => {
  const variables = useMemo(() => ({
    "--dgb-gap": `${gap}px`,
    "--dgb-radius": `${radius}px`,
    "--dgb-dot-color": color,
    "--dgb-glow-color": glowColor,
    "--dgb-opacity": opacity.toString(),
    "--dgb-bg-opacity": backgroundOpacity.toString(),
    "--dgb-speed-min": `${speedMin}s`,
    "--dgb-speed-max": `${speedMax}s`,
    "--dgb-speed-scale": speedScale.toString()
  }), [gap, radius, color, glowColor, opacity, backgroundOpacity, speedMin, speedMax, speedScale]);

  return (
    <div 
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ ...variables, ...style }}
    >
      {/* Grid of dots */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, var(--dgb-dot-color) var(--dgb-radius), transparent calc(var(--dgb-radius) + 1px))",
          backgroundSize: "var(--dgb-gap) var(--dgb-gap)",
          opacity: "var(--dgb-opacity)",
          mixBlendMode: "lighten"
        }}
      />
      
      {/* Glow shapes */}
      <div 
        className="absolute -inset-32"
        style={{
          background: "radial-gradient(circle at 30% 30%, var(--dgb-glow-color), transparent 55%), radial-gradient(circle at 70% 70%, var(--dgb-glow-color), transparent 55%)",
          filter: "blur(120px)",
          opacity: "calc(var(--dgb-opacity) * 0.7)"
        }}
      />
      
      {/* Optional dark background overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0,0,0,var(--dgb-bg-opacity))"
        }}
      />
    </div>
  );
};

export default DottedGlowBackground;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DottedGlowBackground from "./DottedGlowBackground";

const CAROUSEL_ITEMS = [
  {
    title: "Introduction to AWS Cloud",
    price: "FREE",
    members: "Individual",
    tags: "Cloud Computing, AWS Services, Global Infrastructure, Cloud Fundamentals",
    img: "/Modules_Images/aws_builder.jpeg",
  },
  {
    title: "Amazon EC2 Fundamentals",
    price: "FREE",
    members: "Individual",
    tags: "EC2 Instances, Security Groups, Virtual Servers, AWS Deployment",
    img: "/Modules_Images/cyber.jpg",
  },
  {
    title: "Build Portfolio Website with Kiro",
    price: "FREE",
    members: "Individual",
    tags: "Web Development, Portfolio Design, Kiro, Personal Branding",
    img: "/Modules_Images/takken8.jpg",
  },
  {
    title: "Deploy Website to AWS",
    price: "FREE",
    members: "Individual",
    tags: "Hosting, EC2 Deployment, Cloud Applications, Live Website",
    img: "/Modules_Images/typing.jpg",
  },
  {
    title: "CI/CD with GitHub Actions",
    price: "FREE",
    members: "Individual",
    tags: "DevOps, Automation, Continuous Integration, Continuous Deployment",
    img: "/Modules_Images/webdev.jpg",
  },
  {
    title: "AWS Career & Networking Session",
    price: "FREE",
    members: "Individual",
    tags: "AWS Community, Career Guidance, Certifications, Networking",
    img: "/Modules_Images/speedprogramming.jpg",
  },
];

const ModulesCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  const activeItem = CAROUSEL_ITEMS[activeIdx];

  return (
    <div className="relative min-h-[60vh] w-full bg-black py-12 sm:py-16 px-4 md:px-8 text-white overflow-x-hidden">
      <DottedGlowBackground />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4 mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white px-2">
            Workshop Modules
          </h2>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Explore the same module details shown on the modules page, now highlighted on the home page.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-4 md:mb-8 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <div className="module-carousel-media">
              <img
                key={activeItem.img}
                src={activeItem.img}
                alt={activeItem.title}
                loading="lazy"
                decoding="async"
              />
              <div className="module-carousel-media-overlay" aria-hidden />
            </div>

            <div className="relative flex flex-col justify-end p-5 sm:p-8 md:p-10 text-left space-y-3 sm:space-y-4 bg-gradient-to-br from-black/90 via-black/80 to-[#12051d]">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-[#e0aaff] font-semibold">
                  Home Modules Preview
                </p>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white leading-tight">
                  {activeItem.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-white/90">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                  {activeItem.price}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                  {activeItem.members}
                </span>
              </div>

              <p className="text-sm md:text-lg text-gray-200 leading-relaxed">{activeItem.tags}</p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/modules"
                  className="inline-block px-6 py-2.5 bg-[#9810FA] hover:bg-[#9810FA]/90 text-white font-bold rounded-lg text-sm transition-all shadow-md"
                >
                  View Details →
                </Link>
                <Link
                  to="/register"
                  className="inline-block px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg text-sm transition-all border border-white/10"
                >
                  Prerequisites
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrev}
              className="module-carousel-desktop-arrows prev"
              aria-label="Previous Module"
            >
              ←
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="module-carousel-desktop-arrows next"
              aria-label="Next Module"
            >
              →
            </button>
          </div>

          <div className="module-carousel-mobile-nav">
            <button
              onClick={handlePrev}
              type="button"
              className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-lg"
              aria-label="Previous Module"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="w-11 h-11 rounded-full bg-[#9810FA] border border-[#9810FA]/50 flex items-center justify-center text-white text-lg"
              aria-label="Next Module"
            >
              →
            </button>
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {CAROUSEL_ITEMS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  idx === activeIdx ? "bg-[#9810FA] w-6" : "bg-white/20 hover:bg-white/40 w-3"
                }`}
                aria-label={`Go to module ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulesCarousel;

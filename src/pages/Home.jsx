import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ShaderBackground from "../components/ShaderBackground";
import ModelViewer3D from "../components/ModelViewer3D";
import HackathonCalendar from "../components/HackathonCalendar";
import TechverseMaskEffect from "../components/TechverseMaskEffect";
import ImagesSliderDemo from "../components/ImagesSliderDemo";
import ModulesCarousel from "../components/ModulesCarousel";
import SocietiesCarousel from "../components/SocietiesCarousel";
import Footer from "../components/Footer";

// Horizontal scrolling ticker at the bottom of the landing section
const Ticker = () => {
  const e = (
    <>
      <h2 className="shrink-0 text-white text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AWS & DevOps</h2>
      <h2 className="shrink-0 text-white/80 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>12 June 2026</h2>
      <h2 className="shrink-0 text-transparent text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-black outline-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>AWS & DevOps</h2>
      <h2 className="shrink-0 text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Join Us</h2>
      <h2 className="shrink-0 text-transparent text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-black outline-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>12 June 2026</h2>
      <h2 className="shrink-0 text-white/80 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Be There</h2>
      <h2 className="shrink-0 text-white text-7xl sm:text-7xl md:text-8xl lg:text-9xl font-black" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Workshop</h2>
      <h2 className="shrink-0 text-transparent text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold outline-text" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>June 2026</h2>
    </>
  );
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center select-none pointer-events-none pb-8 sm:pb-12 md:pb-16 overflow-hidden">
      <div className="relative w-full">
        <div className="animate-horizontal-scroll flex items-center gap-8 sm:gap-12 md:gap-16 w-max">
          {e}
          {e}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [finishLoading, setFinishLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuRef = useRef(null);

  const handleModelLoaded = () => {
    setModelLoaded(true);
    setFinishLoading(true);
  };

  // GSAP animations for the Menu Overlay opening and closing
  useEffect(() => {
    if (menuRef.current) {
      if (menuOpen) {
        const tl = gsap.timeline();
        tl.set(menuRef.current, { display: "flex" });
        tl.to(menuRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
        tl.to(".nav-link", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.2");
        tl.to(".nav-footer", { opacity: 1, duration: 0.4 }, "-=0.2");
      } else {
        const tl = gsap.timeline();
        tl.to(".nav-link", { opacity: 0, y: 20, duration: 0.3, stagger: 0.04, ease: "power2.in" });
        tl.to(".nav-footer", { opacity: 0, duration: 0.2 }, "-=0.2");
        tl.to(menuRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
        tl.set(menuRef.current, { display: "none" });
      }
    }
  }, [menuOpen]);

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden selection:bg-[#9810FA]/30 selection:text-white">
      
      {/* Main Page Layout */}
      <div className="w-full relative">
        
        {/* Floating Menu Toggle Button */}
        <button 
          className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-100 flex flex-col justify-center items-center w-12 h-12 sm:w-14 sm:h-14 cursor-pointer group backdrop-blur-md bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#9810FA]/50 transition-all duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`block w-6 sm:w-7 h-0.5 bg-white transition-all duration-500 ease-out group-hover:bg-[#9810FA] ${
            menuOpen ? "rotate-45 translate-y-[6px]" : "translate-y-[-0.35rem]"
          }`} />
          <span className={`block w-6 sm:w-7 h-0.5 bg-white transition-all duration-300 group-hover:bg-[#9810FA] ${
            menuOpen ? "opacity-0 my-0" : "opacity-100 my-1.5"
          }`} />
          <span className={`block w-6 sm:w-7 h-0.5 bg-white transition-all duration-500 ease-out group-hover:bg-[#9810FA] ${
            menuOpen ? "-rotate-45 -translate-y-[6px]" : "translate-y-[0.35rem]"
          }`} />
        </button>

        {/* SECTION 1: Immersive Hero Section */}
        <section className="min-h-screen h-screen w-full bg-black relative overflow-hidden">
          
          {/* Blurry Top Banner Overlay */}
          <div 
            className="absolute top-0 left-0 w-full h-32 sm:h-48 md:h-64 bg-cover z-0 opacity-50 blur-sm pointer-events-none"
            style={{ backgroundImage: "url(/Umt.jpg)", backgroundPosition: "center center" }}
          />

          {/* Immersive 3D computers model viewport (fills screen) */}
          <ModelViewer3D onModelLoaded={handleModelLoaded} />

          {/* Bottom Scrolling Marquee ticker (shown when model loaded) */}
          {finishLoading && <Ticker />}
        </section>

        {/* Sub-sections rendering sequentially after loading finished */}
        {finishLoading && (
          <>
            {/* SECTION 2: Countdown Calendar */}
            <HackathonCalendar />

            {/* SECTION 3: Mask Effect Video Section */}
            <TechverseMaskEffect />

            {/* SECTION 4: Images Slider Showcase */}
            <ImagesSliderDemo />

            {/* SECTION 5: Modules Carousel */}
            <ModulesCarousel />

            {/* SECTION 6: Societies Marquee */}
            <SocietiesCarousel />

            {/* SECTION 7: Footer */}
            <Footer />
          </>
        )}

        {/* CSS custom keyframe animations and styles */}
        <style>{`
          .outline-text {
            -webkit-text-stroke: 2px white;
            text-stroke: 2px white;
            color: transparent;
            paint-order: stroke fill;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            opacity: 0;
            animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .delay-200 {
            animation-delay: 0.25s;
          }
        `}</style>

        {/* FULL SCREEN NAVIGATION MENU OVERLAY */}
        <div 
          ref={menuRef}
          style={{ display: "none", opacity: 0 }}
          className="fixed inset-0 z-90 flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Nebulae WebGL shader background under the navigation menu */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="fixed inset-0 w-screen h-screen bg-black" style={{ zIndex: -1, pointerEvents: "none" }}>
              <ShaderBackground color="#9810FA" />
            </div>
          </div>
          <div className="absolute inset-0 z-1 bg-black/60 backdrop-blur-md" />

          <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 text-center">
            <div className="nav-link opacity-0 translate-y-8 mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                AWS & DevOps<span className="text-[#9810FA]">Workshop</span>
              </h1>
              <p className="text-center text-gray-400 text-xs sm:text-sm mt-2 tracking-wider">2026</p>
            </div>

            <nav className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Schedule", path: "/events" },
                { name: "Sponsors", path: "/sponsors" },
                { name: "Modules", path: "/modules" },
              ].map((item) => (
                <Link 
                  key={item.name}
                  className="nav-link opacity-0 translate-y-8 group cursor-pointer relative py-1"
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide transition-all duration-300 group-hover:text-[#9810FA] group-hover:scale-105">
                    {item.name}
                  </h2>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9810FA] transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}

              <Link 
                className="nav-link opacity-0 translate-y-8 group cursor-pointer mt-3 sm:mt-4" 
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                <div className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#9810FA] hover:bg-[#9810FA]/90 text-white font-bold text-lg sm:text-xl md:text-2xl rounded-full transition-all duration-300 shadow-lg shadow-[#9810FA]/50 hover:shadow-xl hover:shadow-[#9810FA]/70 hover:scale-105">
                  Register Now
                </div>
              </Link>

              <Link 
                className="nav-link opacity-0 translate-y-8 group cursor-pointer relative mt-2" 
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide transition-all duration-300 group-hover:text-[#9810FA] group-hover:scale-105">
                  Contact
                </h2>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9810FA] transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            </nav>

            {/* Menu Footer */}
            <div className="nav-footer opacity-0 mt-8 sm:mt-10 md:mt-12 flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/awssbg_vvce?igsh=d3U4ZXZ2M295Zm5h" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#9810FA] hover:border-[#9810FA] transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.98 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/aws-student-builder-group/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-[#9810FA] hover:border-[#9810FA] transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
                  </svg>
                </a>
              </div>
              <div className="text-center font-normal">
                <p className="text-white/60 text-xs">June 12, 2026 • VVCE Mysore</p>
                <p className="text-white/40 text-xs mt-1">© 2026 AWS & DevOps Workshop. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

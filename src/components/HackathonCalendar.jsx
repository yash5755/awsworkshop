import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DottedGlowBackground from "./DottedGlowBackground";

const HackathonCalendar = () => {
  // unpkg cally script integration
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/cally";
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const targetDate = new Date("2026-01-05T00:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;
      let tempTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        tempTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(tempTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (num) => String(num).padStart(2, "0");
  const isTimeUp = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="relative flex min-h-0 md:min-h-screen-safe w-full items-center justify-center overflow-hidden bg-black py-8 sm:py-12 md:py-20 pb-6 sm:pb-12 md:pb-20">
      
      {/* Background grids and effects */}
      <div className="pointer-events-none absolute inset-0 bg-grid-white/[0.05] opacity-40" />
      <div className="pointer-events-none absolute inset-0">
        <DottedGlowBackground 
          opacity={0.6}
          gap={20}
          radius={2.5}
          color="rgba(255,255,255,0.08)"
          glowColor="rgba(12,12,12,0.6)"
          backgroundOpacity={0}
          style={{
            maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Giant header title - TECHVERSE 2026 */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-tight leading-tight sm:leading-none px-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            AWS & DevOps <span className="text-[#9810FA]">Workshop</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r bg-gradient-to-r from-transparent to-[#9810FA]" />
            <p className="text-xl md:text-2xl text-gray-400 font-light uppercase tracking-[0.3em]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              2026
            </p>
            <div className="h-px w-12 bg-linear-to-l bg-gradient-to-l from-transparent to-[#9810FA]" />
          </div>
        </div>

        {/* Sub-heading */}
        <div className="text-center mb-10 animate-fade-in-delay-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Save the <span className="text-[#9810FA]">Date</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            One day of innovation, competition, and technology
          </p>
        </div>

        {/* Inline countdown timer */}
        <div className="flex items-center justify-center mb-8 px-2">
          <div className="backdrop-blur-xl bg-white/5 border border-[#9810FA]/25 rounded-xl px-3 sm:px-4 py-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full">
            {isTimeUp ? (
              <div className="text-white font-semibold">Event starts on June 12, 2026</div>
            ) : (
              <>
                <div className="text-center px-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">{timeLeft.days}</div>
                  <div className="text-xs text-gray-400">Days</div>
                </div>
                <div className="text-white/30">:</div>
                <div className="text-center px-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">{formatNum(timeLeft.hours)}</div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
                <div className="text-white/30">:</div>
                <div className="text-center px-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">{formatNum(timeLeft.minutes)}</div>
                  <div className="text-xs text-gray-400">Mins</div>
                </div>
                <div className="text-white/30">:</div>
                <div className="text-center px-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">{formatNum(timeLeft.seconds)}</div>
                  <div className="text-xs text-gray-400">Secs</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Inline mini indicators */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 mb-6 sm:mb-10 max-w-md sm:max-w-none mx-auto animate-fade-in-delay-2">
          {/* Indicator 1 */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/5 border border-white/10 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded bg-[#9810FA]/20 flex items-center justify-center">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9810FA]">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold text-xs sm:text-sm leading-tight">60+</div>
              <div className="text-gray-500 text-[10px] sm:text-xs font-medium leading-tight truncate sm:whitespace-normal">
                <span className="sm:hidden">Participants</span>
                <span className="hidden sm:inline">Expected Participants</span>
              </div>
            </div>
          </div>
          {/* Indicator 2 */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/5 border border-white/10 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded bg-[#9810FA]/20 flex items-center justify-center">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9810FA]">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold text-xs sm:text-sm leading-tight">1 Day</div>
              <div className="text-gray-500 text-[10px] sm:text-xs font-medium leading-tight">Duration</div>
            </div>
          </div>
          {/* Indicator 3 */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-white/5 border border-white/10 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded bg-[#9810FA]/20 flex items-center justify-center">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#9810FA]">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold text-xs sm:text-sm leading-tight">05+</div>
              <div className="text-gray-500 text-[10px] sm:text-xs font-medium leading-tight">Modules</div>
            </div>
          </div>
        </div>

        {/* Calendar and Cards Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6 items-start w-full max-w-5xl mx-auto mb-8">
          {/* Left Column: Calendar Wrapper */}
          <div className="flex justify-center animate-fade-in-delay-3 w-full">
            <div className="calendar-wrapper backdrop-blur-xl bg-white/5 border border-[#9810FA]/30 rounded-2xl p-6 shadow-lg hover:border-[#9810FA]/50 transition-all duration-300 w-full max-w-sm">
              <calendar-date value="2026-06-12" class="cally-custom">
                <svg aria-label="Previous" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current size-5 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <svg aria-label="Next" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current size-5 text-gray-400 hover:text-white transition-colors cursor-pointer">
                  <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <calendar-month />
              </calendar-date>
            </div>
          </div>

          {/* Right Column: Dynamic Cards */}
          <div className="space-y-4 animate-fade-in-delay-4 w-full">
            {/* Card 1: Event Dates */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#9810FA]/20 rounded-xl p-4 hover:border-[#9810FA]/50 transition-all hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#9810FA]/20 rounded-lg p-2 group-hover:bg-[#9810FA] transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-[#9810FA] group-hover:text-white transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Event Dates</h3>
              </div>
              <p className="text-white text-base font-bold mb-1">June 12, 2026</p>
              <div className="flex gap-1 flex-wrap">
                <span className="px-2 py-0.5 bg-[#9810FA]/10 border border-[#9810FA]/20 rounded text-xs text-[#9810FA] font-medium">Opening</span>
                <span className="px-2 py-0.5 bg-[#9810FA]/10 border border-[#9810FA]/20 rounded text-xs text-[#9810FA] font-medium">Competition</span>
                <span className="px-2 py-0.5 bg-[#9810FA]/10 border border-[#9810FA]/20 rounded text-xs text-[#9810FA] font-medium">Finals</span>
              </div>
            </div>

            {/* Card 2: Location */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#9810FA]/20 rounded-xl p-4 hover:border-[#9810FA]/50 transition-all hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#9810FA]/20 rounded-lg p-2 group-hover:bg-[#9810FA] transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-[#9810FA] group-hover:text-white transition-colors">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Location</h3>
              </div>
              <p className="text-white text-base font-bold mb-1">VVCE Mysore</p>
              <p className="text-gray-400 text-sm">Campus-wide facilities</p>
            </div>

            {/* Card 3: Prizes */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#9810FA]/20 rounded-xl p-4 hover:border-[#9810FA]/50 transition-all hover:scale-[1.02] cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-[#9810FA]/20 rounded-lg p-2 group-hover:bg-[#9810FA] transition-colors">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 text-[#9810FA] group-hover:text-white transition-colors">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Prizes</h3>
              </div>
              <p className="text-white text-base font-bold mb-1">$100+ Worth</p>
              <p className="text-gray-400 text-sm">05+ Competition Modules</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 bg-[#9810FA] rounded-full text-white font-bold text-base sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#9810FA]/50 animate-fade-in-delay-5 max-w-[95vw]"
          >
            <span className="relative z-10 flex items-center gap-2 text-center">
              <span className="sm:hidden">Register for Workshop 2026</span>
              <span className="hidden sm:inline">Register Now for AWS & DevOps 2026</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 mb-0 text-xs sm:text-sm text-gray-400 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 text-[#9810FA] shrink-0">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Free Registration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 text-[#9810FA] shrink-0">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">Prizes Worth $100+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 text-[#9810FA] shrink-0">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Limited Spots</span>
            </div>
          </div>
        </div>

      </div>

      {/* Styled calendar elements using React inline style or CSS classes */}
      <style>{`
        .cally-custom {
          --color-accent: #9810fa;
          --color-text-primary: #fff;
          --color-text-secondary: #9ca3af;
          --color-background: transparent;
          --color-border: #ffffff1a;
          font-family: 'Poppins', sans-serif;
          width: 100%;
        }
        calendar-date {
          color: #fff;
          display: block;
        }
        calendar-date::part(button) {
          color: #fff;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        calendar-date::part(button):hover {
          background: #9810fa4d;
          transform: scale(1.05);
        }
        calendar-date::part(button):is([selected]) {
          color: #fff;
          background: #9810fa;
          border: 2px solid #9810fa;
          font-weight: 700;
        }
        calendar-date::part(header) {
          color: #fff;
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        calendar-date::part(weekday) {
          color: #9ca3af;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-fade-in-delay-1 {
          opacity: 0;
          animation: fade-in 0.6s ease-out 0.2s forwards;
        }
        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fade-in 0.6s ease-out 0.4s forwards;
        }
        .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fade-in 0.6s ease-out 0.6s forwards;
        }
        .animate-fade-in-delay-4 {
          opacity: 0;
          animation: fade-in 0.6s ease-out 0.8s forwards;
        }
        .animate-fade-in-delay-5 {
          opacity: 0;
          animation: fade-in 0.6s ease-out 1s forwards;
        }
      `}</style>
    </div>
  );
};

export default HackathonCalendar;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Home from "./pages/Home";
import About from "./pages/About";
import Modules from "./pages/Modules";
import Sponsors from "./pages/Sponsors";
import Schedule from "./pages/Schedule";
import Contact from "./pages/Contact";

const RegisterRedirect = () => {
  window.location.replace("https://www.meetup.com/aws-sbg-at-vidyavardhaka-college-of-eng/events/315069919/");
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans">
      <div className="w-12 h-12 border-4 border-[#9810FA] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg tracking-wide text-gray-400">Redirecting to Meetup registration...</p>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/register" element={<RegisterRedirect />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/events" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

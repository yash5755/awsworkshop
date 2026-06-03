import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  "/img1.webp",
  "/img2.webp",
  "/img3.webp"
];

const ImagesSliderDemo = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIdx}
          src={IMAGES[currentIdx]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          alt={`Slider ${currentIdx}`}
        />
      </AnimatePresence>

      {/* Dim Overlay */}
      <div className="absolute inset-0 bg-black/60 z-40 pointer-events-none" />

      {/* Content wrapper exactly matching original layout */}
      <div className="z-50 flex flex-col justify-center items-center px-4 max-w-4xl text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black text-white text-center mb-6 leading-tight"
        >
          AWS & DevOps<span className="text-[#9810FA]">Workshop</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 text-center mb-8 max-w-2xl"
        >
          One day of innovation, competition, and technology
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-[#9810FA] hover:bg-[#9810FA]/90 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-lg shadow-[#9810FA]/50"
          >
            Register Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ImagesSliderDemo;

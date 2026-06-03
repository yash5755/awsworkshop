import React from "react";
import { Link } from "react-router-dom";
import ShaderBackground from "../components/ShaderBackground";

const Sponsors = () => {
  const sponsorsCategory = [
    {
      tier: "Diamond Sponsor",
      name: "AWS",
      desc: "Empowering Next-Gen AI & Cloud Innovators at AWS Workshop 2026",
      logo: "☁️"
    },
    {
      tier: "Platinum Partners",
      partners: ["VVCE", "Dept of CSE, VVCE"],
      logo: "💼"
    },
    {
      tier: "Gold Sponsor",
      name: "AWS Student Builder Groups",
      desc: "Official partner for student engagement, workshops, and mentorship at AWS Workshop 2026",
      logo: "🛡️"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <ShaderBackground color="#471CE2" />
      
      <div className="min-h-screen relative py-12 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            className="text-white hover:text-[#e0aaff] mb-6 inline-flex items-center gap-2 transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10"
            to="/"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>

          <div className="space-y-6 mt-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_4px_20px_rgba(123,44,191,0.8)] mb-8">
              Our Sponsors & Partners
            </h1>
            
            <div className="space-y-6 text-[#3c096c] text-left">
              {sponsorsCategory.map((sp, idx) => (
                <div key={idx} className="rounded-xl bg-white/95 backdrop-blur-md border border-white/50 p-8 shadow-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{sp.logo}</span>
                    <h2 className="text-2xl font-black text-purple-900 uppercase tracking-wide">
                      {sp.tier}
                    </h2>
                  </div>
                  
                  {sp.name ? (
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h3 className="text-xl font-extrabold text-purple-950">{sp.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">{sp.desc}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {sp.partners.map((partner, pIdx) => (
                        <div key={pIdx} className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center font-bold text-lg text-purple-950">
                          {partner}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link
                className="inline-block bg-gradient-to-r from-[#7b2cbf] to-[#9d4edd] hover:from-[#5a189a] hover:to-[#7b2cbf] text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                to="/register"
              >
                Register For Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;

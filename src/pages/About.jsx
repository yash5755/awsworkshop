import React from "react";
import { Link } from "react-router-dom";
import ShaderBackground from "../components/ShaderBackground";

const About = () => {
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
              About AWS & DevOps Workshop 2026
            </h1>
            
            <div className="rounded-xl bg-white/95 backdrop-blur-md border border-white/50 p-8 text-[#3c096c] text-left space-y-6 shadow-xl leading-relaxed">
              <p className="text-lg font-medium text-purple-900">
                AWS Student Builders presents a hands-on cloud workshop designed to help students learn AWS, build a portfolio website, and deploy it using modern DevOps practices.
              </p>
              <p className="text-gray-700">
                The AWS & DevOps <strong>Workshop</strong> is a hands-on learning experience designed for students, aspiring developers, and cloud enthusiasts eager to gain practical industry skills. Participants will explore AWS Cloud fundamentals, build their own portfolio website using Kiro, and deploy it to Amazon EC2 using modern CI/CD practices.
              </p>
              <p className="text-gray-700">
                Our mission is to bridge the gap between academic learning and real-world cloud technologies by providing practical exposure to AWS, DevOps, and deployment workflows. Through guided hands-on sessions, attendees will gain valuable experience in cloud infrastructure, application deployment, automation, and industry best practices that are widely used in today's technology landscape.              </p>
              
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">Why Participate?</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>💡 <strong>$100+ AWS Credits</strong> for top 3 winners in the quiz</li>
                  <li>🤝 <strong>Networking Opportunities</strong> with industry leaders and sponsors.</li>
                  <li>🚀 <strong>Skill Enhancement</strong> through real-world problem statements.</li>
                  <li>🎓 <strong>Certificates & Awards</strong> to boost your academic and professional profile.</li>
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <Link
                className="inline-block bg-gradient-to-r from-[#7b2cbf] to-[#9d4edd] hover:from-[#5a189a] hover:to-[#7b2cbf] text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                to="/modules"
              >
                Explore Modules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import { Link } from "react-router-dom";
import ShaderBackground from "../components/ShaderBackground";

const Schedule = () => {
  const scheduleDays = [
    {
      date: "August 22, 2026",
      title: "AWS Cloud Fundamentals",
      events: [
        "09:00 AM - Registration & Welcome Note",
        "09:30 AM - Introduction to Cloud Computing & AWS",
        "10:15 AM - Understanding AWS Global Infrastructure",
        "11:00 AM - Introduction to Amazon EC2"
      ]
    },
    {
      date: "August 22, 2026",
      title: "Build Your Portfolio Website",
      events: [
        "11:30 AM - Getting Started with Kiro",
        "12:00 PM - Developing a Personal Portfolio Website",
        "01:00 PM - Lunch Break",
        "02:00 PM - Website Customization & Best Practices"
      ]
    },
    {
      date: "August 22, 2026",
      title: "Deploy on AWS",
      events: [
        "03:00 PM - Launching and Configuring EC2 Instances",
        "03:30 PM - Deploying Your Portfolio Website on EC2",
        "04:00 PM - Domain, Security Groups & Deployment Best Practices"
      ]
    },
    {
      date: "August 22, 2026",
      title: "CI/CD & Closing Session",
      events: [
        "04:30 PM - Introduction to DevOps & CI/CD",
        "05:00 PM - Automating Deployments with GitHub Actions",
        "05:30 PM - Q&A Session",
        "06:00 PM - Certificate Distribution & Closing Remarks"
      ]
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
              Event Schedule
            </h1>
            
            <div className="space-y-6 text-[#3c096c] text-left">
              {scheduleDays.map((day, idx) => (
                <div key={idx} className="rounded-xl bg-white/95 backdrop-blur-md border border-white/50 p-8 shadow-xl space-y-4">
                  <div className="border-b pb-3">
                    <span className="text-xs font-bold text-purple-600 tracking-widest uppercase">
                      {day.date}
                    </span>
                    <h2 className="text-2xl font-black text-purple-900 mt-1">
                      {day.title}
                    </h2>
                  </div>
                  
                  <ul className="space-y-3">
                    {day.events.map((evt, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                        <span className="text-purple-600 mt-0.5">⚡</span>
                        <span>{evt}</span>
                      </li>
                    ))}
                  </ul>
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

export default Schedule;

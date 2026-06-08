import React from "react";
import { Link } from "react-router-dom";
import ShaderBackground from "../components/ShaderBackground";

const Modules = () => {
 const modulesList = [
  [
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
  ],
  [
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
  ],
];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* WebGL Nebulae Shader background */}
      <ShaderBackground color="#471CE2" />

      {/* Main Content Area */}
      <div className="min-h-screen relative py-12 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <Link
              className="text-white hover:text-[#e0aaff] mb-6 inline-flex items-center gap-2 transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10"
              to="/"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_4px_20px_rgba(123,44,191,0.8)] mt-8 mb-4">
              Competition Modules
            </h1>
            <p className="text-lg text-white/95 max-w-3xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              Explore our diverse range of competitions and workshops at the AWS & DevOps Workshop 2026. Choose your challenge and register now!
            </p>
          </div>

          {/* Cards Rows */}
          <div className="space-y-8">
            {modulesList.map((row, rIdx) => (
              <div key={rIdx} className="flex flex-col md:flex-row gap-4 w-full px-4">
                {row.map((mod, mIdx) => (
                  <div
                    key={mIdx}
                    className="group relative flex flex-col justify-end p-6 w-full md:w-1/3 h-[350px] lg:h-[450px] bg-gradient-to-br from-purple-900 to-purple-700 rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:md:w-2/3 cursor-pointer"
                  >
                    <img
                      src={mod.img}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      alt={mod.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Standard details (always visible) */}
                    <div className="relative z-10 space-y-2 transition-all duration-500">
                      <h2 className="text-2xl font-bold text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                        {mod.title}
                      </h2>
                      <p className="text-base text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                        {mod.price} • {mod.members}
                      </p>
                    </div>

                    {/* Additional details (revealed on hover) */}
                    <div className="mt-4 max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 z-10 relative space-y-3">
                      <p className="text-sm text-gray-200 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                        {mod.tags}
                      </p>
                      
                      {/* UPDATED: Registration link now points directly to the external Meetup page */}
                      <a
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-semibold shadow-xl"
                        href="https://www.meetup.com/aws-sbg-at-vidyavardhaka-college-of-eng/events/315069919/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link&utm_version=v2&member_id=477651036"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Register Now →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Support Footer info */}
          <div className="mt-10 text-center text-sm text-white/80">
            <p className="drop-shadow-md">
              Need help? Contact us at{" "}
              <a
                href="mailto:awscloudclub@vvce.ac.in"
                className="text-white hover:text-[#e0aaff] font-medium transition-colors underline decoration-white/30 hover:decoration-[#e0aaff] drop-shadow-md"
              >
                awscloudclub@vvce.ac.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;

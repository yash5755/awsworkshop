import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShaderBackground from "../components/ShaderBackground";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate inquiry submission
    setSubmitted(true);
  };

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
              Contact AWS & DevOps Workshop 2026
            </h1>
            
            <div className="grid md:grid-cols-2 gap-6 text-left text-[#3c096c]">
              
              {/* Contact Information Card */}
              <div className="rounded-xl bg-white/95 backdrop-blur-md border border-white/50 p-8 shadow-xl space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-purple-900 border-b pb-4 mb-4">
                    Get In Touch
                  </h3>
                  
                  <div className="space-y-4 text-sm font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📧</span>
                      <div>
                        <div className="text-gray-500 text-xs">Email Support</div>
                        <a href="mailto:awscloudclub@vvce.ac.in" className="text-purple-950 hover:underline">
                          awscloudclub@vvce.ac.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xl">📞</span>
                      <div>
                        <div className="text-gray-500 text-xs">Call Us</div>
                        <div className="text-purple-950">+91 9686214691</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xl">📍</span>
                      <div>
                        <div className="text-gray-500 text-xs">Location</div>
                        <div className="text-purple-950">
                          Vidyavardhaka College of Engineering, Mysore, Karnataka, India
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t text-xs text-gray-500 font-medium">
                  Feel free to reach out to us with any questions or support inquiries regarding registration, payments, or event schedules.
                </div>
              </div>

              {/* Inquiry Form Card */}
              <div className="rounded-xl bg-white/95 backdrop-blur-md border border-white/50 p-8 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <span className="text-5xl">✉️</span>
                    <h3 className="text-2xl font-bold text-purple-900">Message Sent!</h3>
                    <p className="text-gray-700 text-sm">
                      Thank you for contacting us. Our support team will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-purple-600 hover:text-purple-800 text-xs font-bold underline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-[#3c096c]">
                    <h3 className="text-2xl font-bold text-purple-900 border-b pb-4 mb-4">
                      Send a Message
                    </h3>
                    
                    <div>
                      <label className="text-xs font-semibold block mb-1">Your Name</label>
                      <input
                        type="text"
                        className="w-full rounded-md px-3 py-2 bg-white border border-[#e0aaff] text-[#3c096c] focus:border-[#7b2cbf] outline-none text-sm"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Your Email</label>
                      <input
                        type="email"
                        className="w-full rounded-md px-3 py-2 bg-white border border-[#e0aaff] text-[#3c096c] focus:border-[#7b2cbf] outline-none text-sm"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1">Message</label>
                      <textarea
                        className="w-full rounded-md px-3 py-2 bg-white border border-[#e0aaff] text-[#3c096c] focus:border-[#7b2cbf] outline-none text-sm h-24 resize-none"
                        placeholder="How can we help you?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#7b2cbf] to-[#9d4edd] hover:from-[#5a189a] hover:to-[#7b2cbf] text-white font-bold py-3 px-4 rounded-lg w-full text-sm shadow-md transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

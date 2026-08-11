import React from "react";
import { NavLink } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Footer = () => {
  return (
    <footer className="w-full bg-[#030712] text-white border-t border-white/10 pt-16 pb-8 font-gilroy relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Tagline Column */}
          <div className="lg:col-span-2 flex flex-col items-start gap-4">
            <NavLink className="flex items-center gap-3" to="/">
              <img
                className="h-12 w-auto object-contain"
                src="/sellogo.png"
                alt="LexBridge Logo"
              />
              <span className="text-2xl font-black tracking-tight text-white">
                Lex<span className="bg-gradient-to-r from-blue-500 to-[#e7bd3e] bg-clip-text text-transparent">Bridge</span>
              </span>
            </NavLink>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Empowering students and job seekers through direct 1-on-1 mentorship with industry leaders.
            </p>

            {/* Newsletter Subscription */}
            <div className="w-full max-w-sm mt-2">
              <p className="text-xs font-semibold text-gray-300 mb-2">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs transition-all whitespace-nowrap shadow-md">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-[#e7bd3e] uppercase tracking-wider">Platform</p>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Find Mentors</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Become a Mentor</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Mock Interviews</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Resume Reviews</NavLink>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Resources</p>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Career Blog</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Community</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Success Stories</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQs</NavLink>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Company</p>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</NavLink>
            <NavLink to="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Support</NavLink>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 LexBridge Pvt. Ltd. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <NavLink
              to="#"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#e7bd3e] hover:bg-white/10 transition-all text-lg"
              aria-label="Instagram"
            >
              <i className="ri-instagram-line" />
            </NavLink>
            <NavLink
              to="#"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-white/10 transition-all text-lg"
              aria-label="Facebook"
            >
              <i className="ri-facebook-circle-fill" />
            </NavLink>
            <NavLink
              to="#"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all text-lg"
              aria-label="Twitter X"
            >
              <i className="ri-twitter-x-line" />
            </NavLink>
            <NavLink
              to="#"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-blue-500 hover:bg-white/10 transition-all text-lg"
              aria-label="LinkedIn"
            >
              <i className="ri-linkedin-fill" />
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
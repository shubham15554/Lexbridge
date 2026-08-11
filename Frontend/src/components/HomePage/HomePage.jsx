import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import './HomePage.css';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tech & Code");

  const categories = [
    { name: "Tech & Code", count: "180+ Mentors", icon: "💻" },
    { name: "UI/UX & Product", count: "120+ Mentors", icon: "🎨" },
    { name: "AI & Data", count: "95+ Mentors", icon: "🤖" },
    { name: "Startup & Growth", count: "60+ Mentors", icon: "🚀" },
    { name: "Interview Prep", count: "140+ Mentors", icon: "🎯" },
  ];

  const mentorsList = [
    {
      name: "Aarav Sharma",
      role: "Ex-Google Software Engineer",
      rating: "4.95",
      sessions: "340+",
      skills: ["System Design", "React", "DS & Algo"],
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      price: "₹2,499/session",
    },
    {
      name: "Rhea Kapoor",
      role: "Lead UI/UX Designer at Stripe",
      rating: "5.0",
      sessions: "210+",
      skills: ["Figma", "Portfolio Review", "UX Strategy"],
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      price: "₹2,999/session",
    },
    {
      name: "Vikram Malhotra",
      role: "AI Scientist & Tech Lead",
      rating: "4.90",
      sessions: "180+",
      skills: ["LLMs", "Python", "Machine Learning"],
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      price: "₹3,299/session",
    },
  ];

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen font-gilroy selection:bg-blue-600 selection:text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Soft Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-slate-300">500+ Verified Mentors Ready to Help</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-tight max-w-4xl text-slate-100">
          Connect with Industry Mentors. <br />
          <span className="text-blue-400">Accelerate Your Career.</span>
        </h1>

        <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
          Get personalized guidance, resume audits, and mock interviews from senior professionals in a clean, direct 1-on-1 setup.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white text-base transition-all shadow-md active:scale-95">
            Find Your Mentor
          </button>
          <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 font-semibold text-slate-200 text-base transition-all">
            Become a Mentor
          </button>
        </div>

        {/* Trust Metrics */}
        <div className="mt-14 w-full max-w-4xl p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <p className="text-2xl font-bold text-slate-100">98%</p>
            <p className="text-xs text-slate-400 mt-0.5">Satisfied Mentees</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-400">1-on-1</p>
            <p className="text-xs text-slate-400 mt-0.5">Personalized Calls</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-100">12,000+</p>
            <p className="text-xs text-slate-400 mt-0.5">Sessions Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">4.9 / 5</p>
            <p className="text-xs text-slate-400 mt-0.5">Average Mentor Rating</p>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="py-8 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5">
            Browse Mentors By Discipline
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat.name
                    ? "bg-blue-600 text-white shadow"
                    : "bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:bg-slate-700/50"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900/60 text-slate-400">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Feed Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              Mentors in <span className="text-blue-400">{selectedCategory}</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">Book direct consultations with experienced mentors.</p>
          </div>
          <button className="text-sm font-semibold text-amber-400 hover:underline self-start md:self-auto">
            View All Mentors →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentorsList.map((mentor, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-800/40 border border-slate-700/70 p-5 hover:border-slate-600 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={mentor.img}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{mentor.name}</h3>
                    <p className="text-xs text-slate-400">{mentor.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-amber-400">★ {mentor.rating}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{mentor.sessions} sessions</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {mentor.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/50 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-medium">Pricing</p>
                  <p className="text-sm font-bold text-slate-100">{mentor.price}</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-all text-xs font-semibold border border-blue-500/30">
                  Book Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Proposition Cards */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Why Choose LexBridge?</h2>
            <p className="text-slate-400 text-sm mt-2">Designed to give you clear guidance without unnecessary clutter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-base mb-4">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Verified Experts</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Mentors are thoroughly vetted to ensure you get authentic, real-world industry feedback.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base mb-4">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Direct 1-on-1 Sessions</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Schedule video calls based on your availability without messy scheduling conflicts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-base mb-4">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">Targeted Growth</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Focus specifically on interview prep, portfolio audits, or long-term career planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Call To Action */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-800 border border-slate-700 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-100 mb-3">
            Ready to Find the Right Guidance?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Take the next step in your learning journey with 1-on-1 expert sessions.
          </p>
          <button className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white text-sm transition-all shadow-md">
            Get Started
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const About = () => {
  const mentorshipFeatures = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Strategic Mentorship",
      description: "From everyday target setting to understanding concepts, plan and execute your career growth strategically.",
      tag: "Strategy"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Personalized Curriculum",
      description: "Get a customized curriculum and roadmap tailored specifically to your learning speed and preparation needs.",
      tag: "Custom Roadmap"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "1-on-1 Live Sessions",
      description: "Direct one-on-one video interactions with top-tier mentors who have proven industry experience.",
      tag: "Interactive"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Core Subject Guidance",
      description: "Get deep conceptual clarity and step-by-step guidance on your primary subjects with your personal mentor.",
      tag: "Doubt Solving"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Mock Interview & Portfolio Reviews",
      description: "Get real-time feedback on your projects, resume, and technical interviews to stand out to recruiters.",
      tag: "Career Ready"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Continuous On-Demand Support",
      description: "Never get stuck on a problem—access direct mentor chat for quick doubt resolution whenever you need it.",
      tag: "24/7 Access"
    }
  ];

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen font-gilroy flex flex-col justify-between">
      <div>
        <NavBar />

        {/* Hero Section */}
        <section className="pt-16 pb-12 px-6 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs font-medium text-slate-300">Why Choose LexBridge</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
            What You Will Get in <br className="hidden sm:inline" />
            <span className="text-blue-400">LexBridge Mentorship</span>
          </h1>

          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Everything you need to accelerate your career, overcome roadblocks, and land your dream role with structured, 1-on-1 guidance.
          </p>
        </section>

        {/* Features Grid Section */}
        <section className="pb-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorshipFeatures.map((elem, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-slate-800/40 border border-slate-700/70 p-6 hover:border-slate-600 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                      {elem.icon}
                    </div>
                    {elem.tag && (
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {elem.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {elem.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {elem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Included in plan</span>
                  <span className="text-amber-400 font-semibold">1-on-1 Access</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
import React, { useEffect, useState } from 'react';

function AboutUs() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800">
      {/* ✨ Stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-16 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-40 left-1/3 w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-60 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-80 left-16 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-2500"></div>
        <div className="absolute top-24 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-96 right-1/3 w-1 h-1 bg-blue-100 rounded-full animate-pulse delay-3500"></div>
        <div className="absolute top-12 right-12 w-2 h-2 bg-white rounded-full shadow-white shadow-sm animate-pulse"></div>
        <div className="absolute top-52 right-2/3 w-2 h-2 bg-blue-100 rounded-full shadow-blue-100 shadow-sm animate-pulse delay-2000"></div>
        <div className="absolute top-72 left-1/4 w-2 h-2 bg-white rounded-full shadow-white shadow-sm animate-pulse delay-1000"></div>
      </div>

      {/* 🏔️ Mountains */}
      <div className="absolute bottom-0 w-full overflow-hidden z-0">
        <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-32 md:h-40">
          <path d="M0,200 L0,120 L150,80 L300,120 L450,60 L600,100 L750,40 L900,80 L1050,120 L1200,100 L1200,200 Z" fill="#0f172a" opacity="0.8" />
          <path d="M0,200 L0,140 L120,100 L240,140 L360,80 L480,120 L600,60 L720,100 L840,140 L960,100 L1080,140 L1200,120 L1200,200 Z" fill="#1e293b" opacity="0.6" />
        </svg>
      </div>

      {/* 📄 Main About Us Content */}
      <div className="relative z-20 min-h-screen px-4 py-16 flex justify-center pt-40 md:pt-32">
        <div
          className={`w-80 h-80 md:w-96 md:h-96 flex items-center justify-center p-8 md:p-10 backdrop-blur-sm bg-slate-900/30 transition-all duration-700 hover:bg-slate-900/50 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 ${
            animate ? 'animate-pop-in' : ''
          }`}
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 tracking-wide">About Us</h1>
            <p className="text-sm md:text-base text-gray-100 leading-relaxed font-light">
              At GlucoTrack, we're pioneering the future of glucose monitoring with real-time feedback and innovative design.
              Our mission is to redefine health tracking with intuitive, beautiful technology.
            </p>
          </div>
        </div>
      </div>

      {/* 🌌 Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/4 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* 🔧 Custom animation */}
      <style>
        {`
          @keyframes pop-in {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-pop-in {
            animation: pop-in 0.7s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default AboutUs;

"use client";

export default function HeroSection() {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 md:px-0 overflow-hidden">
      <div className="glass-card max-w-3xl w-full mx-auto p-10 md:p-16 flex flex-col items-center text-center animate-fade-in-up shadow-premium">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          <span className="neon-text">EngineerOS</span> <span className="text-slate-300">AI Platform</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-8 font-medium">
          The next-gen engineering workspace. <span className="text-white">AI-powered</span>, <span className="neon-text">futuristic</span>, and <span className="text-white">premium</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a href="#projects" className="glow-btn text-base font-semibold">Explore Projects</a>
          <a href="#features" className="glass-card text-base font-semibold border border-[#00eaff55] hover:shadow-lg hover:neon-text transition-all">See Features</a>
        </div>
      </div>
      <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] pointer-events-none select-none" aria-hidden>
        <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="80%" fx="50%" fy="50%" gradientTransform="rotate(0)">
              <stop offset="0%" stopColor="#00eaff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="720" cy="160" rx="700" ry="160" fill="url(#glow)" />
        </svg>
      </div>
    </section>
  );
}

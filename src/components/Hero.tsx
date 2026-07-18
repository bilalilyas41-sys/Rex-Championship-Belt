import React, { useState, useRef } from 'react';
import { ArrowRight, Trophy, Sparkles, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onStartCustomizing: () => void;
  onExploreCatalog: () => void;
}

export default function Hero({ onStartCustomizing, onExploreCatalog }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[#070708] py-12 md:py-20">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Decorative metal texture background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero text panel */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 self-center lg:self-start bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-tech text-[10px] uppercase tracking-widest font-black mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Heavy Metal Mastery
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none"
            >
              Where Legends Are <br />
              <span className="gold-gradient-text filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                Forged In Gold
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Rex Championship Belts fabricates elite title plates for heavyweights, wrestlers, combat warriors, and corporations. Pure 24k gold, deep-cut dual plates, and hand-tooled premium cowhide.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onStartCustomizing}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black font-tech text-xs uppercase tracking-widest font-black rounded transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 cursor-pointer"
                id="hero-create-btn"
              >
                Design Custom Belt
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-tech text-xs uppercase tracking-widest font-black rounded border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                id="hero-explore-btn"
              >
                View Showroom
              </button>
            </motion.div>

            {/* Credential highlights */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4 border-t border-zinc-900 pt-8 max-w-lg mx-auto lg:mx-0"
            >
              <div>
                <span className="block font-tech text-xl sm:text-2xl font-black text-amber-400">6.0mm</span>
                <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-tech font-bold mt-1">Deepest Relief</span>
              </div>
              <div>
                <span className="block font-tech text-xl sm:text-2xl font-black text-amber-400">24K</span>
                <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-tech font-bold mt-1">Genuine Plating</span>
              </div>
              <div>
                <span className="block font-tech text-xl sm:text-2xl font-black text-amber-400">100%</span>
                <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-tech font-bold mt-1">Saddle Cowhide</span>
              </div>
            </motion.div>
          </div>

          {/* Hero visual panel - featuring generated image */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            {/* Visual background lights */}
            <div className="absolute -inset-4 bg-amber-500/10 rounded-full filter blur-3xl opacity-60 animate-pulse pointer-events-none" />

            <motion.div 
              ref={cardRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
              animate={{ opacity: 1, scale: isHovered ? 1.02 : 1, rotate: isHovered ? 0 : -2 }}
              transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
              style={{
                transform: isHovered 
                  ? `perspective(800px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`
                  : 'perspective(800px) rotateY(0deg) rotateX(0deg)',
                transition: isHovered ? 'none' : 'transform 0.5s ease-out, rotate 0.5s ease-out, scale 0.5s ease-out',
                transformStyle: 'preserve-3d'
              }}
              className="relative p-2 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-2xl border border-zinc-700/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-md md:max-w-full overflow-hidden group cursor-pointer"
              id="hero-belt-showcase-frame"
            >
              {/* Outer visual shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <img 
                src="/src/assets/images/rex_hero_belt_1784340686134.jpg" 
                alt="Rex Heavyweight Sovereign Belt close up main gold plate" 
                className="rounded-xl w-full object-cover aspect-[16/10] md:aspect-[4/3] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Float specs card overlay */}
              <div 
                style={{
                  transform: isHovered 
                    ? `translateZ(30px) translateX(${mousePos.x * 10}px) translateY(${mousePos.y * 10}px)` 
                    : 'translateZ(0px) translateX(0px) translateY(0px)',
                  transition: isHovered ? 'none' : 'transform 0.5s ease-out'
                }}
                className="absolute bottom-4 left-4 right-4 bg-[#0d0d0f]/90 backdrop-blur-md p-4 rounded-xl border border-zinc-800 flex items-center justify-between shadow-2xl transition-transform duration-500"
              >
                <div>
                  <span className="text-[9px] font-tech text-amber-400 uppercase tracking-widest font-black block">Flagship Belt</span>
                  <span className="font-display text-sm font-bold text-white tracking-wide">Sovereign Heavyweight</span>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/30" />
                  <span className="font-tech text-xs font-black text-amber-400">$1,850 EST</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

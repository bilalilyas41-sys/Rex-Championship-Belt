import React from 'react';
import { CRAFTSMANSHIP_STEPS } from '../data';
import { Hammer, Flame, Sparkles, Award, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function Craftsmanship() {
  return (
    <section className="bg-[#0b0b0c] py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden" id="artisan-guild-section">
      {/* Decorative gradient radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="text-center mb-16">
        <span className="font-tech text-xs tracking-[0.3em] text-amber-500 font-bold uppercase block mb-3">The Guild Secret</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Artisan Craftsmanship
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-800 mx-auto mt-4 rounded" />
        <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
          At Rex Championship Belts, we do not mass-produce. We forge. Every plaque is individually cast, and every leather strap is carved and hand-finished by master saddlers with decades of combat championship expertise.
        </p>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {CRAFTSMANSHIP_STEPS.map((step, idx) => (
          <div
            key={step.number}
            className="group bg-[#0f0f11] p-6 rounded-xl border border-zinc-900 hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            id={`craft-step-${step.number}`}
          >
            <div>
              {/* Step counter */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-tech text-3xl font-black text-zinc-800 group-hover:text-amber-500/10 transition-colors duration-300">
                  {step.number}
                </span>
                {idx === 2 && <Flame className="w-4 h-4 text-amber-500 animate-pulse" />}
                {idx === 4 && <Sparkles className="w-4 h-4 text-amber-400" />}
              </div>

              {/* Title */}
              <h3 className="font-display text-sm font-bold text-white tracking-wider uppercase group-hover:text-amber-400 transition-colors duration-200">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-zinc-500 text-xs mt-3 leading-relaxed font-sans">
                {step.description}
              </p>
            </div>

            {/* Micro aesthetic divider */}
            <div className="w-8 h-[2px] bg-zinc-900 group-hover:bg-amber-500/50 transition-colors duration-300 mt-6" />
          </div>
        ))}
      </div>

      {/* Materials specification badge metrics */}
      <div className="mt-16 bg-[#0c0c0e] rounded-2xl border border-zinc-800 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">24k Pure Plating</h4>
            <p className="text-zinc-500 text-[11px] mt-1 font-sans">
              We operate electro-chemical tanks with real gold bars. Absolutely no cheap plastic spray or yellow paints.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">6mm Engraving Depth</h4>
            <p className="text-zinc-500 text-[11px] mt-1 font-sans">
              Our 3D relief depths range from 4.0mm to 6.0mm. This is twice the relief density of standard generic titles.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Solid Saddle Cowhide</h4>
            <p className="text-zinc-500 text-[11px] mt-1 font-sans">
              100% genuine saddle-grade steer hides. Flexible, resilient, and releases a traditional premium leather scent.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">Swarovski Stones</h4>
            <p className="text-zinc-500 text-[11px] mt-1 font-sans">
              We exclusively source clear and colored crystal cuts from Swarovski, each seated tightly in customized alloy prongs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

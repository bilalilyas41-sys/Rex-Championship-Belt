import React from 'react';
import { ShieldCheck, Hammer, Sparkles, Award, Trophy, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'catalog' | 'customizer' | 'craftsmanship' | 'reviews') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#060607] border-t border-zinc-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Pitch */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-700 rounded text-black font-black">
              <Trophy className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-lg text-white">REX</span>
              <span className="font-tech text-[9px] tracking-[0.2em] text-amber-500 uppercase block -mt-1 font-bold">Championship Belts</span>
            </div>
          </div>
          <p className="text-zinc-500 text-xs font-sans leading-relaxed">
            Rex Championship Belts is an industry-leading designer of elite, heavyweight gold plates for athletic commissions, wrestling promotions, fantasy leagues, and corporate achievements. No plastic. No shortcuts. Just solid gold and heavy leather.
          </p>
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded border border-zinc-800 text-[10px] text-zinc-400 font-tech uppercase font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            Secure Crafting Shield
          </div>
        </div>

        {/* Quick Navigate links */}
        <div>
          <h4 className="font-display text-xs font-black uppercase tracking-widest text-white mb-4">Showroom Sections</h4>
          <ul className="space-y-2.5 text-xs text-zinc-400 font-sans">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors cursor-pointer">
                The Gold Room
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Championship Collections
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('customizer')} className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse" />
                Live Belt Builder
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('craftsmanship')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Artisans Guild Secrets
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('reviews')} className="hover:text-amber-400 transition-colors cursor-pointer">
                Testimonials
              </button>
            </li>
          </ul>
        </div>

        {/* Material Specs guide */}
        <div>
          <h4 className="font-display text-xs font-black uppercase tracking-widest text-white mb-4">Specification Standards</h4>
          <ul className="space-y-2 text-xs text-zinc-400 font-sans">
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold font-tech mt-0.5">•</span>
              <span><strong>Plates:</strong> 4.0mm - 6.0mm heavy relief Zinc alloy & CNC brass plates.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold font-tech mt-0.5">•</span>
              <span><strong>Immersion:</strong> 24k genuine multi-layer real-gold electroplating bath.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold font-tech mt-0.5">•</span>
              <span><strong>Hides:</strong> Hand-tooled veg-tan cattle cowhide, thickness 3.5mm-4.0mm.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-amber-500 font-bold font-tech mt-0.5">•</span>
              <span><strong>Settings:</strong> Prongs set crystals, machine threaded steel screw backers.</span>
            </li>
          </ul>
        </div>

        {/* Contact info details */}
        <div className="space-y-3">
          <h4 className="font-display text-xs font-black uppercase tracking-widest text-white mb-4">Headquarters</h4>
          <div className="flex items-start gap-2.5 text-xs text-zinc-400 font-sans">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>Rex Championship Belts Ltd.<br />100 Gold Medal Boulevard, Suite 500<br />Las Vegas, NV 89101, USA</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-sans">
            <Mail className="w-4 h-4 text-amber-500 shrink-0" />
            <span>crafting@rexchampionshipbelt.com</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-sans">
            <Phone className="w-4 h-4 text-amber-500 shrink-0" />
            <span>+1 (800) 555-GOLD</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-sans">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Mon - Fri: 8:00 AM - 5:00 PM PST</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-900/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[10px] font-tech uppercase tracking-widest">
        <span>&copy; {new Date().getFullYear()} Rex Championship Belts. All Rights Reserved.</span>
        <div className="flex gap-4">
          <a href="#showroom" className="hover:text-amber-500 transition-colors">Specifications</a>
          <a href="#designer" className="hover:text-amber-500 transition-colors">Privacy Shield</a>
          <a href="#guarantee" className="hover:text-amber-500 transition-colors">Artisan Guarantee</a>
        </div>
      </div>
    </footer>
  );
}

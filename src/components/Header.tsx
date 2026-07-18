import React from 'react';
import { Shield, Hammer, MessageSquare, ShoppingBag, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'catalog' | 'customizer' | 'craftsmanship' | 'reviews' | 'orders') => void;
  currentView: string;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ onNavigate, currentView, cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0b0b0c]/90 backdrop-blur-md border-b border-b-zinc-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Branding */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
            id="header-brand-logo"
          >
            <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-700 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Trophy className="w-6 h-6 text-black stroke-[2]" />
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-lg sm:text-xl block text-white group-hover:text-amber-400 transition-colors duration-200">
                REX
              </span>
              <span className="font-tech text-[10px] tracking-[0.25em] text-amber-500 uppercase block -mt-1 font-bold">
                Championship Belts
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`font-tech text-[11px] uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentView === 'home' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
              id="nav-home-btn"
            >
              Showroom
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`font-tech text-[11px] uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentView === 'catalog' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
              id="nav-catalog-btn"
            >
              Our Belts
            </button>
            <button
              onClick={() => onNavigate('customizer')}
              className={`relative px-2.5 py-1 font-tech text-[11px] uppercase tracking-widest transition-all duration-200 cursor-pointer rounded border ${
                currentView === 'customizer' 
                  ? 'text-amber-400 border-amber-500/50 bg-amber-500/5' 
                  : 'text-zinc-400 border-transparent hover:text-white hover:border-zinc-700'
              }`}
              id="nav-customizer-btn"
            >
              <span className="relative flex items-center gap-1.5">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                </span>
                Custom Designer
              </span>
            </button>
            <button
              onClick={() => onNavigate('craftsmanship')}
              className={`font-tech text-[11px] uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentView === 'craftsmanship' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
              id="nav-crafts-btn"
            >
              Artisan Guild
            </button>
            <button
              onClick={() => onNavigate('reviews')}
              className={`font-tech text-[11px] uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentView === 'reviews' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
              id="nav-reviews-btn"
            >
              Testimonials
            </button>
            <button
              onClick={() => onNavigate('orders')}
              className={`font-tech text-[11px] uppercase tracking-widest transition-colors duration-200 cursor-pointer flex items-center gap-1 ${
                currentView === 'orders' ? 'text-amber-400 font-bold' : 'text-zinc-400 hover:text-amber-400'
              }`}
              id="nav-orders-btn"
            >
              Order Registry
            </button>
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('customizer')}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black font-tech text-xs uppercase tracking-widest font-black rounded transition-all duration-200 shadow-[0_4px_12px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 cursor-pointer"
              id="header-design-cta"
            >
              <Hammer className="w-3.5 h-3.5" />
              Build Belt
            </button>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 text-zinc-300 hover:text-amber-400 transition-all duration-200 group cursor-pointer"
              aria-label="View quote request"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-black font-tech text-[10px] font-black animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

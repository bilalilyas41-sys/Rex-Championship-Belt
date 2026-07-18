import React, { useState, useEffect } from 'react';
import { CustomBeltConfig } from '../types';
import { STRAP_LEATHERS, PLATE_PLATINGS, SIDE_PLATE_OPTIONS, BORDER_STYLES } from '../data';
import { Hammer, Sparkles, Sliders, Palette, Shield, Info, Check, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomizerProps {
  onAddToQuote: (item: {
    id: string;
    name: string;
    type: 'catalog' | 'custom';
    price: number;
    image: string;
    quantity: number;
    details: string[];
    customConfig?: CustomBeltConfig;
  }) => void;
}

const STRAP_COLORS = [
  { id: '#0e0e10', name: 'Black Velvet' },
  { id: '#4a0e17', name: 'Crimson Wine' },
  { id: '#0b2545', name: 'Royal Navy' },
  { id: '#004b23', name: 'Emerald Forest' },
  { id: '#f5ebe0', name: 'Glacier White' },
  { id: '#cca43b', name: 'Imperial Gold' }
];

export default function Customizer({ onAddToQuote }: CustomizerProps) {
  const [config, setConfig] = useState<CustomBeltConfig>({
    strapColor: '#0e0e10',
    strapLeather: 'cowhide',
    platePlating: 'gold',
    plateThickness: 4,
    plateEngravingText: 'REX CHAMPION',
    sidePlateLeft: 'classic_laurel',
    sidePlateRight: 'classic_laurel',
    snapStyle: 'gold_plated',
    borderStyle: 'stitched',
    crystalsColor: 'clear_swarovski'
  });

  const [activeTab, setActiveTab] = useState<'metals' | 'leather' | 'details'>('metals');
  const [totalPrice, setTotalPrice] = useState(450);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate pricing based on selections
  useEffect(() => {
    let price = 450; // Base manufacturing frame

    // Plating costs
    const platingChoice = PLATE_PLATINGS.find(p => p.id === config.platePlating);
    if (platingChoice) price += platingChoice.price;

    // Thickness upgrade
    if (config.plateThickness === 4) price += 100;
    if (config.plateThickness === 6) price += 250;

    // Leather upgrades
    const leatherChoice = STRAP_LEATHERS.find(l => l.id === config.strapLeather);
    if (leatherChoice) price += leatherChoice.price;

    // Border upgrades
    const borderChoice = BORDER_STYLES.find(b => b.id === config.borderStyle);
    if (borderChoice) price += borderChoice.price;

    // Crystal costs
    if (config.crystalsColor === 'clear_swarovski') price += 85;
    if (config.crystalsColor === 'ruby_red') price += 95;
    if (config.crystalsColor === 'emerald_green') price += 95;

    // Snap costs
    if (config.snapStyle === 'gold_plated') price += 40;

    setTotalPrice(price);
  }, [config]);

  const handleFieldChange = (key: keyof CustomBeltConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveCustomDesign = () => {
    const details = [
      `Leather Type: ${STRAP_LEATHERS.find(l => l.id === config.strapLeather)?.name || config.strapLeather}`,
      `Strap Base Color: ${STRAP_COLORS.find(c => c.id === config.strapColor)?.name || 'Custom'}`,
      `Plating: ${PLATE_PLATINGS.find(p => p.id === config.platePlating)?.name || config.platePlating}`,
      `Plate Thickness: ${config.plateThickness}.0mm Custom Cut`,
      `Left Side Panel: ${SIDE_PLATE_OPTIONS.find(s => s.id === config.sidePlateLeft)?.name}`,
      `Right Side Panel: ${SIDE_PLATE_OPTIONS.find(s => s.id === config.sidePlateRight)?.name}`,
      `Snap Style: ${config.snapStyle.replace('_', ' ')}`,
      `Border Carving: ${BORDER_STYLES.find(b => b.id === config.borderStyle)?.name || config.borderStyle}`,
      `Crystals: ${config.crystalsColor.replace('_', ' ')}`
    ];

    if (config.plateEngravingText.trim()) {
      details.push(`Custom Banner text: "${config.plateEngravingText.trim().toUpperCase()}"`);
    }

    onAddToQuote({
      id: `custom-${Date.now()}`,
      name: `Custom Championship Belt (${config.plateEngravingText || 'Untamed Model'})`,
      type: 'custom',
      price: totalPrice,
      image: '/src/assets/images/rex_hero_belt_1784340686134.jpg', // Uses hero image as custom thumbnail placeholder
      quantity: 1,
      details: details,
      customConfig: config
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // Get SVG metal color gradients based on selected plating
  const getMetalGradients = () => {
    switch (config.platePlating) {
      case 'silver':
        return {
          base: 'url(#silverGrad)',
          accent: 'url(#silverDark)',
          border: '#a1a1aa',
          highlight: '#e4e4e7'
        };
      case 'dualtone':
        return {
          base: 'url(#silverGrad)',
          accent: 'url(#goldGrad)',
          border: '#cca43b',
          highlight: '#fffbeb'
        };
      case 'antique_bronze':
        return {
          base: 'url(#bronzeGrad)',
          accent: 'url(#bronzeDark)',
          border: '#854d0e',
          highlight: '#ca8a04'
        };
      case 'gold':
      default:
        return {
          base: 'url(#goldGrad)',
          accent: 'url(#goldDark)',
          border: '#cca43b',
          highlight: '#fffbeb'
        };
    }
  };

  const metals = getMetalGradients();

  return (
    <section className="bg-[#09090a] py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative" id="designer-section">
      <div className="text-center mb-12">
        <span className="font-tech text-xs tracking-[0.3em] text-amber-500 font-bold uppercase block mb-3">Live Forge Simulator</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Bespoke Customizer
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-800 mx-auto mt-4 rounded" />
        <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
          Craft your own title. Adjust plating style, engraving plaques, gem mounts, and watch your championship dream render below in our real-time vector modeler.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive SVG Rendering Screen (Left - span 7) */}
        <div className="lg:col-span-7 bg-[#0f0f11] rounded-2xl border border-zinc-800/80 p-4 sm:p-8 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden aspect-[4/3] md:aspect-[16/10] lg:sticky lg:top-24">
          <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded text-[10px] font-tech text-amber-400 font-bold uppercase tracking-wider">
            <Eye className="w-3 h-3" /> Live Blueprint Mode
          </div>

          {/* SVG Canvas representing the belt */}
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] max-w-[650px]"
            id="interactive-belt-svg"
          >
            {/* Definitions */}
            <defs>
              {/* Gold Plating Gradients */}
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff2ac" />
                <stop offset="35%" stopColor="#cca43b" />
                <stop offset="70%" stopColor="#8d6e1b" />
                <stop offset="100%" stopColor="#cca43b" />
              </linearGradient>
              <linearGradient id="goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b48811" />
                <stop offset="100%" stopColor="#453102" />
              </linearGradient>

              {/* Silver/Chrome Gradients */}
              <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#a1a1aa" />
                <stop offset="70%" stopColor="#52525b" />
                <stop offset="100%" stopColor="#a1a1aa" />
              </linearGradient>
              <linearGradient id="silverDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#71717a" />
                <stop offset="100%" stopColor="#18181b" />
              </linearGradient>

              {/* Bronze/Antique Gradients */}
              <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d9a05b" />
                <stop offset="50%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="bronzeDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#2c1001" />
              </linearGradient>

              {/* Leather textures overlays */}
              <pattern id="crocPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="30" fill="none" />
                <path d="M0 0 C 10 5, 20 5, 30 0 M30 30 C 20 25, 10 25, 0 30 M0 0 L0 30 M30 0 L30 30" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none" />
              </pattern>
            </defs>

            {/* THE STRAP LEATHER MAIN BODY */}
            <g id="belt-strap">
              {/* Outer soft shadow leather backing */}
              <path
                d="M 20,180 Q 200,100 400,100 Q 600,100 780,180 L 780,220 Q 600,300 400,300 Q 200,300 20,220 Z"
                fill={config.strapColor}
                stroke="#000"
                strokeWidth="4"
              />

              {/* Croc texture overlay */}
              {config.strapLeather === 'croc' && (
                <path
                  d="M 20,180 Q 200,100 400,100 Q 600,100 780,180 L 780,220 Q 600,300 400,300 Q 200,300 20,220 Z"
                  fill="url(#crocPattern)"
                  opacity="0.6"
                  pointerEvents="none"
                />
              )}

              {/* Gold laces borders or stitching borders */}
              {config.borderStyle === 'stitched' && (
                <path
                  d="M 25,182 Q 200,105 400,105 Q 600,105 775,182 L 775,218 Q 600,295 400,295 Q 200,295 25,218 Z"
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
              )}
              {config.borderStyle === 'hand_tooled' && (
                <path
                  d="M 26,183 Q 200,107 400,107 Q 600,107 774,183 L 774,217 Q 600,293 400,293 Q 200,293 26,217 Z"
                  fill="none"
                  stroke="#1c1917"
                  strokeWidth="4"
                  opacity="0.8"
                />
              )}
              {config.borderStyle === 'gold_laced' && (
                <path
                  d="M 24,181 Q 200,103 400,103 Q 600,103 776,181 L 776,219 Q 600,297 400,297 Q 200,297 24,219 Z"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="3.5"
                />
              )}

              {/* Snaps box Left */}
              <g transform="translate(60, 185)">
                <circle cx="0" cy="0" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
                <circle cx="20" cy="0" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
                <circle cx="0" cy="20" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
                <circle cx="20" cy="20" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
              </g>

              {/* Snaps box Right */}
              <g transform="translate(710, 185)">
                <circle cx="0" cy="0" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
                <circle cx="15" cy="0" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
                <circle cx="0" cy="20" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
                <circle cx="15" cy="20" r="5" fill={config.snapStyle === 'gold_plated' ? '#ca8a04' : '#a1a1aa'} stroke="#111" strokeWidth="1" />
              </g>
            </g>

            {/* SIDE PLATES */}
            <g id="side-plates">
              {/* Left Side Plate */}
              <g transform="translate(230, 200)">
                {/* Plate base */}
                <circle cx="0" cy="0" r="35" fill={metals.base} stroke={metals.border} strokeWidth="3" />
                <circle cx="0" cy="0" r="30" fill={metals.accent} opacity="0.8" />
                <circle cx="0" cy="0" r="28" fill="none" stroke={metals.border} strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Side plate symbols */}
                {config.sidePlateLeft === 'classic_laurel' && (
                  <path d="M-15,5 Q-5,15 15,5 M-10,-10 C -2,-5 -2,5 -10,10 M10,-10 C 2,-5 2,5 10,10" fill="none" stroke={metals.border} strokeWidth="1.5" />
                )}
                {config.sidePlateLeft === 'eagle_wings' && (
                  <path d="M-18,-5 Q0,-15 18,-5 L10,5 L-10,5 Z" fill="none" stroke={metals.border} strokeWidth="2" />
                )}
                {config.sidePlateLeft === 'stars_stripes' && (
                  <g fill={metals.border}>
                    <polygon points="0,-12 3,-4 11,-4 5,1 7,9 0,4 -7,9 -5,1 -11,-4 -3,-4" scale="0.8" />
                  </g>
                )}
              </g>

              {/* Right Side Plate */}
              <g transform="translate(570, 200)">
                {/* Plate base */}
                <circle cx="0" cy="0" r="35" fill={metals.base} stroke={metals.border} strokeWidth="3" />
                <circle cx="0" cy="0" r="30" fill={metals.accent} opacity="0.8" />
                <circle cx="0" cy="0" r="28" fill="none" stroke={metals.border} strokeWidth="1" strokeDasharray="2,2" />

                {/* Side plate symbols */}
                {config.sidePlateRight === 'classic_laurel' && (
                  <path d="M-15,5 Q-5,15 15,5 M-10,-10 C -2,-5 -2,5 -10,10 M10,-10 C 2,-5 2,5 10,10" fill="none" stroke={metals.border} strokeWidth="1.5" />
                )}
                {config.sidePlateRight === 'eagle_wings' && (
                  <path d="M-18,-5 Q0,-15 18,-5 L10,5 L-10,5 Z" fill="none" stroke={metals.border} strokeWidth="2" />
                )}
                {config.sidePlateRight === 'stars_stripes' && (
                  <g fill={metals.border}>
                    <polygon points="0,-12 3,-4 11,-4 5,1 7,9 0,4 -7,9 -5,1 -11,-4 -3,-4" />
                  </g>
                )}
              </g>
            </g>

            {/* MAIN CENTRAL SHIELD PLATE */}
            <g id="main-plate" transform="translate(400, 200)">
              {/* Shield Base Shape (Stacked visual layers for thickness) */}
              {config.plateThickness >= 4 && (
                <path
                  d="M-112,-112 Q0,-142 112,-112 Q142,0 112,112 Q0,142 -112,112 Q-142,0 -112,-112 Z"
                  fill="rgba(0,0,0,0.4)"
                  transform="translate(4, 6)"
                />
              )}
              {config.plateThickness >= 6 && (
                <path
                  d="M-112,-112 Q0,-142 112,-112 Q142,0 112,112 Q0,142 -112,112 Q-142,0 -112,-112 Z"
                  fill="rgba(0,0,0,0.6)"
                  transform="translate(8, 10)"
                />
              )}

              {/* Main Plate Back Layer */}
              <path
                d="M-110,-110 Q0,-140 110,-110 Q140,0 110,110 Q0,140 -110,110 Q-140,0 -110,-110 Z"
                fill={metals.base}
                stroke={metals.border}
                strokeWidth="4.5"
              />

              {/* Decorative inner relief shield */}
              <path
                d="M-92,-92 Q0,-120 92,-92 Q120,0 92,92 Q0,120 -92,92 Q-120,0 -92,-92 Z"
                fill={metals.accent}
                opacity="0.9"
                stroke={metals.border}
                strokeWidth="1.5"
              />

              {/* Dual tone special center ring if dualtone selected */}
              {config.platePlating === 'dualtone' && (
                <circle cx="0" cy="0" r="55" fill="url(#silverGrad)" stroke="#cca43b" strokeWidth="2" />
              )}

              {/* Crown Crown Center Eagle Graphic outline */}
              <g stroke={metals.border} strokeWidth="2" fill="none" transform="translate(0, -10)">
                <path d="M-30,-25 L-10,-50 L10,-50 L30,-25 L40,-5 L20,25 L-20,25 L-40,-5 Z" opacity="0.25" />
                {/* Crown Stars */}
                <circle cx="-20" cy="-35" r="2" fill={metals.highlight} />
                <circle cx="0" cy="-42" r="2.5" fill={metals.highlight} />
                <circle cx="20" cy="-35" r="2" fill={metals.highlight} />
              </g>

              {/* SWAROVSKI CRYSTALS */}
              {config.crystalsColor !== 'none' && (
                <g id="swarovski-stones">
                  {/* Top arc crystals */}
                  <circle cx="-60" cy="-85" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="-30" cy="-95" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="0" cy="-100" r="4" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="30" cy="-95" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="60" cy="-85" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />

                  {/* Bottom arc crystals */}
                  <circle cx="-60" cy="85" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="-30" cy="95" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="0" cy="100" r="4" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="30" cy="95" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                  <circle cx="60" cy="85" r="3.5" fill={config.crystalsColor === 'clear_swarovski' ? '#fff' : config.crystalsColor === 'ruby_red' ? '#ef4444' : '#22c55e'} stroke="#333" strokeWidth="0.5" />
                </g>
              )}

              {/* REX LOGO ICON EMBLEM IN CENTER SHIELD */}
              <g transform="translate(0, -10)">
                <polygon points="0,-25 18,-5 10,20 -10,20 -18,-5" fill="none" stroke={metals.border} strokeWidth="2.5" />
                <text
                  x="0"
                  y="5"
                  fill={metals.border}
                  fontFamily="Cinzel, serif"
                  fontSize="12"
                  fontWeight="900"
                  textAnchor="middle"
                  letterSpacing="2"
                >
                  REX
                </text>
              </g>

              {/* THE TEXT ENGRAVING BANNER (CHAMBER BOX) */}
              <g transform="translate(0, 50)">
                {/* Banner plaque plate */}
                <rect x="-85" y="-14" width="170" height="28" rx="4" fill={metals.base} stroke={metals.border} strokeWidth="2" />
                <rect x="-81" y="-10" width="162" height="20" rx="2" fill="none" stroke={metals.border} strokeWidth="0.75" strokeDasharray="1,1" />
                
                {/* Dynamic customized text */}
                <text
                  x="0"
                  y="5"
                  fill="#000000"
                  fontFamily="Space Grotesk, sans-serif"
                  fontSize="11"
                  fontWeight="900"
                  textAnchor="middle"
                  letterSpacing="1.5"
                  opacity="0.85"
                >
                  {(config.plateEngravingText || 'YOUR TITLE').toUpperCase()}
                </text>
              </g>

              {/* Small screw rivets on main plate corners */}
              <circle cx="-100" cy="-60" r="2.5" fill="#444" />
              <circle cx="100" cy="-60" r="2.5" fill="#444" />
              <circle cx="-100" cy="60" r="2.5" fill="#444" />
              <circle cx="100" cy="60" r="2.5" fill="#444" />
            </g>
          </svg>

          {/* Prompt indicators */}
          <div className="mt-6 flex gap-6 text-[11px] text-zinc-500 font-sans border-t border-zinc-900/60 pt-4 w-full justify-center">
            <span className="flex items-center gap-1"><Info className="w-3.5 h-3.5 text-amber-500" /> Vector Render updates dynamically</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Auto-saved configurations</span>
          </div>
        </div>

        {/* Configurations Controls (Right - span 5) */}
        <div className="lg:col-span-5 bg-[#0f0f11] rounded-2xl border border-zinc-800/80 p-6 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Tab Controls */}
            <div className="flex border-b border-zinc-800 mb-6">
              <button
                onClick={() => setActiveTab('metals')}
                className={`flex-1 py-3 text-center font-tech text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'metals' ? 'text-amber-400 border-b-2 border-amber-500' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                id="control-tab-metals"
              >
                1. Plate & Metals
              </button>
              <button
                onClick={() => setActiveTab('leather')}
                className={`flex-1 py-3 text-center font-tech text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'leather' ? 'text-amber-400 border-b-2 border-amber-500' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                id="control-tab-leather"
              >
                2. Strap & Cut
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-3 text-center font-tech text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'details' ? 'text-amber-400 border-b-2 border-amber-500' : 'text-zinc-500 hover:text-zinc-300'
                }`}
                id="control-tab-details"
              >
                3. Stones & Trim
              </button>
            </div>

            {/* TAB CONTENT 1: METALS */}
            {activeTab === 'metals' && (
              <div className="space-y-6 animate-fade-in">
                {/* 1. Plating Choice */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Main Plate Plating Material</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PLATE_PLATINGS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleFieldChange('platePlating', p.id)}
                        className={`p-3 rounded border text-left cursor-pointer transition-all ${
                          config.platePlating === p.id 
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id={`plating-select-${p.id}`}
                      >
                        <span className="block text-xs font-tech font-black uppercase">{p.name}</span>
                        <span className="block text-[10px] text-zinc-500 font-sans mt-1 line-clamp-1">{p.desc}</span>
                        <span className="block text-[10px] text-amber-500 font-tech font-bold mt-1.5">+ ${p.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Plate Thickness */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Zinc Plate Thickness Depth</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 4, 6].map(thick => (
                      <button
                        key={thick}
                        onClick={() => handleFieldChange('plateThickness', thick)}
                        className={`p-3 rounded border text-center cursor-pointer transition-all ${
                          config.plateThickness === thick 
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id={`thick-select-${thick}`}
                      >
                        <span className="block text-sm font-tech font-black">{thick}.0 mm</span>
                        <span className="block text-[9px] text-zinc-500 font-sans mt-0.5">
                          {thick === 2 ? 'Flat Detail' : thick === 4 ? 'Pro Heavy' : 'Extreme 3D'}
                        </span>
                        <span className="block text-[9px] text-amber-500 font-tech font-bold mt-1">
                          {thick === 2 ? 'Base Cost' : thick === 4 ? '+ $100' : '+ $250'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Main Plate Text engraving */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Plaque Title Text Engraving</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={config.plateEngravingText}
                    onChange={(e) => handleFieldChange('plateEngravingText', e.target.value)}
                    placeholder="Enter belt title..."
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-xs text-white font-tech focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 tracking-widest placeholder-zinc-700"
                    id="engraving-custom-input"
                  />
                  <span className="block text-[10px] text-zinc-500 font-sans">Max 16 characters. This text is carved directly onto the main bottom banner plaque.</span>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: LEATHER & STRAPS */}
            {activeTab === 'leather' && (
              <div className="space-y-6 animate-fade-in">
                {/* 1. Strap Base Leather Choice */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Strap Base Leather Hide</label>
                  <div className="grid grid-cols-2 gap-2">
                    {STRAP_LEATHERS.map(l => (
                      <button
                        key={l.id}
                        onClick={() => handleFieldChange('strapLeather', l.id)}
                        className={`p-3 rounded border text-left cursor-pointer transition-all ${
                          config.strapLeather === l.id 
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id={`leather-select-${l.id}`}
                      >
                        <span className="block text-xs font-tech font-black uppercase">{l.name}</span>
                        <span className="block text-[10px] text-zinc-500 font-sans mt-1 line-clamp-1">{l.desc}</span>
                        <span className="block text-[10px] text-amber-500 font-tech font-bold mt-1.5">+ ${l.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Strap Color selection */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Strap Color Choice</label>
                  <div className="grid grid-cols-3 gap-2">
                    {STRAP_COLORS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => handleFieldChange('strapColor', c.id)}
                        className={`p-3.5 rounded border flex items-center gap-2 cursor-pointer transition-all ${
                          config.strapColor === c.id 
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400 font-bold' 
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id={`color-select-${c.name.replace(' ', '-')}`}
                      >
                        <span 
                          className="w-4 h-4 rounded-full border border-zinc-700/50 block shrink-0" 
                          style={{ backgroundColor: c.id }}
                        />
                        <span className="text-[10px] font-tech uppercase tracking-tight">{c.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Border style styling */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Strap Border Carving & Lacing</label>
                  <div className="grid grid-cols-1 gap-2">
                    {BORDER_STYLES.map(b => (
                      <button
                        key={b.id}
                        onClick={() => handleFieldChange('borderStyle', b.id)}
                        className={`p-3 rounded border flex justify-between items-center text-left cursor-pointer transition-all ${
                          config.borderStyle === b.id 
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id={`border-select-${b.id}`}
                      >
                        <div>
                          <span className="block text-xs font-tech font-black uppercase">{b.name}</span>
                          <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">{b.desc}</span>
                        </div>
                        <span className="text-[11px] font-tech font-bold text-amber-500 shrink-0 ml-4">+ ${b.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: DETAILS & CRYSTALS */}
            {activeTab === 'details' && (
              <div className="space-y-6 animate-fade-in">
                {/* 1. Side Plates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Left Side Panel Design</label>
                    <select
                      value={config.sidePlateLeft}
                      onChange={(e) => handleFieldChange('sidePlateLeft', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300 font-tech focus:border-amber-500 focus:outline-none"
                      id="select-side-left"
                    >
                      {SIDE_PLATE_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Right Side Panel Design</label>
                    <select
                      value={config.sidePlateRight}
                      onChange={(e) => handleFieldChange('sidePlateRight', e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300 font-tech focus:border-amber-500 focus:outline-none"
                      id="select-side-right"
                    >
                      {SIDE_PLATE_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Crystals Selection */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Gems & Swarovski Crystals</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'clear_swarovski', name: 'Clear Brilliant Swarovski', price: 85, desc: 'Diamond-shimmering white crystals.' },
                      { id: 'ruby_red', name: 'Premium Ruby Red Crystals', price: 95, desc: 'Fiery high-contrast crimson diamonds.' },
                      { id: 'emerald_green', name: 'Premium Emerald Crystals', price: 95, desc: 'Brilliant deep green jewels.' },
                      { id: 'none', name: 'No Gem Stones', price: 0, desc: 'Clean high-relief all-metal outline.' }
                    ].map(gem => (
                      <button
                        key={gem.id}
                        onClick={() => handleFieldChange('crystalsColor', gem.id)}
                        className={`p-3 rounded border text-left cursor-pointer transition-all ${
                          config.crystalsColor === gem.id 
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id={`crystals-select-${gem.id}`}
                      >
                        <span className="block text-xs font-tech font-black uppercase">{gem.name}</span>
                        <span className="block text-[10px] text-zinc-500 font-sans mt-0.5 line-clamp-1">{gem.desc}</span>
                        {gem.price > 0 && <span className="block text-[10px] text-amber-500 font-tech font-bold mt-1">+ ${gem.price}</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Snap Style */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">Snap Box Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleFieldChange('snapStyle', 'standard_brass')}
                      className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                        config.snapStyle === 'standard_brass' 
                          ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                          : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                      }`}
                      id="snap-select-brass"
                    >
                      <span className="block text-xs font-tech font-black uppercase">Standard Silver Nickel</span>
                      <span className="block text-[9px] text-zinc-500 font-sans mt-0.5">Base. High-tension steel fasteners.</span>
                    </button>
                    <button
                      onClick={() => handleFieldChange('snapStyle', 'gold_plated')}
                      className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                        config.snapStyle === 'gold_plated' 
                          ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                          : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                      }`}
                      id="snap-select-gold"
                    >
                      <span className="block text-xs font-tech font-black uppercase">Gold-Plated Snaps (+ $40)</span>
                      <span className="block text-[9px] text-zinc-500 font-sans mt-0.5">Heavy brass capped with gold plating.</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing estimation and action */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="block text-[9px] font-tech text-zinc-500 uppercase tracking-widest font-bold">Crafting Blueprint Est.</span>
              <span className="text-3xl font-tech font-black text-amber-400">
                ${totalPrice}
              </span>
            </div>

            <button
              onClick={handleSaveCustomDesign}
              disabled={showSuccess}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:from-amber-400 hover:to-amber-600 shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-50"
              id="custom-save-design-btn"
            >
              {showSuccess ? (
                <>
                  <Check className="w-4 h-4 animate-scale-in" />
                  Design Saved to Quote!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Save Design & Get Quote
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Shield, Zap, Layers, ChevronLeft, ChevronRight, Eye, RefreshCw, Star } from 'lucide-react';

interface ParallaxBelt {
  id: string;
  name: string;
  tagline: string;
  image: string;
  color: string; // Tailind glow color
  details: { label: string; value: string; x: number; y: number }[]; // custom annotation markers
  specs: { weight: string; plates: string; gems: string; craftTime: string };
  description: string;
}

const PARALLAX_BELTS: ParallaxBelt[] = [
  {
    id: 'sovereign-heavyweight',
    name: 'Sovereign World Heavyweight',
    tagline: 'THE PRESTIGIOUS "BIG GOLD" CLASSIC',
    image: '/src/assets/images/rex_hero_belt_1784340686134.jpg',
    color: 'from-amber-500/20 to-yellow-600/10',
    description: 'A monument of historical glory. CNC precision-etched 6.0mm quadruple-stacked brass plate with deep-relief classical floral filigree work and dual-tone platinum banners.',
    specs: {
      weight: '11.8 lbs',
      plates: '6.0mm Deep CNC Brass',
      gems: '145 Swarovski Rubies/Diamonds',
      craftTime: '45 Crafting Hours'
    },
    details: [
      { label: '6.0mm Deep Brass CNC Plate', value: 'Breathtaking 3D relief depths with classical victorian floral carvings.', x: 15, y: 25 },
      { label: 'Sovereign Crown Mount', value: 'Custom hand-cut master crown electroplated in pure sterling silver.', x: 50, y: 15 },
      { label: 'Swarovski Diamond Bezels', value: 'Individually prong-set crystalline gemstones flanking the center text.', x: 80, y: 40 },
      { label: 'Genuine Steer Saddle Leather', value: 'Vegetable-tanned full-grain cowhide hand-tooling with basket border.', x: 45, y: 85 }
    ]
  },
  {
    id: 'winged-eagle-retro',
    name: 'WWF Winged Eagle Retro',
    tagline: 'GOLDEN ERA RETRO CHAMPIONSHIP',
    image: '/src/assets/images/rex_winged_eagle_1784341307206.jpg',
    color: 'from-amber-600/25 to-blue-600/10',
    description: 'The iconic 1989 design. Features soaring golden eagles spread wide protecting a custom hand-painted blue globe on deep-textured vegetable tanned leather.',
    specs: {
      weight: '9.4 lbs',
      plates: '4.0mm Stacked Zinc',
      gems: 'N/A (Traditional Enamel)',
      craftTime: '38 Crafting Hours'
    },
    details: [
      { label: 'Majestic Winged Eagle', value: 'High-relief feathers hand-masked with platinum highlights.', x: 50, y: 25 },
      { label: 'Deep Blue Enamel Globe', value: 'Royal marine glossy paint finish highlighting the continents.', x: 50, y: 55 },
      { label: 'Heritage Floral Borders', value: 'Custom stamp-pressed floral border patterns etched onto thick leather.', x: 20, y: 70 },
      { label: 'Original Block Snaps', value: 'Solid brass snap boxes with heavy-duty retention springs.', x: 85, y: 75 }
    ]
  },
  {
    id: 'octagon-mma-ultimate',
    name: 'Ultimate Octagon MMA Champion',
    tagline: 'AGGRESSIVE COMBAT GLORY',
    image: '/src/assets/images/rex_ufc_mma_1784341327573.jpg',
    color: 'from-zinc-400/20 to-amber-500/10',
    description: 'Heavy dual-tone zinc plates with a cage-wire pattern back layer, flanked by polished silver gladiators and high-impact ruby stone details.',
    specs: {
      weight: '12.2 lbs',
      plates: '5.5mm Multi-Layer Zinc',
      gems: '168 Swarovski Rubies',
      craftTime: '52 Crafting Hours'
    },
    details: [
      { label: 'Octagonal Wire-Mesh Plate', value: 'Silver micro-etched steel cage fence pattern behind gold crest.', x: 50, y: 50 },
      { label: 'Combat Gladiators', value: 'Hand-sculpted combatants representing wrestling and striking arts.', x: 25, y: 40 },
      { label: 'Croc-Embossed Black Hide', value: 'Aggressive crocodile pattern stamped on premium flexible leather.', x: 45, y: 85 },
      { label: 'Ruby-Red Accents', value: 'Twelve custom bezel-set blood rubies marking core round indicators.', x: 75, y: 30 }
    ]
  },
  {
    id: 'aew-lion-king',
    name: 'AEW Tribute Lion-King',
    tagline: 'MODERN PLATINUM HYBRID',
    image: '/src/assets/images/rex_dualtone_modern_1784340730071.jpg',
    color: 'from-amber-400/20 to-zinc-200/10',
    description: 'Sleek geometric framework. Contrasting polished silver centerpiece depicting a roaring lion over dual-stacked mirror-gold shields.',
    specs: {
      weight: '10.5 lbs',
      plates: '5.0mm Cast Zinc Alloys',
      gems: '92 Diamond Crystals',
      craftTime: '40 Crafting Hours'
    },
    details: [
      { label: '3D Roaring Lion Shield', value: 'Aggressive lion head with deep shadow cavities and chrome polish.', x: 50, y: 45 },
      { label: 'Geometric Side Banners', value: 'Brushed aluminum textures paired with gold trim plates.', x: 22, y: 50 },
      { label: 'Removable Side Seals', value: 'Unscrew the secondary plates to mount custom team or brand logos.', x: 78, y: 50 },
      { label: 'Velvet Soft Cushion Backing', value: 'Protective black luxury velvet layout to avoid clothing marks.', x: 45, y: 90 }
    ]
  }
];

export default function BeltParallaxShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeBelt, setActiveBelt] = useState<ParallaxBelt>(PARALLAX_BELTS[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeDetail, setActiveDetail] = useState<number | null>(null);
  const [perspectiveStrength, setPerspectiveStrength] = useState(15); // Adjust for 3D intensity
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveBelt(PARALLAX_BELTS[currentIndex]);
    setActiveDetail(null);
  }, [currentIndex]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates to range [-1, 1]
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
    setActiveDetail(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
    // Bound check
    setMousePos({ 
      x: Math.max(-1, Math.min(1, x)), 
      y: Math.max(-1, Math.min(1, y)) 
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PARALLAX_BELTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === PARALLAX_BELTS.length - 1 ? 0 : prev + 1));
  };

  // Holographic 3D styles derived from mouse values
  const tiltStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateY(${mousePos.x * perspectiveStrength}deg) rotateX(${-mousePos.y * perspectiveStrength}deg)`
      : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
    transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const layerBackStyle = {
    transform: `translateX(${mousePos.x * -18}px) translateY(${mousePos.y * -18}px)`,
    transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const layerMidStyle = {
    transform: `translateX(${mousePos.x * 8}px) translateY(${mousePos.y * 8}px) translateZ(30px)`,
    transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const layerFrontStyle = {
    transform: `translateX(${mousePos.x * 22}px) translateY(${mousePos.y * 22}px) translateZ(60px)`,
    transition: isHovered ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const flareStyle = {
    left: `${(mousePos.x + 1) * 50}%`,
    top: `${(mousePos.y + 1) * 50}%`,
    transform: 'translate(-50%, -50%)',
    transition: isHovered ? 'none' : 'left 0.8s, top 0.8s',
  };

  return (
    <section className="bg-gradient-to-b from-[#0b0b0c] to-[#070708] py-20 px-4 sm:px-6 lg:px-8 border-y border-zinc-900/60 relative overflow-hidden" id="belt-parallax-vault">
      {/* Absolute Ambient Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Decorative colored glow based on active belt */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${activeBelt.color} rounded-full filter blur-[140px] opacity-40 pointer-events-none transition-all duration-1000`} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 font-tech uppercase tracking-[0.25em] rounded-full font-bold">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            IMMERSIVE 3D PARALLAX SHOWCASE
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight">
            THE DIGITAL BELT VAULT
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Hover, tilt, and explore the physical layers of our championship masterpieces. Watch the 24k electroplated gold emblems, genuine cowhide leather engravings, and Swarovski stones react dynamically to your perspective.
          </p>
        </div>

        {/* Dynamic Selector Tickers */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {PARALLAX_BELTS.map((belt, idx) => (
            <button
              key={belt.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-lg font-tech text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                currentIndex === idx
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-black shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'bg-zinc-950/80 text-zinc-500 hover:text-zinc-300 border border-zinc-900 hover:border-zinc-800'
              }`}
              id={`vault-tab-${belt.id}`}
            >
              {belt.name}
            </button>
          ))}
        </div>

        {/* 3D Parallax Canvas & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column Left (5 Cols): Product Metadata & Controls */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-tech text-amber-500 uppercase tracking-widest font-black block">
                {activeBelt.tagline}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">
                {activeBelt.name}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                {activeBelt.description}
              </p>
            </div>

            {/* Spec grid sheets */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-950/80 p-5 rounded-2xl border border-zinc-900 text-left">
              <div className="space-y-1">
                <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black">Chassis Weight</span>
                <span className="font-tech text-sm font-bold text-white block">{activeBelt.specs.weight}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black">Plate Blueprint</span>
                <span className="font-tech text-sm font-bold text-white block">{activeBelt.specs.plates}</span>
              </div>
              <div className="space-y-1 pt-3 border-t border-zinc-900/60">
                <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black">Gems Config</span>
                <span className="font-tech text-sm font-bold text-white block">{activeBelt.specs.gems}</span>
              </div>
              <div className="space-y-1 pt-3 border-t border-zinc-900/60">
                <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black">Artisan Labor</span>
                <span className="font-tech text-sm font-bold text-white block">{activeBelt.specs.craftTime}</span>
              </div>
            </div>

            {/* Active Highlight Info */}
            <div className="min-h-[85px] bg-amber-500/5 rounded-xl border border-amber-500/10 p-4 relative overflow-hidden text-left">
              <div className="absolute right-3 top-3">
                <Layers className="w-4 h-4 text-amber-500/30" />
              </div>
              {activeDetail !== null ? (
                <div className="space-y-1 animate-fade-in">
                  <span className="font-tech text-[10px] text-amber-500 font-black uppercase tracking-wider block">
                    {activeBelt.details[activeDetail].label}
                  </span>
                  <p className="text-zinc-400 text-[11px] font-sans leading-relaxed">
                    {activeBelt.details[activeDetail].value}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3 h-full justify-center lg:justify-start">
                  <Compass className="w-5 h-5 text-amber-500 shrink-0 animate-pulse" />
                  <span className="text-xs text-zinc-500 font-sans">
                    Hover your cursor over the highlighted gold target points on the belt to inspect premium components.
                  </span>
                </div>
              )}
            </div>

            {/* Interactive sliders or navigation controls */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="p-3 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                  id="vault-prev-btn"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                  id="vault-next-btn"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-tech text-zinc-600 uppercase font-bold">Tilt Multiplier</span>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={perspectiveStrength}
                  onChange={(e) => setPerspectiveStrength(Number(e.target.value))}
                  className="w-24 accent-amber-500 h-1 bg-zinc-900 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-tech text-amber-500 font-bold w-6 text-right">
                  {perspectiveStrength}°
                </span>
              </div>
            </div>

          </div>

          {/* Column Right (7 Cols): The 3D Interactive Parallax Display Stage */}
          <div className="lg:col-span-7 flex justify-center items-center order-1 lg:order-2">
            
            {/* The Stage bounds */}
            <div 
              ref={containerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => setIsHovered(true)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseLeave}
              className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl bg-[#09090b] border border-zinc-900 shadow-[0_30px_70px_rgba(0,0,0,0.9)] cursor-crosshair overflow-hidden group flex items-center justify-center p-6"
              id="parallax-canvas-container"
            >
              
              {/* Back Layer 0: Radial colored energy gradient reacting to mouse in reverse */}
              <div 
                style={layerBackStyle}
                className="absolute inset-0 pointer-events-none overflow-hidden"
              >
                <div 
                  style={flareStyle}
                  className={`absolute w-80 h-80 rounded-full bg-gradient-to-tr ${activeBelt.color} blur-[100px] opacity-40 pointer-events-none`}
                />
                
                {/* Tactical grid background inside the frame */}
                <div className="absolute inset-0 bg-[radial-gradient(#1c1917_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
              </div>

              {/* Back Layer 1: Technical schematic crosshair HUD */}
              <div 
                style={layerBackStyle}
                className="absolute inset-4 border border-zinc-900/80 rounded-2xl pointer-events-none flex flex-col justify-between p-4"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-tech text-zinc-700 uppercase tracking-widest font-bold">SENSORS ONLINE</span>
                  <span className="text-[8px] font-tech text-zinc-700 font-bold">X: {mousePos.x.toFixed(2)} Y: {mousePos.y.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex gap-1.5 items-center">
                    <Shield className="w-3 h-3 text-amber-500/20" />
                    <span className="text-[7px] font-tech text-zinc-800 uppercase font-black">AUTHENTIC REX LEDGER</span>
                  </div>
                  <span className="text-[8px] font-tech text-zinc-700 font-bold">PERSPECTIVE: {perspectiveStrength}°</span>
                </div>
              </div>

              {/* Interactive 3D Frame container */}
              <div 
                style={tiltStyle}
                className="relative w-full h-full flex items-center justify-center transform-gpu"
                id="parallax-tilt-stage"
              >
                
                {/* Middle Layer 2: The Core Belt Image Card with high-contrast shadow */}
                <div 
                  style={layerMidStyle}
                  className="relative w-[85%] aspect-[16/10] sm:aspect-[4/3] max-h-[90%] rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex items-center justify-center transform-gpu group"
                >
                  {/* Subtle sweep glare reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  <img 
                    src={activeBelt.image} 
                    alt={activeBelt.name} 
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Highlight Annotation target rings */}
                  <div className="absolute inset-0 pointer-events-none">
                    {activeBelt.details.map((detail, idx) => (
                      <button
                        key={idx}
                        onMouseEnter={() => setActiveDetail(idx)}
                        onClick={() => setActiveDetail(idx)}
                        style={{ left: `${detail.x}%`, top: `${detail.y}%` }}
                        className={`absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-amber-500/10 border border-amber-500 hover:border-amber-400 hover:scale-125 transition-transform cursor-pointer pointer-events-auto flex items-center justify-center ${
                          activeDetail === idx ? 'scale-125 bg-amber-400/20 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]' : ''
                        }`}
                        title={detail.label}
                      >
                        <span className="absolute inset-0 rounded-full border border-amber-500/50 animate-ping opacity-60" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      </button>
                    ))}
                  </div>

                </div>

                {/* Front Layer 3: Floating High-Impact Foreground Accents */}
                <div 
                  style={layerFrontStyle}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center transform-gpu"
                >
                  {/* Glowing 3D floating title plate highlight */}
                  <div className="absolute top-6 left-12 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 text-white shadow-2xl flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" />
                    <span className="font-tech text-[8px] sm:text-[9px] uppercase tracking-widest font-black">24K GOLD LAYERED</span>
                  </div>

                  {/* Side-plate metal floating detail */}
                  <div className="absolute bottom-8 right-12 bg-black/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 shadow-2xl flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span className="font-tech text-[8px] sm:text-[9px] uppercase tracking-widest font-bold">{activeBelt.specs.weight} HEAVYWEIGHT</span>
                  </div>

                  {/* Sparkle effects scattered in 3D */}
                  <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping pointer-events-none" />
                  <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-ping pointer-events-none" style={{ animationDelay: '1s' }} />
                </div>

              </div>

              {/* Cursor interactive overlay instruction */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-900 text-[8px] sm:text-[9px] text-zinc-500 font-tech uppercase tracking-widest font-bold pointer-events-none flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin text-amber-500" style={{ animationDuration: '4s' }} />
                Move Mouse / Touch & Drag to Tilt 3D
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

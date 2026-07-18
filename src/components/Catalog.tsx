import React, { useState } from 'react';
import { CATALOG_BELTS } from '../data';
import { BeltCatalogItem, BeltCategory, CustomBeltConfig } from '../types';
import { Eye, Hammer, ShieldCheck, ShoppingCart, X, Sparkles, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CatalogProps {
  onAddToQuote: (item: {
    id: string;
    name: string;
    type: 'catalog' | 'custom';
    price: number;
    image: string;
    quantity: number;
    details: string[];
  }) => void;
  onNavigateToCustomizer: () => void;
}

const CATEGORIES: { id: BeltCategory | 'all'; name: string }[] = [
  { id: 'all', name: 'All Masterpieces' },
  { id: 'wrestling', name: 'Wrestling Titles' },
  { id: 'boxing_mma', name: 'Combat MMA / Boxing' },
  { id: 'fantasy_football', name: 'Fantasy & Games' },
  { id: 'corporate', name: 'Corporate & Awards' }
];

export default function Catalog({ onAddToQuote, onNavigateToCustomizer }: CatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<BeltCategory | 'all'>('all');
  const [activeItem, setActiveItem] = useState<BeltCatalogItem | null>(null);

  // Customizer selections inside the product detail modal
  const [engravingText, setEngravingText] = useState('');
  const [thicknessOption, setThicknessOption] = useState<'standard' | 'ultra'>('standard');
  const [strapBacking, setStrapBacking] = useState<'standard' | 'suede_luxury'>('standard');
  const [includeCase, setIncludeCase] = useState(true);
  const [successToast, setSuccessToast] = useState(false);

  const filteredBelts = selectedCategory === 'all' 
    ? CATALOG_BELTS 
    : CATALOG_BELTS.filter(belt => belt.category === selectedCategory);

  const openModal = (item: BeltCatalogItem) => {
    setActiveItem(item);
    setEngravingText('');
    setThicknessOption('standard');
    setStrapBacking('standard');
    setIncludeCase(true);
  };

  const closeModal = () => {
    setActiveItem(null);
  };

  const handleAddCatalogItem = () => {
    if (!activeItem) return;

    let finalPrice = activeItem.price;
    const finalDetails = [
      `Plating: ${activeItem.plating}`,
      `Leather: ${activeItem.leather}`
    ];

    if (thicknessOption === 'ultra') {
      finalPrice += 200;
      finalDetails.push('Plates: 6.0mm Ultra-Heavy Stacked Upgrade (+$200)');
    } else {
      finalDetails.push(`Plates: ${activeItem.thickness}`);
    }

    if (strapBacking === 'suede_luxury') {
      finalPrice += 75;
      finalDetails.push('Backing: Premium Hand-Sewn Gold Suede Backing (+$75)');
    } else {
      finalDetails.push('Backing: Heavy Grip Solid Textured Velvet backing');
    }

    if (includeCase) {
      finalPrice += 60;
      finalDetails.push('Case: Signature Rex Velvet Carry Bag & Travel Case (+$60)');
    }

    if (engravingText.trim()) {
      finalDetails.push(`Custom Center Plate text: "${engravingText.trim().toUpperCase()}"`);
    } else {
      finalDetails.push('Custom Plate: Blank center plate');
    }

    onAddToQuote({
      id: `${activeItem.id}-${Date.now()}`,
      name: activeItem.name,
      type: 'catalog',
      price: finalPrice,
      image: activeItem.image,
      quantity: 1,
      details: finalDetails
    });

    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
      closeModal();
    }, 1500);
  };

  return (
    <section className="bg-[#0b0b0c] py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative" id="showroom-section">
      <div className="text-center mb-16">
        <span className="font-tech text-xs tracking-[0.3em] text-amber-500 font-bold uppercase block mb-3">The Showroom</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Rex Elite Collections
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-800 mx-auto mt-4 rounded" />
        <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
          Exquisite hand-finished belt models. Every design is crafted with deep 3D physical metal molds, layered plating, and real-stitch leather straps. Select a series to personalize.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 sm:px-5 py-2.5 rounded font-tech text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedCategory === category.id 
                ? 'bg-amber-500 text-black font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/60'
            }`}
            id={`tab-cat-${category.id}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBelts.map(belt => (
          <motion.div
            layout
            key={belt.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="group bg-[#0f0f11] rounded-xl border border-zinc-900/80 overflow-hidden hover:border-amber-500/30 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.06)] flex flex-col"
            id={`belt-card-${belt.id}`}
          >
            {/* Image Frame */}
            <div className="relative overflow-hidden aspect-[4/3] bg-zinc-950">
              <img 
                src={belt.image} 
                alt={belt.name} 
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              
              {/* Category tag */}
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/70 backdrop-blur-md text-amber-400 text-[10px] font-tech uppercase tracking-widest rounded border border-zinc-800 font-bold">
                {belt.category.replace('_', ' ')}
              </span>

              {/* Action Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => openModal(belt)}
                  className="px-5 py-2.5 bg-white text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:bg-amber-400 hover:text-black transition-colors duration-200 flex items-center gap-2 cursor-pointer shadow-lg"
                  id={`view-details-${belt.id}`}
                >
                  <Eye className="w-4 h-4" />
                  Customize Build
                </button>
              </div>
            </div>

            {/* Content Frame */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-display text-lg font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors duration-200">
                {belt.name}
              </h3>
              <p className="text-zinc-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                {belt.description}
              </p>

              {/* Specs pill preview */}
              <div className="mt-4 flex flex-col gap-1.5 text-[11px] font-tech text-zinc-400 border-t border-zinc-900 pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-600 font-bold uppercase">Plates:</span>
                  <span className="truncate max-w-[200px] text-right text-zinc-300">{belt.thickness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 font-bold uppercase">Plating:</span>
                  <span className="truncate max-w-[200px] text-right text-zinc-300">{belt.plating}</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                <div>
                  <span className="block text-[9px] font-tech text-zinc-500 uppercase tracking-wider font-bold">Inquiry Price Est.</span>
                  <span className="text-lg font-tech font-black text-amber-400">${belt.price}</span>
                </div>
                <button
                  onClick={() => openModal(belt)}
                  className="p-2 border border-zinc-800 hover:border-amber-500 hover:text-amber-400 rounded-lg text-zinc-400 transition-colors cursor-pointer"
                  title="Configure and quote"
                  id={`configure-icon-btn-${belt.id}`}
                >
                  <Hammer className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No belts found safety */}
      {filteredBelts.length === 0 && (
        <div className="text-center py-16 bg-zinc-950 rounded-xl border border-zinc-900 mt-8">
          <p className="text-zinc-500 text-sm">No standard belts matching this category. Choose our custom creator below!</p>
          <button
            onClick={onNavigateToCustomizer}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:bg-amber-400 transition-colors cursor-pointer"
            id="not-found-designer-btn"
          >
            Launch Premium Designer
          </button>
        </div>
      )}

      {/* Banner promo to custom customizer */}
      <div className="mt-16 bg-gradient-to-r from-zinc-950 via-[#12110e] to-zinc-950 p-8 rounded-2xl border border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-white">Need a totally unique, 100% custom belt?</h4>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 max-w-xl font-sans">
              Choose every tiny detail: custom dual metal layer thickness, unique shape templates, personalized floral leather stampings, and bespoke logo uploads. Run our state-of-the-art interactive simulator!
            </p>
          </div>
        </div>
        <button
          onClick={onNavigateToCustomizer}
          className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:from-amber-400 hover:to-amber-600 transition-all shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] whitespace-nowrap cursor-pointer shrink-0"
          id="catalog-promo-designer-btn"
        >
          Launch Interactive Designer
        </button>
      </div>

      {/* Detailed Customization Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="catalog-detail-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-4xl bg-[#0c0c0e] rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Left Side: Product Media */}
              <div className="md:w-1/2 relative bg-zinc-950 flex flex-col">
                <img 
                  src={activeItem.image} 
                  alt={activeItem.name} 
                  className="w-full h-full object-cover aspect-video md:aspect-auto md:flex-grow"
                  referrerPolicy="no-referrer"
                />
                
                {/* Specs Overlay */}
                <div className="p-6 bg-zinc-950 border-t border-zinc-900 hidden md:block">
                  <h4 className="font-tech text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">Artisan Build Sheet</h4>
                  <ul className="text-xs text-zinc-400 space-y-2 font-sans">
                    {activeItem.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side: Configuration Options */}
              <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-none">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer z-20"
                  aria-label="Close modal"
                  id="close-catalog-modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Info and options */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-tech text-amber-400 uppercase tracking-widest font-bold">Configure Custom Build</span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-wide uppercase mt-1">
                      {activeItem.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 font-sans leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Standard Base Specs */}
                  <div className="grid grid-cols-2 gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/40 text-[11px] font-tech text-zinc-400">
                    <div>
                      <span className="block text-zinc-600 font-bold uppercase">Plate Plating</span>
                      <span className="block text-zinc-300 mt-0.5">{activeItem.plating}</span>
                    </div>
                    <div>
                      <span className="block text-zinc-600 font-bold uppercase">Leather Strap</span>
                      <span className="block text-zinc-300 mt-0.5">{activeItem.leather}</span>
                    </div>
                  </div>

                  {/* Option 1: Metal Plate Thickness */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">
                      Plate Metal Thickness
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setThicknessOption('standard')}
                        className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                          thicknessOption === 'standard'
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400'
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id="option-thick-std"
                      >
                        <span className="block text-[11px] font-tech uppercase font-black">Standard {activeItem.thickness.split(' ')[0]}</span>
                        <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">Classic depth. Heavy brass weight.</span>
                      </button>
                      <button
                        onClick={() => setThicknessOption('ultra')}
                        className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                          thicknessOption === 'ultra'
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400'
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id="option-thick-heavy"
                      >
                        <span className="block text-[11px] font-tech uppercase font-black">6.0mm Ultra-Heavy (+ $200)</span>
                        <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">Double multi-layered 3D stacks. 12 lbs total weight.</span>
                      </button>
                    </div>
                  </div>

                  {/* Option 2: Engraving Text */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">
                      Main Plate Custom Name Engraving
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      placeholder="e.g., CHAMPION, HEAVYWEIGHT, etc."
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-white font-tech focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 tracking-widest placeholder-zinc-700"
                      id="catalog-engraving-input"
                    />
                    <span className="block text-[9px] text-zinc-500 font-sans">
                      Max 24 uppercase letters. Leave blank if you prefer the standard layout.
                    </span>
                  </div>

                  {/* Option 3: Strap Backing */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-tech uppercase tracking-wider text-zinc-400 font-bold">
                      Strap Back Lining
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setStrapBacking('standard')}
                        className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                          strapBacking === 'standard'
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400'
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id="option-lining-std"
                      >
                        <span className="block text-[11px] font-tech uppercase font-black">Solid Velvet Padding</span>
                        <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">Standard. Black textured velvet lining.</span>
                      </button>
                      <button
                        onClick={() => setStrapBacking('suede_luxury')}
                        className={`p-2.5 rounded border text-left cursor-pointer transition-all ${
                          strapBacking === 'suede_luxury'
                            ? 'border-amber-500 bg-amber-500/5 text-amber-400'
                            : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700'
                        }`}
                        id="option-lining-suede"
                      >
                        <span className="block text-[11px] font-tech uppercase font-black">Lux Suede (+ $75)</span>
                        <span className="block text-[10px] text-zinc-500 font-sans mt-0.5">Gold hand-sewn suede leather lining. Elite comfort.</span>
                      </button>
                    </div>
                  </div>

                  {/* Option 4: Travel Protection */}
                  <div className="flex items-center justify-between p-3 bg-zinc-900/20 rounded border border-zinc-900">
                    <div>
                      <span className="block text-xs font-tech font-bold text-zinc-300">Signature Velvet Flight Box</span>
                      <span className="block text-[10px] text-zinc-500 font-sans">Heavy protection lock bag with custom velvet foam padding.</span>
                    </div>
                    <button
                      onClick={() => setIncludeCase(!includeCase)}
                      className={`px-3 py-1.5 rounded font-tech text-[10px] uppercase font-black border transition-all cursor-pointer ${
                        includeCase 
                          ? 'border-amber-500/50 text-amber-400 bg-amber-500/5' 
                          : 'border-zinc-800 text-zinc-500 hover:border-zinc-700'
                      }`}
                      id="option-flightbox-toggle"
                    >
                      {includeCase ? 'Include (+$60)' : 'Exclude'}
                    </button>
                  </div>
                </div>

                {/* Total and Submit button */}
                <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-tech text-zinc-500 uppercase tracking-widest font-bold">Estimated Cost</span>
                    <span className="text-2xl font-tech font-black text-amber-400">
                      ${activeItem.price + (thicknessOption === 'ultra' ? 200 : 0) + (strapBacking === 'suede_luxury' ? 75 : 0) + (includeCase ? 60 : 0)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddCatalogItem}
                    disabled={successToast}
                    className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:from-amber-400 hover:to-amber-600 shadow-[0_4px_15px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer disabled:opacity-50"
                    id="add-catalog-item-submit-btn"
                  >
                    {successToast ? (
                      <>
                        <Check className="w-4 h-4 animate-scale-in" />
                        Added to Quote!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Crafting Quote
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

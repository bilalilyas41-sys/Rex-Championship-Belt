import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Customizer from './components/Customizer';
import Craftsmanship from './components/Craftsmanship';
import Reviews from './components/Reviews';
import QuoteCart from './components/QuoteCart';
import Footer from './components/Footer';
import OrderRegistry from './components/OrderRegistry';
import BeltParallaxShowcase from './components/BeltParallaxShowcase';

import { INITIAL_REVIEWS } from './data';
import { QuoteItem, Review, Order } from './types';
import { Trophy, ShieldCheck, Flame, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'customizer' | 'craftsmanship' | 'reviews' | 'orders'>('home');
  const [cartItems, setCartItems] = useState<QuoteItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // LocalStorage state loading on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('rex_cart_items');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }

    const savedReviews = localStorage.getItem('rex_testimonials_list');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }

    const savedOrders = localStorage.getItem('rex_orders_list');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error('Failed to parse orders list', e);
      }
    }
  }, []);

  // Sync state to LocalStorage
  const syncCart = (items: QuoteItem[]) => {
    setCartItems(items);
    localStorage.setItem('rex_cart_items', JSON.stringify(items));
  };

  const syncReviews = (updatedReviews: Review[]) => {
    setReviews(updatedReviews);
    localStorage.setItem('rex_testimonials_list', JSON.stringify(updatedReviews));
  };

  const handleNavigate = (view: 'home' | 'catalog' | 'customizer' | 'craftsmanship' | 'reviews' | 'orders') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewOrderPlaced = (newOrder: Order) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('rex_orders_list', JSON.stringify(updated));
    setCurrentView('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToQuote = (newItem: QuoteItem) => {
    const existingIndex = cartItems.findIndex(
      item => 
        item.catalogItemId === newItem.catalogItemId && 
        JSON.stringify(item.customConfig) === JSON.stringify(newItem.customConfig)
    );

    let updatedCart: QuoteItem[];
    if (existingIndex > -1) {
      updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += newItem.quantity;
    } else {
      updatedCart = [...cartItems, newItem];
    }

    syncCart(updatedCart);
    setIsCartOpen(true); // Open drawer immediately for feedback
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, nextQty) };
      }
      return item;
    });
    syncCart(updated);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    syncCart(updated);
  };

  const handleClearCart = () => {
    syncCart([]);
  };

  const handleAddReview = (newRev: Omit<Review, 'id' | 'date' | 'avatar'>) => {
    // Generate an authentic avatar photo
    const randomPortraits = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    ];
    const pickedAvatar = randomPortraits[Math.floor(Math.random() * randomPortraits.length)];

    const finalReview: Review = {
      ...newRev,
      id: `rev-user-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      avatar: pickedAvatar
    };

    const updated = [finalReview, ...reviews];
    syncReviews(updated);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-zinc-100 selection:bg-amber-500 selection:text-black font-sans flex flex-col justify-between" id="applet-viewport">
      
      {/* Top Banner Accent */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-black text-[10px] sm:text-xs font-tech font-black uppercase py-2.5 text-center tracking-[0.2em] flex items-center justify-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 animate-bounce" />
        EST. 1998 • Free Design Consultations & Custom Vector Layouts Within 24 Hours
        <Sparkles className="w-3.5 h-3.5 animate-bounce" />
      </div>

      {/* Main Navigation Header */}
      <Header 
        onNavigate={handleNavigate}
        currentView={currentView}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Primary View Routing Frame */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Flagship Hero presentation */}
              <Hero 
                onStartCustomizing={() => handleNavigate('customizer')}
                onExploreCatalog={() => handleNavigate('catalog')}
              />

              {/* Immersive 3D Parallax Belt Vault */}
              <BeltParallaxShowcase />

              {/* Mini Features summary ticker */}
              <div className="bg-[#0c0c0e] border-y border-zinc-900 py-10 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Premium Zinc Plating</h4>
                      <p className="text-zinc-500 text-xs mt-1 font-sans">Every layout has real-gold electro-immersion plating. No raw spray paint or cheap synthetic gold dyes.</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">True Saddle Cowhide Hides</h4>
                      <p className="text-zinc-500 text-xs mt-1 font-sans">Genuine master-cut steer cowhide back-to-back layers. Unbelievable thick leather scent and grip flexibility.</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Swarovski Stone Setting</h4>
                      <p className="text-zinc-500 text-xs mt-1 font-sans">We set every single crystal gem by hand using mechanical setting prongs. Zero hot-melt synthetic gems.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show inline catalog preview & story */}
              <Catalog 
                onAddToQuote={handleAddToQuote}
                onNavigateToCustomizer={() => handleNavigate('customizer')}
              />

              {/* Craftsmanship story timeline */}
              <Craftsmanship />

              {/* Customer Testimonials section */}
              <Reviews 
                reviews={reviews}
                onAddReview={handleAddReview}
              />
            </motion.div>
          )}

          {currentView === 'catalog' && (
            <motion.div
              key="catalog-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Catalog 
                onAddToQuote={handleAddToQuote}
                onNavigateToCustomizer={() => handleNavigate('customizer')}
              />
            </motion.div>
          )}

          {currentView === 'customizer' && (
            <motion.div
              key="customizer-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Customizer onAddToQuote={handleAddToQuote} />
            </motion.div>
          )}

          {currentView === 'craftsmanship' && (
            <motion.div
              key="crafts-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Craftsmanship />
            </motion.div>
          )}

          {currentView === 'reviews' && (
            <motion.div
              key="reviews-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Reviews 
                reviews={reviews}
                onAddReview={handleAddReview}
              />
            </motion.div>
          )}

          {currentView === 'orders' && (
            <motion.div
              key="orders-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <OrderRegistry 
                orders={orders}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quote request shopping cart overlay panel */}
      <QuoteCart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNewOrderPlaced={handleNewOrderPlaced}
      />

      {/* Elegant footer with site mapping, certifications & direct links */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

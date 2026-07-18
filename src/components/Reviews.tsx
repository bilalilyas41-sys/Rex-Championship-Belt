import React, { useState } from 'react';
import { Review } from '../types';
import { CATALOG_BELTS } from '../data';
import { Star, MessageSquare, Quote, User, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date' | 'avatar'>) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewBelt, setNewReviewBelt] = useState(CATALOG_BELTS[0].name);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    onAddReview({
      name: newReviewName.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      beltType: newReviewBelt
    });

    // Reset Form
    setNewReviewName('');
    setNewReviewRating(5);
    setNewReviewComment('');
    setNewReviewBelt(CATALOG_BELTS[0].name);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <section className="bg-[#09090a] py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative" id="reviews-section">
      <div className="text-center mb-16">
        <span className="font-tech text-xs tracking-[0.3em] text-amber-500 font-bold uppercase block mb-3">Champions Guild</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Client Testimonials
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-800 mx-auto mt-4 rounded" />
        <p className="text-zinc-500 text-xs sm:text-sm max-w-xl mx-auto mt-4 font-sans leading-relaxed">
          From independent wrestling federations and corporate executives to heavyweight champions worldwide, hear what our community of warriors says about the Rex physical metal quality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Testimonials List (span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence initial={false}>
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="bg-[#0f0f11] p-6 rounded-xl border border-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
                id={`review-item-${rev.id}`}
              >
                {/* Gold glowing quote symbol */}
                <Quote className="absolute right-6 top-6 w-16 h-16 text-zinc-900/40 pointer-events-none" />

                <div className="flex items-start gap-4 relative z-10">
                  <img 
                    src={rev.avatar} 
                    alt={rev.name} 
                    className="w-12 h-12 rounded-full object-cover border border-zinc-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">{rev.name}</h4>
                      <span className="text-[10px] text-zinc-600 font-tech">{rev.date}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-800 fill-zinc-800'
                          }`} 
                        />
                      ))}
                    </div>

                    {/* Bought Belt context */}
                    <span className="inline-block px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-[9px] font-tech text-amber-500 uppercase rounded mt-3">
                      Build: {rev.beltType}
                    </span>

                    {/* Review text */}
                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed font-sans font-light">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Side: Add Review Form (span 5) */}
        <div className="lg:col-span-5 bg-[#0f0f11] p-6 rounded-2xl border border-zinc-800/80 shadow-2xl">
          <div className="mb-6">
            <h3 className="font-display text-md font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              Write A Review
            </h3>
            <p className="text-xs text-zinc-500 mt-1 font-sans">
              Are you a proud owner of a Rex Championship Belt? Submit your feedback to be featured on our hall of champions.
            </p>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* 1. Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-tech uppercase tracking-wider text-zinc-500 font-bold">Your Name / Title</label>
              <input
                type="text"
                required
                value={newReviewName}
                onChange={(e) => setNewReviewName(e.target.value)}
                placeholder="e.g., General Manager Tyson, Champ Roberts"
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-white font-tech focus:border-amber-500 focus:outline-none placeholder-zinc-800"
                id="review-name-input"
              />
            </div>

            {/* 2. Rating Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-tech uppercase tracking-wider text-zinc-500 font-bold">Rating</label>
              <div className="flex items-center gap-1.5 bg-zinc-950 p-2.5 rounded border border-zinc-800">
                {Array.from({ length: 5 }).map((_, i) => {
                  const currentStar = i + 1;
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setNewReviewRating(currentStar)}
                      className="p-1 text-zinc-600 hover:scale-110 transition-transform cursor-pointer"
                      id={`star-btn-${currentStar}`}
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          currentStar <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-zinc-800 fill-zinc-800'
                        }`} 
                      />
                    </button>
                  );
                })}
                <span className="text-[11px] font-tech text-amber-400 font-bold ml-2">
                  {newReviewRating}.0 / 5.0
                </span>
              </div>
            </div>

            {/* 3. Belt Model drop list */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-tech uppercase tracking-wider text-zinc-500 font-bold">Select Purchased Model</label>
              <select
                value={newReviewBelt}
                onChange={(e) => setNewReviewBelt(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-zinc-300 font-tech focus:border-amber-500 focus:outline-none"
                id="review-model-select"
              >
                {CATALOG_BELTS.map(belt => (
                  <option key={belt.id} value={belt.name}>{belt.name}</option>
                ))}
                <option value="Custom Bespoke Design">Custom Bespoke Design</option>
              </select>
            </div>

            {/* 4. Comments */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-tech uppercase tracking-wider text-zinc-500 font-bold">Review Description</label>
              <textarea
                required
                rows={4}
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Share your feedback regarding the weight, plating shine, leather tooling, and overall feel..."
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-800 leading-relaxed"
                id="review-comment-textarea"
              />
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              disabled={showSuccess}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white hover:text-amber-400 font-tech text-xs uppercase tracking-widest font-black rounded border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
              id="review-submit-btn"
            >
              {showSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500 animate-scale-in" />
                  Review Published!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Publish Review
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

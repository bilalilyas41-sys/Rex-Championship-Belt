import React, { useState, useEffect } from 'react';
import { QuoteItem, Order } from '../types';
import { 
  X, Trash2, Mail, Phone, User, FileText, CheckCircle2, ChevronRight, 
  Landmark, Receipt, FileSignature, Trophy, CreditCard, MapPin, 
  Sparkles, Send, Coins, Globe, ShieldAlert, ShieldCheck, Heart, 
  Check, RefreshCw, Truck, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuoteCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: QuoteItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNewOrderPlaced: (order: Order) => void;
}

export default function QuoteCart({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,
  onNewOrderPlaced
}: QuoteCartProps) {
  // Checkout modes: 'cart' | 'checkout' | 'success'
  const [flowStep, setFlowStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Checkout channel: 'direct' (Credit Card / PayPal) vs 'quote' (Artisan Inquiry)
  const [checkoutChannel, setCheckoutChannel] = useState<'direct' | 'quote'>('direct');
  
  // Payment methods: 'stripe' | 'paypal'
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');

  // Client Details Form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Shipping Address Form
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateProv, setStateProv] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');

  // Credit Card Form (Stripe simulation)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardBrand, setCardBrand] = useState('REX GOLD');

  // Sandbox simulation logging states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentLog, setPaymentLog] = useState<string[]>([]);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // PayPal Popup state
  const [showPayPalPopup, setShowPayPalPopup] = useState(false);
  const [paypalAuthorized, setPaypalAuthorized] = useState(false);
  const [paypalLog, setPaypalLog] = useState<string[]>([]);

  // Dynamically calculate Card Brand on number change
  useEffect(() => {
    const cleanNum = cardNumber.replace(/\D/g, '');
    if (cleanNum.startsWith('4')) {
      setCardBrand('VISA ELITE');
    } else if (cleanNum.startsWith('5')) {
      setCardBrand('MASTERCARD BLACK');
    } else if (cleanNum.startsWith('3')) {
      setCardBrand('AMERICAN EXPRESS');
    } else {
      setCardBrand('REX GOLD CLUB');
    }
  }, [cardNumber]);

  // Cart financial summaries
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.0825; // 8.25%
  const taxes = Math.round(subtotal * taxRate);
  const shippingCost = shippingOption === 'express' ? 45 : 0;
  const grandTotal = subtotal + taxes + shippingCost;

  // Format Card Number (adds spaces every 4 characters)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.substring(0, 16);
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(val);
    }
  };

  // Format Card Expiry (adds slash)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.substring(0, 4);
    if (val.length >= 2) {
      setCardExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
    } else {
      setCardExpiry(val);
    }
  };

  // Run Stripe Simulation Logger
  const triggerStripeSecureCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessingPayment(true);
    setPaymentLog([]);

    const logs = [
      '🔒 Initializing SSL Handshake...',
      '📡 Querying Stripe API Endpoint V3...',
      '🛠️ Tokenizing Sensitive Card Credentials...',
      `🔍 Detecting Brand: ${cardBrand} Verified`,
      '⚡ Authorizing 3D-Secure 2.0 Client Authentication...',
      '🏦 Verifying credit allocation with issuing bank...',
      '💎 Locking Gold Plate Inventory Reserve...',
      '✨ Transaction Authorized Successfully! Code: ST-78432'
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPaymentLog((prev) => [...prev, logs[i]]);
    }

    // Generate Final Order
    setTimeout(() => {
      const uniqueId = `REX-ODR-${Math.floor(100000 + Math.random() * 900000)}`;
      const finishedOrder: Order = {
        id: uniqueId,
        customerName: customerName.trim() || cardHolder || 'Rex Champion',
        customerEmail: customerEmail.trim() || 'champion@rexbelts.com',
        customerPhone: customerPhone.trim() || undefined,
        shippingAddress: {
          street: street.trim() || '100 Gold Medal Boulevard',
          city: city.trim() || 'Las Vegas',
          state: stateProv.trim() || 'NV',
          zip: zipCode.trim() || '89101',
          country: country
        },
        items: [...cartItems],
        paymentMethod: 'stripe',
        paymentDetails: {
          cardBrand: cardBrand,
          last4: cardNumber.replace(/\s/g, '').slice(-4) || '4242',
          transactionId: `ch_stripe_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        },
        financials: {
          subtotal: subtotal,
          shipping: shippingCost,
          tax: taxes,
          total: grandTotal
        },
        orderedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'processing'
      };

      setCreatedOrder(finishedOrder);
      onNewOrderPlaced(finishedOrder);
      setIsProcessingPayment(false);
      setFlowStep('success');
      onClearCart();
    }, 400);
  };

  // Run PayPal Simulation Popup
  const handleOpenPayPalPopup = () => {
    setShowPayPalPopup(true);
    setPaypalLog([]);
    setPaypalAuthorized(false);

    const logs = [
      '🌐 Redirecting to secure PayPal Gateway...',
      '🛡️ Authenticating sandbox merchant: payments@rexchampionshipbelts.com',
      '👤 Client Session Active: guest-user@sandbox.paypal.com',
      '💰 Checking wallet balance for Championship Order...'
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setPaypalLog((prev) => [...prev, log]);
        if (idx === logs.length - 1) {
          setPaypalAuthorized(true);
        }
      }, (idx + 1) * 800);
    });
  };

  const handleConfirmPayPalPayment = () => {
    setPaypalLog((prev) => [...prev, '⚡ Confirming Sandbox Funds Allocation...']);
    setTimeout(() => {
      setShowPayPalPopup(false);
      setPaypalAuthorized(false);

      // Instantly proceed with PayPal Order registration
      const uniqueId = `REX-ODR-${Math.floor(100000 + Math.random() * 900000)}`;
      const finishedOrder: Order = {
        id: uniqueId,
        customerName: customerName.trim() || 'Rex Champion Client',
        customerEmail: customerEmail.trim() || 'champion@paypal-sandbox.com',
        customerPhone: customerPhone.trim() || undefined,
        shippingAddress: {
          street: street.trim() || '100 Gold Medal Boulevard',
          city: city.trim() || 'Las Vegas',
          state: stateProv.trim() || 'NV',
          zip: zipCode.trim() || '89101',
          country: country
        },
        items: [...cartItems],
        paymentMethod: 'paypal',
        paymentDetails: {
          cardBrand: 'PayPal Standard',
          transactionId: `PAY-${Math.random().toString(36).substr(2, 12).toUpperCase()}`
        },
        financials: {
          subtotal: subtotal,
          shipping: shippingCost,
          tax: taxes,
          total: grandTotal
        },
        orderedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'processing'
      };

      setCreatedOrder(finishedOrder);
      onNewOrderPlaced(finishedOrder);
      setFlowStep('success');
      onClearCart();
    }, 1200);
  };

  // Submit Traditional Artisan Inquiry Quote Sheet
  const handleSubmitArtisanQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !customerName.trim() || !customerEmail.trim()) return;

    setIsProcessingPayment(true);

    setTimeout(() => {
      const mockQuoteOrder: Order = {
        id: `REX-QT-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim() || undefined,
        shippingAddress: {
          street: street.trim() || 'Inquiry Only',
          city: city.trim() || 'Showroom Only',
          state: stateProv.trim() || 'Inquiry',
          zip: zipCode.trim() || '00000',
          country: country
        },
        items: [...cartItems],
        paymentMethod: 'stripe', // Placeholder
        paymentDetails: {
          cardBrand: 'Bespoke Quote Requested',
          transactionId: 'QUOTE_INQUIRY'
        },
        financials: {
          subtotal: subtotal,
          shipping: 0,
          tax: 0,
          total: subtotal
        },
        orderedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'processing' // Will indicate registered in view
      };

      setCreatedOrder(mockQuoteOrder);
      onNewOrderPlaced(mockQuoteOrder);
      setIsProcessingPayment(false);
      setFlowStep('success');
      onClearCart();
    }, 1500);
  };

  const handleResetFlow = () => {
    setFlowStep('cart');
    setCreatedOrder(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setNotes('');
    setStreet('');
    setCity('');
    setStateProv('');
    setZipCode('');
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvv('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="ecommerce-checkout-overlay">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 190 }}
              className="w-screen max-w-xl bg-[#0c0c0e] border-l border-zinc-900 shadow-2xl flex flex-col h-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-[#070709]">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">
                      REX CHAMPION CHECKOUT
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-tech uppercase tracking-widest -mt-0.5">
                      Direct E-Commerce & Secure Gateway
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close checkout"
                  id="close-checkout-drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* FLOW SWITCH */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {flowStep === 'cart' && (
                  <div className="space-y-6">
                    {cartItems.length === 0 ? (
                      <div className="h-full py-24 text-center flex flex-col items-center justify-center">
                        <Trophy className="w-16 h-16 text-zinc-800 mb-6 stroke-[1.2] animate-pulse" />
                        <h4 className="font-display text-sm font-black text-zinc-500 uppercase tracking-widest">
                          Your Cart is Empty
                        </h4>
                        <p className="text-zinc-600 text-xs mt-2 max-w-sm leading-relaxed">
                          Enter our Championship Collections or launch the Custom Designer to place an item in your shopping cart.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Selected Belts List */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <span className="text-[10px] font-tech text-zinc-500 uppercase tracking-wider font-bold">Selected Gold Belts ({cartItems.length})</span>
                            <button onClick={onClearCart} className="text-[9px] font-tech text-red-500 hover:text-red-400 uppercase tracking-widest flex items-center gap-1">
                              <Trash2 className="w-3 h-3" /> Clear Cart
                            </button>
                          </div>
                          
                          {cartItems.map((item) => (
                            <div 
                              key={item.id}
                              className="bg-[#0e0e11] p-4 rounded-xl border border-zinc-900/80 flex gap-4 items-start relative group"
                              id={`cart-item-${item.id}`}
                            >
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-20 h-20 rounded-lg object-cover bg-zinc-950 border border-zinc-900 shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-grow min-w-0 pr-6">
                                <span className="text-[9px] font-tech text-amber-500 uppercase tracking-widest block mb-0.5">
                                  {item.type === 'custom' ? ' Bespoke Blueprint' : ' Replica Edition'}
                                </span>
                                <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider truncate">
                                  {item.name}
                                </h4>
                                <span className="block font-tech text-xs text-amber-500 mt-1 font-bold">
                                  ${item.price} EST
                                </span>

                                <ul className="text-[9px] text-zinc-500 font-sans mt-2 space-y-0.5 list-disc pl-4 leading-tight">
                                  {item.details.map((det, i) => (
                                    <li key={i}>{det}</li>
                                  ))}
                                </ul>

                                {/* Qty adjustments */}
                                <div className="flex items-center gap-3 mt-3">
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                    className="w-6 h-6 bg-zinc-900 hover:bg-zinc-800 rounded flex items-center justify-center text-zinc-400 hover:text-white border border-zinc-850 text-xs cursor-pointer transition-colors"
                                  >
                                    -
                                  </button>
                                  <span className="font-tech text-xs font-black text-white px-1">{item.quantity}</span>
                                  <button
                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                    className="w-6 h-6 bg-zinc-900 hover:bg-zinc-800 rounded flex items-center justify-center text-zinc-400 hover:text-white border border-zinc-850 text-xs cursor-pointer transition-colors"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="absolute top-4 right-4 p-1 text-zinc-600 hover:text-red-400 rounded transition-colors cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Order Channel Selection */}
                        <div className="bg-[#111113] p-5 rounded-xl border border-zinc-900 space-y-4">
                          <span className="block text-[10px] font-tech text-zinc-500 uppercase tracking-wider font-bold text-center">Select E-Commerce Gateway Path</span>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => setCheckoutChannel('direct')}
                              className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                                checkoutChannel === 'direct' 
                                  ? 'border-amber-500 bg-amber-500/5 text-white' 
                                  : 'border-zinc-850 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-amber-500" />
                                <span className="font-display text-[11px] font-bold uppercase tracking-wider block">Direct Checkout</span>
                              </div>
                              <span className="text-[9px] text-zinc-500 block mt-1 leading-relaxed">Secure payment with real-time credit card processing (Stripe) or PayPal.</span>
                            </button>

                            <button
                              onClick={() => setCheckoutChannel('quote')}
                              className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                                checkoutChannel === 'quote' 
                                  ? 'border-amber-500 bg-amber-500/5 text-white' 
                                  : 'border-zinc-850 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <FileSignature className="w-4 h-4 text-amber-500" />
                                <span className="font-display text-[11px] font-bold uppercase tracking-wider block">Artisan Inquiry</span>
                              </div>
                              <span className="text-[9px] text-zinc-500 block mt-1 leading-relaxed">No direct payment. Submit detailed blueprints for customized master review.</span>
                            </button>
                          </div>
                        </div>

                        {/* Cost Estimator Summary */}
                        <div className="border-t border-zinc-900 pt-4 space-y-2">
                          <div className="flex justify-between text-xs text-zinc-400">
                            <span>Subtotal Items:</span>
                            <span className="font-tech text-white font-bold">${subtotal.toLocaleString()}</span>
                          </div>
                          {checkoutChannel === 'direct' && (
                            <>
                              <div className="flex justify-between text-xs text-zinc-400">
                                <span>Sales Tax (8.25%):</span>
                                <span className="font-tech text-white">${taxes.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs text-zinc-400">
                                <span>Express Insured Shipping:</span>
                                <span className="font-tech text-emerald-400 font-medium">FREE</span>
                              </div>
                            </>
                          )}
                          <div className="flex justify-between items-center border-t border-zinc-900 pt-3">
                            <span className="font-display text-xs font-black uppercase text-zinc-400 tracking-wider">Estimated Total Value:</span>
                            <span className="font-tech text-lg font-black text-amber-500">${grandTotal.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* CTA Proceed button */}
                        <button
                          onClick={() => setFlowStep('checkout')}
                          className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:from-amber-400 hover:to-amber-600 transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(245,158,11,0.2)]"
                        >
                          Proceed to Verification
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                )}

                {flowStep === 'checkout' && (
                  <div className="space-y-6">
                    {/* Return back button */}
                    <button 
                      onClick={() => setFlowStep('cart')}
                      className="text-[10px] font-tech text-zinc-500 hover:text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      ← Return to Build list
                    </button>

                    {/* CHANNEL 1: DIRECT SECURE CHECKOUT (STRIPE/PAYPAL) */}
                    {checkoutChannel === 'direct' ? (
                      <div className="space-y-6">
                        {/* 1. Customer Info & Shipping Address Form */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                            <Truck className="w-4 h-4 text-amber-500" />
                            <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-widest font-bold">1. Secure Shipping & Contact Registry</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                              <input
                                type="text"
                                required
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                              />
                            </div>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                              <input
                                type="email"
                                required
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                              <input
                                type="tel"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="Phone Number (SMS Tracking)"
                                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                              />
                            </div>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                              <input
                                type="text"
                                required
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                placeholder="Street Address"
                                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <input
                              type="text"
                              required
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              placeholder="City"
                              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                            />
                            <input
                              type="text"
                              required
                              value={stateProv}
                              onChange={(e) => setStateProv(e.target.value)}
                              placeholder="State/Prov"
                              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                            />
                            <input
                              type="text"
                              required
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                              placeholder="Zip Code"
                              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                            />
                            <select
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="w-full px-2 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none"
                            >
                              <option>United States</option>
                              <option>United Kingdom</option>
                              <option>Canada</option>
                              <option>Australia</option>
                              <option>Germany</option>
                              <option>Japan</option>
                            </select>
                          </div>

                          {/* Shipping Methods selection */}
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <button
                              type="button"
                              onClick={() => setShippingOption('standard')}
                              className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                                shippingOption === 'standard' 
                                  ? 'border-amber-500/80 bg-amber-500/5 text-white' 
                                  : 'border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:border-zinc-800'
                              }`}
                            >
                              <div className="flex justify-between items-center text-[10px] font-tech font-black uppercase">
                                <span>Insured Express Ground</span>
                                <span className="text-emerald-400">FREE</span>
                              </div>
                              <span className="text-[9px] text-zinc-500 block font-sans mt-0.5">Fully tracked, delivery within 4-7 business days.</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setShippingOption('express')}
                              className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                                shippingOption === 'express' 
                                  ? 'border-amber-500/80 bg-amber-500/5 text-white' 
                                  : 'border-zinc-900 bg-zinc-950/40 text-zinc-500 hover:border-zinc-800'
                              }`}
                            >
                              <div className="flex justify-between items-center text-[10px] font-tech font-black uppercase">
                                <span>DHL Secure Hand-to-Hand</span>
                                <span className="text-amber-500">+$45</span>
                              </div>
                              <span className="text-[9px] text-zinc-500 block font-sans mt-0.5">Direct courier signature, bulletproof vault wrap.</span>
                            </button>
                          </div>
                        </div>

                        {/* 2. Direct Payment Options tabs */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                            <CreditCard className="w-4 h-4 text-amber-500" />
                            <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-widest font-bold">2. Payment Gateway Connection</span>
                          </div>

                          <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-900">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('stripe')}
                              className={`flex-1 py-2 rounded font-tech text-xs uppercase font-black tracking-widest cursor-pointer transition-colors ${
                                paymentMethod === 'stripe' ? 'bg-zinc-900 text-amber-400 border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              Stripe Credit Card
                            </button>
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('paypal')}
                              className={`flex-1 py-2 rounded font-tech text-xs uppercase font-black tracking-widest cursor-pointer transition-colors ${
                                paymentMethod === 'paypal' ? 'bg-zinc-900 text-amber-400 border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              PayPal Secure
                            </button>
                          </div>

                          {/* PAYMENT PATH 1: STRIPE CARD INPUTS */}
                          {paymentMethod === 'stripe' ? (
                            <div className="space-y-4">
                              {/* Shiny Virtual Credit Card Graphic */}
                              <div className="relative h-44 w-full rounded-2xl bg-gradient-to-br from-zinc-900 via-[#131317] to-zinc-950 border border-amber-500/20 p-6 flex flex-col justify-between shadow-2xl overflow-hidden group">
                                {/* Ambient grid background */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:14px_24px]" />
                                {/* Glow highlights */}
                                <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-500" />

                                <div className="flex justify-between items-start relative z-10">
                                  <div>
                                    <span className="font-display font-black tracking-wider text-white text-md block">REX FORGE</span>
                                    <span className="font-tech text-[8px] tracking-[0.2em] text-amber-500 uppercase font-black">Championship Gold Card</span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded text-[9px] font-tech text-amber-500 font-bold uppercase tracking-widest">
                                      {cardBrand}
                                    </span>
                                  </div>
                                </div>

                                {/* Gold Foil Microchip */}
                                <div className="w-10 h-8 rounded bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 relative z-10 shadow-inner">
                                  <div className="w-full h-full border border-black/10 rounded-sm bg-gradient-to-tr from-amber-400 to-amber-200" />
                                </div>

                                <div className="space-y-1 relative z-10">
                                  <span className="font-mono text-sm tracking-[0.2em] text-white block">
                                    {cardNumber || '•••• •••• •••• ••••'}
                                  </span>
                                  <div className="flex justify-between text-[10px] font-tech text-zinc-500 uppercase font-bold">
                                    <span className="truncate max-w-[70%]">{cardHolder || 'CHAMPION PLAYER'}</span>
                                    <span>EXP: {cardExpiry || 'MM/YY'}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Secure Payment details form */}
                              <form onSubmit={triggerStripeSecureCheckout} className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-tech uppercase text-zinc-500 tracking-wider block font-bold">Card Number</label>
                                  <div className="relative">
                                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                                    <input
                                      type="text"
                                      required
                                      value={cardNumber}
                                      onChange={handleCardNumberChange}
                                      placeholder="4242 4242 4242 4242 (Stripe Demo Card)"
                                      className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-mono focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] font-tech uppercase text-zinc-500 tracking-wider block font-bold">Cardholder Name</label>
                                  <div className="relative">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                                    <input
                                      type="text"
                                      required
                                      value={cardHolder}
                                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                                      placeholder="EX: BROCK LESNAR"
                                      className="w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-tech uppercase focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-tech uppercase text-zinc-500 tracking-wider block font-bold">Expiration Date</label>
                                    <input
                                      type="text"
                                      required
                                      value={cardExpiry}
                                      onChange={handleExpiryChange}
                                      placeholder="MM/YY"
                                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-mono text-center focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-tech uppercase text-zinc-500 tracking-wider block font-bold">CVC / Security Code</label>
                                    <input
                                      type="password"
                                      required
                                      maxLength={4}
                                      value={cardCvv}
                                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                                      placeholder="•••"
                                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-mono text-center focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                                    />
                                  </div>
                                </div>

                                <div className="bg-[#101012] border border-amber-500/15 p-4 rounded-xl flex items-start gap-3">
                                  <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                  <div className="text-[10px] text-zinc-500 font-sans leading-normal">
                                    <strong className="text-white block font-display uppercase tracking-wider mb-0.5">Stripe Gateway Shield Enforced</strong>
                                    All transmissions are fully encrypted under AES-256 standards. REX does not store raw numbers on database nodes.
                                  </div>
                                </div>

                                {/* Stripe console logs */}
                                {isProcessingPayment && (
                                  <div className="bg-black/80 rounded-lg p-3.5 border border-zinc-900 font-mono text-[9px] space-y-1.5 text-zinc-400">
                                    <span className="text-amber-500 block uppercase font-bold tracking-wider mb-1">Stripe Sandbox Console:</span>
                                    {paymentLog.map((log, idx) => (
                                      <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-1.5"
                                      >
                                        <span className="h-1 w-1 bg-amber-500 rounded-full" />
                                        {log}
                                      </motion.div>
                                    ))}
                                    <div className="flex items-center gap-2 mt-2 text-white font-black animate-pulse">
                                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                      PROCESSING DIRECT SECURE DISPATCH...
                                    </div>
                                  </div>
                                )}

                                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                                  <div>
                                    <span className="block text-[8px] font-tech text-zinc-500 uppercase font-black">Direct Charge Total</span>
                                    <span className="text-xl font-tech font-black text-amber-400">${grandTotal.toLocaleString()}</span>
                                  </div>
                                  <button
                                    type="submit"
                                    disabled={isProcessingPayment || !street || !customerEmail || !customerName}
                                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:from-amber-400 hover:to-amber-600 shadow-[0_4px_12px_rgba(245,158,11,0.2)] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                                  >
                                    {isProcessingPayment ? 'Authorizing...' : 'Submit Gold Order'}
                                    <ChevronRight className="w-4 h-4" />
                                  </button>
                                </div>
                              </form>
                            </div>
                          ) : (
                            /* PAYMENT PATH 2: PAYPAL */
                            <div className="space-y-4 py-4 text-center">
                              <p className="text-zinc-500 text-xs font-sans max-w-sm mx-auto leading-relaxed">
                                Complete checkout instantly using the secure Express PayPal checkout portal below. Funds are safely simulated inside AI Studio sandbox.
                              </p>

                              {/* PayPal Official Brand Style Button */}
                              <button
                                type="button"
                                onClick={handleOpenPayPalPopup}
                                className="w-full max-w-md mx-auto py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-[#003087] font-sans font-black text-sm rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 border border-amber-500/20 shadow-md hover:shadow-lg active:scale-[0.99]"
                              >
                                <span className="font-sans italic font-extrabold text-blue-900 text-base">Pay</span>
                                <span className="font-sans italic font-extrabold text-blue-500 text-base -ml-1">Pal</span>
                                <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#003087] ml-2 border-l border-[#003087]/20 pl-3">Express checkout</span>
                              </button>

                              {/* Interactive simulated Popup Modal inside */}
                              {showPayPalPopup && (
                                <div className="bg-[#101013] border border-blue-500/30 rounded-xl p-5 text-left space-y-4 animate-scale-in">
                                  <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                                    <div className="flex items-center gap-2">
                                      <span className="font-sans italic font-black text-blue-500 text-lg">PayPal</span>
                                      <span className="text-[9px] font-tech uppercase text-zinc-500 font-bold px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">Secure Sandbox Sandbox</span>
                                    </div>
                                    <span className="text-xs font-tech font-bold text-white">${grandTotal.toLocaleString()} USD</span>
                                  </div>

                                  <div className="font-mono text-[9.5px] space-y-1.5 text-zinc-400">
                                    {paypalLog.map((log, i) => (
                                      <div key={i} className="flex items-center gap-1.5 text-blue-400">
                                        <span className="h-1 w-1 bg-blue-500 rounded-full" />
                                        {log}
                                      </div>
                                    ))}
                                  </div>

                                  {paypalAuthorized ? (
                                    <div className="space-y-3 pt-3">
                                      <div className="bg-blue-500/5 border border-blue-500/20 p-3 rounded-lg text-xs text-blue-300 font-sans leading-relaxed">
                                        👤 Authenticated! Your personal balance of <strong>$12,450.00 USD</strong> is ready. Press confirm to authorize direct REX allocation.
                                      </div>
                                      <div className="flex gap-3">
                                        <button
                                          type="button"
                                          onClick={() => setShowPayPalPopup(false)}
                                          className="flex-1 py-2.5 bg-zinc-900 text-zinc-400 hover:text-white rounded font-tech text-xs uppercase font-bold border border-zinc-850 cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="button"
                                          onClick={handleConfirmPayPalPayment}
                                          className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 rounded font-tech text-xs uppercase tracking-widest font-black cursor-pointer shadow-md"
                                        >
                                          Confirm Sandbox payment
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 justify-center py-2 text-xs font-tech text-zinc-500 animate-pulse">
                                      <RefreshCw className="w-4 h-4 animate-spin" />
                                      CONTACTING PAYPAL GATEWAY...
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* CHANNEL 2: ARTISAN CUSTOM BLUEPRINT FORM */
                      <form onSubmit={handleSubmitArtisanQuote} className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-zinc-900 pb-2">
                          <FileSignature className="w-4 h-4 text-amber-500" />
                          <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-widest font-bold">Register Traditional Artisan Build Sheet</span>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                              <input
                                type="text"
                                required
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Your Name / Promotion Association"
                                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                              />
                            </div>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                              <input
                                type="email"
                                required
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                placeholder="Email Address (Blueprint Recipient)"
                                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                              />
                            </div>
                          </div>

                          <div className="relative">
                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-600" />
                            <input
                              type="tel"
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              placeholder="Phone Number (SMS updates)"
                              className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-tech uppercase text-zinc-500 tracking-wider block font-bold">Special Customization Directives</label>
                            <textarea
                              rows={4}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Notes: specify corporate logo vector files, custom side plate layouts, custom text inscriptions, specific leather tooling textures, or tight event deadlines..."
                              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-850"
                            />
                          </div>
                        </div>

                        <div className="bg-[#101012] border border-amber-500/10 p-4 rounded-xl flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-[10px] text-zinc-500 font-sans leading-normal">
                            <strong className="text-white block font-display uppercase tracking-wider mb-0.5">Bespoke Vector Drafting</strong>
                            No payment is required today. Our engineering guild will construct a scale 2D graphic showing your specifications and contact you via email to finalize materials.
                          </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                          <div>
                            <span className="block text-[8px] font-tech text-zinc-500 uppercase font-black">Inquiry Estimate Value</span>
                            <span className="text-xl font-tech font-black text-amber-400">${subtotal.toLocaleString()}</span>
                          </div>
                          <button
                            type="submit"
                            disabled={isProcessingPayment || !customerName || !customerEmail}
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-black font-tech text-xs uppercase tracking-widest font-black rounded hover:from-amber-400 hover:to-amber-600 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                          >
                            {isProcessingPayment ? 'Registering Blueprints...' : 'Register Artisan Build Sheet'}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {flowStep === 'success' && createdOrder && (
                  <div className="space-y-6" id="championship-success-receipt">
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 mb-4 animate-bounce">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <h4 className="font-display text-lg font-black text-white uppercase tracking-wider">
                        CHAMPION TITLE REGISTERED!
                      </h4>
                      <p className="text-zinc-500 text-xs mt-1 font-sans">
                        Your direct order has cleared our sandbox bank vault. Let the metal forge begin.
                      </p>
                    </div>

                    {/* Registry Certificate Card */}
                    <div className="bg-[#111114] border border-amber-500/25 rounded-2xl p-6 shadow-inner space-y-4 relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute right-4 bottom-4 text-zinc-900/10 font-display text-8xl font-black pointer-events-none select-none">REX</div>

                      <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                        <div>
                          <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black">CHAMPION REGISTRY ID</span>
                          <span className="text-xs font-tech font-black text-amber-400">{createdOrder.id}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black">FORGE START DATE</span>
                          <span className="text-[10px] text-zinc-400 font-sans">{createdOrder.orderedAt.split(' at ')[0]}</span>
                        </div>
                      </div>

                      {/* Client overview */}
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-tech text-zinc-400">
                        <div>
                          <span className="block text-zinc-600 uppercase font-black">CHAMPION CLIENT</span>
                          <span className="text-zinc-200 block mt-0.5 font-sans font-medium">{createdOrder.customerName}</span>
                        </div>
                        <div>
                          <span className="block text-zinc-600 uppercase font-black">CONTACT MAIL</span>
                          <span className="text-zinc-200 block mt-0.5 font-sans truncate">{createdOrder.customerEmail}</span>
                        </div>
                      </div>

                      {/* Items Ordered */}
                      <div className="border-t border-zinc-900 pt-4 space-y-3">
                        <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black mb-1">GOLD ALLOCATIONS IN QUEUE</span>
                        {createdOrder.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs font-sans">
                            <div className="max-w-[75%]">
                              <span className="font-bold text-zinc-300 block">{item.name}</span>
                              <span className="text-[9px] text-zinc-500 block leading-tight mt-0.5">{item.details.join(' • ')}</span>
                            </div>
                            <span className="font-tech text-amber-400 font-bold">${(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Financial breakdown receipt */}
                      <div className="border-t border-zinc-900 pt-3 space-y-1 text-xs font-sans text-zinc-500">
                        <div className="flex justify-between text-[11px]">
                          <span>Subtotal:</span>
                          <span className="font-tech text-zinc-300">${createdOrder.financials.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Sales Tax (8.25%):</span>
                          <span className="font-tech text-zinc-300">${createdOrder.financials.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Courier Shipping:</span>
                          <span className="font-tech text-emerald-400">FREE</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-zinc-900 pt-3 text-sm">
                          <span className="font-display font-black text-zinc-400 uppercase tracking-widest text-[10px]">TOTAL DISPATCHED:</span>
                          <span className="font-tech font-black text-amber-400 text-base">${createdOrder.financials.total.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-3 flex justify-between items-center text-[10px] font-tech">
                        <span className="text-zinc-600 uppercase">GATEWAY CHANNEL</span>
                        <span className="text-white uppercase font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                          {createdOrder.paymentDetails.cardBrand || 'PayPal'} Secure
                        </span>
                      </div>
                    </div>

                    {/* Timeline for physical production */}
                    <div className="space-y-4">
                      <h5 className="font-display text-xs font-bold text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-amber-500" />
                        Championship Production Pipeline
                      </h5>
                      
                      <div className="border-l border-zinc-900 pl-4 ml-2 space-y-4 text-xs font-sans">
                        <div className="relative">
                          <span className="absolute -left-[21px] top-1 flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                          <span className="block text-xs font-tech font-bold text-zinc-300 uppercase">1. Forge Queue Entrance</span>
                          <p className="text-[11px] text-zinc-500 leading-relaxed mt-0.5">
                            Our chemical engineers and master toolers are aligning the heavy brass sheets and digital vector files. Delivery is estimated within 4 to 6 weeks.
                          </p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[21px] top-1 flex h-2.5 w-2.5 rounded-full bg-zinc-800" />
                          <span className="block text-xs font-tech font-bold text-zinc-500 uppercase">2. Gold Immersion Plating</span>
                          <p className="text-[11px] text-zinc-600 leading-relaxed mt-0.5">
                            Once raw brass is acid etched, plates receive a nickel barrier layer before a heavy triple 24k gold bath.
                          </p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[21px] top-1 flex h-2.5 w-2.5 rounded-full bg-zinc-800" />
                          <span className="block text-xs font-tech font-bold text-zinc-500 uppercase">3. Leather Perimeter Tooling</span>
                          <p className="text-[11px] text-zinc-600 leading-relaxed mt-0.5">
                            Master craftsmen select thick steer cowhide, hand stamp the traditional borders, assemble custom backing suede, and mechanical crystal gem prongs.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleResetFlow}
                      className="w-full py-4 bg-zinc-900 border border-zinc-800 text-white font-tech text-xs uppercase tracking-widest font-black rounded hover:bg-zinc-800 transition-all cursor-pointer text-center"
                    >
                      Return to Showroom
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Inline fallback icon in case FileCheck2 is not present in standard Lucide
function FileCheck2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
      <path d="M14 2v4a2 2 0 0 0 2 2h3" />
      <path d="m3 15 2 2 4-4" />
    </svg>
  );
}

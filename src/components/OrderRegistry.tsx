import React, { useState } from 'react';
import { Order } from '../types';
import { 
  Trophy, Search, ShieldCheck, Truck, Sparkles, Clock, 
  MapPin, CheckCircle2, ChevronRight, HelpCircle, FileText, Calendar, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderRegistryProps {
  orders: Order[];
  onNavigate: (view: 'home' | 'catalog' | 'customizer' | 'craftsmanship' | 'reviews' | 'orders') => void;
}

export default function OrderRegistry({ orders, onNavigate }: OrderRegistryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Legendary sample history to populate if user hasn't purchased yet
  const legendaryHistoricalOrders: Order[] = [
    {
      id: 'REX-HIST-1991',
      customerName: 'Hulk Hogan',
      customerEmail: 'hogan@immortals.com',
      shippingAddress: {
        street: '120 Hollywood Boulevard',
        city: 'Tampa',
        state: 'FL',
        zip: '33601',
        country: 'United States'
      },
      items: [
        {
          id: 'hist-item-1',
          name: 'WWF Winged Eagle Retro Championship Replica',
          type: 'catalog',
          price: 1399,
          image: '/src/assets/images/rex_winged_eagle_1784341307206.jpg',
          quantity: 1,
          details: ['6.0mm Quadruple-Stacked Heavy Relief Plate', 'Original pattern vintage floral leather hand-tooling']
        }
      ],
      paymentMethod: 'stripe',
      paymentDetails: {
        cardBrand: 'HISTORIC AMEX',
        transactionId: 'TXN-HULKAMANIA-1991'
      },
      financials: {
        subtotal: 1399,
        shipping: 0,
        tax: 115.42,
        total: 1514.42
      },
      orderedAt: 'March 24, 1991',
      status: 'completed'
    },
    {
      id: 'REX-HIST-1998',
      customerName: '"Stone Cold" Steve Austin',
      customerEmail: 'austin@316.com',
      shippingAddress: {
        street: '316 Rattlesnake Road',
        city: 'Victoria',
        state: 'TX',
        zip: '77901',
        country: 'United States'
      },
      items: [
        {
          id: 'hist-item-2',
          name: 'World Heavyweight "Big Gold" Replica',
          type: 'catalog',
          price: 1850,
          image: '/src/assets/images/rex_hero_belt_1784340686134.jpg',
          quantity: 1,
          details: ['24k Multi-Layered Real Gold Electro-Immersion', 'Ruby-red and clear gem settings placed on master bezels']
        }
      ],
      paymentMethod: 'paypal',
      paymentDetails: {
        cardBrand: 'HISTORIC PAYPAL',
        transactionId: 'TXN-RATTLESNAKE-1998'
      },
      financials: {
        subtotal: 1850,
        shipping: 0,
        tax: 152.62,
        total: 2002.62
      },
      orderedAt: 'August 30, 1998',
      status: 'completed'
    }
  ];

  // Combine user's orders + legendary historical orders
  const allRegistryOrders = [...orders, ...legendaryHistoricalOrders];

  // Filter based on search query
  const filteredOrders = allRegistryOrders.filter(order => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerEmail.toLowerCase().includes(query) ||
      order.items.some(item => item.name.toLowerCase().includes(query))
    );
  });

  const getStatusStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 0;
      case 'forging': return 1;
      case 'plating': return 2;
      case 'leather_tooling': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  const statusMilestones = [
    { label: 'Blueprints Aligned', desc: 'Vector layout customized & queue locked.' },
    { label: 'Plate Etching', desc: 'CNC engraving chemical erosions active.' },
    { label: 'Gold Immersion', desc: '24k gold/platinum electroplating bath.' },
    { label: 'Leather Tooling', desc: 'Saddle cowhide cutting, border tooling & crystal placement.' },
    { label: 'Shipped & Certified', desc: 'Secured inside mahogany vault, sent via DHL express.' }
  ];

  return (
    <div className="bg-black/40 min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative z-10" id="order-registry-view">
      {/* Visual glowing top crown highlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-gradient-to-b from-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Portal Title Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 font-tech uppercase tracking-[0.2em] rounded-full font-bold">
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
            REX CHAMPIONSHIP AUTHENTICITY GATEWAY
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            THE ROYAL ORDER REGISTRY
          </h2>
          <p className="text-zinc-500 text-xs font-sans max-w-xl mx-auto leading-relaxed">
            Every custom champion title belt forged at Rex is cataloged into our permanent digital ledger. Use this portal to monitor real-time chemical plating status, verify authenticity tokens, and review historical champion shipments.
          </p>
        </div>

        {/* Searching Interface */}
        <div className="max-w-xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order Serial ID, Name, or Email Address..."
              className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-xs text-white font-sans focus:border-amber-500 focus:outline-none placeholder-zinc-700 shadow-2xl"
              id="registry-search-input"
            />
          </div>
          {searchQuery && (
            <div className="absolute right-3 top-3">
              <span className="text-[9px] font-tech text-amber-500 uppercase bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 font-bold">
                {filteredOrders.length} Records Found
              </span>
            </div>
          )}
        </div>

        {/* Dynamic 2-Column Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1: Order List */}
          <div className="lg:col-span-1 space-y-4">
            <span className="block text-[10px] font-tech text-zinc-500 uppercase tracking-widest font-black">Registry Records</span>
            
            <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
              {filteredOrders.length === 0 ? (
                <div className="bg-zinc-950/40 p-10 rounded-xl border border-zinc-900 text-center">
                  <FileText className="w-10 h-10 text-zinc-800 mx-auto mb-3" />
                  <span className="text-[11px] font-tech text-zinc-600 uppercase font-bold block">No Records Located</span>
                  <p className="text-[10px] text-zinc-500 font-sans mt-1">Refine your keyword, or forge a new championship belt inside our designer.</p>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const isActive = selectedOrder?.id === order.id;
                  const item = order.items[0];
                  return (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                        isActive 
                          ? 'bg-zinc-950 border-amber-500/40 shadow-xl' 
                          : 'bg-[#0b0b0d]/80 border-zinc-900/60 hover:border-zinc-800 hover:bg-zinc-950/50'
                      }`}
                      id={`registry-card-${order.id}`}
                    >
                      {/* Status indicator pill */}
                      <span className={`absolute top-4 right-4 px-2 py-0.5 rounded text-[8px] font-tech uppercase font-bold ${
                        order.status === 'completed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse'
                      }`}>
                        {order.status === 'completed' ? 'Shipped & Certified' : 'Forging active'}
                      </span>

                      <span className="block font-tech text-[9px] text-zinc-600 uppercase font-bold">Serial Entry ID</span>
                      <span className="font-tech text-xs font-black text-amber-500">{order.id}</span>

                      <div className="flex gap-3 mt-3 items-center">
                        <img 
                          src={item?.image} 
                          alt={item?.name} 
                          className="w-10 h-10 rounded-md object-cover bg-zinc-950 border border-zinc-900 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="block font-display text-[11px] font-bold text-white truncate uppercase tracking-wide">
                            {item?.name}
                          </span>
                          <span className="block text-[10px] text-zinc-500 font-sans truncate">
                            Client: {order.customerName}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-zinc-900/60 mt-4 pt-3 text-[9px] font-tech uppercase text-zinc-500">
                        <span>{order.orderedAt}</span>
                        <span className="font-black text-white">${order.financials.total.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Column 2: Selected Order Registry Details & Plating Stepper */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedOrder ? (
                <motion.div
                  key={selectedOrder.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#0b0b0d] border border-zinc-900 rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden"
                  id="registry-detailed-dashboard"
                >
                  {/* Atmospheric watermark badge */}
                  <div className="absolute -right-16 -top-16 w-52 h-52 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Top Row overview */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-5">
                    <div>
                      <span className="text-[10px] font-tech text-zinc-600 uppercase tracking-widest font-black block">RECORD VERIFICATION CERTIFICATE</span>
                      <h3 className="font-tech text-lg font-black text-amber-500 flex items-center gap-2">
                        {selectedOrder.id}
                        <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 bg-zinc-900 rounded-lg border border-zinc-800 text-[9px] font-tech text-zinc-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        Placed: {selectedOrder.orderedAt}
                      </span>
                    </div>
                  </div>

                  {/* Production Status Active Stepper */}
                  <div className="space-y-4">
                    <span className="block text-[10px] font-tech text-zinc-600 uppercase tracking-widest font-black">Plating & Forge Pipeline Monitoring</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                      {statusMilestones.map((step, idx) => {
                        const activeIdx = getStatusStepIndex(selectedOrder.status);
                        const isDone = idx <= activeIdx;
                        const isCurrent = idx === activeIdx;
                        
                        return (
                          <div 
                            key={idx}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-colors ${
                              isCurrent 
                                ? 'bg-amber-500/5 border-amber-500/40 text-white' 
                                : isDone 
                                  ? 'bg-zinc-900/30 border-zinc-800 text-zinc-300' 
                                  : 'bg-zinc-950/20 border-zinc-950/80 text-zinc-600'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-tech text-[10px] font-black">0{idx + 1}</span>
                              {isCurrent ? (
                                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />
                              ) : isDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              ) : null}
                            </div>
                            <div>
                              <span className="block font-display text-[10px] font-black uppercase tracking-wide leading-tight">
                                {step.label}
                              </span>
                              <span className="text-[8px] font-sans text-zinc-500 block mt-0.5 leading-snug">
                                {step.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ordered Item specs */}
                  <div className="space-y-4">
                    <span className="block text-[10px] font-tech text-zinc-600 uppercase tracking-widest font-black">Registered Material Specifications</span>
                    
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="bg-zinc-950 p-5 rounded-xl border border-zinc-900 flex flex-col sm:flex-row gap-5 items-start">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow min-w-0 space-y-1">
                            <span className="text-[9px] font-tech text-amber-500 uppercase tracking-widest block font-bold">
                              {item.type === 'custom' ? 'Custom Hand-Crafted' : 'Official Replica Series'}
                            </span>
                            <h4 className="font-display text-sm font-black text-white uppercase tracking-wider">
                              {item.name}
                            </h4>
                            <div className="flex flex-wrap gap-1.5 pt-1.5">
                              {item.details.map((detail, i) => (
                                <span key={i} className="px-2 py-0.5 bg-zinc-900 border border-zinc-850 rounded text-[9px] font-tech text-zinc-400 uppercase font-semibold">
                                  {detail}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right shrink-0 mt-2 sm:mt-0">
                            <span className="block text-[8px] font-tech text-zinc-600 uppercase font-black">Registry Value</span>
                            <span className="font-tech text-sm font-black text-amber-500">${item.price.toLocaleString()}</span>
                            <span className="block text-[9px] text-zinc-500 font-sans mt-0.5">Quantity: {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping & Financial breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Shipping info */}
                    <div className="bg-zinc-950/40 p-5 rounded-xl border border-zinc-900/60 space-y-3">
                      <span className="block text-[9px] font-tech text-zinc-600 uppercase tracking-widest font-black">CHAMPION DELIVERY DESTINATION</span>
                      <div className="space-y-2 text-xs font-sans text-zinc-400">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block font-medium">{selectedOrder.customerName}</strong>
                            <span className="text-[11px] text-zinc-500">{selectedOrder.customerEmail}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>
                            {selectedOrder.shippingAddress.street}<br />
                            {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                            {selectedOrder.shippingAddress.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-zinc-950/40 p-5 rounded-xl border border-zinc-900/60 space-y-3">
                      <span className="block text-[9px] font-tech text-zinc-600 uppercase tracking-widest font-black">OFFICIAL VAULT INVOICE</span>
                      <div className="space-y-1.5 text-xs text-zinc-500 font-sans">
                        <div className="flex justify-between">
                          <span>Subtotal Weight:</span>
                          <span className="font-tech text-zinc-300">${selectedOrder.financials.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sales Tax (8.25%):</span>
                          <span className="font-tech text-zinc-300">${selectedOrder.financials.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>DHL Insured Shipping:</span>
                          <span className="font-tech text-emerald-400">FREE</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-zinc-900/80 pt-2 text-sm">
                          <span className="font-display font-black text-zinc-400 uppercase tracking-widest text-[9px]">TOTAL PAID VAULT VALUE:</span>
                          <span className="font-tech font-black text-amber-500 text-base">${selectedOrder.financials.total.toLocaleString()}</span>
                        </div>
                        <div className="pt-2 text-[9px] font-tech text-zinc-600 uppercase text-center border-t border-zinc-900/40 mt-1">
                          Payment Via {selectedOrder.paymentMethod === 'stripe' ? `${selectedOrder.paymentDetails.cardBrand || 'Card'}` : 'PayPal Secure Gateway'}
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <div className="bg-[#0b0b0d]/50 border border-zinc-900/50 rounded-2xl p-16 text-center space-y-4">
                  <Trophy className="w-16 h-16 text-zinc-800 mx-auto stroke-[1.1] animate-pulse" />
                  <div>
                    <h3 className="font-display font-black text-white uppercase tracking-widest">Select Registry Record</h3>
                    <p className="text-zinc-500 text-xs font-sans max-w-sm mx-auto mt-2 leading-relaxed">
                      Select a champion order entry file from the left sidebar registry ledger to audit real-time 24k electroplating status and material specifications.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}

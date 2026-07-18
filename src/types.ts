export type BeltCategory = 'wrestling' | 'boxing_mma' | 'fantasy_football' | 'corporate';

export interface BeltCatalogItem {
  id: string;
  name: string;
  category: BeltCategory;
  description: string;
  price: number;
  image: string;
  plating: string;
  leather: string;
  thickness: string;
  features: string[];
}

export interface CustomBeltConfig {
  strapColor: string; // hex or CSS-friendly name
  strapLeather: 'cowhide' | 'croc' | 'textured' | 'luxury';
  platePlating: 'gold' | 'silver' | 'dualtone' | 'antique_bronze';
  plateThickness: 2 | 4 | 6; // in mm
  plateEngravingText: string;
  logoUploadUrl?: string; // custom emblem placeholder
  sidePlateLeft: 'classic_laurel' | 'eagle_wings' | 'stars_stripes' | 'blank';
  sidePlateRight: 'classic_laurel' | 'eagle_wings' | 'stars_stripes' | 'blank';
  snapStyle: 'standard_brass' | 'gold_plated' | 'velcro_pro';
  borderStyle: 'stitched' | 'hand_tooled' | 'gold_laced';
  crystalsColor: 'clear_swarovski' | 'ruby_red' | 'emerald_green' | 'none';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  beltType: string;
  date: string;
  avatar: string;
  photoUrl?: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  type: 'catalog' | 'custom';
  price: number;
  image: string;
  quantity: number;
  details: string[];
  customConfig?: CustomBeltConfig;
  catalogItemId?: string;
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  items: QuoteItem[];
  totalEstimate: number;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'approved';
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: QuoteItem[];
  paymentMethod: 'stripe' | 'paypal';
  paymentDetails: {
    cardBrand?: string;
    last4?: string;
    transactionId: string;
  };
  financials: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  orderedAt: string;
  status: 'processing' | 'forging' | 'plating' | 'leather_tooling' | 'completed';
}


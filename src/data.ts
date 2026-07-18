import { BeltCatalogItem, Review } from './types';

// We reference the generated high-quality images directly in our catalog!
export const CATALOG_BELTS: BeltCatalogItem[] = [
  {
    id: 'rex-winged-eagle-heritage',
    name: 'WWF Winged Eagle Retro Championship Replica',
    category: 'wrestling',
    description: 'The ultimate holy grail of sports entertainment. Inspired by the legendary 1989-1997 era, featuring majestic golden eagle wings, a circular blue-painted globe, and intricate multi-layered gold plates. Set on deep textured brown saddle cowhide leather.',
    price: 1399,
    image: '/src/assets/images/rex_winged_eagle_1784341307206.jpg',
    plating: '24k Triple Gold Plating & Mirror Finish',
    leather: 'Premium Hand-Tooled Veg-Tan Saddle Cowhide (4.0mm)',
    thickness: '6.0mm Quadruple-Stacked Heavy Relief Plate',
    features: [
      'High-relief golden eagle with detailed feather engraving',
      'True royal blue globe paint detailing',
      'Original pattern vintage floral leather hand-tooling',
      'Solid brass snaps and custom gold-plated metal end tips',
      'Comes with luxurious embroidered velvet carry case'
    ]
  },
  {
    id: 'rex-ufc-mma-octagon',
    name: 'Ultimate Octagon MMA World Championship Belt',
    category: 'boxing_mma',
    description: 'An absolute masterpiece of MMA glory. Features a massive heavy octagon center plate detailed with polished silver cage wire mesh background, dual high-relief combat gladiators, and sparkling hand-placed clear crystals. Built on deep-textured premium black leather.',
    price: 1499,
    image: '/src/assets/images/rex_ufc_mma_1784341327573.jpg',
    plating: 'Dual-Tone 24k Gold & Silver Mirror Overlay',
    leather: 'Ultra-Heavy Black Croc-Skin Pattern Tooled Hide',
    thickness: '5.0mm Triple-Layer Stacked Zinc plates',
    features: [
      'Stunning octagonal layout with combat ring mesh overlay',
      'High-relief silver combat gladiators & championship laurels',
      'Over 120 hand-placed Swarovski crystal diamonds',
      'Extra-thick saddle-grade dual heavy polyester stitching',
      'Micro-etched combat history text along the borders'
    ]
  },
  {
    id: 'rex-sovereign-heavy',
    name: 'World Heavyweight "Big Gold" Replica',
    category: 'wrestling',
    description: 'Our premium custom-weight rendition of the iconic "Big Gold" championship belt. Massive, thick gold plates showcasing breathtaking classical floral filigree work, deep-cut textured leather backing, and a solid premium crown crownpiece.',
    price: 1850,
    image: '/src/assets/images/rex_hero_belt_1784340686134.jpg',
    plating: '24k Multi-Layered Real Gold Electro-Immersion',
    leather: 'Premium Hand-Cut Full-Grain Steer Cowhide',
    thickness: '6.0mm Ultra-Deep CNC Precision Engraved Brass',
    features: [
      'Iconic deep-relief classical filigree background pattern',
      'Dual-tone silver-topped championship banners',
      'Ruby-red and clear gem settings placed on master bezels',
      'Authentic vintage textured leather smell & flexibility',
      'Perfect weight distribution for premium mantle display'
    ]
  },
  {
    id: 'rex-golden-eagle',
    name: 'Undisputed Golden Era Heritage Title',
    category: 'wrestling',
    description: 'A gorgeous design featuring the beloved circular classic crest, highlighting a dual-relief globe flanked by soaring golden eagles. Represents pure champion pedigree with hand-painted blue and black details.',
    price: 1199,
    image: '/src/assets/images/rex_classic_gold_1784340707668.jpg',
    plating: '24k Mirror Gold Plating with Hand-Painted Enamel',
    leather: 'Deep Chestnut Vegetable-Tanned Tooled Leather',
    thickness: '4.0mm CNC Precision Etched Brass Plates',
    features: [
      'Aggressive winged eagles protecting the central global map',
      'Hand-painted royal blue background gloss finish',
      'Genuine double-back leather layout with hidden screws',
      'Classic block snaps and heavy end-tip shield'
    ]
  },
  {
    id: 'rex-roaring-lion-dualtone',
    name: 'AEW Tribute Lion-King Championship Title',
    category: 'wrestling',
    description: 'Stunning modern design featuring a roaring lion-head centerpiece, styled with aggressive geometric border panels and contrasting silver-on-gold plates. Designed for the ultimate modern pro wrestler.',
    price: 1299,
    image: '/src/assets/images/rex_dualtone_modern_1784340730071.jpg',
    plating: 'Dual-Tone Elite Platinum Chrome & 24k Gold Overlay',
    leather: 'Matte Black Alligator-Embossed Pro Leather',
    thickness: '5.0mm Cast Zinc High Relief plates',
    features: [
      'Roaring Lion center shield with gorgeous 3D depth',
      'Contrasting silver nameplate and side laurels',
      'Removable side plates for custom club/fighter logos',
      'Finished with rich black velvet apparel fabric backing'
    ]
  },
  {
    id: 'rex-fantasy-gridiron',
    name: 'Sovereign Gridiron Fantasy Football Title',
    category: 'fantasy_football',
    description: 'Command absolute authority over your fantasy league rivals. Includes custom removable metal side panels to engrave your champions list and a heavy-duty golden helmet centerpiece.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1594470115504-20a89fc575bc?auto=format&fit=crop&q=80&w=600',
    plating: 'Mirror Gold Plating with Polished Nickel Accents',
    leather: 'Ultra-Flex Pitch-Black Stitch-Backed Leather Strap',
    thickness: '3.5mm Solid Etched Brass Plates',
    features: [
      '8 Removable Champion Side Panels (ready for annual engraving)',
      'Centered heavy helmet motif with crossed pigskin laces',
      'Free high-precision laser engraving for the current champion',
      'Rich turf-green velvet protective back lining'
    ]
  },
  {
    id: 'rex-corporate-executive',
    name: 'Corporate Executive Achievement Summit Title',
    category: 'corporate',
    description: 'The premier accolade for elite sales forces, record-breaking corporate earners, and peak organizational leaders. Clean modern plate lines with space for your corporate logo.',
    price: 649,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    plating: 'Mirror Gold Plating with Sleek Satin Silver Border',
    leather: 'Sleek Executive Royal Navy Blue Cowhide Strap',
    thickness: '3.5mm CNC Diamond Cut Brass Plates',
    features: [
      'Sleek modern geometric minimalist border framing',
      'Interchangeable company badge mounting ring',
      'Comfort-lining premium Navy blue suede backing',
      'Includes custom solid mahogany glass-top display vault'
    ]
  }
];

export const CRAFTSMANSHIP_STEPS = [
  {
    number: '01',
    title: 'Vector Design & Digital Modeling',
    description: 'Our top-tier graphic designers create a pixel-perfect vector draft of your plates, incorporating custom typography, logos, and intricate floral filigree patterns customized to your exact order specifications.'
  },
  {
    number: '02',
    title: 'Deep Zinc & Brass Etching',
    description: 'Using specialized chemical erosion and CNC engraving machines, we carve deep 3D reliefs (up to 6.0mm) into heavy industrial-grade zinc or brass metal sheets, giving the plates a premium, heavy 3D physical feel.'
  },
  {
    number: '03',
    title: 'Multi-Layer 24k Gold Plating',
    description: 'Plates undergo multiple electro-plating cycles: first nickel-backing, then pure sterling silver or chrome, and finally thick 24k real gold. Some designs are hand-masked to achieve a stunning dual-tone look.'
  },
  {
    number: '04',
    title: 'Saddle-Grade Cowhide Leather Tooling',
    description: 'A genuine leather hide is selected, hand-cut, beveled, and stamped with elaborate vintage floral or basket-weave borders. The back is lined with soft velvet or suede to protect clothing and guarantee a comfortable hold.'
  },
  {
    number: '05',
    title: 'Swarovski Setting & Final Assembly',
    description: 'Over 100 genuine Swarovski crystals are carefully set into specific plate recesses. The metal plates are secured to the leather with industrial screws and snaps, capped with custom end tips.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Damian Priestley',
    rating: 5,
    comment: 'The Rex Heavyweight Sovereign Belt is an absolute tank! The thickness is exactly 6mm as advertised, and the weight is magnificent—clocking in at nearly 11 lbs. The hand-tooling on the leather is better than belts costing three times as much from other builders. Professional grade!',
    beltType: 'Rex Heavyweight Sovereign Belt',
    date: 'June 12, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'rev-2',
    name: 'Marcus "Apex" Vance',
    rating: 5,
    comment: 'Ordered a customized MMA belt for our regional promotion. The dual-tone plating looks incredible under the arena lights. Rex worked with us to engrave our official promotion logo directly onto the center plate. Quick communication and superb premium craftsmanship.',
    beltType: 'Apex Gladiator MMA Title',
    date: 'May 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'rev-3',
    name: 'Sarah Jenkins',
    rating: 5,
    comment: 'We used the custom design tool to build a Sales Champion corporate belt for our annual summit. It has created amazing competition among our team! The mirror gold plate finish and Navy blue leather looks highly prestigious. Exceeded all our expectations!',
    beltType: 'Corporate Custom Belt',
    date: 'July 04, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const STRAP_LEATHERS = [
  { id: 'cowhide', name: 'Premium Full-Grain Cowhide', desc: 'Hand-cut, traditional thick, ultra-heavy feel, soft texture.', price: 150 },
  { id: 'croc', name: 'Aligator & Croc Embossed', desc: 'Exquisite crocodile scale patterns, highly aggressive look.', price: 220 },
  { id: 'textured', name: 'Carbon Fiber Weave Texture', desc: 'Modern sport appearance with micro-textured grid lines.', price: 180 },
  { id: 'luxury', name: 'Saddler Extra-Soft Calfskin', desc: 'Satin-smooth luxury leather with royal-level flexibility.', price: 250 }
];

export const PLATE_PLATINGS = [
  { id: 'gold', name: '24k Triple Gold Plated', desc: 'High-shine, authentic deep rich gold color.', price: 200 },
  { id: 'silver', name: 'Sterling Chrome Silver', desc: 'Brilliant mirror chrome with silver reflections.', price: 120 },
  { id: 'dualtone', name: 'Dual-Tone Elite (Gold & Silver)', desc: 'Hand-masked layers contrasting both luxury metals.', price: 300 },
  { id: 'antique_bronze', name: 'Antique Bronze & Patina', desc: 'Brushed ancient brass with deep dark recessed etching.', price: 150 }
];

export const SIDE_PLATE_OPTIONS = [
  { id: 'blank', name: 'Clean Polished Plate' },
  { id: 'classic_laurel', name: 'Laurel Victory Wreath' },
  { id: 'eagle_wings', name: 'Soaring Eagle Wings' },
  { id: 'stars_stripes', name: 'Championship Stars' }
];

export const BORDER_STYLES = [
  { id: 'stitched', name: 'Heavy Dual Polyester Stitching', desc: 'Traditional perimeter stitch, ultra durable.', price: 40 },
  { id: 'hand_tooled', name: 'Classic Floral Hand-Tooling', desc: 'Vapor etched vintage flower designs on borders.', price: 120 },
  { id: 'gold_laced', name: 'Gold-Laced Leather Aztecs', desc: 'Hand-woven real gold-leaf leather cords along borders.', price: 185 }
];

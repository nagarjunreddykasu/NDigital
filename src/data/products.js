// NDigital - Electronics Product Data (Prices in INR)
export const categories = [
  { id: 'smartphones', name: 'Smartphones', icon: 'Smartphone', description: 'Latest smartphones from top brands' },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop', description: 'Powerful laptops for work and play' },
  { id: 'tvs', name: 'TVs & Displays', icon: 'Monitor', description: 'Smart TVs and monitors' },
  { id: 'audio', name: 'Audio', icon: 'Headphones', description: 'Headphones, speakers and more' },
  { id: 'cameras', name: 'Cameras', icon: 'Camera', description: 'Digital cameras and accessories' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', description: 'Gaming consoles and accessories' },
];

export const products = [
  // Smartphones - Latest iPhones
  {
    id: 1,
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 144900,
    originalPrice: 159900,
    rating: 4.9,
    reviews: 3847,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop',
    ],
    description: 'iPhone 16 Pro Max. The most advanced iPhone ever with A18 Pro chip, 48MP camera system, and stunning 6.9" Super Retina XDR display.',
    features: ['6.9" Super Retina XDR display', '48MP Fusion camera', '256GB storage', '5G enabled', 'All-day battery life', 'Titanium design'],
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    isNewArrival: true,
    specs: {
      display: '6.9" OLED',
      processor: 'A18 Pro',
      ram: '8GB',
      storage: '256GB',
      battery: '4685mAh',
      os: 'iOS 18'
    }
  },
  {
    id: 17,
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    category: 'smartphones',
    price: 119900,
    originalPrice: 134900,
    rating: 4.8,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop',
    ],
    description: 'iPhone 16 Pro with A18 Pro chip. Experience pro-level performance with advanced camera system and beautiful titanium design.',
    features: ['6.3" Super Retina XDR display', '48MP camera system', '128GB storage', 'ProMotion 120Hz', 'Action button', 'USB-C'],
    inStock: true,
    stockCount: 67,
    isFeatured: true,
    isNewArrival: true,
    specs: {
      display: '6.3" OLED',
      processor: 'A18 Pro',
      ram: '8GB',
      storage: '128GB',
      battery: '3577mAh',
      os: 'iOS 18'
    }
  },
  {
    id: 18,
    name: 'iPhone 16',
    brand: 'Apple',
    category: 'smartphones',
    price: 79900,
    originalPrice: 89900,
    rating: 4.7,
    reviews: 1823,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400&h=400&fit=crop',
    ],
    description: 'iPhone 16 with A18 chip. Powerful performance meets stunning design with advanced dual camera system.',
    features: ['6.1" Super Retina XDR display', '48MP dual camera', '128GB storage', 'Dynamic Island', 'All-day battery', 'USB-C'],
    inStock: true,
    stockCount: 89,
    isNewArrival: true,
    specs: {
      display: '6.1" OLED',
      processor: 'A18',
      ram: '8GB',
      storage: '128GB',
      battery: '3561mAh',
      os: 'iOS 18'
    }
  },
  {
    id: 19,
    name: 'iPhone 16 Plus',
    brand: 'Apple',
    category: 'smartphones',
    price: 89900,
    originalPrice: 99900,
    rating: 4.7,
    reviews: 1456,
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=400&fit=crop',
    ],
    description: 'iPhone 16 Plus with larger 6.7" display. More screen, more battery, more power for everything you love.',
    features: ['6.7" Super Retina XDR display', '48MP dual camera', '128GB storage', 'Dynamic Island', 'Longest battery life', 'USB-C'],
    inStock: true,
    stockCount: 54,
    isNewArrival: true,
    specs: {
      display: '6.7" OLED',
      processor: 'A18',
      ram: '8GB',
      storage: '128GB',
      battery: '4006mAh',
      os: 'iOS 18'
    }
  },
  {
    id: 20,
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 134900,
    originalPrice: 159900,
    rating: 4.8,
    reviews: 4521,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&h=400&fit=crop',
    ],
    description: 'iPhone 15 Pro Max with A17 Pro chip. Premium titanium design with best-in-class camera system.',
    features: ['6.7" Super Retina XDR display', '48MP main camera', '256GB storage', '5x optical zoom', 'Action button', 'USB-C'],
    inStock: true,
    stockCount: 32,
    specs: {
      display: '6.7" OLED',
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB',
      battery: '4422mAh',
      os: 'iOS 17'
    }
  },
  {
    id: 2,
    name: 'Galaxy Z Fold 6',
    brand: 'Samsung',
    category: 'smartphones',
    price: 164999,
    originalPrice: 179999,
    rating: 4.6,
    reviews: 1523,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop'],
    description: 'Unfold your world with the Galaxy Z Fold 6. The ultimate foldable smartphone with flex mode and multi-window capabilities.',
    features: ['7.6" foldable display', 'Flex mode', '50MP camera', '512GB storage', 'S Pen compatible'],
    inStock: true,
    stockCount: 23,
    isFeatured: true,
    specs: { display: '7.6" AMOLED', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '512GB' }
  },
  {
    id: 3,
    name: 'Pixel 9 Pro',
    brand: 'Google',
    category: 'smartphones',
    price: 84999,
    rating: 4.7,
    reviews: 1892,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop'],
    description: 'The smartest Pixel yet with Google AI built in. Capture stunning photos with advanced computational photography.',
    features: ['AI-powered features', '50MP camera', 'Tensor G4 chip', '128GB storage', '7 years of updates'],
    inStock: true,
    stockCount: 67,
    specs: { display: '6.3" OLED', processor: 'Tensor G4', ram: '12GB', storage: '128GB' }
  },

  // Laptops
  {
    id: 4,
    name: 'MacBook Pro 16" M4',
    brand: 'Apple',
    category: 'laptops',
    price: 249999,
    originalPrice: 269999,
    rating: 4.9,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
    description: 'Supercharged by M4 Pro or M4 Max. The most powerful MacBook Pro ever with incredible performance for demanding workflows.',
    features: ['M4 Pro chip', '16" Liquid Retina XDR', '36GB unified memory', '512GB SSD', '22-hour battery'],
    inStock: true,
    stockCount: 34,
    isFeatured: true,
    isNewArrival: true,
    specs: { display: '16.2" Liquid Retina XDR', processor: 'Apple M4 Pro', ram: '36GB', storage: '512GB SSD' }
  },
  {
    id: 5,
    name: 'ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'laptops',
    price: 154999,
    rating: 4.7,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'],
    description: 'The legendary business laptop, reimagined. Ultra-light carbon fiber construction with enterprise-grade security.',
    features: ['Intel Core Ultra 7', '14" 2.8K OLED', '32GB RAM', '1TB SSD', 'MIL-STD-810H tested'],
    inStock: true,
    stockCount: 19,
    specs: { display: '14" 2.8K OLED', processor: 'Intel Core Ultra 7', ram: '32GB', storage: '1TB SSD' }
  },
  {
    id: 6,
    name: 'ROG Strix G18',
    brand: 'ASUS',
    category: 'laptops',
    price: 189999,
    rating: 4.8,
    reviews: 756,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop'],
    description: 'Dominate every game with the ROG Strix G18. Featuring RTX 4080 graphics and a blazing-fast 240Hz display.',
    features: ['RTX 4080 12GB', 'Intel i9-14900HX', '18" 240Hz QHD+', '32GB DDR5', 'ROG Intelligent Cooling'],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    specs: { display: '18" 240Hz QHD+', processor: 'Intel i9-14900HX', ram: '32GB DDR5', storage: '1TB SSD', gpu: 'RTX 4080' }
  },

  // TVs
  {
    id: 7,
    name: 'OLED G4 65"',
    brand: 'LG',
    category: 'tvs',
    price: 199999,
    originalPrice: 249999,
    rating: 4.9,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop'],
    description: 'Experience perfect blacks and infinite contrast with LG OLED technology. The ultimate TV for movies and gaming.',
    features: ['65" OLED evo', '4K 120Hz', 'Dolby Vision IQ', 'webOS 24', 'α11 AI Processor'],
    inStock: true,
    stockCount: 28,
    isFeatured: true,
    specs: { display: '65" OLED', resolution: '4K UHD', refreshRate: '120Hz', smartTv: 'webOS 24' }
  },
  {
    id: 8,
    name: 'Neo QLED 8K QN900D',
    brand: 'Samsung',
    category: 'tvs',
    price: 449999,
    rating: 4.7,
    reviews: 543,
    image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&h=400&fit=crop'],
    description: 'The pinnacle of TV technology. 8K resolution with AI-powered upscaling for breathtaking detail.',
    features: ['75" Neo QLED', '8K resolution', 'Neural Quantum Processor', 'Object Tracking Sound Pro', 'Infinity Screen'],
    inStock: true,
    stockCount: 8,
    specs: { display: '75" Neo QLED', resolution: '8K', refreshRate: '120Hz', hdr: 'HDR10+' }
  },

  // Audio
  {
    id: 9,
    name: 'AirPods Pro 3',
    brand: 'Apple',
    category: 'audio',
    price: 24999,
    rating: 4.8,
    reviews: 8932,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop'],
    description: 'Immersive sound with adaptive audio and personalized spatial audio. The most advanced AirPods ever.',
    features: ['Active Noise Cancellation', 'Adaptive Audio', 'Conversation Awareness', 'Personalized Spatial Audio', 'USB-C charging'],
    inStock: true,
    stockCount: 156,
    isFeatured: true,
    specs: { type: 'True Wireless', anc: 'Yes', batteryLife: '6 hours', waterResistance: 'IP54' }
  },
  {
    id: 10,
    name: 'WH-1000XM6',
    brand: 'Sony',
    category: 'audio',
    price: 34999,
    originalPrice: 39999,
    rating: 4.9,
    reviews: 4521,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop'],
    description: 'Industry-leading noise cancellation meets exceptional sound quality. Your perfect companion for music and travel.',
    features: ['Industry-leading ANC', '40-hour battery', 'Hi-Res Audio', 'Multipoint connection', 'Speak-to-chat'],
    inStock: true,
    stockCount: 89,
    isNewArrival: true,
    specs: { type: 'Over-ear', anc: 'Yes', batteryLife: '40 hours', bluetooth: '5.3' }
  },
  {
    id: 11,
    name: 'Soundbar HW-Q990D',
    brand: 'Samsung',
    category: 'audio',
    price: 149999,
    rating: 4.7,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop'],
    description: 'Cinematic 11.1.4 channel sound with wireless Dolby Atmos. Transform your living room into a theater.',
    features: ['11.1.4 channel', 'Wireless Dolby Atmos', 'Q-Symphony', 'SpaceFit Sound Pro', 'Wireless subwoofer'],
    inStock: true,
    stockCount: 23,
    specs: { channels: '11.1.4', power: '656W', dolbyAtmos: 'Yes', connectivity: 'HDMI eARC, Bluetooth' }
  },

  // Cameras
  {
    id: 12,
    name: 'Alpha 7R V',
    brand: 'Sony',
    category: 'cameras',
    price: 324999,
    rating: 4.9,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop'],
    description: 'The highest resolution full-frame camera with AI-based autofocus. Professional image quality in every shot.',
    features: ['61MP full-frame sensor', 'AI-based AF', '8K video', '8-stop IBIS', 'Dual card slots'],
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    specs: { sensor: '61MP Full-frame', iso: '100-32000', video: '8K 24p', viewfinder: '9.44M-dot EVF' }
  },
  {
    id: 13,
    name: 'EOS R5 Mark II',
    brand: 'Canon',
    category: 'cameras',
    price: 359999,
    rating: 4.8,
    reviews: 687,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop'],
    description: 'Breakthrough speed and image quality for professionals. The ultimate hybrid camera for stills and video.',
    features: ['45MP full-frame', 'Eye Control AF', '8K 60p RAW', '12fps mechanical', 'In-body IS'],
    inStock: true,
    stockCount: 11,
    isNewArrival: true,
    specs: { sensor: '45MP Full-frame', iso: '100-51200', video: '8K 60p', burst: '30fps electronic' }
  },

  // Gaming
  {
    id: 14,
    name: 'PlayStation 5 Pro',
    brand: 'Sony',
    category: 'gaming',
    price: 59999,
    rating: 4.9,
    reviews: 5678,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop'],
    description: 'The most powerful PlayStation ever. Enhanced ray tracing and 8K gaming for the ultimate experience.',
    features: ['Enhanced GPU', '2TB SSD', '8K gaming', 'Advanced ray tracing', 'PlayStation VR2 ready'],
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    specs: { storage: '2TB SSD', resolution: '8K', rayTracing: 'Yes', controller: 'DualSense' }
  },
  {
    id: 15,
    name: 'Xbox Series X',
    brand: 'Microsoft',
    category: 'gaming',
    price: 44999,
    rating: 4.7,
    reviews: 4321,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop'],
    description: 'The fastest, most powerful Xbox ever. True 4K gaming at up to 120fps with Game Pass included.',
    features: ['12 teraflops', '1TB SSD', '4K 120fps', 'Quick Resume', 'Smart Delivery'],
    inStock: true,
    stockCount: 38,
    specs: { storage: '1TB SSD', resolution: '4K', fps: '120fps', gpu: '12 TFLOPS' }
  },
  {
    id: 16,
    name: 'Switch 2',
    brand: 'Nintendo',
    category: 'gaming',
    price: 39999,
    rating: 4.8,
    reviews: 2345,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop'],
    description: 'Play anywhere, anytime. The next generation of hybrid gaming with enhanced performance and display.',
    features: ['8" OLED display', '4K docked mode', 'Enhanced Joy-Cons', 'Backward compatible', '256GB storage'],
    inStock: false,
    stockCount: 0,
    isNewArrival: true,
    specs: { display: '8" OLED', resolution: '4K docked', storage: '256GB', batteryLife: '6-9 hours' }
  },
];

export const deals = [
  { id: 1, productId: 1, discount: 8, endsAt: '2026-03-20T00:00:00Z', type: 'lightning' },
  { id: 2, productId: 7, discount: 17, endsAt: '2026-03-25T00:00:00Z', type: 'deal-of-day' },
  { id: 3, productId: 4, discount: 7, endsAt: '2026-03-22T00:00:00Z', type: 'lightning' },
  { id: 4, productId: 10, discount: 11, endsAt: '2026-03-18T00:00:00Z', type: 'lightning' },
];

export const brands = [
  { id: 'apple', name: 'Apple', logo: 'https://picsum.photos/seed/apple/100/50' },
  { id: 'samsung', name: 'Samsung', logo: 'https://picsum.photos/seed/samsung/100/50' },
  { id: 'sony', name: 'Sony', logo: 'https://picsum.photos/seed/sony/100/50' },
  { id: 'lg', name: 'LG', logo: 'https://picsum.photos/seed/lg/100/50' },
  { id: 'microsoft', name: 'Microsoft', logo: 'https://picsum.photos/seed/microsoft/100/50' },
  { id: 'google', name: 'Google', logo: 'https://picsum.photos/seed/google/100/50' },
  { id: 'asus', name: 'ASUS', logo: 'https://picsum.photos/seed/asus/100/50' },
  { id: 'lenovo', name: 'Lenovo', logo: 'https://picsum.photos/seed/lenovo/100/50' },
  { id: 'canon', name: 'Canon', logo: 'https://picsum.photos/seed/canon/100/50' },
  { id: 'nintendo', name: 'Nintendo', logo: 'https://picsum.photos/seed/nintendo/100/50' },
];

export const getProductById = (id) => products.find(p => p.id === parseInt(id));
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewArrivals = () => products.filter(p => p.isNewArrival);
export const searchProducts = (query) => {
  const lower = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lower) || 
    p.brand.toLowerCase().includes(lower) ||
    p.description.toLowerCase().includes(lower)
  );
};

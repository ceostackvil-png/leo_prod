// Centralized Mock Data & Schema for LEO Enterprise E-Commerce Admin Panel
// Covering all 18 enterprise operation dimensions

export const MEN_CATEGORIES = [
  { id: 'oversized-tees', name: 'Oversized Tees', count: 18, image: '/images/collections/col_oversized_tees.png' },
  { id: 't-shirts', name: 'T-Shirts', count: 24, image: '/images/collections/col_t_shirts.png' },
  { id: 'premium-hd-tees', name: 'Premium HD Tees', count: 12, image: '/images/collections/col_hd_tees.png' },
  { id: 'polos', name: 'Polos', count: 16, image: '/images/collections/col_polos.png' },
  { id: 'shirts', name: 'Shirts', count: 14, image: '/images/collections/col_shirts.png' },
  { id: 'hoodies', name: 'Hoodies & Jackets', count: 10, image: '/images/collections/col_travel.png' },
  { id: 'joggers', name: 'Joggers', count: 15, image: '/images/collections/col_joggers.png' },
  { id: 'cargo-pants', name: 'Cargo Pants', count: 9, image: '/images/collections/col_cargo_pants.png' },
  { id: 'shorts', name: 'Shorts', count: 11, image: '/images/collections/col_shorts.png' },
  { id: 'co-ords', name: 'Co-Ord Sets', count: 8, image: '/images/collections/col_coords.png' },
  { id: 'travel', name: 'Travel Essentials', count: 7, image: '/images/collections/col_travel.png' }
];

export const BRANDS = [
  { id: 'leo-originals', name: 'LEO Originals', description: 'Core everyday streetwear essentials' },
  { id: 'leo-atelier', name: 'LEO Atelier', description: 'Luxury heavy GSM tailored garments' },
  { id: 'leo-active', name: 'LEO Active', description: 'Breathable active & travel techwear' },
  { id: 'leo-daily', name: 'LEO Daily', description: 'Minimalist casual staples for all-day comfort' }
];

export const ORDER_STATUS_FLOW = [
  'Pending',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const INITIAL_VARIANTS = [
  {
    id: 'VAR-101',
    productId: 1,
    productName: 'leo Classic Polo T-Shirt',
    sku: 'LEO-POLO-NVY-S',
    size: 'S',
    colorName: 'Navy Blue',
    colorHex: '#1B263B',
    fabric: '100% Combed Cotton Pique (220 GSM)',
    fit: 'Classic Regular Fit',
    pattern: 'Solid',
    sleeveNeck: 'Polo Collar / Half Sleeve',
    mrp: 1499,
    price: 799,
    stock: 28,
    reservedStock: 3,
    status: 'In Stock'
  },
  {
    id: 'VAR-102',
    productId: 1,
    productName: 'leo Classic Polo T-Shirt',
    sku: 'LEO-POLO-NVY-M',
    size: 'M',
    colorName: 'Navy Blue',
    colorHex: '#1B263B',
    fabric: '100% Combed Cotton Pique (220 GSM)',
    fit: 'Classic Regular Fit',
    pattern: 'Solid',
    sleeveNeck: 'Polo Collar / Half Sleeve',
    mrp: 1499,
    price: 799,
    stock: 45,
    reservedStock: 5,
    status: 'In Stock'
  },
  {
    id: 'VAR-103',
    productId: 1,
    productName: 'leo Classic Polo T-Shirt',
    sku: 'LEO-POLO-NVY-L',
    size: 'L',
    colorName: 'Navy Blue',
    colorHex: '#1B263B',
    fabric: '100% Combed Cotton Pique (220 GSM)',
    fit: 'Classic Regular Fit',
    pattern: 'Solid',
    sleeveNeck: 'Polo Collar / Half Sleeve',
    mrp: 1499,
    price: 799,
    stock: 12,
    reservedStock: 2,
    status: 'Low Stock'
  },
  {
    id: 'VAR-104',
    productId: 1,
    productName: 'leo Classic Polo T-Shirt',
    sku: 'LEO-POLO-NVY-XL',
    size: 'XL',
    colorName: 'Navy Blue',
    colorHex: '#1B263B',
    fabric: '100% Combed Cotton Pique (220 GSM)',
    fit: 'Classic Regular Fit',
    pattern: 'Solid',
    sleeveNeck: 'Polo Collar / Half Sleeve',
    mrp: 1499,
    price: 799,
    stock: 0,
    reservedStock: 0,
    status: 'Out of Stock'
  },
  {
    id: 'VAR-105',
    productId: 2,
    productName: 'Oversized Heavyweight 240 GSM Tee',
    sku: 'LEO-OVZ-OLV-M',
    size: 'M',
    colorName: 'Sage Olive',
    colorHex: '#556B2F',
    fabric: '240 GSM French Terry Super Combed Cotton',
    fit: 'Oversized Boxy Fit',
    pattern: 'Minimal Typography',
    sleeveNeck: 'Crew Neck / Drop Shoulder',
    mrp: 1599,
    price: 899,
    stock: 64,
    reservedStock: 8,
    status: 'In Stock'
  },
  {
    id: 'VAR-106',
    productId: 2,
    productName: 'Oversized Heavyweight 240 GSM Tee',
    sku: 'LEO-OVZ-OLV-L',
    size: 'L',
    colorName: 'Sage Olive',
    colorHex: '#556B2F',
    fabric: '240 GSM French Terry Super Combed Cotton',
    fit: 'Oversized Boxy Fit',
    pattern: 'Minimal Typography',
    sleeveNeck: 'Crew Neck / Drop Shoulder',
    mrp: 1599,
    price: 899,
    stock: 52,
    reservedStock: 4,
    status: 'In Stock'
  },
  {
    id: 'VAR-107',
    productId: 3,
    productName: 'Wanderer Travel Co-Ord Set',
    sku: 'LEO-CORD-SND-M',
    size: 'M',
    colorName: 'Desert Sand',
    colorHex: '#D2B48C',
    fabric: 'Water Repellent Scuba Stretch Poly-Cotton',
    fit: 'Relaxed Ergonomic',
    pattern: 'Solid with Scuba Zippers',
    sleeveNeck: 'Zip Neck Hood / Tapered Jogger',
    mrp: 3999,
    price: 2599,
    stock: 19,
    reservedStock: 3,
    status: 'In Stock'
  },
  {
    id: 'VAR-108',
    productId: 4,
    productName: 'Heavyweight Fleece Travel Hoodie',
    sku: 'LEO-HOD-BLK-XL',
    size: 'XL',
    colorName: 'Pitch Black',
    colorHex: '#121212',
    fabric: '320 GSM Brushed Cotton Fleece',
    fit: 'Relaxed Street Fit',
    pattern: 'Solid with Built-in Gloves',
    sleeveNeck: 'Thermal Hood / Ribbed Cuff',
    mrp: 2999,
    price: 1799,
    stock: 8,
    reservedStock: 1,
    status: 'Low Stock'
  }
];

export const INITIAL_INVENTORY_ITEMS = [
  {
    id: 'INV-001',
    sku: 'LEO-POLO-NVY',
    name: 'leo Classic Polo T-Shirt (Navy)',
    category: 'polos',
    currentStock: 85,
    availableStock: 75,
    reservedStock: 10,
    lowStockThreshold: 20,
    warehouse: 'Bengaluru Fulfillment Center (BLR-1)',
    status: 'In Stock',
    lastRestocked: '2026-10-24'
  },
  {
    id: 'INV-002',
    sku: 'LEO-OVZ-OLV',
    name: 'Oversized Heavyweight 240 GSM Tee (Sage Olive)',
    category: 'oversized-tees',
    currentStock: 116,
    availableStock: 104,
    reservedStock: 12,
    lowStockThreshold: 25,
    warehouse: 'Mumbai Hub (BOM-2)',
    status: 'In Stock',
    lastRestocked: '2026-10-26'
  },
  {
    id: 'INV-003',
    sku: 'LEO-HOD-BLK',
    name: 'Heavyweight Fleece Travel Hoodie (Pitch Black)',
    category: 'hoodies',
    currentStock: 8,
    availableStock: 7,
    reservedStock: 1,
    lowStockThreshold: 15,
    warehouse: 'Bengaluru Fulfillment Center (BLR-1)',
    status: 'Low Stock',
    lastRestocked: '2026-10-10'
  },
  {
    id: 'INV-004',
    sku: 'LEO-CORD-SND',
    name: 'Wanderer Travel Co-Ord Set (Desert Sand)',
    category: 'co-ords',
    currentStock: 19,
    availableStock: 16,
    reservedStock: 3,
    lowStockThreshold: 15,
    warehouse: 'Delhi NCR Hub (DEL-1)',
    status: 'In Stock',
    lastRestocked: '2026-10-22'
  },
  {
    id: 'INV-005',
    sku: 'LEO-JOG-CARGO',
    name: 'Heavy Duty 6-Pocket Tactical Cargo Pants',
    category: 'cargo-pants',
    currentStock: 0,
    availableStock: 0,
    reservedStock: 0,
    lowStockThreshold: 15,
    warehouse: 'Mumbai Hub (BOM-2)',
    status: 'Out of Stock',
    lastRestocked: '2026-09-30'
  }
];

export const INITIAL_STOCK_MOVEMENTS = [
  { id: 'SM-501', date: '2026-10-27 16:30', sku: 'LEO-POLO-NVY', type: 'Order Fulfillment', change: -2, balance: 85, reference: 'Order #LEO-8821', admin: 'Auto System' },
  { id: 'SM-502', date: '2026-10-26 11:15', sku: 'LEO-OVZ-OLV', type: 'Batch Restock', change: +50, balance: 116, reference: 'PO-9022', admin: 'Vikram Mehta (Product Mgr)' },
  { id: 'SM-503', date: '2026-10-25 14:00', sku: 'LEO-HOD-BLK', type: 'Damage Adjustment', change: -3, balance: 8, reference: 'Inspection #QA-108', admin: 'Aditi Sharma (Inventory Sup)' },
  { id: 'SM-504', date: '2026-10-24 09:45', sku: 'LEO-CORD-SND', type: 'Customer Return Restock', change: +1, balance: 19, reference: 'Return #RET-304', admin: 'Aditi Sharma (Inventory Sup)' }
];

export const INITIAL_COLLECTIONS = [
  { id: 'col-1', name: 'New Arrivals', slug: 'new-arrivals', type: 'Automated', rule: 'Products added in last 30 days', count: 24, status: 'Active', banner: '/images/collections/col_hd_tees.png' },
  { id: 'col-2', name: 'Best Sellers', slug: 'best-sellers', type: 'Automated', rule: 'Bestseller tag is true', count: 18, status: 'Active', banner: '/images/collections/col_polos.png' },
  { id: 'col-3', name: 'Trending Styles', slug: 'trending', type: 'Curated', rule: 'Top 10 highest pageviews this week', count: 12, status: 'Active', banner: '/images/collections/col_oversized_tees.png' },
  { id: 'col-4', name: 'Festival Festive Drop', slug: 'festival-drop', type: 'Seasonal', rule: 'Heavy French Terry & Co-ords', count: 16, status: 'Active', banner: '/images/collections/col_coords.png' },
  { id: 'col-5', name: 'Winter Warmth 2026', slug: 'winter-warmth', type: 'Seasonal', rule: '320 GSM Fleece Hoodies & Sweatshirts', count: 14, status: 'Active', banner: '/images/collections/col_travel.png' },
  { id: 'col-6', name: 'Airport & Travel Essentials', slug: 'travel-essentials', type: 'Custom', rule: 'Wrinkle-resistant joggers and tees', count: 9, status: 'Active', banner: '/images/collections/col_joggers.png' }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'CUST-1001',
    name: 'Aarav Patel',
    email: 'aarav.patel@gmail.com',
    phone: '+91 98201 44521',
    city: 'Mumbai',
    tier: 'VIP',
    totalSpent: 14780,
    totalOrders: 6,
    wishlistCount: 5,
    cartCount: 2,
    reviewsSubmitted: 4,
    returnsCount: 0,
    joinedDate: '2025-11-14',
    lastOrderDate: '2026-10-27',
    notes: 'High-value customer, prefers Oversized L size.'
  },
  {
    id: 'CUST-1002',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@outlook.com',
    phone: '+91 99112 88712',
    city: 'Bengaluru',
    tier: 'Repeat',
    totalSpent: 6390,
    totalOrders: 3,
    wishlistCount: 2,
    cartCount: 1,
    reviewsSubmitted: 2,
    returnsCount: 1,
    joinedDate: '2026-03-22',
    lastOrderDate: '2026-10-25',
    notes: 'Active shopper, bought Classic Polos bundle.'
  },
  {
    id: 'CUST-1003',
    name: 'Siddharth Roy',
    email: 'siddharth.roy@yahoo.in',
    phone: '+91 98450 12093',
    city: 'Kolkata',
    tier: 'New',
    totalSpent: 1799,
    totalOrders: 1,
    wishlistCount: 1,
    cartCount: 0,
    reviewsSubmitted: 1,
    returnsCount: 0,
    joinedDate: '2026-10-21',
    lastOrderDate: '2026-10-22',
    notes: 'First time buyer via Instagram ad.'
  },
  {
    id: 'CUST-1004',
    name: 'Kabir Singhania',
    email: 'kabir.singhania@gmail.com',
    phone: '+91 98100 77654',
    city: 'New Delhi',
    tier: 'VIP',
    totalSpent: 22400,
    totalOrders: 9,
    wishlistCount: 8,
    cartCount: 3,
    reviewsSubmitted: 5,
    returnsCount: 0,
    joinedDate: '2025-08-10',
    lastOrderDate: '2026-10-26',
    notes: 'Consistently purchases newest collection drops.'
  },
  {
    id: 'CUST-1005',
    name: 'Manish Verma',
    email: 'manish.v@rediffmail.com',
    phone: '+91 97600 33211',
    city: 'Pune',
    tier: 'Repeat',
    totalSpent: 4599,
    totalOrders: 2,
    wishlistCount: 3,
    cartCount: 0,
    reviewsSubmitted: 1,
    returnsCount: 0,
    joinedDate: '2026-06-15',
    lastOrderDate: '2026-10-18',
    notes: 'Prefers Heavy French Terry Tees.'
  }
];

export const INITIAL_RETURNS = [
  {
    id: 'RET-301',
    orderId: 'LEO-8812',
    customer: 'Rohan Deshmukh',
    productName: 'Heavyweight Fleece Travel Hoodie',
    size: 'M',
    reason: 'Size too tight / Need exchange for L',
    requestedDate: '2026-10-26',
    status: 'Pickup Scheduled',
    courier: 'Delhivery Reverse Logistics',
    trackingNumber: 'DEL-REV-992144',
    inspectionStatus: 'Pending',
    refundAmount: 1799,
    refundMethod: 'Original Payment (UPI)',
    refundStatus: 'Pending Inspection'
  },
  {
    id: 'RET-302',
    orderId: 'LEO-8804',
    customer: 'Varun Nair',
    productName: 'Tactical Cargo Joggers',
    size: '32',
    reason: 'Defective seam stitching on right pocket',
    requestedDate: '2026-10-24',
    status: 'Refund Processed',
    courier: 'BlueDart Reverse',
    trackingNumber: 'BD-REV-410291',
    inspectionStatus: 'Approved - Defect Confirmed',
    refundAmount: 1499,
    refundMethod: 'Store Credit + ₹100 Apology Coupon',
    refundStatus: 'Completed (Txn #REF-8841)'
  },
  {
    id: 'RET-303',
    orderId: 'LEO-8791',
    customer: 'Kunal Joshi',
    productName: 'leo Classic Polo T-Shirt',
    size: 'XL',
    reason: 'Ordered wrong color by mistake',
    requestedDate: '2026-10-22',
    status: 'Rejected',
    courier: 'Shadowfax',
    trackingNumber: 'SF-REV-10492',
    inspectionStatus: 'Tags Removed / Fabric Washed',
    refundAmount: 799,
    refundMethod: 'N/A',
    refundStatus: 'Rejected - Return Window Expired & Tags Missing'
  }
];

export const INITIAL_SHIPPING_ZONES = [
  {
    id: 'ZONE-A',
    name: 'Zone A - Metro Hubs',
    cities: 'Mumbai, Bengaluru, Delhi NCR, Chennai, Hyderabad, Kolkata',
    deliveryTime: '24 to 48 Hours',
    standardRate: 70,
    freeShippingAbove: 999,
    codAvailable: true,
    codCharges: 0,
    activeCouriers: ['BlueDart Express', 'Delhivery Surface']
  },
  {
    id: 'ZONE-B',
    name: 'Zone B - Tier 2 & Tier 3 Cities',
    cities: 'Pune, Ahmedabad, Jaipur, Chandigarh, Lucknow, Kochi, Surat',
    deliveryTime: '2 to 4 Days',
    standardRate: 90,
    freeShippingAbove: 999,
    codAvailable: true,
    codCharges: 49,
    activeCouriers: ['Delhivery Surface', 'Shadowfax Air', 'Xpressbees']
  },
  {
    id: 'ZONE-C',
    name: 'Zone C - Special & Remote Areas',
    cities: 'North East, Jammu & Kashmir, Island Territories',
    deliveryTime: '5 to 7 Days',
    standardRate: 149,
    freeShippingAbove: 1999,
    codAvailable: false,
    codCharges: 0,
    activeCouriers: ['India Post Speed Post', 'BlueDart Apex']
  }
];

export const INITIAL_PAYMENT_TRANSACTIONS = [
  {
    id: 'TXN-9041',
    orderId: 'LEO-8821',
    customer: 'Aarav Patel',
    method: 'UPI (Google Pay)',
    gateway: 'Razorpay',
    gatewayRef: 'pay_P9a182Jks01',
    amount: 1598,
    status: 'Success',
    timestamp: '2026-10-28 10:24 AM'
  },
  {
    id: 'TXN-9040',
    orderId: 'LEO-8820',
    customer: 'Pooja Iyer',
    method: 'Credit Card (HDFC Visa)',
    gateway: 'Razorpay',
    gatewayRef: 'pay_P8x912Mnv04',
    amount: 2599,
    status: 'Success',
    timestamp: '2026-10-28 09:41 AM'
  },
  {
    id: 'TXN-9039',
    orderId: 'LEO-8819',
    customer: 'Nikhil Saxena',
    method: 'Cash On Delivery (COD)',
    gateway: 'Offline Verification',
    gatewayRef: 'COD_VERIFIED_OTP',
    amount: 899,
    status: 'Pending Collection',
    timestamp: '2026-10-28 08:15 AM'
  },
  {
    id: 'TXN-9038',
    orderId: 'LEO-8818',
    customer: 'Karan Mehra',
    method: 'Net Banking (SBI)',
    gateway: 'PayU',
    gatewayRef: 'payu_882194012',
    amount: 1799,
    status: 'Failed (Bank Server Timeout)',
    timestamp: '2026-10-27 11:50 PM'
  },
  {
    id: 'TXN-9037',
    orderId: 'LEO-8804',
    customer: 'Varun Nair',
    method: 'Refund to UPI',
    gateway: 'Razorpay Instant Refund',
    gatewayRef: 'rfnd_R7281093',
    amount: -1499,
    status: 'Refunded',
    timestamp: '2026-10-26 03:30 PM'
  }
];

export const INITIAL_TEAM_USERS = [
  {
    id: 'USR-01',
    name: 'Dhruv Singhal',
    email: 'admin@leo.com',
    role: 'Super Admin',
    permissions: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export'],
    status: 'Active',
    lastLogin: '2026-10-28 11:20 AM'
  },
  {
    id: 'USR-02',
    name: 'Vikram Mehta',
    email: 'vikram.catalog@leo.com',
    role: 'Product Manager',
    permissions: ['View', 'Create', 'Edit'],
    status: 'Active',
    lastLogin: '2026-10-28 09:15 AM'
  },
  {
    id: 'USR-03',
    name: 'Sameer Khan',
    email: 'sameer.orders@leo.com',
    role: 'Order Manager',
    permissions: ['View', 'Edit', 'Approve'],
    status: 'Active',
    lastLogin: '2026-10-28 10:45 AM'
  },
  {
    id: 'USR-04',
    name: 'Neha Kapoor',
    email: 'neha.growth@leo.com',
    role: 'Marketing Manager',
    permissions: ['View', 'Create', 'Edit', 'Export'],
    status: 'Active',
    lastLogin: '2026-10-27 06:10 PM'
  },
  {
    id: 'USR-05',
    name: 'Priyanka Sen',
    email: 'priyanka.support@leo.com',
    role: 'Support Staff',
    permissions: ['View'],
    status: 'Active',
    lastLogin: '2026-10-28 08:30 AM'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-701',
    admin: 'Dhruv Singhal (Super Admin)',
    action: 'Changed Bestseller tag color to exact Nobero #dec562',
    entity: 'Design System / ProductCard',
    prevValue: 'bg-[#282C3F] text-white',
    newValue: 'bg-[#dec562] text-[#0f142b]',
    timestamp: '2026-10-28 12:00 PM',
    ip: '192.168.1.104'
  },
  {
    id: 'LOG-702',
    admin: 'Vikram Mehta (Product Manager)',
    action: 'Updated selling price on Oversized 240 GSM Tee',
    entity: 'Product #2 (LEO-OVZ-OLV)',
    prevValue: '₹999',
    newValue: '₹899',
    timestamp: '2026-10-28 10:35 AM',
    ip: '192.168.1.112'
  },
  {
    id: 'LOG-703',
    admin: 'Sameer Khan (Order Manager)',
    action: 'Dispatched Order #LEO-8820 with BlueDart Waybill',
    entity: 'Order #LEO-8820',
    prevValue: 'Packed',
    newValue: 'Shipped (BD-882910)',
    timestamp: '2026-10-28 10:15 AM',
    ip: '192.168.1.118'
  },
  {
    id: 'LOG-704',
    admin: 'Neha Kapoor (Marketing Manager)',
    action: 'Launched Festive Coupon FLASH200 with min order ₹1499',
    entity: 'Coupon #FLASH200',
    prevValue: 'Draft',
    newValue: 'Active',
    timestamp: '2026-10-27 05:40 PM',
    ip: '192.168.1.109'
  },
  {
    id: 'LOG-705',
    admin: 'Dhruv Singhal (Super Admin)',
    action: 'Processed refund for return request RET-302',
    entity: 'Return #RET-302',
    prevValue: 'Inspected',
    newValue: 'Refund Processed (₹1,499)',
    timestamp: '2026-10-26 03:32 PM',
    ip: '192.168.1.104'
  }
];

export const INITIAL_CMS_CONTENT = {
  announcementBar: 'Flat 10% OFF on Prepaid Orders | Extra ₹150 OFF on orders above ₹999 with code LEO150',
  heroHeadline: 'STREET LUXURY MEETS DAILY COMFORT',
  heroSubheadline: 'Engineered with 240 GSM Super Combed French Terry & Tailored Fit for Men',
  aboutUsHeadline: 'About LEO — Born to Redefine Modern Indian Menswear',
  aboutUsSummary: 'LEO was founded with a singular purpose: craft premium, heavyweight menswear with architectural silhouettes and uncompromising fabrics at fair prices.',
  supportEmail: 'care@leo.com',
  supportPhone: '+91 8000 123 456',
  supportHours: 'Mon - Sat: 10:00 AM - 7:00 PM IST',
  faqList: [
    { q: 'How long does shipping take?', a: 'Metro orders are delivered within 24 to 48 hours. Non-metro deliveries take 3 to 5 business days.' },
    { q: 'What is LEO’s return and exchange policy?', a: 'We offer an effortless 7-day hassle-free return and exchange policy on all unworn items with original tags intact.' },
    { q: 'What fabric GSM does LEO use?', a: 'Our t-shirts are made from 240 GSM heavy combed cotton. Hoodies use 320 GSM brushed fleece.' }
  ],
  policies: {
    shipping: 'Standard delivery is free on all orders above ₹999 across India. Real-time tracking links are dispatched via SMS & WhatsApp.',
    returns: 'Returns are picked up from your doorstep within 48 hours of request approval. Refunds are credited within 24 hours of warehouse QC check.',
    privacy: 'We adhere to bank-grade 256-bit SSL encryption. We never sell, share or compromise your private data.'
  }
};

export const INITIAL_ADMIN_NOTIFICATIONS = [
  { id: 'NOTIF-1', type: 'order', title: 'New High Value Order', message: 'Order #LEO-8821 received for ₹1,598 from Aarav Patel', time: '10 min ago', unread: true },
  { id: 'NOTIF-2', type: 'inventory', title: 'Low Stock Alert', message: 'Heavyweight Fleece Travel Hoodie (Pitch Black) is down to 8 units', time: '35 min ago', unread: true },
  { id: 'NOTIF-3', type: 'payment', title: 'Failed Payment Detected', message: 'SBI Net Banking timed out for customer Karan Mehra (₹1,799)', time: '1 hour ago', unread: false },
  { id: 'NOTIF-4', type: 'return', title: 'New Return Request', message: 'Return requested for Order #LEO-8812 (Size exchange)', time: '3 hours ago', unread: true },
  { id: 'NOTIF-5', type: 'review', title: 'New 5-Star Review', message: 'Aarav Patel posted a 5-star review on Oversized 240 GSM Tee', time: '5 hours ago', unread: false }
];

export const CUSTOMER_NOTIFICATION_TEMPLATES = [
  { id: 'TPL-ORD-CONFIRM', trigger: 'Order Placed', channel: 'Email + WhatsApp', template: 'Hey {{customer_name}}, your LEO order #{{order_id}} is confirmed! We are tailoring your package with care.', active: true },
  { id: 'TPL-ORD-SHIPPED', trigger: 'Order Shipped', channel: 'SMS + WhatsApp', template: 'Great news! Your LEO order #{{order_id}} has been shipped via {{courier}} (Tracking: {{tracking_no}}).', active: true },
  { id: 'TPL-ORD-OFD', trigger: 'Out for Delivery', channel: 'SMS + WhatsApp', template: 'Your LEO package is out for delivery today with our courier agent. Keep OTP ready!', active: true },
  { id: 'TPL-ORD-DELIVERED', trigger: 'Delivered', channel: 'Email + WhatsApp', template: 'Delivered! We hope you love your new LEO fit. Share a photo review and get ₹100 cashback!', active: true },
  { id: 'TPL-RET-APPROVED', trigger: 'Return Approved', channel: 'SMS + Email', template: 'Your return request #{{return_id}} has been approved. Courier pickup scheduled for tomorrow.', active: true },
  { id: 'TPL-REF-PROCESSED', trigger: 'Refund Completed', channel: 'Email + SMS', template: 'Refund of ₹{{refund_amount}} has been credited to your {{payment_method}} (Ref: {{txn_ref}}).', active: true }
];

// Helper to export CSV
export const exportToCsv = (filename, headers, rows) => {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => {
      const val = cell === null || cell === undefined ? '' : String(cell);
      return `"${val.replace(/"/g, '""')}"`;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

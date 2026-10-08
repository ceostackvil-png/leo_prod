import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'data', 'db.json');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// 100% Pure Men's Apparel Seed Data for LEO
const initialData = {
  categories: [
    {
      id: "men",
      name: "MEN",
      slug: "men",
      groups: [
        {
          title: "TOPWEAR",
          items: [
            { name: "T-Shirts", slug: "t-shirts" },
            { name: "Oversized Tees", slug: "oversized-tees" },
            { name: "Premium HD T-Shirts", slug: "premium-hd-tees" },
            { name: "Polos", slug: "polos" },
            { name: "Shirts", slug: "shirts" },
            { name: "Hoodies & Jackets", slug: "hoodies" },
            { name: "Full Sleeve T-Shirts", slug: "full-sleeve-tees" }
          ]
        },
        {
          title: "BOTTOMWEAR",
          items: [
            { name: "Joggers", slug: "joggers" },
            { name: "Pants", slug: "pants" },
            { name: "Shorts", slug: "shorts" },
            { name: "Cargo Pants", slug: "cargos" }
          ]
        },
        {
          title: "COLLECTIONS",
          items: [
            { name: "Co-Ord Sets", slug: "co-ords" },
            { name: "Curated Looks", slug: "curated-looks" },
            { name: "Travel Essentials", slug: "travel" },
            { name: "Bestsellers", slug: "bestsellers" }
          ]
        }
      ],
      promo: {
        title: "Heavyweight 240 GSM Collection",
        subtitle: "Combed French Terry Cotton",
        image: "/images/nobero/col_oversized_exact.jpg",
        link: "/shop?category=oversized-tees"
      }
    },
    {
      id: "new-arrivals",
      name: "NEW ARRIVALS",
      slug: "new-arrivals",
      groups: [
        {
          title: "LATEST DROPS",
          items: [
            { name: "Heavyweight Boxy Tees", slug: "oversized-tees" },
            { name: "Air-Flex Cargo Joggers", slug: "joggers" },
            { name: "Waffle Co-Ord Sets", slug: "co-ords" },
            { name: "Pique Travel Polos", slug: "polos" }
          ]
        }
      ],
      promo: {
        title: "Latest Men Drops",
        subtitle: "Fresh Colorways Released",
        image: "/images/nobero/hero_banner_joggers_des.jpg",
        link: "/shop?filter=new"
      }
    },
    {
      id: "oversized-tees",
      name: "OVERSIZED TEES",
      slug: "oversized-tees",
      groups: [
        {
          title: "OVERSIZED FITS",
          items: [
            { name: "Solid Heavyweight (240 GSM)", slug: "oversized-tees" },
            { name: "Acid Wash & Mineral Vintage", slug: "oversized-tees" },
            { name: "Back Print Graphic Tees", slug: "oversized-tees" }
          ]
        }
      ]
    },
    { id: "polos", name: "POLOS", slug: "polos" },
    { id: "shirts", name: "SHIRTS", slug: "shirts" },
    { id: "hoodies", name: "HOODIES", slug: "hoodies" },
    { id: "joggers", name: "JOGGERS", slug: "joggers" },
    { id: "shorts", name: "SHORTS", slug: "shorts" },
    {
      id: "co-ords",
      name: "CO-ORDS",
      slug: "co-ords",
      groups: [
        {
          title: "CO-ORD STYLES",
          items: [
            { name: "Shorts Co-Ord Sets", slug: "co-ords" },
            { name: "Pants Co-Ord Sets", slug: "co-ords" },
            { name: "Waffle Knit Sets", slug: "co-ords" },
            { name: "Curated Looks", slug: "curated-looks" }
          ]
        }
      ]
    },
    {
      id: "travel",
      name: "TRAVEL",
      slug: "travel",
      groups: [
        {
          title: "TRAVEL ESSENTIALS",
          items: [
            { name: "Travel Hoodie", slug: "travel" },
            { name: "Travel Jogger", slug: "travel" },
            { name: "Travel Polo", slug: "travel" },
            { name: "Travel Chinos", slug: "travel" },
            { name: "Travel Shorts", slug: "travel" },
            { name: "Travel Cargo", slug: "travel" }
          ]
        }
      ],
      promo: {
        title: "24-Hour Transit Comfort",
        subtitle: "4-Way Stretch Flex",
        image: "/images/nobero/col_travel_exact.jpg",
        link: "/shop?category=travel"
      }
    },
    { id: "sale", name: "SALE", slug: "sale", isSale: true }
  ],

  heroBanners: [
    {
      id: "banner-1",
      title: "SUMMER TRAVEL ESSENTIALS",
      subtitle: "240 GSM HEAVYWEIGHT OVERSIZED TEES & 4-WAY JOGGERS",
      ctaText: "SHOP NOW",
      ctaLink: "/travel",
      badge: "NEW ARRIVAL",
      desktopImage: "/images/nobero/hero_banner_joggers_des.jpg",
      mobileImage: "/images/nobero/hero_banner_joggers_mob.jpg",
      active: true,
      order: 1
    },
    {
      id: "banner-2",
      title: "AIR-FLEX CO-ORD SETS",
      subtitle: "PREMIUM WAFFLE & FRENCH TERRY COMBOS",
      ctaText: "EXPLORE COLLECTION",
      ctaLink: "/co-ords",
      badge: "BESTSELLER",
      desktopImage: "/images/nobero/hero_banner_coords_des.jpg",
      mobileImage: "/images/nobero/hero_banner_coords_mob.jpg",
      active: true,
      order: 2
    },
    {
      id: "banner-3",
      title: "CHINO UTILITY & CARGOS",
      subtitle: "ENGINEERED FOR ALL DAY TRANSIT COMFORT",
      ctaText: "SHOP CHINOS",
      ctaLink: "/cargos",
      badge: "TRENDING",
      desktopImage: "/images/nobero/hero_banner_chinos_des.jpg",
      mobileImage: "/images/nobero/hero_banner_chinos_mob.jpg",
      active: true,
      order: 3
    },
    {
      id: "banner-4",
      title: "SHACKETS & HOODIES",
      subtitle: "PREMIUM LAYERED APPAREL",
      ctaText: "SHOP WINTERWEAR",
      ctaLink: "/hoodies",
      badge: "SEASONAL",
      desktopImage: "/images/nobero/hero_banner_shacket_des.jpg",
      mobileImage: "/images/nobero/hero_banner_shacket_mob.jpg",
      active: true,
      order: 4
    }
  ],

  // 10 Men's Collection Cards (100% Men's only)
  collections: [
    {
      id: "col-1",
      name: "Travel Essentials",
      image: "/images/nobero/col_travel_exact.jpg",
      link: "/travel"
    },
    {
      id: "col-2",
      name: "Joggers",
      image: "/images/nobero/col_joggers_exact.jpg",
      link: "/joggers"
    },
    {
      id: "col-3",
      name: "Cargo Pants",
      image: "/images/nobero/col_cargos_exact.jpg",
      link: "/joggers"
    },
    {
      id: "col-4",
      name: "Co-Ord Sets",
      image: "/images/nobero/col_coords_exact.jpg",
      link: "/co-ords"
    },
    {
      id: "col-5",
      name: "Oversized Tees",
      image: "/images/nobero/col_oversized_exact.jpg",
      link: "/oversized-tees"
    },
    {
      id: "col-6",
      name: "Polos",
      image: "/images/nobero/col_polo_exact.png",
      link: "/polos"
    },
    {
      id: "col-7",
      name: "Men Shirts",
      image: "/images/nobero/col_shirts_exact.jpg",
      link: "/shirts"
    },
    {
      id: "col-8",
      name: "Shorts",
      image: "/images/nobero/col_shorts_exact.png",
      link: "/shorts"
    },
    {
      id: "col-9",
      name: "Full Sleeve Tees",
      image: "/images/nobero/col_fullsleeve_exact.jpg",
      link: "/t-shirts"
    },
    {
      id: "col-10",
      name: "Hoodies & Jackets",
      image: "/images/nobero/hero_banner_shacket_des.jpg",
      link: "/hoodies"
    }
  ],

  // 4 Curated Men's Outfits for "Shop the Full Look" (100% Men Only)
  looks: [
    {
      id: "look-1",
      title: "Urban Motion Look",
      image: "/images/nobero/hero_banner_joggers_des.jpg",
      itemsIncluded: ["Call Of The Ocean Oversized Tee", "Air-Flex 6-Pocket Utility Cargo Jogger"],
      productIds: ["leo-1", "leo-41"],
      originalPrice: 3998,
      bundlePrice: 1799,
      discount: "55% OFF",
      lowestPrice: 1749
    },
    {
      id: "look-2",
      title: "Transit Ready Look",
      image: "/images/nobero/mood_travel.jpg",
      itemsIncluded: ["LEO Classic Travel Polo", "Wanderer Travel Cargo Jogger"],
      productIds: ["leo-17", "leo-43"],
      originalPrice: 5198,
      bundlePrice: 2399,
      discount: "54% OFF",
      lowestPrice: 2299
    },
    {
      id: "look-3",
      title: "Waffle Resort Set Look",
      image: "/images/nobero/col_coords_exact.jpg",
      itemsIncluded: ["Oversized Waffle Co-ord Tee", "Waffle Drawcord Tailored Shorts"],
      productIds: ["leo-25", "leo-33"],
      originalPrice: 3199,
      bundlePrice: 1499,
      discount: "53% OFF",
      lowestPrice: 1449
    },
    {
      id: "look-4",
      title: "Heavyweight Layer Look",
      image: "/images/nobero/hero_banner_shacket_des.jpg",
      itemsIncluded: ["Heavyweight French Terry Shacket", "Classic Straight Fit Jogger"],
      productIds: ["leo-37", "leo-44"],
      originalPrice: 2998,
      bundlePrice: 1399,
      discount: "53% OFF",
      lowestPrice: 1349
    }
  ],

  // 100% Men's Products (No Women's products)
  products: [
    {
      id: "leo-101",
      title: "Signature Heavyweight Oversized Tee",
      subtitle: "240 GSM Bio-Washed Combed Cotton",
      slug: "signature-heavyweight-oversized-tee",
      price: 799,
      mrp: 1599,
      discount: "50% OFF",
      lowestPrice30Days: 749,
      rating: 4.9,
      reviewCount: 1428,
      isBestseller: true,
      isFavourite: true,
      category: "oversized-tees",
      fit: "Oversized Boxy Fit",
      fabric: "100% Super Combed Cotton, 240 GSM",
      care: "Machine wash cold inside-out, tumble dry low.",
      sku: "LEO-TSH-001",
      inventory: 84,
      image: "/images/product-tee-front.jpg",
      secondaryImage: "/images/product-tee-back.jpg",
      colors: [
        {
          name: "Jet Black",
          hex: "#121212",
          image: "/images/product-tee-front.jpg",
          secondaryImage: "/images/product-tee-back.jpg"
        },
        {
          name: "Sage Olive",
          hex: "#556b2f",
          image: "/images/mood-travel.jpg",
          secondaryImage: "/images/product-tee-back.jpg"
        },
        {
          name: "Off White",
          hex: "#f5f5f0",
          image: "/images/mood-relax.jpg",
          secondaryImage: "/images/product-tee-back.jpg"
        }
      ],
      sizes: [
        { name: "S", stock: 12 },
        { name: "M", stock: 24 },
        { name: "L", stock: 30 },
        { name: "XL", stock: 14 },
        { name: "XXL", stock: 4 }
      ],
      description: "Our signature 240 GSM Heavyweight Oversized Tee delivers the ultimate structured drape. Bio-washed for an ultra-soft hand feel.",
      highlights: [
        "240 GSM Combed French Terry Cotton",
        "Dropped shoulders with reinforced neck ribbing",
        "Zero transparency & anti-wrinkle drape"
      ]
    },
    {
      id: "leo-102",
      title: "Wanderer - 6 Pocket Travel Cargo Joggers",
      subtitle: "4-Way Stretch Flex Pant with Tactical Pockets",
      slug: "wanderer-travel-cargo-joggers",
      price: 1199,
      mrp: 2399,
      discount: "50% OFF",
      lowestPrice30Days: 1149,
      rating: 4.8,
      reviewCount: 980,
      isBestseller: true,
      isFavourite: true,
      category: "joggers",
      fit: "Tapered Relaxed Cargo Fit",
      fabric: "95% Cotton, 5% Spandex Air-Flex Twill",
      care: "Machine wash cold, air dry in shade.",
      sku: "LEO-JOG-002",
      inventory: 62,
      image: "/images/product-jogger.jpg",
      secondaryImage: "/images/mood-street.jpg",
      colors: [
        {
          name: "Slate Grey",
          hex: "#4b5320",
          image: "/images/product-jogger.jpg",
          secondaryImage: "/images/mood-street.jpg"
        },
        {
          name: "Obsidian Black",
          hex: "#1b1b1b",
          image: "/images/mood-street.jpg",
          secondaryImage: "/images/product-jogger.jpg"
        }
      ],
      sizes: [
        { name: "30", stock: 10 },
        { name: "32", stock: 22 },
        { name: "34", stock: 18 },
        { name: "36", stock: 8 }
      ],
      description: "Engineered with 6 functional utility pockets, drawcord waistband, and 4-way stretch flex weave.",
      highlights: [
        "6 Tactical Functional Pockets",
        "4-Way Stretch Flex Cotton Twill",
        "Reinforced gusset for unrestricted movement"
      ]
    },
    {
      id: "leo-103",
      title: "Pique Knit Performance Travel Polo",
      subtitle: "Breathable Structured Collar with Metal Zip",
      slug: "pique-knit-performance-travel-polo",
      price: 999,
      mrp: 1999,
      discount: "50% OFF",
      lowestPrice30Days: 949,
      rating: 4.9,
      reviewCount: 752,
      isBestseller: true,
      isFavourite: true,
      category: "polos",
      fit: "Tailored Smart-Casual Fit",
      fabric: "100% Breathable Pique Cotton",
      care: "Machine wash cold, warm iron.",
      sku: "LEO-POL-003",
      inventory: 45,
      image: "/images/product-polo.jpg",
      secondaryImage: "/images/hero-2.jpg",
      colors: [
        {
          name: "Pitch Navy",
          hex: "#1A2A3A",
          image: "/images/product-polo.jpg",
          secondaryImage: "/images/hero-2.jpg"
        },
        {
          name: "Onyx Black",
          hex: "#111111",
          image: "/images/hero-2.jpg",
          secondaryImage: "/images/product-polo.jpg"
        }
      ],
      sizes: [
        { name: "S", stock: 8 },
        { name: "M", stock: 16 },
        { name: "L", stock: 20 },
        { name: "XL", stock: 12 }
      ],
      description: "Crafted from breathable pique knit cotton with an engineered anti-curl collar and sleek metal quarter-zip.",
      highlights: [
        "100% Breathable Pique Cotton",
        "Anti-curl structured collar with metal zip",
        "Wrinkle-resistant travel construction"
      ]
    },
    {
      id: "leo-104",
      title: "Waffle Texture Relaxed Co-Ord Set",
      subtitle: "Breathable Waffle Knit Tee & Shorts Combo",
      slug: "waffle-texture-relaxed-coord-set",
      price: 1499,
      mrp: 2999,
      discount: "50% OFF",
      lowestPrice30Days: 1399,
      rating: 4.9,
      reviewCount: 630,
      isBestseller: true,
      isFavourite: true,
      category: "co-ords",
      fit: "Relaxed Loungewear Fit",
      fabric: "100% Textured Waffle Cotton",
      care: "Machine wash cold, line dry.",
      sku: "LEO-CRD-004",
      inventory: 38,
      image: "/images/product-coord.jpg",
      secondaryImage: "/images/mood-relax.jpg",
      colors: [
        {
          name: "Oatmeal Beige",
          hex: "#D2C6B6",
          image: "/images/product-coord.jpg",
          secondaryImage: "/images/mood-relax.jpg"
        }
      ],
      sizes: [
        { name: "S", stock: 6 },
        { name: "M", stock: 14 },
        { name: "L", stock: 18 },
        { name: "XL", stock: 10 }
      ],
      description: "Our signature waffle knit pairing offers effortless weekend style with maximum all-day breathability.",
      highlights: [
        "Premium 3D Waffle Weave",
        "Deep side pockets on shorts",
        "Pre-shrunk soft silicone finish"
      ]
    },
    {
      id: "leo-105",
      title: "French Terry Heavyweight Loopknit Hoodie",
      subtitle: "380 GSM Ultra-Warm Fleece Lining",
      slug: "french-terry-heavyweight-hoodie",
      price: 1399,
      mrp: 2799,
      discount: "50% OFF",
      lowestPrice30Days: 1349,
      rating: 4.9,
      reviewCount: 885,
      isBestseller: true,
      isFavourite: true,
      category: "hoodies",
      fit: "Oversized Streetwear Drop Fit",
      fabric: "100% French Terry Cotton, 380 GSM",
      care: "Machine wash cold inside-out, tumble dry low.",
      sku: "LEO-HOD-005",
      inventory: 50,
      image: "/images/mood-cozy.jpg",
      secondaryImage: "/images/mood-cozy.jpg",
      colors: [
        {
          name: "Charcoal Heather",
          hex: "#333333",
          image: "/images/mood-cozy.jpg",
          secondaryImage: "/images/mood-cozy.jpg"
        }
      ],
      sizes: [
        { name: "S", stock: 10 },
        { name: "M", stock: 20 },
        { name: "L", stock: 25 },
        { name: "XL", stock: 15 },
        { name: "XXL", stock: 5 }
      ],
      description: "Built from dense 380 GSM loopknit French Terry fleece, this hoodie holds its structured shape in any weather.",
      highlights: [
        "380 GSM High-Density Fleece",
        "Double-lined structured hood",
        "Generous front kangaroo pocket"
      ]
    },
    {
      id: "leo-104",
      title: "Waffle Knit Resort Co-Ord Set",
      subtitle: "Includes Waffle Camp Shirt & Drawcord Shorts",
      slug: "waffle-knit-resort-co-ord-set",
      price: 1599,
      mrp: 3199,
      discount: "50% OFF",
      lowestPrice30Days: 1499,
      rating: 4.8,
      reviewCount: 512,
      isBestseller: true,
      isFavourite: true,
      category: "co-ords",
      fit: "Relaxed Summer Fit",
      fabric: "100% Breathable Waffle Cotton (260 GSM)",
      care: "Machine wash cold inside-out.",
      sku: "LEO-CRD-004",
      inventory: 38,
      image: "/images/nobero/col_oversized_exact.jpg",
      secondaryImage: "/images/nobero/col_oversized_exact.jpg",
      colors: [
        {
          name: "Natural Sand",
          hex: "#d8c4b6",
          image: "/images/nobero/col_oversized_exact.jpg",
          secondaryImage: "/images/nobero/col_oversized_exact.jpg"
        }
      ],
      sizes: [
        { name: "S", stock: 6 },
        { name: "M", stock: 12 },
        { name: "L", stock: 14 },
        { name: "XL", stock: 6 }
      ],
      description: "Effortless 2-piece set featuring 3D thermal honeycomb waffle knit.",
      highlights: [
        "2-Piece Complete Set (Shirt + Shorts)",
        "3D Honeycomb Waffle Weave",
        "Elastic drawcord waist"
      ]
    },
    {
      id: "leo-105",
      title: "Mount Fuji Acid Wash Vintage Oversized Tee",
      subtitle: "Mineral Wash with High-Definition Back Graphic",
      slug: "mount-fuji-acid-wash-oversized-tee",
      price: 849,
      mrp: 1699,
      discount: "50% OFF",
      lowestPrice30Days: 799,
      rating: 4.9,
      reviewCount: 640,
      isBestseller: true,
      isFavourite: false,
      category: "oversized-tees",
      fit: "Drop-Shoulder Oversized",
      fabric: "240 GSM Combed Cotton",
      care: "Wash inside out in cold water.",
      sku: "LEO-TSH-005",
      inventory: 50,
      image: "/images/nobero/col_oversized_exact.jpg",
      secondaryImage: "/images/nobero/col_oversized_exact.jpg",
      colors: [
        {
          name: "Vintage Ash Grey",
          hex: "#4a4a4a",
          image: "/images/nobero/col_oversized_exact.jpg",
          secondaryImage: "/images/nobero/col_oversized_exact.jpg"
        }
      ],
      sizes: [
        { name: "S", stock: 10 },
        { name: "M", stock: 18 },
        { name: "L", stock: 16 },
        { name: "XL", stock: 6 }
      ],
      description: "Individually hand-mineral washed for a unique aged patina.",
      highlights: [
        "Unique Acid Wash effect on every piece",
        "Screen-printed back graphic",
        "Drop-shoulder streetwear cut"
      ]
    },
    {
      id: "leo-107",
      title: "Travel-Pro Hydro-Wick Polo T-Shirt",
      subtitle: "Anti-Curl Collar with Breathable Pique Knit",
      slug: "travel-pro-hydro-wick-polo",
      price: 899,
      mrp: 1799,
      discount: "50% OFF",
      lowestPrice30Days: 849,
      rating: 4.8,
      reviewCount: 780,
      isBestseller: true,
      isFavourite: false,
      category: "polos",
      fit: "Tailored Smart Fit",
      fabric: "100% Combed Compact Cotton Pique",
      care: "Machine wash cold.",
      sku: "LEO-POL-007",
      inventory: 55,
      image: "/images/nobero/col_oversized_exact.jpg",
      secondaryImage: "/images/nobero/col_oversized_exact.jpg",
      colors: [
        {
          name: "Racing Navy",
          hex: "#0c2340",
          image: "/images/nobero/col_oversized_exact.jpg",
          secondaryImage: "/images/nobero/col_oversized_exact.jpg"
        }
      ],
      sizes: [
        { name: "M", stock: 20 },
        { name: "L", stock: 25 },
        { name: "XL", stock: 10 }
      ],
      description: "Structured collar that never curls or loses firmness.",
      highlights: [
        "Anti-curl collar technology",
        "Micro-honeycomb pique knit",
        "Engineered side vents"
      ]
    },
    {
      id: "leo-108",
      title: "2-Pack Zip Pocket Active Travel Shorts",
      subtitle: "Includes 2 Pairs of Flex Cotton Drawcord Shorts",
      slug: "2-pack-zip-pocket-travel-shorts",
      price: 1199,
      mrp: 2499,
      discount: "52% OFF",
      lowestPrice30Days: 1149,
      rating: 4.8,
      reviewCount: 420,
      isBestseller: true,
      isFavourite: true,
      category: "shorts",
      fit: "Regular Comfort Fit",
      fabric: "95% Cotton, 5% Spandex",
      care: "Machine wash cold.",
      sku: "LEO-SHT-008",
      inventory: 40,
      image: "/images/nobero/col_oversized_exact.jpg",
      secondaryImage: "/images/nobero/col_oversized_exact.jpg",
      colors: [
        {
          name: "Black & Olive Pack",
          hex: "#1b1b1b",
          image: "/images/nobero/col_oversized_exact.jpg",
          secondaryImage: "/images/nobero/col_oversized_exact.jpg"
        }
      ],
      sizes: [
        { name: "30", stock: 15 },
        { name: "32", stock: 20 },
        { name: "34", stock: 15 }
      ],
      description: "Value bundle containing two pairs of zip pocket travel shorts.",
      highlights: [
        "2-Pack Value Bundle",
        "Deep secure zip pockets",
        "Elastic drawcord waist"
      ]
    },
    {
      id: "leo-109",
      title: "Premium Classic Fit Everyday T-Shirt",
      subtitle: "100% Super Combed Compact Cotton (200 GSM)",
      slug: "premium-classic-fit-everyday-tee",
      price: 599,
      mrp: 1199,
      discount: "50% OFF",
      lowestPrice30Days: 549,
      rating: 4.8,
      reviewCount: 910,
      isBestseller: true,
      isFavourite: true,
      category: "t-shirts",
      fit: "Regular Everyday Fit",
      fabric: "100% Combed Compact Cotton",
      care: "Machine wash cold.",
      sku: "LEO-TSH-009",
      inventory: 60,
      image: "/images/nobero/col_oversized_exact.jpg",
      secondaryImage: "/images/nobero/col_oversized_exact.jpg",
      colors: [
        {
          name: "Pure White",
          hex: "#ffffff",
          image: "/images/nobero/col_oversized_exact.jpg",
          secondaryImage: "/images/nobero/col_oversized_exact.jpg"
        }
      ],
      sizes: [
        { name: "S", stock: 15 },
        { name: "M", stock: 25 },
        { name: "L", stock: 20 },
        { name: "XL", stock: 10 }
      ],
      description: "Timeless crew neck classic tee made from high grade compact cotton.",
      highlights: [
        "Pre-shrunk 200 GSM Cotton",
        "Seamless rib collar",
        "Clean tailored silhouette"
      ]
    }
  ],

  coupons: [
    {
      code: "LEO100",
      type: "flat",
      value: 100,
      minOrder: 799,
      description: "Flat ₹100 off on your order above ₹799",
      active: true,
      usageCount: 182
    },
    {
      code: "FIRST15",
      type: "percent",
      value: 15,
      minOrder: 999,
      maxDiscount: 350,
      description: "15% off up to ₹350 for new members",
      active: true,
      usageCount: 94
    },
    {
      code: "BUY2SAVE",
      type: "percent",
      value: 20,
      minOrder: 1999,
      maxDiscount: 600,
      description: "20% off on orders above ₹1,999",
      active: true,
      usageCount: 310
    }
  ],

  reviews: [
    {
      id: "rev-1",
      productId: "leo-101",
      productTitle: "Signature Heavyweight Oversized Tee",
      author: "Aditya Verma",
      rating: 5,
      title: "Best oversized tee in the Indian market hands down!",
      comment: "The 240 GSM weight is real. It holds its structured drop shoulder shape throughout the day without clinging to the body. Collar is tight and hasn't loosened after 4 washes.",
      verified: true,
      location: "Bengaluru, Karnataka",
      date: "2026-09-28",
      helpfulCount: 42,
      status: "approved"
    },
    {
      id: "rev-2",
      productId: "leo-102",
      productTitle: "Wanderer - 6 Pocket Travel Cargo Joggers",
      author: "Rohan Nair",
      rating: 5,
      title: "Took these on a 14hr flight — unmatched comfort",
      comment: "The pockets are perfectly placed and hold passport, AirPods, power bank without bulging. The 4-way stretch flex is legit.",
      verified: true,
      location: "Mumbai, Maharashtra",
      date: "2026-10-02",
      helpfulCount: 29,
      status: "approved"
    }
  ],

  blogs: [
    {
      id: "blog-1",
      title: "Men’s Shorts Trends You Need to Know in 2026",
      slug: "mens-shorts-trends-2026",
      category: "Style Guide",
      author: "LEO Editorial",
      readTime: "4 min read",
      date: "October 04, 2026",
      coverImage: "/images/nobero/col_shorts_exact.png",
      excerpt: "From tailored zip cargo shorts to relaxed waffle resort fits, discover the essential summer silhouettes.",
      content: `The modern wardrobe requires shorts that can transition seamlessly from relaxed weekend lounges to outdoor travel.`
    },
    {
      id: "blog-2",
      title: "How to Style Oversized T-Shirts: The Complete Guide",
      slug: "how-to-style-oversized-tees",
      category: "Style Guide",
      author: "LEO Style Studio",
      readTime: "5 min read",
      date: "October 02, 2026",
      coverImage: "/images/nobero/mood_street.jpg",
      excerpt: "Why 240 GSM heavyweight cotton drape defines modern streetwear proportions and how to pair boxy tops with tapered bottoms.",
      content: `The oversized revolution is about structural geometry. When fabric has the right 240 GSM weight, the shoulders drape naturally.`
    },
    {
      id: "blog-3",
      title: "What is a Polo T-Shirt? A Complete Guide to This Timeless Staple",
      slug: "polo-tshirt-complete-guide",
      category: "Fabric Guide",
      author: "LEO Textile Lab",
      readTime: "4 min read",
      date: "September 28, 2026",
      coverImage: "/images/nobero/col_polo_exact.png",
      excerpt: "Understand micro-honeycomb pique knit, anti-curl collars, and how to style polos for smart casual occasions.",
      content: `The polo t-shirt remains the gold standard for smart casual comfort.`
    }
  ],

  orders: [
    {
      id: "LEO-98421",
      customerName: "Rahul Sharma",
      customerEmail: "rahul.s@example.com",
      customerPhone: "9876543210",
      items: [
        {
          id: "leo-101",
          title: "Signature Heavyweight Oversized Tee",
          color: "Jet Black",
          size: "L",
          price: 799,
          quantity: 1,
          image: "/images/nobero/col_oversized_exact.jpg"
        },
        {
          id: "leo-102",
          title: "Wanderer - 6 Pocket Travel Cargo Joggers",
          color: "Slate Olive",
          size: "32",
          price: 1199,
          quantity: 1,
          image: "/images/nobero/col_oversized_exact.jpg"
        }
      ],
      shippingAddress: {
        fullName: "Rahul Sharma",
        addressLine: "Flat 402, Oakwood Residency, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
        phone: "9876543210"
      },
      subtotal: 1998,
      discount: 100,
      couponApplied: "LEO100",
      shippingFee: 0,
      totalAmount: 1898,
      paymentMethod: "Prepaid UPI (Razorpay)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      placedAt: "2026-10-02T10:30:00Z",
      tracking: {
        carrier: "Delhivery Express",
        trackingNumber: "DEL-849204812",
        currentStep: 5,
        history: [
          { status: "Order Placed", location: "Bengaluru Hub", time: "Oct 02, 10:30 AM", completed: true },
          { status: "Packed & Ready to Ship", location: "LEO Fulfillment Center", time: "Oct 02, 04:15 PM", completed: true },
          { status: "In Transit", location: "Delhivery Central Hub", time: "Oct 03, 08:00 AM", completed: true },
          { status: "Out for Delivery", location: "Indiranagar Delivery Center", time: "Oct 04, 09:15 AM", completed: true },
          { status: "Delivered", location: "Delivered to Rahul Sharma", time: "Oct 04, 02:45 PM", completed: true }
        ]
      }
    }
  ]
};

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return initialData;
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db.json:', err);
  }
}

const downloadedManifest = path.join(__dirname, 'data', 'downloaded_products.json');
if (fs.existsSync(downloadedManifest)) {
  try {
    const rawDownloaded = JSON.parse(fs.readFileSync(downloadedManifest, 'utf-8'));
    if (Array.isArray(rawDownloaded) && rawDownloaded.length > 0) {
      initialData.products = rawDownloaded;
    }
  } catch (e) {
    console.error('Error loading downloaded products:', e);
  }
}

// Force overwrite to strictly purge all women's products and ensure fresh authentic high-res images
writeDB(initialData);

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.categories });
});

app.get('/api/collections', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.collections || [] });
});

app.get('/api/banners', (req, res) => {
  const db = readDB();
  const activeBanners = (db.heroBanners || []).filter(b => b.active).sort((a, b) => (a.order || 0) - (b.order || 0));
  res.json({ success: true, data: activeBanners });
});

app.get('/api/looks', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.looks || [] });
});

app.get('/api/products', (req, res) => {
  const db = readDB();
  let list = [...db.products];
  const { category, sort, filter, search } = req.query;

  if (category && category !== 'all') {
    list = list.filter(p => p.category === category || p.category.includes(category));
  }
  if (filter === 'bestseller') {
    list = list.filter(p => p.isBestseller);
  }
  if (filter === 'favourite') {
    list = list.filter(p => p.isFavourite);
  }
  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(p => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  if (sort === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else {
    list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
  }

  res.json({ success: true, total: list.length, data: list });
});

app.get('/api/products/:idOrSlug', (req, res) => {
  const db = readDB();
  const param = req.params.idOrSlug;
  const product = db.products.find(p => p.id === param || p.slug === param);
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  const related = db.products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  res.json({ success: true, data: product, related });
});

app.post('/api/products', (req, res) => {
  const db = readDB();
  const newProduct = {
    id: `leo-${Date.now()}`,
    slug: (req.body.title || 'leo-product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    price: Number(req.body.price) || 799,
    mrp: Number(req.body.mrp) || 1599,
    discount: '50% OFF',
    rating: 4.8,
    reviewCount: 1,
    isBestseller: req.body.isBestseller || false,
    ...req.body
  };
  db.products.unshift(newProduct);
  writeDB(db);
  res.status(201).json({ success: true, data: newProduct });
});

app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  db.products = db.products.filter(p => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: true, message: 'Deleted' });
});

app.get('/api/coupons', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.coupons || [] });
});

app.post('/api/coupons/validate', (req, res) => {
  const { code, orderAmount } = req.body;
  const db = readDB();
  const coupon = (db.coupons || []).find(c => c.code.toUpperCase() === (code || '').toUpperCase().trim() && c.active);
  if (!coupon) return res.status(400).json({ success: false, message: 'Invalid or expired coupon code.' });
  if (orderAmount < coupon.minOrder) {
    return res.status(400).json({ success: false, message: `Requires min order of ₹${coupon.minOrder}.` });
  }
  const discountAmount = coupon.type === 'flat' ? coupon.value : Math.round((orderAmount * coupon.value) / 100);
  res.json({ success: true, code: coupon.code, discountAmount, message: `Coupon '${coupon.code}' applied!` });
});

app.get('/api/reviews', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.reviews || [] });
});

app.post('/api/reviews', (req, res) => {
  const db = readDB();
  const newRev = {
    id: `rev-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    helpfulCount: 0,
    status: 'approved',
    ...req.body
  };
  db.reviews.unshift(newRev);
  writeDB(db);
  res.status(201).json({ success: true, data: newRev });
});

app.get('/api/blogs', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.blogs || [] });
});

app.get('/api/blogs/:slug', (req, res) => {
  const db = readDB();
  const blog = (db.blogs || []).find(b => b.slug === req.params.slug);
  if (!blog) return res.status(404).json({ success: false, error: 'Article not found' });
  res.json({ success: true, data: blog });
});

app.get('/api/orders', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.orders || [] });
});

app.get('/api/orders/:id', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === req.params.id.toUpperCase().trim());
  if (!order) return res.status(404).json({ success: false, message: 'Order ID not found.' });
  res.json({ success: true, data: order });
});

app.post('/api/orders', (req, res) => {
  const db = readDB();
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  const newOrderId = `LEO-${randomDigits}`;
  const newOrder = {
    id: newOrderId,
    placedAt: new Date().toISOString(),
    orderStatus: 'Placed',
    tracking: {
      carrier: 'Delhivery Express',
      trackingNumber: `DEL-${Date.now().toString().slice(-9)}`,
      currentStep: 1,
      history: [
        { status: "Order Placed", location: "LEO Core System", time: "Just now", completed: true },
        { status: "Processing", location: "LEO Center", time: "Pending", completed: false },
        { status: "Shipped", location: "Transit Hub", time: "Pending", completed: false },
        { status: "Out for Delivery", location: "Local Station", time: "Pending", completed: false },
        { status: "Delivered", location: "Destination", time: "Pending", completed: false }
      ]
    },
    ...req.body
  };
  db.orders.unshift(newOrder);
  writeDB(db);
  res.status(201).json({ success: true, data: newOrder });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
  order.orderStatus = req.body.status;
  writeDB(db);
  res.json({ success: true, data: order });
});

app.get('/api/analytics', (req, res) => {
  const db = readDB();
  const totalRevenue = db.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 384000;
  const totalOrders = db.orders.length + 420;
  res.json({
    success: true,
    data: {
      totalRevenue,
      totalOrders,
      averageOrderValue: Math.round(totalRevenue / totalOrders),
      conversionRate: "4.12%",
      activeUsersLive: 58,
      salesTrends: [
        { day: 'Mon', revenue: 42000 },
        { day: 'Tue', revenue: 51000 },
        { day: 'Wed', revenue: 58000 },
        { day: 'Thu', revenue: 49000 },
        { day: 'Fri', revenue: 72000 },
        { day: 'Sat', revenue: 89000 },
        { day: 'Sun', revenue: 95000 }
      ]
    }
  });
});

app.post('/api/pincode/check', (req, res) => {
  const { pincode } = req.body;
  if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid 6-digit pincode.' });
  }
  const estDate = new Date();
  estDate.setDate(estDate.getDate() + 3);
  const formattedDelivery = estDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  res.json({
    success: true,
    pincode,
    estimatedDate: formattedDelivery,
    message: `Delivery available by ${formattedDelivery}. Cash on Delivery & Free Shipping available.`
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`LEO Backend Server running on http://localhost:${PORT}`);
});

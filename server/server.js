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
        image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
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
        image: "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg",
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
            { name: "Solid Heavyweight (240 GSM)", slug: "oversized-tees", image: "/images/MEN/port_1.avif" },
            { name: "Acid Wash & Mineral Vintage", slug: "oversized-tees", image: "/images/MEN/Website_Shop_men_220_x_304_11.avif" },
            { name: "Back Print Graphic Tees", slug: "oversized-tees", image: "/images/leo_product_oversized_tee_back_1791469191387.jpg" },
            { name: "Classic Crew Neck", slug: "t-shirts", image: "/images/leo_product_oversized_tee_1791469164099.jpg" },
            { name: "Full Sleeve Tees", slug: "t-shirts", image: "/images/MEN/Full_sleeve_polo.avif" },
            { name: "Oversized Drop Shoulder", slug: "oversized-tees", image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013" }
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
            { name: "Shorts Co-Ord Sets", slug: "co-ords", image: "/images/MEN/9.avif" },
            { name: "Pants Co-Ord Sets", slug: "co-ords", image: "/images/product-coord-pants.jpg" },
            { name: "Waffle Knit Sets", slug: "co-ords", image: "/images/leo_product_waffle_coord_1791469273954.jpg" },
            { name: "Curated Looks", slug: "curated-looks", image: "/images/col_curated_look.jpg" },
            { name: "Terry Resort Sets", slug: "co-ords", image: "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg" },
            { name: "Travel Airport Sets", slug: "co-ords", image: "/images/mood-relax.jpg" }
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
            { name: "Travel Hoodie", slug: "travel", image: "/images/MEN/Website_Shop_men_220_x_304_9.avif" },
            { name: "Travel Jogger", slug: "travel", image: "/images/MEN/6_29719fa5-f748-482e-8039-fda30c64d1db.webp" },
            { name: "Travel Polo", slug: "travel", image: "/images/MEN/7p_69c2c6cf-78a7-441f-b34a-ab147745806d.avif" },
            { name: "Travel Chinos", slug: "travel", image: "/images/MEN/Cargo_Pants_Icon_Home_Page_copy.avif" },
            { name: "Travel Shorts", slug: "travel", image: "/images/MEN/8.webp" },
            { name: "Travel Cargo", slug: "travel", image: "/images/leo_product_cargo_jogger_1791469213908.jpg" }
          ]
        }
      ],
      promo: {
        title: "24-Hour Transit Comfort",
        subtitle: "4-Way Stretch Flex",
        image: "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg",
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
      desktopImage: "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg",
      mobileImage: "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_mob.jpg",
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
      desktopImage: "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg",
      mobileImage: "https://nobero.com/cdn/shop/files/HB_Co-Ords_mob.jpg",
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
      desktopImage: "https://nobero.com/cdn/shop/files/HB_Chinos_des.jpg",
      mobileImage: "https://nobero.com/cdn/shop/files/HB_Chinos_mob.jpg",
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
      desktopImage: "https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg",
      mobileImage: "https://nobero.com/cdn/shop/files/HB_Shacket_mob_jpg.jpg",
      active: true,
      order: 4
    }
  ],

  // 10 Men's Collection Cards (100% Men's only, matching exact Nobero screenshot)
  collections: [
    {
      id: "col-1",
      name: "Travel",
      image: "/images/collections/col_travel.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Travel_essential.jpg?v=1757745353",
      link: "/travel"
    },
    {
      id: "col-2",
      name: "Polos",
      image: "/images/collections/col_polos.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Polo.jpg?v=1757745353",
      link: "/polos"
    },
    {
      id: "col-3",
      name: "Shirts",
      image: "/images/collections/col_shirts.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Linen_Shirts-4.jpg?v=1778157293",
      link: "/shirts"
    },
    {
      id: "col-4",
      name: "Co-ords",
      image: "/images/collections/col_coords.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Co-ord-2.jpg?v=1786527383",
      link: "/co-ords"
    },
    {
      id: "col-5",
      name: "HD Tees",
      image: "/images/collections/col_hd_tees.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Premium_tee-2_jpg.jpg?v=1772443532",
      link: "/shop?category=premium-hd-tees"
    },
    {
      id: "col-6",
      name: "T-Shirts",
      image: "/images/collections/col_t_shirts.jpg",
      fallback: "https://nobero.com/cdn/shop/files/6_3947fc67-5783-4d32-9311-506c676a9ce8.jpg?v=1757745344",
      link: "/t-shirts"
    },
    {
      id: "col-7",
      name: "Joggers",
      image: "/images/collections/col_joggers.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Joggersssss.jpg?v=1762501540",
      link: "/joggers"
    },
    {
      id: "col-8",
      name: "Cargo Pants",
      image: "/images/collections/col_cargo_pants.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Cargo_Pants_f4f28077-9d53-45e8-92d8-ceebffdbb6f6.jpg?v=1762501471",
      link: "/joggers?sub=cargo"
    },
    {
      id: "col-9",
      name: "Shorts",
      image: "/images/collections/col_shorts.png",
      fallback: "https://nobero.com/cdn/shop/files/Shorts_Home_Icon_aa3f709b-ca13-4da0-8902-38e06cb81454.png?v=1763279542",
      link: "/shorts"
    },
    {
      id: "col-10",
      name: "Oversized Tees",
      image: "/images/collections/col_oversized_tees.jpg",
      fallback: "https://nobero.com/cdn/shop/files/Ov._Tee_13b98095-2712-4d73-ad6b-ed64bf134ab9.jpg?v=1778586377",
      link: "/oversized-tees"
    }
  ],

  // 4 Curated Men's Outfits for "Shop the Full Look" (100% Men Only)
  looks: [
    {
      id: "everyday-hoodie-look",
      slug: "everyday-hoodie-look",
      title: "Everyday Hoodie Look",
      discount: "18% OFF",
      discountAmount: "₹601 OFF",
      originalPrice: 3299,
      bundlePrice: 2698,
      lowestPrice: 2648,
      rating: 5.0,
      reviewCount: 1,
      image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_243d8cf8-17ad-400a-b8aa-6337e6d862d1.jpg?v=1765453680",
      gallery: [
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_243d8cf8-17ad-400a-b8aa-6337e6d862d1.jpg?v=1765453680",
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/2_af638b1d-e328-489d-b8b8-f004eded4ad2.jpg?v=1765453680",
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/3_e9f3cb11-8475-40ce-8e25-d72e80f95303.jpg?v=1765453680",
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/4_c475c229-144d-400d-b6f9-297229bc3489.jpg?v=1765453679",
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/5_88155fd8-db2a-487a-8ac8-bb212ec69bff.jpg?v=1765453681"
      ],
      itemsIncluded: ["Believe In Yourself Classic Hoodie", "Classic Straight Fit Joggers"],
      topProduct: {
        name: "Believe In Yourself Classic Hoodie",
        shortLabel: "Classic Hoodie",
        color: "Black",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/believe_in_yourself_83856a14-fcf8-49fe-b285-348391d538f6.jpg?v=1771836265",
        price: 1499,
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        productSlug: "believe-in-yourself-classic-hoodie"
      },
      bottomProduct: {
        name: "Classic Straight Fit Joggers",
        shortLabel: "Straight Fit Joggers",
        color: "Natural",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/SFCoreWeb-0006.webp?v=1772521556",
        price: 1199,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "classic-straight-fit-joggers"
      },
      description: "A lightweight hoodie paired with straight joggers for smooth daily movement. The relaxed fit allows comfort through commutes, casual plans, or slow evenings. Subtle print adds character without overpowering the look. Soft fabric keeps the outfit breathable and versatile. A minimal leo uniform designed for effortless living.",
      fabricCare: "100% Super Combed Cotton. Machine wash inside out in cold water. Do not bleach. Tumble dry low.",
      offers: [
        { code: "BUY2", title: "Get it for as low as ₹2,294", condition: "Applicable on prepaid orders" },
        { code: "BUY3", title: "Get it for as low as ₹2,428", condition: "Flat 10% extra discount" }
      ]
    },
    {
      id: "forest-trail-look",
      slug: "forest-trail-look",
      title: "Forest Trail Look",
      discount: "50% OFF",
      discountAmount: "₹2,000 OFF",
      originalPrice: 3998,
      bundlePrice: 1998,
      lowestPrice: 1948,
      rating: 4.9,
      reviewCount: 48,
      image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_ad043cc4-8c1d-4d80-8e47-741104dd47ae.jpg?v=1762842103",
      gallery: [
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_ad043cc4-8c1d-4d80-8e47-741104dd47ae.jpg?v=1762842103"
      ],
      itemsIncluded: ["Heavyweight French Terry Sweatshirt", "Classic Straight Fit Joggers"],
      topProduct: {
        name: "Pine Green Heavyweight Sweatshirt",
        shortLabel: "Knit Sweatshirt",
        color: "Forest Green",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/AW_26_Homepage_Banners_Desktop_jpg.jpg",
        price: 1099,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "pine-green-sweatshirt"
      },
      bottomProduct: {
        name: "Classic Straight Fit Joggers",
        shortLabel: "Straight Joggers",
        color: "Off-White",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/SFCoreWeb-0006.webp?v=1772521556",
        price: 899,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "classic-straight-fit-joggers"
      },
      description: "Designed for brisk morning commutes and relaxed weekend exploring. Premium heavyweight French Terry cotton delivers optimal insulation with zero bulk.",
      fabricCare: "100% Cotton French Terry 280 GSM. Machine wash cold, gentle cycle.",
      offers: [
        { code: "BUY2", title: "Get it for as low as ₹1,698", condition: "Applicable on prepaid orders" },
        { code: "BUY3", title: "Get it for as low as ₹1,798", condition: "Flat 10% extra discount" }
      ]
    },
    {
      id: "earth-retreat-look",
      slug: "earth-retreat-look",
      title: "Earth Retreat Look",
      discount: "45% OFF",
      discountAmount: "₹1,801 OFF",
      originalPrice: 3999,
      bundlePrice: 2198,
      lowestPrice: 2148,
      rating: 4.8,
      reviewCount: 32,
      image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_538cc2a5-f4e5-45b8-8b8f-ce1666528f0b.jpg?v=1762842286",
      gallery: [
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_538cc2a5-f4e5-45b8-8b8f-ce1666528f0b.jpg?v=1762842286"
      ],
      itemsIncluded: ["Cocoa Heavyweight Crewneck Sweatshirt", "Air-Flex Utility Cargo Joggers"],
      topProduct: {
        name: "Cocoa Heavyweight Crewneck Sweatshirt",
        shortLabel: "Cozy Sweatshirt",
        color: "Cocoa Brown",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/Ov._Tee_13b98095-2712-4d73-ad6b-ed64bf134ab9.jpg",
        price: 1199,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "cocoa-sweatshirt"
      },
      bottomProduct: {
        name: "Air-Flex Utility Cargo Joggers",
        shortLabel: "Cargo Joggers",
        color: "Military Olive",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/Cargo_Pants_f4f28077-9d53-45e8-92d8-ceebffdbb6f6.jpg",
        price: 999,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "air-flex-cargo-jogger"
      },
      description: "Earthy warmth meets utilitarian mobility. Structured drop shoulder sweater coupled with multi-pocket stretch cargo joggers built for effortless travel.",
      fabricCare: "240 GSM Bio-Washed Combed Cotton. Machine wash inside out.",
      offers: [
        { code: "BUY2", title: "Get it for as low as ₹1,868", condition: "Applicable on prepaid orders" },
        { code: "BUY3", title: "Get it for as low as ₹1,978", condition: "Flat 10% extra discount" }
      ]
    },
    {
      id: "boarding-comfort-look",
      slug: "boarding-comfort-look",
      title: "Boarding Comfort Look",
      discount: "42% OFF",
      discountAmount: "₹1,551 OFF",
      originalPrice: 3699,
      bundlePrice: 2148,
      lowestPrice: 2098,
      rating: 4.9,
      reviewCount: 64,
      image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/5_2319973c-2872-4fca-b24c-7ef0d2cbc7e0.jpg?v=1773214964",
      gallery: [
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/5_2319973c-2872-4fca-b24c-7ef0d2cbc7e0.jpg?v=1773214964"
      ],
      itemsIncluded: ["Air-Flex Transit Crewneck", "All-Day Stretch Chino Pants"],
      topProduct: {
        name: "Air-Flex Transit Crewneck",
        shortLabel: "Air-Flex Crewneck",
        color: "Teal Blue",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_38.jpg",
        price: 1149,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "transit-crewneck"
      },
      bottomProduct: {
        name: "All-Day Stretch Chino Pants",
        shortLabel: "Stretch Chinos",
        color: "Beige Khaki",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/HB_Chinos_des.jpg",
        price: 999,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "stretch-chino-pants"
      },
      description: "Engineered specifically for long flights and airport transfers. Breathable cotton loopknit top paired with tailored flexible chinos that resist wrinkles.",
      fabricCare: "95% Cotton 5% Spandex. Machine wash cold, dry in shade.",
      offers: [
        { code: "BUY2", title: "Get it for as low as ₹1,825", condition: "Applicable on prepaid orders" },
        { code: "BUY3", title: "Get it for as low as ₹1,933", condition: "Flat 10% extra discount" }
      ]
    },
    {
      id: "neutral-break-look",
      slug: "neutral-break-look",
      title: "Neutral Break Look",
      discount: "43% OFF",
      discountAmount: "₹1,601 OFF",
      originalPrice: 3699,
      bundlePrice: 2098,
      lowestPrice: 2048,
      rating: 4.8,
      reviewCount: 29,
      image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_088fd92e-7996-4da8-a32d-c3139e32f16c.jpg?v=1768218094",
      gallery: [
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/1_088fd92e-7996-4da8-a32d-c3139e32f16c.jpg?v=1768218094"
      ],
      itemsIncluded: ["Midnight Graphic Heavyweight Hoodie", "Classic Straight Fit Joggers"],
      topProduct: {
        name: "Midnight Graphic Heavyweight Hoodie",
        shortLabel: "Graphic Hoodie",
        color: "Navy Blue",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/HB_Shacket_des_jpg.jpg",
        price: 1199,
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        productSlug: "midnight-graphic-hoodie"
      },
      bottomProduct: {
        name: "Classic Straight Fit Joggers",
        shortLabel: "Straight Joggers",
        color: "Natural",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/SFCoreWeb-0006.webp?v=1772521556",
        price: 899,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "classic-straight-fit-joggers"
      },
      description: "Rich dark top silhouette balanced against neutral off-white trousers. The definitive travel layer combo for transitioning between seasons.",
      fabricCare: "100% Super Combed Cotton. Machine wash inside out.",
      offers: [
        { code: "BUY2", title: "Get it for as low as ₹1,783", condition: "Applicable on prepaid orders" },
        { code: "BUY3", title: "Get it for as low as ₹1,888", condition: "Flat 10% extra discount" }
      ]
    },
    {
      id: "urban-motion-look",
      slug: "urban-motion-look",
      title: "Urban Motion Look",
      discount: "33% OFF",
      discountAmount: "₹1,201 OFF",
      originalPrice: 3599,
      bundlePrice: 2398,
      lowestPrice: 2348,
      rating: 4.8,
      reviewCount: 346,
      image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/Instagrampost-7_1.jpg?v=1783345563",
      gallery: [
        "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/Instagrampost-7_1.jpg?v=1783345563"
      ],
      itemsIncluded: ["Wanderer Structured Drop-Shoulder Tee", "Everyday Transit Stretch Trousers"],
      topProduct: {
        name: "Wanderer Structured Drop-Shoulder Tee",
        shortLabel: "Drop-Shoulder Tee",
        color: "Wine Red",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/Instagrampost-7_1.jpg?v=1783345563",
        price: 1199,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "wanderer-structured-tee"
      },
      bottomProduct: {
        name: "Everyday Transit Stretch Trousers",
        shortLabel: "Transit Trousers",
        color: "Navy Blue",
        image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/Cargo_Pants_f4f28077-9d53-45e8-92d8-ceebffdbb6f6.jpg",
        price: 1199,
        sizes: ["S", "M", "L", "XL", "XXL"],
        productSlug: "everyday-transit-trousers"
      },
      description: "Clean, modern streetwear proportioning. Heavy 240 GSM knit wine tee coordinated with tailored navy flex pants for seamless all-day movement.",
      fabricCare: "100% Combed Cotton 240 GSM. Machine wash cold, dry in shade.",
      offers: [
        { code: "BUY2", title: "Get it for as low as ₹2,038", condition: "Applicable on prepaid orders" },
        { code: "BUY3", title: "Get it for as low as ₹2,158", condition: "Flat 10% extra discount" }
      ]
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
      image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      colors: [
        {
          name: "Natural Sand",
          hex: "#d8c4b6",
          image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
          secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013"
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
      image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      colors: [
        {
          name: "Vintage Ash Grey",
          hex: "#4a4a4a",
          image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
          secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013"
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
      image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      colors: [
        {
          name: "Racing Navy",
          hex: "#0c2340",
          image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
          secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013"
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
      image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      colors: [
        {
          name: "Black & Olive Pack",
          hex: "#1b1b1b",
          image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
          secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013"
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
      image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
      colors: [
        {
          name: "Pure White",
          hex: "#ffffff",
          image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013",
          secondaryImage: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013"
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
      code: "B2G10",
      type: "percent",
      value: 10,
      minOrder: 999,
      description: "Buy 2 & Get 10% Off",
      active: true,
      usageCount: 512
    },
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
      coverImage: "https://nobero.com/cdn/shop/collections/7p_69c2c6cf-78a7-441f-b34a-ab147745806d.jpg?v=1790616859",
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
      coverImage: "/images/leo/mood_street.jpg",
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
      coverImage: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/POLOPDP-5_5c355606-1884-4943-b73a-f1503bc04014.jpg?v=1776764425",
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
          image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013"
        },
        {
          id: "leo-102",
          title: "Wanderer - 6 Pocket Travel Cargo Joggers",
          color: "Slate Olive",
          size: "32",
          price: 1199,
          quantity: 1,
          image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013"
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

const fullProductsManifest = path.join(__dirname, 'data', 'leo_full_products.json');
const downloadedManifest = path.join(__dirname, 'data', 'downloaded_products.json');

if (fs.existsSync(fullProductsManifest)) {
  try {
    const rawFull = JSON.parse(fs.readFileSync(fullProductsManifest, 'utf-8'));
    if (Array.isArray(rawFull) && rawFull.length > 0) {
      initialData.products = rawFull;
    }
  } catch (e) {
    console.error('Error loading full products:', e);
  }
} else if (fs.existsSync(downloadedManifest)) {
  try {
    const rawDownloaded = JSON.parse(fs.readFileSync(downloadedManifest, 'utf-8'));
    if (Array.isArray(rawDownloaded) && rawDownloaded.length > 0) {
      initialData.products = rawDownloaded;
    }
  } catch (e) {
    console.error('Error loading downloaded products:', e);
  }
}

// Preserve existing DB or initialize if missing
if (!fs.existsSync(DB_FILE)) {
  writeDB(initialData);
} else {
  const currentDB = readDB();
  if (!currentDB.products || currentDB.products.length < initialData.products.length) {
    writeDB({ ...currentDB, products: initialData.products });
  }
}

const app = express();
app.use(cors());

// Universal Image CDN Fallback Middleware
app.use((req, res, next) => {
  const url = req.url;
  if (/\.(jpg|jpeg|png|webp|avif|gif)(\?.*)?$/i.test(url)) {
    // 1. Check if it is a product image with hash
    const prodMatch = url.match(/(?:men\(1\)\/[^/]+\/|images\/(?:leo|nobero)\/)?.*?_\d+_(.+\.(?:jpg|jpeg|png|webp|avif))/i);
    if (prodMatch && prodMatch[1]) {
      return res.redirect(302, `https://cdn.shopify.com/s/files/1/0337/9413/0052/files/${prodMatch[1]}`);
    }
    // 2. Check hero banners
    if (url.includes("hero_banner_shacket")) {
      return res.redirect(302, url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Shacket_mob_jpg.jpg" : "https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg");
    }
    if (url.includes("hero_banner_coords")) {
      return res.redirect(302, url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Co-Ords_mob.jpg" : "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg");
    }
    if (url.includes("hero_banner_chinos")) {
      return res.redirect(302, url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Chinos_mob.jpg" : "https://nobero.com/cdn/shop/files/HB_Chinos_des.jpg");
    }
    if (url.includes("hero_banner_joggers")) {
      return res.redirect(302, url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_mob.jpg" : "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg");
    }
    if (url.includes("col_coords_exact")) {
      return res.redirect(302, "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg");
    }
    if (url.includes("mood_travel")) {
      return res.redirect(302, "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg");
    }
  }
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/leo', express.static(path.join(__dirname, '../client/public/images/nobero')));
app.use('/images/nobero', express.static(path.join(__dirname, '../client/public/images/nobero')));

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

app.get('/api/looks/:id', (req, res) => {
  const db = readDB();
  const idOrSlug = req.params.id;
  const look = (db.looks || []).find(l => l.id === idOrSlug || l.slug === idOrSlug);
  if (look) {
    res.json({ success: true, data: look });
  } else {
    res.status(404).json({ success: false, message: 'Look not found' });
  }
});

app.get('/api/products', (req, res) => {
  const db = readDB();
  let list = [...db.products];
  const { category, sort, filter, search } = req.query;

  if (category && category !== 'all' && category !== 'men') {
    const catMap = {
      'textured-shackets': ['hoodies', 'jackets'],
      'shackets': ['hoodies', 'jackets'],
      'jackets-shackets': ['hoodies', 'jackets'],
      'travel-essentials': ['travel', 'joggers', 'pants'],
      'classic-polo': ['polos'],
      'shirts-for-men': ['shirts'],
      'best-selling-co-ord-sets': ['co-ords'],
      'premium-hd-tees': ['t-shirts', 'oversized-tees'],
      'cargo-pants': ['joggers', 'pants']
    };
    const targetCats = catMap[category] || [category];
    list = list.filter(p => 
      targetCats.some(tc => p.category === tc || p.category.includes(tc)) ||
      (category.includes('shacket') && (p.title.toLowerCase().includes('shacket') || p.title.toLowerCase().includes('jacket')))
    );
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
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`LEO Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;

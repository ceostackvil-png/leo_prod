import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const MEN_COLLECTIONS = [
  { name: "Travel Essentials", image: "/images/shop_collections/Travel_essential.avif", link: "/shop?category=travel" },
  { name: "Polos", image: "/images/shop_collections/Polo.avif", link: "/shop?category=polos" },
  { name: "Men Shirts", image: "/images/shop_collections/Linen_Shirts-4.webp", link: "/shop?category=shirts" },
  { name: "Co-Ord Sets", image: "/images/shop_collections/Co-ord-2.jxl", link: "/shop?category=co-ords" },
  { name: "Premium HD Tees", image: "/images/shop_collections/Premium_tee-2_jpg.webp", link: "/shop?category=premium-hd-tees" },
  { name: "T-Shirts", image: "/images/shop_collections/6_3947fc67-5783-4d32-9311-506c676a9ce8.avif", link: "/shop?category=t-shirts" },
  { name: "Joggers", image: "/images/shop_collections/Joggersssss.webp", link: "/shop?category=joggers" },
  { name: "Pants", image: "/images/shop_collections/Cargo_Pants_f4f28077-9d53-45e8-92d8-ceebffdbb6f6.webp", link: "/shop?category=pants" },
  { name: "Shorts", image: "/images/shop_collections/Shorts_Home_Icon_aa3f709b-ca13-4da0-8902-38e06cb81454.webp", link: "/shop?category=shorts" },
  { name: "Oversized Tees", image: "/images/shop_collections/Ov._Tee_13b98095-2712-4d73-ad6b-ed64bf134ab9.webp", link: "/shop?category=oversized-tees" }
];

const ShopByCollection = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        {/* Section Heading */}
        <h2 className="text-center text-[#212121] font-bold text-lg sm:text-2xl mb-4 sm:mb-8 font-display">
          Shop by Collection
        </h2>

        {/* Collections Grid (Match Nobero's 6-column layout) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4 lg:gap-6">
          {MEN_COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              to={col.link}
              className="group flex flex-col items-center text-center select-none"
            >
              {/* Image Container with precise styling */}
              <div className="w-full aspect-square rounded-[10px] overflow-hidden bg-[#F7F8FA] relative transition-transform duration-300 group-hover:scale-[1.02] active:scale-95">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center border border-white/80 transition-colors group-hover:bg-white/20">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>

              {/* Label */}
              <span className="text-[11px] sm:text-[13px] font-semibold text-[#212121] mt-1.5 sm:mt-2 group-hover:text-[#282C3F] transition-colors leading-tight line-clamp-1">
                {col.name}
              </span>
            </Link>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default ShopByCollection;

import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const MEN_COLLECTIONS = [
  { name: "Travel Essentials", image: "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg", link: "/shop?category=travel" },
  { name: "Polos", image: "https://cdn.shopify.com/s/files/1/0337/9413/0052/files/POLOPDP-5_5c355606-1884-4943-b73a-f1503bc04014.jpg?v=1776764425", link: "/shop?category=polos" },
  { name: "Men Shirts", image: "https://nobero.com/cdn/shop/collections/Full_sleeve_polo.jpg?v=1783596387", link: "/shop?category=shirts" },
  { name: "Co-Ord Sets", image: "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg", link: "/shop?category=co-ords" },
  { name: "Premium HD Tees", image: "https://nobero.com/cdn/shop/collections/Website_Shop_men_220_x_304_11.png?v=1775748481", link: "/shop?category=premium-hd-tees" },
  { name: "T-Shirts", image: "https://nobero.com/cdn/shop/collections/port_1.jpg?v=1745516013", link: "/shop?category=t-shirts" },
  { name: "Joggers", image: "https://nobero.com/cdn/shop/collections/6_29719fa5-f748-482e-8039-fda30c64d1db.jpg?v=1757760284", link: "/shop?category=joggers" },
  { name: "Pants", image: "https://nobero.com/cdn/shop/collections/Cargo_Pants_Icon_Home_Page_copy.jpg?v=1790616572", link: "/shop?category=pants" },
  { name: "Shorts", image: "https://nobero.com/cdn/shop/collections/7p_69c2c6cf-78a7-441f-b34a-ab147745806d.jpg?v=1790616859", link: "/shop?category=shorts" },
  { name: "Oversized Tees", image: "https://nobero.com/cdn/shop/collections/Website_Shop_men_220_x_304_9.png?v=1771849527", link: "/shop?category=oversized-tees" }
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

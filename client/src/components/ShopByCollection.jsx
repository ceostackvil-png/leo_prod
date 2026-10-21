import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const MEN_COLLECTIONS = [
  {
    name: "Travel",
    image: "/images/collections/col_travel.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Travel_essential.jpg?v=1757745353",
    link: "/travel"
  },
  {
    name: "Polos",
    image: "/images/collections/col_polos.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Polo.jpg?v=1757745353",
    link: "/polos"
  },
  {
    name: "Shirts",
    image: "/images/collections/col_shirts.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Linen_Shirts-4.jpg?v=1778157293",
    link: "/shirts"
  },
  {
    name: "Co-ords",
    image: "/images/collections/col_coords.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Co-ord-2.jpg?v=1786527383",
    link: "/co-ords"
  },
  {
    name: "HD Tees",
    image: "/images/collections/col_hd_tees.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Premium_tee-2_jpg.jpg?v=1772443532",
    link: "/shop?category=premium-hd-tees"
  },
  {
    name: "T-Shirts",
    image: "/images/collections/col_t_shirts.jpg",
    fallback: "https://nobero.com/cdn/shop/files/6_3947fc67-5783-4d32-9311-506c676a9ce8.jpg?v=1757745344",
    link: "/t-shirts"
  },
  {
    name: "Joggers",
    image: "/images/collections/col_joggers.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Joggersssss.jpg?v=1762501540",
    link: "/joggers"
  },
  {
    name: "Cargo Pants",
    image: "/images/collections/col_cargo_pants.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Cargo_Pants_f4f28077-9d53-45e8-92d8-ceebffdbb6f6.jpg?v=1762501471",
    link: "/joggers?sub=cargo"
  },
  {
    name: "Shorts",
    image: "/images/collections/col_shorts.png",
    fallback: "https://nobero.com/cdn/shop/files/Shorts_Home_Icon_aa3f709b-ca13-4da0-8902-38e06cb81454.png?v=1763279542",
    link: "/shorts"
  },
  {
    name: "Oversized Tees",
    image: "/images/collections/col_oversized_tees.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Ov._Tee_13b98095-2712-4d73-ad6b-ed64bf134ab9.jpg?v=1778586377",
    link: "/oversized-tees"
  }
];

const ShopByCollection = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        {/* Section Heading matching Nobero exact styling */}
        <h2 className="text-center text-[#1A1E31] font-semibold text-xl lg:text-2xl mb-5 sm:mb-8 tracking-tight font-sans">
          Shop by Collection
        </h2>

        {/* Collections Grid (Exact 10 Men's Collections in 2 balanced rows of 5) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {MEN_COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              to={col.link}
              className="group flex flex-col items-center text-center select-none cursor-pointer"
            >
              {/* Image Container with rounded corners & top-right '+' circle icon matching reference */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#eef0f3] relative transition-transform duration-300 group-hover:scale-[1.02] active:scale-95 shadow-xs">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    if (col.fallback && e.currentTarget.src !== col.fallback) {
                      e.currentTarget.src = col.fallback;
                    }
                  }}
                />
                
                {/* Plus circle badge in top right matching screenshot */}
                <div className="absolute top-2.5 right-2.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/30 backdrop-blur-[2px] flex items-center justify-center border border-white/70 text-white shadow-xs pointer-events-none group-hover:bg-white/50 transition-colors">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>

              {/* Exact collection name label */}
              <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-medium text-[#1A1E31] mt-2 sm:mt-2.5 group-hover:text-black transition-colors leading-tight">
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

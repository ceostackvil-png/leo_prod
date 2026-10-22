import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const COLLECTIONS = [
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
  },
  {
    name: "Women Tees",
    image: "/images/collections/col_women_tees.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Women_tee_jpg.jpg?v=1772211935",
    link: "/shop?category=t-shirts"
  },
  {
    name: "Women Joggers",
    image: "/images/collections/col_women_joggers.jpg",
    fallback: "https://nobero.com/cdn/shop/files/Women_jog_jpg.jpg?v=1772211883",
    link: "/joggers"
  }
];

const ShopByCollection = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        {/* Section Heading matching Nobero exact styling */}
        <div className="text-center mb-5 sm:mb-8">
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl lg:text-[26px] font-bold font-sans tracking-tight">
            Shop by Collection
          </h2>
        </div>

        {/* Collections Grid (Exact 12 Collections in 2 rows of 6 matching reference) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-4 lg:gap-5 w-full">
          {COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              to={col.link}
              className="group flex flex-col items-center text-center select-none cursor-pointer"
            >
              {/* Image Container with rounded corners matching exact 1:1 aspect ratio */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#ECEEF0] relative transition-transform duration-300 group-hover:scale-[1.03] active:scale-95 shadow-2xs border border-gray-100">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                  onError={(e) => {
                    if (col.fallback && e.currentTarget.src !== col.fallback) {
                      e.currentTarget.src = col.fallback;
                    }
                  }}
                />
              </div>

              {/* Exact collection name label */}
              <span className="text-[13px] sm:text-[14px] font-medium text-[#1A1E31] mt-2 group-hover:text-black transition-colors leading-tight">
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

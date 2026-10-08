import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const MEN_COLLECTIONS = [
  {
    name: "Travel Essentials",
    image: "/images/nobero/col_travel_exact.jpg",
    link: "/travel"
  },
  {
    name: "Joggers",
    image: "/images/nobero/col_joggers_exact.jpg",
    link: "/joggers"
  },
  {
    name: "Cargo Pants",
    image: "/images/nobero/col_cargos_exact.jpg",
    link: "/joggers"
  },
  {
    name: "Co-Ord Sets",
    image: "/images/nobero/col_coords_exact.jpg",
    link: "/co-ords"
  },
  {
    name: "Oversized Tees",
    image: "/images/nobero/col_oversized_exact.jpg",
    link: "/oversized-tees"
  },
  {
    name: "Polos",
    image: "/images/nobero/col_polo_exact.png",
    link: "/polos"
  },
  {
    name: "Men Shirts",
    image: "/images/nobero/col_shirts_exact.jpg",
    link: "/shirts"
  },
  {
    name: "Shorts",
    image: "/images/nobero/col_shorts_exact.png",
    link: "/shorts"
  },
  {
    name: "Full Sleeve Tees",
    image: "/images/nobero/col_fullsleeve_exact.jpg",
    link: "/t-shirts"
  },
  {
    name: "Hoodies & Jackets",
    image: "/images/nobero/hero_banner_shacket_des.jpg",
    link: "/hoodies"
  }
];

const ShopByCollection = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        {/* Section Heading */}
        <h2 className="text-center text-[#1A1E31] font-bold text-lg sm:text-2xl mb-5 sm:mb-8 font-display">
          Shop by Collection
        </h2>

        {/* Collections Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {MEN_COLLECTIONS.map((col, idx) => (
            <Link
              key={idx}
              to={col.link}
              className="group flex flex-col items-center text-center select-none"
            >
              {/* Image Container */}
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Label */}
              <span className="text-[11px] sm:text-[13px] font-semibold text-[#1A1E31] mt-2 group-hover:text-[#242F66] transition-colors leading-tight line-clamp-1">
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

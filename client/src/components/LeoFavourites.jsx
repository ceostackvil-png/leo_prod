import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import StorefrontContainer from './StorefrontContainer';

const LeoFavourites = ({ products = [] }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const favourites = products.filter(p => p.category === 'co-ords' || p.isFavourite || p.isBestseller);

  if (!favourites.length) return null;

  return (
    <section className="py-8 sm:py-12 bg-white">
      <StorefrontContainer>
        {/* Section Header (Exact Nobero) */}
        <div className="text-center mb-6 lg:mb-8">
          <span className="text-[#242F66] text-[11px] sm:text-xs font-bold uppercase tracking-widest block mb-1">
            SIGNATURE ROTATION
          </span>
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl lg:text-[26px] font-bold font-sans">
            Co-Ord Sets
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-normal">
            Made to match. Easy to wear.
          </p>
        </div>

        {/* Product Cards Grid (4 columns desktop, 2 mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {favourites.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {favourites.slice(0, 4).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-2 h-2 rotate-45 transition-all cursor-pointer ${
                idx === activeIdx
                  ? 'bg-[#1A1E31] border border-[#1A1E31]'
                  : 'bg-transparent border border-gray-400 hover:border-[#1A1E31]'
              }`}
              aria-label={`Go to item ${idx + 1}`}
            />
          ))}
        </div>

        {/* View All CTA Button */}
        <div className="mt-6 text-center">
          <Link
            to="/co-ords"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A1E31] border border-[#1A1E31] px-8 py-2.5 hover:bg-[#1A1E31] hover:text-white transition-colors"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default LeoFavourites;

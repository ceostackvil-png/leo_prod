import React from 'react';
import ProductCard from './ProductCard';

const LeoFavourites = ({ products = [] }) => {
  const favourites = products.filter(p => p.isFavourite || p.isBestseller);

  if (!favourites.length) return null;

  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Exact Nobero) */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-[#1A1E31] text-xl lg:text-2xl font-bold font-display mb-0.5">
            LEO Favourite
          </h2>
          <p className="text-xs sm:text-sm text-[#666875]">
            Handpicked for you
          </p>
        </div>

        {/* Product Cards Grid (4 columns desktop, 2 mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {favourites.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LeoFavourites;

import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const Bestsellers = ({ products = [] }) => {
  const bestsellers = products.filter(p => p.isBestseller);

  if (!bestsellers.length) return null;

  return (
    <section className="py-8 lg:py-12 bg-[#F7F8FA] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Exact Nobero) */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-[#212121] text-xl lg:text-2xl font-bold font-display mb-0.5">
            Our Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#666875]">
            Don't miss out Top Selling styles
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {bestsellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA (Exact Nobero button) */}
        <div className="mt-8 lg:mt-10 text-center">
          <Link
            to="/shop?filter=bestseller"
            className="inline-block bg-[#282C3F] hover:bg-[#1a224a] text-white text-xs sm:text-[13px] font-bold uppercase tracking-wider px-8 py-3 rounded-md transition-colors"
          >
            SHOP ALL PRODUCTS
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Bestsellers;

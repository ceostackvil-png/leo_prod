import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import StorefrontContainer from './StorefrontContainer';

const MEN_TABS = [
  { id: 'all', label: 'All Fits' },
  { id: 'oversized-tees', label: 'Oversized Tees' },
  { id: 'joggers', label: 'Cargo & Joggers' },
  { id: 'hoodies', label: 'French Terry Hoodies' },
  { id: 'co-ords', label: 'Co-Ord Sets' },
  { id: 'polos', label: 'Travel Polos' }
];

const ProductGrid = ({
  title = "LEO Favourites",
  subtitle = "Handpicked for you",
  badge = "MOST WANTED",
  products = [],
  showTabs = true,
  viewAllLink = "/shop",
  columns = 4,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  const gridColsClass = columns === 4
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    : columns === 3
    ? "grid-cols-2 sm:grid-cols-3"
    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <section className={`py-8 sm:py-12 bg-white ${className}`}>
      <StorefrontContainer>
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              {badge && (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#666875] mb-1">
                  {badge}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#1A1E31]">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#666875] mt-0.5 font-medium">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Filter Tabs */}
            {showTabs && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {MEN_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#242F66] text-white shadow-sm'
                        : 'bg-gray-100 text-[#666875] hover:text-[#1A1E31] hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Product Cards Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
        <div className={`grid ${gridColsClass} gap-3 sm:gap-5`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        {viewAllLink && (
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to={viewAllLink}
              className="inline-flex items-center gap-2 bg-[#242F66] hover:bg-[#1A1E31] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3 rounded-md transition-all shadow-sm hover:shadow"
            >
              SHOP ALL PRODUCTS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </StorefrontContainer>
    </section>
  );
};

export default ProductGrid;

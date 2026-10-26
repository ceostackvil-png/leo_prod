import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import StorefrontContainer from './StorefrontContainer';

const TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'polos', label: 'POLOS' },
  { id: 't-shirts', label: 'T-SHIRTS' },
  { id: 'oversized-tees', label: 'OVERSIZED TEES' },
  { id: 'hoodies', label: 'HOODIES' },
  { id: 'joggers', label: 'JOGGERS' }
];

const EverydayBestsellers = ({ products = [] }) => {
  const [activeTab, setActiveTab] = useState('polos');

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') {
      const best = products.filter(p => p.isBestseller || p.isFavourite);
      return best.length > 0 ? best : products;
    }
    const catFiltered = products.filter(p => {
      const cat = (p.category || '').toLowerCase();
      const title = (p.title || '').toLowerCase();
      const slug = (p.slug || '').toLowerCase();
      if (activeTab === 'polos') return cat === 'polos' || title.includes('polo') || slug.includes('polo');
      if (activeTab === 't-shirts') return cat === 't-shirts' || (title.includes('tee') && !title.includes('oversized'));
      if (activeTab === 'oversized-tees') return cat === 'oversized-tees' || title.includes('oversized');
      if (activeTab === 'hoodies') return cat === 'hoodies' || title.includes('hoodie') || title.includes('sweatshirt');
      if (activeTab === 'joggers') return cat === 'joggers' || title.includes('jogger') || title.includes('pant');
      return cat === activeTab;
    });
    return catFiltered.length > 0 ? catFiltered : products;
  }, [products, activeTab]);

  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Centered Section Header (Exact Nobero Layout) */}
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl lg:text-[26px] font-bold font-sans tracking-tight">
            Our Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-normal">
            Don't miss out Top Selling styles
          </p>
        </div>

        {/* Category Tabs matching Nobero mobile reference */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 justify-start sm:justify-center mb-6 px-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider rounded-full uppercase shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#242F66] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid (4 cols desktop, 2 cols mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to={activeTab === 'all' ? '/bestsellers' : `/shop?category=${activeTab}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#242F66] hover:bg-[#1a234f] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3 rounded-none transition-all shadow-xs"
          >
            VIEW ALL BESTSELLERS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default EverydayBestsellers;

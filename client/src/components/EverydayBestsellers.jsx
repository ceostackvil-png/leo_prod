import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import ProductCard from './ProductCard';
import StorefrontContainer from './StorefrontContainer';

const TABS = [
  { id: 'all', label: 'All Bestsellers' },
  { id: 'oversized-tees', label: 'Oversized Tees' },
  { id: 'joggers', label: 'Cargo & Joggers' },
  { id: 'polos', label: 'Travel Polos' },
  { id: 'co-ords', label: 'Co-Ord Sets' },
  { id: 'hoodies', label: 'Hoodies' }
];

const EverydayBestsellers = ({ products = [] }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? products.filter(p => p.isBestseller || p.isFavourite)
    : products.filter(p => p.category === activeTab);

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#D9232D] mb-1">
              <Flame className="w-3.5 h-3.5 fill-[#D9232D]" /> MOST LOVED STYLES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#212121]">
              Everyday Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-[#666875] mt-1 font-medium">
              Top selling wardrobe upgrades designed for everyday rotation.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#282C3F] text-white shadow-sm'
                    : 'bg-gray-100 text-[#666875] hover:text-[#212121] hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (4 cols desktop, 2 cols mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/men"
            className="inline-flex items-center gap-2 bg-[#282C3F] hover:bg-[#212121] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3 rounded-md transition-all shadow-sm hover:shadow"
          >
            VIEW ALL BESTSELLERS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default EverydayBestsellers;

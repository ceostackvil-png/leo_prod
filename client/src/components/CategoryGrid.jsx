import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StorefrontContainer from './StorefrontContainer';

const CATEGORIES_DATA = [
  {
    name: 'Oversized T-Shirts',
    subtitle: '240 GSM Heavyweight Fits',
    image: '/images/nobero/col_oversized_exact.jpg',
    link: '/oversized-tees',
    badge: 'Trending'
  },
  {
    name: 'Air-Flex Cargo Joggers',
    subtitle: '4-Way Stretch Flex Pants',
    image: '/images/nobero/col_cargos_exact.jpg',
    link: '/joggers',
    badge: 'Bestseller'
  },
  {
    name: 'French Terry Hoodies',
    subtitle: '380 GSM Heavy Fleece',
    image: '/images/nobero/hero_banner_shacket_des.jpg',
    link: '/hoodies',
    badge: 'Winter Drop'
  },
  {
    name: 'Matching Co-Ord Sets',
    subtitle: 'Waffle & French Terry Pairings',
    image: '/images/nobero/col_coords_exact.jpg',
    link: '/co-ords',
    badge: 'Popular'
  },
  {
    name: 'Travel Essentials',
    subtitle: 'Wrinkle-Free Active Staples',
    image: '/images/nobero/col_travel_exact.jpg',
    link: '/travel',
    badge: 'Essential'
  },
  {
    name: 'Classic Men Polos',
    subtitle: 'Pique Knit Breathable Fits',
    image: '/images/nobero/col_polo_exact.png',
    link: '/polos',
    badge: 'New Drops'
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#666875]">
              Curated Wardrobe
            </span>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#212121] mt-0.5">
              Shop By Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-[#212121] hover:text-[#282C3F] inline-flex items-center gap-1.5 mt-2 sm:mt-0 transition-colors"
          >
            Explore All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES_DATA.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow transition-all duration-300"
            >
              {/* Image Container with 3:4 Aspect Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                {cat.badge && (
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#212121] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {cat.badge}
                  </span>
                )}

                {/* Label Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <h3 className="text-xs sm:text-sm font-bold leading-tight group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-gray-300 mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default CategoryGrid;

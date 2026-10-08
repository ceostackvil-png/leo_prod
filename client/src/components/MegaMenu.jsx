import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MegaMenu = ({ category, onClose }) => {
  if (!category || !category.groups) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-[#E5E7EB] shadow-dropdown py-7 px-8 z-50 animate-slide-down"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-start">
        
        {/* Category Columns */}
        <div className="col-span-8 grid grid-cols-3 gap-8">
          {category.groups.map((grp, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#1A1E31] border-b border-gray-100 pb-1.5">
                {grp.title}
              </h4>
              <ul className="space-y-2">
                {grp.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/shop?category=${item.slug}`}
                      onClick={onClose}
                      className="text-[13px] font-medium text-[#4A4D5E] hover:text-[#242F66] hover:translate-x-1 inline-block transition-all"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Promo Visual Banner Card */}
        {category.promo && (
          <div className="col-span-4 pl-6 border-l border-gray-100">
            <Link
              to={category.promo.link || '/shop'}
              onClick={onClose}
              className="group block relative rounded-lg overflow-hidden shadow-sm aspect-[16/10] bg-gray-100"
            >
              <img
                src={category.promo.image}
                alt={category.promo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E31]/80 via-[#1A1E31]/20 to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  FEATURED
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {category.promo.title}
                </h3>
                <p className="text-[11px] text-zinc-200 mt-0.5 line-clamp-1">
                  {category.promo.subtitle}
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover:translate-x-1 transition-transform">
                  Explore Now <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default MegaMenu;

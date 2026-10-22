import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StorefrontContainer from './StorefrontContainer';

const ShopTheLook = ({ looks = [] }) => {
  const scrollRef = useRef(null);

  if (!looks || looks.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        {/* Section Header: Left-aligned, No Subtitle Description (Exact Nobero Layout) */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl font-bold font-sans text-left tracking-tight">
            Shop the Full Look
          </h2>
        </div>

        {/* Carousel Container with Left & Right Arrow Buttons */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-md bg-white shadow-md border border-gray-100 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous look"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-md bg-white shadow-md border border-gray-100 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Next look"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Cards Track: 4 columns on desktop, horizontal scroll on mobile */}
          <div
            ref={scrollRef}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full overflow-x-auto no-scrollbar scroll-smooth"
          >
            {looks.slice(0, 4).map((look) => {
              const lookUrl = `/look/${look.slug || look.id}`;

              return (
                <div
                  key={look.id}
                  className="group flex flex-col select-none cursor-pointer"
                >
                  <Link to={lookUrl} className="block w-full">
                    {/* Image Area with 2:3 Aspect Ratio (Exact Nobero Reference) */}
                    <div className="relative w-full aspect-[2/3] overflow-hidden bg-[#ECEEF0] rounded-sm">
                      <img
                        src={look.image}
                        alt={look.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-sm"
                      />

                      {/* Top Right: Expert Style Pick Badge (Exact Nobero Reference) */}
                      <div className="absolute top-2.5 right-2.5 z-10 bg-[#4A4D57]/80 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-[3px] tracking-wide">
                        {look.expertBadge || "Expert Style Pick"}
                      </div>

                      {/* Floating Merged Product Thumbnails Overlay (Top + Bottom Items with grey labels) */}
                      <div className="absolute top-9 sm:top-10 right-2 sm:right-2.5 flex flex-col gap-2 z-10 pointer-events-none">
                        {look.topProduct && (
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-md p-1 shadow-xs border border-gray-100 flex items-center justify-center overflow-hidden">
                              <img
                                src={look.topProduct.image}
                                alt={look.topProduct.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="bg-[#4A4D57]/90 text-white text-[8px] font-medium px-1.5 py-0.5 rounded-[2px] mt-0.5 text-center truncate max-w-[56px] sm:max-w-[64px]">
                              {look.topProduct.shortLabel || "Topwear"}
                            </span>
                          </div>
                        )}
                        {look.bottomProduct && (
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-md p-1 shadow-xs border border-gray-100 flex items-center justify-center overflow-hidden">
                              <img
                                src={look.bottomProduct.image}
                                alt={look.bottomProduct.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <span className="bg-[#4A4D57]/90 text-white text-[8px] font-medium px-1.5 py-0.5 rounded-[2px] mt-0.5 text-center truncate max-w-[56px] sm:max-w-[64px]">
                              {look.bottomProduct.shortLabel || "Bottomwear"}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Left: Rating Pill (e.g. ★ 5.0 | 1) */}
                      {look.rating && (
                        <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-sm flex items-center gap-1 text-[10px] font-bold text-[#1A1E31] shadow-xs">
                          <span className="text-[#F59E0B]">★</span>
                          <span>{look.rating.toFixed(1)}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-600 font-normal">{look.reviewCount || 1}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content: Title, Price Line, and Lowest Price Note (NO Bullet Points, NO Add Button) */}
                    <div className="pt-2.5 pb-1 flex flex-col space-y-1">
                      <h3 className="text-[13px] sm:text-[14px] font-normal sm:font-medium text-[#1A1E31] group-hover:text-black line-clamp-1 leading-snug">
                        {look.title}
                      </h3>

                      {/* Price Row: Bold Selling Price, Line-through Original Price, Bold Green Discount */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm sm:text-base font-bold text-[#1A1E31]">
                          ₹{Number(look.bundlePrice || 0).toLocaleString('en-IN')}
                        </span>
                        {look.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{Number(look.originalPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                        {look.discountAmount && (
                          <span className="text-xs font-semibold text-[#00B852]">
                            {look.discountAmount}
                          </span>
                        )}
                      </div>

                      {/* Lowest Price Label in Purple */}
                      <span className="text-[11px] font-normal text-[#7C3AED] leading-tight">
                        Lowest price in last 30 days
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default ShopTheLook;

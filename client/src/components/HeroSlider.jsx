import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MOBILE_TOP_CATEGORIES = [
  { name: 'Travel', image: '/images/collections/col_travel.png', link: '/travel' },
  { name: 'Polos', image: '/images/collections/col_polos.png', link: '/polos' },
  { name: 'Shirts', image: '/images/collections/col_shirts.png', link: '/shirts' },
  { name: 'Co-ords', image: '/images/collections/col_coords.png', link: '/co-ords' },
  { name: 'HD Tees', image: '/images/collections/col_hd_tees.png', link: '/shop?category=premium-hd-tees' },
  { name: 'T-Shirts', image: '/images/collections/col_t_shirts.png', link: '/t-shirts' },
  { name: 'Joggers', image: '/images/collections/col_joggers.png', link: '/joggers' },
  { name: 'Cargo Pants', image: '/images/collections/col_cargo_pants.png', link: '/joggers?sub=cargo' },
  { name: 'Shorts', image: '/images/collections/col_shorts.png', link: '/shorts' },
  { name: 'Oversized Tees', image: '/images/collections/col_oversized_tees.png', link: '/oversized-tees' }
];

const HeroSlider = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!banners.length || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  if (!banners.length) return null;

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    // Minimum 40px swipe distance
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        handleNext();
      } else {
        // Swiped right -> prev
        handlePrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="bg-white pt-0 sm:pt-9 lg:pt-11 pb-4 sm:pb-6">
      {/* Mobile Quick Category Navigation Strip (Only on mobile, exactly matching Nobero reference) */}
      <div className="lg:hidden w-full overflow-x-auto no-scrollbar bg-white border-b border-gray-100 py-2.5 px-3 mb-2">
        <div className="flex items-center gap-3.5 min-w-max">
          {MOBILE_TOP_CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              to={cat.link}
              className="flex flex-col items-center shrink-0 w-[58px] text-center group cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[11px] font-medium text-[#1A1E31] mt-1 leading-tight truncate w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full sm:w-[92%] lg:w-[90%] xl:w-[89%] 2xl:w-[88.5%] mx-auto max-w-[1780px]">
        <div
          className="relative w-full overflow-hidden group select-none bg-gray-50 rounded-none shadow-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Banner Slider Container: Exact 1800/1437 on mobile, 2.68:1 on desktop */}
          <div className="relative w-full aspect-[1800/1437] sm:aspect-[2.2/1] lg:aspect-[2.68/1] overflow-hidden">
            {banners.map((banner, idx) => {
              const isActive = idx === currentIndex;
              return (
                <Link
                  key={banner.id}
                  to={banner.ctaLink || '/shop'}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out block ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <picture className="w-full h-full block bg-gray-100">
                    <source
                      media="(max-width: 640px)"
                      srcSet={banner.mobileImage || banner.desktopImage}
                    />
                    <img
                      src={banner.desktopImage}
                      alt={banner.title}
                      className="w-full h-full object-cover object-center"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      onError={(e) => {
                        const currentSrc = e.currentTarget.src || "";
                        if (currentSrc.includes("hero_banner_hoodies") || currentSrc.includes("HB_Hoodies")) {
                          e.currentTarget.src = "https://nobero.com/cdn/shop/files/HB_Hoodies_Jackets_des.jpg";
                        } else if (currentSrc.includes("hero_banner_shacket")) {
                          e.currentTarget.src = "https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg";
                        } else if (currentSrc.includes("hero_banner_coords")) {
                          e.currentTarget.src = "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg";
                        } else if (currentSrc.includes("hero_banner_chinos")) {
                          e.currentTarget.src = "https://nobero.com/cdn/shop/files/HB_Chinos_des.jpg";
                        } else if (currentSrc.includes("hero_banner_joggers")) {
                          e.currentTarget.src = "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg";
                        } else {
                          e.currentTarget.src = "https://nobero.com/cdn/shop/files/AW_26_Homepage_Banners_Desktop_jpg.jpg";
                        }
                      }}
                    />
                  </picture>
                </Link>
              );
            })}
          </div>

          {/* Desktop Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#242F66] items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#242F66] items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Diamond Pagination Indicators Below Banner on White Background matching Nobero exact styling */}
        <div className="flex items-center justify-center gap-2.5 mt-3 sm:mt-4">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-200 cursor-pointer ${
                idx === currentIndex
                  ? 'w-2.5 h-2.5 bg-[#242F66] border border-[#242F66] rotate-45'
                  : 'w-2 h-2 border border-[#888c9b] bg-transparent hover:border-[#1A1E31] rotate-45'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

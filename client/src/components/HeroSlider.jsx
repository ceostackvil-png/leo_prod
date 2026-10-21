import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <section className="bg-white pt-2 sm:pt-4 pb-4 sm:pb-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div
          className="relative w-full overflow-hidden group select-none bg-gray-50 rounded-none shadow-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Banner Slider Container (Exact 1800:1438 aspect ratio for mobile and 7680:2888 for desktop so zero content/text is cropped) */}
          <div className="relative w-full aspect-[1800/1438] sm:aspect-[16/7] lg:aspect-[7680/2888] max-h-[600px] overflow-hidden">
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
                        if (currentSrc.includes("hero_banner_shacket")) {
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

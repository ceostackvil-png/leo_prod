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
    <div
      className="relative w-full overflow-hidden group select-none bg-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner Slider Container (Exact 1800:1438 aspect ratio for mobile and 7680:2888 for desktop so zero content/text is cropped) */}
      <div className="relative w-full aspect-[1800/1438] sm:aspect-[16/7] lg:aspect-[7680/2888] max-h-[600px]">
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
              <picture className="w-full h-full block">
                <source media="(max-width: 640px)" srcSet={banner.mobileImage || banner.desktopImage} />
                <img
                  src={banner.desktopImage}
                  alt={banner.title}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </picture>
            </Link>
          );
        })}
      </div>

      {/* Desktop Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1A1E31] items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1A1E31] items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-5 sm:w-6 h-1.5 bg-[#242F66]'
                : 'w-1.5 h-1.5 bg-gray-300/80 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

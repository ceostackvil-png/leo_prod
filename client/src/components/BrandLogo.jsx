import React from 'react';

/**
 * BrandLogo - Luxury brand lockup
 * Matches exact aspect ratio and design:
 * [Circular Lion Emblem] + [L E O (Bold Serif) / KING (Muted Sans-serif)]
 */
const BrandLogo = ({
  variant = 'dark', // 'dark' for dark backgrounds (white text), 'light' for light backgrounds (dark text)
  subtitle = 'THE KING',
  size = 'sm', // 'xs', 'sm', 'md', 'lg'
  className = ''
}) => {
  const isLight = variant === 'light';

  // Sizing definitions - bold and prominently sized
  const sizeMap = {
    xs: {
      emblem: 'w-9 h-9 sm:w-10 sm:h-10',
      border: isLight ? 'border border-[#181B2D]' : 'border-0',
      title: 'text-lg sm:text-xl tracking-[0.2em]',
      sub: 'text-[7.5px] sm:text-[8px] tracking-[0.22em] font-bold mt-0.5',
      gap: 'gap-2.5',
    },
    sm: {
      emblem: 'w-11 h-11 sm:w-12 sm:h-12 lg:w-[48px] lg:h-[48px]',
      border: isLight ? 'border-2 lg:border-[2.5px] border-[#181B2D]' : 'border-0',
      title: 'text-xl sm:text-2xl lg:text-[26px] tracking-[0.22em]',
      sub: 'text-[8px] sm:text-[9px] tracking-[0.25em] font-semibold mt-0.5',
      gap: 'gap-2.5 sm:gap-3',
    },
    md: {
      emblem: 'w-14 h-14 sm:w-16 sm:h-16',
      border: isLight ? 'border-[2.5px] border-[#181B2D]' : 'border-0',
      title: 'text-2xl sm:text-3xl tracking-[0.25em]',
      sub: 'text-[9px] sm:text-[10px] tracking-[0.26em] font-semibold mt-1',
      gap: 'gap-3.5',
    },
    lg: {
      emblem: 'w-20 h-20 sm:w-24 sm:h-24',
      border: isLight ? 'border-[3px] border-[#181B2D]' : 'border-0',
      title: 'text-3xl sm:text-5xl tracking-[0.28em]',
      sub: 'text-xs sm:text-sm tracking-[0.28em] font-semibold mt-1.5',
      gap: 'gap-4.5',
    }
  };

  const currentSize = sizeMap[size] || sizeMap.sm;

  return (
    <div className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}>
      {/* 1. Circular LEO Symbol without any yellow background or ring */}
      <div
        className={`relative ${currentSize.emblem} rounded-full ${currentSize.border} flex items-center justify-center bg-black shrink-0 overflow-hidden transition-transform duration-200`}
      >
        <img
          src="/images/logo (1).png"
          alt="LEO Symbol"
          className="w-full h-full object-cover rounded-full scale-105"
        />
      </div>

      {/* 2. Brand Typography Lockup - Bolder and Crisp */}
      <div className="flex flex-col justify-center text-left leading-none">
        <span
          className={`font-bold uppercase ${currentSize.title} ${
            isLight ? 'text-[#111827]' : 'text-white'
          }`}
          style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
        >
          LEO
        </span>
        {subtitle && (
          <span
            className={`font-bold uppercase ${currentSize.sub} ${
              isLight ? 'text-[#4b5563]' : 'text-gray-300'
            }`}
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;

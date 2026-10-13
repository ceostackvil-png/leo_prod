import React from 'react';

/**
 * BrandLogo - Luxury brand lockup
 * Matches exact aspect ratio and design:
 * [Circular Lion Emblem with sleek grey ring] + [L E O (Serif) / KING (Muted Sans-serif)]
 */
const BrandLogo = ({
  variant = 'dark', // 'dark' for dark backgrounds (white text), 'light' for light backgrounds (dark text)
  subtitle = 'KING',
  size = 'md', // 'sm', 'md', 'lg'
  className = ''
}) => {
  const isLight = variant === 'light';

  // Sizing definitions
  const sizeMap = {
    sm: {
      emblem: 'w-9 h-9',
      border: 'border-[1.5px]',
      title: 'text-xl tracking-[0.25em]',
      sub: 'text-[9px] tracking-[0.35em] mt-0.5',
      gap: 'gap-2.5',
    },
    md: {
      emblem: 'w-12 h-12 sm:w-14 sm:h-14',
      border: 'border-[2px]',
      title: 'text-2xl sm:text-[28px] tracking-[0.28em]',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.38em] mt-1.5',
      gap: 'gap-3 sm:gap-3.5',
    },
    lg: {
      emblem: 'w-16 h-16 sm:w-20 sm:h-20',
      border: 'border-[2.5px]',
      title: 'text-3xl sm:text-4xl tracking-[0.3em]',
      sub: 'text-xs sm:text-sm tracking-[0.4em] mt-2',
      gap: 'gap-4',
    }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}>
      {/* 1. Circular LEO Symbol with exact grey border */}
      <div
        className={`relative ${currentSize.emblem} rounded-full p-[2px] ${currentSize.border} border-[#71717a] flex items-center justify-center bg-black shrink-0 overflow-hidden shadow-sm`}
      >
        <img
          src="/images/logo (1).png"
          alt="LEO Symbol"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* 2. Brand Typography Lockup */}
      <div className="flex flex-col justify-center text-left leading-none">
        <span
          className={`font-normal uppercase ${currentSize.title} ${
            isLight ? 'text-[#111827]' : 'text-white'
          }`}
          style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
        >
          LEO
        </span>
        {subtitle && (
          <span
            className={`font-medium uppercase ${currentSize.sub} ${
              isLight ? 'text-[#6b7280]' : 'text-[#9ca3af]'
            }`}
            style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif" }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;

import React from 'react';

/**
 * Pixel-perfect SVG Icons matching reference image exactly
 */

// 1. Banknote Icon for Cash on Delivery
export const CashOnDeliveryIcon = ({ className = "w-[36px] h-[30px] text-[#242f66] shrink-0" }) => (
  <svg
    viewBox="0 0 38 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Front banknote */}
    <rect x="2" y="2" width="34" height="20" rx="2.5" fill="none" />
    <circle cx="19" cy="12" r="4.5" fill="none" />
    <circle cx="7" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="31" cy="12" r="1" fill="currentColor" stroke="none" />
    {/* Secondary bill underneath */}
    <path d="M 2 25.5 C 6 27.5, 25 29, 33 24.5 L 33 22" fill="none" />
  </svg>
);

// 2. Delivery Truck Icon for Free Shipping
export const FreeShippingIcon = ({ className = "w-[36px] h-[28px] text-[#242f66] shrink-0" }) => (
  <svg
    viewBox="0 0 38 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cargo Box */}
    <path d="M 2.5 4 C 2.5 2 4 0.5 6 0.5 L 22.5 0.5 L 22.5 22 L 4 22" fill="none" />
    {/* Horizontal stripe on cargo box */}
    <line x1="2.5" y1="16" x2="22.5" y2="16" />
    {/* Cab */}
    <path d="M 22.5 5 L 29.5 5 C 31.8 5 33.2 6.5 34.2 9 L 36 15 L 36 22 L 22.5 22" fill="none" />
    {/* Wheels */}
    <circle cx="9.5" cy="22" r="3.5" fill="none" />
    <circle cx="29" cy="22" r="3.5" fill="none" />
    <line x1="1.5" y1="22" x2="6" y2="22" />
    <line x1="13" y1="22" x2="25.5" y2="22" />
    <line x1="32.5" y1="22" x2="36" y2="22" />
  </svg>
);

// 3. Receipt / Tag with Return Arrow for Easy Returns
export const EasyReturnsIcon = ({ className = "w-[28px] h-[36px] text-[#242f66] shrink-0" }) => (
  <svg
    viewBox="0 0 30 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Ticket with scalloped bottom edge */}
    <path
      d="M 3 4 C 3 2 4.5 0.5 6.5 0.5 L 23.5 0.5 C 25.5 0.5 27 2 27 4 L 27 31 C 25 29.5 23 29.5 21 31.5 C 19 33.5 17 33.5 15 31.5 C 13 29.5 11 29.5 9 31.5 C 7 33.5 5 33.5 3 31.5 Z"
      fill="none"
    />
    {/* Return curved arrow */}
    <path d="M 11 10.5 L 7.5 14 L 11 17.5" strokeWidth="1.7" />
    <path d="M 8 14 L 14 14 C 17 14 19 15.5 19 18.5 C 19 21.5 17 23 14 23 L 12 23" strokeWidth="1.7" />
  </svg>
);

/**
 * ProductTrustStrip: Mandatory 3-feature rectangular box layout
 * Background: #f7f8fd, centered content, 47px vertical dividers, exact font styling
 */
const ProductTrustStrip = ({ className = "" }) => {
  return (
    <div
      className={`w-full bg-[#f7f8fd] min-h-[86px] h-[86px] sm:h-[87px] rounded-none flex items-center justify-between select-none ${className}`}
      role="region"
      aria-label="Product Guarantee Features"
    >
      {/* 1. Cash on Delivery */}
      <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <CashOnDeliveryIcon className="w-[32px] sm:w-[36px] h-[26px] sm:h-[30px] text-[#242f66] shrink-0" />
          <div className="flex flex-col text-left font-bold text-[#242f66] text-[12px] sm:text-[13.5px] leading-[1.15] tracking-tight uppercase">
            <span>CASH ON</span>
            <span>DELIVERY</span>
          </div>
        </div>
      </div>

      {/* Vertical Divider 1 */}
      <div className="w-[1px] h-[47px] bg-[#e9eaf0] shrink-0" />

      {/* 2. Free Shipping */}
      <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <FreeShippingIcon className="w-[32px] sm:w-[36px] h-[25px] sm:h-[28px] text-[#242f66] shrink-0" />
          <div className="flex flex-col text-left font-bold text-[#242f66] text-[12px] sm:text-[13.5px] leading-[1.15] tracking-tight uppercase">
            <span>FREE</span>
            <span>SHIPPING</span>
          </div>
        </div>
      </div>

      {/* Vertical Divider 2 */}
      <div className="w-[1px] h-[47px] bg-[#e9eaf0] shrink-0" />

      {/* 3. Easy Returns */}
      <div className="flex-1 flex items-center justify-center px-1.5 sm:px-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <EasyReturnsIcon className="w-[26px] sm:w-[28px] h-[33px] sm:h-[36px] text-[#242f66] shrink-0" />
          <div className="flex flex-col text-left font-bold text-[#242f66] text-[12px] sm:text-[13.5px] leading-[1.15] tracking-tight uppercase">
            <span>EASY</span>
            <span>RETURNS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTrustStrip;

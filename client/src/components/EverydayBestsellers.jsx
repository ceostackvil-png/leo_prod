import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

// Exact 4 Nobero Bestseller items matching the reference layout
const BESTSELLERS_COLLECTION = [
  {
    id: 'leo-5391274475686',
    slug: 'wanderer',
    title: 'Wanderer - Travel Hoodie',
    image: '/images/products/Black_PDP_1.png',
    badge: 'BESTSELLER',
    rating: 4.8,
    reviewCount: 186,
    price: 2599,
    originalPrice: 3999,
    discountAmount: '₹1,400 OFF',
    lowestPriceText: 'Lowest price in last 30 days'
  },
  {
    id: 'leo-8243594395814',
    slug: 'travel-joggers',
    title: 'Wanderer - Travel Joggers',
    image: '/images/products/Oatmeal_ea7da286-45b3-4c25-a3ad-7795f599659f.jpg',
    badge: 'BESTSELLER',
    rating: 4.8,
    reviewCount: 214,
    price: 1799,
    originalPrice: 1999,
    discountAmount: '₹200 OFF',
    lowestPriceText: 'Lowest price in last 30 days'
  },
  {
    id: 'leo-8593158209702',
    slug: 'classic-zipper-hoodie-64',
    title: 'Classic Zipper Hoodie',
    image: '/images/products/NavyBlue_6e9adec2-c1a6-4791-8395-d09beff283e8.jpg',
    badge: 'BESTSELLER',
    rating: 4.8,
    reviewCount: 202,
    price: 1499,
    originalPrice: 3199,
    discountAmount: '₹1,700 OFF',
    lowestPriceText: 'Lowest price in last 30 days'
  },
  {
    id: 'leo-8555440242854',
    slug: 'mock-neck-sweatshirt-7',
    title: 'Mock Neck Sweatshirt',
    image: '/images/products/WhatsAppImage2024-12-21at10.18.18_fcf49d17-8a38-4cbf-978f-e02347872ccd.jpg',
    badge: null,
    rating: 4.8,
    reviewCount: 354,
    price: 1499,
    originalPrice: 1999,
    discountAmount: '₹500 OFF',
    lowestPriceText: 'Lowest price in last 30 days'
  }
];

const EverydayBestsellers = () => {
  return (
    <section className="py-8 sm:py-12 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Centered Section Header (Exact Nobero Layout) */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl lg:text-[26px] font-bold font-sans tracking-tight">
            Our Bestsellers
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-normal">
            Don't miss out Top Selling styles
          </p>
        </div>

        {/* Product Cards Grid: 4 products in 1 single row on desktop, 2x2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full">
          {BESTSELLERS_COLLECTION.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col select-none cursor-pointer"
            >
              <Link to={`/product/${item.slug || item.id}`} className="block w-full">
                {/* Image Container with 2:3 Portrait Aspect Ratio */}
                <div className="relative w-full aspect-[2/3] overflow-hidden bg-[#ECEEF0] rounded-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-sm"
                  />

                  {/* Top-Left Bestseller Ribbon Badge */}
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 z-10 bg-[#dec562] text-[#0f142b] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-none tracking-wider uppercase shadow-xs">
                      {item.badge}
                    </span>
                  )}

                  {/* Bottom-Left Rating Pill */}
                  {item.rating && (
                    <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-sm flex items-center gap-1 text-[10px] font-bold text-[#1A1E31] shadow-xs">
                      <span className="text-[#F59E0B]">★</span>
                      <span>{item.rating.toFixed(1)}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600 font-normal">{item.reviewCount}</span>
                    </div>
                  )}
                </div>

                {/* Card Content: Title, Price Line, and Lowest Price Note */}
                <div className="pt-2.5 pb-1 flex flex-col space-y-1">
                  <h3 className="text-[13px] sm:text-[14px] font-normal sm:font-medium text-[#1A1E31] group-hover:text-black line-clamp-1 leading-snug">
                    {item.title}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm sm:text-base font-bold text-[#1A1E31]">
                      ₹{Number(item.price).toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{Number(item.originalPrice).toLocaleString('en-IN')}
                      </span>
                    )}
                    {item.discountAmount && (
                      <span className="text-xs font-semibold text-[#00B852]">
                        {item.discountAmount}
                      </span>
                    )}
                  </div>

                  {/* Lowest Price Note in Purple */}
                  {item.lowestPriceText ? (
                    <span className="text-[11px] font-normal text-[#7C3AED] leading-tight">
                      {item.lowestPriceText}
                    </span>
                  ) : (
                    <span className="text-[11px] invisible leading-tight select-none">
                      &nbsp;
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Dash & Dot Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <span className="w-5 h-1 bg-[#1A1E31] rounded-full" />
          <span className="w-1.5 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Shop All Products Outlined CTA Button matching Nobero Reference */}
        <div className="mt-6 text-center">
          <Link
            to="/shop?filter=bestsellers"
            className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-[#242F66] border border-[#242F66] px-8 py-2.5 hover:bg-[#242F66] hover:text-white transition-colors tracking-wide"
          >
            Shop All Products
          </Link>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default EverydayBestsellers;

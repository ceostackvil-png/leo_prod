import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

// Exactly the 4 handpicked Nobero Favourite items
const FAVOURITES_COLLECTION = [
  {
    id: "fav-1",
    title: "Oversized Moses Co-ord Set",
    slug: "oversized-moses-co-ord-set",
    color: "Olive Green",
    image: "/images/products/Moses_Oilve_Green_copy_1.jpg",
    rating: 4.5,
    reviewCount: 8,
    price: 1599,
    originalPrice: 2999,
    discountAmount: "₹1,400 OFF",
    lowestPriceText: "Lowest price in last 30 days"
  },
  {
    id: "fav-2",
    title: "2-Pack Zip Pocket Joggers",
    slug: "2-pack-zip-pocket-joggers",
    color: "Black & Arctic",
    image: "/images/products/BlackArctic_841f6a33-bc4b-432a-b711-8d797a9c0eb8.jpg",
    rating: 4.8,
    reviewCount: 38,
    price: 1999,
    originalPrice: 2999,
    discountAmount: "₹1,000 OFF",
    lowestPriceText: null
  },
  {
    id: "fav-3",
    title: "Oversized Moses Co-ord Set",
    slug: "oversized-moses-co-ord-set",
    color: "Mauve",
    image: "/images/products/Moses_Mauve_1.jpg",
    rating: 5.0,
    reviewCount: 3,
    price: 1599,
    originalPrice: 2999,
    discountAmount: "₹1,400 OFF",
    lowestPriceText: "Lowest price in last 30 days"
  },
  {
    id: "fav-4",
    title: "Oversized Moses Co-ord Set",
    slug: "oversized-moses-co-ord-set",
    color: "Sand",
    image: "/images/products/Moses_Sand_1.jpg",
    badge: "BESTSELLER",
    rating: 4.6,
    reviewCount: 5,
    price: 1599,
    originalPrice: 2999,
    discountAmount: "₹1,400 OFF",
    lowestPriceText: "Lowest price in last 30 days"
  }
];

const LeoFavourites = () => {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <StorefrontContainer>
        {/* Section Heading matching Nobero Favourite exact layout */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl lg:text-[26px] font-bold font-sans tracking-tight">
            LEO Favourite
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-normal">
            Handpicked for you
          </p>
        </div>

        {/* Product Cards Track: Exactly 4 products in 1 single row on desktop, 2x2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full">
          {FAVOURITES_COLLECTION.map((item) => {
            const productUrl = `/shop?search=${encodeURIComponent(item.title)}`;

            return (
              <div
                key={item.id}
                className="group flex flex-col select-none cursor-pointer"
              >
                <Link to={productUrl} className="block w-full">
                  {/* Image Container with 2:3 Portrait Aspect Ratio */}
                  <div className="relative w-full aspect-[2/3] overflow-hidden bg-[#ECEEF0] rounded-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 rounded-sm"
                    />

                    {/* Top-Left Bestseller Ribbon Badge (for Sand co-ord) */}
                    {item.badge && (
                      <span className="absolute top-2.5 left-2.5 z-10 bg-[#F7B614] text-[#1A1E31] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide uppercase shadow-xs">
                        {item.badge}
                      </span>
                    )}

                    {/* Bottom-Left Rating Pill (e.g. ★ 4.5 | 8) */}
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

                    {/* Price Row: Bold Selling Price, Line-through Original Price, Bold Green Discount */}
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
            );
          })}
        </div>

        {/* Dash & Dot Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <span className="w-5 h-1 bg-[#1A1E31] rounded-full" />
          <span className="w-1.5 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Shop All Products Outlined CTA Button matching Nobero Reference */}
        <div className="mt-6 text-center">
          <Link
            to="/co-ords"
            className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-[#242F66] border border-[#242F66] px-8 py-2.5 hover:bg-[#242F66] hover:text-white transition-colors tracking-wide"
          >
            Shop All Products
          </Link>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default LeoFavourites;

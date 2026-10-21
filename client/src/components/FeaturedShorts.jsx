import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import StorefrontContainer from './StorefrontContainer';

const FEATURED_SHORTS = [
  {
    id: 'shorts-chocolate',
    name: 'Air-Flex Weekender Chino Shorts',
    colorName: 'Chocolate Fondant',
    image: '/images/shorts_chocolate.jpg',
    price: 999,
    originalPrice: 1999,
    discount: '50% OFF',
    lowestPrice: 899,
    rating: 4.8,
    reviews: 340,
    colors: ['#4A2E18', '#D4B996', '#1E2A38', '#556B2F'],
    moreColorsCount: 4,
    link: '/shop?category=shorts'
  },
  {
    id: 'shorts-olive',
    name: 'Everyday Transit Cargo Shorts',
    colorName: 'Military Olive',
    image: '/images/shorts_olive.jpg',
    price: 999,
    originalPrice: 1999,
    discount: '50% OFF',
    lowestPrice: 899,
    rating: 4.9,
    reviews: 412,
    colors: ['#556B2F', '#1F2937', '#6B7280', '#C2B280'],
    moreColorsCount: 4,
    link: '/shop?category=shorts'
  }
];

const FeaturedShorts = () => {
  const { addToCart, setIsDrawerOpen } = useCart();
  const [addedIds, setAddedIds] = useState({});

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      color: item.colorName,
      size: 'M',
      quantity: 1
    });
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
      setIsDrawerOpen(true);
    }, 1200);
  };

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#242F66] block mb-1">
              SUMMER ESSENTIALS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#212121]">
              Shorts
            </h2>
            <p className="text-xs sm:text-sm text-[#666875] mt-1 font-medium">
              Engineered stretch comfort designed for versatile all-day movement.
            </p>
          </div>
          <Link
            to="/shop?category=shorts"
            className="text-xs font-bold text-[#282C3F] hover:text-black inline-flex items-center gap-1 uppercase tracking-wider"
          >
            VIEW ALL SHORTS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Card Featured Showcase (Full-width on mobile, 2-column on desktop with Sharp Edges) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FEATURED_SHORTS.map((item) => (
            <div
              key={item.id}
              className="bg-[#F7F8FA] rounded-none overflow-hidden border border-gray-200/80 hover:shadow-md transition-all group flex flex-col justify-between product-card sharp-card"
            >
              {/* Product Image */}
              <Link to={item.link} className="block relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-gray-100 rounded-none">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 rounded-none"
                />
                <span className="absolute top-3 left-3 bg-[#008C2D] text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-xs">
                  {item.discount}
                </span>
              </Link>

              {/* Product Info */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  {/* Rating & Color Dots */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {item.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-none border border-white shadow-xs inline-block"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                      <span className="text-[10px] text-gray-500 font-semibold">
                        +{item.moreColorsCount}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 bg-white px-2 py-0.5 rounded-none border border-gray-200 shadow-2xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-gray-400 text-[10px]">({item.reviews})</span>
                    </div>
                  </div>

                  <Link to={item.link}>
                    <h3 className="text-sm sm:text-base font-bold text-[#212121] group-hover:text-[#282C3F] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-bold text-[#121212]">
                      ₹{item.price}
                    </span>
                    <span className="text-xs text-[#666875] line-through">
                      ₹{item.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-[#008C2D]">
                      {item.discount}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8941E8] font-medium mt-0.5">
                    Lowest price in last 30 days: ₹{item.lowestPrice}
                  </p>
                </div>

                {/* Add to Cart CTA with Sharp Edges */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-[#242F66] hover:bg-[#1a234f] active:scale-[0.99] text-white text-xs font-bold py-2.5 rounded-none transition-all flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider"
                >
                  {addedIds[item.id] ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" /> ADDED TO CART
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> ADD TO CART
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default FeaturedShorts;

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
  },
  {
    id: 'shorts-navy',
    name: 'Zip Pocket Transit Shorts',
    colorName: 'Classic Navy',
    image: '/images/products/ZipShortsPackFeb3_0e8998a8-532c-4250-8ed5-bbdd484053f6.jpg',
    price: 899,
    originalPrice: 1799,
    discount: '50% OFF',
    lowestPrice: 849,
    rating: 4.8,
    reviews: 290,
    colors: ['#1B263B', '#415A77', '#778DA9'],
    moreColorsCount: 3,
    link: '/shop?category=shorts'
  },
  {
    id: 'shorts-sky',
    name: 'Relaxed Waffle Resort Shorts',
    colorName: 'Sky Blue',
    image: '/images/products/ZipShortsPackFeb2_38194181-feaf-4c8e-9f59-7d4e080a7f68.jpg',
    price: 899,
    originalPrice: 1799,
    discount: '50% OFF',
    lowestPrice: 849,
    rating: 4.9,
    reviews: 320,
    colors: ['#A0C4E2', '#D2C6B6', '#333333'],
    moreColorsCount: 3,
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
    <section className="py-8 sm:py-12 bg-[#F8F9FA] border-b border-gray-100">
      <StorefrontContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#242F66] block mb-1">
              SEASON'S FAVORITES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold uppercase tracking-tight text-[#1A1E31]">
              Shorts
            </h2>
            <p className="text-xs sm:text-sm text-[#666875] mt-1 font-normal">
              Engineered stretch comfort designed for versatile all-day movement.
            </p>
          </div>
          <Link
            to="/shop?category=shorts"
            className="text-xs font-bold text-[#1A1E31] hover:text-black inline-flex items-center gap-1 uppercase tracking-wider"
          >
            VIEW ALL SHORTS <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Card Featured Grid (2 cols mobile, 4 cols desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {FEATURED_SHORTS.map((item) => (
            <div
              key={item.id}
              className="bg-[#F7F8FA] rounded-none overflow-hidden border border-gray-200/80 hover:shadow-md transition-all group flex flex-col justify-between product-card sharp-card"
            >
              {/* Product Image */}
              <Link to={item.link} className="block relative aspect-square sm:aspect-[4/5] overflow-hidden bg-gray-100 rounded-none">
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

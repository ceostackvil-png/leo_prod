import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addedSize, setAddedSize] = useState(null);

  const currentColor = product.colors?.[activeColorIdx] || product.colors?.[0] || {};
  const isWishlisted = isInWishlist(product.id);

  // Flip to secondary image on hover
  const displayImage = isHovered && (currentColor.secondaryImage || product.secondaryImage)
    ? (currentColor.secondaryImage || product.secondaryImage)
    : (currentColor.image || product.image);

  const handleQuickAdd = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, currentColor.name || 'Standard', size.name, 1);
    setAddedSize(size.name);
    setTimeout(() => {
      setAddedSize(null);
      setShowQuickSizes(false);
    }, 1200);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Product Image Container (Exact Nobero 2:3 / 3:4 Aspect Ratio) */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#F7F8FA] border border-gray-100 mb-2">
        <Link to={`/product/${product.slug || product.id}`} className="block w-full h-full">
          <img
            src={displayImage}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Bestseller Badge */}
        {product.isBestseller && (
          <span className="absolute top-2 left-2 bg-[#282C3F] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
            BESTSELLER
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-white text-rose-600 shadow'
              : 'bg-white/80 hover:bg-white text-[#212121] hover:text-rose-600 shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600' : ''}`}
          />
        </button>

        {/* Rating Badge on Image */}
        {product.rating && (
          <div className="absolute bottom-2 left-2 z-10 bg-white/95 px-1.5 py-0.5 rounded text-[10px] font-bold text-[#212121] flex items-center gap-1 shadow-sm">
            <span>{product.rating}</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[#666875] font-normal">({product.reviewCount || 100})</span>
          </div>
        )}

        {/* Quick Add Size Overlay on Card Hover */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-white/95 p-2 transition-transform duration-200 border-t border-gray-200 ${
            showQuickSizes ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-1 text-[10px] font-bold text-gray-500 uppercase">
            <span>Select Size:</span>
            <button onClick={() => setShowQuickSizes(false)} className="text-gray-400 hover:text-black">✕</button>
          </div>
          <div className="flex items-center gap-1">
            {product.sizes?.map((size) => {
              const sizeName = typeof size === 'string' ? size : size.name;
              return (
                <button
                  key={sizeName}
                  onClick={(e) => handleQuickAdd(e, sizeName)}
                  className={`flex-1 py-1 text-[10px] font-bold rounded border transition-all ${
                    addedSize === sizeName
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white hover:bg-[#282C3F] hover:text-white border-gray-300 text-[#212121]'
                  }`}
                >
                  {addedSize === sizeName ? <Check className="w-3 h-3 mx-auto" /> : sizeName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Add Hover Trigger */}
        {!showQuickSizes && (
          <button
            onClick={() => setShowQuickSizes(true)}
            className="absolute inset-x-0 bottom-0 z-10 bg-[#282C3F]/90 hover:bg-[#282C3F] text-white py-2 text-[11px] font-bold uppercase tracking-wider hidden lg:flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
          </button>
        )}
      </div>

      {/* Product Details Beneath Image */}
      <div className="flex flex-col space-y-0.5">
        
        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="flex items-center gap-1 mb-1">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setActiveColorIdx(idx)}
                onMouseEnter={() => setActiveColorIdx(idx)}
                className={`w-3 h-3 rounded-full border transition-all ${
                  idx === activeColorIdx
                    ? 'ring-1.5 ring-black ring-offset-1 scale-110'
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Product Title */}
        <Link
          to={`/product/${product.slug || product.id}`}
          className="text-[13px] sm:text-[14px] font-semibold text-[#212121] hover:text-[#282C3F] truncate transition-colors"
        >
          {product.title}
        </Link>

        {/* Price Breakdown */}
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-sm sm:text-base font-bold text-[#212121]">
            ₹{product.price}
          </span>
          {product.mrp && (
            <span className="text-xs text-[#666875] line-through">
              ₹{product.mrp}
            </span>
          )}
          {product.discount && (
            <span className="text-xs font-semibold text-[#00B852]">
              {product.discount}
            </span>
          )}
        </div>

        {/* Lowest price note */}
        {product.lowestPrice30Days && (
          <p className="text-[10px] text-[#00B852] font-medium">
            Lowest price in 30 days: ₹{product.lowestPrice30Days}
          </p>
        )}

      </div>
    </div>
  );
};

export default ProductCard;

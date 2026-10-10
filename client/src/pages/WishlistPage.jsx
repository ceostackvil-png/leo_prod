import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import StorefrontContainer from '../components/StorefrontContainer';

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-gray-200 mb-6 gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Heart className="w-3.5 h-3.5 fill-rose-600" />
              <span>SAVED STYLES</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#212121]">
              My Wishlist ({wishlist.length})
            </h1>
          </div>

          <Link
            to="/men"
            className="text-xs sm:text-sm font-bold text-[#282C3F] hover:underline inline-flex items-center gap-1 transition-colors"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Wishlist Items Grid */}
        {wishlist.length === 0 ? (
          <div className="py-16 text-center bg-[#F7F8FA] rounded-xl border border-gray-200 p-8">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400 shadow-sm border border-gray-200">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#212121]">Your wishlist is empty</h3>
            <p className="text-xs text-[#666875] mt-1 max-w-sm mx-auto">
              Tap the heart icon on any Men's oversized tee, polo, or cargo jogger to save it here.
            </p>
            <Link
              to="/men"
              className="mt-5 inline-flex items-center gap-2 bg-[#282C3F] hover:bg-[#212121] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-md transition-all shadow-sm"
            >
              EXPLORE MEN'S COLLECTION <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </StorefrontContainer>
    </div>
  );
};

export default WishlistPage;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Search, Heart, User } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const BottomNav = ({ onOpenSearch }) => {
  const location = useLocation();
  const { wishlistCount } = useWishlist();
  const { user, setIsAuthModalOpen } = useAuth();

  // Hide bottom navigation on Product Detail Page (which has its own Sticky Buy Bar) and on Checkout
  if (location.pathname.startsWith('/product/') || location.pathname === '/checkout') {
    return null;
  }

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 h-14 items-center">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            isActive('/') ? 'text-[#282C3F]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className={`w-5 h-5 ${isActive('/') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </Link>

        {/* 2. Shop / Categories */}
        <Link
          to="/shop"
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            isActive('/shop') || isActive('/men') ? 'text-[#282C3F]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Grid className={`w-5 h-5 ${isActive('/shop') || isActive('/men') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-semibold mt-0.5">Categories</span>
        </Link>

        {/* 3. Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center h-full text-gray-500 hover:text-[#282C3F] transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 stroke-2" />
          <span className="text-[10px] font-semibold mt-0.5">Search</span>
        </button>

        {/* 4. Wishlist */}
        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center h-full transition-colors ${
            isActive('/wishlist') ? 'text-[#282C3F]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isActive('/wishlist') ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D9232D] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Wishlist</span>
        </Link>

        {/* 5. Account / Profile */}
        <button
          onClick={() => {
            if (!user) setIsAuthModalOpen(true);
            else window.location.href = '/account';
          }}
          className={`flex flex-col items-center justify-center h-full transition-colors ${
            isActive('/account') ? 'text-[#282C3F]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className={`w-5 h-5 ${isActive('/account') ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] font-semibold mt-0.5">{user ? 'Account' : 'Login'}</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;

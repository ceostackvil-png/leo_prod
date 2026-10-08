import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import MegaMenu from './MegaMenu';
import SearchDrawer from './SearchDrawer';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);

  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, setIsAuthModalOpen, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.getCategories();
        if (res.success) {
          setCategories(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaCategory(null);
  }, [location.pathname, location.search]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        {/* 1. Top Announcement Bar (Exact Nobero Style) */}
        <div className="h-8 bg-[#242F66] text-white text-[12px] sm:text-[13px] font-normal flex items-center justify-center px-4 overflow-hidden select-none">
          <div className="announcement-bar-track text-center font-medium">
            <span>100% Refund Guarantee if you don't ❤️ the product. Shop with Confidence.</span>
          </div>
        </div>

        {/* 2. Main Navigation Bar (Exact Nobero Proportions: 80px desktop, 56px mobile) */}
        <div className="border-b border-[#E5E7EB] bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-[56px] lg:h-[80px]">
              
              {/* Left Section: Mobile Menu + Logo */}
              <div className="flex items-center gap-3">
                {/* Mobile Hamburger & Search */}
                <div className="flex items-center gap-1.5 lg:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-1.5 text-[#242F66] focus:outline-none"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 text-[#242F66] focus:outline-none"
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Brand Logo: LEO (Clean left-aligned with proper margin) */}
                <Link to="/" className="flex items-center shrink-0 pr-4 sm:pr-8 lg:pr-12">
                  <img
                    src="/images/logo (1).png"
                    alt="LEO"
                    className="h-8 sm:h-10 lg:h-11 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Links (Men's Fashion Only) */}
              <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 h-full flex-1 justify-start">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="h-full flex items-center"
                    onMouseEnter={() => {
                      if (cat.groups) setActiveMegaCategory(cat);
                      else setActiveMegaCategory(null);
                    }}
                  >
                    <Link
                      to={`/shop?category=${cat.slug}`}
                      className={`text-[13px] uppercase font-bold tracking-wide transition-colors py-7 border-b-2 flex items-center gap-1 ${
                        cat.isSale
                          ? 'text-[#D9534F] border-transparent hover:border-[#D9534F]'
                          : 'text-[#1A1E31] hover:text-[#242F66] border-transparent hover:border-[#242F66]'
                      }`}
                    >
                      {cat.name}
                      {cat.groups && <ChevronDown className="w-3 h-3 text-gray-400" />}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Right Utility Icons (Search, Wishlist, Account, Cart) */}
              <div className="flex items-center space-x-2 sm:space-x-3.5 shrink-0 pl-2">
                {/* Search Button */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden lg:flex p-2 text-[#242F66] hover:text-black transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Wishlist Icon */}
                <Link
                  to="/wishlist"
                  className="relative p-2 text-[#242F66] hover:text-black transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-[#D9534F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* User Account / Profile (Matching Nobero Account Behavior) */}
                <div className="relative group">
                  <button
                    onClick={() => {
                      if (!user) setIsAuthModalOpen(true);
                      else navigate('/account');
                    }}
                    className="p-2 text-[#242F66] hover:text-black transition-colors flex items-center gap-1"
                    aria-label="Account"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  {/* Account Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50">
                    <div className="w-56 bg-white border border-gray-200 shadow-xl rounded-xl py-2 text-xs font-semibold text-[#1A1E31]">
                      {user ? (
                        <>
                          <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Welcome Back</p>
                            <p className="font-bold text-sm text-[#242F66] truncate">{user.name}</p>
                            <p className="text-[11px] text-gray-500 truncate">{user.email || user.phone}</p>
                          </div>
                          <div className="py-1">
                            <Link to="/account" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors">
                              My Orders
                            </Link>
                            <Link to="/wishlist" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors">
                              Saved Wishlist
                            </Link>
                            <Link to="/track-order" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors">
                              Track Live Order
                            </Link>
                            <Link to="/admin" className="flex items-center px-4 py-2 text-amber-700 hover:bg-amber-50 transition-colors">
                              Admin Portal
                            </Link>
                          </div>
                          <div className="border-t border-gray-100 pt-1">
                            <button
                              onClick={logout}
                              className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 transition-colors font-bold"
                            >
                              Sign Out
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-3 text-center space-y-2">
                          <p className="text-[11px] text-gray-600 font-medium">Log in to view your orders & saved wishlist</p>
                          <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="w-full bg-[#242F66] hover:bg-[#1A1E31] text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                          >
                            Log In / Sign Up
                          </button>
                          <div className="pt-2 border-t border-gray-100 text-left space-y-1">
                            <Link to="/track-order" className="block px-1 py-1 text-gray-600 hover:text-black">
                              Track Order
                            </Link>
                            <Link to="/admin" className="block px-1 py-1 text-amber-700 hover:text-amber-900">
                              Admin Portal
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cart Bag Icon */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative p-2 text-[#242F66] hover:text-black transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalItemCount > 0 && (
                    <span className="absolute top-1 right-1 bg-[#242F66] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItemCount}
                    </span>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Mega Menu Overlay on Category Hover */}
        {activeMegaCategory && (
          <MegaMenu
            category={activeMegaCategory}
            onClose={() => setActiveMegaCategory(null)}
          />
        )}
      </header>

      {/* Search Drawer */}
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-right">
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                <img
                  src="/images/logo (1).png"
                  alt="LEO"
                  className="h-8 w-auto object-contain"
                />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Men's categories list */}
              <div className="p-4 space-y-1">
                {categories.map((cat) => {
                  const isExpanded = expandedMobileCat === cat.id;
                  return (
                    <div key={cat.id} className="border-b border-gray-100 py-1">
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/shop?category=${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`text-xs font-bold uppercase tracking-wider py-2 ${
                            cat.isSale ? 'text-[#D9534F]' : 'text-[#1A1E31]'
                          }`}
                        >
                          {cat.name}
                        </Link>
                        {cat.groups && (
                          <button
                            onClick={() => setExpandedMobileCat(isExpanded ? null : cat.id)}
                            className="p-2 text-gray-400"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180 text-black' : ''}`} />
                          </button>
                        )}
                      </div>

                      {isExpanded && cat.groups && (
                        <div className="pl-3 pb-2 space-y-3 bg-gray-50 rounded-lg p-3 mt-1 text-xs">
                          {cat.groups.map((grp, i) => (
                            <div key={i} className="space-y-1">
                              <span className="font-bold text-[11px] text-[#242F66] uppercase block">{grp.title}</span>
                              <div className="pl-2 space-y-1">
                                {grp.items.map((it, idx) => (
                                  <Link
                                    key={idx}
                                    to={`/shop?category=${it.slug}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-gray-600 hover:text-black py-0.5"
                                  >
                                    {it.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Utility links */}
              <div className="p-4 pt-1 space-y-2.5 text-xs font-bold text-[#1A1E31]">
                <Link to="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span>Track Live Order</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span>My Wishlist ({wishlistCount})</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2 text-amber-700">
                  <span>Admin Portal</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              {user ? (
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#1A1E31]">{user.name}</p>
                    <p className="text-[10px] text-gray-500">{user.email || user.phone}</p>
                  </div>
                  <button onClick={logout} className="font-bold text-rose-600">Logout</button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-[#242F66] text-white text-xs font-bold py-2.5 rounded-md uppercase tracking-wider"
                >
                  Log In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

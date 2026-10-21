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
import BottomNav from './BottomNav';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import BrandLogo from './BrandLogo';

const SEARCH_KEYWORDS = ['“T-shirts”', '“Polos”', '“Joggers”', '“Hoodies”', '“Co-ords”'];

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState(null);
  const [keywordIndex, setKeywordIndex] = useState(0);

  const { totalItemCount, setIsDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, setIsAuthModalOpen, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active category from route
  const getActiveFromRoute = (fallback = 'men') => {
    const searchParams = new URLSearchParams(location.search);
    const catQuery = searchParams.get('category');
    if (catQuery) {
      if (catQuery === 't-shirts') return 'oversized-tees';
      return catQuery;
    }
    const path = location.pathname.replace(/^\/+/, '').toLowerCase();
    if (!path || path === 'men') return 'men';
    if (path === 'tees' || path === 't-shirts' || path === 'oversized-tees') return 'oversized-tees';
    if (path === 'polos') return 'polos';
    if (path === 'shirts') return 'shirts';
    if (path === 'hoodies' || path === 'jackets') return 'hoodies';
    if (path === 'joggers') return 'joggers';
    if (path === 'shorts') return 'shorts';
    if (path === 'co-ords') return 'co-ords';
    if (path === 'travel') return 'travel';
    if (path === 'sale') return 'sale';
    return fallback;
  };

  const [selectedCatId, setSelectedCatId] = useState(() => getActiveFromRoute('men'));
  const [hoveredCatId, setHoveredCatId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.getCategories();
        if (res.success) {
          const ORDER = ['men', 'travel', 'polos', 'hoodies', 'shirts', 'oversized-tees', 'co-ords', 'joggers', 'shorts', 'sale'];
          const NAME_MAP = {
            'men': 'Men',
            'travel': 'Travel',
            'polos': 'Polos',
            'hoodies': 'Hoodies',
            'shirts': 'Shirts',
            'oversized-tees': 'Tees',
            'co-ords': 'Co-ords',
            'joggers': 'Joggers',
            'shorts': 'Shorts',
            'sale': 'Sale'
          };

          const rawList = res.data.filter(cat => cat.id !== 'women' && cat.id !== 'new-arrivals');
          
          // Map to Title Case and sort according to exact reference image order
          const formatted = rawList.map(cat => ({
            ...cat,
            name: NAME_MAP[cat.id] || cat.name
          })).sort((a, b) => {
            const idxA = ORDER.indexOf(a.id);
            const idxB = ORDER.indexOf(b.id);
            return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
          });

          setCategories(formatted);
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % SEARCH_KEYWORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaCategory(null);
    setSelectedCatId(prev => getActiveFromRoute(prev || 'men'));
  }, [location.pathname, location.search]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        {/* 1. Top Announcement Bar (Continuous Right to Left Infinite Marquee) */}
        <div className="h-8 bg-[#1A1E31] text-white text-[12px] sm:text-[13px] font-normal flex items-center overflow-hidden select-none relative">
          <div className="flex animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-8 sm:gap-16 px-4 sm:px-8 shrink-0">
              <span className="font-medium tracking-wide">100% Refund Guarantee if you don't ❤️ the product. Shop with Confidence.</span>
              <span className="text-white/40">•</span>
              <span className="font-medium tracking-wide">Free Express Shipping on all Prepaid Orders across India</span>
              <span className="text-white/40">•</span>
              <span className="font-medium tracking-wide">Heavyweight 240 GSM French Terry Collection Now Live</span>
              <span className="text-white/40">•</span>
            </div>
            <div className="flex items-center gap-8 sm:gap-16 px-4 sm:px-8 shrink-0" aria-hidden="true">
              <span className="font-medium tracking-wide">100% Refund Guarantee if you don't ❤️ the product. Shop with Confidence.</span>
              <span className="text-white/40">•</span>
              <span className="font-medium tracking-wide">Free Express Shipping on all Prepaid Orders across India</span>
              <span className="text-white/40">•</span>
              <span className="font-medium tracking-wide">Heavyweight 240 GSM French Terry Collection Now Live</span>
              <span className="text-white/40">•</span>
            </div>
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
                    className="p-1.5 text-[#282C3F] focus:outline-none"
                    aria-label="Open menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 text-[#282C3F] focus:outline-none"
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Brand Logo: LEO KING */}
                <Link to="/" className="flex items-center shrink-0 pr-4 sm:pr-8 lg:pr-10 hover:opacity-90 transition-opacity">
                  <BrandLogo variant="light" subtitle="KING" size="sm" />
                </Link>
              </div>

              {/* Desktop Navigation Links (Title Case, Clean Sans, No Chevrons, Exact Highlighting) */}
              <nav
                className="hidden lg:flex items-center space-x-6 xl:space-x-8 h-full flex-1 justify-start ml-2"
                onMouseLeave={() => setHoveredCatId(null)}
              >
                {categories.map((cat) => {
                  const currentHighlightId = hoveredCatId || (activeMegaCategory ? activeMegaCategory.id : selectedCatId);
                  const isHighlighted = currentHighlightId === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className="h-full flex items-center"
                      onMouseEnter={() => {
                        setHoveredCatId(cat.id);
                        if (cat.groups) setActiveMegaCategory(cat);
                        else setActiveMegaCategory(null);
                      }}
                    >
                      <Link
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => {
                          setSelectedCatId(cat.id);
                          if (cat.groups) {
                            setActiveMegaCategory(prev => prev?.id === cat.id ? null : cat);
                          } else {
                            setActiveMegaCategory(null);
                          }
                        }}
                        className={`h-full flex items-center text-[14px] transition-all duration-150 border-b-[2.5px] -mb-[1px] select-none ${
                          isHighlighted
                            ? 'text-[#1A1E31] font-bold border-[#242F66]'
                            : 'text-[#4B5563] font-medium border-transparent hover:text-[#1A1E31]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.isNew && (
                          <span
                            className={`ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider transition-opacity ${
                              isHighlighted
                                ? 'bg-[#4285F4] text-white opacity-100'
                                : 'bg-[#4285F4]/40 text-white/90'
                            }`}
                          >
                            New
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Right Utility Icons (Search Bar, Wishlist, Account, Cart) */}
              <div className="flex items-center space-x-2 sm:space-x-3.5 shrink-0 pl-2">
                {/* Search Bar matching Nobero reference */}
                <div className="hidden lg:flex items-center mr-1">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="w-[215px] xl:w-[250px] 2xl:w-[270px] h-[38px] xl:h-[40px] px-3.5 flex items-center justify-between bg-white border border-[#E8E9EA] hover:border-[#CBD5E1] rounded-none text-left transition-all duration-150 group cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    aria-label="Search products"
                  >
                    <span className="text-[13px] text-[#9698A0] font-normal truncate select-none">
                      Try searching {SEARCH_KEYWORDS[keywordIndex]}
                    </span>
                    <Search className="w-[18px] h-[18px] text-[#181B2D] shrink-0 stroke-[1.8] group-hover:scale-105 transition-transform ml-2" />
                  </button>
                </div>

                {/* Wishlist Icon */}
                <Link
                  to="/wishlist"
                  className="relative p-2 text-[#282C3F] hover:text-black transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-[#D9232D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
                    className="p-2 text-[#282C3F] hover:text-black transition-colors flex items-center gap-1"
                    aria-label="Account"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  {/* Account Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50">
                    <div className="w-56 bg-white border border-gray-200 shadow-xl rounded-xl py-2 text-xs font-semibold text-[#212121]">
                      {user ? (
                        <>
                          <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Welcome Back</p>
                            <p className="font-bold text-sm text-[#282C3F] truncate">{user.name}</p>
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
                            className="w-full bg-[#282C3F] hover:bg-[#212121] text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
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
                  className="relative p-2 text-[#282C3F] hover:text-black transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {totalItemCount > 0 && (
                    <span className="absolute top-1 right-1 bg-[#282C3F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <BrandLogo variant="light" subtitle="KING" size="sm" />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Search Bar */}
              <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full h-[40px] px-3.5 flex items-center justify-between bg-white border border-[#E8E9EA] rounded-[6px] text-left shadow-sm"
                  aria-label="Search"
                >
                  <span className="text-[13px] text-[#9698A0] font-normal truncate">
                    Try searching {SEARCH_KEYWORDS[keywordIndex]}
                  </span>
                  <Search className="w-[18px] h-[18px] text-[#181B2D] stroke-[1.8] shrink-0" />
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
                            cat.isSale ? 'text-[#D9232D]' : 'text-[#212121]'
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
                              <span className="font-bold text-[11px] text-[#282C3F] uppercase block">{grp.title}</span>
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
              <div className="p-4 pt-1 space-y-2.5 text-xs font-bold text-[#212121]">
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
                    <p className="font-bold text-[#212121]">{user.name}</p>
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
                  className="w-full bg-[#282C3F] text-white text-xs font-bold py-2.5 rounded-md uppercase tracking-wider"
                >
                  Log In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Mobile Bottom Navigation Bar (Home, Categories, Search, Wishlist, Profile) */}
      <BottomNav onOpenSearch={() => setIsSearchOpen(true)} />
    </>
  );
};

export default Navbar;

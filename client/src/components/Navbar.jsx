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

// Exact Header Categories in order
const INITIAL_CATEGORIES = [
  { id: 'men', name: 'Men', slug: 'men', path: '/men' },
  { id: 'travel', name: 'Travel', slug: 'travel', path: '/travel' },
  { id: 'polos', name: 'Polos', slug: 'polos', path: '/polos' },
  { id: 'hoodies', name: 'Hoodies', slug: 'hoodies', path: '/hoodies' },
  { id: 'shirts', name: 'Shirts', slug: 'shirts', path: '/shirts' },
  { id: 'oversized-tees', name: 'Tees', slug: 'oversized-tees', path: '/oversized-tees' },
  { id: 'co-ords', name: 'Co-ords', slug: 'co-ords', path: '/co-ords' },
  { id: 'joggers', name: 'Joggers', slug: 'joggers', path: '/joggers' },
  { id: 'shorts', name: 'Shorts', slug: 'shorts', path: '/shorts' },
  { id: 'jackets', name: 'Jackets', slug: 'jackets', path: '/jackets' }
];

const Navbar = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
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
  const getActiveFromRoute = () => {
    const searchParams = new URLSearchParams(location.search);
    const catQuery = searchParams.get('category');
    if (catQuery) {
      if (catQuery === 't-shirts' || catQuery === 'tees' || catQuery === 'oversized-tees' || catQuery === 'premium-hd-tees') {
        return 'oversized-tees';
      }
      if (catQuery === 'textured-shackets' || catQuery === 'shackets' || catQuery === 'jackets') {
        return 'jackets';
      }
      if (catQuery === 'co-ords' || catQuery === 'coords') return 'co-ords';
      return catQuery;
    }
    const path = location.pathname.replace(/^\/+/, '').toLowerCase();
    // ON HOMEPAGE: Return null! None should be selected by default!
    if (!path) return null;
    if (path === 'men') return 'men';
    if (path === 'travel') return 'travel';
    if (path === 'polos' || path === 'classic-polo' || path === 'polo-t-shirts' || path === 'collections/classic-polo' || path === 'collections/polo-t-shirts') return 'polos';
    if (path === 'hoodies' || path === 'hoodies-jackets' || path === 'jackets-and-hoodies' || path === 'collections/hoodies-jackets' || path === 'collections/jackets-and-hoodies') return 'hoodies';
    if (path === 'shirts' || path === 'shirts-for-men' || path === 'textured-shackets' || path === 'shackets' || path === 'collections/shirts-for-men' || path === 'collections/textured-shackets') return 'shirts';
    if (path === 'tees' || path === 't-shirts' || path === 'oversized-tees') return 'oversized-tees';
    if (path === 'co-ords' || path === 'coords' || path === 'best-selling-co-ord-sets' || path === 'collections/best-selling-co-ord-sets' || path === 'collections/co-ords') return 'co-ords';
    if (path === 'joggers' || path === 'fashion-joggers-men' || path === 'collections/fashion-joggers-men' || path === 'cargo-pants' || path === 'collections/cargo-pants') return 'joggers';
    if (path === 'shorts') return 'shorts';
    if (path === 'jackets') return 'jackets';
    return null;
  };

  const [selectedCatId, setSelectedCatId] = useState(() => getActiveFromRoute());
  const [hoveredCatId, setHoveredCatId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.getCategories();
        if (res.success && Array.isArray(res.data)) {
          setCategories(prev => prev.map(cat => {
            const apiCat = res.data.find(c =>
              c.id === cat.id ||
              c.slug === cat.slug ||
              (cat.id === 'oversized-tees' && (c.id === 'oversized-tees' || c.id === 't-shirts')) ||
              (cat.id === 'jackets' && c.id === 'hoodies')
            );
            if (apiCat) {
              return {
                ...cat,
                groups: apiCat.groups || cat.groups,
                promo: apiCat.promo || cat.promo
              };
            }
            return cat;
          }));
        }
      } catch (e) {
        console.error('Error loading category mega menus:', e);
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
    setSelectedCatId(getActiveFromRoute());
  }, [location.pathname, location.search]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        {/* 1. Top Announcement Bar (Continuous Right to Left Infinite Marquee) */}
        <div className="h-8 bg-[#242F66] text-white text-[12px] sm:text-[13px] font-normal flex items-center overflow-hidden select-none relative">
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

        {/* 2. Main Navigation Bar (Clean Nobero Layout: Logo Far Left -> Categories -> Search & Icons Right) */}
        <div className="border-b border-[#E5E7EB] bg-white">
          <div className="w-[94%] sm:w-[92%] lg:w-[90%] xl:w-[89%] 2xl:w-[88.5%] mx-auto max-w-[1780px]">
            <div className="flex items-center justify-between h-[60px] lg:h-[70px]">
              
              {/* Left Section on Desktop, Left Hamburger on Mobile */}
              <div className="flex items-center lg:shrink-0">
                {/* Mobile Hamburger (Only on mobile) */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-1.5 text-[#121212] lg:hidden focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Brand Logo: Centered on mobile, Left-aligned on desktop */}
                <div className="hidden lg:block">
                  <Link
                    to="/"
                    onClick={() => setSelectedCatId(null)}
                    className="flex items-center shrink-0 pr-4 sm:pr-6 lg:pr-8 xl:pr-10 hover:opacity-90 transition-opacity"
                  >
                    <BrandLogo variant="light" subtitle="THE KING" size="sm" />
                  </Link>
                </div>
              </div>

              {/* Mobile Centered Brand Logo (Exactly matching Nobero mobile reference) */}
              <div className="flex-1 lg:hidden flex justify-center items-center">
                <Link
                  to="/"
                  onClick={() => setSelectedCatId(null)}
                  className="flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <BrandLogo variant="light" subtitle="THE KING" size="sm" />
                </Link>
              </div>

              {/* Desktop Navigation Sections (Immediately follow the logo) */}
              <nav
                className="hidden lg:flex items-center space-x-4 lg:space-x-5 xl:space-x-6 2xl:space-x-7 h-full flex-1 justify-start"
                onMouseLeave={() => setHoveredCatId(null)}
              >
                {categories.map((cat) => {
                  const activeId = hoveredCatId || selectedCatId;
                  const hasActiveSection = Boolean(activeId);
                  const isActive = hasActiveSection && activeId === cat.id;

                  // Text color class:
                  // 1. Default state: All items bold black!
                  // 2. Active section: Bold black with subtle red underline
                  // 3. Inactive sections: Light grey
                  let textClass = 'text-[#121212] font-bold';
                  if (hasActiveSection) {
                    textClass = isActive
                      ? 'text-black font-bold'
                      : 'text-[#A8ACB7] hover:text-[#121212] font-bold';
                  }

                  return (
                    <div
                      key={cat.id}
                      className="h-full flex items-center relative"
                      onMouseEnter={() => {
                        setHoveredCatId(cat.id);
                        if (cat.groups) setActiveMegaCategory(cat);
                        else setActiveMegaCategory(null);
                      }}
                    >
                      <Link
                        to={cat.path || `/shop?category=${cat.slug}`}
                        onClick={() => {
                          setSelectedCatId(cat.id);
                          if (cat.groups) {
                            setActiveMegaCategory(prev => prev?.id === cat.id ? null : cat);
                          } else {
                            setActiveMegaCategory(null);
                          }
                        }}
                        className="relative py-1 text-[13.5px] xl:text-[14px] select-none inline-flex items-center group/nav"
                      >
                        <span className={`transition-colors duration-150 ${textClass}`}>
                          {cat.name}
                        </span>

                        {/* Subtle Red Active Indicator (Underline) directly underneath active text */}
                        {isActive && (
                          <span
                            className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-[#E03131] transition-all"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Right Utility Icons (Search Bar, Account, Wishlist, Cart, Partner Badge) */}
              <div className="flex items-center space-x-1.5 sm:space-x-3.5 xl:space-x-4 shrink-0">
                {/* Mobile Search Button (Matching Nobero mobile header) */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 text-[#121212] lg:hidden focus:outline-none"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5 text-[#121212]" />
                </button>

                {/* Desktop Search Bar matching Nobero reference */}
                <div className="hidden lg:flex items-center">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="w-[185px] xl:w-[215px] 2xl:w-[235px] h-[36px] xl:h-[38px] px-3.5 flex items-center justify-between bg-white border border-[#E5E7EB] hover:border-[#CBD5E1] rounded-none text-left transition-colors duration-150 group cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    aria-label="Search products"
                  >
                    <span className="text-[12.5px] xl:text-[13px] text-[#8E909B] font-normal truncate select-none">
                      Try searching {SEARCH_KEYWORDS[keywordIndex]}
                    </span>
                    <Search className="w-4 h-4 text-[#121212] shrink-0 stroke-[1.8] group-hover:scale-105 transition-transform ml-2" />
                  </button>
                </div>

                {/* User Account / Profile (Desktop Only - Mobile accesses from BottomNav & Drawer) */}
                <div className="relative group hidden lg:block">
                  <button
                    onClick={() => {
                      if (!user) setIsAuthModalOpen(true);
                      else navigate('/account');
                    }}
                    className="relative p-1.5 text-[#121212] hover:text-black transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Account"
                  >
                    {/* 'New' pill badge above user icon matching Nobero reference */}
                    <span className="absolute -top-1.5 -right-1 bg-[#1A1E31] text-white text-[7.5px] font-bold px-1.5 py-[0.5px] rounded-full uppercase tracking-tight leading-none pointer-events-none shadow-sm">
                      New
                    </span>
                    <User className="w-[21px] h-[21px] text-[#121212] stroke-[1.8]" />
                  </button>

                  {/* Account Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
                    <div className="w-56 bg-white border border-gray-200 shadow-xl rounded-none py-2 text-xs font-semibold text-[#212121]">
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
                            className="w-full bg-[#282C3F] hover:bg-[#212121] text-white py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
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

                {/* Wishlist Icon */}
                <Link
                  to="/wishlist"
                  className="relative p-1.5 text-[#121212] hover:text-black transition-colors flex items-center justify-center"
                  aria-label="Wishlist"
                >
                  <Heart className="w-[21px] h-[21px] text-[#121212] stroke-[1.8]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#D9232D] text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart Bag Icon */}
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="relative p-1.5 text-[#121212] hover:text-black transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-[21px] h-[21px] text-[#121212] stroke-[1.8]" />
                  {totalItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1A1E31] text-white text-[9.5px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItemCount}
                    </span>
                  )}
                </button>

                {/* Far Right Trust / Partner Quality Badge (matching Nobero header) */}
                <div
                  className="hidden 2xl:flex items-center justify-center border border-[#D8C28A] bg-[#FFFBF0] w-[34px] h-[34px] p-0.5 shadow-sm select-none"
                  title="LEO Premium Assurance"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-center leading-none">
                    <span className="text-[7.5px] font-black text-[#8B6E32] tracking-wider uppercase">LEO</span>
                    <span className="text-[5.5px] font-bold text-[#A6894C] tracking-tighter">PRIME</span>
                  </div>
                </div>
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
                  <BrandLogo variant="light" subtitle="THE KING" size="sm" />
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
                          to={cat.path || `/shop?category=${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xs font-semibold py-2 text-[#121212]"
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

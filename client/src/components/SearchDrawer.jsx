import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, TrendingUp, History, ArrowRight, Star } from 'lucide-react';
import { api } from '../services/api';

const POPULAR_SEARCHES = [
  'Oversized Tees',
  'Cargo Pants',
  'Travel Polos',
  'Co-Ord Sets',
  'French Terry Hoodies',
  'Zip Pocket Shorts',
  'Active Joggers',
  'Classic Fit Tees'
];

const SEARCH_CATEGORIES = [
  { label: 'Oversized T-Shirts', slug: 'oversized-tees' },
  { label: 'Cargo & Joggers', slug: 'joggers' },
  { label: 'Polo T-Shirts', slug: 'polos' },
  { label: 'Matching Co-Ords', slug: 'co-ords' },
  { label: 'Hoodies & Jackets', slug: 'hoodies' },
  { label: 'Travel Essentials', slug: 'travel' }
];

const SearchDrawer = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('leo_recent_searches') || '[]');
      setRecentSearches(saved);
    } catch (e) {}
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Live search debounced
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ search: query.trim() });
        if (res.success) {
          setResults(res.data.slice(0, 8));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const saveRecentSearch = (term) => {
    try {
      const updated = [term, ...recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem('leo_recent_searches', JSON.stringify(updated));
    } catch (e) {}
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('leo_recent_searches');
  };

  const handleSelectProduct = (product) => {
    saveRecentSearch(product.title);
    onClose();
    navigate(`/product/${product.slug || product.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (term) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in flex flex-col justify-start">
      {/* Background click overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Search Panel */}
      <div
        className="relative z-10 w-full bg-white shadow-2xl max-h-[90vh] overflow-y-auto border-b border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          
          {/* 1. Header Search Bar (Exact Nobero Style) */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-gray-200">
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-3 bg-gray-50 rounded-full px-4 py-2.5 sm:py-3 border border-gray-200 focus-within:border-[#282C3F] focus-within:bg-white transition-all shadow-inner">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for Oversized Tees, Joggers, Polos, Hoodies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-sm sm:text-base font-medium text-[#212121] placeholder:text-gray-400 bg-transparent border-none outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-black rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            <button
              onClick={onClose}
              className="p-2.5 text-gray-500 hover:text-[#212121] rounded-full hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 2. Popular & Recent Searches when query is empty */}
          {!query && (
            <div className="py-6 space-y-6">
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                      <History className="w-3.5 h-3.5 text-[#282C3F]" /> Recent Searches
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTagClick(item)}
                        className="text-xs font-semibold bg-gray-100 hover:bg-[#282C3F] hover:text-white text-[#212121] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending / Popular Searches */}
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTagClick(item)}
                      className="text-xs font-semibold bg-gray-50 hover:bg-[#282C3F] hover:text-white text-gray-700 px-3.5 py-1.5 rounded-full border border-gray-200 transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Category Discovery */}
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Explore Categories
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SEARCH_CATEGORIES.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={`/shop?category=${cat.slug}`}
                      onClick={onClose}
                      className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-xs font-bold text-[#212121] flex items-center justify-between transition-colors group"
                    >
                      <span>{cat.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 3. Live Results Loading State */}
          {loading && (
            <div className="py-12 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
              Searching LEO products...
            </div>
          )}

          {/* 4. No Results Found */}
          {!loading && query && results.length === 0 && (
            <div className="py-12 text-center space-y-2">
              <p className="text-base font-bold text-[#212121]">No products found for "{query}"</p>
              <p className="text-xs text-gray-500">
                Try searching for "Oversized", "Joggers", "Polos", or "Co-Ords"
              </p>
            </div>
          )}

          {/* 5. Live Matching Product Grid */}
          {!loading && results.length > 0 && (
            <div className="py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Products ({results.length})
                </h3>
                <button
                  onClick={handleSearchSubmit}
                  className="text-xs font-bold text-[#282C3F] hover:underline inline-flex items-center gap-1"
                >
                  View all results <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {results.map((product) => {
                  const image = product.colors?.[0]?.image || product.image;
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="group cursor-pointer block text-left bg-white border border-gray-100 rounded-xl p-2 hover:shadow-md transition-all"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 relative mb-2">
                        <img
                          src={image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.discount && (
                          <span className="absolute top-1.5 left-1.5 bg-[#D9232D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {product.discount}
                          </span>
                        )}
                        {product.rating && (
                          <span className="absolute bottom-1.5 left-1.5 bg-white/95 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
                            {product.rating} <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-xs font-bold text-[#212121] line-clamp-1 group-hover:text-[#282C3F] transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 truncate">{product.subtitle}</p>
                      
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xs sm:text-sm font-bold text-[#212121]">₹{product.price}</span>
                        {product.mrp && (
                          <span className="text-[10px] text-gray-400 line-through">₹{product.mrp}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View all button footer */}
              <div className="mt-6 text-center">
                <button
                  onClick={handleSearchSubmit}
                  className="bg-[#282C3F] hover:bg-[#212121] text-white text-xs font-bold uppercase tracking-wider px-8 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  View All Results for "{query}"
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;

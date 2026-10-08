import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, Link, useLocation } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, ChevronUp, Check, ArrowUpDown, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StorefrontContainer from '../components/StorefrontContainer';
import AppPromotion from '../components/AppPromotion';
import { api } from '../services/api';

const SORT_OPTIONS = [
  { id: 'bestselling', label: 'Best Selling' },
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'New Arrivals' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' }
];

const MEN_FILTERS_CONFIG = {
  categories: [
    { id: 'all', label: 'All Men\'s Clothing' },
    { id: 'oversized-tees', label: 'Oversized Tees' },
    { id: 't-shirts', label: 'T-Shirts & Polos' },
    { id: 'polos', label: 'Travel Polos' },
    { id: 'shirts', label: 'Casual Shirts' },
    { id: 'hoodies', label: 'Hoodies & Sweatshirts' },
    { id: 'joggers', label: 'Cargo & Joggers' },
    { id: 'shorts', label: 'French Terry Shorts' },
    { id: 'jackets', label: 'Bombers & Jackets' },
    { id: 'co-ords', label: 'Matching Co-Ords' },
    { id: 'travel', label: 'Travel Essentials' },
    { id: 'sale', label: 'Special Offers' }
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36'],
  colors: [
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Pitch Navy', hex: '#1A2A3A' },
    { name: 'Heather Grey', hex: '#888888' },
    { name: 'Sage Green', hex: '#5A6B5C' },
    { name: 'Washed Beige', hex: '#D2C6B6' },
    { name: 'Terracotta', hex: '#B85D43' }
  ],
  fits: ['Oversized Drop Shoulder', 'Relaxed Streetwear', 'Tailored Regular', 'Athletic Flex'],
  fabrics: ['240 GSM Combed Cotton', '380 GSM French Terry', 'Air-Flex Stretch Twill', 'Waffle Knit', 'Pique Cotton'],
  priceRanges: [
    { label: 'Under ₹799', min: 0, max: 799 },
    { label: '₹800 - ₹1,299', min: 800, max: 1299 },
    { label: '₹1,300 - ₹1,999', min: 1300, max: 1999 },
    { label: '₹2,000 & Above', min: 2000, max: 10000 }
  ]
};

const CATEGORY_META = {
  'men': {
    title: "All Men's Clothing",
    subtitle: "Engineered heavyweight basics, drop-shoulder silhouettes, and comfort-first travel wear.",
    seo: "Explore LEO's complete catalog of premium Men's fashion. Crafted from high-density bio-washed combed cotton and 4-way stretch fabrics for supreme daily comfort.",
    banner: "/images/hero-1.jpg"
  },
  'new-arrivals': {
    title: "New Arrivals - Fresh Men's Drops",
    subtitle: "The newest styles, upgraded colorways, and seasonal silhouettes just added to the LEO catalog.",
    seo: "Stay ahead of the trend with LEO's latest drops for men. Premium construction, modern aesthetics, and durable comfort.",
    banner: "/images/hero-1.jpg"
  },
  'oversized-tees': {
    title: "Men's Oversized T-Shirts",
    subtitle: "240 GSM heavy combed cotton featuring authentic streetwear drop-shoulder boxy cuts.",
    seo: "Shop our bestselling Men's Oversized T-Shirts. Built with high-grade 240 GSM bio-washed cotton that holds its structure wash after wash.",
    banner: "/images/mood-street.jpg"
  },
  't-shirts': {
    title: "Men's T-Shirts & Basics",
    subtitle: "Everyday solid and graphic tees crafted for breathable comfort and long-lasting durability.",
    seo: "Upgrade your basics with LEO's men's t-shirts. Ultra-soft combed cotton, reinforced rib collars, and zero shrinkage.",
    banner: "/images/hero-1.jpg"
  },
  'polos': {
    title: "Men's Travel & Classic Polos",
    subtitle: "Breathable pique knit polos with structured collars that stay sharp all day.",
    seo: "Explore our collection of versatile Men's Polos designed for effortless smart-casual transitions and wrinkle-resistant travel.",
    banner: "/images/hero-2.jpg"
  },
  'shirts': {
    title: "Men's Casual Shirts",
    subtitle: "Relaxed resort-collar shirts and structured overshirts built from textured cotton.",
    seo: "Discover LEO casual shirts for men. Breathable weaves, effortless layering, and contemporary cuts.",
    banner: "/images/hero-2.jpg"
  },
  'hoodies': {
    title: "Men's French Terry Hoodies",
    subtitle: "380 GSM brushed fleece with generous kangaroo pockets and double-layer structured hoods.",
    seo: "Keep warm in style with LEO's heavyweight French Terry hoodies for men. Pre-shrunk, fleece-lined, and built for cozy longevity.",
    banner: "/images/mood-cozy.jpg"
  },
  'joggers': {
    title: "Men's Cargo Joggers & Flex Pants",
    subtitle: "Multi-pocket cargo pants and four-way stretch joggers designed for dynamic urban motion.",
    seo: "Shop LEO Men's Cargo Joggers. Engineered with deep utility pockets, gusseted crotches, and tapered ankle cuffs.",
    banner: "/images/mood-travel.jpg"
  },
  'shorts': {
    title: "Men's French Terry Shorts",
    subtitle: "Comfort-engineered active shorts with drawstring waists and secure zip pockets.",
    seo: "LEO Men's shorts offer relaxed weekend ease and gym-ready mobility with heavyweight French Terry construction.",
    banner: "/images/mood-relax.jpg"
  },
  'jackets': {
    title: "Men's Jackets & Outerwear",
    subtitle: "Clean bomber jackets, transit utility windbreakers, and heavy overshirts.",
    seo: "Shop premium outerwear for men at LEO. Functional weather resistance combined with refined streetwear aesthetics.",
    banner: "/images/hero-1.jpg"
  },
  'co-ords': {
    title: "Men's Matching Co-Ord Sets",
    subtitle: "Effortless top-and-bottom pairings in waffle knit, terry fleece, and textured cotton.",
    seo: "Eliminate styling guesswork with LEO's curated Men's Co-Ord Sets. Perfectly matched shades and complementary weights.",
    banner: "/images/mood-relax.jpg"
  },
  'travel': {
    title: "Men's Travel Essentials",
    subtitle: "Wrinkle-resistant, quick-drying, and 4-way stretch apparel tailored for modern transit.",
    seo: "Pack smarter with LEO Travel Essentials for men. Lightweight packing, deep zip security pockets, and supreme breathable comfort.",
    banner: "/images/hero-2.jpg"
  },
  'sale': {
    title: "Men's Special Sale & Clearance",
    subtitle: "Limited-time deals, combo discounts, and seasonal clearance on iconic LEO styles.",
    seo: "Grab exclusive offers on LEO Men's Wear. Up to 60% off on premium oversized tees, joggers, hoodies, and travel sets.",
    banner: "/images/hero-1.jpg"
  }
};

const CategoryPage = ({ forcedCategory = null, isSearchPage = false }) => {
  const { slug } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine active category
  const activeCategorySlug = forcedCategory || slug || searchParams.get('category') || 'men';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(activeCategorySlug);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFits, setSelectedFits] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'bestselling');
  const [seoExpanded, setSeoExpanded] = useState(false);

  useEffect(() => {
    setSelectedCategory(activeCategorySlug);
  }, [activeCategorySlug]);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const queryParams = {
          category: selectedCategory !== 'all' && selectedCategory !== 'men' ? selectedCategory : undefined,
          search: searchQuery || undefined,
          sort: sortBy
        };
        const res = await api.getProducts(queryParams);
        if (res.success) {
          let list = res.data;

          // Apply client-side refinements if selected
          if (selectedSizes.length > 0) {
            list = list.filter(p => p.sizes?.some(s => selectedSizes.includes(s.name)));
          }
          if (selectedColors.length > 0) {
            list = list.filter(p => p.colors?.some(c => selectedColors.includes(c.name)));
          }
          if (selectedFits.length > 0) {
            list = list.filter(p => selectedFits.includes(p.fit));
          }
          if (selectedPriceRange) {
            list = list.filter(p => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max);
          }

          setProducts(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [selectedCategory, searchQuery, sortBy, selectedSizes, selectedColors, selectedFits, selectedPriceRange]);

  const toggleSize = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFits([]);
    setSelectedPriceRange(null);
    setSearchParams({});
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || selectedFits.length > 0 || selectedPriceRange !== null || (selectedCategory !== 'all' && selectedCategory !== 'men');

  const meta = CATEGORY_META[activeCategorySlug] || {
    title: `${activeCategorySlug.replace('-', ' ').toUpperCase()} COLLECTION`,
    subtitle: "High-grade craftsmanship designed exclusively for men.",
    seo: "Shop high quality men's fashion essentials from LEO.",
    banner: "/images/hero-1.jpg"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header Banner (Exact Nobero style) */}
      <div className="relative bg-[#242F66] text-white py-8 sm:py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img src={meta.banner} alt="" className="w-full h-full object-cover" />
        </div>

        <StorefrontContainer className="relative z-10">
          <div className="text-[11px] sm:text-xs text-gray-300 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/men" className="hover:text-white">Men's Apparel</Link>
            <span>/</span>
            <span className="text-white font-bold">
              {isSearchPage ? `Search: "${searchQuery}"` : meta.title.split('-')[0].trim()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-display">
            {isSearchPage ? `Search Results for "${searchQuery}"` : meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl font-medium">
            {meta.subtitle}
          </p>
        </StorefrontContainer>
      </div>

      {/* Main Catalog View */}
      <div className="py-6 sm:py-10">
        <StorefrontContainer>
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 gap-4">
            {/* Mobile Filter trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 bg-[#242F66] text-white text-xs font-bold px-4 py-2 rounded-md shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>

            {/* Total Count */}
            <span className="text-xs sm:text-sm text-[#666875] font-medium">
              <strong className="text-[#1A1E31]">{products.length}</strong> Men's Styles
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#666875] hidden sm:inline-block">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-md text-xs font-semibold text-[#1A1E31] py-1.5 px-3 focus:outline-none focus:border-[#242F66] cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 py-3 border-b border-gray-100">
              {selectedSizes.map(s => (
                <span key={s} className="inline-flex items-center gap-1 bg-gray-100 text-[#1A1E31] text-[11px] font-bold px-2.5 py-1 rounded-md">
                  Size: {s}
                  <button onClick={() => toggleSize(s)}><X className="w-3 h-3 text-gray-500" /></button>
                </span>
              ))}
              {selectedColors.map(c => (
                <span key={c} className="inline-flex items-center gap-1 bg-gray-100 text-[#1A1E31] text-[11px] font-bold px-2.5 py-1 rounded-md">
                  Color: {c}
                  <button onClick={() => toggleColor(c)}><X className="w-3 h-3 text-gray-500" /></button>
                </span>
              ))}
              {selectedPriceRange && (
                <span key={selectedPriceRange.label} className="inline-flex items-center gap-1 bg-gray-100 text-[#1A1E31] text-[11px] font-bold px-2.5 py-1 rounded-md">
                  Price: {selectedPriceRange.label}
                  <button onClick={() => setSelectedPriceRange(null)}><X className="w-3 h-3 text-gray-500" /></button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-rose-600 hover:underline inline-flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" /> Reset All Filters
              </button>
            </div>
          )}

          {/* Catalog Layout: Sidebar + Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6 pr-4 border-r border-gray-200">
              
              {/* Category Tree */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-[#1A1E31] tracking-wider border-b border-gray-100 pb-1.5">
                  Category
                </h4>
                <div className="space-y-1">
                  {MEN_FILTERS_CONFIG.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded-md transition-all flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-[#242F66] text-white font-bold'
                          : 'text-[#4A4D5E] hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-bold uppercase text-[#1A1E31] tracking-wider border-b border-gray-100 pb-1.5">
                  Size
                </h4>
                <div className="grid grid-cols-3 gap-1.5">
                  {MEN_FILTERS_CONFIG.sizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-1.5 text-xs font-bold rounded border text-center transition-all ${
                          isSelected
                            ? 'bg-[#242F66] text-white border-[#242F66]'
                            : 'bg-white text-[#1A1E31] border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-bold uppercase text-[#1A1E31] tracking-wider border-b border-gray-100 pb-1.5">
                  Color
                </h4>
                <div className="space-y-1.5">
                  {MEN_FILTERS_CONFIG.colors.map((color) => {
                    const isSelected = selectedColors.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        className="w-full flex items-center gap-2 text-xs py-1 px-1.5 rounded hover:bg-gray-50 text-left"
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-gray-300 shadow-sm shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className={`flex-1 ${isSelected ? 'font-bold text-[#1A1E31]' : 'text-[#4A4D5E]'}`}>
                          {color.name}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#242F66]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-bold uppercase text-[#1A1E31] tracking-wider border-b border-gray-100 pb-1.5">
                  Price
                </h4>
                <div className="space-y-1">
                  {MEN_FILTERS_CONFIG.priceRanges.map((range, idx) => {
                    const isSelected = selectedPriceRange?.label === range.label;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedPriceRange(isSelected ? null : range)}
                        className={`w-full text-left text-xs py-1.5 px-2 rounded-md transition-all flex items-center justify-between ${
                          isSelected ? 'bg-[#242F66] text-white font-bold' : 'text-[#4A4D5E] hover:bg-gray-100'
                        }`}
                      >
                        <span>{range.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </aside>

            {/* Product Cards Grid */}
            <main className="lg:col-span-9">
              {loading ? (
                <div className="py-24 text-center text-xs font-bold text-[#666875]">
                  Loading LEO styles...
                </div>
              ) : products.length === 0 ? (
                <div className="py-16 text-center bg-[#F7F8FA] rounded-xl border border-gray-200 p-8">
                  <h3 className="text-base font-bold text-[#1A1E31]">No products match the selected filters</h3>
                  <p className="text-xs text-[#666875] mt-1">Try clearing some filters or searching for another category.</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 bg-[#242F66] hover:bg-[#1A1E31] text-white text-xs font-bold px-6 py-2.5 rounded-md uppercase tracking-wider"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </main>

          </div>

          {/* SEO / Read More Section */}
          <div className="mt-14 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-bold uppercase text-[#1A1E31] mb-2">
              About LEO {meta.title.split('-')[0].trim()}
            </h3>
            <p className="text-xs text-[#666875] leading-relaxed">
              {meta.seo}
            </p>
            {seoExpanded && (
              <div className="mt-3 text-xs text-[#666875] space-y-2 leading-relaxed animate-fade-in">
                <p>
                  Every piece in our Men's wear catalog undergoes rigorous bio-washing and shrinkage-lock testing to ensure optimal drape, color fastness, and structured longevity.
                </p>
                <p>
                  Enjoy 7-Day Hassle-Free Returns, Instant Online Exchanges, Free Shipping across India on orders over ₹799, and Cash on Delivery.
                </p>
              </div>
            )}
            <button
              onClick={() => setSeoExpanded(!seoExpanded)}
              className="mt-2 text-xs font-bold text-[#242F66] hover:underline inline-flex items-center gap-1"
            >
              {seoExpanded ? 'Read Less' : 'Read More'}
              {seoExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

        </StorefrontContainer>
      </div>

      {/* App Promotion Banner */}
      <AppPromotion />

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col justify-between p-5 overflow-y-auto animate-drawer-right">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <h3 className="text-sm font-bold uppercase text-[#1A1E31]">Filter Men's Wear</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>

              {/* Categories */}
              <div className="py-3 border-b border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-2">Category</span>
                <div className="flex flex-wrap gap-1.5">
                  {MEN_FILTERS_CONFIG.categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border font-medium ${
                        selectedCategory === c.id
                          ? 'bg-[#242F66] text-white border-[#242F66]'
                          : 'bg-white text-[#1A1E31] border-gray-300'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="py-3 border-b border-gray-100">
                <span className="text-[11px] font-bold uppercase text-gray-400 block mb-2">Sizes</span>
                <div className="flex flex-wrap gap-1.5">
                  {MEN_FILTERS_CONFIG.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`w-9 h-8 text-xs font-bold rounded border ${
                        selectedSizes.includes(s)
                          ? 'bg-[#242F66] text-white border-[#242F66]'
                          : 'bg-white text-[#1A1E31] border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-gray-200 flex gap-2">
              <button onClick={clearAllFilters} className="flex-1 py-2.5 text-xs font-bold bg-gray-100 rounded-md">
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-[#242F66] rounded-md"
              >
                Apply ({products.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

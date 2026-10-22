import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, Link, useLocation } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, ChevronUp, Check, ArrowUpDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StorefrontContainer from '../components/StorefrontContainer';
import AppPromotion from '../components/AppPromotion';
import ShopFilterSidebar, { PRICE_RANGES, COLOR_CONFIG, productMatchesColors } from '../components/ShopFilterSidebar';
import { api } from '../services/api';

const SORT_OPTIONS = [
  { id: 'bestselling', label: 'Best Selling' },
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'New Arrivals' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' }
];

const CATEGORY_META = {
  'men': {
    title: "All Men's Clothing",
    subtitle: "Engineered heavyweight basics, drop-shoulder silhouettes, and comfort-first travel wear.",
    seo: "Explore LEO's complete catalog of premium Men's fashion. Crafted from high-density bio-washed combed cotton and 4-way stretch fabrics for supreme daily comfort.",
    banner: "/images/hero-1.jpg"
  },
  'women': {
    title: "Women's Collection",
    subtitle: "Comfort-first co-ord sets, drop shoulder basics, and casual essentials.",
    seo: "Explore LEO's casual essentials and co-ord sets for women.",
    banner: "/images/hero-1.jpg"
  },
  'new-arrivals': {
    title: "New Arrivals - Fresh Men's Drops",
    subtitle: "The newest styles, upgraded colorways, and seasonal silhouettes just added to the LEO catalog.",
    seo: "Stay ahead of the trend with LEO's latest drops for men. Premium construction, modern aesthetics, and durable comfort.",
    banner: "/images/hero-1.jpg"
  },
  'textured-shackets': {
    title: "Jackets & Shackets",
    subtitle: "Structured overshirts, bomber fleece silhouettes, and cozy layering staples.",
    seo: "Shop LEO Men's Textured Shackets and Jackets. Engineered from heavy fleece, loopknit cotton, and breathable weaves for all-season styling.",
    banner: "/images/shackets_promo_bg.jpg"
  },
  'shackets': {
    title: "Jackets & Shackets",
    subtitle: "Structured overshirts, bomber fleece silhouettes, and cozy layering staples.",
    seo: "Shop LEO Men's Textured Shackets and Jackets. Engineered from heavy fleece, loopknit cotton, and breathable weaves for all-season styling.",
    banner: "/images/shackets_promo_bg.jpg"
  },
  'oversized-tees': {
    title: "Oversized T-Shirts",
    subtitle: "240 GSM Heavyweight Fits",
    seo: "Shop our bestselling Men's Oversized T-Shirts. Built with high-grade 240 GSM bio-washed cotton that holds its structure wash after wash.",
    banner: "/images/oversized-tees_promo_bg.jpg"
  },
  't-shirts': {
    title: "Men's T-Shirts & Basics",
    subtitle: "Everyday solid and graphic tees crafted for breathable comfort and long-lasting durability.",
    seo: "Upgrade your basics with LEO's men's t-shirts. Ultra-soft combed cotton, reinforced rib collars, and zero shrinkage.",
    banner: "/images/hero-1.jpg"
  },
  'premium-hd-tees': {
    title: "HD Tees",
    subtitle: "High-density combed cotton with ultra-crisp graphic prints.",
    seo: "Shop LEO HD Tees for men. Heavyweight 240 GSM bio-washed cotton with high-definition detailing.",
    banner: "/images/oversized-tees_promo_bg.jpg"
  },
  'polos': {
    title: "Polo Tshirt for Men",
    subtitle: "Breathable pique knit polos with structured collars that stay sharp all day.",
    seo: "Explore our collection of versatile Men's Polos designed for effortless smart-casual transitions and wrinkle-resistant travel.",
    banner: "/images/polo_promo_bg.jpg"
  },
  'classic-polo': {
    title: "Polo Tshirt for Men",
    subtitle: "Breathable pique knit polos with structured collars that stay sharp all day.",
    seo: "Explore our collection of versatile Men's Polos designed for effortless smart-casual transitions and wrinkle-resistant travel.",
    banner: "/images/polo_promo_bg.jpg"
  },
  'shirts': {
    title: "Men's Shirts",
    subtitle: "Made for breezy plans",
    seo: "Discover LEO casual shirts for men. Breathable weaves, effortless layering, and contemporary cuts.",
    banner: "/images/shirts_promo_bg.jpg"
  },
  'shirts-for-men': {
    title: "Men's Shirts",
    subtitle: "Made for breezy plans",
    seo: "Discover LEO casual shirts for men. Breathable weaves, effortless layering, and contemporary cuts.",
    banner: "/images/shirts_promo_bg.jpg"
  },
  'hoodies': {
    title: "Jackets and Hoodies for Men",
    subtitle: "Made for changing weather",
    seo: "Keep warm in style with LEO's heavyweight French Terry hoodies for men. Pre-shrunk, fleece-lined, and built for cozy longevity.",
    banner: "/images/hoodies_promo_bg.jpg"
  },
  'jackets': {
    title: "Men's Jackets & Outerwear",
    subtitle: "Clean bomber jackets, transit utility windbreakers, and heavy overshirts.",
    seo: "Shop premium outerwear for men at LEO. Functional weather resistance combined with refined streetwear aesthetics.",
    banner: "/images/shackets_promo_bg.jpg"
  },
  'joggers': {
    title: "Joggers for Men",
    subtitle: "Your everyday essentials",
    seo: "Shop LEO Men's Cargo Joggers. Engineered with deep utility pockets, gusseted crotches, and tapered ankle cuffs.",
    banner: "/images/joggers_promo_bg.jpg"
  },
  'cargo-pants': {
    title: "Cargo Pants",
    subtitle: "Functional utility pockets meets ergonomic stretch comfort.",
    seo: "Shop LEO Cargo Pants for men with deep utility pockets and 4-way flexibility.",
    banner: "/images/joggers_promo_bg.jpg"
  },
  'shorts': {
    title: "Shorts for Men",
    subtitle: "Made for outdoor plans",
    seo: "LEO Men's shorts offer relaxed weekend ease and gym-ready mobility with heavyweight French Terry construction.",
    banner: "/images/shorts_promo_bg.webp"
  },
  'co-ords': {
    title: "Men's Matching Co-Ord Sets",
    subtitle: "Effortless top-and-bottom pairings in waffle knit, terry fleece, and textured cotton.",
    seo: "Eliminate styling guesswork with LEO's curated Men's Co-Ord Sets. Perfectly matched shades and complementary weights.",
    banner: "/images/coords_promo_bg.jpg"
  },
  'best-selling-co-ord-sets': {
    title: "Men's Matching Co-Ord Sets",
    subtitle: "Effortless top-and-bottom pairings in waffle knit, terry fleece, and textured cotton.",
    seo: "Eliminate styling guesswork with LEO's curated Men's Co-Ord Sets.",
    banner: "/images/coords_promo_bg.jpg"
  },
  'curated-looks': {
    title: "Curated Looks & Paired Combos",
    subtitle: "Effortlessly coordinated top & bottom pairs styled for modern daily wear.",
    seo: "Shop complete curated men's looks and stylish combos at LEO.",
    banner: "/images/hero-1.jpg"
  },
  'travel': {
    title: "Men's Travel Essentials",
    subtitle: "Wrinkle-resistant, quick-drying, and 4-way stretch apparel tailored for modern transit.",
    seo: "Pack smarter with LEO Travel Essentials for men. Lightweight packing, deep zip security pockets, and supreme breathable comfort.",
    banner: "/images/joggers_promo_bg.jpg"
  },
  'travel-essentials': {
    title: "Men's Travel Essentials",
    subtitle: "Wrinkle-resistant, quick-drying, and 4-way stretch apparel tailored for modern transit.",
    seo: "Pack smarter with LEO Travel Essentials for men. Lightweight packing, deep zip security pockets, and supreme breathable comfort.",
    banner: "/images/joggers_promo_bg.jpg"
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
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine active category
  const activeCategorySlug = forcedCategory || slug || searchParams.get('category') || 'men';
  const searchQuery = searchParams.get('search') || '';

  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

  // Exact Nobero Filter States: Price (radio), Color (checkboxes), Size (checkboxes), Availability (radio)
  const [selectedCategory, setSelectedCategory] = useState(activeCategorySlug);
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'bestselling');
  const [seoExpanded, setSeoExpanded] = useState(false);

  useEffect(() => {
    setSelectedCategory(activeCategorySlug);
    // Reset filters when navigating to a new category section
    setSelectedPriceId(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedAvailability(null);
  }, [activeCategorySlug]);

  // Fetch full category catalog once
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
          setRawProducts(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [selectedCategory, searchQuery, sortBy]);

  // Client-side filtering with instant response
  const filteredProducts = useMemo(() => {
    let list = rawProducts;

    // 1. Price Filter (Radio)
    if (selectedPriceId) {
      const range = PRICE_RANGES.find(r => r.id === selectedPriceId);
      if (range) {
        list = list.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // 2. Color Filter (Multi-select OR logic)
    if (selectedColors.length > 0) {
      list = list.filter(p => productMatchesColors(p, selectedColors));
    }

    // 3. Size Filter (Multi-select OR logic)
    if (selectedSizes.length > 0) {
      list = list.filter(p =>
        (p.sizes || []).some(s => selectedSizes.includes(typeof s === 'string' ? s : s.name))
      );
    }

    // 4. Availability Filter (Radio)
    if (selectedAvailability === 'in_stock') {
      list = list.filter(p => (p.inventory || 0) > 0);
    } else if (selectedAvailability === 'out_of_stock') {
      list = list.filter(p => (p.inventory || 0) === 0);
    }

    return list;
  }, [rawProducts, selectedPriceId, selectedColors, selectedSizes, selectedAvailability]);

  const toggleSize = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (colorName) => {
    setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
  };

  const clearAllFilters = () => {
    setSelectedPriceId(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedAvailability(null);
  };

  const hasActiveFilters = Boolean(
    selectedPriceId !== null ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    selectedAvailability !== null
  );

  const activeFilterCount =
    (selectedPriceId ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (selectedAvailability ? 1 : 0);

  const meta = CATEGORY_META[activeCategorySlug] || {
    title: `${activeCategorySlug.replace('-', ' ').toUpperCase()} COLLECTION`,
    subtitle: "High-grade craftsmanship designed exclusively for men.",
    seo: "Shop high quality men's fashion essentials from LEO.",
    banner: "/images/hero-1.jpg"
  };

  const activePriceLabel = selectedPriceId ? PRICE_RANGES.find(r => r.id === selectedPriceId)?.label : null;

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      {/* 1. Optional Top Campaign Hero Banner (Contained with standard gutters matching Nobero) */}
      {meta.banner && (
        <StorefrontContainer className="pt-2 sm:pt-4">
          <div className="w-full bg-[#f4f4f5] overflow-hidden max-h-[260px] sm:max-h-[320px] rounded-none">
            <img 
              src={meta.banner} 
              alt={meta.title} 
              className="w-full h-auto object-cover object-center block" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </StorefrontContainer>
      )}

      {/* 2. Authentic Nobero Breadcrumbs */}
      <StorefrontContainer className="pt-4 pb-2">
        <nav className="text-[12px] sm:text-xs text-[#666875] font-normal flex items-center gap-1.5 flex-wrap" role="navigation" aria-label="breadcrumbs">
          <Link to="/" className="text-[#1A1E31] hover:underline font-normal">Home</Link>
          <span className="text-[#979797]">&gt;</span>
          <Link to="/men" className="text-[#1A1E31] hover:underline font-normal">Men</Link>
          <span className="text-[#979797]">&gt;</span>
          <span className="text-[#666875] font-normal">
            {isSearchPage ? `Search: "${searchQuery}"` : meta.title}
          </span>
        </nav>
      </StorefrontContainer>

      {/* 3. Main Catalog View */}
      <div className="pb-10 pt-1 lg:pt-2">
        <StorefrontContainer>
          
          {/* Title & Controls Bar matching Nobero */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3 border-b border-gray-100 mb-5">
            
            {/* Title & Count */}
            <div className="flex items-baseline gap-2.5">
              <h1 className="text-lg sm:text-xl lg:text-[24px] font-bold text-[#1A1E31] tracking-tight">
                {isSearchPage ? `Search Results for "${searchQuery}"` : meta.title}
              </h1>
              <span className="text-xs text-[#666875] font-normal">
                ({filteredProducts.length} Items)
              </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Mobile Filter trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 bg-white border border-gray-300 text-[#1A1E31] text-xs font-semibold px-3.5 py-1.5 rounded-none shadow-xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-none px-3 py-1.5 hover:border-gray-300 transition-colors">
                <ArrowUpDown className="w-3 h-3 text-[#1A1E31]" />
                <span className="text-xs font-normal text-[#666875] hidden sm:inline-block">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-[#1A1E31] focus:outline-none cursor-pointer pl-0.5 pr-4 appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23212121%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '7px auto' }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 py-3 border-y border-gray-100 mb-6">
              {activePriceLabel && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-[#212121] text-[12px] font-medium px-3 py-1 rounded-none border border-gray-200">
                  <span>Price: {activePriceLabel}</span>
                  <button onClick={() => setSelectedPriceId(null)} className="hover:text-black">
                    <X className="w-3.5 h-3.5 text-gray-500 hover:text-black" />
                  </button>
                </span>
              )}

              {selectedColors.map(c => (
                <span key={c} className="inline-flex items-center gap-1.5 bg-gray-100 text-[#212121] text-[12px] font-medium px-3 py-1 rounded-none border border-gray-200">
                  <span>Color: {c}</span>
                  <button onClick={() => toggleColor(c)} className="hover:text-black">
                    <X className="w-3.5 h-3.5 text-gray-500 hover:text-black" />
                  </button>
                </span>
              ))}

              {selectedSizes.map(s => (
                <span key={s} className="inline-flex items-center gap-1.5 bg-gray-100 text-[#212121] text-[12px] font-medium px-3 py-1 rounded-none border border-gray-200">
                  <span>Size: {s}</span>
                  <button onClick={() => toggleSize(s)} className="hover:text-black">
                    <X className="w-3.5 h-3.5 text-gray-500 hover:text-black" />
                  </button>
                </span>
              ))}

              {selectedAvailability && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-[#212121] text-[12px] font-medium px-3 py-1 rounded-none border border-gray-200">
                  <span>Availability: {selectedAvailability === 'in_stock' ? 'In stock' : 'Out of stock'}</span>
                  <button onClick={() => setSelectedAvailability(null)} className="hover:text-black">
                    <X className="w-3.5 h-3.5 text-gray-500 hover:text-black" />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#92780E] hover:underline inline-flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" /> Clear All Filters
              </button>
            </div>
          )}

          {/* Catalog Layout: Exact Left Filter Sidebar + Right Product Grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* Desktop Left Filter Sidebar (Exact Nobero style, features & aspect ratio) */}
            <div className="hidden lg:block w-[260px] xl:w-[280px] shrink-0 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-4 border-r border-gray-100">
              <ShopFilterSidebar
                selectedPriceId={selectedPriceId}
                onSelectPrice={setSelectedPriceId}
                selectedColors={selectedColors}
                onToggleColor={toggleColor}
                selectedSizes={selectedSizes}
                onToggleSize={toggleSize}
                selectedAvailability={selectedAvailability}
                onSelectAvailability={setSelectedAvailability}
                onClearAll={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
                activeCategorySlug={activeCategorySlug}
                products={rawProducts}
              />
            </div>

            {/* Product Cards Grid */}
            <main className="flex-1 w-full min-w-0">
              {loading ? (
                <div className="py-24 text-center text-xs font-bold text-[#666875]">
                  Loading LEO styles...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-16 text-center bg-[#F7F8FA] rounded-none border border-gray-200 p-8">
                  <h3 className="text-base font-bold text-[#212121]">No products match the selected filters</h3>
                  <p className="text-xs text-[#666875] mt-1">Try clearing some filters to explore more styles.</p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 bg-[#181B2D] hover:bg-black text-white text-xs font-bold px-6 py-2.5 rounded-none uppercase tracking-wider"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </main>

          </div>

          {/* SEO / Read More Section */}
          <div className="mt-14 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-bold uppercase text-[#212121] mb-2">
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
              className="mt-2 text-xs font-bold text-[#282C3F] hover:underline inline-flex items-center gap-1"
            >
              {seoExpanded ? 'Read Less' : 'Read More'}
              {seoExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

        </StorefrontContainer>
      </div>

      {/* App Promotion Banner */}
      <AppPromotion />

      {/* Sticky Bottom Mobile Sort & Filter Bar (Nobero Pattern) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 grid grid-cols-2 divide-x divide-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => setIsMobileSortOpen(true)}
          className="py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#212121] active:bg-gray-50 transition-colors"
        >
          <ArrowUpDown className="w-4 h-4 text-[#282C3F]" />
          <span>Sort By</span>
        </button>

        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#212121] active:bg-gray-50 transition-colors relative"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#282C3F]" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-[#181B2D] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Sort Bottom Sheet */}
      {isMobileSortOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileSortOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl p-5 animate-slide-up z-10 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold uppercase text-[#212121]">Sort Products</h3>
              <button onClick={() => setIsMobileSortOpen(false)} className="p-1 text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-2 divide-y divide-gray-100">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id);
                    setIsMobileSortOpen(false);
                  }}
                  className="w-full py-3 text-left text-xs font-semibold text-[#212121] flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && <Check className="w-4 h-4 text-[#282C3F] font-bold" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[88%] max-w-sm bg-white shadow-2xl flex flex-col justify-between p-5 overflow-y-auto z-10 animate-drawer-right">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Filters</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-gray-500 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Exact ShopFilterSidebar inside Drawer */}
              <ShopFilterSidebar
                selectedPriceId={selectedPriceId}
                onSelectPrice={setSelectedPriceId}
                selectedColors={selectedColors}
                onToggleColor={toggleColor}
                selectedSizes={selectedSizes}
                onToggleSize={toggleSize}
                selectedAvailability={selectedAvailability}
                onSelectAvailability={setSelectedAvailability}
                onClearAll={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
                activeCategorySlug={activeCategorySlug}
                products={rawProducts}
                onApplyMobile={() => setIsMobileFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

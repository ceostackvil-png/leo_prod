import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams, Link, useLocation } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, ChevronUp, Check, ArrowUpDown, Copy, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import StorefrontContainer from '../components/StorefrontContainer';
import AppPromotion from '../components/AppPromotion';
import ShopFilterSidebar, { PRICE_RANGES, COLOR_CONFIG, productMatchesColors } from '../components/ShopFilterSidebar';
import { api } from '../services/api';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'bestselling', label: 'Best Selling' },
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
    breadcrumbTitle: "Jackets & Shackets",
    subtitle: "Made for changing weather",
    seo: "Shop LEO Men's Textured Shackets and Structured Overshirts. Built with heavyweight fabrics and contemporary cuts for effortless styling.",
    banner: "/images/banners/shackets_banner_desktop.jpg",
    desktopBanner: "/images/banners/shackets_banner_desktop.jpg",
    mobileBanner: "/images/banners/shackets_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "left",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'shackets': {
    title: "Jackets & Shackets",
    breadcrumbTitle: "Jackets & Shackets",
    subtitle: "Made for changing weather",
    seo: "Shop LEO Men's Textured Shackets and Structured Overshirts. Built with heavyweight fabrics and contemporary cuts for effortless styling.",
    banner: "/images/banners/shackets_banner_desktop.jpg",
    desktopBanner: "/images/banners/shackets_banner_desktop.jpg",
    mobileBanner: "/images/banners/shackets_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "left",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
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
    title: "Polo T Shirts",
    breadcrumbTitle: "Polo T Shirts",
    subtitle: "Smart comfort, clean fits, all day ease. Ready for every plan.",
    seo: "Explore our collection of versatile Men's Polo T Shirts designed for effortless smart-casual transitions and all-day ease.",
    banner: "/images/banners/polo_banner_desktop.jpg",
    desktopBanner: "/images/banners/polo_banner_desktop.jpg",
    mobileBanner: "/images/banners/polo_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'classic-polo': {
    title: "Polo T Shirts",
    breadcrumbTitle: "Polo T Shirts",
    subtitle: "Smart comfort, clean fits, all day ease. Ready for every plan.",
    seo: "Explore our collection of versatile Men's Polo T Shirts designed for effortless smart-casual transitions and all-day ease.",
    banner: "/images/banners/polo_banner_desktop.jpg",
    desktopBanner: "/images/banners/polo_banner_desktop.jpg",
    mobileBanner: "/images/banners/polo_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'polo-t-shirts': {
    title: "Polo T Shirts",
    breadcrumbTitle: "Polo T Shirts",
    subtitle: "Smart comfort, clean fits, all day ease. Ready for every plan.",
    seo: "Explore our collection of versatile Men's Polo T Shirts designed for effortless smart-casual transitions and all-day ease.",
    banner: "/images/banners/polo_banner_desktop.jpg",
    desktopBanner: "/images/banners/polo_banner_desktop.jpg",
    mobileBanner: "/images/banners/polo_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'shirts': {
    title: "Men's Shirts",
    breadcrumbTitle: "Men's Shirts",
    subtitle: "Made for breezy plans",
    seo: "Discover LEO casual shirts and getaway linen shirts for men. Breathable weaves, effortless layering, and contemporary cuts.",
    banner: "/images/banners/shirts_banner_desktop.jpg",
    desktopBanner: "/images/banners/shirts_banner_desktop.jpg",
    mobileBanner: "/images/banners/shirts_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "bottom-right",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'shirts-for-men': {
    title: "Men's Shirts",
    breadcrumbTitle: "Men's Shirts",
    subtitle: "Made for breezy plans",
    seo: "Discover LEO casual shirts and getaway linen shirts for men. Breathable weaves, effortless layering, and contemporary cuts.",
    banner: "/images/banners/shirts_banner_desktop.jpg",
    desktopBanner: "/images/banners/shirts_banner_desktop.jpg",
    mobileBanner: "/images/banners/shirts_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "bottom-right",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'hoodies': {
    title: "Jackets and Hoodies",
    breadcrumbTitle: "Jackets and Hoodies",
    subtitle: "Made for changing weather",
    seo: "Keep warm in style with LEO's heavyweight French Terry hoodies and jackets for men. Pre-shrunk, fleece-lined, and built for cozy longevity.",
    banner: "/images/banners/hoodies_banner_desktop.jpg",
    desktopBanner: "/images/banners/hoodies_banner_desktop.jpg",
    mobileBanner: "/images/banners/hoodies_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'hoodies-jackets': {
    title: "Jackets and Hoodies",
    breadcrumbTitle: "Jackets and Hoodies",
    subtitle: "Made for changing weather",
    seo: "Keep warm in style with LEO's heavyweight French Terry hoodies and jackets for men. Pre-shrunk, fleece-lined, and built for cozy longevity.",
    banner: "/images/banners/hoodies_banner_desktop.jpg",
    desktopBanner: "/images/banners/hoodies_banner_desktop.jpg",
    mobileBanner: "/images/banners/hoodies_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'jackets-and-hoodies': {
    title: "Jackets and Hoodies",
    breadcrumbTitle: "Jackets and Hoodies",
    subtitle: "Made for changing weather",
    seo: "Keep warm in style with LEO's heavyweight French Terry hoodies and jackets for men. Pre-shrunk, fleece-lined, and built for cozy longevity.",
    banner: "/images/banners/hoodies_banner_desktop.jpg",
    desktopBanner: "/images/banners/hoodies_banner_desktop.jpg",
    mobileBanner: "/images/banners/hoodies_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'jackets': {
    title: "Jackets & Shackets",
    breadcrumbTitle: "Jackets & Shackets",
    subtitle: "Made for changing weather",
    seo: "Shop LEO Men's Textured Shackets and Structured Overshirts. Built with heavyweight fabrics and contemporary cuts for effortless styling.",
    banner: "/images/banners/shackets_banner_desktop.jpg",
    desktopBanner: "/images/banners/shackets_banner_desktop.jpg",
    mobileBanner: "/images/banners/shackets_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "left",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'joggers': {
    title: "Joggers for Men",
    breadcrumbTitle: "Joggers for Men",
    subtitle: "Your everyday essentials",
    seo: "Shop LEO Men's Cargo Joggers. Engineered with deep utility pockets, gusseted crotches, and tapered ankle cuffs.",
    banner: "/images/banners/joggers_banner_desktop.jpg",
    desktopBanner: "/images/banners/joggers_banner_desktop.jpg",
    mobileBanner: "/images/banners/joggers_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "coords",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'fashion-joggers-men': {
    title: "Joggers for Men",
    breadcrumbTitle: "Joggers for Men",
    subtitle: "Your everyday essentials",
    seo: "Shop LEO Men's Cargo Joggers. Engineered with deep utility pockets, gusseted crotches, and tapered ankle cuffs.",
    banner: "/images/banners/joggers_banner_desktop.jpg",
    desktopBanner: "/images/banners/joggers_banner_desktop.jpg",
    mobileBanner: "/images/banners/joggers_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "coords",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'cargo-pants': {
    title: "Joggers for Men",
    breadcrumbTitle: "Joggers for Men",
    subtitle: "Your everyday essentials",
    seo: "Shop LEO Cargo Pants for men with deep utility pockets and 4-way flexibility.",
    banner: "/images/banners/joggers_banner_desktop.jpg",
    desktopBanner: "/images/banners/joggers_banner_desktop.jpg",
    mobileBanner: "/images/banners/joggers_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "coords",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'shorts': {
    title: "Shorts for Men",
    subtitle: "Made for outdoor plans",
    seo: "LEO Men's shorts offer relaxed weekend ease and gym-ready mobility with heavyweight French Terry construction.",
    banner: "/images/shorts_promo_bg.webp"
  },
  'co-ords': {
    title: "Co-ord Set Men",
    breadcrumbTitle: "Co-ord Set Men",
    subtitle: "Effortless top-and-bottom pairings in waffle knit, terry fleece, and textured cotton.",
    seo: "Eliminate styling guesswork with LEO's curated Men's Co-Ord Sets. Perfectly matched shades and complementary weights.",
    banner: "/images/banners/coords_banner_desktop.jpg",
    desktopBanner: "/images/banners/coords_banner_desktop.jpg",
    mobileBanner: "/images/banners/coords_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "coords",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
  },
  'best-selling-co-ord-sets': {
    title: "Co-ord Set Men",
    breadcrumbTitle: "Co-ord Set Men",
    subtitle: "Effortless top-and-bottom pairings in waffle knit, terry fleece, and textured cotton.",
    seo: "Eliminate styling guesswork with LEO's curated Men's Co-Ord Sets.",
    banner: "/images/banners/coords_banner_desktop.jpg",
    desktopBanner: "/images/banners/coords_banner_desktop.jpg",
    mobileBanner: "/images/banners/coords_banner_mobile.jpg",
    aspectRatioDesktop: "4/1",
    aspectRatioMobile: "16/9",
    isDirectBreadcrumb: true,
    couponPosition: "coords",
    coupons: [
      { code: "B2G10", label: "Buy 2 Get 10% OFF", discount: "10% OFF" },
      { code: "B3G15", label: "Buy 3 Get 15% OFF", discount: "15% OFF" }
    ]
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
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleCopyCoupon = (code, desc) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
      }
      localStorage.setItem('leo_applied_coupon', code);
    } catch (e) {
      console.log('Clipboard error:', e);
    }
    setToastMessage({ code, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

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
      {/* 1. Authentic Top Campaign Hero Banner with Exact Aspect Ratio (Edge-to-edge full width matching Nobero) */}
      {meta.banner && (
        <div className="w-full overflow-hidden bg-[#f4f4f5] relative group">
          <picture className="w-full block">
            {meta.desktopBanner && (
              <source media="(min-width: 768px)" srcSet={meta.desktopBanner} />
            )}
            <img 
              src={meta.mobileBanner || meta.banner} 
              alt={meta.title} 
              className="w-full h-auto object-cover object-center block aspect-[16/9] md:aspect-[4/1]"
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </picture>

          {/* Interactive hotspots for B2G10 and B3G15 */}
          {(Boolean(meta.coupons && meta.coupons.length > 0)) && (
            <>
              {/* Desktop Hotspots */}
              <div className="hidden md:block absolute inset-0 pointer-events-none">
                {/* B2G10 Hotspot */}
                <button
                  onClick={() => handleCopyCoupon('B2G10', '10% OFF on 2 items')}
                  className={`pointer-events-auto absolute ${
                    meta.couponPosition === 'left'
                      ? 'left-[12%] top-[51%] w-[11%] h-[43%]'
                      : meta.couponPosition === 'bottom-right'
                      ? 'left-[61.2%] top-[74%] w-[16.2%] h-[19%]'
                      : meta.couponPosition === 'coords'
                      ? 'left-[64.5%] top-[51%] w-[11%] h-[43%]'
                      : 'left-[61.5%] top-[51%] w-[13.6%] h-[44%]'
                  } rounded-xl cursor-pointer hover:ring-2 hover:ring-[#e2f952]/40 hover:bg-white/5 transition-all duration-150`}
                  aria-label="Copy coupon code B2G10 for 10% OFF"
                  title="Click to copy coupon code B2G10"
                />

                {/* B3G15 Hotspot */}
                <button
                  onClick={() => handleCopyCoupon('B3G15', '15% OFF on 3 items')}
                  className={`pointer-events-auto absolute ${
                    meta.couponPosition === 'left'
                      ? 'left-[24.2%] top-[51%] w-[11%] h-[43%]'
                      : meta.couponPosition === 'bottom-right'
                      ? 'left-[78.4%] top-[74%] w-[16.2%] h-[19%]'
                      : meta.couponPosition === 'coords'
                      ? 'left-[77%] top-[51%] w-[11%] h-[43%]'
                      : 'left-[75.8%] top-[51%] w-[13.6%] h-[44%]'
                  } rounded-xl cursor-pointer hover:ring-2 hover:ring-[#e2f952]/40 hover:bg-white/5 transition-all duration-150`}
                  aria-label="Copy coupon code B3G15 for 15% OFF"
                  title="Click to copy coupon code B3G15"
                />
              </div>

              {/* Mobile Touch Hotspots */}
              <div className="md:hidden absolute inset-0 pointer-events-none">
                <button
                  onClick={() => handleCopyCoupon('B2G10', '10% OFF on 2 items')}
                  className={`pointer-events-auto absolute ${
                    meta.couponPosition === 'left'
                      ? 'left-[10%] top-[60%] w-[17%] h-[25%]'
                      : meta.couponPosition === 'bottom-right'
                      ? 'left-[60%] top-[72%] w-[18%] h-[22%]'
                      : 'left-[49%] top-[60%] w-[23%] h-[30%]'
                  } rounded-lg cursor-pointer active:bg-white/10`}
                  aria-label="Copy coupon code B2G10 for 10% OFF"
                />
                <button
                  onClick={() => handleCopyCoupon('B3G15', '15% OFF on 3 items')}
                  className={`pointer-events-auto absolute ${
                    meta.couponPosition === 'left'
                      ? 'left-[27%] top-[60%] w-[17%] h-[25%]'
                      : meta.couponPosition === 'bottom-right'
                      ? 'left-[78%] top-[72%] w-[18%] h-[22%]'
                      : 'left-[74%] top-[60%] w-[23%] h-[30%]'
                  } rounded-lg cursor-pointer active:bg-white/10`}
                  aria-label="Copy coupon code B3G15 for 15% OFF"
                />
              </div>
            </>
          )}

          {/* Interactive Shop Now hotspot for Shackets / Shirts */}
          {meta.hasShopNow && (
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              <button
                onClick={() => {
                  const target = document.getElementById('catalog-products-section');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 460, behavior: 'smooth' });
                  }
                }}
                className="pointer-events-auto absolute left-[62%] top-[60%] w-[16%] h-[20%] rounded-md cursor-pointer hover:bg-white/5 transition-all"
                aria-label="Shop Shackets & Jackets Now"
                title="Shop Now"
              />
            </div>
          )}
        </div>
      )}

      {/* Toast Feedback when coupon code is copied */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1E31] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/20 transition-all duration-200">
          <div className="w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-medium">
            Code <span className="font-bold text-[#e2f952]">{toastMessage.code}</span> copied! ({toastMessage.desc})
          </span>
        </div>
      )}

      {/* 2. Authentic Nobero Breadcrumbs matching Screenshot */}
      <StorefrontContainer className="pt-3 pb-2">
        <nav className="text-[12px] sm:text-[13px] text-[#666875] font-normal flex items-center gap-1.5 flex-wrap" role="navigation" aria-label="breadcrumbs">
          <Link to="/" className="text-[#1A1E31] hover:underline font-normal">Home</Link>
          <span className="text-[#666875] text-[11px]">›</span>
          {meta.isDirectBreadcrumb ? (
            <span className="text-[#666875] font-normal">
              {isSearchPage ? `Search: "${searchQuery}"` : (meta.breadcrumbTitle || meta.title)}
            </span>
          ) : (
            <>
              <Link to="/men" className="text-[#1A1E31] hover:underline font-normal">Men</Link>
              <span className="text-[#666875] text-[11px]">›</span>
              <span className="text-[#666875] font-normal">
                {isSearchPage ? `Search: "${searchQuery}"` : (meta.breadcrumbTitle || meta.title)}
              </span>
            </>
          )}
        </nav>
      </StorefrontContainer>

      {/* 3. Main Catalog View */}
      <div id="catalog-products-section" className="pb-10 pt-1 lg:pt-2">
        <StorefrontContainer>
          
          {/* Title & Controls Bar matching Nobero Screenshot */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-3 border-b border-gray-100 mb-5">
            
            {/* Title & Count: "Polo T Shirts   191 items" */}
            <div className="flex items-baseline gap-3">
              <h1 className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#1A1E31] tracking-tight">
                {isSearchPage ? `Search Results for "${searchQuery}"` : meta.title}
              </h1>
              <span className="text-xs sm:text-[13px] text-[#666875] font-normal">
                {filteredProducts.length} items
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

              {/* Sort Pill matching Nobero screenshot: [ ☰ Sort : Featured ] */}
              <div className="relative inline-flex items-center">
                <div className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-[#1A1E31] text-xs sm:text-[13px] font-normal px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-[5px] cursor-pointer transition-colors shadow-2xs">
                  {/* Sort icon matching Nobero */}
                  <svg className="w-3.5 h-3.5 text-[#1A1E31]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="14" y2="12" />
                    <line x1="4" y1="18" x2="8" y2="18" />
                  </svg>
                  <span>Sort : <span className="font-normal text-[#1A1E31]">{SORT_OPTIONS.find(o => o.id === sortBy)?.label || 'Featured'}</span></span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      Sort : {opt.label}
                    </option>
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

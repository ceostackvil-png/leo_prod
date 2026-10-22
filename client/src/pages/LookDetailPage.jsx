import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Star,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  ShoppingBag,
  Check,
  Maximize2,
  Copy,
  Info
} from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const LookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addLookToCart } = useCart();

  const [look, setLook] = useState(null);
  const [allLooks, setAllLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Selected sizes for Top and Bottom items
  const [selectedTopSize, setSelectedTopSize] = useState('M');
  const [selectedBottomSize, setSelectedBottomSize] = useState('M');

  // Accordion states
  const [descOpen, setDescOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  // UI Feedback
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [activeSizeCategory, setActiveSizeCategory] = useState('top');

  // Live Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 15, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch look data
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadLook = async () => {
      setLoading(true);
      try {
        const looksRes = await api.getLooks();
        if (looksRes.success && looksRes.data) {
          setAllLooks(looksRes.data);
          const current = looksRes.data.find(l => l.id === id || l.slug === id);
          if (current) {
            setLook(current);
            setActiveImageIdx(0);
            if (current.topProduct?.sizes?.length) {
              setSelectedTopSize(current.topProduct.sizes[1] || current.topProduct.sizes[0]);
            }
            if (current.bottomProduct?.sizes?.length) {
              setSelectedBottomSize(current.bottomProduct.sizes[1] || current.bottomProduct.sizes[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error loading look detail:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-[#242F66] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!look) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-[#1A1E31] mb-2">Look Not Found</h2>
        <p className="text-sm text-gray-500 mb-4">The curated outfit combo you are looking for is unavailable.</p>
        <Link
          to="/"
          className="bg-[#242F66] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  const galleryImages = look.gallery && look.gallery.length > 0 ? look.gallery : [look.image];

  const handleAddToCart = () => {
    addLookToCart(look, [], {
      topSize: selectedTopSize,
      bottomSize: selectedBottomSize
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2000);
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(''), 2000);
  };

  const similarLooks = allLooks.filter(l => l.id !== look.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Breadcrumbs */}
      <div className="border-b border-gray-100 bg-[#FBFBFB] py-2.5">
        <StorefrontContainer>
          <nav className="flex items-center gap-1.5 text-xs text-[#666875] overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>›</span>
            <Link to="/men" className="hover:text-black transition-colors">Men</Link>
            <span>›</span>
            <Link to="/shop?category=sets" className="hover:text-black transition-colors">Curated Looks</Link>
            <span>›</span>
            <span className="text-[#1A1E31] font-semibold truncate">{look.title}</span>
          </nav>
        </StorefrontContainer>
      </div>

      {/* 2. Main Look Visual Showcase & Configurator */}
      <section className="py-6 sm:py-10">
        <StorefrontContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Main Outfit Image Showcase (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-gray-100 overflow-hidden border border-gray-200 select-none group">
                <img
                  src={galleryImages[activeImageIdx]}
                  alt={look.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Top-Right Expert Style Pick Badge */}
                <div className="absolute top-3 right-3 z-10 bg-[#1A1E31]/85 backdrop-blur-[2px] text-white px-3 py-1 rounded-none text-xs font-semibold tracking-wide flex items-center gap-1 shadow-sm">
                  <span className="italic font-serif">Expert</span> Style Pick
                </div>

                {/* Floating Merged Product Thumbnails (Top + Bottom Items overlay) */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2.5 z-10">
                  {look.topProduct && (
                    <div className="bg-white/95 backdrop-blur-xs p-1.5 rounded-none shadow-md border border-gray-200 flex flex-col items-center w-20 sm:w-24 transition-transform hover:scale-105">
                      <img
                        src={look.topProduct.image}
                        alt={look.topProduct.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                      />
                      <span className="text-[10px] font-bold text-[#1A1E31] text-center truncate max-w-full leading-tight mt-1">
                        {look.topProduct.shortLabel || "Top Item"}
                      </span>
                    </div>
                  )}

                  {look.bottomProduct && (
                    <div className="bg-white/95 backdrop-blur-xs p-1.5 rounded-none shadow-md border border-gray-200 flex flex-col items-center w-20 sm:w-24 transition-transform hover:scale-105">
                      <img
                        src={look.bottomProduct.image}
                        alt={look.bottomProduct.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                      />
                      <span className="text-[10px] font-bold text-[#1A1E31] text-center truncate max-w-full leading-tight mt-1">
                        {look.bottomProduct.shortLabel || "Bottom Item"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Gallery Navigation Arrows (if multiple photos) */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIdx(prev => (prev - 1 + galleryImages.length) % galleryImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1A1E31] flex items-center justify-center shadow-md transition-all z-10"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIdx(prev => (prev + 1) % galleryImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1A1E31] flex items-center justify-center shadow-md transition-all z-10"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails Strip */}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-20 shrink-0 border overflow-hidden transition-all ${
                        idx === activeImageIdx
                          ? 'border-[#242F66] ring-1 ring-[#242F66]'
                          : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Look Detail & Selection Panel (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col space-y-5">
              
              {/* Header & Share */}
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1A1E31] tracking-tight leading-snug">
                  {look.title}
                </h1>
                <button
                  onClick={handleShare}
                  className="p-2 border border-gray-200 hover:border-black rounded-none text-[#1A1E31] transition-colors shrink-0 relative"
                  title="Share Look"
                >
                  <Share2 className="w-4 h-4" />
                  {shareSuccess && (
                    <span className="absolute -bottom-7 right-0 text-[10px] bg-black text-white px-2 py-0.5 whitespace-nowrap shadow-md">
                      Link copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Pricing & Rating */}
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#121212]">
                    ₹{look.bundlePrice?.toLocaleString('en-IN') || look.bundlePrice}
                  </span>
                  {look.discountAmount && (
                    <span className="text-sm font-bold text-[#008C2D]">
                      {look.discountAmount}
                    </span>
                  )}
                  {look.originalPrice && (
                    <span className="text-sm text-[#666875] line-through">
                      MRP: ₹{look.originalPrice?.toLocaleString('en-IN') || look.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-[#666875]">
                  <span>Inclusive of all Taxes</span>
                  <span>•</span>
                  <div className="inline-flex items-center gap-1 text-[#242F66] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{look.rating || 5.0}</span>
                    <span className="text-gray-400 font-normal">({look.reviewCount || 1})</span>
                  </div>
                </div>

                <p className="text-xs text-[#8941E8] font-medium mt-1">
                  Lowest price in last 30 days: ₹{look.lowestPrice || look.bundlePrice}
                </p>
              </div>

              {/* Save Extra With These Offers Box matching reference */}
              <div className="bg-[#FFFDF5] border border-[#F0E6D2] p-3.5 sm:p-4 space-y-3">
                <span className="text-xs font-bold text-[#1A1E31] uppercase tracking-wider block">
                  Save extra with these offers
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {look.offers && look.offers.map((off) => (
                    <div
                      key={off.code}
                      className="border border-[#EBDCBF] bg-white p-2.5 flex flex-col justify-between gap-1 shadow-2xs"
                    >
                      <div>
                        <p className="text-[11px] font-semibold text-[#1A1E31] leading-tight">
                          {off.title}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{off.condition}</p>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-gray-100 mt-1">
                        <span className="text-[10px] font-mono font-bold text-[#242F66] bg-gray-100 px-1.5 py-0.5">
                          Code: {off.code}
                        </span>
                        <button
                          onClick={() => handleCopyCoupon(off.code)}
                          className="text-[10px] font-bold text-[#242F66] hover:underline"
                        >
                          {copiedCoupon === off.code ? 'COPIED!' : 'Copy Code'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Countdown Timer */}
                <div className="bg-[#E9F8EE] text-[#0B6E32] px-3 py-1.5 text-xs font-bold flex items-center justify-between border border-[#BCE8CA]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Sale ends in:</span>
                  </div>
                  <span className="font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              {/* Select Size Section with Item Rows */}
              <div className="space-y-4 pt-2 border-t border-gray-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1E31]">
                  Select Size
                </h3>

                {/* Product 1: Topwear */}
                {look.topProduct && (
                  <div className="border border-gray-200 p-3 bg-[#FAFAFA]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={look.topProduct.image}
                          alt={look.topProduct.name}
                          className="w-12 h-12 object-contain bg-white border border-gray-200"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#1A1E31] line-clamp-1">
                            {look.topProduct.name}
                          </h4>
                          <p className="text-xs text-gray-500">Color: ({look.topProduct.color})</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveSizeCategory('top');
                          setShowSizeModal(true);
                        }}
                        className="text-xs text-[#242F66] underline font-semibold shrink-0"
                      >
                        Size Guide
                      </button>
                    </div>

                    {/* Top Sizes Buttons */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {look.topProduct.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedTopSize(size)}
                          className={`w-10 h-8 sm:w-11 sm:h-9 text-xs font-bold border transition-all ${
                            selectedTopSize === size
                              ? 'bg-[#242F66] text-white border-[#242F66]'
                              : 'bg-white text-[#1A1E31] border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product 2: Bottomwear */}
                {look.bottomProduct && (
                  <div className="border border-gray-200 p-3 bg-[#FAFAFA]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={look.bottomProduct.image}
                          alt={look.bottomProduct.name}
                          className="w-12 h-12 object-contain bg-white border border-gray-200"
                        />
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#1A1E31] line-clamp-1">
                            {look.bottomProduct.name}
                          </h4>
                          <p className="text-xs text-gray-500">Color: ({look.bottomProduct.color})</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveSizeCategory('bottom');
                          setShowSizeModal(true);
                        }}
                        className="text-xs text-[#242F66] underline font-semibold shrink-0"
                      >
                        Size Guide
                      </button>
                    </div>

                    {/* Bottom Sizes Buttons */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {look.bottomProduct.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedBottomSize(size)}
                          className={`w-10 h-8 sm:w-11 sm:h-9 text-xs font-bold border transition-all ${
                            selectedBottomSize === size
                              ? 'bg-[#242F66] text-white border-[#242F66]'
                              : 'bg-white text-[#1A1E31] border-gray-300 hover:border-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Add Look to Cart CTA Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#242F66] hover:bg-[#1a234f] text-white font-bold text-sm py-3.5 uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    LOOK ADDED TO CART
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    ADD LOOK TO CART
                  </>
                )}
              </button>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 border border-gray-200 bg-[#FBFBFB] py-3 text-center divide-x divide-gray-200">
                <div className="flex flex-col items-center justify-center gap-1 px-1">
                  <ShieldCheck className="w-4 h-4 text-[#242F66]" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1A1E31]">
                    CASH ON DELIVERY
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-1">
                  <Truck className="w-4 h-4 text-[#242F66]" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1A1E31]">
                    FREE SHIPPING
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-1">
                  <RotateCcw className="w-4 h-4 text-[#242F66]" />
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#1A1E31]">
                    EASY RETURNS
                  </span>
                </div>
              </div>

              {/* Accordions */}
              <div className="border-t border-gray-200 divide-y divide-gray-200">
                {/* Product Description */}
                <div>
                  <button
                    onClick={() => setDescOpen(!descOpen)}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#1A1E31]"
                  >
                    <span>Product Description</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${descOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {descOpen && (
                    <div className="pb-4 text-xs text-[#666875] space-y-2 leading-relaxed">
                      <p>{look.description}</p>
                      {look.fabricCare && (
                        <p className="pt-1 font-medium text-gray-700">Care: {look.fabricCare}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Free Shipping */}
                <div>
                  <button
                    onClick={() => setShippingOpen(!shippingOpen)}
                    className="w-full py-3.5 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#1A1E31]"
                  >
                    <span>Free Shipping</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${shippingOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {shippingOpen && (
                    <div className="pb-4 text-xs text-[#666875] leading-relaxed">
                      We offer free shipping across India on all prepaid orders. Cash on delivery is available with nominal fee. Delivery usually arrives within 3-5 business days.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </StorefrontContainer>
      </section>

      {/* 3. Similar Paired Looks Section */}
      {similarLooks.length > 0 && (
        <section className="py-10 bg-[#F9F9FA] border-t border-gray-200">
          <StorefrontContainer>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1A1E31]">
                  Similar Paired Looks
                </h2>
                <p className="text-xs sm:text-sm text-[#666875] mt-0.5">
                  Handpicked matching sets curated for smooth rotation.
                </p>
              </div>
            </div>

            {/* 4 Cards Grid with floating thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarLooks.map((paired) => {
                const pUrl = `/look/${paired.slug || paired.id}`;
                return (
                  <div
                    key={paired.id}
                    className="bg-white border border-gray-200 shadow-xs flex flex-col justify-between group look-card sharp-card transition-all hover:shadow-md"
                  >
                    {/* Image with Floating Thumbnails */}
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      <Link to={pUrl} className="block w-full h-full">
                        <img
                          src={paired.image}
                          alt={paired.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        />
                      </Link>

                      {/* Top-Right Expert Style Pick Badge */}
                      <span className="absolute top-2.5 right-2.5 z-10 bg-[#1A1E31]/80 backdrop-blur-xs text-white text-[9px] font-semibold px-2 py-0.5">
                        Expert Style Pick
                      </span>

                      {/* Floating Merged Thumbnails */}
                      <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                        {paired.topProduct && (
                          <div className="bg-white/95 backdrop-blur-[2px] p-1 rounded-sm shadow-md border border-white/80 flex flex-col items-center w-12 sm:w-14">
                            <img
                              src={paired.topProduct.image}
                              alt={paired.topProduct.name}
                              className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                            />
                            <span className="text-[8px] font-bold text-[#1A1E31] text-center truncate max-w-full leading-tight mt-0.5">
                              {paired.topProduct.shortLabel || "Top"}
                            </span>
                          </div>
                        )}
                        {paired.bottomProduct && (
                          <div className="bg-white/95 backdrop-blur-[2px] p-1 rounded-sm shadow-md border border-white/80 flex flex-col items-center w-12 sm:w-14">
                            <img
                              src={paired.bottomProduct.image}
                              alt={paired.bottomProduct.name}
                              className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                            />
                            <span className="text-[8px] font-bold text-[#1A1E31] text-center truncate max-w-full leading-tight mt-0.5">
                              {paired.bottomProduct.shortLabel || "Bottom"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <Link to={pUrl} className="block">
                          <h3 className="text-sm font-bold text-[#212121] group-hover:text-[#242F66] transition-colors line-clamp-1">
                            {paired.title}
                          </h3>
                        </Link>
                        <div className="mt-1 space-y-0.5">
                          {paired.itemsIncluded?.map((item, i) => (
                            <p key={i} className="text-[11px] text-[#666875] truncate">
                              • {item}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm sm:text-base font-bold text-[#212121]">
                              ₹{paired.bundlePrice}
                            </span>
                            {paired.originalPrice && (
                              <span className="text-xs text-[#666875] line-through">
                                ₹{paired.originalPrice}
                              </span>
                            )}
                          </div>
                          {paired.lowestPrice && (
                            <span className="text-[10px] text-[#00B852] font-semibold block">
                              Lowest price in 30 days: ₹{paired.lowestPrice}
                            </span>
                          )}
                        </div>

                        <Link
                          to={pUrl}
                          className="bg-[#242F66] hover:bg-[#1a234f] text-white text-[11px] font-bold px-3 py-2 rounded-none transition-colors shrink-0 uppercase tracking-wider"
                        >
                          VIEW LOOK
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </StorefrontContainer>
        </section>
      )}

      {/* 4. Category Suggestion Navigation Pills at bottom */}
      <section className="py-8 bg-white border-t border-gray-100">
        <StorefrontContainer>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/shop?category=sets"
              className="px-5 py-2.5 border border-gray-300 hover:border-black text-xs font-bold text-[#1A1E31] transition-colors"
            >
              More Men Looks ›
            </Link>
            <Link
              to="/shop?category=t-shirts"
              className="px-5 py-2.5 border border-gray-300 hover:border-black text-xs font-bold text-[#1A1E31] transition-colors"
            >
              More Men Topwear ›
            </Link>
            <Link
              to="/shop?category=joggers"
              className="px-5 py-2.5 border border-gray-300 hover:border-black text-xs font-bold text-[#1A1E31] transition-colors"
            >
              More Men Bottomwear ›
            </Link>
          </div>
        </StorefrontContainer>
      </section>

      {/* Size Guide Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 shadow-xl border border-gray-200 relative">
            <button
              onClick={() => setShowSizeModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-lg"
            >
              ✕
            </button>
            <h3 className="text-base font-bold text-[#1A1E31] mb-2">
              Size Guide ({activeSizeCategory === 'top' ? 'Topwear / Hoodies' : 'Bottomwear / Joggers'})
            </h3>
            <p className="text-xs text-gray-500 mb-4">Measurements in inches. Regular fit with natural ease.</p>
            
            <div className="overflow-x-auto text-xs">
              <table className="w-full border-collapse border border-gray-200 text-left">
                <thead className="bg-gray-100 font-bold">
                  <tr>
                    <th className="border border-gray-200 p-2">Size</th>
                    <th className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? 'Chest' : 'Waist'}</th>
                    <th className="border border-gray-200 p-2">Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">S</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '38"' : '28-30"'}</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '27"' : '38"'}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">M</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '40"' : '31-32"'}</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '28"' : '39"'}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">L</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '42"' : '33-34"'}</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '29"' : '40"'}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">XL</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '44"' : '35-36"'}</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '30"' : '41"'}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-2 font-bold">XXL</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '46"' : '37-38"'}</td>
                    <td className="border border-gray-200 p-2">{activeSizeCategory === 'top' ? '31"' : '42"'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowSizeModal(false)}
              className="mt-5 w-full bg-[#242F66] text-white py-2 text-xs font-bold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LookDetailPage;

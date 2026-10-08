import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  ChevronRight,
  ChevronDown,
  Check,
  Tag,
  Share2,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import SizeGuideModal from '../components/SizeGuideModal';
import ProductCard from '../components/ProductCard';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';

const OFFERS = [
  { code: 'LEO100', desc: 'Flat ₹100 OFF on orders above ₹999' },
  { code: 'BUY2SAVE', desc: 'Buy 2 Get Extra 10% OFF automatically' },
  { code: 'FREESHIP', desc: 'Free Express Delivery across India' }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsDrawerOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Delivery Pincode state
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [openAccordion, setOpenAccordion] = useState('desc');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const loadProduct = async () => {
      setLoading(true);
      try {
        const res = await api.getProductById(id);
        if (res.success) {
          setProduct(res.data);
          setRelated(res.related || []);
          setSelectedSize(res.data.sizes?.[0]?.name || 'M');
          setSelectedColorIdx(0);
          setSelectedImageIdx(0);

          const revRes = await api.getReviews({ productId: res.data.id });
          if (revRes.success) setReviews(revRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#242F66] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-[#1A1E31]">Product Not Found</h2>
        <Link to="/men" className="mt-4 bg-[#242F66] text-white text-xs font-bold px-6 py-2.5 rounded-md">
          Explore LEO Men's Catalog
        </Link>
      </div>
    );
  }

  const currentColor = product.colors?.[selectedColorIdx] || product.colors?.[0] || {};
  const gallery = [
    currentColor.image || product.image,
    currentColor.secondaryImage || product.secondaryImage || product.image,
    '/images/product-tee-front.jpg',
    '/images/product-tee-back.jpg'
  ].filter(Boolean);

  const currentImage = gallery[selectedImageIdx] || gallery[0] || product.image;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    addToCart(product, currentColor.name || 'Standard', selectedSize, 1);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }
    addToCart(product, currentColor.name || 'Standard', selectedSize, 1);
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  const handleCheckPincode = async (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) return;
    setIsCheckingPincode(true);
    try {
      const res = await api.checkPincode(pincode);
      setPincodeResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingPincode(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-100 bg-[#F7F8FA] py-2.5">
        <StorefrontContainer>
          <div className="flex items-center gap-1.5 text-xs text-[#666875] font-medium flex-wrap">
            <Link to="/" className="hover:text-[#242F66]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/men" className="hover:text-[#242F66]">Men's Wear</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/${product.category}`} className="hover:text-[#242F66] capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#1A1E31] font-bold truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </div>
        </StorefrontContainer>
      </div>

      {/* Main PDP Layout */}
      <div className="py-6 sm:py-10">
        <StorefrontContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT: Multi-Image Product Gallery */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sticky top-24">
              
              {/* Thumbnail Strip */}
              <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible no-scrollbar shrink-0 py-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-14 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden bg-gray-50 border-2 transition-all shrink-0 ${
                      idx === selectedImageIdx
                        ? 'border-[#242F66] ring-1 ring-[#242F66]'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image View with Touch Swipe */}
              <div
                className="flex-1 relative aspect-[3/4] rounded-xl overflow-hidden bg-[#F7F8FA] border border-gray-200 shadow-sm select-none"
                onTouchStart={(e) => {
                  window._pdpTouchX = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (window._pdpTouchX) {
                    const diff = window._pdpTouchX - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 40) {
                      if (diff > 0) {
                        // swipe left -> next image
                        setSelectedImageIdx((prev) => (prev + 1) % gallery.length);
                      } else {
                        // swipe right -> prev image
                        setSelectedImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
                      }
                    }
                    window._pdpTouchX = null;
                  }
                }}
              >
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badges */}
                {product.isBestseller && (
                  <span className="absolute top-3 left-3 bg-[#242F66] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
                    BESTSELLER
                  </span>
                )}

                {/* Wishlist & Share */}
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-white text-rose-600 shadow'
                        : 'bg-white/90 hover:bg-white text-[#1A1E31] hover:text-rose-600 shadow-sm'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#1A1E31] flex items-center justify-center shadow-sm"
                    title="Share link"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Gallery Indicator Dots */}
                <div className="sm:hidden absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-full">
                  {gallery.map((_, i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i === selectedImageIdx ? 'w-4 bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {copiedLink && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    Link Copied!
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Product Buy Box & Information */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Product Header */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#666875] flex items-center gap-1">
                  {product.fit || 'Oversized Boxy Fit'}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1E31] mt-1 leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs text-[#666875] mt-0.5">
                  {product.subtitle || '240 GSM Bio-Washed Combed Cotton'}
                </p>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 mt-2.5">
                  <div className="inline-flex items-center gap-1 bg-[#242F66] text-white text-xs font-bold px-2 py-0.5 rounded">
                    <span>{product.rating || 4.9}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-xs text-[#666875] font-medium">
                    {product.reviewCount || 1428} Verified Ratings & Reviews
                  </span>
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="p-4 bg-[#F7F8FA] rounded-xl border border-gray-200 space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1A1E31]">
                    ₹{product.price}
                  </span>
                  {product.mrp && (
                    <span className="text-sm sm:text-base text-[#666875] line-through">
                      ₹{product.mrp}
                    </span>
                  )}
                  {product.discount && (
                    <span className="text-xs sm:text-sm font-bold text-[#12B76A]">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#666875] pt-1">
                  <span>Inclusive of all taxes</span>
                  {product.lowestPrice30Days && (
                    <span className="text-[#12B76A] font-semibold">
                      Lowest price in 30 days: ₹{product.lowestPrice30Days}
                    </span>
                  )}
                </div>
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase text-[#1A1E31] block">
                    Color: <strong className="text-[#242F66]">{currentColor.name}</strong>
                  </span>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColorIdx(idx);
                          setSelectedImageIdx(0);
                        }}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          idx === selectedColorIdx
                            ? 'ring-2 ring-[#242F66] ring-offset-1 scale-110 border-white'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {idx === selectedColorIdx && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="uppercase text-[#1A1E31]">
                    Select Size {selectedSize && <span className="text-[#242F66]">({selectedSize})</span>}
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#242F66] hover:underline inline-flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Chart
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`py-2.5 text-xs font-bold rounded-lg border transition-all ${
                        selectedSize === size.name
                          ? 'bg-[#242F66] text-white border-[#242F66] shadow-sm'
                          : 'bg-white hover:bg-gray-50 text-[#1A1E31] border-gray-300'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-amber-700 font-medium">⚡ Hurry, only a few items left in this size!</p>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#242F66] hover:bg-[#1a224a] text-white py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#F59E0B] hover:bg-[#d97706] text-[#1A1E31] py-3.5 rounded-lg font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Zap className="w-4 h-4 fill-[#1A1E31]" /> BUY NOW
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-200 text-[11px] text-[#4A4D5E]">
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-[#242F66] shrink-0" />
                  <span>7-Day Easy Returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#242F66] shrink-0" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#242F66] shrink-0" />
                  <span>COD Available</span>
                </div>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="p-4 bg-[#F7F8FA] rounded-xl border border-gray-200 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#1A1E31]">
                  <Truck className="w-3.5 h-3.5 text-[#242F66]" /> Estimated Delivery
                </div>

                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-xs font-bold uppercase focus:outline-none focus:border-[#242F66]"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingPincode || pincode.length !== 6}
                    className="bg-[#242F66] text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-[#1a224a] disabled:opacity-50"
                  >
                    {isCheckingPincode ? 'Checking...' : 'Check'}
                  </button>
                </form>

                {pincodeResult && (
                  <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
                    <p className="font-bold">Estimated Delivery: {pincodeResult.estimatedDate}</p>
                    <p className="text-[11px] text-emerald-700">Free Shipping & Doorstep Cash on Delivery Available.</p>
                  </div>
                )}
              </div>

              {/* Offers Promo Accordion */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-900">
                  <Tag className="w-3.5 h-3.5 text-amber-600" /> Applicable Promo Offers
                </div>
                <div className="space-y-1.5 text-xs text-amber-950">
                  {OFFERS.map((off, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <span>• {off.desc}</span>
                      <span className="font-bold bg-white border border-amber-300 px-1.5 py-0.5 rounded text-[10px]">
                        {off.code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordion Details */}
              <div className="border-t border-gray-200 divide-y divide-gray-200 text-xs">
                
                {/* 1. Description */}
                <div className="py-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'desc' ? '' : 'desc')}
                    className="w-full flex items-center justify-between font-bold uppercase text-[#1A1E31]"
                  >
                    <span>Product Description</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="pt-2.5 text-[#4A4D5E] leading-relaxed space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Engineered boxy drop shoulder silhouette</li>
                        <li>High-density 240 GSM bio-washed combed cotton</li>
                        <li>Reinforced ribbed neck collar that does not fray or stretch</li>
                        <li>Pre-shrunk to retain shape and fit wash after wash</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* 2. Fabric & Specifications */}
                <div className="py-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')}
                    className="w-full flex items-center justify-between font-bold uppercase text-[#1A1E31]"
                  >
                    <span>Fabric & Material Specifications</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'fabric' ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === 'fabric' && (
                    <div className="pt-2.5 space-y-1.5 text-[#4A4D5E]">
                      <p>• <strong>Material:</strong> {product.fabric || '100% Super Combed French Terry Cotton'}</p>
                      <p>• <strong>Weight:</strong> 240 GSM Heavyweight Fabric</p>
                      <p>• <strong>Finish:</strong> Soft Silicone Bio-Washed</p>
                      <p>• <strong>Country of Origin:</strong> Proudly Made in India</p>
                    </div>
                  )}
                </div>

                {/* 3. Wash Care */}
                <div className="py-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                    className="w-full flex items-center justify-between font-bold uppercase text-[#1A1E31]"
                  >
                    <span>Garment Wash Care</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === 'care' && (
                    <div className="pt-2.5 space-y-1 text-[#4A4D5E]">
                      <p>• Machine wash cold, inside-out with similar colors.</p>
                      <p>• Do not bleach or use fabric softeners.</p>
                      <p>• Tumble dry low or line dry in shade.</p>
                      <p>• Warm iron if needed; do not iron directly on graphics.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Customer Reviews Section */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold uppercase text-[#1A1E31]">
                  Verified Customer Reviews
                </h3>
                <p className="text-xs text-[#666875] mt-0.5">
                  Over 1,400+ men have rated this style 4.9 out of 5.0 stars
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#242F66]">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.slice(0, 3).map((rev) => (
                <div key={rev.id} className="p-4 bg-[#F7F8FA] rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#666875]">{rev.date || 'Recent'}</span>
                  </div>
                  <p className="text-xs text-[#1A1E31] font-medium leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#666875]">
                    <span className="font-bold text-[#1A1E31] flex items-center gap-1">
                      {rev.userName} <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
                    <span>Verified Buyer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* You May Also Like */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-gray-200">
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1E31] mb-6 text-center uppercase">
                Pair It With / You May Also Like
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

        </StorefrontContainer>
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        categoryType={product.category}
      />

      {/* Sticky Mobile Bottom Buy Bar (Nobero Exact Experience) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col shrink-0">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-[#1A1E31]">₹{product.price}</span>
            {product.mrp && <span className="text-[11px] text-[#666875] line-through">₹{product.mrp}</span>}
          </div>
          <span className="text-[10px] text-[#12B76A] font-semibold">
            {selectedSize ? `Size: ${selectedSize}` : 'Free Delivery'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#242F66] active:bg-[#1A1E31] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> ADD
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#F59E0B] active:bg-[#d97706] text-[#1A1E31] py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-[#1A1E31]" /> BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

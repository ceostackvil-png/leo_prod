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
  ChevronLeft,
  ChevronDown,
  Check,
  Tag,
  Share2,
  CheckCircle2,
  ThumbsUp,
  ShoppingCart,
  Copy
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
        <div className="w-8 h-8 border-2 border-[#282C3F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-[#212121]">Product Not Found</h2>
        <Link to="/men" className="mt-4 bg-[#282C3F] text-white text-xs font-bold px-6 py-2.5 rounded-md">
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
            <Link to="/" className="hover:text-[#282C3F]">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/men" className="hover:text-[#282C3F]">Men's Wear</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/${product.category}`} className="hover:text-[#282C3F] capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#212121] font-bold truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </div>
        </StorefrontContainer>
      </div>

      {/* Main PDP Layout */}
      <div className="py-6 sm:py-10">
        <StorefrontContainer>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT: Single Image Product Gallery Carousel */}
            <div className="lg:col-span-7 sticky top-24">

              <div
                className="w-full relative aspect-[3/4] sm:aspect-[4/5] rounded bg-[#F7F8FA] select-none overflow-hidden"
                onTouchStart={(e) => {
                  window._pdpTouchX = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (window._pdpTouchX) {
                    const diff = window._pdpTouchX - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 40) {
                      if (diff > 0) {
                        setSelectedImageIdx((prev) => (prev + 1) % gallery.length);
                      } else {
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

                {/* Left Arrow */}
                {gallery.length > 1 && (
                  <button
                    onClick={() => setSelectedImageIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded shadow flex items-center justify-center text-gray-700 hover:text-black z-10 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Right Arrow */}
                {gallery.length > 1 && (
                  <button
                    onClick={() => setSelectedImageIdx((prev) => (prev + 1) % gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded shadow flex items-center justify-center text-gray-700 hover:text-black z-10 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                {/* Badges */}
                {product.isBestseller && (
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#282C3F] p-1.5 rounded-full shadow-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT: Product Buy Box & Information */}
            <div className="lg:col-span-5 space-y-5">

              {/* Product Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-[22px] sm:text-2xl font-normal text-[#282C3F] leading-tight">
                    {product.title}
                  </h1>

                  {/* Price Breakdown Card */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-[22px] font-bold text-[#282C3F]">
                        ₹{product.price}
                      </span>
                      {product.discount && (
                        <span className="text-[15px] font-bold text-[#00B852]">
                          {product.discount}
                        </span>
                      )}
                    </div>

                    <div className="text-[13px] text-[#7E818C]">
                      <span>MRP: <span className="line-through">₹{product.mrp || '2,999'}</span> Inclusive of all Taxes</span>
                    </div>

                    {product.lowestPrice30Days && (
                      <div className="text-[13px] text-[#800080] mt-1.5 font-medium">
                        Lowest price in last 30 days
                      </div>
                    )}

                    <div className="text-[13px] text-[#D9232D] font-bold flex items-center gap-1.5 mt-2">
                      <ShoppingCart className="w-4 h-4" />
                      {product.recentlyBought || 541} people bought this in last 7 days
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="w-9 h-9 flex items-center justify-center text-[#535766] hover:bg-gray-50 rounded-full shrink-0"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Offers Section */}
              <div className="mt-5 space-y-3">
                <h3 className="text-[14px] font-bold text-[#282C3F]">Save extra with these offers</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {[
                    { price: '₹1,530', original: '₹1799', code: 'B3G15', desc: 'Shop any 3 Get Extra 15% Off' },
                    { price: '₹1,620', original: '₹1799', code: 'B2G10', desc: 'Shop any 2 Get Extra 10% Off' }
                  ].map((offer, idx) => (
                    <div key={idx} className="min-w-[260px] flex-shrink-0 bg-[#FBF9F2] border border-dashed border-[#D4C3A3] rounded p-3 relative">
                      <div className="flex items-start gap-2.5">
                        <Tag className="w-4 h-4 text-[#C19B5E] mt-0.5 shrink-0" />
                        <div className="space-y-1 w-full">
                          <div className="text-[13px] font-bold text-[#282C3F]">
                            Get it for as low as {offer.price} <span className="line-through font-normal text-[#7E818C] text-[11px] ml-1">{offer.original}</span>
                          </div>
                          <div className="text-[11px] text-[#535766]">
                            {offer.desc} Use Code: {offer.code}
                          </div>
                          <div className="flex items-center justify-between pt-1.5 w-full">
                            <div className="text-[11px] font-bold text-[#282C3F] flex items-center gap-1 cursor-pointer">
                              Code: {offer.code} <Copy className="w-3 h-3 text-[#7E818C]" />
                            </div>
                            <span className="text-[10px] text-[#526BCA] font-medium cursor-pointer">Offer T&C</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3 mt-6">
                  <span className="text-[14px] font-bold text-[#282C3F] block">
                    Select Color - <span className="font-normal text-[#535766]">{currentColor.name}</span>
                  </span>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {product.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedColorIdx(idx);
                          setSelectedImageIdx(0);
                        }}
                        className={`w-[52px] h-[68px] rounded overflow-hidden relative transition-all ${idx === selectedColorIdx
                            ? 'border-[1.5px] border-[#282C3F] p-[1.5px]'
                            : 'border-[1.5px] border-transparent hover:border-gray-200'
                          }`}
                        title={c.name}
                      >
                        <img
                          src={c.image || product.image}
                          className="w-full h-full object-cover rounded-[2px]"
                          alt={c.name}
                        />
                        {idx === selectedColorIdx && (
                          <div className="absolute bottom-1 right-1 bg-white rounded-full p-[2px] shadow-sm">
                            <Check className="w-2.5 h-2.5 text-[#00B852]" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center text-[14px]">
                  <span className="font-bold text-[#282C3F]">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#526BCA] font-bold text-[13px] hover:underline"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.sizes?.map((size) => {
                    const sizeValue = typeof size === 'string' ? size : size.name;
                    return (
                      <button
                        key={sizeValue}
                        onClick={() => setSelectedSize(sizeValue)}
                        className={`w-[52px] h-[52px] flex items-center justify-center text-sm rounded transition-all border ${selectedSize === sizeValue
                            ? 'border-[#282C3F] text-[#282C3F] font-bold'
                            : 'bg-white hover:border-[#282C3F] text-[#282C3F] border-gray-300 hover:text-[#282C3F] font-medium'
                          }`}
                      >
                        {sizeValue}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="flex gap-3 pt-5">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-gray-50 text-[#282C3F] py-3.5 rounded border-[1.5px] border-[#282C3F] font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#00B852] hover:bg-[#009b45] text-white py-3.5 rounded font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Zap className="w-4 h-4 fill-white" /> BUY NOW
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-200 mt-5 text-[12px] text-[#535766] font-medium">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#282C3F] shrink-0" />
                  <span>7-Day Easy Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#282C3F] shrink-0" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#282C3F] shrink-0" />
                  <span>COD Available</span>
                </div>
              </div>

              {/* Delivery Pincode Checker */}
              <div className="p-4 bg-[#FBF9F2] rounded border border-[#D4C3A3] space-y-3 mt-5">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#282C3F]">
                  <Truck className="w-4 h-4 text-[#C19B5E]" /> Estimated Delivery
                </div>

                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 px-3 py-2.5 bg-white border border-[#D4C3A3] rounded text-sm font-medium focus:outline-none focus:border-[#C19B5E]"
                  />
                  <button
                    type="submit"
                    disabled={isCheckingPincode || pincode.length !== 6}
                    className="bg-[#282C3F] text-white text-sm font-bold px-5 py-2.5 rounded hover:bg-[#212121] disabled:opacity-50 transition-colors"
                  >
                    {isCheckingPincode ? 'Checking...' : 'Check'}
                  </button>
                </form>

                {pincodeResult && (
                  <div className="text-sm text-[#00B852] font-medium pt-1">
                    <p>Estimated Delivery: {pincodeResult.estimatedDate}</p>
                  </div>
                )}
              </div>

              {/* Accordion Details */}
              <div className="border-t border-gray-200 divide-y divide-gray-200 text-xs">

                {/* 1. Description */}
                <div className="py-3">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'desc' ? '' : 'desc')}
                    className="w-full flex items-center justify-between font-bold uppercase text-[#212121]"
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
                    className="w-full flex items-center justify-between font-bold uppercase text-[#212121]"
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
                    className="w-full flex items-center justify-between font-bold uppercase text-[#212121]"
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
                <h3 className="text-lg sm:text-xl font-bold uppercase text-[#212121]">
                  Verified Customer Reviews
                </h3>
                <p className="text-xs text-[#666875] mt-0.5">
                  Over 1,400+ men have rated this style 4.9 out of 5.0 stars
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#282C3F]">4.9</span>
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
                  <p className="text-xs text-[#212121] font-medium leading-relaxed">
                    "{rev.comment}"
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#666875]">
                    <span className="font-bold text-[#212121] flex items-center gap-1">
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
              <h3 className="text-lg lg:text-xl font-bold text-[#212121] mb-6 text-center uppercase">
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
            <span className="text-base font-bold text-[#212121]">₹{product.price}</span>
            {product.mrp && <span className="text-[11px] text-[#666875] line-through">₹{product.mrp}</span>}
          </div>
          <span className="text-[10px] text-[#00B852] font-semibold">
            {selectedSize ? `Size: ${selectedSize}` : 'Free Delivery'}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#282C3F] active:bg-[#212121] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> ADD
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-[#00B852] active:bg-[#d97706] text-[#212121] py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1 transition-transform active:scale-95 shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-[#212121]" /> BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

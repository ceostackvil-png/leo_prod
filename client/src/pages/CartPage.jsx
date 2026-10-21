import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldCheck,
  Check,
  RotateCcw,
  Truck,
  Banknote,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import StorefrontContainer from '../components/StorefrontContainer';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

const AVAILABLE_COUPONS = [
  {
    code: 'B2G10',
    title: 'Buy 2 Get 10% Off',
    desc: 'Congrats! "B2G10" unlocked on 2+ items 🎉',
    type: 'percent',
    value: 10,
    minOrder: 999
  },
  {
    code: 'LEO100',
    title: 'Flat ₹100 Off',
    desc: 'Special launch discount on orders above ₹799',
    type: 'flat',
    value: 100,
    minOrder: 799
  },
  {
    code: 'FIRST15',
    title: '15% Off First Order',
    desc: '15% Off up to ₹350 for new members',
    type: 'percent',
    value: 15,
    minOrder: 999
  },
  {
    code: 'BUY2SAVE',
    title: '20% Mega Savings',
    desc: 'Flat 20% off on orders above ₹1,999',
    type: 'percent',
    value: 20,
    minOrder: 1999
  }
];

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalMrp,
    totalSavings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    totalItemCount,
    potentialB2G10Discount
  } = useCart();

  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);

  // Live ticking countdown
  const [timeLeft, setTimeLeft] = useState(5 * 3600 + 44 * 60 + 57);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 20697));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec) => {
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}h : ${m}m : ${s}s`;
  };

  // PIN Code Delivery Checker State
  const [isPinExpanded, setIsPinExpanded] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  const handleCheckPincode = async (e) => {
    if (e) e.preventDefault();
    if (!pincode || pincode.length !== 6) return;
    setIsCheckingPin(true);
    try {
      const res = await fetch('/api/pincode/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pincode })
      });
      const data = await res.json();
      if (data && data.success) {
        setPincodeStatus(data);
      } else {
        const estDate = new Date();
        estDate.setDate(estDate.getDate() + 3);
        const formattedDelivery = estDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
        setPincodeStatus({
          pincode,
          estimatedDate: formattedDelivery,
          message: `Delivery available by ${formattedDelivery}. Free Shipping & COD available.`
        });
      }
    } catch {
      const estDate = new Date();
      estDate.setDate(estDate.getDate() + 3);
      const formattedDelivery = estDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setPincodeStatus({
        pincode,
        estimatedDate: formattedDelivery,
        message: `Delivery available by ${formattedDelivery}. Free Shipping & COD available.`
      });
    } finally {
      setIsCheckingPin(false);
    }
  };

  // Coupon Accordion & Manual Input State
  const [isCouponsExpanded, setIsCouponsExpanded] = useState(false);
  const [customCoupon, setCustomCoupon] = useState('');

  // Order Summary Accordion State
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const res = await api.getProducts({ limit: 4 });
        if (res && res.success) setRecommended(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadRecommendations();
  }, []);

  const b2g10Savings = potentialB2G10Discount || Math.round(subtotal * 0.1) || 279;
  const isB2G10Applied = appliedCoupon?.code === 'B2G10';

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white py-12">
        <StorefrontContainer>
          <div className="py-16 text-center bg-[#F7F8FA] rounded-none border border-gray-200 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-white rounded-none flex items-center justify-center mx-auto mb-4 text-gray-400 border border-gray-200 shadow-sm">
              <ShoppingBag className="w-8 h-8 text-[#1e2b58]" />
            </div>
            <h2 className="text-xl font-bold text-[#111827]">Your Shopping Cart is Empty</h2>
            <p className="text-xs text-[#666875] mt-1.5 max-w-sm mx-auto">
              Explore our bestselling heavyweight oversized tees, cargo joggers, and travel polos.
            </p>
            <Link
              to="/men"
              className="mt-6 inline-flex items-center gap-2 bg-[#1e2b58] hover:bg-[#152044] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-none transition-all shadow-sm"
            >
              SHOP MEN'S WEAR <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </StorefrontContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] py-6 sm:py-10">
      <StorefrontContainer>
        {/* Breadcrumb Navigation */}
        <div className="mb-4 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="text-[#111827] font-semibold">Shopping Cart</span>
        </div>

        {/* Center Card with Exact Nobero Layout and Aspect Ratio */}
        <div className="max-w-[460px] mx-auto bg-[#fafafa] border border-gray-200 rounded-none shadow-lg overflow-hidden flex flex-col">
          
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[#111827] tracking-tight font-sans">
              Shopping Cart ({totalItemCount})
            </h2>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#1e2b58] hover:underline"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Mint Green Sale Ends Countdown Banner */}
          <div className="bg-[#d4f9e2] text-[#111827] text-center py-2 px-3 text-[12px] sm:text-[13px] border-b border-[#bbf7d0] shrink-0 font-normal">
            Sale ends in : <strong className="font-bold">{formatCountdown(timeLeft)}</strong>
          </div>

          {/* Body Content */}
          <div className="p-0 space-y-3 pb-6">

            {/* PIN Code Box */}
            <div className="mx-4 mt-3 bg-white border border-[#e5e7eb] rounded-none p-3.5 shadow-none">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsPinExpanded(!isPinExpanded)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-none bg-[#1e2b58]/10 flex items-center justify-center text-[#1e2b58]">
                    <MapPin className="w-3.5 h-3.5 fill-[#1e2b58] text-[#1e2b58]" />
                  </div>
                  <span className="text-[13px] sm:text-[13.5px] text-[#111827]">
                    <strong className="font-bold">Enter PIN CODE</strong>{' '}
                    <span className="text-[#6b7280]">to check delivery details</span>
                  </span>
                </div>
                {isPinExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>

              {isPinExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 border border-gray-300 rounded-none px-3 py-1.5 text-xs text-[#111827] focus:outline-none focus:border-[#1e2b58]"
                    />
                    <button
                      type="submit"
                      disabled={isCheckingPin || pincode.length !== 6}
                      className="bg-[#1e2b58] text-white text-xs font-bold px-4 py-1.5 rounded-none hover:bg-[#162144] disabled:opacity-50 transition-colors"
                    >
                      {isCheckingPin ? 'Checking...' : 'Check'}
                    </button>
                  </form>
                  {pincodeStatus && (
                    <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded-none text-[11px] text-emerald-800 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{pincodeStatus.message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="px-4 space-y-3">
              {items.map((item) => {
                const mrpVal = item.mrp || Math.round(item.price * 1.25);
                const discountVal = mrpVal - item.price;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-[#e5e7eb] rounded-none p-3 flex gap-3.5 shadow-none relative"
                  >
                    {/* Product Image: Exact 3:4 Aspect Ratio Portrait (~105px x ~135px) */}
                    <div className="relative shrink-0 w-[100px] sm:w-[105px] h-[130px] sm:h-[135px] rounded-none overflow-hidden bg-gray-50 border border-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center rounded-none"
                        onError={(e) => {
                          e.target.src = '/images/stay_fluid_violet_tee.jpg';
                        }}
                      />
                    </div>

                    {/* Right Details Column */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="text-[14px] sm:text-[15px] font-medium text-[#111827] leading-snug line-clamp-1">
                          {item.title}
                        </h4>

                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-[15px] sm:text-[16px] font-bold text-[#111827]">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                          {mrpVal > item.price && (
                            <span className="text-xs sm:text-[13px] text-gray-400 line-through">
                              ₹{mrpVal.toLocaleString('en-IN')}
                            </span>
                          )}
                          {discountVal > 0 && (
                            <span className="text-xs sm:text-[13px] font-bold text-[#16a34a]">
                              ₹{discountVal.toLocaleString('en-IN')} OFF
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <span className="text-gray-400">Color:</span>
                          <span className="text-[#111827] font-medium">{item.color || 'Standard'}</span>
                        </div>

                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="text-gray-400">Size:</span>
                          <span className="text-[#111827] font-medium">{item.size || 'L'}</span>
                        </div>

                        {(item.stockLeft || item.size === 'M') && (
                          <div className="mt-1.5">
                            <span className="inline-block bg-[#fff1f2] text-[#e11d48] text-[11px] font-semibold px-2 py-0.5 rounded-none">
                              {item.stockLeft || 6} item left
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Stepper & Trash Row */}
                      <div className="flex items-center justify-between mt-2.5 pt-1">
                        <div className="flex items-center border border-gray-200 rounded-none bg-white overflow-hidden shadow-none">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2.5 py-0.5 text-gray-500 hover:text-black font-semibold text-xs transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-0.5 text-xs font-semibold text-[#111827] min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2.5 py-0.5 text-gray-500 hover:text-black font-semibold text-xs transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 7-Days Free Return & Exchange Available Strip */}
            <div className="mx-4 bg-[#fdf2f8] border border-[#fce7f3] rounded-none py-2 px-3 flex items-center justify-center gap-2 text-xs text-[#831843]">
              <div className="w-4 h-4 text-[#f43f5e] shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <span className="font-normal text-[#111827]">
                <strong className="font-bold text-[#111827]">7-Days</strong> Free Return & Exchange Available
              </span>
            </div>

            {/* Coupons Box */}
            <div className="mx-4 bg-[#f0fbf4] border border-[#bbf7d0] rounded-none p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 text-[#16a34a] shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l1.6 3.2 3.6-.8.8 3.6 3.2 1.6-1.6 3.2 1.6 3.2-3.2 1.6-.8 3.6-3.6-.8-1.6 3.2-1.6-3.2-3.6.8-.8-3.6-3.2-1.6 1.6-3.2-1.6-3.2 3.2-1.6.8-3.6 3.6.8L12 2zm-1 13l5-5-1.4-1.4L11 12.2l-2-2-1.4 1.4 3.4 3.4z" />
                    </svg>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-[#111827] text-[14px]">B2G10</span>
                    <span className="font-bold text-[#16a34a] text-[13px]">Save ₹{b2g10Savings}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (isB2G10Applied) {
                      removeCoupon();
                    } else {
                      applyCoupon('B2G10');
                    }
                  }}
                  className={`text-xs font-bold px-3.5 py-1 rounded-none border transition-colors ${
                    isB2G10Applied
                      ? 'bg-[#1e2b58] text-white border-[#1e2b58]'
                      : 'border-[#1e2b58] text-[#1e2b58] hover:bg-[#1e2b58] hover:text-white'
                  }`}
                >
                  {isB2G10Applied ? 'Applied' : 'Apply'}
                </button>
              </div>

              <p className="text-[12px] text-[#111827] pl-7">
                {isB2G10Applied
                  ? "Awesome! 'B2G10' applied successfully 🎉"
                  : "Congrats! 'B2G10' unlocked 🎉"}
              </p>

              <div className="pt-2 border-t border-[#dcfce7]">
                <button
                  onClick={() => setIsCouponsExpanded(!isCouponsExpanded)}
                  className="w-full flex items-center justify-between text-xs text-[#111827] font-medium"
                >
                  <span>View all coupons</span>
                  {isCouponsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {isCouponsExpanded && (
                  <div className="mt-3 space-y-2.5 pt-2 border-t border-[#dcfce7]">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={customCoupon}
                        onChange={(e) => setCustomCoupon(e.target.value.toUpperCase())}
                        className="flex-1 bg-white border border-gray-300 rounded-none px-2.5 py-1.5 text-xs uppercase font-bold focus:outline-none focus:border-[#1e2b58]"
                      />
                      <button
                        onClick={() => {
                          if (customCoupon) {
                            applyCoupon(customCoupon);
                            setCustomCoupon('');
                          }
                        }}
                        className="bg-[#1e2b58] text-white text-xs font-bold px-3.5 py-1.5 rounded-none hover:bg-[#162144]"
                      >
                        Apply
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {AVAILABLE_COUPONS.map((cpn) => {
                        const isThisApplied = appliedCoupon?.code === cpn.code;
                        return (
                          <div
                            key={cpn.code}
                            className="bg-white border border-[#dcfce7] rounded-none p-2.5 flex items-center justify-between"
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-[#16a34a]" />
                                <span className="font-bold text-xs text-[#111827]">{cpn.code}</span>
                                <span className="text-[11px] text-gray-500">({cpn.title})</span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-0.5">{cpn.desc}</p>
                            </div>
                            <button
                              onClick={() => {
                                if (isThisApplied) {
                                  removeCoupon();
                                } else {
                                  applyCoupon(cpn.code);
                                }
                              }}
                              className={`text-xs font-bold px-2.5 py-1 rounded-none border transition-colors ${
                                isThisApplied
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'border-[#1e2b58] text-[#1e2b58] hover:bg-[#1e2b58] hover:text-white'
                              }`}
                            >
                              {isThisApplied ? 'Applied' : 'Apply'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 100% Secure Transaction & Payment Methods Strip */}
            <div className="mx-4 mt-4 pt-2 text-center space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-[13.5px] font-semibold text-[#1e2b58]">
                <ShieldCheck className="w-4 h-4 fill-[#1e2b58] text-white" />
                <span>100% secure transaction</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-bold shadow-sm">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">P</span>
                  <span className="text-[#FBBC05]">a</span>
                  <span className="text-[#34A853]">y</span>
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-extrabold text-[#002e6e] shadow-sm tracking-tighter">
                  pay<span className="text-[#00b9f5]">tm</span>
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-bold text-[#5f259f] shadow-sm gap-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#5f259f] text-white flex items-center justify-center text-[8px] font-black">पे</span>
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-black italic text-[#1a1f71] shadow-sm">
                  VISA
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 text-[9.5px] font-black text-[#097939] shadow-sm">
                  RuPay<span className="text-[#f15a24]">❯</span>
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 text-[9px] font-bold text-[#ff3366] shadow-sm">
                  LazyPay
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 shadow-sm">
                  <div className="w-3 h-3 rounded-full bg-[#eb001b] -mr-1" />
                  <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90" />
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-bold text-[#131921] shadow-sm">
                  pay<span className="text-[#ff9900] text-xs">⌣</span>
                </div>
                <div className="border border-gray-200 rounded-none px-2 py-1 bg-[#006fcf] text-white flex items-center justify-center h-6 text-[8.5px] font-black shadow-sm tracking-tight">
                  AMEX
                </div>
              </div>
            </div>

            {/* Order Summary Accordion */}
            <div className="mx-4 bg-white border border-[#e5e7eb] rounded-none p-3.5 shadow-none">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              >
                <span className="text-[13.5px] font-bold text-[#111827]">Order Summary</span>
                {isSummaryExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>

              <div className="flex justify-between items-center text-xs mt-2.5">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-bold text-[#111827] text-sm">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {isSummaryExpanded && (
                <div className="mt-2.5 pt-2.5 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Total MRP</span>
                    <span className="font-medium text-gray-900">₹{totalMrp.toLocaleString('en-IN')}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-[#16a34a]">
                      <span>Discount on MRP</span>
                      <span className="font-semibold">-₹{totalSavings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#16a34a]">
                      <span>Coupon Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Charges</span>
                    <span className="text-[#16a34a] font-bold">FREE</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3-Pillar Trust Strip */}
            <div className="mx-4 bg-white border border-[#e5e7eb] rounded-none py-3 px-1 flex divide-x divide-gray-200">
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                <Banknote className="w-5 h-5 text-[#1e2b58] stroke-[1.8]" />
                <span className="text-[9.5px] sm:text-[10px] font-bold text-[#1e2b58] uppercase leading-tight mt-1.5">
                  CASH ON<br />DELIVERY
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                <Truck className="w-5 h-5 text-[#1e2b58] stroke-[1.8]" />
                <span className="text-[9.5px] sm:text-[10px] font-bold text-[#1e2b58] uppercase leading-tight mt-1.5">
                  FREE<br />SHIPPING
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                <RotateCcw className="w-5 h-5 text-[#1e2b58] stroke-[1.8]" />
                <span className="text-[9.5px] sm:text-[10px] font-bold text-[#1e2b58] uppercase leading-tight mt-1.5">
                  EASY<br />RETURNS
                </span>
              </div>
            </div>

          </div>

          {/* Sticky/Fixed Footer inside Card */}
          <div className="bg-white border-t border-[#e5e7eb] p-3.5 sm:p-4 flex items-center justify-between gap-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] shrink-0">
            <div className="min-w-[90px]">
              <div className="text-[17px] sm:text-[19px] font-bold text-[#111827] leading-none">
                ₹{finalTotal.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-gray-500 font-medium mt-1">
                Total payable
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="flex-1 bg-[#1e2b58] hover:bg-[#162144] text-white font-bold py-3 sm:py-3.5 px-6 rounded-none text-sm tracking-wide transition-all shadow-sm text-center active:scale-[0.99]"
            >
              Proceed to Buy
            </button>
          </div>

        </div>

        {/* Recommended Products Carousel / Grid */}
        {recommended.length > 0 && (
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#111827]">
                You May Also Like
              </h3>
              <Link to="/shop" className="text-xs font-bold text-[#1e2b58] hover:underline flex items-center gap-1">
                VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommended.slice(0, 4).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </StorefrontContainer>
    </div>
  );
};

export default CartPage;

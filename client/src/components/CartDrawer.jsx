import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
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

const CartDrawer = () => {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
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

  // Live ticking countdown: e.g. 05h : 44m : 57s
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

  if (!isDrawerOpen) return null;

  const handleProceedBuy = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  const b2g10Savings = potentialB2G10Discount || Math.round(subtotal * 0.1) || 279;
  const isB2G10Applied = appliedCoupon?.code === 'B2G10';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        {/* Exact Nobero Aspect Ratio Drawer Container (420px - 440px wide) */}
        <div className="w-screen max-w-[430px] sm:max-w-[450px] bg-[#fafafa] shadow-2xl flex flex-col justify-between animate-drawer-right h-full">
          
          {/* 1. Header (Exact Nobero: "Shopping Cart (2)" with X) */}
          <div className="px-4 py-3.5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <h2 className="text-[17px] sm:text-[18px] font-bold text-[#111827] tracking-tight font-sans">
              Shopping Cart ({totalItemCount})
            </h2>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 text-[#111827] hover:opacity-70 transition-opacity"
              aria-label="Close Shopping Cart"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>

          {/* 2. Mint Green Sale Ends Countdown Banner */}
          <div className="bg-[#d4f9e2] text-[#111827] text-center py-2 px-3 text-[12px] sm:text-[13px] border-b border-[#bbf7d0] shrink-0 font-normal">
            Sale ends in : <strong className="font-bold">{formatCountdown(timeLeft)}</strong>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto divide-y-0 space-y-3 pb-6">

            {/* 3. PIN Code Box (Exact Nobero Card) */}
            <div className="mx-4 mt-3 bg-white border border-[#e5e7eb] rounded-sm p-3.5 shadow-none">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsPinExpanded(!isPinExpanded)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1e2b58]/10 flex items-center justify-center text-[#1e2b58]">
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

              {/* Expanded PIN Code Input Form */}
              {isPinExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-xs text-[#111827] focus:outline-none focus:border-[#1e2b58]"
                    />
                    <button
                      type="submit"
                      disabled={isCheckingPin || pincode.length !== 6}
                      className="bg-[#1e2b58] text-white text-xs font-bold px-4 py-1.5 rounded-sm hover:bg-[#162144] disabled:opacity-50 transition-colors"
                    >
                      {isCheckingPin ? 'Checking...' : 'Check'}
                    </button>
                  </form>
                  {pincodeStatus && (
                    <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-800 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{pincodeStatus.message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4. Cart Items List */}
            <div className="px-4 space-y-3">
              {items.length === 0 ? (
                <div className="py-14 text-center bg-white border border-[#e5e7eb] rounded-sm p-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-[#111827]">Your cart is empty</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Explore our bestselling heavyweight oversized tees, travel joggers and curated sets.
                  </p>
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      navigate('/shop');
                    }}
                    className="mt-5 inline-flex items-center gap-2 bg-[#1e2b58] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-sm hover:bg-[#152044] transition-all"
                  >
                    EXPLORE BESTSELLERS <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const mrpVal = item.mrp || Math.round(item.price * 1.25);
                  const discountVal = mrpVal - item.price;

                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-[#e5e7eb] rounded-sm p-3 flex gap-3.5 shadow-none transition-shadow relative"
                    >
                      {/* Product Image: Exact 3:4 Aspect Ratio Portrait (~105px wide x ~135px high) */}
                      <div className="relative shrink-0 w-[100px] sm:w-[105px] h-[130px] sm:h-[135px] rounded-sm overflow-hidden bg-gray-50 border border-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.src = '/images/stay_fluid_violet_tee.jpg';
                          }}
                        />
                      </div>

                      {/* Right Details Column */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          {/* Title */}
                          <h4 className="text-[14px] sm:text-[15px] font-medium text-[#111827] leading-snug line-clamp-1">
                            {item.title}
                          </h4>

                          {/* Price Line (Active Price, Strikethrough MRP, Green Discount) */}
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

                          {/* Color Line */}
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <span className="text-gray-400">Color:</span>
                            <span className="text-[#111827] font-medium">{item.color || 'Standard'}</span>
                          </div>

                          {/* Size Line */}
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="text-gray-400">Size:</span>
                            <span className="text-[#111827] font-medium">{item.size || 'L'}</span>
                          </div>

                          {/* Urgency Stock Alert Badge: Exact Nobero "6 item left" in soft pink */}
                          {(item.stockLeft || item.size === 'M') && (
                            <div className="mt-1.5">
                              <span className="inline-block bg-[#fff1f2] text-[#e11d48] text-[11px] font-semibold px-2 py-0.5 rounded-sm">
                                {item.stockLeft || 6} item left
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Stepper & Trash Can Row */}
                        <div className="flex items-center justify-between mt-2.5 pt-1">
                          {/* Stepper Pill Box */}
                          <div className="flex items-center border border-gray-200 rounded-sm bg-white overflow-hidden shadow-none">
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

                          {/* Trash Icon */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <>
                {/* 5. 7-Days Free Return & Exchange Available Strip */}
                <div className="mx-4 bg-[#fdf2f8] border border-[#fce7f3] rounded-sm py-2 px-3 flex items-center justify-center gap-2 text-xs text-[#831843]">
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

                {/* 6. Coupons Box (Exact Nobero Mint Green Box) */}
                <div className="mx-4 bg-[#f0fbf4] border border-[#bbf7d0] rounded-sm p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Green Flower/Rosette Badge Icon */}
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

                    {/* Apply Button (Navy Outline Pill) */}
                    <button
                      onClick={() => {
                        if (isB2G10Applied) {
                          removeCoupon();
                        } else {
                          applyCoupon('B2G10');
                        }
                      }}
                      className={`text-xs font-bold px-3.5 py-1 rounded-sm border transition-colors ${
                        isB2G10Applied
                          ? 'bg-[#1e2b58] text-white border-[#1e2b58]'
                          : 'border-[#1e2b58] text-[#1e2b58] hover:bg-[#1e2b58] hover:text-white'
                      }`}
                    >
                      {isB2G10Applied ? 'Applied' : 'Apply'}
                    </button>
                  </div>

                  {/* Subtitle Line */}
                  <p className="text-[12px] text-[#111827] pl-7">
                    {isB2G10Applied
                      ? "Awesome! 'B2G10' applied successfully 🎉"
                      : "Congrats! 'B2G10' unlocked 🎉"}
                  </p>

                  {/* Accordion: "View all coupons" */}
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
                        {/* Custom Code Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={customCoupon}
                            onChange={(e) => setCustomCoupon(e.target.value.toUpperCase())}
                            className="flex-1 bg-white border border-gray-300 rounded-sm px-2.5 py-1.5 text-xs uppercase font-bold focus:outline-none focus:border-[#1e2b58]"
                          />
                          <button
                            onClick={() => {
                              if (customCoupon) {
                                applyCoupon(customCoupon);
                                setCustomCoupon('');
                              }
                            }}
                            className="bg-[#1e2b58] text-white text-xs font-bold px-3.5 py-1.5 rounded-sm hover:bg-[#162144]"
                          >
                            Apply
                          </button>
                        </div>

                        {/* List of Coupons */}
                        <div className="space-y-2 pt-1">
                          {AVAILABLE_COUPONS.map((cpn) => {
                            const isThisApplied = appliedCoupon?.code === cpn.code;
                            return (
                              <div
                                key={cppn.code}
                                className="bg-white border border-[#dcfce7] rounded-sm p-2.5 flex items-center justify-between"
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
                                  className={`text-xs font-bold px-2.5 py-1 rounded-sm border transition-colors ${
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

                {/* 7. 100% Secure Transaction & Official Payment Strip */}
                <div className="mx-4 mt-4 pt-2 text-center space-y-2.5">
                  <div className="flex items-center justify-center gap-1.5 text-[13.5px] font-semibold text-[#1e2b58]">
                    <ShieldCheck className="w-4 h-4 fill-[#1e2b58] text-white" />
                    <span>100% secure transaction</span>
                  </div>

                  {/* Payment Badges Strip: GPay, Paytm, PhonePe, VISA, RuPay, LazyPay, Mastercard, Amazon Pay, Amex */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
                    {/* GPay */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-bold shadow-sm">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">P</span>
                      <span className="text-[#FBBC05]">a</span>
                      <span className="text-[#34A853]">y</span>
                    </div>

                    {/* Paytm */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-extrabold text-[#002e6e] shadow-sm tracking-tighter">
                      pay<span className="text-[#00b9f5]">tm</span>
                    </div>

                    {/* PhonePe */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-bold text-[#5f259f] shadow-sm gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#5f259f] text-white flex items-center justify-center text-[8px] font-black">पे</span>
                    </div>

                    {/* VISA */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-black italic text-[#1a1f71] shadow-sm">
                      VISA
                    </div>

                    {/* RuPay */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 text-[9.5px] font-black text-[#097939] shadow-sm">
                      RuPay<span className="text-[#f15a24]">❯</span>
                    </div>

                    {/* LazyPay */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 text-[9px] font-bold text-[#ff3366] shadow-sm">
                      LazyPay
                    </div>

                    {/* Mastercard */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 shadow-sm">
                      <div className="w-3 h-3 rounded-full bg-[#eb001b] -mr-1" />
                      <div className="w-3 h-3 rounded-full bg-[#f79e1b] opacity-90" />
                    </div>

                    {/* Amazon Pay */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-white flex items-center justify-center h-6 text-[10px] font-bold text-[#131921] shadow-sm">
                      pay<span className="text-[#ff9900] text-xs">⌣</span>
                    </div>

                    {/* Amex */}
                    <div className="border border-gray-200 rounded-sm px-2 py-1 bg-[#006fcf] text-white flex items-center justify-center h-6 text-[8.5px] font-black shadow-sm tracking-tight">
                      AMEX
                    </div>
                  </div>
                </div>

                {/* 8. Order Summary Accordion (Exact Nobero Card) */}
                <div className="mx-4 bg-white border border-[#e5e7eb] rounded-sm p-3.5 shadow-none">
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

                  {/* Subtotal line always visible */}
                  <div className="flex justify-between items-center text-xs mt-2.5">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-bold text-[#111827] text-sm">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Expanded Breakdown */}
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

                {/* 9. 3-Pillar Trust Strip (CASH ON DELIVERY | FREE SHIPPING | EASY RETURNS) */}
                <div className="mx-4 bg-white border border-[#e5e7eb] rounded-sm py-3 px-1 flex divide-x divide-gray-200">
                  {/* Pillar 1 */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                    <Banknote className="w-5 h-5 text-[#1e2b58] stroke-[1.8]" />
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-[#1e2b58] uppercase leading-tight mt-1.5">
                      CASH ON<br />DELIVERY
                    </span>
                  </div>

                  {/* Pillar 2 */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                    <Truck className="w-5 h-5 text-[#1e2b58] stroke-[1.8]" />
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-[#1e2b58] uppercase leading-tight mt-1.5">
                      FREE<br />SHIPPING
                    </span>
                  </div>

                  {/* Pillar 3 */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                    <RotateCcw className="w-5 h-5 text-[#1e2b58] stroke-[1.8]" />
                    <span className="text-[9.5px] sm:text-[10px] font-bold text-[#1e2b58] uppercase leading-tight mt-1.5">
                      EASY<br />RETURNS
                    </span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* 10. Sticky Bottom Bar: Total Payable & Proceed to Buy CTA */}
          {items.length > 0 && (
            <div className="sticky bottom-0 z-20 bg-white border-t border-[#e5e7eb] p-3.5 sm:p-4 flex items-center justify-between gap-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] shrink-0">
              {/* Left Price Details */}
              <div className="min-w-[90px]">
                <div className="text-[17px] sm:text-[19px] font-bold text-[#111827] leading-none">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-gray-500 font-medium mt-1">
                  Total payable
                </div>
              </div>

              {/* Right CTA Button */}
              <button
                onClick={handleProceedBuy}
                className="flex-1 bg-[#1e2b58] hover:bg-[#162144] text-white font-bold py-3 sm:py-3.5 px-6 rounded-sm text-sm tracking-wide transition-all shadow-sm text-center active:scale-[0.99]"
              >
                Proceed to Buy
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

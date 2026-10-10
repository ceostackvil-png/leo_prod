import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const QUICK_COUPONS = [
  { code: 'LEO100', desc: 'Flat ₹100 Off' },
  { code: 'FIRST15', desc: '15% Off' },
  { code: 'BUY2SAVE', desc: '20% Off above ₹1999' }
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
    shippingFee,
    isFreeShipping,
    progressToFreeShipping,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError,
    couponSuccess,
    isApplyingCoupon,
    discountAmount,
    finalTotal,
    totalItemCount
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleApply = (codeToApply) => {
    const c = codeToApply || inputCoupon;
    if (c) {
      applyCoupon(c);
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-drawer-right">
          
          {/* Header (Exact Nobero) */}
          <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#282C3F]" />
              <h2 className="text-sm sm:text-base font-bold text-[#212121] uppercase tracking-wide font-display">
                MY CART ({totalItemCount} {totalItemCount === 1 ? 'ITEM' : 'ITEMS'})
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar (Exact Nobero) */}
          <div className="bg-[#282C3F] text-white px-5 py-3 text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                {isFreeShipping ? (
                  <span className="text-emerald-300 font-bold">
                    You unlocked FREE Express Shipping! 🎉
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-white">₹{amountNeededForFreeShipping}</strong> more for <strong className="text-emerald-300">FREE Shipping</strong>
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-[#212121]">Your cart is empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Explore our heavy-weight oversized tees, travel joggers and curated sets.
                </p>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-6 inline-flex items-center gap-2 bg-[#282C3F] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-md hover:bg-[#212121] transition-all shadow-sm"
                >
                  EXPLORE BESTSELLERS <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-gray-100 last:border-0 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-26 object-cover rounded-lg bg-gray-50 border border-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-6">
                        <h4 className="text-xs font-bold text-[#212121] leading-snug line-clamp-1">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          Size: {item.size}
                        </span>
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {item.color}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 px-2.5 hover:bg-gray-100 text-gray-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#212121]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 px-2.5 hover:bg-gray-100 text-gray-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-[#212121]">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.mrp && (
                          <span className="text-[10px] text-gray-400 line-through block">
                            ₹{item.mrp * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-0 right-0 p-1 text-gray-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer with coupons & subtotal (Exact Nobero) */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-[#F9FAFB] space-y-3.5">
              {/* Coupon Section */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                      className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-white border border-gray-300 rounded-md uppercase placeholder:normal-case focus:outline-none focus:border-[#282C3F]"
                    />
                  </div>
                  <button
                    onClick={() => handleApply()}
                    disabled={isApplyingCoupon || !inputCoupon.trim()}
                    className="bg-[#282C3F] text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-[#212121] disabled:opacity-50 transition-colors"
                  >
                    {isApplyingCoupon ? 'APPLYING...' : 'APPLY'}
                  </button>
                </div>

                {/* Quick Coupon Suggestions */}
                {!appliedCoupon && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {QUICK_COUPONS.map((cpn) => (
                      <button
                        key={cpn.code}
                        onClick={() => handleApply(cpn.code)}
                        className="text-[10px] font-semibold bg-white border border-dashed border-gray-300 hover:border-[#282C3F] text-gray-700 px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5 text-[#282C3F]" />
                        <strong>{cpn.code}</strong> ({cpn.desc})
                      </button>
                    ))}
                  </div>
                )}

                {/* Applied Coupon Banner */}
                {appliedCoupon && (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-md text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Coupon <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-rose-600 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                )}
                {couponSuccess && (
                  <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>
                )}
              </div>

              {/* Price Details Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="font-semibold text-gray-900">₹{totalMrp || subtotal}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#00B852] font-medium">
                    <span>Discount on MRP</span>
                    <span>-₹{totalSavings}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#00B852] font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  {shippingFee === 0 ? (
                    <span className="text-[#00B852] font-bold uppercase text-[11px]">
                      FREE
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-900">₹{shippingFee}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm font-bold text-[#212121] pt-2 border-t border-gray-200">
                  <span>Total Payable</span>
                  <span className="text-base text-[#282C3F]">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedCheckout}
                className="w-full bg-[#282C3F] hover:bg-[#212121] text-white py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                CONTINUE TO CHECKOUT • ₹{finalTotal}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% Safe Payments • 7-Day Easy Returns • Cash on Delivery
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

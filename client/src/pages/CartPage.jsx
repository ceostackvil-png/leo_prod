import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, cartDiscount, cartTotal, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [recommended, setRecommended] = useState([]);
  const navigate = useNavigate();

  const freeShippingThreshold = 799;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const res = await api.getProducts({ limit: 4 });
        if (res.success) setRecommended(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    loadRecommendations();
  }, []);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    if (!res.success) {
      setCouponError(res.message || 'Invalid coupon code');
    } else {
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-white py-12">
        <StorefrontContainer>
          <div className="py-16 text-center bg-[#F7F8FA] rounded-xl border border-gray-200 p-8 max-w-xl mx-auto">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 border border-gray-200 shadow-sm">
              <ShoppingBag className="w-8 h-8 text-[#242F66]" />
            </div>
            <h2 className="text-xl font-bold text-[#1A1E31]">Your Shopping Bag is Empty</h2>
            <p className="text-xs text-[#666875] mt-1.5 max-w-sm mx-auto">
              Explore our bestselling heavyweight oversized tees, cargo joggers, and travel polos.
            </p>
            <Link
              to="/men"
              className="mt-6 inline-flex items-center gap-2 bg-[#242F66] hover:bg-[#1A1E31] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-md transition-all shadow-sm"
            >
              SHOP MEN'S WEAR <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </StorefrontContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        {/* Header */}
        <div className="pb-4 border-b border-gray-200 mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1E31] uppercase">
            Shopping Bag ({cart.length} {cart.length === 1 ? 'Item' : 'Items'})
          </h1>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-3.5 mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1A1E31] mb-1.5">
            {remainingForFreeShipping === 0 ? (
              <span className="text-emerald-700 font-bold">🎉 Congratulations! You have unlocked FREE Express Delivery!</span>
            ) : (
              <span>Add items worth <strong className="text-[#242F66]">₹{remainingForFreeShipping}</strong> more to unlock FREE Delivery</span>
            )}
            <span className="text-[#666875] text-[11px] font-bold">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#242F66] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors"
              >
                {/* Image */}
                <Link to={`/product/${item.slug || item.id}`} className="w-20 sm:w-24 aspect-[3/4] bg-gray-50 rounded-md overflow-hidden shrink-0 border border-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </Link>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/product/${item.slug || item.id}`} className="text-xs sm:text-sm font-bold text-[#1A1E31] hover:text-[#242F66]">
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-gray-400 hover:text-rose-600 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#666875] mt-1">
                      <span>Size: <strong className="text-[#1A1E31]">{item.selectedSize}</strong></span>
                      {item.selectedColor && (
                        <span>Color: <strong className="text-[#1A1E31]">{item.selectedColor}</strong></span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-sm sm:text-base font-bold text-[#1A1E31]">
                        ₹{item.price * item.quantity}
                      </span>
                      {item.mrp && (
                        <span className="text-xs text-[#666875] line-through">
                          ₹{item.mrp * item.quantity}
                        </span>
                      )}
                      {item.discount && (
                        <span className="text-[11px] font-semibold text-[#12B76A]">
                          {item.discount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#1A1E31]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Checkout Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Coupon Box */}
            <div className="p-4 bg-[#F7F8FA] border border-gray-200 rounded-lg">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#1A1E31] mb-2.5">
                <Tag className="w-4 h-4 text-[#242F66]" /> Apply Promo Coupon
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-md text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                    <p className="text-[10px] text-emerald-700">Coupon applied successfully</p>
                  </div>
                  <button onClick={removeCoupon} className="text-xs font-bold text-rose-600 hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. WELCOME10, LEO50"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-xs font-bold uppercase focus:outline-none focus:border-[#242F66]"
                  />
                  <button
                    type="submit"
                    className="bg-[#242F66] hover:bg-[#1A1E31] text-white text-xs font-bold px-4 py-2 rounded-md uppercase"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600 mt-1.5">{couponError}</p>}
            </div>

            {/* Bill Breakdown */}
            <div className="p-5 border border-gray-200 rounded-lg bg-white space-y-3">
              <h3 className="text-sm font-bold uppercase text-[#1A1E31] border-b border-gray-100 pb-2">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs text-[#4A4D5E]">
                <div className="flex justify-between">
                  <span>Bag Total</span>
                  <span className="font-semibold text-[#1A1E31]">₹{cartSubtotal}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{cartDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-emerald-600">
                    {remainingForFreeShipping === 0 ? 'FREE' : '₹99'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#1A1E31]">Total Amount</span>
                <span className="text-lg font-black text-[#242F66]">
                  ₹{cartTotal + (remainingForFreeShipping === 0 ? 0 : 99)}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-3 bg-[#242F66] hover:bg-[#1A1E31] text-white py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-[#666875]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Safe & Secure Checkout</span>
              </div>
            </div>

          </div>

        </div>

        {/* Recommended Products */}
        {recommended.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h3 className="text-lg font-bold uppercase text-[#1A1E31] mb-6">
              Customers Also Purchased
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </StorefrontContainer>
    </div>
  );
};

export default CartPage;

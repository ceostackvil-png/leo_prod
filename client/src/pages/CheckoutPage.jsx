import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Tag,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI / Google Pay / PhonePe / Paytm', desc: 'Instant 0% transaction fee', icon: QrCode },
  { id: 'card', name: 'Credit / Debit Card (Visa, MasterCard, RuPay)', desc: 'Secure 256-bit SSL encrypted', icon: CreditCard },
  { id: 'cod', name: 'Cash On Delivery (COD)', desc: 'Pay with cash at your doorstep', icon: Truck }
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    clearCart
  } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine: user?.addresses?.[0]?.addressLine || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Karnataka',
    pincode: user?.addresses?.[0]?.pincode || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-zinc-900">Your bag is currently empty</h2>
        <p className="text-xs text-zinc-500 mt-1">Add garments to proceed to secure checkout.</p>
        <Link to="/shop" className="mt-4 bg-zinc-900 text-white text-xs font-bold px-6 py-3 rounded-md">
          Explore LEO Catalog
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.addressLine || !formData.pincode) {
      alert('Please fill out all mandatory shipping fields.');
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        customerEmail: formData.email || 'shopper@leo.com',
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine: formData.addressLine,
          city: formData.city || 'Bengaluru',
          state: formData.state,
          pincode: formData.pincode
        },
        items,
        subtotal,
        discount: discountAmount,
        couponApplied: appliedCoupon?.code || null,
        shippingFee,
        totalAmount: finalTotal,
        paymentMethod: paymentMethod === 'upi' ? 'Prepaid UPI' : paymentMethod === 'card' ? 'Credit Card' : 'Cash On Delivery'
      };

      const res = await api.createOrder(orderPayload);
      if (res.success) {
        setOrderPlaced(res.data);
        clearCart();
      }
    } catch (err) {
      console.error(err);
      alert('Error placing order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // If order was successfully placed, show celebratory confirmation screen
  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-zinc-50">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-zinc-200 text-center animate-scale-in space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              ORDER CONFIRMED & DISPATCH PREPARED
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-900 tracking-tight mt-2 font-display">
              Thank you for shopping LEO!
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Your order <strong className="text-zinc-900">{orderPlaced.id}</strong> has been received and scheduled for dispatch.
            </p>
          </div>

          <div className="bg-zinc-50 rounded-xl p-4 text-left border border-zinc-200/80 text-xs space-y-2">
            <div className="flex justify-between font-bold text-zinc-900 pb-2 border-b border-zinc-200">
              <span>Order ID: {orderPlaced.id}</span>
              <span>₹{orderPlaced.totalAmount}</span>
            </div>
            <p className="text-zinc-600"><strong>Deliver to:</strong> {orderPlaced.shippingAddress?.fullName}, {orderPlaced.shippingAddress?.addressLine}, {orderPlaced.shippingAddress?.city} ({orderPlaced.shippingAddress?.pincode})</p>
            <p className="text-zinc-600"><strong>Payment:</strong> {orderPlaced.paymentMethod}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate(`/track-order?orderId=${orderPlaced.id}&phone=${orderPlaced.customerPhone}`)}
              className="flex-1 bg-zinc-900 hover:bg-black text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              TRACK LIVE ORDER <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/"
              className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex items-center gap-2 mb-8">
          <Lock className="w-5 h-5 text-zinc-900" />
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 font-display">
            Secure LEO Checkout
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Shipping & Payment Options */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Shipping Address */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                  1. Delivery Address
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Doorstep Delivery
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter receiver name"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Mobile Phone (for OTP & tracking) *</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Email Address (for invoice)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">Flat, House No., Building, Street *</label>
                <input
                  type="text"
                  required
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleInputChange}
                  placeholder="e.g. Flat 402, Oakwood Apt, 12th Main Road"
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="560038"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-100">
                2. Select Payment Mode
              </h3>

              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-black bg-zinc-50/80 shadow-sm'
                          : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="mt-1 accent-black"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-zinc-900" />
                          <span className="text-xs sm:text-sm font-bold text-zinc-900">{method.name}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{method.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-4 sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 pb-3 border-b border-zinc-100">
              Order Summary ({items.length} Items)
            </h3>

            {/* Items list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img src={item.image} alt="" className="w-14 h-18 object-cover rounded bg-zinc-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">{item.title}</p>
                    <p className="text-[11px] text-zinc-500">Size: {item.size} • {item.color} • Qty: {item.quantity}</p>
                    <p className="font-bold text-zinc-900 mt-1">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Callout if applied */}
            {appliedCoupon && (
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" /> Coupon <strong>{appliedCoupon.code}</strong> Applied
                </span>
                <span className="font-bold">-₹{discountAmount}</span>
              </div>
            )}

            {/* Financial calculation */}
            <div className="space-y-2 text-xs text-zinc-600 pt-3 border-t border-zinc-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 font-bold uppercase text-[10px]">FREE</span>
                ) : (
                  <span className="font-semibold text-zinc-900">₹{shippingFee}</span>
                )}
              </div>
              <div className="flex justify-between text-base font-black text-zinc-900 pt-3 border-t border-zinc-200">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-zinc-900 hover:bg-black text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isProcessing ? 'CONFIRMING ORDER...' : `PAY & COMPLETE ORDER • ₹${finalTotal}`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Encrypted & Authenticated Razorpay / COD Gateway
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutPage;

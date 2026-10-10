import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  Package,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';

const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [phoneOrEmail, setPhoneOrEmail] = useState(searchParams.get('phone') || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTracking = async (idToSearch, contactToSearch) => {
    if (!idToSearch) return;
    setLoading(true);
    setError('');
    try {
      const res = await api.getOrderById(idToSearch, {
        phone: contactToSearch?.includes('@') ? undefined : contactToSearch,
        email: contactToSearch?.includes('@') ? contactToSearch : undefined
      });

      if (res.success) {
        setOrder(res.data);
      } else {
        setError(res.message || 'Order not found.');
        setOrder(null);
      }
    } catch (e) {
      setError('Error fetching order details. Please check your Order ID (e.g. LEO-98421).');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchTracking(orderId, phoneOrEmail);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please enter a valid LEO Order ID.');
      return;
    }
    fetchTracking(orderId.trim(), phoneOrEmail.trim());
  };

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#282C3F] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Truck className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#212121]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#666875] mt-1">
            Enter your Order ID (e.g. <strong className="text-[#212121]">LEO-98421</strong>) to view real-time delivery status.
          </p>
        </div>

        {/* Lookup Box */}
        <div className="bg-[#F7F8FA] rounded-xl p-5 sm:p-6 border border-gray-200 max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="block text-xs font-bold uppercase text-[#212121] mb-1">
                Order ID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. LEO-98421"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-xs font-bold uppercase focus:outline-none focus:border-[#282C3F]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase text-[#212121] mb-1">
                Phone / Email (Optional)
              </label>
              <input
                type="text"
                placeholder="Mobile or email"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-xs font-medium focus:outline-none focus:border-[#282C3F]"
              />
            </div>

            <div className="sm:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#282C3F] hover:bg-[#212121] text-white py-2.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                {loading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Live Order Timeline */}
        {order && (
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm max-w-2xl mx-auto space-y-6">
            
            {/* Top Info Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  CURRENT STATUS
                </span>
                <h3 className="text-lg font-bold uppercase text-[#212121]">
                  {order.orderStatus}
                </h3>
                <p className="text-xs text-[#666875] mt-0.5">
                  Carrier: <strong>{order.tracking?.carrier || 'Delhivery Express'}</strong> • Tracking No: <strong>{order.tracking?.trackingNumber}</strong>
                </p>
              </div>

              <div className="bg-[#F7F8FA] px-3.5 py-2 rounded-lg border border-gray-200 text-right">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Order ID</span>
                <span className="text-xs font-bold text-[#212121]">{order.id}</span>
              </div>
            </div>

            {/* Visual Step Progress Bar */}
            <div className="py-2">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { label: 'Order Placed', step: 1 },
                  { label: 'Processing', step: 2 },
                  { label: 'Shipped', step: 3 },
                  { label: 'Out for Delivery', step: 4 },
                  { label: 'Delivered', step: 5 }
                ].map((s, idx) => {
                  const isDone = (order.tracking?.currentStep || 1) >= s.step;
                  const isCurrent = (order.tracking?.currentStep || 1) === s.step;

                  return (
                    <div
                      key={idx}
                      className="flex sm:flex-col items-center gap-2 text-left sm:text-center"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                        } ${isCurrent ? 'ring-2 ring-emerald-200' : ''}`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.step}
                      </div>
                      <span
                        className={`text-[11px] font-bold ${
                          isDone ? 'text-[#212121]' : 'text-gray-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package Contents */}
            <div className="space-y-2 pt-3 border-t border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#212121] flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#282C3F]" /> Items in Package
              </h4>
              <div className="space-y-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-[#F7F8FA] rounded-lg border border-gray-100 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-12 object-cover rounded bg-gray-200 shrink-0" />
                      <div>
                        <p className="font-semibold text-[#212121]">{item.title}</p>
                        <p className="text-[10px] text-[#666875]">Size: {item.size} • {item.color} • Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#212121]">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </StorefrontContainer>
    </div>
  );
};

export default TrackOrderPage;

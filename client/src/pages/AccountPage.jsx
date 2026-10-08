import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  ArrowRight,
  Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';

const AccountPage = () => {
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) return;
    const fetchUserOrders = async () => {
      try {
        const res = await api.getOrders();
        if (res.success) {
          setOrders(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white py-12">
        <StorefrontContainer>
          <div className="max-w-md mx-auto bg-[#F7F8FA] rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-gray-200 mx-auto">
              <User className="w-7 h-7 text-[#242F66]" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-[#1A1E31]">
              Account Sign In Required
            </h2>
            <p className="text-xs text-[#666875] mt-1 max-w-sm mx-auto">
              Please log in to view your live shipment tracking, addresses, and saved wishlist.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-5 bg-[#242F66] hover:bg-[#1A1E31] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-md transition-colors shadow-sm"
            >
              Sign In / Register
            </button>
          </div>
        </StorefrontContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        
        {/* Header Profile Bar */}
        <div className="bg-[#F7F8FA] rounded-xl p-6 sm:p-8 border border-gray-200 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#242F66] text-white flex items-center justify-center text-2xl font-black font-display shadow-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold uppercase text-[#1A1E31]">
                  {user.name}
                </h1>
                {user.isAdmin && (
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-xs text-[#666875] mt-0.5">{user.email || user.phone}</p>
              <p className="text-[11px] text-gray-400">LEO Member since {user.joinedAt || '2026'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" /> Admin Portal
            </Link>
            <button
              onClick={logout}
              className="bg-white hover:bg-rose-50 hover:text-rose-600 text-[#1A1E31] border border-gray-300 px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-[#F7F8FA] rounded-xl p-3 border border-gray-200 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'orders' ? 'bg-[#242F66] text-white' : 'text-[#4A4D5E] hover:bg-white hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" /> Order History
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {orders.length}
              </span>
            </button>

            <Link
              to="/wishlist"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#4A4D5E] hover:bg-white hover:text-black transition-colors"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" /> Saved Wishlist
              </span>
              <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded-full text-gray-700">
                {wishlistCount}
              </span>
            </Link>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'addresses' ? 'bg-[#242F66] text-white' : 'text-[#4A4D5E] hover:bg-white hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Saved Addresses
              </span>
            </button>

            <Link
              to="/track-order"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#4A4D5E] hover:bg-white hover:text-black transition-colors"
            >
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4" /> Live Tracking
              </span>
            </Link>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1E31]">
                  Recent Orders & Shipments
                </h3>

                {orders.length === 0 ? (
                  <div className="bg-[#F7F8FA] rounded-xl p-10 text-center border border-gray-200">
                    <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs font-semibold text-[#666875]">No orders placed yet.</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold">Order ID</span>
                          <h4 className="text-xs font-bold text-[#1A1E31]">{ord.id}</h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                            {ord.orderStatus}
                          </span>
                          <Link
                            to={`/track-order?orderId=${ord.id}`}
                            className="text-xs font-bold bg-[#242F66] text-white px-3 py-1 rounded-md hover:bg-[#1A1E31] transition-colors inline-flex items-center gap-1"
                          >
                            Track <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2">
                        {ord.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="w-10 h-12 object-cover rounded bg-gray-100" />
                              <div>
                                <p className="font-semibold text-[#1A1E31]">{item.title}</p>
                                <p className="text-[10px] text-[#666875]">Size: {item.size} • {item.color} • Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-bold text-[#1A1E31]">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="text-[#666875]">Paid via {ord.paymentMethod}</span>
                        <span className="text-sm font-bold text-[#242F66]">Total: ₹{ord.totalAmount}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1E31]">
                  Primary Shipping Address
                </h3>
                <div className="p-4 bg-[#F7F8FA] rounded-lg border border-gray-200 text-xs text-[#4A4D5E] space-y-1">
                  <span className="bg-[#242F66] text-white text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-1">
                    DEFAULT
                  </span>
                  <p className="font-bold text-[#1A1E31]">{user.name}</p>
                  <p>Flat 402, Oakwood Residency, 12th Main Road, Indiranagar</p>
                  <p>Bengaluru, Karnataka - 560038</p>
                  <p>Phone: {user.phone}</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </StorefrontContainer>
    </div>
  );
};

export default AccountPage;

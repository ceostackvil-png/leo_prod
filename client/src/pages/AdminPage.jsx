import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sliders,
  Tag,
  Star,
  BookOpen,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  // Analytics Data
  const [analytics, setAnalytics] = useState(null);

  // Products Data
  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    subtitle: '',
    category: 'oversized-tees',
    gender: 'men',
    price: 799,
    mrp: 1599,
    fit: 'Oversized Boxy Fit',
    fabric: '240 GSM Super Combed Cotton',
    isBestseller: true,
    isFeatured: true,
    inventory: 50,
    image: '/images/nobero/col_oversized_exact.jpg',
    colors: [
      { name: 'Jet Black', hex: '#121212', image: '/images/nobero/col_oversized_exact.jpg' }
    ],
    sizes: [
      { name: 'S', stock: 10 },
      { name: 'M', stock: 20 },
      { name: 'L', stock: 20 }
    ],
    description: 'Engineered for relaxed structured drape.'
  });

  // Orders Data
  const [orders, setOrders] = useState([]);

  // Banners Data
  const [banners, setBanners] = useState([]);
  const [isAddBannerModalOpen, setIsAddBannerModalOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    description: '',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop',
    badge: 'NEW DROP',
    desktopImage: '/images/nobero/hero_banner_joggers_des.jpg',
    mobileImage: '/images/nobero/hero_banner_joggers_mob.jpg'
  });

  // Coupons Data
  const [coupons, setCoupons] = useState([]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponValue, setNewCouponValue] = useState(100);
  const [newCouponMinOrder, setNewCouponMinOrder] = useState(799);

  // Reviews Data
  const [reviews, setReviews] = useState([]);

  // Blogs Data
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [anaRes, prodRes, ordRes, banRes, cpnRes, revRes, blgRes] = await Promise.all([
        api.getAnalytics(),
        api.getProducts(),
        api.getOrders(),
        api.getBanners(),
        api.getCoupons(),
        api.getReviews(),
        api.getBlogs()
      ]);

      if (anaRes.success) setAnalytics(anaRes.data);
      if (prodRes.success) setProducts(prodRes.data);
      if (ordRes.success) setOrders(ordRes.data);
      if (banRes.success) setBanners(banRes.data);
      if (cpnRes.success) setCoupons(cpnRes.data);
      if (revRes.success) setReviews(revRes.data);
      if (blgRes.success) setBlogs(blgRes.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  // Product actions
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createProduct(newProduct);
      if (res.success) {
        setProducts([res.data, ...products]);
        setIsAddProductModalOpen(false);
        alert('Product created successfully!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Order status progression
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders(orders.map(o => o.id === orderId ? res.data : o));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Banner actions
  const handleCreateBanner = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createBanner(newBanner);
      if (res.success) {
        setBanners([...banners, res.data]);
        setIsAddBannerModalOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteBanner = async (id) => {
    try {
      await api.deleteBanner(id);
      setBanners(banners.filter(b => b.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Coupon actions
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCouponCode) return;
    try {
      const res = await api.createCoupon({
        code: newCouponCode,
        type: 'flat',
        value: Number(newCouponValue),
        minOrder: Number(newCouponMinOrder),
        description: `Flat ₹${newCouponValue} off on min order ₹${newCouponMinOrder}`
      });
      if (res.success) {
        setCoupons([...coupons, res.data]);
        setNewCouponCode('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCoupon = async (code) => {
    try {
      await api.deleteCoupon(code);
      setCoupons(coupons.filter(c => c.code !== code));
    } catch (e) {
      console.error(e);
    }
  };

  // Review status
  const handleReviewStatus = async (id, status) => {
    try {
      const res = await api.updateReviewStatus(id, status);
      if (res.success) {
        setReviews(reviews.map(r => r.id === id ? res.data : r));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 pb-16">
      
      {/* Admin Header */}
      <header className="bg-zinc-950 text-white py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-black tracking-tighter uppercase font-display">
              LEO
            </Link>
            <span className="bg-amber-400 text-zinc-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
              ADMIN CONTROL CENTER
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllAdminData}
              className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <Link
              to="/"
              className="text-xs bg-white text-zinc-950 font-bold px-3.5 py-1.5 rounded-md hover:bg-zinc-200 transition-colors"
            >
              Live Store ↗
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {[
            { id: 'analytics', label: '📊 Live Analytics', count: null },
            { id: 'products', label: '📦 Products', count: products.length },
            { id: 'orders', label: '🚚 Orders & Tracking', count: orders.length },
            { id: 'banners', label: '🖼️ Hero Banners', count: banners.length },
            { id: 'coupons', label: '🎟️ Coupons & Deals', count: coupons.length },
            { id: 'reviews', label: '⭐ Reviews Moderation', count: reviews.length },
            { id: 'blogs', label: '📝 LEO Journal', count: blogs.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${
                activeTab === tab.id
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab 1: Analytics */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span className="text-xs font-bold uppercase text-zinc-400">Total Gross Revenue</span>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1 font-display">
                  ₹{analytics.totalRevenue.toLocaleString()}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last week
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span className="text-xs font-bold uppercase text-zinc-400">Total Dispatched Orders</span>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1 font-display">
                  {analytics.totalOrders}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 98.6% On-time delivery
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span className="text-xs font-bold uppercase text-zinc-400">Average Order Value</span>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1 font-display">
                  ₹{analytics.averageOrderValue}
                </div>
                <span className="text-[11px] text-zinc-500 font-medium mt-1">
                  Driven by Co-Ord bundles
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm">
                <span className="text-xs font-bold uppercase text-zinc-400">Store Conversion Rate</span>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 mt-1 font-display">
                  {analytics.conversionRate}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                  🔥 {analytics.activeUsersLive} Live Shoppers
                </span>
              </div>
            </div>

            {/* Sales Trends Chart Representation */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4">
                Weekly Revenue Performance
              </h3>
              <div className="grid grid-cols-7 gap-2 items-end h-44 pt-4 border-b border-zinc-100">
                {analytics.salesTrends?.map((trend, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-bold text-zinc-700">₹{(trend.revenue / 1000).toFixed(0)}k</span>
                    <div
                      className="w-full max-w-[40px] bg-zinc-900 hover:bg-amber-400 rounded-t-lg transition-all"
                      style={{ height: `${(trend.revenue / 90000) * 100}%` }}
                    />
                    <span className="text-xs font-bold text-zinc-500">{trend.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Product Catalog ({products.length} Active Items)
              </h3>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="bg-zinc-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price / MRP</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Rating</th>
                    <th className="p-4">Badges</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-50">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.colors?.[0]?.image || p.image} alt="" className="w-10 h-12 object-cover rounded bg-zinc-100" />
                        <div>
                          <p className="font-bold text-zinc-900 line-clamp-1">{p.title}</p>
                          <p className="text-[10px] text-zinc-400">{p.sku || p.id}</p>
                        </div>
                      </td>
                      <td className="p-4 capitalize">{p.category}</td>
                      <td className="p-4">
                        <span className="font-bold text-zinc-900">₹{p.price}</span>
                        <span className="text-[10px] text-zinc-400 line-through ml-1">₹{p.mrp}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-bold">
                          {p.inventory || 50} in stock
                        </span>
                      </td>
                      <td className="p-4 font-bold text-zinc-900">★ {p.rating}</td>
                      <td className="p-4">
                        {p.isBestseller && (
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded mr-1">
                            Bestseller
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 bg-white p-4 rounded-2xl border border-zinc-200">
              Orders Pipeline & Tracking Status
            </h3>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-zinc-100 gap-2">
                    <div>
                      <span className="text-base font-black text-zinc-900">{ord.id}</span>
                      <p className="text-xs text-zinc-500">Customer: {ord.customerName} ({ord.customerPhone})</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-zinc-500">Status:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-300 bg-zinc-50 focus:outline-none focus:border-black cursor-pointer"
                      >
                        <option value="Placed">Order Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {ord.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-zinc-50 rounded-lg">
                        <img src={item.image} alt="" className="w-10 h-12 object-cover rounded" />
                        <div>
                          <p className="font-semibold text-zinc-900">{item.title}</p>
                          <p className="text-[10px] text-zinc-500">Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-zinc-100 text-xs text-zinc-600">
                    <span>Carrier: <strong>{ord.tracking?.carrier || 'Delhivery'}</strong> (AWB: {ord.tracking?.trackingNumber})</span>
                    <span className="text-sm font-black text-zinc-900">Total: ₹{ord.totalAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Hero Banners Management */}
        {activeTab === 'banners' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-zinc-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                Hero Promotional Slides ({banners.length})
              </h3>
              <button
                onClick={() => setIsAddBannerModalOpen(true)}
                className="bg-zinc-900 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Hero Slide
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banners.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm flex flex-col justify-between">
                  <div className="aspect-[16/8] bg-zinc-900 relative">
                    <img src={b.desktopImage} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-end text-white">
                      <span className="text-[10px] font-bold uppercase text-amber-300">{b.badge}</span>
                      <h4 className="text-lg font-black uppercase leading-tight">{b.title}</h4>
                      <p className="text-xs text-zinc-300 mt-0.5">{b.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center text-xs">
                    <span className="text-zinc-500">CTA: <strong>{b.ctaText}</strong> ({b.ctaLink})</span>
                    <button
                      onClick={() => handleDeleteBanner(b.id)}
                      className="text-rose-600 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Coupons & Promo Deals */}
        {activeTab === 'coupons' && (
          <div className="space-y-6 animate-fade-in">
            {/* Create Coupon Card */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4">
                Create New Discount Promo Code
              </h3>
              <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  required
                  placeholder="COUPON CODE (e.g. SUMMER20)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-bold uppercase focus:outline-none focus:border-black"
                />
                <input
                  type="number"
                  placeholder="Discount (₹)"
                  value={newCouponValue}
                  onChange={(e) => setNewCouponValue(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-bold focus:outline-none focus:border-black"
                />
                <input
                  type="number"
                  placeholder="Min Order Value (₹)"
                  value={newCouponMinOrder}
                  onChange={(e) => setNewCouponMinOrder(e.target.value)}
                  className="px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-lg text-xs font-bold focus:outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-zinc-900 text-white text-xs font-bold uppercase py-2.5 rounded-lg hover:bg-black transition-colors"
                >
                  Create Coupon
                </button>
              </form>
            </div>

            {/* Coupons List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-white p-5 rounded-2xl border border-dashed border-zinc-300 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="bg-zinc-900 text-white text-sm font-black px-3 py-1 rounded-md tracking-wider">
                        {c.code}
                      </span>
                      <button
                        onClick={() => handleDeleteCoupon(c.code)}
                        className="text-zinc-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-700 font-bold mt-3">
                      {c.type === 'flat' ? `Flat ₹${c.value} Off` : `${c.value}% Off`}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Min Order: ₹{c.minOrder}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-zinc-100 text-[10px] text-zinc-400 font-semibold">
                    Redeemed {c.usageCount || 0} times
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 bg-white p-4 rounded-2xl border border-zinc-200">
              Customer Reviews Moderation Queue
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-zinc-900">{rev.author} (★ {rev.rating})</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      rev.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rev.status || 'approved'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900">"{rev.title}"</h4>
                  <p className="text-xs text-zinc-600">{rev.comment}</p>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-100 text-xs">
                    <span className="text-[10px] text-zinc-400">Product: {rev.productTitle}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReviewStatus(rev.id, 'approved')}
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReviewStatus(rev.id, 'rejected')}
                        className="text-rose-600 font-bold hover:underline"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Blogs Management */}
        {activeTab === 'blogs' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-zinc-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                LEO Journal Articles ({blogs.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogs.map((b) => (
                <div key={b.id} className="bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
                  <img src={b.coverImage} alt="" className="w-full aspect-[16/9] object-cover" />
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-zinc-400">{b.category}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 line-clamp-1">{b.title}</h4>
                    <p className="text-xs text-zinc-500 line-clamp-2">{b.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modal: Add Product */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <h3 className="text-base font-bold uppercase text-zinc-900">Add New LEO Garment</h3>
              <button onClick={() => setIsAddProductModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="e.g. Heavyweight Mineral Wash Oversized Tee"
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.mrp}
                    onChange={(e) => setNewProduct({ ...newProduct, mrp: Number(e.target.value) })}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                >
                  <option value="oversized-tees">Oversized Tees</option>
                  <option value="joggers">Cargoes & Joggers</option>
                  <option value="hoodies">French Terry Hoodies</option>
                  <option value="co-ords">Co-Ord Sets</option>
                  <option value="travel">Travel Essentials</option>
                  <option value="polos">Travel & Classic Polos</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({
                    ...newProduct,
                    image: e.target.value,
                    colors: [{ name: 'Black', hex: '#121212', image: e.target.value }]
                  })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Fabric & Specs</label>
                <input
                  type="text"
                  value={newProduct.fabric}
                  onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-zinc-900 text-white font-bold uppercase rounded-lg hover:bg-black mt-2"
              >
                Publish Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Hero Banner */}
      {isAddBannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <h3 className="text-base font-bold uppercase text-zinc-900">Add Hero Slide Banner</h3>
              <button onClick={() => setIsAddBannerModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateBanner} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Banner Main Heading (e.g. SUMMER DROP '26)"
                value={newBanner.title}
                onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
              />
              <input
                type="text"
                placeholder="Subtitle (e.g. 240 GSM HEAVYWEIGHT TEES)"
                value={newBanner.subtitle}
                onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
              />
              <input
                type="text"
                required
                placeholder="Desktop Image URL"
                value={newBanner.desktopImage}
                onChange={(e) => setNewBanner({ ...newBanner, desktopImage: e.target.value, mobileImage: e.target.value })}
                className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="CTA Text"
                  value={newBanner.ctaText}
                  onChange={(e) => setNewBanner({ ...newBanner, ctaText: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                />
                <input
                  type="text"
                  placeholder="CTA Link"
                  value={newBanner.ctaLink}
                  onChange={(e) => setNewBanner({ ...newBanner, ctaLink: e.target.value })}
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-300 rounded-lg font-medium"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-zinc-900 text-white font-bold uppercase rounded-lg hover:bg-black mt-2"
              >
                Add Hero Slide
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPage;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  RefreshCw,
  Plus,
  ExternalLink,
  Bell,
  Search,
  FileCode2,
  X
} from 'lucide-react';

const AdminHeader = ({
  activeTab,
  onOpenMobileSidebar,
  onRefresh,
  loading,
  unreadNotificationsCount = 3,
  onOpenAddProduct,
  onOpenNotificationCenter,
  globalSearch = '',
  setGlobalSearch
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Executive Dashboard';
      case 'orders': return 'Order Fulfillment & Shipments';
      case 'products': return 'Product Catalog Management';
      case 'variants': return 'Product Variants & Attributes';
      case 'inventory': return 'Inventory & Stock Control';
      case 'categories': return 'Categories, Brands & Collections';
      case 'coupons': return 'Coupons & Promotional Discounts';
      case 'marketing': return 'Hero Banners & Marketing Drops';
      case 'reviews': return 'Customer Ratings & Reviews';
      case 'customers': return 'Customer Profiles & CRM';
      case 'returns': return 'Returns, Exchanges & Refunds';
      case 'shipping': return 'Shipping Zones & Courier Logistics';
      case 'payments': return 'Payments Gateway & Transactions';
      case 'analytics': return 'Business Analytics & Reports';
      case 'notifications': return 'System Notifications Center';
      case 'cms': return 'Storefront CMS & Policies';
      case 'users': return 'Admin Team & Role Permissions';
      case 'audit-logs': return 'System Audit & Activity Logs';
      default: return activeTab.replace('-', ' ');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
      {/* Left: Mobile hamburger, LEO crest emblem & breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Compact LEO Lion Emblem in Header */}
        <Link
          to="/"
          className="hidden sm:flex w-9 h-9 rounded-full border-2 border-[#181B2D] bg-black items-center justify-center overflow-hidden shrink-0 shadow-xs hover:scale-105 transition-transform"
          title="LEO – The King"
        >
          <img
            src="/images/logo (1).png"
            alt="LEO Logo"
            className="w-full h-full object-cover rounded-full scale-105"
          />
        </Link>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold tracking-wide">
            <span className="text-slate-700 font-bold" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
              LEO
            </span>
            <span>•</span>
            <span>Admin Console</span>
            <span>/</span>
            <span className="text-amber-600 capitalize truncate font-semibold">{activeTab.replace('-', ' ')}</span>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-slate-900 capitalize leading-tight truncate tracking-tight">
            {getTabTitle()}
          </h1>
        </div>
      </div>

      {/* Middle: Global search if setGlobalSearch provided */}
      {setGlobalSearch && (
        <div className="hidden md:flex items-center relative max-w-sm w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search products, SKU, orders, customers..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white transition-all font-medium text-slate-800"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Swagger API Docs Button */}
        <a
          href="http://localhost:5001/api-docs"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden xl:flex px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl items-center gap-1.5 transition-colors"
          title="View Interactive OpenAPI 3.0 / Swagger Documentation"
        >
          <FileCode2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Swagger Docs</span>
        </a>

        {/* Sync / Refresh */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200/60"
          title="Sync Database"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-600' : ''}`} />
          <span className="hidden sm:inline">{loading ? 'Syncing...' : 'Sync DB'}</span>
        </button>

        {/* Notifications Center Bell */}
        <button
          onClick={onOpenNotificationCenter}
          className="relative p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer border border-slate-200/60"
          title="Notifications Center"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Quick Add Product button */}
        {(activeTab === 'products' || activeTab === 'variants' || activeTab === 'overview') && (
          <button
            onClick={onOpenAddProduct}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Product</span>
          </button>
        )}

        {/* Live Storefront */}
        <Link
          to="/"
          className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span className="hidden sm:inline">Live Store</span>
          <ExternalLink className="w-3 h-3 text-[#dec562]" />
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;

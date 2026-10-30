import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  FolderTree,
  ShoppingBag,
  Users,
  Tag,
  Megaphone,
  Star,
  RotateCcw,
  Truck,
  CreditCard,
  BarChart3,
  ShieldCheck,
  History,
  Globe,
  Bell,
  ExternalLink,
  Store,
  FileCode2,
  X
} from 'lucide-react';
import BrandLogo from '../BrandLogo';

export const ADMIN_NAV_GROUPS = [
  {
    title: 'Core Operations',
    items: [
      { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag, badgeKey: 'orders' },
      { id: 'products', label: 'Product Management', icon: Package, badgeKey: 'products' },
      { id: 'variants', label: 'Product Variants', icon: Layers },
      { id: 'inventory', label: 'Inventory & Stock', icon: Boxes, badgeKey: 'lowStock' }
    ]
  },
  {
    title: 'Catalog & Merchandising',
    items: [
      { id: 'categories', label: 'Categories & Collections', icon: FolderTree },
      { id: 'coupons', label: 'Coupons & Discounts', icon: Tag, badgeKey: 'coupons' },
      { id: 'marketing', label: 'Marketing & Banners', icon: Megaphone },
      { id: 'reviews', label: 'Reviews & Ratings', icon: Star, badgeKey: 'reviews' }
    ]
  },
  {
    title: 'Customers & Logistics',
    items: [
      { id: 'customers', label: 'Customer Management', icon: Users, badgeKey: 'customers' },
      { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw, badgeKey: 'returns' },
      { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
      { id: 'payments', label: 'Payment Gateway', icon: CreditCard }
    ]
  },
  {
    title: 'Intelligence & Control',
    items: [
      { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
      { id: 'notifications', label: 'Notifications Center', icon: Bell, badgeKey: 'notifications' },
      { id: 'cms', label: 'Website CMS & Policies', icon: Globe },
      { id: 'users', label: 'Users & Permissions', icon: ShieldCheck },
      { id: 'audit-logs', label: 'Activity & Audit Logs', icon: History }
    ]
  }
];

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  badgeCounts = {}
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-[268px] bg-[#0B1120] text-slate-300 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 border-r border-slate-800/90 shadow-2xl ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header Brand with Authentic LEO Lion Logo */}
          <div className="px-4 py-4 border-b border-slate-800/90 flex items-center justify-between shrink-0 bg-gradient-to-r from-[#070D18] via-[#0B1325] to-[#070D18]">
            <Link to="/" className="group flex items-center focus:outline-none">
              <BrandLogo
                variant="dark"
                size="xs"
                subtitle="ENTERPRISE ADMIN"
                className="group-hover:opacity-95 transition-opacity"
              />
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Close Sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Nav Items */}
          <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto no-scrollbar">
            {ADMIN_NAV_GROUPS.map((group) => (
              <div key={group.title} className="space-y-1">
                <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400/90">
                  {group.title}
                </p>
                <div className="space-y-0.5 mt-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const count = item.badgeKey ? badgeCounts[item.badgeKey] : null;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.25 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-[#dec562] to-[#cda938] text-[#0f142b] font-bold shadow-md shadow-[#dec562]/15'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive
                                ? 'text-[#0f142b]'
                                : 'text-slate-400 group-hover:text-[#dec562]'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {count !== undefined && count !== null && count > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ml-1.5 ${
                              isActive
                                ? 'bg-[#0f142b] text-[#dec562]'
                                : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                            }`}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer Quick Links & Admin Identity */}
          <div className="p-3.5 border-t border-slate-800/90 space-y-2 bg-[#070D18] shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700/60"
                title="Open Live Fashion Storefront"
              >
                <Store className="w-3.5 h-3.5 text-[#dec562] shrink-0" />
                <span className="truncate">Storefront</span>
              </Link>
              <a
                href="http://localhost:5001/api-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700/60"
                title="Open Swagger / OpenAPI 3.0 Documentation"
              >
                <FileCode2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Swagger API</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

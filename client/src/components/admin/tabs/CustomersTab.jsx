import React, { useState } from 'react';
import {
  Users,
  Search,
  Download,
  Eye,
  Star,
  ShoppingBag,
  Heart,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';
import { INITIAL_CUSTOMERS, exportToCsv } from '../adminData';

const CustomersTab = () => {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase());

    const matchTier = tierFilter === 'all' || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  const handleExportCsv = () => {
    const headers = ['Customer ID', 'Full Name', 'Email', 'Phone', 'City', 'Tier', 'Total Spent (INR)', 'Orders Count', 'Returns', 'Joined Date'];
    const rows = filteredCustomers.map(c => [
      c.id,
      c.name,
      c.email,
      c.phone,
      c.city,
      c.tier,
      c.totalSpent,
      c.totalOrders,
      c.returnsCount,
      c.joinedDate
    ]);
    exportToCsv('leo_customers_crm', headers, rows);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Customer Profiles & CRM ({filteredCustomers.length})
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Customer LTV
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Track customer lifetime value (LTV), shopping frequency, wishlist engagement, and support history
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Customers</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, email, phone, city..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-slate-700"
        >
          <option value="all">All Customer Tiers</option>
          <option value="VIP">VIP Tier (₹10k+ Spent)</option>
          <option value="Repeat">Repeat Shoppers</option>
          <option value="New">First-Time Shoppers</option>
        </select>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Customer Name & Contact</th>
                <th className="p-4">City</th>
                <th className="p-4">Customer Tier</th>
                <th className="p-4">Lifetime Spent</th>
                <th className="p-4">Orders Placed</th>
                <th className="p-4">Engagement (Wishlist/Cart)</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{c.name}</p>
                    <p className="text-[11px] text-slate-500">{c.email}</p>
                    <p className="text-[10px] text-slate-400">{c.phone}</p>
                  </td>

                  <td className="p-4 text-slate-800 font-medium">
                    {c.city}
                  </td>

                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                      c.tier === 'VIP'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : c.tier === 'Repeat'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {c.tier === 'VIP' && <Sparkles className="w-2.5 h-2.5 text-amber-600" />}
                      <span>{c.tier}</span>
                    </span>
                  </td>

                  <td className="p-4 font-black text-slate-900 text-sm">
                    ₹{c.totalSpent.toLocaleString()}
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-800">{c.totalOrders} orders</span>
                    <p className="text-[10px] text-slate-400">Last: {c.lastOrderDate}</p>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> {c.wishlistCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3 text-slate-500" /> {c.cartCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {c.reviewsSubmitted}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedCustomer.name}</h3>
                <span className="text-[10px] text-slate-400">Customer ID: {selectedCustomer.id}</span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Lifetime Value</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Total Purchases</span>
                <p className="text-xl font-black text-slate-900 mt-0.5">{selectedCustomer.totalOrders} Orders</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedCustomer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedCustomer.city}, India</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Customer since {selectedCustomer.joinedDate}</span>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span className="font-bold block mb-0.5">Admin Internal Notes:</span>
              <p>{selectedCustomer.notes}</p>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-black"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersTab;

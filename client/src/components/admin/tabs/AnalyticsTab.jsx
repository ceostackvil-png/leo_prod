import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet
} from 'lucide-react';
import { exportToCsv } from '../adminData';

const AnalyticsTab = ({ products = [], orders = [] }) => {
  const [reportType, setReportType] = useState('sales'); // 'sales', 'products', 'customers', 'inventory'
  const [timeRange, setTimeRange] = useState('month');

  const handleExportFullReport = () => {
    let headers = [];
    let rows = [];

    if (reportType === 'sales') {
      headers = ['Period', 'Gross Revenue (INR)', 'Net Sales', 'Orders Count', 'AOV (INR)', 'Payment Mode Mix'];
      rows = [
        ['October 2026', '384000', '362000', '240', '1600', '72% UPI, 20% Card, 8% COD'],
        ['September 2026', '308000', '289000', '198', '1555', '68% UPI, 22% Card, 10% COD'],
        ['August 2026', '245000', '230000', '162', '1512', '65% UPI, 25% Card, 10% COD']
      ];
    } else if (reportType === 'products') {
      headers = ['Product Name', 'Category', 'Units Sold', 'Total Revenue (INR)', 'Return Rate', 'Stock Velocity'];
      rows = [
        ['leo Classic Polo T-Shirt', 'Polos', '340', '271660', '1.8%', 'High Velocity'],
        ['Oversized Heavyweight 240 GSM Tee', 'Oversized Tees', '292', '262508', '2.1%', 'High Velocity'],
        ['Wanderer Travel Co-Ord Set', 'Co-Ord Sets', '180', '467820', '3.2%', 'Moderate Velocity'],
        ['Tactical Cargo Joggers', 'Joggers', '144', '215856', '4.5%', 'Moderate Velocity']
      ];
    } else if (reportType === 'customers') {
      headers = ['Customer Segment', 'Total Shoppers', 'Revenue Contribution', 'Average Order Value (INR)', 'Repeat Purchase Rate'];
      rows = [
        ['VIP Customers (₹10k+)', '48', '₹420,000 (36%)', '₹2,450', '82%'],
        ['Repeat Shoppers (2-5 orders)', '112', '₹480,000 (41%)', '₹1,680', '58%'],
        ['New First-Time Buyers', '268', '₹268,000 (23%)', '₹1,000', 'N/A']
      ];
    } else {
      headers = ['Category', 'SKU Count', 'Units in Stock', 'Inventory Valuation (INR)', 'Days of Inventory (DOI)'];
      rows = [
        ['Polos', '16', '240', '191,760', '22 Days'],
        ['Oversized Tees', '18', '380', '341,620', '18 Days'],
        ['Co-Ord Sets', '8', '95', '246,905', '28 Days'],
        ['Hoodies & Jackets', '10', '120', '215,880', '35 Days']
      ];
    }

    exportToCsv(`leo_${reportType}_report`, headers, rows);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Enterprise Business Reports & Intelligence
            </h2>
            <span className="bg-indigo-100 text-indigo-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
              CSV & Excel Export Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Download comprehensive operational reports on revenue velocity, product turnover, customer retention, and stock valuation
          </p>
        </div>

        <button
          onClick={handleExportFullReport}
          className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export {reportType.toUpperCase()} (CSV/Excel)</span>
        </button>
      </div>

      {/* Report Type Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'sales', label: '📊 Sales & Revenue Reports' },
          { id: 'products', label: '👕 Product Performance & Velocity' },
          { id: 'customers', label: '👤 Customer Cohorts & LTV' },
          { id: 'inventory', label: '📦 Inventory Valuation & DOI' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer ${
              reportType === tab.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* REPORT CONTENT VIEW: SALES */}
      {reportType === 'sales' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Net Sales (Q4)</span>
              <p className="text-2xl font-black text-slate-900 mt-1">₹937,000</p>
              <span className="text-[10px] text-emerald-600 font-bold">+28.4% YoY Growth</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">Average Order Value (AOV)</span>
              <p className="text-2xl font-black text-slate-900 mt-1">₹1,599</p>
              <span className="text-[10px] text-slate-500 font-medium">Boosted by Co-ord bundles</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-slate-400">Prepaid Orders Ratio</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">81.8%</p>
              <span className="text-[10px] text-emerald-600 font-semibold">Lower RTO risk</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Monthly Sales Ledger</h3>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                  <th className="p-3">Billing Cycle</th>
                  <th className="p-3">Gross Revenue</th>
                  <th className="p-3">Refunds / RTO</th>
                  <th className="p-3">Net Realized</th>
                  <th className="p-3">Orders</th>
                  <th className="p-3 text-right">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-slate-900">October 2026</td>
                  <td className="p-3 font-bold">₹384,000</td>
                  <td className="p-3 text-rose-600">₹14,500</td>
                  <td className="p-3 font-black text-emerald-600">₹369,500</td>
                  <td className="p-3 font-semibold">240</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">+24.8%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">September 2026</td>
                  <td className="p-3 font-bold">₹308,000</td>
                  <td className="p-3 text-rose-600">₹12,200</td>
                  <td className="p-3 font-black text-emerald-600">₹295,800</td>
                  <td className="p-3 font-semibold">198</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">+18.2%</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">August 2026</td>
                  <td className="p-3 font-bold">₹245,000</td>
                  <td className="p-3 text-rose-600">₹9,800</td>
                  <td className="p-3 font-black text-emerald-600">₹235,200</td>
                  <td className="p-3 font-semibold">162</td>
                  <td className="p-3 text-right text-emerald-600 font-bold">+15.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT CONTENT VIEW: PRODUCTS */}
      {reportType === 'products' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Best-Selling vs. Slow-Moving Menswear</h3>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3">Product Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Units Sold</th>
                <th className="p-3">Revenue Generated</th>
                <th className="p-3">Return Rate</th>
                <th className="p-3 text-right">Velocity Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-bold text-slate-900">leo Classic Polo T-Shirt</td>
                <td className="p-3 text-slate-500">Polos</td>
                <td className="p-3 font-bold">340 units</td>
                <td className="p-3 font-black text-slate-900">₹271,660</td>
                <td className="p-3 text-emerald-600 font-semibold">1.8%</td>
                <td className="p-3 text-right"><span className="bg-[#dec562] text-[#0f142b] font-bold px-2 py-0.5 rounded text-[10px]">BESTSELLER</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Oversized Heavyweight 240 GSM Tee</td>
                <td className="p-3 text-slate-500">Oversized Tees</td>
                <td className="p-3 font-bold">292 units</td>
                <td className="p-3 font-black text-slate-900">₹262,508</td>
                <td className="p-3 text-emerald-600 font-semibold">2.1%</td>
                <td className="p-3 text-right"><span className="bg-[#dec562] text-[#0f142b] font-bold px-2 py-0.5 rounded text-[10px]">BESTSELLER</span></td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Wanderer Travel Co-Ord Set</td>
                <td className="p-3 text-slate-500">Co-Ord Sets</td>
                <td className="p-3 font-bold">180 units</td>
                <td className="p-3 font-black text-slate-900">₹467,820</td>
                <td className="p-3 text-slate-600 font-semibold">3.2%</td>
                <td className="p-3 text-right"><span className="bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded text-[10px]">HIGH VALUE</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* REPORT CONTENT VIEW: CUSTOMERS */}
      {reportType === 'customers' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Customer Lifetime Value Cohorts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-700">VIP Tier Shoppers</span>
              <p className="text-xl font-black text-slate-900">48 Customers</p>
              <p className="text-xs text-slate-600">36% of all store revenue (₹4.2 Lakhs)</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[10px] font-bold uppercase text-blue-700">Repeat Customers</span>
              <p className="text-xl font-black text-slate-900">112 Customers</p>
              <p className="text-xs text-slate-600">58% repeat rate within 60 days</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-700">New Customer CAC</span>
              <p className="text-xl font-black text-slate-900">₹280 / Cust</p>
              <p className="text-xs text-slate-600">Acquisition cost recovered in order #1</p>
            </div>
          </div>
        </div>
      )}

      {/* REPORT CONTENT VIEW: INVENTORY */}
      {reportType === 'inventory' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Inventory Valuation & Days of Inventory (DOI)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border bg-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Total Asset Valuation</span>
              <p className="text-xl font-black text-slate-900 mt-0.5">₹1,480,000</p>
            </div>
            <div className="p-4 rounded-xl border bg-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Average Turnover (DOI)</span>
              <p className="text-xl font-black text-emerald-600 mt-0.5">21 Days</p>
            </div>
            <div className="p-4 rounded-xl border bg-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Fastest Turnover</span>
              <p className="text-xl font-black text-slate-900 mt-0.5">Oversized Tees</p>
            </div>
            <div className="p-4 rounded-xl border bg-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Slow Moving Buffer</span>
              <p className="text-xl font-black text-slate-900 mt-0.5">&lt; 5% of Stock</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsTab;

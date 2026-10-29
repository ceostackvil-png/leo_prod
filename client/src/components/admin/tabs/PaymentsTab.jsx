import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Wallet
} from 'lucide-react';
import { INITIAL_PAYMENT_TRANSACTIONS, exportToCsv } from '../adminData';

const PaymentsTab = ({ triggerToast }) => {
  const [transactions, setTransactions] = useState(INITIAL_PAYMENT_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTransactions = transactions.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.orderId.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.gatewayRef.toLowerCase().includes(search.toLowerCase()) ||
      t.method.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'all' || t.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchSearch && matchStatus;
  });

  const handleExportCsv = () => {
    const headers = ['Txn ID', 'Order ID', 'Customer', 'Method', 'Gateway', 'Gateway Ref', 'Amount (INR)', 'Status', 'Timestamp'];
    const rows = filteredTransactions.map(t => [
      t.id,
      t.orderId,
      t.customer,
      t.method,
      t.gateway,
      t.gatewayRef,
      t.amount,
      t.status,
      t.timestamp
    ]);
    exportToCsv('leo_payment_transactions', headers, rows);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Payment Gateways & Transaction Ledger ({filteredTransactions.length})
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Bank-Grade 256-Bit SSL
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit UPI, Credit/Debit cards, Net Banking, COD collections, Razorpay settlements, and refunds
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* Gateway Health Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">UPI Success Rate</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">98.4%</p>
          <span className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Card Success Rate</span>
          <p className="text-2xl font-black text-slate-900 mt-1">96.8%</p>
          <span className="text-[10px] text-slate-400">Visa, Mastercard, RuPay</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">COD Share</span>
          <p className="text-2xl font-black text-blue-600 mt-1">18.2%</p>
          <span className="text-[10px] text-slate-400">OTP verified orders</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Settled (Today)</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹48,290</p>
          <span className="text-[10px] text-emerald-600 font-semibold">T+1 Auto Payout</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Txn ID, Order #, Gateway Reference, Customer..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-slate-700"
        >
          <option value="all">All Payment Statuses</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending Collection</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Transaction ID & Timestamp</th>
                <th className="p-4">Order ID & Customer</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Gateway & Reference</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <p className="font-mono font-bold text-slate-900">{t.id}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{t.timestamp}</p>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-900">#{t.orderId}</span>
                    <p className="text-[11px] text-slate-500">{t.customer}</p>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.method}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-700">{t.gateway}</span>
                    <p className="font-mono text-[10px] text-slate-400">{t.gatewayRef}</p>
                  </td>

                  <td className="p-4">
                    <span className={`font-black text-xs ${
                      t.amount < 0 ? 'text-rose-600' : 'text-slate-900'
                    }`}>
                      ₹{Math.abs(t.amount).toLocaleString()}
                    </span>
                    {t.amount < 0 && <span className="text-[9px] text-rose-500 block font-bold">DEBIT / REFUND</span>}
                  </td>

                  <td className="p-4 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      t.status === 'Success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : t.status === 'Refunded'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : t.status.includes('Failed')
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;

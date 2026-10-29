import React, { useState } from 'react';
import {
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  Truck,
  DollarSign,
  AlertTriangle,
  Download,
  Eye,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_RETURNS, exportToCsv } from '../adminData';

const ReturnsTab = ({ triggerToast }) => {
  const [returnsList, setReturnsList] = useState(INITIAL_RETURNS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReturn, setSelectedReturn] = useState(null);

  const filteredReturns = returnsList.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.productName.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateReturnStatus = (id, newStatus, refundMsg) => {
    setReturnsList(returnsList.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: newStatus,
          refundStatus: refundMsg || r.refundStatus
        };
      }
      return r;
    }));
    if (triggerToast) triggerToast(`Return #${id} updated to ${newStatus}!`);
    setSelectedReturn(null);
  };

  const handleExportCsv = () => {
    const headers = ['Return ID', 'Order ID', 'Customer', 'Product', 'Size', 'Reason', 'Status', 'Courier', 'Refund Amount', 'Refund Status'];
    const rows = filteredReturns.map(r => [
      r.id,
      r.orderId,
      r.customer,
      r.productName,
      r.size,
      r.reason,
      r.status,
      r.courier,
      r.refundAmount,
      r.refundStatus
    ]);
    exportToCsv('leo_returns_and_refunds', headers, rows);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Returns, Exchanges & Instant Refunds ({filteredReturns.length})
            </h2>
            <span className="bg-purple-100 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
              Reverse Logistics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Process doorstep return pickups, quality inspection checks, size exchanges, and gateway refunds
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Returns</span>
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
            placeholder="Search return request by ID, Order #, customer name, reason..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-slate-700"
        >
          <option value="all">All Return Statuses</option>
          <option value="Pickup Scheduled">Pickup Scheduled</option>
          <option value="Refund Processed">Refund Processed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Return ID & Order</th>
                <th className="p-4">Customer & Product</th>
                <th className="p-4">Return Reason</th>
                <th className="p-4">Reverse Logistics Courier</th>
                <th className="p-4">Inspection QC</th>
                <th className="p-4">Refund Amount</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredReturns.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-bold text-slate-900">{r.id}</span>
                    <p className="text-[10px] text-slate-400 mt-0.5">For #{r.orderId}</p>
                    <span className="text-[9px] text-slate-400">{r.requestedDate}</span>
                  </td>

                  <td className="p-4">
                    <p className="font-bold text-slate-900">{r.customer}</p>
                    <p className="text-[11px] text-slate-600 truncate max-w-[180px]">{r.productName}</p>
                    <span className="text-[10px] text-slate-400 font-semibold">Size: {r.size}</span>
                  </td>

                  <td className="p-4">
                    <span className="text-slate-800 font-medium bg-slate-100 px-2 py-0.5 rounded text-[11px] block w-fit">
                      {r.reason}
                    </span>
                  </td>

                  <td className="p-4">
                    <p className="font-semibold text-slate-800 text-[11px] flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-400" />
                      <span>{r.courier}</span>
                    </p>
                    <p className="font-mono text-[10px] text-slate-400">{r.trackingNumber}</p>
                  </td>

                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      r.status === 'Refund Processed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : r.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {r.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[150px]">{r.inspectionStatus}</p>
                  </td>

                  <td className="p-4">
                    <span className="font-black text-slate-900">₹{r.refundAmount}</span>
                    <p className="text-[10px] text-slate-400">{r.refundMethod}</p>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedReturn(r)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Action</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Return Action Modal */}
      {selectedReturn && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Manage Return #{selectedReturn.id}</h3>
                <span className="text-[10px] text-slate-400">Order #{selectedReturn.orderId} • {selectedReturn.customer}</span>
              </div>
              <button
                onClick={() => setSelectedReturn(null)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
              <p><span className="font-bold text-slate-600">Product:</span> {selectedReturn.productName} (Size {selectedReturn.size})</p>
              <p><span className="font-bold text-slate-600">Reason:</span> {selectedReturn.reason}</p>
              <p><span className="font-bold text-slate-600">Inspection:</span> {selectedReturn.inspectionStatus}</p>
              <p><span className="font-bold text-slate-600">Refund Amount:</span> ₹{selectedReturn.refundAmount} ({selectedReturn.refundMethod})</p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-700 block">Take Administrative Action:</span>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <button
                  onClick={() => handleUpdateReturnStatus(selectedReturn.id, 'Refund Processed', 'Refund Approved & Initiated to Customer Bank Account')}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve & Refund</span>
                </button>
                <button
                  onClick={() => handleUpdateReturnStatus(selectedReturn.id, 'Rejected', 'Rejected - Inspection Failed')}
                  className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Return</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnsTab;

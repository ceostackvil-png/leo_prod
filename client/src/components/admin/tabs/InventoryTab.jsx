import React, { useState } from 'react';
import {
  Boxes,
  Plus,
  Minus,
  Search,
  AlertTriangle,
  Download,
  History,
  Warehouse,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { INITIAL_INVENTORY_ITEMS, INITIAL_STOCK_MOVEMENTS, exportToCsv } from '../adminData';

const InventoryTab = () => {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY_ITEMS);
  const [movements, setMovements] = useState(INITIAL_STOCK_MOVEMENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Adjustment Modal
  const [adjustingItem, setAdjustingItem] = useState(null);
  const [adjustQty, setAdjustQty] = useState(10);
  const [adjustType, setAdjustType] = useState('add'); // 'add' or 'remove'
  const [adjustReason, setAdjustReason] = useState('Supplier Batch Restock');

  const filteredInventory = inventory.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.warehouse.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApplyAdjustment = (e) => {
    e.preventDefault();
    if (!adjustingItem) return;

    const change = adjustType === 'add' ? Number(adjustQty) : -Number(adjustQty);
    const newStock = Math.max(0, adjustingItem.currentStock + change);
    const newAvail = Math.max(0, adjustingItem.availableStock + change);
    const newStatus = newStock >= adjustingItem.lowStockThreshold ? 'In Stock' : newStock > 0 ? 'Low Stock' : 'Out of Stock';

    // Update item
    setInventory(inventory.map(item => item.id === adjustingItem.id ? {
      ...item,
      currentStock: newStock,
      availableStock: newAvail,
      status: newStatus,
      lastRestocked: new Date().toISOString().slice(0, 10)
    } : item));

    // Record movement audit
    const newMovement = {
      id: `SM-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleString(),
      sku: adjustingItem.sku,
      type: adjustReason,
      change: change,
      balance: newStock,
      reference: `Manual Adj (${adjustType.toUpperCase()})`,
      admin: 'Dhruv Singhal (Super Admin)'
    };
    setMovements([newMovement, ...movements]);
    setAdjustingItem(null);
  };

  const handleExportInventory = () => {
    const headers = ['ID', 'SKU', 'Product Name', 'Category', 'Total Stock', 'Available', 'Reserved', 'Warehouse', 'Status'];
    const rows = filteredInventory.map(i => [
      i.id,
      i.sku,
      i.name,
      i.category,
      i.currentStock,
      i.availableStock,
      i.reservedStock,
      i.warehouse,
      i.status
    ]);
    exportToCsv('leo_inventory_ledger', headers, rows);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Inventory & Warehouse Control
            </h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              Live Stock Ledger
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time warehouse stock, reserved cart holds, low-stock thresholds, and replenishment audit logs
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <button
            onClick={handleExportInventory}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Stock</span>
          </button>
        </div>
      </div>

      {/* Stock Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Total Units in Hubs</span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {inventory.reduce((acc, curr) => acc + curr.currentStock, 0)}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">Across BLR, BOM & DEL</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Available to Sell</span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {inventory.reduce((acc, curr) => acc + curr.availableStock, 0)}
          </p>
          <span className="text-[10px] text-slate-500 font-medium">Ready for dispatch</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Reserved in Carts</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {inventory.reduce((acc, curr) => acc + curr.reservedStock, 0)}
          </p>
          <span className="text-[10px] text-amber-600 font-semibold">15-min auto hold</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Low & Out of Stock</span>
          <p className="text-2xl font-black text-rose-600 mt-1">
            {inventory.filter(i => i.status !== 'In Stock').length}
          </p>
          <span className="text-[10px] text-rose-600 font-bold">Needs immediate reorder</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search warehouse inventory by SKU, product name, warehouse..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-slate-700"
        >
          <option value="all">All Inventory Statuses</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">SKU & Item Details</th>
                <th className="p-4">Total Stock</th>
                <th className="p-4">Available</th>
                <th className="p-4">Reserved</th>
                <th className="p-4">Warehouse Hub</th>
                <th className="p-4">Status & Threshold</th>
                <th className="p-4 text-right">Stock Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <p className="font-mono font-bold text-slate-900">{item.sku}</p>
                    <p className="font-semibold text-slate-800 text-[11px] mt-0.5">{item.name}</p>
                    <span className="text-[10px] text-slate-400 capitalize">{item.category}</span>
                  </td>

                  <td className="p-4 font-black text-slate-900 text-sm">
                    {item.currentStock}
                  </td>

                  <td className="p-4 font-bold text-emerald-600">
                    {item.availableStock}
                  </td>

                  <td className="p-4 font-bold text-amber-600">
                    {item.reservedStock}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Warehouse className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{item.warehouse}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Restocked: {item.lastRestocked}</span>
                  </td>

                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      item.status === 'In Stock'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.status === 'Low Stock'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Threshold: &lt; {item.lowStockThreshold}</p>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => setAdjustingItem(item)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Adjust Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Movements Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">Recent Stock Movements & Audit History</h3>
          </div>
          <span className="text-[11px] text-slate-400">Auto-recorded on every stock change</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3">Log ID & Time</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Movement Type</th>
                <th className="p-3">Adjustment</th>
                <th className="p-3">New Balance</th>
                <th className="p-3">Authorized By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {movements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50">
                  <td className="p-3">
                    <span className="font-bold text-slate-900">{m.id}</span>
                    <p className="text-[10px] text-slate-400">{m.date}</p>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-800">{m.sku}</td>
                  <td className="p-3 font-medium text-slate-700">{m.type}</td>
                  <td className="p-3">
                    <span className={`font-black ${m.change > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {m.change > 0 ? `+${m.change}` : m.change}
                    </span>
                  </td>
                  <td className="p-3 font-black text-slate-900">{m.balance} units</td>
                  <td className="p-3 text-slate-500 text-[11px]">{m.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Adjust Modal */}
      {adjustingItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">Adjust Stock for {adjustingItem.sku}</h3>
            <p className="text-xs text-slate-500">{adjustingItem.name} • Currently: {adjustingItem.currentStock} units</p>

            <form onSubmit={handleApplyAdjustment} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAdjustType('add')}
                  className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    adjustType === 'add'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Stock</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustType('remove')}
                  className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    adjustType === 'remove'
                      ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>Remove Stock</span>
                </button>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Adjustment Quantity (Units)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-black text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Adjustment Reason / Note</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Supplier Batch Restock">Supplier Batch Restock</option>
                  <option value="Inventory Physical Count Audit">Inventory Physical Count Audit</option>
                  <option value="Damaged / Fabric Flaw Adjustment">Damaged / Fabric Flaw Adjustment</option>
                  <option value="Customer Return Restock">Customer Return Restock</option>
                  <option value="Sample / Marketing Shoot Transfer">Sample / Marketing Shoot Transfer</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setAdjustingItem(null)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTab;

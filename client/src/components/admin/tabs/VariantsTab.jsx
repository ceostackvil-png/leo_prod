import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Download,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Tag
} from 'lucide-react';
import { INITIAL_VARIANTS, exportToCsv } from '../adminData';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const VariantsTab = () => {
  const [variants, setVariants] = useState(INITIAL_VARIANTS);
  const [search, setSearch] = useState('');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newVariant, setNewVariant] = useState({
    productName: 'leo Classic Polo T-Shirt',
    sku: 'LEO-POLO-BLK-M',
    size: 'M',
    colorName: 'Pitch Black',
    colorHex: '#111827',
    fabric: '100% Combed Cotton Pique (220 GSM)',
    fit: 'Classic Regular Fit',
    pattern: 'Solid',
    sleeveNeck: 'Polo Collar / Half Sleeve',
    mrp: 1499,
    price: 799,
    stock: 35
  });

  const filteredVariants = variants.filter((v) => {
    const matchSearch =
      v.productName.toLowerCase().includes(search.toLowerCase()) ||
      v.sku.toLowerCase().includes(search.toLowerCase()) ||
      v.colorName.toLowerCase().includes(search.toLowerCase()) ||
      v.fabric.toLowerCase().includes(search.toLowerCase());

    const matchSize = sizeFilter === 'all' || v.size === sizeFilter;
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;

    return matchSearch && matchSize && matchStatus;
  });

  const handleAddVariant = (e) => {
    e.preventDefault();
    const created = {
      ...newVariant,
      id: `VAR-${Date.now().toString().slice(-4)}`,
      reservedStock: 0,
      status: newVariant.stock > 10 ? 'In Stock' : newVariant.stock > 0 ? 'Low Stock' : 'Out of Stock'
    };
    setVariants([created, ...variants]);
    setIsAddModalOpen(false);
  };

  const handleDeleteVariant = (id) => {
    if (window.confirm('Delete this product variant?')) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Product', 'SKU', 'Size', 'Color', 'Fabric', 'Fit', 'Pattern', 'Neck/Sleeve', 'Price', 'Stock', 'Status'];
    const rows = filteredVariants.map(v => [
      v.id,
      v.productName,
      v.sku,
      v.size,
      v.colorName,
      v.fabric,
      v.fit,
      v.pattern,
      v.sleeveNeck,
      v.price,
      v.stock,
      v.status
    ]);
    exportToCsv('leo_product_variants', headers, rows);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Product Variants & Attributes ({filteredVariants.length})
            </h2>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
              SKU Matrix
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Individual SKU-level size, color swatch, fabric GSM, fit, pattern, and variant pricing
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <button
            onClick={handleExportCsv}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Variant</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search variant by SKU, fabric, color, fit..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
          />
        </div>

        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-slate-700"
        >
          <option value="all">All Sizes (XS - 3XL)</option>
          {SIZES.map(s => <option key={s} value={s}>Size {s}</option>)}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-slate-700"
        >
          <option value="all">All Availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Variants Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Variant SKU & Product</th>
                <th className="p-4">Size & Color Swatch</th>
                <th className="p-4">Fabric & GSM</th>
                <th className="p-4">Fit & Pattern</th>
                <th className="p-4">Sleeve / Neck Type</th>
                <th className="p-4">Price & Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredVariants.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <p className="font-mono font-bold text-slate-900">{v.sku}</p>
                    <p className="text-[11px] text-slate-500">{v.productName}</p>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full border border-slate-300 shrink-0" style={{ backgroundColor: v.colorHex }} title={v.colorName} />
                      <div>
                        <span className="font-black text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                          {v.size}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{v.colorName}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="text-slate-800 font-medium">{v.fabric}</p>
                  </td>

                  <td className="p-4">
                    <p className="text-slate-800 font-semibold">{v.fit}</p>
                    <p className="text-[10px] text-slate-400">{v.pattern}</p>
                  </td>

                  <td className="p-4 text-slate-600">
                    {v.sleeveNeck}
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-slate-900">₹{v.price}</span>
                    <p className="text-[11px] font-semibold text-slate-600">{v.stock} units (avail)</p>
                  </td>

                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      v.status === 'In Stock'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : v.status === 'Low Stock'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {v.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteVariant(v.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Variant"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Variant Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">Create New Variant</h3>
            <form onSubmit={handleAddVariant} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newVariant.productName}
                  onChange={(e) => setNewVariant({ ...newVariant, productName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Variant SKU</label>
                  <input
                    type="text"
                    required
                    value={newVariant.sku}
                    onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Size</label>
                  <select
                    value={newVariant.size}
                    onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Color Name</label>
                  <input
                    type="text"
                    required
                    value={newVariant.colorName}
                    onChange={(e) => setNewVariant({ ...newVariant, colorName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Color Swatch (Hex)</label>
                  <input
                    type="color"
                    value={newVariant.colorHex}
                    onChange={(e) => setNewVariant({ ...newVariant, colorHex: e.target.value })}
                    className="w-full h-9 border border-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Fabric & GSM</label>
                  <input
                    type="text"
                    value={newVariant.fabric}
                    onChange={(e) => setNewVariant({ ...newVariant, fabric: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Fit Type</label>
                  <input
                    type="text"
                    value={newVariant.fit}
                    onChange={(e) => setNewVariant({ ...newVariant, fit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newVariant.price}
                    onChange={(e) => setNewVariant({ ...newVariant, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={newVariant.mrp}
                    onChange={(e) => setNewVariant({ ...newVariant, mrp: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  Save Variant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantsTab;

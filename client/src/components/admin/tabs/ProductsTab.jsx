import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { MEN_CATEGORIES, exportToCsv } from '../adminData';

const ITEMS_PER_PAGE = 24;

const ProductsTab = ({
  products = [],
  onOpenAddModal,
  onOpenEditModal,
  onDeleteProduct,
  onUpdateProduct
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const titleStr = (p.title || '').toLowerCase();
      const skuStr = (p.sku || '').toLowerCase();
      const catStr = (p.category || '').toLowerCase();
      const q = search.toLowerCase();

      const matchSearch =
        !q || titleStr.includes(q) || skuStr.includes(q) || catStr.includes(q) || String(p.id).toLowerCase().includes(q);

      const matchCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      const stock = p.inventory !== undefined ? p.inventory : 50;
      let matchStock = true;
      if (stockFilter === 'in_stock') matchStock = stock >= 15;
      else if (stockFilter === 'low_stock') matchStock = stock > 0 && stock < 15;
      else if (stockFilter === 'out_of_stock') matchStock = stock === 0;

      const matchStatus =
        statusFilter === 'all' || (p.status || 'Active').toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchCategory && matchStock && matchStatus;
    });
  }, [products, search, selectedCategory, stockFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const handleExportProducts = () => {
    const headers = ['ID', 'Title', 'SKU', 'Category', 'Price', 'MRP', 'Stock', 'Bestseller', 'Rating'];
    const rows = filteredProducts.map(p => [
      p.id,
      p.title,
      p.sku || `LEO-${p.id}`,
      p.category,
      p.price,
      p.mrp,
      p.inventory ?? 50,
      p.isBestseller ? 'Yes' : 'No',
      p.rating || 4.8
    ]);
    exportToCsv('leo_products_catalog', headers, rows);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header bar with Stats & Add Button */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Product Catalog ({filteredProducts.length.toLocaleString()})
            </h2>
            <span className="bg-[#dec562]/20 text-[#0f142b] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#dec562]/50">
              100% Men's Wear
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, read, update, and delete products, SKUs, pricing, stock levels, and bestseller badges
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <button
            onClick={handleExportProducts}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200/60"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title, SKU, ID, category..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white font-medium"
          />
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
        >
          <option value="all">All Men's Categories</option>
          {MEN_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => {
            setStockFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
        >
          <option value="all">All Stock Statuses</option>
          <option value="in_stock">In Stock (15+)</option>
          <option value="low_stock">Low Stock (1 - 14)</option>
          <option value="out_of_stock">Out of Stock (0)</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
        >
          <option value="all">All Publication Status</option>
          <option value="active">Active (Visible in Store)</option>
          <option value="draft">Draft (Unpublished)</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Product Info</th>
                <th className="p-4">SKU & Category</th>
                <th className="p-4">Pricing & GST</th>
                <th className="p-4">Stock Inventory</th>
                <th className="p-4">Badges & Rating</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">CRUD Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {paginatedProducts.map((p) => {
                const stock = p.inventory !== undefined ? p.inventory : 45;
                const discount = p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 40;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Product Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || '/images/products/POLOPDP-5_5c355606-1884-4943-b73a-f1503bc04014.jpg'}
                          alt={p.title}
                          className="w-11 h-11 object-cover rounded-xl bg-slate-100 border border-slate-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = '/images/products/POLOPDP-5_5c355606-1884-4943-b73a-f1503bc04014.jpg';
                          }}
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-[230px]" title={p.title}>
                            {p.title}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[230px]">
                            {p.fabric || '240 GSM Super Combed Cotton'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SKU & Category */}
                    <td className="p-4">
                      <p className="font-mono text-[11px] font-bold text-slate-800">
                        {p.sku || `LEO-${(p.category || 'MEN').toUpperCase().slice(0, 3)}-${p.id}`}
                      </p>
                      <span className="text-[10px] text-slate-600 capitalize bg-slate-100 px-2 py-0.5 rounded-md font-semibold mt-0.5 inline-block">
                        {p.category}
                      </span>
                    </td>

                    {/* Pricing */}
                    <td className="p-4">
                      <div className="font-black text-slate-900 text-xs">₹{p.price}</div>
                      <div className="text-[10px] text-slate-400 line-through">
                        MRP ₹{p.mrp || 1599} ({discount > 0 ? discount : 40}% off)
                      </div>
                      <span className="text-[9px] text-slate-500">GST: 5% included</span>
                    </td>

                    {/* Stock */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            stock >= 15
                              ? 'bg-emerald-500'
                              : stock > 0
                              ? 'bg-amber-400'
                              : 'bg-rose-500'
                          }`}
                        />
                        <span className="font-bold text-slate-900">{stock} units</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {stock >= 15 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </p>
                    </td>

                    {/* Badges with Quick Bestseller Toggle */}
                    <td className="p-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onUpdateProduct && onUpdateProduct(p.id, { isBestseller: !p.isBestseller })}
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider cursor-pointer transition-colors border ${
                            p.isBestseller
                              ? 'bg-[#dec562] text-[#0f142b] border-[#c9b150]'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle Bestseller badge"
                        >
                          {p.isBestseller ? '★ BESTSELLER' : '+ Bestseller'}
                        </button>
                        {p.isFavourite && (
                          <span className="bg-blue-100 text-blue-900 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                            FAVOURITE
                          </span>
                        )}
                        <span className="text-[10px] text-slate-600 font-bold flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {p.rating || 4.8}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block">
                        {p.status || 'Active'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenEditModal(p)}
                          className="px-2.5 py-1.5 text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 text-xs">
                    No matching products found. Try clearing your filters or adding a new product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            Showing{' '}
            <span className="font-bold text-slate-900">
              {filteredProducts.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-bold text-slate-900">
              {Math.min(safePage * ITEMS_PER_PAGE, filteredProducts.length)}
            </span>{' '}
            of <span className="font-bold text-slate-900">{filteredProducts.length.toLocaleString()}</span> products
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <span className="px-3 py-1.5 font-bold text-slate-800 bg-white border border-slate-200 rounded-lg">
              Page {safePage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTab;

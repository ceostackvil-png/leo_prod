import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { MEN_CATEGORIES } from '../adminData';

const CouponsTab = ({
  coupons = [],
  onCreateCoupon,
  onUpdateCoupon,
  onDeleteCoupon,
  triggerToast
}) => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const [couponForm, setCouponForm] = useState({
    code: '',
    type: 'percentage', // 'percentage' or 'flat'
    value: 15,
    minOrder: 999,
    maxDiscount: 500,
    isFirstOrderOnly: false,
    applicableCategory: 'all',
    usageLimit: 500,
    userLimit: 1,
    startDate: '2026-10-28',
    endDate: '2026-11-30',
    isFlashSale: false,
    description: '15% OFF on all Men’s Streetwear'
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      type: 'percentage',
      value: 15,
      minOrder: 999,
      maxDiscount: 500,
      isFirstOrderOnly: false,
      applicableCategory: 'all',
      usageLimit: 500,
      userLimit: 1,
      startDate: '2026-10-28',
      endDate: '2026-11-30',
      isFlashSale: false,
      description: '15% OFF on all Men’s Streetwear'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      type: coupon.type === 'FIXED' || coupon.type === 'flat' ? 'flat' : 'percentage',
      value: coupon.value,
      minOrder: coupon.minOrder ?? 999,
      maxDiscount: coupon.maxDiscount ?? 500,
      isFirstOrderOnly: Boolean(coupon.isFirstOrderOnly),
      applicableCategory: coupon.applicableCategory || 'all',
      usageLimit: coupon.usageLimit ?? 500,
      userLimit: coupon.userLimit ?? 1,
      startDate: coupon.startDate || '2026-10-28',
      endDate: coupon.endDate || '2026-11-30',
      isFlashSale: Boolean(coupon.isFlashSale),
      description: coupon.description || 'LEO Promotional Voucher'
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingCoupon && onUpdateCoupon) {
      await onUpdateCoupon(editingCoupon.code, couponForm);
    } else if (onCreateCoupon) {
      await onCreateCoupon(couponForm);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Promotional Coupons & Flash Discounts ({coupons.length})
            </h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              Discounts Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, and delete percentage or flat rupee vouchers, minimum basket limits, and flash sales
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((c) => {
          const isFlat = c.type === 'flat' || c.type === 'FIXED';
          return (
            <div
              key={c.code}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top decorative stripe */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  c.isFlashSale
                    ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {c.isFlashSale && <Zap className="w-2.5 h-2.5 text-rose-600" />}
                  <span>{c.isFlashSale ? 'FLASH SALE' : 'ACTIVE'}</span>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer p-1"
                    title="Edit Coupon"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteCoupon(c.code)}
                    className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer p-1"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="bg-slate-50 border border-dashed border-slate-300 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-mono text-base font-black tracking-wider text-slate-900 block">
                    {c.code}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {isFlat ? `Flat ₹${c.value} OFF` : `${c.value}% OFF`}
                  </span>
                </div>

                <button
                  onClick={() => handleCopy(c.code)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-slate-700 text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  {copiedCode === c.code ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === c.code ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Rules Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">{c.description || 'LEO Promotional Voucher'}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Min Order: ₹{c.minOrder ?? 999}</span>
                  <span>Max Discount: ₹{c.maxDiscount ?? 500}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Usage Limit: {c.usageLimit ?? 500} orders</span>
                  <span>Valid: {c.endDate || 'Nov 30, 2026'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black text-slate-900">
              {editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Create New Coupon'}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    disabled={Boolean(editingCoupon)}
                    placeholder="e.g. LEO200"
                    value={couponForm.code}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono font-bold disabled:bg-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Discount Type</label>
                  <select
                    value={couponForm.type}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    <option value="percentage">Percentage (%) Discount</option>
                    <option value="flat">Fixed Rupee (₹) Discount</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Value ({couponForm.type === 'flat' ? '₹' : '%'})</label>
                  <input
                    type="number"
                    required
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-black"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={couponForm.minOrder}
                    onChange={(e) => setCouponForm({ ...couponForm, minOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={couponForm.maxDiscount}
                    onChange={(e) => setCouponForm({ ...couponForm, maxDiscount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Category Restriction</label>
                  <select
                    value={couponForm.applicableCategory}
                    onChange={(e) => setCouponForm({ ...couponForm, applicableCategory: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    <option value="all">Applicable Storewide</option>
                    {MEN_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Usage Limit (Global)</label>
                  <input
                    type="number"
                    value={couponForm.usageLimit}
                    onChange={(e) => setCouponForm({ ...couponForm, usageLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={couponForm.isFirstOrderOnly}
                    onChange={(e) => setCouponForm({ ...couponForm, isFirstOrderOnly: e.target.checked })}
                    className="rounded text-amber-500"
                  />
                  <span className="font-semibold text-slate-700">First Order Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={couponForm.isFlashSale}
                    onChange={(e) => setCouponForm({ ...couponForm, isFlashSale: e.target.checked })}
                    className="rounded text-rose-500"
                  />
                  <span className="font-semibold text-rose-700">Flash Sale Badge</span>
                </label>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Short Description</label>
                <input
                  type="text"
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  {editingCoupon ? 'Save Changes' : 'Publish Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsTab;

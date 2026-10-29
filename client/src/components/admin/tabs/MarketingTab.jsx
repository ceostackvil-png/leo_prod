import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Sparkles
} from 'lucide-react';

const MarketingTab = ({
  banners = [],
  onCreateBanner,
  onUpdateBanner,
  onDeleteBanner
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    badge: 'NEW DROP',
    ctaText: 'SHOP NOW',
    ctaLink: '/shop',
    desktopImage: '/images/banners/banner_hoodies_winter_wear.png',
    mobileImage: '/images/banners/banner_hoodies_winter_wear.png',
    active: true
  });

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setBannerForm({
      title: '',
      subtitle: '',
      badge: 'NEW DROP',
      ctaText: 'SHOP NOW',
      ctaLink: '/shop',
      desktopImage: '/images/banners/banner_hoodies_winter_wear.png',
      mobileImage: '/images/banners/banner_hoodies_winter_wear.png',
      active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBanner(b);
    setBannerForm({
      title: b.title || '',
      subtitle: b.subtitle || '',
      badge: b.badge || 'PROMOTION',
      ctaText: b.ctaText || 'SHOP NOW',
      ctaLink: b.ctaLink || '/shop',
      desktopImage: b.desktopImage || b.image || '/images/banners/banner_hoodies_winter_wear.png',
      mobileImage: b.mobileImage || b.image || '/images/banners/banner_hoodies_winter_wear.png',
      active: b.active !== false
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingBanner && onUpdateBanner) {
      await onUpdateBanner(editingBanner.id, bannerForm);
    } else if (onCreateBanner) {
      await onCreateBanner(bannerForm);
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
              Marketing Drops & Homepage Banners ({banners.length})
            </h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              Hero Carousel
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, toggle, and delete hero sliders, promotional campaign banners, and CTA links
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer self-stretch sm:self-auto justify-center"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Hero Slide</span>
        </button>
      </div>

      {/* Live Hero Banner Slides */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Storefront Hero Slides
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((b, idx) => (
            <div
              key={b.id || idx}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                <img
                  src={b.desktopImage || b.image || '/images/banners/banner_hoodies_winter_wear.png'}
                  alt={b.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/banners/banner_hoodies_winter_wear.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="bg-[#dec562] text-[#0f142b] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider w-fit shadow-xs">
                      {b.badge || 'PROMOTION'}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      b.active !== false ? 'bg-emerald-500/90 text-white' : 'bg-slate-600/90 text-slate-200'
                    }`}>
                      {b.active !== false ? 'LIVE' : 'HIDDEN'}
                    </span>
                  </div>
                  <h4 className="text-base font-black leading-tight drop-shadow-sm">{b.title}</h4>
                  <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">{b.subtitle}</p>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">CTA: {b.ctaLink || '/shop'}</span>
                  <span className="font-bold text-slate-800">{b.ctaText || 'EXPLORE NOW'}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="px-2.5 py-1.5 text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                    title="Edit Slide"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteBanner(b.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Marketing Campaigns */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Scheduled Campaigns & Seasonal Drops</h3>
          </div>
          <span className="text-xs text-slate-400">Q4 2026 Calendar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { name: '240 GSM Heavy French Terry Launch', status: 'Live & Active', dates: 'Oct 20 - Nov 15', badge: 'Active' },
            { name: 'Winter Warmth 320 GSM Fleece Hoodies', status: 'Scheduled (Nov 1)', dates: 'Nov 1 - Dec 31', badge: 'Upcoming' },
            { name: 'Black Friday & Cyber Week 2026', status: 'Draft Campaign', dates: 'Nov 25 - Dec 2', badge: 'Draft' }
          ].map((camp, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  camp.badge === 'Active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : camp.badge === 'Upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {camp.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{camp.dates}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{camp.name}</h4>
              <p className="text-[11px] text-slate-500">{camp.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black text-slate-900">
              {editingBanner ? 'Edit Hero Slide' : 'Add Homepage Hero Slide'}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Slide Title / Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 240 GSM HEAVYWEIGHT COLLECTION"
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Subheadline / Supporting Line</label>
                <input
                  type="text"
                  placeholder="e.g. Engineered with Combed Cotton for effortless daily comfort"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={bannerForm.badge}
                    onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">CTA Destination URL</label>
                <input
                  type="text"
                  value={bannerForm.ctaLink}
                  onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Desktop Banner Image URL</label>
                <input
                  type="text"
                  required
                  value={bannerForm.desktopImage}
                  onChange={(e) => setBannerForm({ ...bannerForm, desktopImage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Mobile Banner Image URL</label>
                <input
                  type="text"
                  required
                  value={bannerForm.mobileImage}
                  onChange={(e) => setBannerForm({ ...bannerForm, mobileImage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-xs"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bannerForm.active}
                  onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                  className="rounded text-amber-500"
                />
                <span className="font-bold text-slate-700">Active & Visible on Storefront</span>
              </label>

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
                  {editingBanner ? 'Update Slide' : 'Save Hero Slide'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingTab;

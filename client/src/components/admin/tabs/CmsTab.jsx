import React, { useState } from 'react';
import {
  Save,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { INITIAL_CMS_CONTENT } from '../adminData';
import { api } from '../../../services/api';

const CmsTab = ({
  blogs = [],
  onCreateBlog,
  onUpdateBlog,
  onDeleteBlog,
  triggerToast
}) => {
  const [cms, setCms] = useState(INITIAL_CMS_CONTENT);
  const [activeSection, setActiveSection] = useState('home'); // 'home', 'about', 'faq', 'policies', 'blogs'
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    category: 'Style Guide',
    excerpt: '',
    content: '',
    image: '/images/banners/banner_oversized_streetwear.png'
  });

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      await api.updateCms(cms);
    } catch (err) {
      console.error(err);
    }
    if (triggerToast) triggerToast('Website CMS content updated & published live!');
  };

  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      slug: '',
      category: 'Style Guide',
      excerpt: '',
      content: '',
      image: '/images/banners/banner_oversized_streetwear.png'
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (b) => {
    setEditingBlog(b);
    setBlogForm({
      title: b.title || '',
      slug: b.slug || '',
      category: b.category || 'Style Guide',
      excerpt: b.excerpt || b.summary || '',
      content: b.content || '',
      image: b.image || '/images/banners/banner_oversized_streetwear.png'
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (editingBlog && onUpdateBlog) {
      await onUpdateBlog(editingBlog.slug || editingBlog.id, blogForm);
    } else if (onCreateBlog) {
      await onCreateBlog(blogForm);
    }
    setIsBlogModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Website Content Management (CMS)
            </h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              Live Storefront Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Edit announcement ribbons, brand story, FAQs, customer care policies, contact info and journal articles
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeSection === 'blogs' && (
            <button
              type="button"
              onClick={handleOpenAddBlog}
              className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>New Article</span>
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      {/* Section Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'home', label: 'Homepage & Ribbons' },
          { id: 'about', label: 'About Us & Brand Story' },
          { id: 'faq', label: 'FAQ Manager' },
          { id: 'policies', label: 'Legal & Shipping Policies' },
          { id: 'blogs', label: `LEO Journal Blogs (${blogs.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors shrink-0 cursor-pointer ${
              activeSection === tab.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: HOMEPAGE & RIBBONS */}
      {activeSection === 'home' && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Top Announcement Ribbon Ticker</label>
            <input
              type="text"
              value={cms.announcementBar}
              onChange={(e) => setCms({ ...cms, announcementBar: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium"
            />
            <p className="text-[10px] text-slate-400 mt-1">Displays on the very top of all consumer pages</p>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Main Hero Headline</label>
            <input
              type="text"
              value={cms.heroHeadline}
              onChange={(e) => setCms({ ...cms, heroHeadline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-black text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Hero Subheadline & Tagline</label>
            <input
              type="text"
              value={cms.heroSubheadline}
              onChange={(e) => setCms({ ...cms, heroSubheadline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Customer Support Email</label>
              <input
                type="text"
                value={cms.supportEmail}
                onChange={(e) => setCms({ ...cms, supportEmail: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Support Phone Helpline</label>
              <input
                type="text"
                value={cms.supportPhone}
                onChange={(e) => setCms({ ...cms, supportPhone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Operating Hours</label>
              <input
                type="text"
                value={cms.supportHours}
                onChange={(e) => setCms({ ...cms, supportHours: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>
        </form>
      )}

      {/* SECTION 2: ABOUT US */}
      {activeSection === 'about' && (
        <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">About Us Page Title</label>
            <input
              type="text"
              value={cms.aboutUsHeadline}
              onChange={(e) => setCms({ ...cms, aboutUsHeadline: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Brand Vision & Philosophy</label>
            <textarea
              rows={6}
              value={cms.aboutUsSummary}
              onChange={(e) => setCms({ ...cms, aboutUsSummary: e.target.value })}
              className="w-full p-3 border border-slate-200 rounded-lg text-xs leading-relaxed"
            />
          </div>
        </form>
      )}

      {/* SECTION 3: FAQs */}
      {activeSection === 'faq' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Frequently Asked Questions ({cms.faqList.length})</h3>
          </div>

          <div className="space-y-3">
            {cms.faqList.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                <p className="font-bold text-slate-900 text-xs">Q: {faq.q}</p>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: POLICIES */}
      {activeSection === 'policies' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Shipping & Delivery Policy</label>
            <textarea
              rows={3}
              value={cms.policies.shipping}
              onChange={(e) => setCms({ ...cms, policies: { ...cms.policies, shipping: e.target.value } })}
              className="w-full p-3 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">7-Day Return & Exchange Policy</label>
            <textarea
              rows={3}
              value={cms.policies.returns}
              onChange={(e) => setCms({ ...cms, policies: { ...cms.policies, returns: e.target.value } })}
              className="w-full p-3 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Privacy & Data Security Policy</label>
            <textarea
              rows={3}
              value={cms.policies.privacy}
              onChange={(e) => setCms({ ...cms, policies: { ...cms.policies, privacy: e.target.value } })}
              className="w-full p-3 border border-slate-200 rounded-lg text-xs"
            />
          </div>
        </div>
      )}

      {/* SECTION 5: BLOGS */}
      {activeSection === 'blogs' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">LEO Editorial Journal Articles ({blogs.length})</h3>
            <button
              type="button"
              onClick={handleOpenAddBlog}
              className="px-3 py-1.5 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((b) => (
              <div key={b.id || b.slug} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {b.category || 'Menswear Style Guide'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.date || 'Oct 2026'}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{b.excerpt || b.summary}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                  <span className="text-[10px] text-slate-400 font-mono">/blogs/{b.slug}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditBlog(b)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {onDeleteBlog && (
                      <button
                        type="button"
                        onClick={() => onDeleteBlog(b.slug || b.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Create/Edit Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              {editingBlog ? 'Edit Journal Article' : 'Publish New Journal Article'}
            </h3>
            <form onSubmit={handleSaveBlog} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to Style 240 GSM Oversized Tees"
                  value={blogForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setBlogForm({ ...blogForm, title, slug: editingBlog ? blogForm.slug : slug });
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Category</label>
                  <input
                    type="text"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Article Body Content</label>
                <textarea
                  rows={4}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  {editingBlog ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsTab;

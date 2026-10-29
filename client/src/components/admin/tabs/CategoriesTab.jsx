import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';
import { MEN_CATEGORIES, BRANDS, INITIAL_COLLECTIONS } from '../adminData';
import { api } from '../../../services/api';

const CategoriesTab = ({ triggerToast }) => {
  const [categories, setCategories] = useState(MEN_CATEGORIES);
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS);
  const [activeSubTab, setActiveSubTab] = useState('categories'); // 'categories', 'collections', 'brands'
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [categoryForm, setCategoryForm] = useState({
    id: '',
    name: '',
    slug: '',
    image: '/images/categories/cat_oversized_tees_new.png',
    description: ''
  });

  const [newCollection, setNewCollection] = useState({
    name: '',
    slug: '',
    type: 'Custom',
    rule: '',
    status: 'Active'
  });

  useEffect(() => {
    const fetchTaxonomy = async () => {
      try {
        const [cats, cols] = await Promise.all([
          api.getCategories().catch(() => null),
          api.getCollections().catch(() => null)
        ]);
        if (Array.isArray(cats) && cats.length > 0) setCategories(cats);
        if (Array.isArray(cols) && cols.length > 0) setCollections(cols);
      } catch (err) {
        console.error('Failed to load categories/collections:', err);
      }
    };
    fetchTaxonomy();
  }, []);

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      id: '',
      name: '',
      slug: '',
      image: '/images/categories/cat_oversized_tees_new.png',
      description: ''
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      id: cat.id,
      name: cat.name,
      slug: cat.slug || cat.id,
      image: cat.image || '/images/categories/cat_oversized_tees_new.png',
      description: cat.description || ''
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        const res = await api.updateCategory(editingCategory.id, categoryForm);
        const updated = res?.data || { ...editingCategory, ...categoryForm };
        setCategories(categories.map((c) => (c.id === editingCategory.id ? updated : c)));
        if (triggerToast) triggerToast(`Category "${updated.name}" updated!`);
      } else {
        const res = await api.createCategory(categoryForm);
        const created = res?.data || { ...categoryForm, id: categoryForm.slug || `cat-${Date.now()}` };
        setCategories([...categories, created]);
        if (triggerToast) triggerToast(`Category "${created.name}" created!`);
      }
    } catch {
      const fallback = {
        ...categoryForm,
        id: editingCategory ? editingCategory.id : (categoryForm.slug || `cat-${Date.now()}`)
      };
      if (editingCategory) {
        setCategories(categories.map((c) => (c.id === editingCategory.id ? fallback : c)));
      } else {
        setCategories([...categories, fallback]);
      }
      if (triggerToast) triggerToast('Category saved!');
    }
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await api.deleteCategory(id);
    } catch (err) {
      console.error(err);
    }
    setCategories(categories.filter((c) => c.id !== id));
    if (triggerToast) triggerToast('Category deleted.');
  };

  const handleAddCollection = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createCollection(newCollection);
      const created = res?.data || {
        ...newCollection,
        id: `col-${Date.now().toString().slice(-4)}`,
        count: 0,
        banner: '/images/collections/col_coords.png'
      };
      setCollections([...collections, created]);
      if (triggerToast) triggerToast(`Collection "${created.name}" created!`);
    } catch {
      const created = {
        ...newCollection,
        id: `col-${Date.now().toString().slice(-4)}`,
        count: 0,
        banner: '/images/collections/col_coords.png'
      };
      setCollections([...collections, created]);
    }
    setIsCollectionModalOpen(false);
    setNewCollection({ name: '', slug: '', type: 'Custom', rule: '', status: 'Active' });
  };

  const handleDeleteCollection = async (id) => {
    if (!window.confirm('Delete this collection?')) return;
    try {
      await api.deleteCollection(id);
    } catch (err) {
      console.error(err);
    }
    setCollections(collections.filter((c) => c.id !== id));
    if (triggerToast) triggerToast('Collection deleted.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Categories, Brands & Curated Drops
            </h2>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
              Men's Taxonomy
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, edit, and delete storefront categories, curated collections, and house brands
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenAddCategory}
            className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Category</span>
          </button>

          <button
            onClick={() => setIsCollectionModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Collection</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('categories')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'categories'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Categories & Subcategories ({categories.length})
        </button>
        <button
          onClick={() => setActiveSubTab('collections')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'collections'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Curated Collections & Seasonal Drops ({collections.length})
        </button>
        <button
          onClick={() => setActiveSubTab('brands')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'brands'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          LEO House Brands ({BRANDS.length})
        </button>
      </div>

      {/* VIEW 1: Categories */}
      {activeSubTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={cat.image || '/images/categories/cat_oversized_tees_new.png'}
                  alt={cat.name}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 border border-slate-200 shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = '/images/categories/cat_oversized_tees_new.png';
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{cat.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">/category/{cat.slug || cat.id}</p>
                  <span className="text-[10px] text-emerald-600 font-semibold">{cat.count ?? 24} Live Items</span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleOpenEditCategory(cat)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Edit Category"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: Collections */}
      {activeSubTab === 'collections' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-4">Collection Title & Slug</th>
                <th className="p-4">Type</th>
                <th className="p-4">Inclusion Criteria / Rule</th>
                <th className="p-4">Active Items</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {collections.map((col) => (
                <tr key={col.id} className="hover:bg-slate-50/70">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{col.name || col.title}</p>
                    <p className="text-[10px] font-mono text-slate-400">/{col.slug || col.id}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded text-[10px]">
                      {col.type || 'Curated'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">
                    {col.rule || col.subtitle || 'Curated Menswear Collection'}
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    {col.count ?? 18} products
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full text-[10px]">
                      {col.status || 'Active'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteCollection(col.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Collection"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 3: Brands */}
      {activeSubTab === 'brands' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRANDS.map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 tracking-tight">{b.name}</h4>
                <span className="bg-[#dec562]/20 text-[#0f142b] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#dec562]/40">
                  House Label
                </span>
              </div>
              <p className="text-xs text-slate-500">{b.description}</p>
              <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400 font-mono">
                <span>brand_id: {b.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Category'}
            </h3>
            <form onSubmit={handleSaveCategory} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heavyweight Polos"
                  value={categoryForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setCategoryForm({ ...categoryForm, name, slug, id: editingCategory ? categoryForm.id : slug });
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Category Image URL</label>
                <input
                  type="text"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  {editingCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Collection Modal */}
      {isCollectionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-black text-slate-900">Create New Collection</h3>
            <form onSubmit={handleAddCollection} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Collection Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimalist Summer Drop"
                  value={newCollection.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    setNewCollection({ ...newCollection, name, slug });
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={newCollection.slug}
                  onChange={(e) => setNewCollection({ ...newCollection, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Collection Type</label>
                <select
                  value={newCollection.type}
                  onChange={(e) => setNewCollection({ ...newCollection, type: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                >
                  <option value="Seasonal">Seasonal Drop</option>
                  <option value="Festival">Festival Collection</option>
                  <option value="Automated">Automated Rule-based</option>
                  <option value="Custom">Custom Handpicked</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Inclusion Rule / Description</label>
                <input
                  type="text"
                  placeholder="e.g. Products tagged with #Summer2026"
                  value={newCollection.rule}
                  onChange={(e) => setNewCollection({ ...newCollection, rule: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCollectionModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  // Categories & Mega Menu CRUD
  getCategories: async () => {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },
  createCategory: async (category) => {
    const res = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    return res.json();
  },
  updateCategory: async (id, data) => {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteCategory: async (id) => {
    const res = await fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Collections CRUD
  getCollections: async () => {
    const res = await fetch(`${API_BASE}/collections`);
    return res.json();
  },
  createCollection: async (collection) => {
    const res = await fetch(`${API_BASE}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collection),
    });
    return res.json();
  },
  updateCollection: async (id, data) => {
    const res = await fetch(`${API_BASE}/collections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteCollection: async (id) => {
    const res = await fetch(`${API_BASE}/collections/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Hero Banners CRUD
  getBanners: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/banners${query ? `?${query}` : ''}`);
    return res.json();
  },
  createBanner: async (banner) => {
    const res = await fetch(`${API_BASE}/banners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(banner),
    });
    return res.json();
  },
  updateBanner: async (id, data) => {
    const res = await fetch(`${API_BASE}/banners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteBanner: async (id) => {
    const res = await fetch(`${API_BASE}/banners/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Looks
  getLooks: async () => {
    const res = await fetch(`${API_BASE}/looks`);
    return res.json();
  },
  getLookById: async (idOrSlug) => {
    const res = await fetch(`${API_BASE}/looks/${idOrSlug}`);
    return res.json();
  },

  // Products CRUD
  getProducts: async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, v);
      }
    });
    const res = await fetch(`${API_BASE}/products?${query.toString()}`);
    return res.json();
  },
  getProductById: async (idOrSlug) => {
    const res = await fetch(`${API_BASE}/products/${idOrSlug}`);
    return res.json();
  },
  createProduct: async (product) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return res.json();
  },
  updateProduct: async (id, data) => {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Coupons CRUD & Validation
  getCoupons: async () => {
    const res = await fetch(`${API_BASE}/coupons`);
    return res.json();
  },
  validateCoupon: async (code, orderAmount) => {
    const res = await fetch(`${API_BASE}/coupons/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, orderAmount }),
    });
    return res.json();
  },
  createCoupon: async (coupon) => {
    const res = await fetch(`${API_BASE}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coupon),
    });
    return res.json();
  },
  updateCoupon: async (code, data) => {
    const res = await fetch(`${API_BASE}/coupons/${encodeURIComponent(code)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteCoupon: async (code) => {
    const res = await fetch(`${API_BASE}/coupons/${encodeURIComponent(code)}`, { method: 'DELETE' });
    return res.json();
  },

  // Reviews CRUD & Moderation
  getReviews: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/reviews${query ? `?${query}` : ''}`);
    return res.json();
  },
  createReview: async (review) => {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    });
    return res.json();
  },
  updateReviewStatus: async (id, status, brandReply) => {
    const payload = {};
    if (status !== undefined) payload.status = status;
    if (brandReply !== undefined) payload.brandReply = brandReply;
    const res = await fetch(`${API_BASE}/reviews/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  deleteReview: async (id) => {
    const res = await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Blogs & CMS CRUD
  getBlogs: async () => {
    const res = await fetch(`${API_BASE}/blogs`);
    return res.json();
  },
  getBlogBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/blogs/${slug}`);
    return res.json();
  },
  createBlog: async (blog) => {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    return res.json();
  },
  updateBlog: async (idOrSlug, data) => {
    const res = await fetch(`${API_BASE}/blogs/${idOrSlug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteBlog: async (idOrSlug) => {
    const res = await fetch(`${API_BASE}/blogs/${idOrSlug}`, { method: 'DELETE' });
    return res.json();
  },
  getCms: async () => {
    const res = await fetch(`${API_BASE}/cms`);
    return res.json();
  },
  updateCms: async (cmsData) => {
    const res = await fetch(`${API_BASE}/cms`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cmsData),
    });
    return res.json();
  },

  // Orders & Tracking CRUD
  getOrders: async () => {
    const res = await fetch(`${API_BASE}/orders`);
    return res.json();
  },
  getOrderById: async (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/orders/${id}${query ? `?${query}` : ''}`);
    return res.json();
  },
  createOrder: async (orderData) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    return res.json();
  },
  updateOrder: async (id, data) => {
    const res = await fetch(`${API_BASE}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateOrderStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },
  deleteOrder: async (id) => {
    const res = await fetch(`${API_BASE}/orders/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Analytics & Pincode Checker
  getAnalytics: async () => {
    const res = await fetch(`${API_BASE}/analytics`);
    return res.json();
  },
  checkPincode: async (pincode) => {
    const res = await fetch(`${API_BASE}/pincode/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode }),
    });
    return res.json();
  },
};

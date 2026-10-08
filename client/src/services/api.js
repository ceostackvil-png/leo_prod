const API_BASE = '/api';

export const api = {
  // Categories & Mega Menu
  getCategories: async () => {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },

  // Collections
  getCollections: async () => {
    const res = await fetch(`${API_BASE}/collections`);
    return res.json();
  },

  // Hero Banners
  getBanners: async () => {
    const res = await fetch(`${API_BASE}/banners`);
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
  deleteBanner: async (id) => {
    const res = await fetch(`${API_BASE}/banners/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Looks
  getLooks: async () => {
    const res = await fetch(`${API_BASE}/looks`);
    return res.json();
  },

  // Products
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
  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    return res.json();
  },

  // Coupons
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
  deleteCoupon: async (code) => {
    const res = await fetch(`${API_BASE}/coupons/${code}`, { method: 'DELETE' });
    return res.json();
  },

  // Reviews
  getReviews: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/reviews?${query}`);
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
  updateReviewStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/reviews/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  // Blogs
  getBlogs: async () => {
    const res = await fetch(`${API_BASE}/blogs`);
    return res.json();
  },
  getBlogBySlug: async (slug) => {
    const res = await fetch(`${API_BASE}/blogs/${slug}`);
    return res.json();
  },

  // Orders & Tracking
  getOrders: async () => {
    const res = await fetch(`${API_BASE}/orders`);
    return res.json();
  },
  getOrderById: async (id, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/orders/${id}?${query}`);
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
  updateOrderStatus: async (id, status) => {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },

  // Analytics
  getAnalytics: async () => {
    const res = await fetch(`${API_BASE}/analytics`);
    return res.json();
  },

  // Pincode Checker
  checkPincode: async (pincode) => {
    const res = await fetch(`${API_BASE}/pincode/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pincode }),
    });
    return res.json();
  },
};

// ============================================================================
// LEO — Enterprise Backend CRUD & Swagger Route Controller
// Complete Create, Read, Update, Delete (CRUD) operations with validation
// ============================================================================

import express from 'express';
import path from 'path';
import { swaggerSpec, renderSwaggerHtml } from './swagger.js';

export function normalizeOrder(o) {
  const status = o.status || o.orderStatus || 'Placed';
  const customerName = o.customer?.name || o.customerName || o.shippingAddress?.fullName || 'Customer';
  const customerEmail = o.customer?.email || o.customerEmail || 'customer@leomenswear.com';
  const customerPhone = o.customer?.phone || o.customerPhone || o.shippingAddress?.phone || '+91 98765 43210';
  return {
    ...o,
    status,
    orderStatus: status,
    createdAt: o.createdAt || o.placedAt || new Date().toISOString(),
    placedAt: o.placedAt || o.createdAt || new Date().toISOString(),
    customerName,
    customerEmail,
    customerPhone,
    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone
    }
  };
}

export function registerEnterpriseRoutes(app, readDB, writeDB, __dirname) {
  // Serve client public images so /images/logo (1).png works on backend port too
  app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

  // ==========================================================================
  // 1. Swagger / OpenAPI 3.0 Documentation
  // ==========================================================================
  app.get(['/api-docs.json', '/api/docs.json'], (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(swaggerSpec);
  });

  app.get(['/api-docs', '/api/docs'], (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(renderSwaggerHtml());
  });

  // ==========================================================================
  // 2. Categories & Collections CRUD
  // ==========================================================================
  app.get('/api/categories', (req, res) => {
    const db = readDB();
    res.json({ success: true, data: db.categories || [] });
  });

  app.post('/api/categories', (req, res) => {
    const db = readDB();
    if (!req.body.name) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }
    const slug = (req.body.slug || req.body.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCategory = {
      id: req.body.id || slug || `cat-${Date.now()}`,
      name: req.body.name,
      slug,
      count: Number(req.body.count) || 0,
      image: req.body.image || '/images/collections/col_oversized_tees.png',
      ...req.body
    };
    db.categories = [...(db.categories || []), newCategory];
    writeDB(db);
    res.status(201).json({ success: true, data: newCategory });
  });

  app.put('/api/categories/:id', (req, res) => {
    const db = readDB();
    const idx = (db.categories || []).findIndex(c => c.id === req.params.id || c.slug === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Category not found' });
    db.categories[idx] = { ...db.categories[idx], ...req.body };
    writeDB(db);
    res.json({ success: true, data: db.categories[idx] });
  });

  app.delete('/api/categories/:id', (req, res) => {
    const db = readDB();
    db.categories = (db.categories || []).filter(c => c.id !== req.params.id && c.slug !== req.params.id);
    writeDB(db);
    res.json({ success: true, message: 'Category deleted' });
  });

  app.get('/api/collections', (req, res) => {
    const db = readDB();
    res.json({ success: true, data: db.collections || [] });
  });

  app.post('/api/collections', (req, res) => {
    const db = readDB();
    if (!req.body.name) {
      return res.status(400).json({ success: false, error: 'Collection name is required' });
    }
    const slug = (req.body.slug || req.body.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCollection = {
      id: req.body.id || `col-${Date.now()}`,
      name: req.body.name,
      slug,
      type: req.body.type || 'Custom',
      rule: req.body.rule || 'Curated collection',
      count: Number(req.body.count) || 0,
      status: req.body.status || 'Active',
      banner: req.body.banner || '/images/collections/col_coords.png',
      ...req.body
    };
    db.collections = [...(db.collections || []), newCollection];
    writeDB(db);
    res.status(201).json({ success: true, data: newCollection });
  });

  app.put('/api/collections/:id', (req, res) => {
    const db = readDB();
    const idx = (db.collections || []).findIndex(c => c.id === req.params.id || c.slug === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Collection not found' });
    db.collections[idx] = { ...db.collections[idx], ...req.body };
    writeDB(db);
    res.json({ success: true, data: db.collections[idx] });
  });

  app.delete('/api/collections/:id', (req, res) => {
    const db = readDB();
    db.collections = (db.collections || []).filter(c => c.id !== req.params.id && c.slug !== req.params.id);
    writeDB(db);
    res.json({ success: true, message: 'Collection deleted' });
  });

  // ==========================================================================
  // 3. Hero Banners CRUD
  // ==========================================================================
  app.get('/api/banners', (req, res) => {
    const db = readDB();
    const allBanners = (db.heroBanners || []).sort((a, b) => (a.order || 0) - (b.order || 0));
    const list = req.query.all === 'true' ? allBanners : allBanners.filter(b => b.active !== false);
    res.json({ success: true, data: list });
  });

  app.post('/api/banners', (req, res) => {
    const db = readDB();
    if (!req.body.title) {
      return res.status(400).json({ success: false, error: 'Banner title is required' });
    }
    const newBanner = {
      id: `banner-${Date.now()}`,
      title: req.body.title,
      subtitle: req.body.subtitle || '',
      badge: req.body.badge || 'NEW DROP',
      ctaText: req.body.ctaText || 'SHOP NOW',
      ctaLink: req.body.ctaLink || '/shop',
      desktopImage: req.body.desktopImage || req.body.image || 'https://nobero.com/cdn/shop/files/AW_26_Homepage_Banners_Desktop_jpg.jpg',
      mobileImage: req.body.mobileImage || req.body.desktopImage || 'https://nobero.com/cdn/shop/files/AW_26_Homepage_Banners_Desktop_jpg.jpg',
      active: req.body.active !== undefined ? Boolean(req.body.active) : true,
      order: (db.heroBanners || []).length + 1,
      ...req.body
    };
    db.heroBanners = [...(db.heroBanners || []), newBanner];
    writeDB(db);
    res.status(201).json({ success: true, data: newBanner });
  });

  app.put('/api/banners/:id', (req, res) => {
    const db = readDB();
    const idx = (db.heroBanners || []).findIndex(b => String(b.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ success: false, error: 'Banner not found' });
    db.heroBanners[idx] = { ...db.heroBanners[idx], ...req.body };
    writeDB(db);
    res.json({ success: true, data: db.heroBanners[idx] });
  });

  app.delete('/api/banners/:id', (req, res) => {
    const db = readDB();
    db.heroBanners = (db.heroBanners || []).filter(b => String(b.id) !== String(req.params.id));
    writeDB(db);
    res.json({ success: true, message: 'Banner deleted' });
  });

  // ==========================================================================
  // 4. Products CRUD
  // ==========================================================================
  app.get('/api/products', (req, res) => {
    const db = readDB();
    let list = [...(db.products || [])];
    const { category, sort, filter, search } = req.query;

    if (category && category !== 'all' && category !== 'men') {
      const catMap = {
        'textured-shackets': ['hoodies', 'jackets'],
        'shackets': ['hoodies', 'jackets'],
        'jackets-shackets': ['hoodies', 'jackets'],
        'hoodies-jackets': ['hoodies', 'jackets'],
        'jackets-and-hoodies': ['hoodies', 'jackets'],
        'travel-essentials': ['travel', 'joggers', 'pants'],
        'classic-polo': ['polos'],
        'polo-t-shirts': ['polos'],
        'shirts-for-men': ['shirts'],
        'best-selling-co-ord-sets': ['co-ords'],
        'premium-hd-tees': ['t-shirts', 'oversized-tees'],
        'cargo-pants': ['joggers', 'pants']
      };
      const targetCats = catMap[category] || [category];
      list = list.filter(p =>
        targetCats.some(tc => p.category === tc || (p.category && p.category.includes(tc))) ||
        (category.includes('shacket') && ((p.title || '').toLowerCase().includes('shacket') || (p.title || '').toLowerCase().includes('jacket')))
      );
    }
    if (filter === 'bestseller' || filter === 'bestsellers') {
      list = list.filter(p => p.isBestseller);
    }
    if (filter === 'favourite') {
      list = list.filter(p => p.isFavourite);
    }
    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.subtitle || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q)
      );
    }

    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    res.json({ success: true, total: list.length, data: list });
  });

  app.get('/api/products/:idOrSlug', (req, res) => {
    const db = readDB();
    const param = req.params.idOrSlug;
    const product = (db.products || []).find(p => String(p.id) === String(param) || p.slug === param);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    const related = (db.products || []).filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
    res.json({ success: true, data: product, related });
  });

  app.post('/api/products', (req, res) => {
    const db = readDB();
    if (!req.body.title) {
      return res.status(400).json({ success: false, error: 'Product title is required' });
    }
    const price = Number(req.body.price) || 799;
    const mrp = Number(req.body.mrp) || Math.round(price * 2);
    const pctOff = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 50;
    const newProduct = {
      id: `leo-${Date.now()}`,
      slug: (req.body.title || 'leo-product').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      sku: req.body.sku || `LEO-${(req.body.category || 'MEN').slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      price,
      mrp,
      discount: `${pctOff}% OFF`,
      lowestPrice30Days: Math.max(299, price - 50),
      rating: Number(req.body.rating) || 4.8,
      reviewCount: Number(req.body.reviewCount) || 12,
      inventory: req.body.inventory !== undefined ? Number(req.body.inventory) : 50,
      isBestseller: Boolean(req.body.isBestseller),
      isFavourite: Boolean(req.body.isFavourite),
      status: req.body.status || 'Active',
      ...req.body,
      price,
      mrp
    };
    db.products.unshift(newProduct);
    writeDB(db);
    res.status(201).json({ success: true, data: newProduct });
  });

  app.put('/api/products/:id', (req, res) => {
    const db = readDB();
    const idx = (db.products || []).findIndex(p => String(p.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ success: false, error: 'Product not found' });
    const existing = db.products[idx];
    const price = req.body.price !== undefined ? Number(req.body.price) : existing.price;
    const mrp = req.body.mrp !== undefined ? Number(req.body.mrp) : existing.mrp;
    const pctOff = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 40;
    db.products[idx] = {
      ...existing,
      ...req.body,
      price,
      mrp,
      discount: `${pctOff}% OFF`,
      inventory: req.body.inventory !== undefined ? Number(req.body.inventory) : existing.inventory
    };
    writeDB(db);
    res.json({ success: true, data: db.products[idx] });
  });

  app.delete('/api/products/:id', (req, res) => {
    const db = readDB();
    const prevLen = (db.products || []).length;
    db.products = (db.products || []).filter(p => String(p.id) !== String(req.params.id));
    writeDB(db);
    res.json({ success: true, deleted: prevLen !== db.products.length, message: 'Product deleted' });
  });

  // ==========================================================================
  // 5. Coupons CRUD & Validation
  // ==========================================================================
  app.get('/api/coupons', (req, res) => {
    const db = readDB();
    res.json({ success: true, data: db.coupons || [] });
  });

  app.post('/api/coupons', (req, res) => {
    const db = readDB();
    const code = (req.body.code || '').toUpperCase().trim();
    if (!code) {
      return res.status(400).json({ success: false, error: 'Coupon code is required' });
    }
    const newCoupon = {
      code,
      type: req.body.type || 'percentage',
      value: Number(req.body.value) || 10,
      minOrder: Number(req.body.minOrder) || 799,
      maxDiscount: Number(req.body.maxDiscount) || 500,
      description: req.body.description || `${req.body.value}% OFF storewide`,
      active: req.body.active !== undefined ? Boolean(req.body.active) : true,
      usageCount: Number(req.body.usageCount) || 0,
      usageLimit: Number(req.body.usageLimit) || 500,
      endDate: req.body.endDate || '2026-12-31',
      isFlashSale: Boolean(req.body.isFlashSale),
      ...req.body,
      code
    };
    const existingIdx = (db.coupons || []).findIndex(c => c.code.toUpperCase() === code);
    if (existingIdx !== -1) {
      db.coupons[existingIdx] = newCoupon;
    } else {
      db.coupons = [newCoupon, ...(db.coupons || [])];
    }
    writeDB(db);
    res.status(201).json({ success: true, data: newCoupon });
  });

  app.put('/api/coupons/:code', (req, res) => {
    const db = readDB();
    const targetCode = req.params.code.toUpperCase().trim();
    const idx = (db.coupons || []).findIndex(c => c.code.toUpperCase() === targetCode);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Coupon not found' });
    db.coupons[idx] = { ...db.coupons[idx], ...req.body, code: (req.body.code || targetCode).toUpperCase().trim() };
    writeDB(db);
    res.json({ success: true, data: db.coupons[idx] });
  });

  app.delete('/api/coupons/:code', (req, res) => {
    const db = readDB();
    const targetCode = req.params.code.toUpperCase().trim();
    db.coupons = (db.coupons || []).filter(c => c.code.toUpperCase() !== targetCode);
    writeDB(db);
    res.json({ success: true, message: `Coupon ${targetCode} deleted` });
  });

  app.post('/api/coupons/validate', (req, res) => {
    const { code, orderAmount } = req.body;
    const db = readDB();
    const coupon = (db.coupons || []).find(c => c.code.toUpperCase() === (code || '').toUpperCase().trim() && c.active !== false);
    if (!coupon) return res.status(400).json({ success: false, message: 'Invalid or expired coupon code.' });
    if (Number(orderAmount) < Number(coupon.minOrder || 0)) {
      return res.status(400).json({ success: false, message: `Requires min order of ₹${coupon.minOrder}.` });
    }
    let discountAmount = coupon.type === 'flat' ? Number(coupon.value) : Math.round((Number(orderAmount) * Number(coupon.value)) / 100);
    if (coupon.maxDiscount && coupon.type !== 'flat') {
      discountAmount = Math.min(discountAmount, Number(coupon.maxDiscount));
    }
    res.json({ success: true, code: coupon.code, discountAmount, message: `Coupon '${coupon.code}' applied!` });
  });

  // ==========================================================================
  // 6. Reviews CRUD & Moderation
  // ==========================================================================
  app.get('/api/reviews', (req, res) => {
    const db = readDB();
    let list = [...(db.reviews || [])];
    if (req.query.status && req.query.status !== 'all') {
      list = list.filter(r => (r.status || 'approved') === req.query.status);
    }
    if (req.query.productId) {
      list = list.filter(r => String(r.productId) === String(req.query.productId));
    }
    res.json({ success: true, data: list });
  });

  app.post('/api/reviews', (req, res) => {
    const db = readDB();
    const newRev = {
      id: `rev-${Date.now()}`,
      customerName: req.body.customerName || req.body.author || 'Verified Buyer',
      author: req.body.author || req.body.customerName || 'Verified Buyer',
      productTitle: req.body.productTitle || 'LEO Menswear Staple',
      rating: Number(req.body.rating) || 5,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      verified: true,
      status: req.body.status || 'approved',
      ...req.body
    };
    db.reviews = [newRev, ...(db.reviews || [])];
    writeDB(db);
    res.status(201).json({ success: true, data: newRev });
  });

  app.patch('/api/reviews/:id/status', (req, res) => {
    const db = readDB();
    const idx = (db.reviews || []).findIndex(r => String(r.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ success: false, error: 'Review not found' });
    if (req.body.status) db.reviews[idx].status = req.body.status;
    if (req.body.brandReply !== undefined) db.reviews[idx].brandReply = req.body.brandReply;
    writeDB(db);
    res.json({ success: true, data: db.reviews[idx] });
  });

  app.put('/api/reviews/:id', (req, res) => {
    const db = readDB();
    const idx = (db.reviews || []).findIndex(r => String(r.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ success: false, error: 'Review not found' });
    db.reviews[idx] = { ...db.reviews[idx], ...req.body };
    writeDB(db);
    res.json({ success: true, data: db.reviews[idx] });
  });

  app.delete('/api/reviews/:id', (req, res) => {
    const db = readDB();
    db.reviews = (db.reviews || []).filter(r => String(r.id) !== String(req.params.id));
    writeDB(db);
    res.json({ success: true, message: 'Review deleted' });
  });

  // ==========================================================================
  // 7. Blogs & CMS CRUD
  // ==========================================================================
  app.get('/api/blogs', (req, res) => {
    const db = readDB();
    res.json({ success: true, data: db.blogs || [] });
  });

  app.get('/api/blogs/:slug', (req, res) => {
    const db = readDB();
    const blog = (db.blogs || []).find(b => b.slug === req.params.slug || String(b.id) === String(req.params.slug));
    if (!blog) return res.status(404).json({ success: false, error: 'Article not found' });
    res.json({ success: true, data: blog });
  });

  app.post('/api/blogs', (req, res) => {
    const db = readDB();
    if (!req.body.title) {
      return res.status(400).json({ success: false, error: 'Blog title is required' });
    }
    const slug = (req.body.slug || req.body.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newBlog = {
      id: `blog-${Date.now()}`,
      title: req.body.title,
      slug,
      category: req.body.category || 'Style Guide',
      author: req.body.author || 'LEO Editorial',
      readTime: req.body.readTime || '4 min read',
      date: req.body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      coverImage: req.body.coverImage || '/images/leo/mood_street.jpg',
      excerpt: req.body.excerpt || '',
      content: req.body.content || '',
      ...req.body
    };
    db.blogs = [newBlog, ...(db.blogs || [])];
    writeDB(db);
    res.status(201).json({ success: true, data: newBlog });
  });

  app.put('/api/blogs/:slug', (req, res) => {
    const db = readDB();
    const idx = (db.blogs || []).findIndex(b => b.slug === req.params.slug || String(b.id) === String(req.params.slug));
    if (idx === -1) return res.status(404).json({ success: false, error: 'Blog not found' });
    db.blogs[idx] = { ...db.blogs[idx], ...req.body };
    writeDB(db);
    res.json({ success: true, data: db.blogs[idx] });
  });

  app.delete('/api/blogs/:slug', (req, res) => {
    const db = readDB();
    db.blogs = (db.blogs || []).filter(b => b.slug !== req.params.slug && String(b.id) !== String(req.params.slug));
    writeDB(db);
    res.json({ success: true, message: 'Blog article deleted' });
  });

  app.get('/api/cms', (req, res) => {
    const db = readDB();
    res.json({ success: true, data: db.cms || {} });
  });

  app.put('/api/cms', (req, res) => {
    const db = readDB();
    db.cms = { ...(db.cms || {}), ...req.body };
    writeDB(db);
    res.json({ success: true, data: db.cms });
  });

  // ==========================================================================
  // 8. Orders CRUD & Fulfillment Pipeline
  // ==========================================================================
  app.get('/api/orders', (req, res) => {
    const db = readDB();
    const normalized = (db.orders || []).map(normalizeOrder);
    res.json({ success: true, data: normalized });
  });

  app.get('/api/orders/:id', (req, res) => {
    const db = readDB();
    const order = (db.orders || []).find(o => o.id.toUpperCase() === req.params.id.toUpperCase().trim());
    if (!order) return res.status(404).json({ success: false, message: 'Order ID not found.' });
    res.json({ success: true, data: normalizeOrder(order) });
  });

  app.post('/api/orders', (req, res) => {
    const db = readDB();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = req.body.id || `LEO-${randomDigits}`;
    const initialStatus = req.body.status || req.body.orderStatus || 'Placed';
    const newOrder = normalizeOrder({
      id: newOrderId,
      placedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: initialStatus,
      orderStatus: initialStatus,
      paymentMethod: req.body.paymentMethod || 'Prepaid UPI (Razorpay)',
      paymentStatus: req.body.paymentStatus || 'Paid',
      courier: req.body.courier || 'Delhivery Express',
      trackingNumber: req.body.trackingNumber || `DEL-${Date.now().toString().slice(-9)}`,
      tracking: {
        carrier: req.body.courier || 'Delhivery Express',
        trackingNumber: `DEL-${Date.now().toString().slice(-9)}`,
        currentStep: 1,
        history: [
          { status: "Order Placed", location: "LEO Core System", time: "Just now", completed: true },
          { status: "Processing", location: "LEO Center", time: "Pending", completed: false },
          { status: "Shipped", location: "Transit Hub", time: "Pending", completed: false },
          { status: "Out for Delivery", location: "Local Station", time: "Pending", completed: false },
          { status: "Delivered", location: "Destination", time: "Pending", completed: false }
        ]
      },
      ...req.body
    });
    db.orders = [newOrder, ...(db.orders || [])];
    writeDB(db);
    res.status(201).json({ success: true, data: newOrder });
  });

  app.put('/api/orders/:id', (req, res) => {
    const db = readDB();
    const idx = (db.orders || []).findIndex(o => o.id.toUpperCase() === req.params.id.toUpperCase().trim());
    if (idx === -1) return res.status(404).json({ success: false, error: 'Order not found' });
    db.orders[idx] = normalizeOrder({ ...db.orders[idx], ...req.body });
    writeDB(db);
    res.json({ success: true, data: db.orders[idx] });
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const db = readDB();
    const idx = (db.orders || []).findIndex(o => o.id.toUpperCase() === req.params.id.toUpperCase().trim());
    if (idx === -1) return res.status(404).json({ success: false, error: 'Order not found' });
    const newStatus = req.body.status || req.body.orderStatus || 'Processing';
    db.orders[idx].status = newStatus;
    db.orders[idx].orderStatus = newStatus;
    db.orders[idx] = normalizeOrder(db.orders[idx]);
    writeDB(db);
    res.json({ success: true, data: db.orders[idx] });
  });

  app.delete('/api/orders/:id', (req, res) => {
    const db = readDB();
    const targetId = req.params.id.toUpperCase().trim();
    db.orders = (db.orders || []).filter(o => o.id.toUpperCase() !== targetId);
    writeDB(db);
    res.json({ success: true, message: `Order ${targetId} deleted` });
  });

  // ==========================================================================
  // 9. Customers & Returns CRUD
  // ==========================================================================
  app.get('/api/customers', (req, res) => {
    const db = readDB();
    res.json({ success: true, data: db.customers || [] });
  });

  app.post('/api/customers', (req, res) => {
    const db = readDB();
    const newCustomer = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      joinedDate: new Date().toISOString().slice(0, 10),
      lastOrderDate: new Date().toISOString().slice(0, 10),
      tier: req.body.tier || 'New',
      totalSpent: Number(req.body.totalSpent) || 0,
      totalOrders: Number(req.body.totalOrders) || 0,
      wishlistCount: 0,
      cartCount: 0,
      reviewsSubmitted: 0,
      returnsCount: 0,
      ...req.body
    };
    db.customers = [newCustomer, ...(db.customers || [])];
    writeDB(db);
    res.status(201).json({ success: true, data: newCustomer });
  });

  app.delete('/api/customers/:id', (req, res) => {
    const db = readDB();
    db.customers = (db.customers || []).filter(c => String(c.id) !== String(req.params.id));
    writeDB(db);
    res.json({ success: true, message: 'Customer deleted' });
  });

  app.get('/api/returns', (req, res) => {
    const db = readDB();
    res.json({ success: true, data: db.returns || [] });
  });

  app.patch('/api/returns/:id', (req, res) => {
    const db = readDB();
    const idx = (db.returns || []).findIndex(r => String(r.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ success: false, error: 'Return request not found' });
    db.returns[idx] = { ...db.returns[idx], ...req.body };
    writeDB(db);
    res.json({ success: true, data: db.returns[idx] });
  });
}


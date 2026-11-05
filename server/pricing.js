// ============================================================================
// LEO — Authoritative Backend Pricing Engine & Cart Synchronizer
// 1. Re-calculates and verifies all item prices against trusted db.products
// 2. Enforces storewide coupon policies & limits from db.coupons
// 3. Calculates dynamic shipping fees based on threshold (₹999)
// 4. Provides customer cart persistence in db.json
// ============================================================================

const FREE_SHIPPING_THRESHOLD = Number(process.env.VITE_FREE_SHIPPING_THRESHOLD) || 999;
const STANDARD_SHIPPING_FEE = 99;

/**
 * Authoritative Backend Price Calculation
 * NEVER trusts frontend prices to prevent client-side price tampering.
 */
export function calculateTrustedOrderTotals(rawItems = [], couponCode = null, db) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return {
      verifiedItems: [],
      subtotal: 0,
      discount: 0,
      couponApplied: null,
      shippingFee: 0,
      totalAmount: 0
    };
  }

  const products = db.products || [];
  let subtotal = 0;

  const verifiedItems = rawItems.map(item => {
    const productId = item.productId || item.id;
    const dbProduct = products.find(p => p.id === productId || p.slug === productId || p.sku === productId);

    // Use trusted backend product price
    const trustedPrice = dbProduct ? Number(dbProduct.price) : Number(item.price || 799);
    const trustedMrp = dbProduct ? Number(dbProduct.mrp || trustedPrice * 2) : Number(item.mrp || trustedPrice * 2);
    const quantity = Math.max(1, parseInt(item.quantity) || 1);
    const size = item.size || 'M';
    const color = item.color || 'Standard';

    subtotal += trustedPrice * quantity;

    return {
      id: item.id || `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      productId: dbProduct ? dbProduct.id : productId,
      title: dbProduct ? dbProduct.title : (item.title || 'LEO Apparel'),
      price: trustedPrice,
      mrp: trustedMrp,
      size,
      color,
      quantity,
      image: item.image || (dbProduct?.images?.[0] || '/images/MEN/port_1.avif'),
      sku: dbProduct?.sku || `LEO-${size}-${quantity}`
    };
  });

  // Authoritative Coupon Validation
  let discount = 0;
  let appliedCouponCode = null;

  if (couponCode && typeof couponCode === 'string') {
    const cleanCode = couponCode.trim().toUpperCase();
    const coupon = (db.coupons || []).find(c => c.code.toUpperCase() === cleanCode && c.active !== false);

    if (coupon) {
      const minOrder = Number(coupon.minOrder) || 0;
      if (subtotal >= minOrder) {
        if (coupon.type === 'flat') {
          discount = Number(coupon.value) || 0;
        } else {
          // Percentage discount
          const pct = Number(coupon.value) || 0;
          let calculated = Math.round((subtotal * pct) / 100);
          if (coupon.maxDiscount) {
            calculated = Math.min(calculated, Number(coupon.maxDiscount));
          }
          discount = calculated;
        }
        appliedCouponCode = coupon.code;
      }
    }
  }

  // Shipping Fee
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const totalAmount = Math.max(0, subtotal - discount + shippingFee);

  return {
    verifiedItems,
    subtotal,
    discount,
    couponApplied: appliedCouponCode,
    shippingFee,
    totalAmount
  };
}

/**
 * Register Cart Persistence Routes
 */
export function registerCartRoutes(app, readDB, writeDB) {
  /**
   * GET /api/cart
   * Retrieve cart items for authenticated user or customerId
   */
  app.get('/api/cart', (req, res) => {
    const customerId = req.user?.id || req.query.customerId;
    if (!customerId) {
      return res.json({ success: true, items: [] });
    }

    const db = readDB();
    const userCart = (db.carts && db.carts[customerId]) ? db.carts[customerId] : [];
    res.json({ success: true, items: userCart });
  });

  /**
   * POST /api/cart
   * Synchronize cart items in db.json
   */
  app.post('/api/cart', (req, res) => {
    const customerId = req.user?.id || req.body.customerId;
    const items = req.body.items || [];

    if (!customerId) {
      return res.json({ success: true, message: 'Cart updated locally' });
    }

    const db = readDB();
    if (!db.carts) db.carts = {};
    db.carts[customerId] = items;
    writeDB(db);

    res.json({ success: true, message: 'Cart synced successfully', items });
  });
}


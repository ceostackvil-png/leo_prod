import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('leo_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [
        {
          id: 'sf-xl-seed',
          productId: 'leo-sf-1',
          title: 'Stay Fluid Premium T-Shirt',
          slug: 'stay-fluid-premium-t-shirt',
          price: 1399,
          mrp: 1699,
          discount: '₹300 OFF',
          color: 'Electric Violet',
          size: 'XL',
          image: '/images/stay_fluid_violet_tee.jpg',
          quantity: 1,
        },
        {
          id: 'sf-m-seed',
          productId: 'leo-sf-1',
          title: 'Stay Fluid Premium T-Shirt',
          slug: 'stay-fluid-premium-t-shirt',
          price: 1399,
          mrp: 1699,
          discount: '₹300 OFF',
          color: 'Electric Violet',
          size: 'M',
          stockLeft: 6,
          image: '/images/stay_fluid_violet_tee.jpg',
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('leo_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('leo_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('leo_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('leo_coupon');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, colorName, sizeName, quantity = 1) => {
    setItems(prev => {
      const selectedColor = product.colors?.find(c => c.name === colorName) || product.colors?.[0] || {};
      const image = selectedColor.image || product.image || (product.colors?.[0]?.image) || '';
      
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.color === colorName && item.size === sizeName
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          id: `${product.id}-${colorName}-${sizeName}-${Date.now()}`,
          productId: product.id,
          title: product.title,
          slug: product.slug,
          price: product.price,
          mrp: product.mrp,
          discount: product.discount,
          color: colorName,
          size: sizeName,
          image,
          quantity,
        }
      ];
    });

    setIsDrawerOpen(true);
  };

  const addLookToCart = (look, productsList = [], customOptions = {}) => {
    // If look has topProduct and bottomProduct
    if (look.topProduct && look.bottomProduct) {
      const topSize = customOptions.topSize || 'M';
      const bottomSize = customOptions.bottomSize || 'M';

      setItems(prev => {
        const next = [...prev];
        // Add top item
        next.push({
          id: `${look.id}-top-${topSize}-${Date.now()}`,
          productId: look.topProduct.productSlug || `${look.id}-top`,
          title: look.topProduct.name,
          slug: look.topProduct.productSlug || look.slug,
          price: look.topProduct.price || Math.round(look.bundlePrice * 0.55),
          mrp: Math.round((look.originalPrice || 3299) * 0.55),
          discount: look.discount,
          color: look.topProduct.color,
          size: topSize,
          image: look.topProduct.image || look.image,
          quantity: 1,
        });
        // Add bottom item
        next.push({
          id: `${look.id}-bottom-${bottomSize}-${Date.now() + 1}`,
          productId: look.bottomProduct.productSlug || `${look.id}-bottom`,
          title: look.bottomProduct.name,
          slug: look.bottomProduct.productSlug || look.slug,
          price: look.bottomProduct.price || Math.round(look.bundlePrice * 0.45),
          mrp: Math.round((look.originalPrice || 3299) * 0.45),
          discount: look.discount,
          color: look.bottomProduct.color,
          size: bottomSize,
          image: look.bottomProduct.image || look.image,
          quantity: 1,
        });
        return next;
      });
      setIsDrawerOpen(true);
      return;
    }

    // Fallback if look has productIds
    if (look.productIds && Array.isArray(look.productIds)) {
      look.productIds.forEach(pId => {
        const prod = productsList.find(p => p.id === pId);
        if (prod) {
          const defaultColor = prod.colors?.[0]?.name || 'Standard';
          const defaultSize = prod.sizes?.[0]?.name || 'L';
          addToCart(prod, defaultColor, defaultSize, 1);
        }
      });
      setIsDrawerOpen(true);
    }
  };

  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = items.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);
  const totalSavings = totalMrp - subtotal;

  const FREE_SHIPPING_THRESHOLD = 799;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 99;

  // Coupon Discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.value;
    } else if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const potentialB2G10Discount = Math.round(subtotal * 0.10);

  const applyCoupon = async (code) => {
    if (!code) return;
    setIsApplyingCoupon(true);
    setCouponError('');
    setCouponSuccess('');

    const upperCode = code.toUpperCase().trim();

    try {
      const res = await api.validateCoupon(upperCode, subtotal);
      if (res && res.success) {
        setAppliedCoupon({
          code: res.code,
          type: res.data?.type || (upperCode === 'B2G10' || upperCode === 'B3G15' || upperCode === 'FIRST15' || upperCode === 'BUY2SAVE' ? 'percent' : 'flat'),
          value: res.data?.value || (upperCode === 'B2G10' ? 10 : (upperCode === 'B3G15' ? 15 : (upperCode === 'FIRST15' ? 15 : (upperCode === 'BUY2SAVE' ? 20 : 100)))),
          discountAmount: res.discountAmount || (upperCode === 'B2G10' ? Math.round(subtotal * 0.10) : (upperCode === 'B3G15' ? Math.round(subtotal * 0.15) : 100)),
          ...res
        });
        setCouponSuccess(res.message || `Coupon ${upperCode} applied successfully!`);
      } else {
        if (upperCode === 'B2G10') {
          const disc = Math.round(subtotal * 0.10);
          setAppliedCoupon({
            code: 'B2G10',
            type: 'percent',
            value: 10,
            discountAmount: disc,
            description: 'Buy 2 & Get 10% Off'
          });
          setCouponSuccess(`Congrats! 'B2G10' applied! Saved ₹${disc}`);
        } else if (upperCode === 'B3G15') {
          const disc = Math.round(subtotal * 0.15);
          setAppliedCoupon({
            code: 'B3G15',
            type: 'percent',
            value: 15,
            discountAmount: disc,
            description: 'Buy 3 & Get 15% Off'
          });
          setCouponSuccess(`Congrats! 'B3G15' applied! Saved ₹${disc}`);
        } else if (upperCode === 'LEO100') {
          setAppliedCoupon({
            code: 'LEO100',
            type: 'flat',
            value: 100,
            discountAmount: 100,
            description: 'Flat ₹100 Off'
          });
          setCouponSuccess(`Coupon 'LEO100' applied! Saved ₹100`);
        } else {
          setCouponError(res?.message || 'Invalid coupon');
        }
      }
    } catch {
      if (upperCode === 'B2G10') {
        const disc = Math.round(subtotal * 0.10);
        setAppliedCoupon({
          code: 'B2G10',
          type: 'percent',
          value: 10,
          discountAmount: disc,
          description: 'Buy 2 & Get 10% Off'
        });
        setCouponSuccess(`Congrats! 'B2G10' applied! Saved ₹${disc}`);
      } else if (upperCode === 'B3G15') {
        const disc = Math.round(subtotal * 0.15);
        setAppliedCoupon({
          code: 'B3G15',
          type: 'percent',
          value: 15,
          discountAmount: disc,
          description: 'Buy 3 & Get 15% Off'
        });
        setCouponSuccess(`Congrats! 'B3G15' applied! Saved ₹${disc}`);
      } else if (upperCode === 'LEO100') {
        setAppliedCoupon({
          code: 'LEO100',
          type: 'flat',
          value: 100,
          discountAmount: 100,
          description: 'Flat ₹100 Off'
        });
        setCouponSuccess(`Coupon 'LEO100' applied! Saved ₹100`);
      } else {
        setCouponError('Error validating coupon. Please try again.');
      }
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    setCouponSuccess('');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addLookToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        totalItemCount,
        subtotal,
        totalMrp,
        totalSavings,
        shippingFee,
        isFreeShipping,
        FREE_SHIPPING_THRESHOLD,
        progressToFreeShipping,
        amountNeededForFreeShipping,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponError,
        couponSuccess,
        isApplyingCoupon,
        discountAmount,
        finalTotal,
        potentialB2G10Discount,
        // Aliases for compatibility
        cart: items,
        cartSubtotal: subtotal,
        cartDiscount: discountAmount,
        cartTotal: finalTotal,
        cartCount: totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

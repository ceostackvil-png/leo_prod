import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('leo_cart');
      return saved ? JSON.parse(saved) : [];
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

  const addLookToCart = (look, productsList) => {
    // Add all products in the look
    look.productIds.forEach(pId => {
      const prod = productsList.find(p => p.id === pId);
      if (prod) {
        const defaultColor = prod.colors?.[0]?.name || 'Standard';
        const defaultSize = prod.sizes?.[0]?.name || 'L';
        addToCart(prod, defaultColor, defaultSize, 1);
      }
    });
    setIsDrawerOpen(true);
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

  const applyCoupon = async (code) => {
    if (!code) return;
    setIsApplyingCoupon(true);
    setCouponError('');
    setCouponSuccess('');

    try {
      const res = await api.validateCoupon(code, subtotal);
      if (res.success) {
        setAppliedCoupon({
          code: res.code,
          discountAmount: res.discountAmount,
          ...res
        });
        setCouponSuccess(res.message);
      } else {
        setCouponError(res.message || 'Invalid coupon');
      }
    } catch {
      setCouponError('Error validating coupon. Please try again.');
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

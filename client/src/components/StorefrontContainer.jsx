import React from 'react';

/**
 * Global Storefront Container
 * Ensures uniform content width, gutters, and responsive rhythm across all pages,
 * matching Nobero's standard max width and padding.
 */
export const StorefrontContainer = ({ children, className = '', noPadding = false }) => {
  return (
    <div
      className={`w-full max-w-[1440px] mx-auto ${
        noPadding ? '' : 'px-4 sm:px-6 lg:px-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default StorefrontContainer;

import React from 'react';

/**
 * Global Storefront Container
 * Ensures uniform content width, gutters, and responsive rhythm across all pages,
 * matching Nobero's standard max width and padding.
 */
export const StorefrontContainer = ({ children, className = '', noPadding = false }) => {
  return (
    <div
      className={`w-[94%] sm:w-[92%] lg:w-[90%] xl:w-[89%] 2xl:w-[88.5%] mx-auto max-w-[1780px] ${
        noPadding ? '' : 'px-1 sm:px-2'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default StorefrontContainer;

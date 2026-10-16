import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';

export const PRICE_RANGES = [
  { id: 'less_500', label: 'Less than ₹500', min: 0, max: 499 },
  { id: '500_1000', label: '₹500 - ₹1000', min: 500, max: 1000 },
  { id: '1000_1500', label: '₹1000 - ₹1500', min: 1000, max: 1500 },
  { id: '1500_2000', label: '₹1500 - ₹2000', min: 1500, max: 2000 },
  { id: 'more_2000', label: 'More than ₹2000', min: 2000, max: 99999 },
];

export const COLOR_CONFIG = [
  { name: 'Red', hex: '#FF0000', poloCount: 7, keywords: ['red', 'poppy', 'crimson', 'scarlet'] },
  { name: 'Green', hex: '#008000', poloCount: 3, keywords: ['green', 'rainforest', 'highland', 'forest'] },
  { name: 'Yellow', hex: '#FFFF00', poloCount: 23, keywords: ['yellow', 'canary', 'amber', 'mustard', 'ochre'] },
  { name: 'White', hex: '#FFFFFF', poloCount: 1, keywords: ['white', 'bone', 'snow', 'ivory'] },
  { name: 'Black', hex: '#000000', poloCount: 22, keywords: ['black', 'onyx', 'pitch'] },
  { name: 'Blue', hex: '#0055FF', poloCount: 2, keywords: ['blue', 'cobalt', 'ocean', 'verdigris', 'indigo'] },
  { name: 'Brown', hex: '#795548', poloCount: 13, keywords: ['brown', 'chocolate', 'espresso', 'pecan', 'coffee', 'mocha', 'tan', 'latte'] },
  { name: 'Pink', hex: '#FF69B4', poloCount: 4, keywords: ['pink', 'rose', 'petunia', 'salmon', 'peach', 'coral'] },
  { name: 'Grey', hex: '#9E9E9E', poloCount: 2, keywords: ['grey', 'gray', 'ash', 'graphite', 'slate'] },
  { name: 'Maroon', hex: '#800000', poloCount: 1, keywords: ['maroon', 'burgundy', 'merlot', 'plum'] },
  { name: 'Purple', hex: '#800080', poloCount: 8, keywords: ['purple', 'violet', 'lavender', 'mauve'] },
  { name: 'Navy', hex: '#001F3F', poloCount: 1, keywords: ['navy'] },
  { name: 'Olive', hex: '#808000', poloCount: 1, keywords: ['olive', 'sage'] },
  { name: 'Light Green', hex: '#90EE90', poloCount: 2, keywords: ['light green', 'pale green', 'mint'] },
  { name: 'Light Blue', hex: '#ADD8E6', poloCount: 2, keywords: ['light blue', 'powder blue', 'sky blue', 'aqua'] },
];

export const SIZE_CONFIG = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

export const AVAILABILITY_CONFIG = [
  { id: 'in_stock', label: 'In stock', poloCount: 191 },
  { id: 'out_of_stock', label: 'Out of stock', poloCount: 166 }
];

/**
 * Check if a product matches any of the target primary color names
 */
export function productMatchesColors(product, targetColorNames) {
  if (!targetColorNames || targetColorNames.length === 0) return true;
  const prodColors = (product.colors || []).map(c => (typeof c === 'string' ? c : c.name || '').toLowerCase());
  
  return targetColorNames.some(targetName => {
    const cfg = COLOR_CONFIG.find(c => c.name === targetName);
    const keywords = cfg?.keywords || [targetName.toLowerCase()];
    return prodColors.some(pc => keywords.some(k => pc.includes(k)));
  });
}

const ShopFilterSidebar = ({
  selectedPriceId = null,
  onSelectPrice = () => {},
  selectedColors = [],
  onToggleColor = () => {},
  selectedSizes = [],
  onToggleSize = () => {},
  selectedAvailability = null,
  onSelectAvailability = () => {},
  onClearAll = () => {},
  hasActiveFilters = false,
  activeCategorySlug = 'polos',
  products = [],
  className = '',
  onApplyMobile = null, // if mobile drawer, show Apply button
}) => {
  // Accordion open/close state (all open by default as in Nobero)
  const [openSections, setOpenSections] = useState({
    price: true,
    color: true,
    size: true,
    availability: true,
  });

  // Color "Show" / "- Hide" toggle
  const [showAllColors, setShowAllColors] = useState(false);

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const isPolos = activeCategorySlug === 'polos';

  // Compute dynamic counts based on the active category products
  const getColorCount = (colorItem) => {
    if (isPolos) return colorItem.poloCount;
    const count = products.filter(p => productMatchesColors(p, [colorItem.name])).length;
    return count;
  };

  const getSizeCount = (sizeName) => {
    if (isPolos) return 191;
    const count = products.filter(p => 
      (p.sizes || []).some(s => (typeof s === 'string' ? s : s.name) === sizeName)
    ).length;
    return count || products.length;
  };

  const getAvailabilityCount = (item) => {
    if (isPolos) return item.poloCount;
    if (item.id === 'in_stock') {
      const inStockCount = products.filter(p => (p.inventory || 0) > 0).length;
      return inStockCount || products.length;
    }
    const outCount = products.filter(p => (p.inventory || 0) === 0).length;
    return outCount;
  };

  const visibleColors = showAllColors ? COLOR_CONFIG : COLOR_CONFIG.slice(0, 5);

  return (
    <aside className={`w-full select-none ${className}`}>
      {/* Header: Filter & Clear All */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
        <h3 className="font-semibold text-xl text-[#181B2D] tracking-tight">
          Filter
        </h3>
        <button
          type="button"
          onClick={onClearAll}
          disabled={!hasActiveFilters}
          className={`font-semibold text-[15px] transition-colors ${
            hasActiveFilters
              ? 'text-[#92780E] hover:text-[#7A630A] hover:underline cursor-pointer'
              : 'text-[#92780E]/50 cursor-default pointer-events-none'
          }`}
        >
          Clear All
        </button>
      </div>

      <div className="divide-y divide-[#E5E7EB]">
        {/* ===================== 1. PRICE SECTION ===================== */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between py-3.5 cursor-pointer text-left focus:outline-none group"
            aria-expanded={openSections.price}
          >
            <span className="text-[16px] text-[#181B2D] font-normal group-hover:text-black">
              Price
            </span>
            {openSections.price ? (
              <ChevronUp className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            )}
          </button>

          {openSections.price && (
            <div className="space-y-3 pb-4 pt-1">
              {PRICE_RANGES.map((range) => {
                const isSelected = selectedPriceId === range.id;
                return (
                  <div
                    key={range.id}
                    onClick={() => onSelectPrice(isSelected ? null : range.id)}
                    className="flex items-center gap-3 cursor-pointer group py-0.5"
                  >
                    {/* Exact Radio Circle */}
                    <div
                      className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'border-[#181B2D]'
                          : 'border-[#CCCCCC] bg-white group-hover:border-[#888888]'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#181B2D]" />
                      )}
                    </div>
                    <span className="text-[14px] text-[#484B5A] font-normal group-hover:text-[#181B2D]">
                      {range.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ===================== 2. COLOR SECTION ===================== */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection('color')}
            className="w-full flex items-center justify-between py-3.5 cursor-pointer text-left focus:outline-none group"
            aria-expanded={openSections.color}
          >
            <span className="text-[16px] text-[#181B2D] font-normal group-hover:text-black">
              Color
            </span>
            {openSections.color ? (
              <ChevronUp className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            )}
          </button>

          {openSections.color && (
            <div className="space-y-3 pb-3 pt-1">
              {visibleColors.map((color) => {
                const isSelected = selectedColors.includes(color.name);
                const count = getColorCount(color);
                return (
                  <div
                    key={color.name}
                    onClick={() => onToggleColor(color.name)}
                    className="flex items-center justify-between cursor-pointer group py-0.5"
                  >
                    <div className="flex items-center gap-3">
                      {/* Checkbox */}
                      <div
                        className={`w-[18px] h-[18px] rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#181B2D] border-[#181B2D] text-white'
                            : 'bg-white border-[#CCCCCC] group-hover:border-[#888888]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Solid Circular Color Swatch with border */}
                      <span
                        className={`w-[22px] h-[22px] rounded-full shrink-0 shadow-xs ${
                          color.hex.toLowerCase() === '#ffffff'
                            ? 'border border-black'
                            : 'border border-black/90'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />

                      {/* Color Name */}
                      <span className="text-[14px] text-[#181B2D] font-normal group-hover:text-black">
                        {color.name}
                      </span>
                    </div>

                    {/* Count */}
                    <span className="text-[13px] text-[#9698A0] font-normal">
                      ({count})
                    </span>
                  </div>
                );
              })}

              {/* Show / - Hide Link */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAllColors(prev => !prev)}
                  className="text-[14px] font-semibold text-[#92780E] underline hover:text-[#7A630A] cursor-pointer focus:outline-none"
                >
                  {showAllColors ? '- Hide' : 'Show'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===================== 3. SIZE SECTION ===================== */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between py-3.5 cursor-pointer text-left focus:outline-none group"
            aria-expanded={openSections.size}
          >
            <span className="text-[16px] text-[#181B2D] font-normal group-hover:text-black">
              Size
            </span>
            {openSections.size ? (
              <ChevronUp className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            )}
          </button>

          {openSections.size && (
            <div className="space-y-3 pb-4 pt-1">
              {SIZE_CONFIG.map((size) => {
                const isSelected = selectedSizes.includes(size);
                const count = getSizeCount(size);
                return (
                  <div
                    key={size}
                    onClick={() => onToggleSize(size)}
                    className="flex items-center justify-between cursor-pointer group py-0.5"
                  >
                    <div className="flex items-center gap-3">
                      {/* Checkbox */}
                      <div
                        className={`w-[18px] h-[18px] rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#181B2D] border-[#181B2D] text-white'
                            : 'bg-white border-[#CCCCCC] group-hover:border-[#888888]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Size Label */}
                      <span className="text-[14px] text-[#181B2D] font-normal group-hover:text-black">
                        {size}
                      </span>
                    </div>

                    {/* Count */}
                    <span className="text-[13px] text-[#9698A0] font-normal">
                      ({count})
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ===================== 4. AVAILABILITY SECTION ===================== */}
        <div className="py-1">
          <button
            type="button"
            onClick={() => toggleSection('availability')}
            className="w-full flex items-center justify-between py-3.5 cursor-pointer text-left focus:outline-none group"
            aria-expanded={openSections.availability}
          >
            <span className="text-[16px] text-[#181B2D] font-normal group-hover:text-black">
              Availability
            </span>
            {openSections.availability ? (
              <ChevronUp className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#181B2D] stroke-[2.5]" />
            )}
          </button>

          {openSections.availability && (
            <div className="space-y-3 pb-4 pt-1">
              {AVAILABILITY_CONFIG.map((item) => {
                const isSelected = selectedAvailability === item.id;
                const count = getAvailabilityCount(item);
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectAvailability(isSelected ? null : item.id)}
                    className="flex items-center justify-between cursor-pointer group py-0.5"
                  >
                    <div className="flex items-center gap-3">
                      {/* Radio Circle */}
                      <div
                        className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-[#181B2D]'
                            : 'border-[#CCCCCC] bg-white group-hover:border-[#888888]'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#181B2D]" />
                        )}
                      </div>

                      {/* Label */}
                      <span className="text-[14px] text-[#484B5A] font-normal group-hover:text-[#181B2D]">
                        {item.label}
                      </span>
                    </div>

                    {/* Count */}
                    <span className="text-[13px] text-[#9698A0] font-normal">
                      ({count})
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Bottom Apply button */}
      {onApplyMobile && (
        <div className="pt-6 pb-2">
          <button
            type="button"
            onClick={onApplyMobile}
            className="w-full bg-[#181B2D] hover:bg-black text-white text-sm font-semibold py-3 rounded-md shadow-sm transition-colors uppercase tracking-wider"
          >
            Apply Filters
          </button>
        </div>
      )}
    </aside>
  );
};

export default ShopFilterSidebar;

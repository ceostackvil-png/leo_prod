import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ShopTheLook = ({ looks = [], products = [] }) => {
  const { addLookToCart } = useCart();
  const [addedId, setAddedId] = useState(null);

  if (!looks.length) return null;

  const handleAddLook = (look) => {
    addLookToCart(look, products);
    setAddedId(look.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-8 lg:py-12 bg-[#F7F8FA] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Exact Nobero) */}
        <div className="text-center mb-6 lg:mb-8">
          <h5 className="text-[#666875] text-xs font-semibold uppercase tracking-wider mb-0.5">
            Latest
          </h5>
          <h2 className="text-[#212121] text-xl lg:text-2xl font-bold font-display">
            Shop the Full Look
          </h2>
        </div>

        {/* Looks Horizontal Scroll / Grid with Signature Sharp Edges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {looks.slice(0, 4).map((look) => (
            <div
              key={look.id}
              className="bg-white rounded-none overflow-hidden border border-gray-200 shadow-xs flex flex-col justify-between group look-card sharp-card"
            >
              {/* Image Container with 4:5 Aspect Ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-none">
                <img
                  src={look.image}
                  alt={look.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 rounded-none"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#D9232D] text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-xs">
                  {look.discount}
                </span>
              </div>

              {/* Look Info */}
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-[#212121] group-hover:text-[#282C3F] transition-colors line-clamp-1">
                    {look.title}
                  </h3>
                  <div className="mt-1 space-y-0.5">
                    {look.itemsIncluded?.map((item, i) => (
                      <p key={i} className="text-[11px] text-[#666875] truncate">
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Price & Add to Bag */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm sm:text-base font-bold text-[#212121]">
                        ₹{look.bundlePrice}
                      </span>
                      {look.originalPrice && (
                        <span className="text-xs text-[#666875] line-through">
                          ₹{look.originalPrice}
                        </span>
                      )}
                    </div>
                    {look.lowestPrice && (
                      <span className="text-[10px] text-[#00B852] font-semibold block">
                        Lowest price in 30 days: ₹{look.lowestPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddLook(look)}
                    className="bg-[#282C3F] hover:bg-[#1a224a] text-white text-[11px] font-bold px-3 py-2 rounded-none transition-colors flex items-center gap-1 shrink-0 uppercase tracking-wider"
                  >
                    {addedId === look.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" /> Add Look
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopTheLook;

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';

const MEN_EXACT_GRID = [
  { name: 'Polos', image: '/images/MEN/7p_69c2c6cf-78a7-441f-b34a-ab147745806d.avif', slug: 'polos' },
  { name: 'Premium HD T-Shirt', image: '/images/MEN/port_1.avif', slug: 't-shirts' },
  { name: 'T-Shirt', image: '/images/MEN/Website_Shop_men_220_x_304_11.avif', slug: 't-shirts' },
  { name: 'Hoodies & Jackets', image: '/images/MEN/Website_Shop_men_220_x_304_9.avif', slug: 'hoodies' },
  { name: 'Full Sleeve T Shirt', image: '/images/MEN/Full_sleeve_polo.avif', slug: 't-shirts' },
  { name: 'Jackets', image: '/images/MEN/25p.avif', slug: 'jackets' },
  { name: 'Joggers', image: '/images/MEN/6_29719fa5-f748-482e-8039-fda30c64d1db.webp', slug: 'joggers' },
  { name: 'Pants', image: '/images/MEN/Cargo_Pants_Icon_Home_Page_copy.avif', slug: 'joggers' },
  { name: 'Co-Ord Sets', image: '/images/MEN/9.avif', slug: 'co-ords' },
  { name: 'Curated Looks', image: '/images/MEN/Looks_jpg.avif', slug: 'men' },
  { name: 'Shorts', image: '/images/MEN/8.webp', slug: 'shorts' },
  { name: 'Activewear', image: '/images/MEN/Men_active_1199e7ea-e988-4c37-99fe-60fbe6f37c99.avif', slug: 'joggers' }
];

const TRAVEL_EXACT_GRID = [
  { name: 'Travel Hoodie', image: '/images/MEN/Website_Shop_men_220_x_304_9.avif', slug: 'travel' },
  { name: 'Travel Jogger', image: '/images/MEN/6_29719fa5-f748-482e-8039-fda30c64d1db.webp', slug: 'travel' },
  { name: 'Travel Polo', image: '/images/MEN/7p_69c2c6cf-78a7-441f-b34a-ab147745806d.avif', slug: 'travel' },
  { name: 'Travel Chinos', image: '/images/MEN/Cargo_Pants_Icon_Home_Page_copy.avif', slug: 'travel' },
  { name: 'Travel Shorts', image: '/images/MEN/8.webp', slug: 'travel' },
  { name: 'Travel Cargo', image: '/images/leo_product_cargo_jogger_1791469213908.jpg', slug: 'travel' }
];

const COORDS_EXACT_GRID = [
  { name: 'Shorts Co-Ord Sets', image: '/images/MEN/9.avif', slug: 'co-ords' },
  { name: 'Pants Co-Ord Sets', image: '/images/product-coord-pants.jpg', slug: 'co-ords' },
  { name: 'Waffle Knit Sets', image: '/images/leo_product_waffle_coord_1791469273954.jpg', slug: 'co-ords' },
  { name: 'Curated Looks', image: '/images/col_curated_look.jpg', slug: 'co-ords' },
  { name: 'Terry Resort Sets', image: 'https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg', slug: 'co-ords' },
  { name: 'Travel Airport Sets', image: '/images/mood-relax.jpg', slug: 'co-ords' }
];

const TEES_EXACT_GRID = [
  { name: 'Solid Heavyweight (240 GSM)', image: '/images/MEN/port_1.avif', slug: 'oversized-tees' },
  { name: 'Acid Wash & Mineral Vintage', image: '/images/MEN/Website_Shop_men_220_x_304_11.avif', slug: 'oversized-tees' },
  { name: 'Back Print Graphic Tees', image: '/images/leo_product_oversized_tee_back_1791469191387.jpg', slug: 'oversized-tees' },
  { name: 'Classic Crew Neck', image: '/images/leo_product_oversized_tee_1791469164099.jpg', slug: 't-shirts' },
  { name: 'Full Sleeve Tees', image: '/images/MEN/Full_sleeve_polo.avif', slug: 't-shirts' },
  { name: 'Oversized Drop Shoulder', image: 'https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg', slug: 'oversized-tees' }
];

const ITEM_NAME_IMAGE_FALLBACK = {
  'Travel Hoodie': '/images/MEN/Website_Shop_men_220_x_304_9.avif',
  'Travel Jogger': '/images/MEN/6_29719fa5-f748-482e-8039-fda30c64d1db.webp',
  'Travel Polo': '/images/MEN/7p_69c2c6cf-78a7-441f-b34a-ab147745806d.avif',
  'Travel Chinos': '/images/MEN/Cargo_Pants_Icon_Home_Page_copy.avif',
  'Travel Shorts': '/images/MEN/8.webp',
  'Travel Cargo': '/images/leo_product_cargo_jogger_1791469213908.jpg',
  'Shorts Co-Ord Sets': '/images/MEN/9.avif',
  'Pants Co-Ord Sets': '/images/product-coord-pants.jpg',
  'Waffle Knit Sets': '/images/leo_product_waffle_coord_1791469273954.jpg',
  'Curated Looks': '/images/col_curated_look.jpg',
  'Solid Heavyweight (240 GSM)': '/images/MEN/port_1.avif',
  'Acid Wash & Mineral Vintage': '/images/MEN/Website_Shop_men_220_x_304_11.avif',
  'Back Print Graphic Tees': '/images/leo_product_oversized_tee_back_1791469191387.jpg',
};

const QUICK_LINKS = [
  { title: 'See the Latest', subtitle: 'Explore fash-leisure must-haves', link: '/new-arrivals' },
  { title: 'Shop Top Selling Styles', subtitle: 'The current fan favorites right now', link: '/shop?filter=bestsellers' },
  { title: 'Sale', subtitle: 'Up to 60% off', link: '/sale' },
  { title: 'Clearance sale', subtitle: '', link: '/sale' }
];

const MegaMenu = ({ category, onClose }) => {
  if (!category || !category.groups) return null;

  const catId = (category.id || category.slug || '').toLowerCase();

  // Select appropriate curated grid based on category
  let gridItems = [];
  if (catId === 'men') {
    gridItems = MEN_EXACT_GRID;
  } else if (catId === 'travel') {
    gridItems = TRAVEL_EXACT_GRID;
  } else if (catId === 'co-ords' || catId === 'coords') {
    gridItems = COORDS_EXACT_GRID;
  } else if (catId === 'oversized-tees' || catId === 'tees' || catId === 't-shirts') {
    gridItems = TEES_EXACT_GRID;
  } else {
    // Dynamic mapping from category.groups with item-specific image fallback
    gridItems = category.groups.flatMap(g => g.items).slice(0, 12).map((item, index) => {
      const fallbackImage = ITEM_NAME_IMAGE_FALLBACK[item.name] || MEN_EXACT_GRID[index % MEN_EXACT_GRID.length].image;
      return {
        ...item,
        image: item.image || fallbackImage
      };
    });
  }

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-[#E5E7EB] shadow-[0_12px_28px_rgba(0,0,0,0.08)] py-5 px-6 lg:px-10 z-50 animate-slide-down"
    >
      <div className="max-w-[1360px] mx-auto flex items-start justify-between gap-8 lg:gap-14">
        
        {/* Left Side: Minimal Visual Category Grid (6 columns) */}
        <div className="grid grid-cols-6 gap-x-3.5 sm:gap-x-4 gap-y-3 sm:gap-y-3.5 shrink-0">
          {gridItems.map((item, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${item.slug}`}
              onClick={onClose}
              className="group flex flex-col items-center text-center select-none"
            >
              {/* Minimal Card Image Container (Exact Nobero 3:4 aspect ratio) */}
              <div className="w-[84px] sm:w-[92px] md:w-[96px] aspect-[3/4] rounded-[10px] overflow-hidden bg-[#F7F8FA] relative transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="eager"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Circular Plus Badge in bottom-right */}
                <div className="absolute bottom-1.5 right-1.5 w-[18px] h-[18px] bg-black/25 backdrop-blur-[1px] rounded-full flex items-center justify-center border border-white/70 shadow-xs transition-colors group-hover:bg-white group-hover:border-white">
                  <Plus className="w-2.5 h-2.5 text-white stroke-[2.5] group-hover:text-black transition-colors" />
                </div>
              </div>

              {/* Minimal Title Label */}
              <span className="text-[11px] sm:text-[11.5px] font-bold text-[#111827] mt-1.5 group-hover:text-[#526BCA] transition-colors leading-tight text-center line-clamp-2 max-w-[96px] px-0.5">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Side: Quick Links List */}
        <div className="w-[260px] lg:w-[280px] shrink-0 flex flex-col pt-1">
          {QUICK_LINKS.map((linkItem, idx) => (
            <Link
              key={idx}
              to={linkItem.link}
              onClick={onClose}
              className={`group flex items-center justify-between py-3.5 ${
                idx !== 0 ? 'border-t border-[#E5E7EB]' : ''
              } ${
                idx === QUICK_LINKS.length - 1 ? 'border-b border-[#E5E7EB]' : ''
              } hover:bg-gray-50/60 px-1 transition-colors`}
            >
              <div>
                <h4 className="text-[13px] font-bold text-[#111827] group-hover:text-[#526BCA] transition-colors leading-snug">
                  {linkItem.title}
                </h4>
                {linkItem.subtitle && (
                  <p className="text-[11px] text-[#6B7280] mt-0.5 leading-tight">
                    {linkItem.subtitle}
                  </p>
                )}
              </div>
              <ChevronRight
                className="w-4 h-4 text-[#111827] group-hover:text-[#526BCA] group-hover:translate-x-0.5 transition-all shrink-0 ml-3"
                strokeWidth={1.8}
              />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MegaMenu;

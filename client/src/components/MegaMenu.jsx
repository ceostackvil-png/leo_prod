import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';

const getImageForCategory = (name, categoryId) => {
  const n = name.toLowerCase();
  
  // Women's category images
  if (categoryId === 'women') {
    if (n.includes('hoodie') || n.includes('sweatshirt')) return '/images/women/women_hoodie.jpg';
    if (n.includes('jogger') || n.includes('activewear') || n.includes('pant') || n.includes('cargo') || n.includes('short') || n.includes('coord')) return '/images/women/women_joggers.jpg';
    return '/images/women/women_tee.jpg';
  }

  // Men's category images
  if (n.includes('solid heavyweight')) return '/images/MEN/port_1.avif';
  if (n.includes('acid wash')) return '/images/nobero/col_oversized_exact.jpg';
  if (n.includes('graphic tees') || n.includes('back print')) return '/images/MEN/Website_Shop_men_220_x_304_11.avif';
  if (n.includes('polo')) return '/images/nobero/col_polo_exact.png';
  if (n.includes('oversized') || n.includes('hd')) return '/images/nobero/col_oversized_exact.jpg';
  if (n.includes('full sleeve')) return '/images/nobero/col_fullsleeve_exact.jpg';
  if (n.includes('hoodie') || n.includes('jacket') || n.includes('sweatshirt')) return '/images/nobero/hero_banner_shacket_des.jpg';
  if (n.includes('jogger') || n.includes('activewear')) return '/images/nobero/col_joggers_exact.jpg';
  if (n.includes('pant') || n.includes('cargo')) return '/images/nobero/col_cargos_exact.jpg';
  if (n.includes('coord') || n.includes('co-ord')) return '/images/nobero/col_coords_exact.jpg';
  if (n.includes('short')) return '/images/nobero/col_shorts_exact.png';
  if (n.includes('t-shirt') || n.includes('tees')) return '/images/nobero/col_oversized_exact.jpg';
  if (n.includes('waffle knit')) return '/images/9.avif';
  if (n.includes('curated looks')) return '/images/Looks_jpg.avif';
  return '/images/nobero/col_cargos_exact.jpg';
};

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

const MegaMenu = ({ category, onClose }) => {
  if (!category || !category.groups) return null;

  // Flatten all items from groups to create the visual grid for non-men categories
  const allItems = category.groups.flatMap(g => g.items);

  if (category.id === 'men') {
    return (
      <div
        onMouseLeave={onClose}
        className="absolute top-full left-0 w-full bg-white border-b border-[#E5E7EB] shadow-dropdown py-8 px-8 z-50 animate-slide-down"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-6 gap-x-6 gap-y-10">
            {MEN_EXACT_GRID.map((item, idx) => (
              <Link
                key={idx}
                to={`/shop?category=${item.slug}`}
                onClick={onClose}
                className="group flex flex-col items-center text-center select-none"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#F7F8FA] relative transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-white/50 backdrop-blur-[2px] rounded-full flex items-center justify-center border border-white/80 shadow-sm transition-colors group-hover:bg-white">
                    <Plus className="w-3 h-3 text-white mix-blend-difference" strokeWidth={2} />
                  </div>
                </div>
                <span className="text-[13px] font-bold text-[#212121] mt-3 group-hover:text-[#526BCA] transition-colors leading-tight line-clamp-2 px-1">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-[#E5E7EB] shadow-dropdown py-8 px-8 z-50 animate-slide-down"
    >
      <div className="max-w-[1440px] mx-auto flex gap-12 items-start">
        
        {/* Left Side: Visual Category Grid (75% width) */}
        <div className="flex-1 grid grid-cols-6 gap-x-4 gap-y-8">
          {allItems.slice(0, 12).map((item, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${item.slug}`}
              onClick={onClose}
              className="group flex flex-col items-center text-center select-none"
            >
              {/* Image Container with precise styling */}
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#F7F8FA] relative transition-transform duration-300">
                <img
                  src={getImageForCategory(item.name, category.id)}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
                  <Plus className="w-3 h-3 text-[#282C3F]" strokeWidth={2.5} />
                </div>
              </div>
              <span className="text-[13px] font-bold text-[#212121] mt-3 group-hover:text-[#526BCA] transition-colors leading-tight line-clamp-2 px-1">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Side: Quick Links List (25% width) */}
        <div className="w-[300px] shrink-0 flex flex-col border-l border-gray-100 pl-8">
          {[
            { title: 'See the Latest', subtitle: 'Explore fash-leisure must-haves', link: '/new-arrivals' },
            { title: 'Shop Top Selling Styles', subtitle: 'The current fan favorites right now', link: '/shop?filter=bestsellers' },
            { title: 'Sale', subtitle: 'Up to 60% off', link: '/sale' },
            { title: 'Clearance sale', subtitle: '', link: '/sale' }
          ].map((linkItem, idx) => (
            <Link
              key={idx}
              to={linkItem.link}
              onClick={onClose}
              className={`group flex items-center justify-between py-5 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
            >
              <div>
                <h4 className="text-[14px] font-bold text-[#212121] group-hover:text-[#526BCA] transition-colors">
                  {linkItem.title}
                </h4>
                {linkItem.subtitle && (
                  <p className="text-[12px] text-[#7E818C] mt-0.5">
                    {linkItem.subtitle}
                  </p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-[#212121] group-hover:text-[#526BCA] transition-colors" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MegaMenu;

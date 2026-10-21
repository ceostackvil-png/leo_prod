import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const MOODS = [
  {
    id: "hoodies",
    tag: "WINTER",
    title: "HOODIES & JACKETS",
    image: "https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg",
    link: "/hoodies"
  },
  {
    id: "sweatshirts",
    tag: "TRENDY",
    title: "SWEATSHIRTS",
    image: "https://nobero.com/cdn/shop/files/AW_26_Homepage_Banners_Desktop_jpg.jpg",
    link: "/hoodies"
  },
  {
    id: "basics",
    tag: "EVERYDAY",
    title: "BASICS",
    image: "/images/nobero/col_oversized_exact.jpg",
    link: "/oversized-tees"
  },
  {
    id: "joggers",
    tag: "BEST SELLING",
    title: "JOGGERS",
    image: "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg",
    link: "/joggers"
  }
];

const MatchTheMood = () => {
  return (
    <section className="py-8 sm:py-14 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#666875] mb-1">
            EVERYDAY BESTSELLERS
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#212121]">
            Curated Categories
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-medium">
            Explore seasonal heavyweight fits engineered for everyday movement.
          </p>
        </div>

        {/* 4 Mood Cards Grid - Signature Nobero Sharp 90-Degree Edges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {MOODS.map((mood) => (
            <Link
              key={mood.id}
              to={mood.link}
              className="group relative rounded-none overflow-hidden aspect-[3/4] bg-gray-100 border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 block select-none editorial-card sharp-card"
            >
              <img
                src={mood.image}
                alt={mood.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out rounded-none"
              />

              {/* Gradient Overlay & Clean Editorial Typography (Exact Nobero) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/90 mb-0.5">
                  {mood.tag}
                </span>
                <h3 className="text-sm sm:text-lg font-black uppercase text-white leading-tight tracking-tight">
                  {mood.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default MatchTheMood;

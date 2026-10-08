import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StorefrontContainer from './StorefrontContainer';

const MOODS = [
  {
    id: 'travel',
    title: 'Travel Mode',
    subtitle: 'Wrinkle-Free Flex & Comfort',
    image: '/images/nobero/mood_travel.jpg',
    tag: 'TRANSIT ESSENTIALS',
    link: '/travel'
  },
  {
    id: 'street',
    title: 'Street Edge',
    subtitle: '240 GSM Heavy Drop Silhouettes',
    image: '/images/nobero/mood_street.jpg',
    tag: 'OVERSIZED STREETWEAR',
    link: '/oversized-tees'
  },
  {
    id: 'relax',
    title: 'Weekend Chill',
    subtitle: 'Textured Waffle Matching Sets',
    image: '/images/nobero/mood_weekend.jpg',
    tag: 'EASY LIVING',
    link: '/co-ords'
  },
  {
    id: 'cozy',
    title: 'Cozy Layers',
    subtitle: '380 GSM Heavy Fleece Warmth',
    image: '/images/nobero/mood_cozy.jpg',
    tag: 'FRENCH TERRY',
    link: '/hoodies'
  }
];

const MatchTheMood = () => {
  return (
    <section className="py-8 sm:py-14 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#242F66] mb-1">
            CURATED OUTFIT EDITS
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-[#1A1E31]">
            Match The Mood
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-medium">
            Find the perfect heavyweight fit engineered for your destination.
          </p>
        </div>

        {/* 4 Mood Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {MOODS.map((mood) => (
            <Link
              key={mood.id}
              to={mood.link}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-gray-100 shadow-sm hover:shadow-md transition-all duration-300 block"
            >
              <img
                src={mood.image}
                alt={mood.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-amber-300 mb-1">
                  {mood.tag}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight group-hover:text-amber-200 transition-colors">
                  {mood.title}
                </h3>
                <p className="text-[11px] text-gray-300 mt-0.5 line-clamp-1">
                  {mood.subtitle}
                </p>

                <div className="mt-2.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                  Shop Edit <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default MatchTheMood;

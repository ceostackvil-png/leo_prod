import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const MOODS = [
  {
    id: "hoodies-jackets",
    title: "HOODIES & JACKETS",
    tag: "WINTER",
    image: "/images/mood/mood_hoodies_jackets.png",
    link: "/hoodies"
  },
  {
    id: "sweatshirts",
    title: "SWEATSHIRTS",
    tag: "TRENDY",
    image: "/images/mood/mood_sweatshirts.png",
    link: "/hoodies"
  },
  {
    id: "basics",
    title: "BASICS",
    tag: "EVERYDAY",
    image: "/images/mood/mood_basics.png",
    link: "/oversized-tees"
  },
  {
    id: "joggers",
    title: "JOGGERS",
    tag: "BEST SELLING",
    image: "/images/mood/mood_joggers.png",
    link: "/joggers"
  }
];

const MatchTheMood = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        {/* Section Heading matching Nobero exact styling: Match The Mood / Everyday Bestsellers centered */}
        <div className="text-center mb-5 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#1A1E31] font-sans tracking-tight">
            Match The Mood
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-normal">
            Everyday Bestsellers
          </p>
        </div>

        {/* 4 Mood Cards Grid with exact 360:479 aspect ratio and sharp edges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
          {MOODS.map((mood) => (
            <Link
              key={mood.id}
              to={mood.link}
              className="group relative rounded-none overflow-hidden aspect-[360/479] bg-gray-100 border border-gray-200/90 shadow-xs hover:shadow-md transition-all duration-300 block select-none sharp-card"
            >
              <img
                src={mood.image}
                alt={`${mood.tag} ${mood.title}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out rounded-none"
              />
            </Link>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default MatchTheMood;

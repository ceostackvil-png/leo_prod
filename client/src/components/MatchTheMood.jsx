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

        {/* Mobile: Horizontal scrollable side-by-side cards (Exact matching Nobero mobile version) */}
        <div className="lg:hidden w-full overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2">
          <div className="flex gap-3 min-w-max pr-3">
            {MOODS.map((mood) => (
              <Link
                key={mood.id}
                to={mood.link}
                className="w-[62vw] max-w-[270px] min-w-[210px] shrink-0 snap-start relative rounded-none overflow-hidden aspect-[360/479] bg-gray-100 border border-gray-200/90 shadow-xs block select-none sharp-card active:scale-[0.99] transition-transform"
              >
                <img
                  src={mood.image}
                  alt={`${mood.tag} ${mood.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-none"
                  onError={(e) => {
                    if (mood.id === "hoodies-jackets") {
                      e.currentTarget.src = "https://nobero.com/cdn/shop/files/1_9602c197-e8ad-4b1b-be05-93ea3d7f14be.jpg?v=1790759136";
                    } else if (mood.id === "sweatshirts") {
                      e.currentTarget.src = "https://nobero.com/cdn/shop/files/2_fc9b593f-811f-46f6-aafa-d698ebaec746.jpg?v=1790759136";
                    } else if (mood.id === "basics") {
                      e.currentTarget.src = "https://nobero.com/cdn/shop/files/3_f50776a1-69f4-4772-9ca6-be73d07449ba.jpg?v=1790759136";
                    } else if (mood.id === "joggers") {
                      e.currentTarget.src = "https://nobero.com/cdn/shop/files/4_b42a622d-6555-416c-9463-b257d777090e.jpg?v=1790759135";
                    }
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Laptop / Desktop: Exact unchanged 4-column grid (100% untouched design) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
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
                onError={(e) => {
                  if (mood.id === "hoodies-jackets") {
                    e.currentTarget.src = "https://nobero.com/cdn/shop/files/1_9602c197-e8ad-4b1b-be05-93ea3d7f14be.jpg?v=1790759136";
                  } else if (mood.id === "sweatshirts") {
                    e.currentTarget.src = "https://nobero.com/cdn/shop/files/2_fc9b593f-811f-46f6-aafa-d698ebaec746.jpg?v=1790759136";
                  } else if (mood.id === "basics") {
                    e.currentTarget.src = "https://nobero.com/cdn/shop/files/3_f50776a1-69f4-4772-9ca6-be73d07449ba.jpg?v=1790759136";
                  } else if (mood.id === "joggers") {
                    e.currentTarget.src = "https://nobero.com/cdn/shop/files/4_b42a622d-6555-416c-9463-b257d777090e.jpg?v=1790759135";
                  }
                }}
              />
            </Link>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default MatchTheMood;

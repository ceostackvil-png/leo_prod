import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const AppPromotion = () => {
  return (
    <section className="py-6 sm:py-12 bg-white">
      <StorefrontContainer>
        <Link
          to="/travel"
          className="block rounded-xl sm:rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group"
        >
          <img
            src="/images/leo_campaign_banner.jpg"
            alt="LEO - Uncompromised Comfort Travel Wear"
            loading="lazy"
            className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-500 rounded-xl sm:rounded-2xl"
          />
        </Link>
      </StorefrontContainer>
    </section>
  );
};

export default AppPromotion;

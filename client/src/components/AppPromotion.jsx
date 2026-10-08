import React from 'react';
import { Link } from 'react-router-dom';

const AppPromotion = () => {
  return (
    <section className="py-8 sm:py-12 bg-[#F7F8FA] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/travel" className="block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.01]">
          <img
            src="/images/leo_campaign_banner.jpg"
            alt="LEO - The Luxury of Uncompromising Comfort"
            loading="lazy"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </Link>
      </div>
    </section>
  );
};

export default AppPromotion;

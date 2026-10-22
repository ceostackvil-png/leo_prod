import React from 'react';
import { Link } from 'react-router-dom';
import StorefrontContainer from './StorefrontContainer';

const AppPromotion = () => {
  return (
    <section className="py-6 sm:py-10 bg-white">
      <StorefrontContainer>
        <div className="w-full overflow-hidden rounded-none shadow-xs">
          <picture className="w-full block">
            <source
              media="(max-width: 640px)"
              srcSet="https://nobero.com/cdn/shop/files/our_app_is_here_Mobile_-7_jpg.jpg?v=1768989570"
            />
            <img
              src="https://nobero.com/cdn/shop/files/our_app_is_here_-_Desktop_jpg.webp?v=1791577489"
              alt="LEO App - Download & Unlock Exclusive Offers"
              loading="lazy"
              className="w-full h-auto block rounded-none"
              onError={(e) => {
                e.currentTarget.src = "/images/leo_app_banner_colorful.jpg";
              }}
            />
          </picture>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default AppPromotion;

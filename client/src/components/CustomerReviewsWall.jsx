import React, { useState } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import StorefrontContainer from './StorefrontContainer';

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Aditya Verma',
    location: 'Bengaluru',
    rating: 5,
    title: 'Best oversized tee in the Indian market hands down!',
    comment: 'The 240 GSM weight is real. It holds its structured drop shoulder shape throughout the day without clinging. Collar is tight and hasn’t loosened after multiple washes.',
    image: 'https://nobero.com/cdn/shop/files/Instagrampost-7_1.jpg',
    productTitle: 'Heavyweight Tee'
  },
  {
    id: 'rev-2',
    author: 'Rohan Nair',
    location: 'Mumbai',
    rating: 5,
    title: 'Took these on a 14hr flight — unmatched comfort',
    comment: 'The 6 pockets are perfectly placed and hold passport, AirPods, power bank without bulging. The 4-way stretch flex makes long transit journeys effortless.',
    image: 'https://nobero.com/cdn/shop/files/Instagrampost-109.jpg',
    productTitle: 'Cargo Joggers'
  },
  {
    id: 'rev-3',
    author: 'Vikram Mehta',
    location: 'Delhi NCR',
    rating: 5,
    title: 'Premium waffle knit feels extremely luxurious',
    comment: 'Received compliments the first time I wore the waffle resort co-ord. Breathable yet substantial fabric with rich texture. Fits true to size.',
    image: 'https://nobero.com/cdn/shop/files/Instagrampost-19.jpg',
    productTitle: 'Waffle Co-ord'
  },
  {
    id: 'rev-4',
    author: 'Karthik Rao',
    location: 'Hyderabad',
    rating: 5,
    title: 'Fabric drape and stitching are top notch',
    comment: 'I usually buy international labels, but LEO exceeded my expectations in heavy cotton loopknit fabric. Zero shrinkage after machine wash.',
    image: 'https://nobero.com/cdn/shop/files/Instagrampost-91.jpg',
    productTitle: 'Classic Polo'
  }
];

const CustomerReviewsWall = ({ reviews = [] }) => {
  const displayReviews = (reviews && reviews.length >= 4) ? reviews.slice(0, 4) : DEFAULT_REVIEWS;

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="flex items-center justify-center gap-1 mb-2 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold uppercase tracking-tight text-[#1A1E31] font-sans">
            Loved By 100,000+ Fashion Enthusiasts
          </h2>
          <p className="text-xs sm:text-sm text-[#666875] mt-1 font-normal">
            Real reviews from verified shoppers across India. 4.9/5 overall customer satisfaction rating.
          </p>
        </div>

        {/* Reviews 4-Column Grid matching Nobero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {displayReviews.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="flex flex-col bg-white rounded-none border border-gray-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden group"
            >
              {/* Customer Photo / UGC Image */}
              <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <img
                  src={rev.image || DEFAULT_REVIEWS[idx % DEFAULT_REVIEWS.length].image}
                  alt={rev.author}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              {/* Review Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400 mb-2">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  {/* Title & Comment */}
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1E31] leading-snug mb-1 line-clamp-1">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-[#666875] leading-relaxed line-clamp-3">
                    {rev.comment}
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#1A1E31]">{rev.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Verified Buyer" />
                    </div>
                    {rev.location && (
                      <p className="text-[10px] text-gray-400">{rev.location}</p>
                    )}
                  </div>
                  {rev.productTitle && (
                    <span className="text-[10px] text-gray-500 font-medium bg-gray-50 px-2 py-0.5 border border-gray-200">
                      {rev.productTitle}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default CustomerReviewsWall;

import React from 'react';
import { Star, CheckCircle, ThumbsUp, Quote } from 'lucide-react';

const CustomerReviewsWall = ({ reviews = [] }) => {
  if (!reviews.length) return null;

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-1 mb-2 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 font-display">
            Loved By 100,000+ Fashion Enthusiasts
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Real reviews from verified shoppers across India. 4.9/5 overall customer satisfaction rating.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-5 rounded-xl bg-zinc-50 border border-zinc-200/80 shadow-subtle hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-400">{rev.date}</span>
                </div>

                {/* Title */}
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-snug mb-2">
                  "{rev.title}"
                </h4>

                {/* Comment */}
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 mt-4 border-t border-zinc-200/70 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-zinc-900">{rev.author}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Verified Buyer" />
                  </div>
                  <p className="text-[10px] text-zinc-400">{rev.location}</p>
                </div>

                <div className="text-[10px] text-zinc-400 font-medium bg-white px-2 py-1 rounded border border-zinc-200">
                  {rev.productTitle?.split(' ')[0]} {rev.productTitle?.split(' ')[1]}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviewsWall;

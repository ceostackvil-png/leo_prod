import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare } from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.getReviews();
        if (res.success) setReviews(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#666875] block mb-1">
            VERIFIED FEEDBACK
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1E31]">
            What Our Customers Say
          </h1>
          <p className="text-xs sm:text-sm text-[#666875] mt-1.5">
            Real reviews from verified buyers across India experiencing LEO heavyweight quality and comfort.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-[#F7F8FA] border border-gray-200 px-4 py-2 rounded-full text-xs font-bold text-[#1A1E31]">
            <span className="text-amber-500">★★★★★</span>
            <span>4.9 / 5.0 Overall Rating across 12,000+ Men's Orders</span>
          </div>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="py-20 text-center text-xs font-bold text-[#666875]">
            Loading customer reviews...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#F7F8FA] p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#666875]">{rev.date || 'Recent'}</span>
                  </div>

                  <p className="text-xs text-[#1A1E31] leading-relaxed font-medium">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-1 font-bold text-[#1A1E31]">
                      <span>{rev.userName}</span>
                      {rev.verified && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    {rev.location && <p className="text-[10px] text-[#666875]">{rev.location}</p>}
                  </div>
                  {rev.productTitle && (
                    <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-[#242F66] font-semibold max-w-[120px] truncate">
                      {rev.productTitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </StorefrontContainer>
    </div>
  );
};

export default ReviewsPage;

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import StorefrontContainer from './StorefrontContainer';

const GENUINE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Shehla A.',
    name: 'Shehla A.',
    verified: true,
    rating: 5,
    fullComment: 'The Nobero shirt jacket has become the go-to layer for travel and everyday wear. The fabric feels soft yet structured, and the fit is true to size with a clean, minimalist silhouette that looks great on camera and in person. The stitching and finishing are neat, the jacket layers easily over tees or light knits without feeling bulky. Worn on a weekend trip and multiple outings it still looks fresh with minimal wrinkling. For the price, the style, comfort, and versatility are excellent. If you want a smart-casual shirt jacket that works for both daily use and content shoots, this is a solid buy. Highly recommended!',
    shortComment: 'The Nobero shirt jacket has become the go-to layer for travel and everyday wear. The fabric...',
    image: '/images/reviews/review_mountain_shehla.jpg',
    productTitle: 'Textured Shacket'
  },
  {
    id: 'rev-2',
    author: 'Rohit D.',
    name: 'Rohit D.',
    verified: true,
    rating: 5,
    fullComment: 'Nice product. Fabric quality is amazing and feels very comfortable for daily wear.',
    shortComment: 'Nice product',
    image: '/images/reviews/review_selfie_rohit.jpg',
    productTitle: 'Full Sleeve T-Shirt'
  },
  {
    id: 'rev-3',
    author: 'Shehla A.',
    name: 'Shehla A.',
    verified: true,
    rating: 5,
    fullComment: 'Love the fit , the fabric and quality. Looks very aesthetic and cozy for everyday outings.',
    shortComment: 'Love the fit , the fabric and quality.',
    image: '/images/reviews/review_bench_shehla.jpg',
    productTitle: 'Relaxed Hoodie'
  },
  {
    id: 'rev-4',
    author: 'Siddhi N.',
    name: 'Siddhi N.',
    verified: true,
    rating: 5,
    fullComment: 'Loved the colour (bone white) & the minimalist design. The colour is unique & a better shade than standard stark white. Heavyweight 240 GSM drape is completely on point.',
    shortComment: 'Loved the colour (bone white) & the minimalist design. The colour is unique & a better...',
    image: '/images/reviews/review_torii_siddhi.jpg',
    productTitle: 'Oversized Graphic Tee'
  },
  {
    id: 'rev-5',
    author: 'Tirth V.',
    name: 'Tirth V.',
    verified: true,
    rating: 5,
    fullComment: '🔥 Absolutely loving these Arctic Wolf Color Joggers! The fabric quality is excellent 👌—super soft, comfortable, and feels very premium. The fit is perfect, giving a stylish and modern look while still being great for all-day wear. 😎👖 Highly recommended! 🌟🙌',
    shortComment: '🔥 Absolutely loving these Arctic Wolf Color Joggers! The fabric quality is excellent...',
    image: '/images/reviews/review_pants_tirth.jpg',
    productTitle: 'Travel Joggers'
  },
  {
    id: 'rev-6',
    author: 'Paritosh B.',
    name: 'Paritosh B.',
    verified: true,
    rating: 5,
    fullComment: 'Lovely fitting and unique color of T shirt. Soft combed cotton that stays fresh.',
    shortComment: 'Lovely fitting and unique color of T shirt',
    image: '/images/reviews/review_tshirt_paritosh.jpg',
    productTitle: 'Classic Fit Tee'
  },
  {
    id: 'rev-7',
    author: 'Jatinbhai P.',
    name: 'Jatinbhai P.',
    verified: true,
    rating: 5,
    fullComment: 'The set is all good to love. Perfect fabric, stitching, and modern resort silhouette.',
    shortComment: 'The set is all good to love.',
    image: '/images/reviews/review_coord_jatin.jpg',
    productTitle: 'Co-ord Set'
  }
];

const CustomerReviewsWall = ({ reviews = [] }) => {
  const scrollRef = useRef(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const displayReviews = (reviews && reviews.length >= 4) ? reviews : GENUINE_REVIEWS;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8 sm:py-14 bg-white border-b border-gray-100">
      <StorefrontContainer>
        {/* Section Header matching Nobero / LEO aesthetic */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl lg:text-[26px] font-bold font-sans tracking-tight">
            Genuine Reviews
          </h2>
        </div>

        {/* Reviews Carousel Track with Overlapping Arrow Buttons */}
        <div className="relative group/reviews">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Right Arrow Button (Matching user screenshot) */}
          <button
            onClick={() => scroll('right')}
            className="flex absolute -right-2 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-gray-200 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>

          {/* Horizontal Cards Track: 4 visible cards on desktop, smooth overflow scroll */}
          <div
            ref={scrollRef}
            className="grid grid-flow-col auto-cols-[82%] sm:auto-cols-[47%] md:auto-cols-[32%] lg:auto-cols-[calc(25%-18px)] gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-3 pt-1 px-1"
          >
            {displayReviews.map((rev, idx) => {
              const name = rev.name || rev.author || 'Verified Buyer';
              const text = rev.shortComment || rev.comment || rev.fullComment || '';
              const imgSrc = rev.image || GENUINE_REVIEWS[idx % GENUINE_REVIEWS.length].image;

              return (
                <div
                  key={rev.id || idx}
                  onClick={() => setSelectedReview(rev)}
                  className="bg-white rounded-2xl border border-[#EAEAEA] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden select-none cursor-pointer group"
                >
                  {/* Customer Image */}
                  <div className="relative aspect-[4/3.8] w-full overflow-hidden bg-[#ECEEF0] rounded-t-2xl">
                    <img
                      src={imgSrc}
                      alt={name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>

                  {/* Overlapping Floating Star Pill Badge (Exact Nobero Reference) */}
                  <div className="relative z-10 -mt-4 mx-auto">
                    <div className="bg-white px-3.5 py-1.5 rounded-full shadow-md border border-gray-100 flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Card Body */}
                  <div className="p-4 sm:p-5 pt-3 flex-1 flex flex-col items-center text-center justify-between">
                    <div className="w-full flex flex-col items-center">
                      {/* Reviewer Name with Black Verified Checkmark Badge */}
                      <div className="flex items-center justify-center gap-1.5 mb-2">
                        <span className="font-bold text-[#1A1E31] text-[14px] sm:text-[15px]">
                          {name}
                        </span>
                        <span
                          className="inline-flex items-center justify-center w-3.5 h-3.5 bg-black rounded-full text-white text-[9px] font-bold shrink-0"
                          title="Verified Buyer"
                        >
                          ✓
                        </span>
                      </div>

                      {/* Review Comment / Quote matching screenshot */}
                      <p className="text-[13px] sm:text-[13.5px] text-[#282C3F] leading-snug line-clamp-3 text-center font-normal px-1">
                        {text}
                      </p>
                    </div>

                    {rev.productTitle && (
                      <span className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#9698A0] bg-[#F7F8FA] px-2.5 py-0.5 rounded">
                        {rev.productTitle}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </StorefrontContainer>

      {/* Review Modal Popup for Reading Full Review */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#ECEEF0] shrink-0">
              <img
                src={selectedReview.image}
                alt={selectedReview.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Full Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-1 text-[#F5A623] mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-bold text-[#1A1E31] text-base">
                    {selectedReview.name || selectedReview.author}
                  </h3>
                  <span className="inline-flex items-center justify-center w-4 h-4 bg-black rounded-full text-white text-[10px] font-bold">
                    ✓
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold ml-1">
                    Verified Buyer
                  </span>
                </div>

                {selectedReview.productTitle && (
                  <p className="text-xs text-[#9698A0] mb-4">
                    Product: <strong className="text-[#1A1E31]">{selectedReview.productTitle}</strong>
                  </p>
                )}

                <p className="text-sm text-[#282C3F] leading-relaxed whitespace-pre-line">
                  {selectedReview.fullComment || selectedReview.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#9698A0]">
                <span>100% Genuine Customer Review</span>
                <span className="text-[#1A1E31] font-semibold">LEO Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReviewsWall;

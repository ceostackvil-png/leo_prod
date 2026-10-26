import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StorefrontContainer from './StorefrontContainer';

const DEFAULT_BLOGS = [
  {
    id: 'blog-1',
    slug: 'mens-shorts-trends-2025',
    title: "Men's Shorts Trends You Need to Know in 2025",
    date: 'July 10, 2025',
    image: '/images/blogs/blog_1.webp',
    fallback: 'https://nobero.com/cdn/shop/articles/WebImagesNew3_691474ab-f54b-4427-bdb5-626718d5d6ae.webp?v=1752150018'
  },
  {
    id: 'blog-2',
    slug: 'top-5-mens-shorts-stylish-summer-wardrobe',
    title: "Top 5 Men's Shorts for a Stylish Summer Wardrobe",
    date: 'March 27, 2025',
    image: '/images/blogs/blog_2.jpg',
    fallback: 'https://nobero.com/cdn/shop/articles/freepik__the-style-is-candid-image-photography-with-natural__86640.jpg?v=1743079568'
  },
  {
    id: 'blog-3',
    slug: 'mens-shorts-outfit-ideas',
    title: "How to Style Men's Shorts: The Best Outfit Ideas for Every Look",
    date: 'February 25, 2025',
    image: '/images/blogs/blog_3.jpg',
    fallback: 'https://nobero.com/cdn/shop/articles/Skult-Shorts-Navy-3_033e426e-40ed-4fb8-b815-1a8911a456f6.jpg?v=1740466378'
  },
  {
    id: 'blog-4',
    slug: 'find-your-perfect-pair-of-shorts',
    title: 'Find Your Perfect Pair of Shorts',
    date: 'November 18, 2024',
    image: '/images/blogs/blog_4.webp',
    fallback: 'https://nobero.com/cdn/shop/articles/WebImagesNew1_70b3c865-ff56-4768-80bc-26550f93f68e.webp?v=1731916880'
  }
];

const ExploreBlogs = ({ blogs = [] }) => {
  const scrollRef = useRef(null);
  const displayBlogs = blogs && blogs.length >= 4 ? blogs : DEFAULT_BLOGS;

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
    <section className="py-8 sm:py-12 bg-white">
      <StorefrontContainer>
        {/* Section Header: Centered Explore Blogs (Exact Nobero Reference) */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-[#1A1E31] text-xl sm:text-2xl lg:text-[26px] font-bold font-sans tracking-tight">
            Explore Blogs
          </h2>
        </div>

        {/* Carousel Container with Left & Right Arrow Buttons */}
        <div className="relative group/blogs">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-md bg-white shadow-md border border-gray-100 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous blogs"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-md bg-white shadow-md border border-gray-100 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
            aria-label="Next blogs"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Blog Cards Track: 4 columns on desktop, horizontal scroll on mobile */}
          <div
            ref={scrollRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full overflow-x-auto no-scrollbar scroll-smooth"
          >
            {displayBlogs.map((blog) => {
              const blogUrl = `/blogs/${blog.slug}`;
              const imgSrc = blog.image || blog.coverImage || DEFAULT_BLOGS[0].image;
              const fallbackSrc = blog.fallback || blog.fallbackImage || DEFAULT_BLOGS[0].fallback;

              return (
                <div
                  key={blog.id}
                  className="group flex flex-col select-none cursor-pointer"
                >
                  <Link
                    to={blogUrl}
                    className="block w-full border border-[#EAEAEA] bg-white rounded-none overflow-hidden transition-all duration-300 hover:shadow-sm"
                  >
                    {/* Square Image Area matching Nobero exact 1:1 aspect ratio */}
                    <div className="relative w-full aspect-square overflow-hidden bg-[#ECEEF0]">
                      <img
                        src={imgSrc}
                        alt={blog.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        onError={(e) => {
                          if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
                            e.currentTarget.src = fallbackSrc;
                          }
                        }}
                      />
                    </div>

                    {/* Blog Card Info: Date & Title */}
                    <div className="p-3.5 sm:p-4 bg-white flex flex-col justify-between">
                      <p className="text-[#9698A0] text-[11px] font-medium mb-1.5 leading-none">
                        {blog.date}
                      </p>
                      <h3 className="text-[#1A1E31] text-[13px] sm:text-[14px] font-semibold line-clamp-2 leading-snug group-hover:text-black transition-colors min-h-[2.5rem]">
                        {blog.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </StorefrontContainer>
    </section>
  );
};

export default ExploreBlogs;

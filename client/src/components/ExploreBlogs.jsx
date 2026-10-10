import React from 'react';
import { Link } from 'react-router-dom';

const ExploreBlogs = ({ blogs = [] }) => {
  if (!blogs.length) return null;

  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-[#212121] text-xl lg:text-2xl font-bold font-display">
            Explore Blogs
          </h2>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              {/* Cover Image */}
              <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="text-[11px] font-semibold text-[#666875] mb-1">
                    <span>{blog.date}</span> • <span>{blog.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#212121] group-hover:text-[#282C3F] transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-[#666875] line-clamp-2 mt-1">
                    {blog.excerpt}
                  </p>
                </div>

                <span className="text-xs font-bold text-[#282C3F] group-hover:underline pt-2 inline-block">
                  Read More →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreBlogs;

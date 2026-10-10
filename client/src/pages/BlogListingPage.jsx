import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';

const BlogListingPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.getBlogs();
        if (res.success) setBlogs(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#666875] block mb-1">
            LEO JOURNAL
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#212121]">
            Men's Fashion & Style Guides
          </h1>
          <p className="text-xs sm:text-sm text-[#666875] mt-1.5">
            Expert styling breakdowns, fabric craftsmanship guides, and streetwear fit recommendations.
          </p>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="py-20 text-center text-xs font-bold text-[#666875]">
            Loading journal articles...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="group flex flex-col bg-[#F7F8FA] rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all shadow-sm"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#282C3F] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#666875] mb-2">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-[#212121] group-hover:text-[#282C3F] transition-colors line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-xs text-[#666875] mt-2 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200 flex items-center gap-1 text-xs font-bold text-[#282C3F] group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </StorefrontContainer>
    </div>
  );
};

export default BlogListingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

const EditorialSection = ({ blogs = [] }) => {
  if (!blogs.length) return null;

  return (
    <section className="py-14 sm:py-20 bg-zinc-50 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 text-zinc-800 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2">
              <BookOpen className="w-3 h-3" />
              THE LEO JOURNAL
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-zinc-900 font-display">
              Explore Blogs & Style Guides
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Fabric deep-dives, streetwear styling tips, and travel wardrobe essentials.
            </p>
          </div>

          <Link
            to="/blogs"
            className="text-xs sm:text-sm font-bold text-zinc-900 hover:text-zinc-600 inline-flex items-center gap-1.5 mt-2 sm:mt-0 transition-colors"
          >
            Read All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.slug}`}
              className="group flex flex-col bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-subtle hover:shadow-md transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="aspect-[16/10] overflow-hidden bg-zinc-100 relative">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-zinc-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                  {blog.category}
                </span>
              </div>

              {/* Blog Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-2">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-zinc-600 leading-snug line-clamp-2 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EditorialSection;

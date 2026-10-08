import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const [singleRes, allRes] = await Promise.all([
          api.getBlogBySlug(slug || 'how-to-style-oversized-tees-2026'),
          api.getBlogs()
        ]);
        if (singleRes.success) setBlog(singleRes.data);
        if (allRes.success) setAllBlogs(allRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#242F66] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-[#1A1E31]">Article Not Found</h2>
        <Link to="/blog" className="mt-4 bg-[#242F66] text-white text-xs font-bold px-6 py-2.5 rounded-md">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <StorefrontContainer>
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#666875] hover:text-[#1A1E31] mb-6 uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
          </Link>

          {/* Category & Title */}
          <div className="space-y-3">
            <span className="bg-[#242F66] text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              {blog.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#1A1E31] leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-3 text-xs text-[#666875] pt-1 border-b border-gray-200 pb-4">
              <span>By <strong className="text-[#1A1E31]">{blog.author}</strong></span>
              <span>•</span>
              <span>{blog.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {blog.readTime}
              </span>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 my-6 shadow-sm">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          {/* Blog Article Body */}
          <div className="prose max-w-none text-[#4A4D5E] text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-normal">
            {blog.content}
          </div>

          {/* More Articles */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-base font-bold uppercase text-[#1A1E31] mb-4">
              More from LEO Journal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {allBlogs.filter(b => b.id !== blog.id).slice(0, 2).map((other) => (
                <Link
                  key={other.id}
                  to={`/blog/${other.slug}`}
                  className="p-4 bg-[#F7F8FA] rounded-lg border border-gray-200 hover:border-gray-300 transition-colors block"
                >
                  <span className="text-[10px] font-bold uppercase text-[#666875]">{other.category}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1A1E31] mt-1 line-clamp-1">{other.title}</h4>
                  <p className="text-xs text-[#666875] mt-1 line-clamp-2">{other.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </StorefrontContainer>
    </div>
  );
};

export default BlogDetailPage;

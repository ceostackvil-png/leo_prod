import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Star, ShoppingBag, ArrowUpRight } from 'lucide-react';
import StorefrontContainer from '../components/StorefrontContainer';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const DEFAULT_CAROUSEL_PRODUCTS = [
  {
    id: "short-c1",
    title: "Air-Flex Relaxed Cargo Shorts",
    color: "Beige / Off-White",
    image: "/images/blogs/cargo_short_offwhite.jpg",
    price: 799,
    originalPrice: 1299,
    discount: "₹500 OFF",
    rating: 4.9,
    reviewCount: 11,
    badge: "TOP PICK",
    link: "/shorts"
  },
  {
    id: "short-c2",
    title: "Drawstring Travel Chino Shorts",
    color: "Khaki Tan",
    image: "/images/blogs/cargo_short_khaki.jpg",
    price: 899,
    originalPrice: 1399,
    discount: "₹500 OFF",
    rating: 4.8,
    reviewCount: 10,
    badge: "BESTSELLER",
    link: "/shorts"
  },
  {
    id: "short-c3",
    title: "Air-Flex Multi-Pocket Shorts",
    color: "Navy Blue",
    image: "/images/blogs/cargo_short_navy.jpg",
    price: 799,
    originalPrice: 1299,
    discount: "₹500 OFF",
    rating: 4.7,
    reviewCount: 7,
    badge: "TRENDING",
    link: "/shorts"
  },
  {
    id: "short-c4",
    title: "Pack of 2 Utility Cargo Shorts",
    color: "Black & Charcoal",
    image: "/images/blogs/cargo_short_2pack.webp",
    price: 1499,
    originalPrice: 2999,
    discount: "₹1,500 OFF",
    rating: 4.9,
    reviewCount: 16,
    badge: "PACK OF 2",
    link: "/shorts"
  }
];

const DEFAULT_CATEGORIES = [
  { name: "Oversized T-Shirts", image: "/images/blogs/cat_oversized_tee.png", link: "/oversized-tees" },
  { name: "Classic T-Shirts", image: "/images/blogs/cat_classic_tee.jpg", link: "/t-shirts" },
  { name: "Cargo Pants", image: "/images/blogs/cat_cargo_pants.jpg", link: "/pants" },
  { name: "Track Pants & Joggers", image: "/images/blogs/cat_joggers.jpg", link: "/joggers" },
  { name: "Co-Ord Sets", image: "/images/blogs/cat_coords.jpg", link: "/co-ords" },
  { name: "Hoodies & Jackets", image: "/images/blogs/cat_hoodies.jpg", link: "/hoodies" }
];

const FALLBACK_BLOGS = {
  "top-5-mens-shorts-stylish-summer-wardrobe": {
    id: "blog-2",
    slug: "top-5-mens-shorts-stylish-summer-wardrobe",
    title: "Top 5 Men's Shorts for a Stylish Summer Wardrobe",
    date: "March 27, 2025",
    readTime: "6 min read",
    category: "Style Guide",
    author: "LEO Editorial Team",
    coverImage: "/images/blogs/blog_2.jpg",
    fallbackImage: "https://nobero.com/cdn/shop/articles/freepik__the-style-is-candid-image-photography-with-natural__86640.jpg?v=1743079568",
    excerpt: "Discover the top 5 men's shorts that will elevate your summer wardrobe. From casual cargo to tailored chinos, find the perfect pair for any occasion at LEO.",
    intro: [
      "Summer is that time of year when style takes a breezy, laid-back turn, and nothing beats the comfort of men’s shorts for staying cool and looking effortlessly trendy. Whether you're jet-setting to your dream beach destination, heading out for a casual brunch, or simply chilling at home, the right pair of shorts for summer can elevate your look without compromising on comfort.",
      "But let’s face it, navigating through the endless options can be overwhelming. From chino shorts that strike the perfect balance between smart and casual to relaxed cotton shorts that scream vacation vibes, picking the right pair can transform your summer wardrobe.",
      "This guide breaks down the top 5 men's shorts for a stylish summer wardrobe, giving you foolproof outfit ideas for every occasion. Plus, with LEO's versatile collection, you'll have no trouble staying on-trend while staying cool. So, whether you're looking for styling shorts for summer or searching for the top 5 men's shorts for summer, this curated list has got you covered."
    ],
    sections: [
      {
        number: "1",
        title: "1. Cargo Shorts: Functional Yet Fashionable",
        content: "Cargo shorts have made a major comeback, blending utilitarian design with contemporary streetwear aesthetics. With their signature multiple pockets and relaxed fit, these shorts are perfect for when you need style with practicality.",
        image: "/images/blogs/cargo_model_olive.jpg",
        taggedProduct: {
          title: "Air-Flex Relaxed Cargo Shorts",
          price: "₹799",
          originalPrice: "₹1,299",
          discount: "₹500 OFF",
          link: "/shorts"
        },
        tipsTitle: "How to Style:",
        tips: [
          { label: "Travel-ready Comfort:", text: "Pair khaki or olive cargo shorts with an oversized t-shirt and chunky sneakers for an effortlessly cool travel look." },
          { label: "Streetwear Cool:", text: "Match them with a fitted graphic tee and a baseball cap for a trendy urban look." },
          { label: "Layered Up:", text: "Throw on a lightweight flannel shirt or shacket over a neutral tank top with your cargo shorts for evening hangouts." }
        ],
        bestFor: "Casual outings, road trips, and weekend adventures."
      },
      {
        number: "2",
        title: "2. Chino Shorts: The Ultimate Smart-Casual Essential",
        content: "When it comes to striking the perfect balance between casual and formal, chino shorts are the undisputed champions. These versatile shorts come in breathable fabrics like cotton or twill, making them an excellent choice for warmer days when you need a more refined look without sacrificing comfort.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Smart Casual Look:", text: "Pair beige or navy chino shorts with a crisp linen button-down shirt and loafers for summer weddings or daytime events." },
          { label: "Brunch Vibe:", text: "Combine pastel chino shorts with a classic polo t-shirt and boat shoes for a relaxed yet put-together weekend brunch outfit." },
          { label: "Monochrome Edge:", text: "Style grey chino shorts with a tailored white polo and sleek minimalist leather sneakers for modern elegance." }
        ],
        bestFor: "Brunch dates, summer parties, and semi-casual get-togethers."
      },
      {
        number: "3",
        title: "3. Athletic Shorts: Comfort Meets Functionality",
        content: "Athletic shorts are no longer confined to the gym, they’ve become a staple in streetwear culture. Whether you’re hitting the gym, heading for a run, or just lounging around, these athletic shorts combine functionality with a cool, sporty aesthetic.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Gym-ready Vibe:", text: "Pair black athletic shorts with a moisture-wicking compression tee and supportive running shoes for peak performance." },
          { label: "Casual Athleisure:", text: "Style them with an oversized hoodie and retro sneakers for a relaxed weekend errand run." },
          { label: "Warm-Weather Cool:", text: "Team them with a lightweight sleeveless tank and slides for poolside lounging." }
        ],
        bestFor: "Workouts, runs, and lounging."
      },
      {
        number: "4",
        title: "4. Denim Shorts: The Classic Summer Staple",
        content: "Nothing spells casual cool like a pair of denim shorts. Whether you’re heading to a beach party or exploring a new city, denim shorts give off a timeless vibe that’s equal parts stylish and relaxed. They’re easy to pair with almost anything in your wardrobe, making them a no-brainer for summer outings.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Classic 90s Vibe:", text: "Style washed blue denim shorts with a boxy white crewneck tee and canvas high-tops." },
          { label: "Rugged Charm:", text: "Pair distressed denim shorts with a short-sleeve camp collar shirt left open over a ribbed tank top." },
          { label: "Evening Chill:", text: "Match darker wash denim shorts with an unbuttoned denim shirt for a modern double-denim statement." }
        ],
        bestFor: "Concerts, casual hangouts, and summer street style."
      },
      {
        number: "5",
        title: "5. Linen Shorts: Light and Breathable for Hot Days",
        content: "Linen shorts are the ultimate saviors during those scorching summer days. Known for their lightweight, breathable fabric, these shorts keep you cool while exuding a laid-back elegance. They’re the ideal choice when you want to stay comfortable while maintaining a refined look.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Resort Chic:", text: "Pair white or ecru linen shorts with a pastel Cuban collar shirt and woven leather espadrilles." },
          { label: "Beach Ready:", text: "Wear relaxed drawstring linen shorts with a light knit polo and slip-on sandals." },
          { label: "Sunset Stroll:", text: "Team them with a breezy linen-cotton henley shirt in olive or sand tones." }
        ],
        bestFor: "Beach vacations, resort getaways, and scorching summer afternoons."
      }
    ],
    productCarousel: {
      title: "Explore our Range of Men's Shorts",
      subtitle: "Top picks of the moment",
      linkText: "Explore All Shorts",
      linkUrl: "/shorts",
      products: DEFAULT_CAROUSEL_PRODUCTS
    },
    conclusion: {
      title: "Own Your Summer Style with the Best Summer Shorts for Men",
      text: "LEO’s range of men’s shorts for summer isn’t just about aesthetics, it’s about functionality, comfort, and versatility. Designed with high-quality fabrics that ensure breathability and durability, these shorts are crafted to help you stay cool during the hottest months. Whether you're styling chino shorts for a dinner date, cargo shorts for weekend adventures, or athletic shorts for active days, having these versatile pieces will ensure you always step out in style. Explore LEO's complete summer shorts collection and upgrade your seasonal wardrobe today!"
    },
    categories: DEFAULT_CATEGORIES
  }
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const currentSlug = slug || 'top-5-mens-shorts-stylish-summer-wardrobe';
  const [blog, setBlog] = useState(FALLBACK_BLOGS[currentSlug] || null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const [singleRes, allRes] = await Promise.all([
          api.getBlogBySlug(currentSlug),
          api.getBlogs()
        ]);
        if (singleRes && singleRes.success && singleRes.data) {
          setBlog(singleRes.data);
        } else if (FALLBACK_BLOGS[currentSlug]) {
          setBlog(FALLBACK_BLOGS[currentSlug]);
        }
        if (allRes && allRes.success && allRes.data) {
          setAllBlogs(allRes.data);
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
        if (FALLBACK_BLOGS[currentSlug]) {
          setBlog(FALLBACK_BLOGS[currentSlug]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [currentSlug]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading && !blog) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white">
        <div className="w-9 h-9 border-2 border-[#1A1E31] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-white">
        <h2 className="text-2xl font-bold text-[#1A1E31]">Article Not Found</h2>
        <p className="text-sm text-[#666875] mt-2 mb-6">The blog post you are looking for doesn't exist or has moved.</p>
        <Link to="/" className="bg-[#1A1E31] text-white text-xs font-semibold px-6 py-3 rounded-none uppercase tracking-wider hover:bg-black transition-colors">
          Back to Homepage
        </Link>
      </div>
    );
  }

  const sections = blog.sections || [];
  const midPoint = Math.min(3, Math.ceil(sections.length / 2));
  const firstHalfSections = sections.slice(0, midPoint);
  const secondHalfSections = sections.slice(midPoint);
  const carousel = blog.productCarousel || { title: "Explore our Range of Men's Shorts", products: DEFAULT_CAROUSEL_PRODUCTS };
  const categories = blog.categories || DEFAULT_CATEGORIES;

  return (
    <article className="min-h-screen bg-white py-6 sm:py-10 text-[#1A1E31]">
      <StorefrontContainer>
        <div className="max-w-[760px] mx-auto px-2 sm:px-4">
          
          {/* Back Navigation Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#666875] hover:text-[#1A1E31] mb-5 tracking-wide transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
          </Link>

          {/* Article Header */}
          <header className="mb-6">
            <p className="text-[#9698A0] text-[13px] font-medium tracking-normal mb-2">
              {blog.date}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-bold text-[#1A1E31] leading-[1.2] tracking-tight">
              {blog.title}
            </h1>
            <p className="text-[#666875] text-[13px] sm:text-[14px] mt-2 font-normal">
              by <span className="font-medium text-[#1A1E31]">{blog.author || "LEO Editorial Team"}</span>
            </p>
          </header>

          {/* Large Hero Banner Cover Image */}
          <div className="w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#F0F1F3] mb-8 shadow-xs border border-gray-100">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (blog.fallbackImage && e.currentTarget.src !== blog.fallbackImage) {
                  e.currentTarget.src = blog.fallbackImage;
                }
              }}
            />
          </div>

          {/* Lead / Intro Paragraphs */}
          {blog.intro && Array.isArray(blog.intro) ? (
            <div className="space-y-4 mb-8 text-[#282C3F] text-[15px] sm:text-[16px] leading-[1.75] font-normal">
              {blog.intro.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          ) : blog.content ? (
            <div className="mb-8 text-[#282C3F] text-[15px] sm:text-[16px] leading-[1.75] font-normal">
              <p>{blog.content}</p>
            </div>
          ) : null}

          {/* First Half of Sections */}
          <div className="space-y-10">
            {firstHalfSections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-[#1A1E31] text-lg sm:text-[22px] font-bold leading-snug tracking-tight">
                  {sec.title}
                </h2>
                
                <p className="text-[#333745] text-[15px] sm:text-[16px] leading-[1.75]">
                  {sec.content}
                </p>

                {/* How to Style / Pro-tip Subheading & Bullets */}
                {sec.tips && sec.tips.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-[#1A1E31] text-[15px] sm:text-[16px] font-bold mb-2">
                      {sec.tipsTitle || "How to Style:"}
                    </h3>
                    <ul className="space-y-2.5 pl-5 list-disc text-[#333745] text-[14px] sm:text-[15px] leading-relaxed">
                      {sec.tips.map((tip, tIdx) => (
                        <li key={tIdx}>
                          <strong className="text-[#1A1E31] font-semibold">{tip.label} </strong>
                          <span>{tip.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Best For Tagline */}
                {sec.bestFor && (
                  <p className="text-[14px] sm:text-[15px] text-[#333745] pt-1">
                    <strong className="text-[#1A1E31] font-semibold">Best for: </strong>
                    <span>{sec.bestFor}</span>
                  </p>
                )}

                {/* In-Article Model Image with Tagged Product Pill (Exact Nobero Layout) */}
                {sec.image && (
                  <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.5] overflow-hidden bg-[#ECEEF0] mt-6 mb-4 group shadow-sm border border-gray-100">
                    <img
                      src={sec.image}
                      alt={sec.title}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Interactive Product Tag Pill Overlay in Bottom Left */}
                    {sec.taggedProduct && (
                      <Link
                        to={sec.taggedProduct.link || "/shorts"}
                        className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-[340px] bg-white/95 backdrop-blur-md px-3.5 py-2.5 shadow-lg border border-gray-200/80 flex items-center justify-between gap-3 transition-transform hover:scale-[1.02] active:scale-95 group/pill"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-[#1A1E31] text-[13px] font-bold truncate group-hover/pill:text-blue-900 transition-colors">
                            {sec.taggedProduct.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs mt-0.5">
                            <span className="font-bold text-[#1A1E31]">{sec.taggedProduct.price}</span>
                            {sec.taggedProduct.originalPrice && (
                              <span className="text-[#9698A0] line-through text-[11px]">
                                {sec.taggedProduct.originalPrice}
                              </span>
                            )}
                            {sec.taggedProduct.discount && (
                              <span className="text-emerald-700 font-semibold text-[11px]">
                                {sec.taggedProduct.discount}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="shrink-0 bg-[#242F66] text-white text-[11px] font-bold px-3 py-1.5 rounded-none tracking-wider uppercase flex items-center gap-1 hover:bg-[#1A1E31] transition-colors">
                          Shop Now
                        </span>
                      </Link>
                    )}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Embedded Product Carousel (Exact Nobero "Explore our Range of Men's Shorts") */}
          {carousel && carousel.products && carousel.products.length > 0 && (
            <div className="my-12 py-8 px-4 sm:px-6 bg-[#F8F9FA] border border-gray-200/70">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-[#1A1E31] text-lg sm:text-xl font-bold tracking-tight">
                    {carousel.title}
                  </h3>
                  <p className="text-[#666875] text-xs sm:text-sm mt-0.5">
                    {carousel.subtitle || "Top picks of the moment"}
                  </p>
                </div>
                {carousel.linkUrl && (
                  <Link
                    to={carousel.linkUrl}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#242F66] hover:underline uppercase tracking-wider"
                  >
                    {carousel.linkText || "Explore All Shorts"} <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Carousel Track with Left/Right Buttons */}
              <div className="relative group/carousel">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollCarousel('right')}
                  className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-200 items-center justify-center text-[#1A1E31] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div
                  ref={carouselRef}
                  className="grid grid-flow-col auto-cols-[75%] sm:auto-cols-[48%] md:auto-cols-[38%] lg:auto-cols-[31%] gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
                >
                  {carousel.products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white border border-[#EAEAEA] flex flex-col justify-between overflow-hidden group/card hover:shadow-md transition-shadow"
                    >
                      <Link to={prod.link || "/shorts"} className="block relative aspect-square overflow-hidden bg-[#F0F1F3]">
                        {prod.badge && (
                          <span className="absolute top-2 left-2 z-10 bg-[#1A1E31] text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase">
                            {prod.badge}
                          </span>
                        )}
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <div className="p-3.5 flex flex-col justify-between flex-1">
                        <div>
                          {prod.rating && (
                            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1A1E31] mb-1">
                              <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-bold text-[10px]">
                                {prod.rating} <Star className="w-2.5 h-2.5 fill-current" />
                              </span>
                              <span className="text-[#9698A0] font-normal">({prod.reviewCount || 10})</span>
                            </div>
                          )}
                          <h4 className="text-[13px] font-bold text-[#1A1E31] line-clamp-1 group-hover/card:text-[#242F66] transition-colors">
                            {prod.title}
                          </h4>
                          {prod.color && (
                            <p className="text-[11px] text-[#666875] truncate mt-0.5">{prod.color}</p>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-bold text-[#1A1E31]">₹{prod.price}</span>
                            {prod.originalPrice && (
                              <span className="text-[11px] text-[#9698A0] line-through ml-1.5">
                                ₹{prod.originalPrice}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              addToCart({
                                id: prod.id,
                                title: prod.title,
                                price: prod.price,
                                originalPrice: prod.originalPrice,
                                image: prod.image,
                                size: "M",
                                quantity: 1
                              });
                            }}
                            className="bg-[#242F66] text-white p-2 hover:bg-[#1A1E31] transition-colors active:scale-95 cursor-pointer"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Second Half of Sections */}
          <div className="space-y-10">
            {secondHalfSections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-[#1A1E31] text-lg sm:text-[22px] font-bold leading-snug tracking-tight">
                  {sec.title}
                </h2>
                
                <p className="text-[#333745] text-[15px] sm:text-[16px] leading-[1.75]">
                  {sec.content}
                </p>

                {sec.tips && sec.tips.length > 0 && (
                  <div className="mt-3">
                    <h3 className="text-[#1A1E31] text-[15px] sm:text-[16px] font-bold mb-2">
                      {sec.tipsTitle || "How to Style:"}
                    </h3>
                    <ul className="space-y-2.5 pl-5 list-disc text-[#333745] text-[14px] sm:text-[15px] leading-relaxed">
                      {sec.tips.map((tip, tIdx) => (
                        <li key={tIdx}>
                          <strong className="text-[#1A1E31] font-semibold">{tip.label} </strong>
                          <span>{tip.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {sec.bestFor && (
                  <p className="text-[14px] sm:text-[15px] text-[#333745] pt-1">
                    <strong className="text-[#1A1E31] font-semibold">Best for: </strong>
                    <span>{sec.bestFor}</span>
                  </p>
                )}
              </section>
            ))}
          </div>

          {/* Conclusion Section */}
          {blog.conclusion && (
            <div className="mt-12 pt-6 border-t border-gray-200 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1E31] tracking-tight">
                {blog.conclusion.title}
              </h2>
              <p className="text-[#333745] text-[15px] sm:text-[16px] leading-[1.75]">
                {blog.conclusion.text}
              </p>
            </div>
          )}

          {/* More From Us / Explore Categories (Circular Thumbnail Links from Screenshot) */}
          <div className="mt-14 pt-8 border-t border-gray-200">
            <h3 className="text-center text-sm font-bold uppercase tracking-wider text-[#1A1E31] mb-6">
              More From Us / Explore Categories
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
              {categories.map((cat, cIdx) => (
                <Link
                  key={cIdx}
                  to={cat.link}
                  className="group flex flex-col items-center text-center cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#ECEEF0] border-2 border-transparent group-hover:border-[#242F66] group-hover:scale-105 transition-all duration-300 shadow-xs">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 text-[11px] sm:text-[12px] font-semibold text-[#1A1E31] group-hover:text-[#242F66] transition-colors leading-tight line-clamp-2">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Read Next: More Articles from Explore Blogs */}
          <div className="mt-14 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-[#1A1E31] uppercase tracking-wider">
                More from Explore Blogs
              </h3>
              <Link to="/" className="text-xs font-semibold text-[#242F66] hover:underline">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {allBlogs
                .filter((b) => b.slug !== blog.slug)
                .slice(0, 3)
                .map((other) => (
                  <Link
                    key={other.id}
                    to={`/blogs/${other.slug}`}
                    className="group border border-[#EAEAEA] bg-white overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="aspect-square w-full overflow-hidden bg-[#F0F1F3]">
                      <img
                        src={other.coverImage || other.image}
                        alt={other.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 bg-white">
                      <p className="text-[#9698A0] text-[10px] font-medium mb-1">
                        {other.date}
                      </p>
                      <h4 className="text-xs font-bold text-[#1A1E31] line-clamp-2 group-hover:text-[#242F66] transition-colors">
                        {other.title}
                      </h4>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </StorefrontContainer>
    </article>
  );
};

export default BlogDetailPage;

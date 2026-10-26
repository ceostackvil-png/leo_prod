import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('server/data/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const CATEGORIES_STRIP = [
  { name: "Oversized T-Shirts", image: "/images/blogs/cat_oversized_tee.png", link: "/oversized-tees" },
  { name: "Classic T-Shirts", image: "/images/blogs/cat_classic_tee.jpg", link: "/t-shirts" },
  { name: "Cargo Pants", image: "/images/blogs/cat_cargo_pants.jpg", link: "/pants" },
  { name: "Track Pants & Joggers", image: "/images/blogs/cat_joggers.jpg", link: "/joggers" },
  { name: "Co-Ord Sets", image: "/images/blogs/cat_coords.jpg", link: "/co-ords" },
  { name: "Hoodies & Jackets", image: "/images/blogs/cat_hoodies.jpg", link: "/hoodies" }
];

const SHORTS_CAROUSEL_PRODUCTS = [
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

const RICH_BLOGS = [
  {
    id: "blog-1",
    slug: "mens-shorts-trends-2025",
    title: "Men's Shorts Trends You Need to Know in 2025",
    date: "July 10, 2025",
    readTime: "5 min read",
    category: "Shorts Trends",
    author: "LEO Editorial Team",
    coverImage: "/images/blogs/blog_1.webp",
    fallbackImage: "https://nobero.com/cdn/shop/articles/WebImagesNew3_691474ab-f54b-4427-bdb5-626718d5d6ae.webp?v=1752150018",
    excerpt: "From utility stretch cargo shorts to relaxed waffle resort styles, discover the key trends shaping modern summer rotation.",
    intro: [
      "Summer fashion for men is evolving faster than ever. Gone are the days when shorts were considered mere lazy weekend loungewear. In 2025, men's shorts have evolved into the centerpiece of contemporary menswear, balancing high-performance utility, breathable comfort, and effortless streetwear proportions.",
      "Whether you are heading for an exotic beach retreat, catching an early-morning flight, or cruising through the city with your crew, this year's shorts trends offer functional innovation and clean silhouettes. Here are the defining shorts trends every modern man needs to know in 2025."
    ],
    sections: [
      {
        number: "1",
        title: "Travel Shorts = Core Memory Creators",
        content: "Travel shorts have taken the spotlight this season. Engineered with four-way stretch fabrics, concealed zippered security pockets, and wrinkle-resistant weaves, these shorts keep you comfortable through long flights, road trips, and spontaneous adventures without ever looking rumpled.",
        tipsTitle: "LEO Pick:",
        tips: [
          { label: "Airport Ready:", text: "Pair neutral travel shorts with an oversized heavyweight boxy tee and slip-on mule sneakers." },
          { label: "City Explorer:", text: "Combine with a breathable linen shirt left unbuttoned over a ribbed tank top." },
          { label: "Transit Comfort:", text: "Look for quick-dry moisture-wicking blends with an adjustable internal drawstring." }
        ],
        bestFor: "Airport transits, weekend road trips, and outdoor excursions."
      },
      {
        number: "2",
        title: "Oversized Everything (Shorts Edition)",
        content: "The oversized silhouette has officially conquered bottomwear. Drop-shoulder tees now meet roomy, knee-grazing shorts that deliver an unmistakably relaxed skate-and-streetwear aesthetic. The key to mastering this look is balancing proportions so you look deliberately stylish rather than drowned in fabric.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Balanced Geometry:", text: "Pair baggy boxy shorts with a clean, structured crew-neck t-shirt in complementary tones." },
          { label: "Footwear Choice:", text: "Chunky retro runners or high-top canvas sneakers anchor wide-leg silhouettes perfectly." },
          { label: "Color Harmony:", text: "Keep to monochrome shades like phantom black, washed charcoal, and bone white." }
        ],
        bestFor: "Streetwear enthusiasts, coffee runs, and weekend chill sessions."
      },
      {
        number: "3",
        title: "Cargo Comeback: Utilitarian Practicality",
        content: "Modern cargo shorts have shed their bulky 90s heritage in favor of streamlined, ergonomic 3D pocket designs. Made with lightweight technical ripstop and stretch twill, they offer genuine pocket utility while maintaining a clean, sharp visual profile.",
        image: "/images/blogs/cargo_model_olive.jpg",
        taggedProduct: {
          title: "Air-Flex Relaxed Cargo Shorts",
          price: "₹799",
          originalPrice: "₹1,299",
          discount: "₹500 OFF",
          link: "/shorts"
        },
        tipsTitle: "LEO Pro-tip:",
        tips: [
          { label: "Modern Utility:", text: "Choose sleek flap pockets with hidden press studs rather than oversized pleated pouches." },
          { label: "Casual Everyday:", text: "Team olive or sage cargo shorts with a crisp white tee and a neutral dad cap." },
          { label: "Evening Transition:", text: "Layer with a lightweight overshirt and minimalist suede loafers." }
        ],
        bestFor: "Urban commuting, festivals, and hands-free weekend travel."
      },
      {
        number: "4",
        title: "Earthy, Neutral, and Washed-out Hues",
        content: "Say goodbye to neon brights. The 2025 summer color palette is dominated by mineral-washed earth tones: desert sand, olive drab, terracotta, washed slate, and warm bone. These subtle tones make mixing and matching with your existing wardrobe completely effortless.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Tonal Outfits:", text: "Pair sand beige shorts with an oatmeal or ecru oversized tee for a sleek, rich aesthetic." },
          { label: "Contrast Pairing:", text: "Balance olive shorts with crisp white or dark graphite top layers." }
        ],
        bestFor: "Resort dinners, summer date nights, and rooftop gatherings."
      },
      {
        number: "5",
        title: "Textured Knits & Waffle Weaves",
        content: "Texture is the secret ingredient of elevated casual wear. Waffle knit and honeycomb pique shorts provide breathability and tactile visual depth, turning an ordinary casual outfit into a luxurious resort statement.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Resort Luxe:", text: "Pair waffle shorts with a matching waffle camp-collar shirt for a coordinated resort co-ord look." },
          { label: "Lounge Chic:", text: "Wear with an oversized vintage tee and leather slides for comfortable summer lounging." }
        ],
        bestFor: "Resort vacations, pool parties, and Sunday brunches."
      }
    ],
    productCarousel: {
      title: "Explore our Range of Men's Shorts",
      subtitle: "Top picks of the moment",
      linkText: "Explore All Shorts",
      linkUrl: "/shorts",
      products: SHORTS_CAROUSEL_PRODUCTS
    },
    conclusion: {
      title: "Step Confidently Into 2025 Summer Style",
      text: "The 2025 shorts landscape proves you never have to sacrifice comfort for high style. By investing in versatile fits—from utilitarian cargo shorts to breathable textured knits—you can build an adaptable, modern summer capsule that takes you effortlessly from sun-drenched beach escapes to laid-back city evenings."
    },
    categories: CATEGORIES_STRIP
  },
  {
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
      "But let’s face it, navigating through endless options can be overwhelming. From chino shorts that strike the perfect balance between smart and casual to relaxed cargo shorts that scream vacation vibes, picking the right pair transforms your warm-weather wardrobe. This guide breaks down the top 5 men's shorts for a stylish summer wardrobe, giving you foolproof outfit ideas for every occasion."
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
        content: "When it comes to striking the perfect balance between casual and formal, chino shorts are the undisputed champions. These versatile shorts come in breathable fabrics like cotton twill, making them an excellent choice for warmer days when you need a more refined look without sacrificing comfort.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Smart Casual Look:", text: "Pair beige or navy chino shorts with a crisp linen button-down shirt and loafers for summer daytime events." },
          { label: "Brunch Vibe:", text: "Combine pastel chino shorts with a classic polo t-shirt and boat shoes for a relaxed yet put-together weekend brunch outfit." },
          { label: "Monochrome Edge:", text: "Style grey chino shorts with a tailored white polo and sleek minimalist leather sneakers for modern elegance." }
        ],
        bestFor: "Brunch dates, summer parties, and semi-casual get-togethers."
      },
      {
        number: "3",
        title: "3. Athletic Shorts: Comfort Meets Functionality",
        content: "Athletic shorts are no longer confined to the gym, they’ve become a staple in streetwear culture. Whether you’re hitting the gym, heading for a morning run, or just lounging around, these athletic shorts combine functionality with a cool, sporty aesthetic.",
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
        content: "Linen shorts are the ultimate saviors during scorching summer days. Known for their lightweight, breathable fabric, these shorts keep you cool while exuding a laid-back elegance. They’re the ideal choice when you want to stay comfortable while maintaining a refined look.",
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
      products: SHORTS_CAROUSEL_PRODUCTS
    },
    conclusion: {
      title: "Own Your Summer Style with the Best Summer Shorts for Men",
      text: "LEO’s range of men’s shorts for summer isn’t just about aesthetics, it’s about functionality, comfort, and versatility. Designed with high-quality fabrics that ensure breathability and durability, these shorts are crafted to help you stay cool during the hottest months. Whether you're styling chino shorts for a dinner date, cargo shorts for weekend adventures, or athletic shorts for active days, having these versatile pieces will ensure you always step out in style. Explore LEO's complete summer shorts collection and upgrade your seasonal wardrobe today!"
    },
    categories: CATEGORIES_STRIP
  },
  {
    id: "blog-3",
    slug: "mens-shorts-outfit-ideas",
    title: "How to Style Men's Shorts: The Best Outfit Ideas for Every Look",
    date: "February 25, 2025",
    readTime: "5 min read",
    category: "Outfit Ideas",
    author: "LEO Editorial Team",
    coverImage: "/images/blogs/blog_3.jpg",
    fallbackImage: "https://nobero.com/cdn/shop/articles/Skult-Shorts-Navy-3_033e426e-40ed-4fb8-b815-1a8911a456f6.jpg?v=1740466378",
    excerpt: "Shorts season is here. Master above-the-knee lengths, oversized tee pairings, and footwear choices to transform your everyday summer fits.",
    intro: [
      "Shorts season is here—time to let your style breathe easy. But if you’re still pairing your shorts with just any tee and calling it a look, it’s time to rethink your fit. From laid-back street style to effortless smart-casual, there are plenty of ways to make shorts look intentional and sharp.",
      "Before we dive into outfit ideas, let’s set the record straight: not all men’s shorts are made the same. The right fit, fabric, and length can seriously elevate your look. Here is your definitive guide to styling men's shorts like a pro."
    ],
    sections: [
      {
        number: "1",
        title: "Wearing the Wrong Shorts? Let's Level Up Your Style",
        content: "The three golden rules of wearing shorts are: length, fabric, and proportion. Keep your hemline hitting just above the knee (a 7-inch to 8-inch inseam is universally flattering). Steer clear of stiff fabrics that trap heat, and match oversized tops with tailored shorts or vice-versa.",
        tipsTitle: "The Golden Rules:",
        tips: [
          { label: "1. Find Your Perfect Length:", text: "Above-the-knee cuts create cleaner vertical lines and elongate your frame." },
          { label: "2. Pick the Right Fabric:", text: "Choose French Terry cotton, breathable waffle knits, and stretch-infused twills." },
          { label: "3. Mind the Proportions:", text: "When going oversized up top with a 240 GSM boxy tee, keep your shorts sleek and structured." }
        ],
        bestFor: "Foundational wardrobe styling for all body types."
      },
      {
        number: "2",
        title: "Look 1: Streetwear Edge with Cargo Shorts & Boxy Tees",
        content: "Streetwear and utility go hand in hand. A pair of relaxed multi-pocket cargo shorts paired with an oversized mineral wash graphic tee creates an authentic urban uniform.",
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
          { label: "Top Layer:", text: "Heavyweight drop-shoulder graphic tee in washed charcoal or vintage off-white." },
          { label: "Footwear:", text: "Low-profile skate shoes or retro chunky sneakers with crew socks pushed down slightly." },
          { label: "Accessories:", text: "Crossbody sling bag and matte black sunglasses." }
        ],
        bestFor: "Weekend street hangs, college campuses, and concerts."
      },
      {
        number: "3",
        title: "Look 2: Smart Casual Resort with Pique Polo & Chino Shorts",
        content: "Proving shorts can belong at refined daytime events. A pair of tailored chino shorts in khaki or stone matched with a knitted polo t-shirt looks polished without feeling stuffy.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Top Layer:", text: "Buttonless Johnny-collar knit polo or fine pique polo in navy, sage, or cream." },
          { label: "Footwear:", text: "Suede penny loafers, clean white leather sneakers, or woven driving shoes." },
          { label: "Accessories:", text: "Minimalist leather strap watch and braided woven belt." }
        ],
        bestFor: "Daytime beach weddings, resort dining, and upscale lunches."
      },
      {
        number: "4",
        title: "Look 3: Relaxed Coffee Run with Textured Waffle Shorts",
        content: "Maximum comfort that still looks put together. Waffle knit and French Terry shorts have elevated texture that makes loungewear look intentional.",
        tipsTitle: "How to Style:",
        tips: [
          { label: "Top Layer:", text: "Clean solid crewneck t-shirt in crisp white or pastel mint." },
          { label: "Footwear:", text: "Birkenstock-style leather slides or slip-on canvas slip-ons." },
          { label: "Accessories:", text: "Canvas tote bag and a minimalist sports cap." }
        ],
        bestFor: "Sunday brunch, neighborhood coffee runs, and work-from-home days."
      }
    ],
    productCarousel: {
      title: "Explore our Range of Men's Shorts",
      subtitle: "Top picks of the moment",
      linkText: "Explore All Shorts",
      linkUrl: "/shorts",
      products: SHORTS_CAROUSEL_PRODUCTS
    },
    conclusion: {
      title: "Shorts Game on Point? Time to Show It Off!",
      text: "You’ve got the fits, the styling tips, and the confidence—now it's time to own the warm season. Style is never about overcomplicating things; it’s about choosing well-crafted essentials that look great and feel even better. Explore LEO's shorts collection to find your signature summer look."
    },
    categories: CATEGORIES_STRIP
  },
  {
    id: "blog-4",
    slug: "find-your-perfect-pair-of-shorts",
    title: "Find Your Perfect Pair of Shorts",
    date: "November 18, 2024",
    readTime: "4 min read",
    category: "Fit Guide",
    author: "LEO Editorial Team",
    coverImage: "/images/blogs/blog_4.webp",
    fallbackImage: "https://nobero.com/cdn/shop/articles/WebImagesNew1_70b3c865-ff56-4768-80bc-26550f93f68e.webp?v=1731916880",
    excerpt: "Inseam lengths, stretch ratios, and pocket structures explained to help you find the absolute perfect pair for your build.",
    intro: [
      "Think of your favourite comfy pair, but injected with a serious dose of swagger. Shorts aren't just for lounging anymore (although they're champions at that too). We're talking effortless cool that takes you from brunching with friends to impromptu weekend getaways.",
      "Finding the perfect pair of shorts involves considering several key factors to ensure they meet your needs for comfort, style, and functionality. Here is everything you need to evaluate before purchasing your next pair."
    ],
    sections: [
      {
        number: "1",
        title: "1. What to Look for in a Pair of Shorts",
        content: "Shorts should fit comfortably without being constricting or excessively baggy. They shouldn't dig into your waistline or ride up when walking. Look for an elasticated waistband with an internal drawstring for customizable comfort that moves with you.",
        tipsTitle: "Key Checklist:",
        tips: [
          { label: "Waist Construction:", text: "Hybrid waistbands offering tailored front loops with elasticated back sections." },
          { label: "Inseam Length:", text: "5-inch for active running, 7-inch for modern streetwear, and 9-inch for classic athletic coverage." },
          { label: "Pocket Depth:", text: "Deep pockets designed to hold your smartphone securely without dragging down the silhouette." }
        ],
        bestFor: "Everyday buyers looking for all-day wearable comfort."
      },
      {
        number: "2",
        title: "2. How to Choose the Perfect Material for Shorts",
        content: "Material determines how your shorts perform in high heat. Breathable combed cotton and French Terry offer unmatched softness for daily wear. If you lead an active lifestyle, technical nylon-spandex blends provide four-way stretch and moisture-wicking capabilities.",
        tipsTitle: "Fabric Guide:",
        tips: [
          { label: "Combed French Terry:", text: "Plush, loopback knit that absorbs moisture while keeping you cool and cozy." },
          { label: "Cotton Twill:", text: "Durable structured weave ideal for chino and cargo shorts that hold their shape." },
          { label: "Quick-Dry Ripstop:", text: "Ultra-lightweight technical weave that resists tears and dries within minutes." }
        ],
        bestFor: "Matching fabric performance to your specific summer activities."
      },
      {
        number: "3",
        title: "3. Why LEO Shorts Deserve a Spot in Your Wardrobe",
        content: "At LEO, every pair of shorts is engineered with attention to detail: reinforced bar-tack stitching on stress points, custom hardware, premium drawcords with dipped silicone tips, and colorfast dye techniques that resist fading through countless wash cycles.",
        image: "/images/blogs/cargo_model_olive.jpg",
        taggedProduct: {
          title: "Air-Flex Relaxed Cargo Shorts",
          price: "₹799",
          originalPrice: "₹1,299",
          discount: "₹500 OFF",
          link: "/shorts"
        },
        tipsTitle: "The LEO Advantage:",
        tips: [
          { label: "Anti-Sag Drawstring:", text: "Heavy-duty ribbed elastic that stays snug on your hips without pinching." },
          { label: "Concealed Zip Pockets:", text: "Safe storage for keys, cards, and phone during transit." },
          { label: "Zero Color Bleed:", text: "Pre-shrunk reactive dyed cotton that stays vibrant season after season." }
        ],
        bestFor: "Men seeking durable, high-value everyday apparel."
      }
    ],
    productCarousel: {
      title: "Explore our Range of Men's Shorts",
      subtitle: "Top picks of the moment",
      linkText: "Explore All Shorts",
      linkUrl: "/shorts",
      products: SHORTS_CAROUSEL_PRODUCTS
    },
    conclusion: {
      title: "Find Your Perfect Fit Today",
      text: "Upgrade your warm-weather rotation with shorts crafted for maximum versatility. Whether you love the rugged utility of cargo shorts, the sharp elegance of chino shorts, or the effortless leisure of cotton terry, LEO has the ideal pair built for you. Explore our full collection online with fast shipping and hassle-free returns."
    },
    categories: CATEGORIES_STRIP
  }
];

// Update db.json
db.blogs = RICH_BLOGS;
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully updated ${db.blogs.length} rich blogs in db.json!`);

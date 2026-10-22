import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import MatchTheMood from '../components/MatchTheMood';
import ShopByCollection from '../components/ShopByCollection';
import ShopTheLook from '../components/ShopTheLook';
import AppPromotion from '../components/AppPromotion';
import LeoFavourites from '../components/LeoFavourites';
import CampaignBanner from '../components/CampaignBanner';
import EverydayBestsellers from '../components/EverydayBestsellers';
import FeaturedShorts from '../components/FeaturedShorts';
import CustomerReviewsWall from '../components/CustomerReviewsWall';
import ExploreBlogs from '../components/ExploreBlogs';
import { api } from '../services/api';

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [looks, setLooks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [banRes, prodRes, lookRes, blogRes, revRes] = await Promise.all([
          api.getBanners(),
          api.getProducts(),
          api.getLooks(),
          api.getBlogs(),
          api.getReviews({ status: 'approved' })
        ]);

        if (banRes.success) setBanners(banRes.data);
        if (prodRes.success) setProducts(prodRes.data);
        if (lookRes.success) setLooks(lookRes.data);
        if (blogRes.success) setBlogs(blogRes.data);
        if (revRes.success) setReviews(revRes.data);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Main Hero Merchandising Carousel */}
      <HeroSlider banners={banners} />

      {/* 2. Match The Mood (Curated Categories: Hoodies & Jackets, Sweatshirts, Basics, Joggers) */}
      <MatchTheMood />

      {/* 3. Shop by Collection (10 Men's Category Cards in 2 rows of 5) */}
      <ShopByCollection />

      {/* 4. Shop the Full Look (Curated Men's Outfit Sets with Tags & Carousel Dots) */}
      <ShopTheLook looks={looks} products={products} />

      {/* 5. Promotional Download Banner ("OUR APP IS HERE") */}
      <AppPromotion />

      {/* 6. Signature Co-Ord Sets Carousel (LEO Favourite) */}
      <LeoFavourites products={products} />

      {/* 7. Action Lifestyle Transit Campaign Banner with 4-Feature Badges Bar */}
      <CampaignBanner />

      {/* 8. Everyday Bestsellers (Tabbed Category Grid with 8 products) */}
      <EverydayBestsellers products={products} />

      {/* 9. Season's Favorites / Featured Shorts 4-Column Showcase */}
      <FeaturedShorts />

      {/* 10. Customer Reviews Wall (Loved By 100,000+ Fashion Enthusiasts) */}
      <CustomerReviewsWall reviews={reviews} />

      {/* 11. Editorial Articles / Explore Blogs */}
      {blogs && blogs.length > 0 && <ExploreBlogs blogs={blogs} />}
    </div>
  );
};

export default HomePage;

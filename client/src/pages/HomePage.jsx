import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import ShopByCollection from '../components/ShopByCollection';
import MatchTheMood from '../components/MatchTheMood';
import EverydayBestsellers from '../components/EverydayBestsellers';
import ShopTheLook from '../components/ShopTheLook';
import LeoFavourites from '../components/LeoFavourites';
import ExploreBlogs from '../components/ExploreBlogs';
import AppPromotion from '../components/AppPromotion';
import { api } from '../services/api';

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [looks, setLooks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [banRes, prodRes, lookRes, blogRes] = await Promise.all([
          api.getBanners(),
          api.getProducts(),
          api.getLooks(),
          api.getBlogs()
        ]);

        if (banRes.success) {
          // Filter out the AI-generated banner on the client side
          setBanners(banRes.data.filter(b => b.desktopImage !== '/images/nobero/hero_banner_joggers_des.jpg'));
        }
        if (prodRes.success) setProducts(prodRes.data);
        if (lookRes.success) setLooks(lookRes.data);
        if (blogRes.success) setBlogs(blogRes.data);
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

      {/* 2. Shop by Collection (10 Men's Collections) */}
      <ShopByCollection />

      {/* 3. Match The Mood (Curated Edits: Travel, Street, Lounge, Cozy) */}
      <MatchTheMood />

      {/* 4. Everyday Bestsellers (Tabbed Category Bestsellers) */}
      <EverydayBestsellers products={products} />

      {/* 5. Shop the Full Look (Curated Men's Outfit Sets with Tags) */}
      <ShopTheLook looks={looks} products={products} />

      {/* 6. LEO Favourite (Handpicked for you) */}
      <LeoFavourites products={products} />

      {/* 7. Explore Men's Fashion Blogs */}
      <ExploreBlogs blogs={blogs} />
    </div>
  );
};

export default HomePage;

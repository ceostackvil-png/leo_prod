import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
import ReviewsPage from './pages/ReviewsPage';
import BlogListingPage from './pages/BlogListingPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import {
  AboutUsPage,
  ShippingPolicyPage,
  ReturnsPolicyPage,
  FaqPage,
  PrivacyPolicyPage,
  TermsOfServicePage
} from './pages/StaticPolicyPages';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              {/* Single Global Header */}
              <Navbar />
              
              {/* Main Content Area */}
              <main className="flex-1">
                <Routes>
                  {/* Homepage */}
                  <Route path="/" element={<HomePage />} />

                  {/* Direct Men's Category & Collection Routes */}
                  <Route path="/men" element={<CategoryPage forcedCategory="men" />} />
                  <Route path="/new-arrivals" element={<CategoryPage forcedCategory="new-arrivals" />} />
                  <Route path="/t-shirts" element={<CategoryPage forcedCategory="t-shirts" />} />
                  <Route path="/oversized-tees" element={<CategoryPage forcedCategory="oversized-tees" />} />
                  <Route path="/polos" element={<CategoryPage forcedCategory="polos" />} />
                  <Route path="/shirts" element={<CategoryPage forcedCategory="shirts" />} />
                  <Route path="/hoodies" element={<CategoryPage forcedCategory="hoodies" />} />
                  <Route path="/joggers" element={<CategoryPage forcedCategory="joggers" />} />
                  <Route path="/shorts" element={<CategoryPage forcedCategory="shorts" />} />
                  <Route path="/jackets" element={<CategoryPage forcedCategory="jackets" />} />
                  <Route path="/co-ords" element={<CategoryPage forcedCategory="co-ords" />} />
                  <Route path="/travel" element={<CategoryPage forcedCategory="travel" />} />
                  <Route path="/sale" element={<CategoryPage forcedCategory="sale" />} />

                  {/* General PLP & Category Parameter Routes */}
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/collections/:slug" element={<CategoryPage />} />
                  <Route path="/search" element={<CategoryPage isSearchPage={true} />} />

                  {/* Product Detail Page */}
                  <Route path="/product/:id" element={<ProductDetailPage />} />

                  {/* Shopping & Customer Flow */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/signup" element={<AuthPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />

                  {/* Editorial & Journal */}
                  <Route path="/blog" element={<BlogListingPage />} />
                  <Route path="/blogs" element={<BlogListingPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path="/blogs/:slug" element={<BlogDetailPage />} />

                  {/* Support & Static Policies */}
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/contact-us" element={<ContactPage />} />
                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/shipping" element={<ShippingPolicyPage />} />
                  <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                  <Route path="/returns" element={<ReturnsPolicyPage />} />
                  <Route path="/return-policy" element={<ReturnsPolicyPage />} />
                  <Route path="/faq" element={<FaqPage />} />
                  <Route path="/faqs" element={<FaqPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />

                  {/* Admin Management Portal */}
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </main>

              {/* Single Global Footer */}
              <Footer />

              {/* Global Slide-in Drawers & Modals */}
              <CartDrawer />
              <AuthModal />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

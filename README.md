# LEO — Premium Fashion & Streetwear Ecommerce Platform

LEO is a production-grade fashion ecommerce platform replicating the exact UX hierarchy, spacing system, visual rhythm, responsive behavior, and product presentation of the reference website, with our original **LEO** brand identity.

---

## 🌟 Key Architecture & Implemented Features

### 1. Header & Navigation
- **Top Announcement Bar**: Auto-cycling trust & discount messages (e.g. `100% Satisfaction Guarantee`, `FLAT ₹100 OFF | Code: LEO100`, `Free Shipping on Prepaid Orders`).
- **Main Navigation**: Sleek LEO wordmark, MEN, WOMEN, NEW ARRIVALS, OVERSIZED TEES, HOODIES, JOGGERS, CO-ORDS, TRAVEL, SALE.
- **Mega Menu**: Multi-column category tree + promotional visual banner with direct CTAs.
- **Interactive Search Drawer**: Real-time debounced query search, trending keywords, and instant product result cards.
- **Cart Bag & Drawer**: Slide-over drawer with dynamic **Free Shipping Progress Bar**, 1-click coupon apply (`LEO100`, `FIRST15`, `BUY2SAVE`), instant quantity stepper, and live subtotal calculation.
- **Wishlist & Account**: Live counters, persistent storage, and OTP simulation modal.
- **Mobile Drawer**: Responsive accordion menus with category navigation.

### 2. Homepage Experience
- **Hero Carousel**: High-impact promotional fashion banners with desktop/mobile images, typography overlays, CTA buttons, and auto-rotation.
- **4-Pillar Trust Strip**: 240+ GSM Heavyweight Combed Cotton, 7-Day Easy Returns, Free Delivery, 100% Secure Payments.
- **Shop By Category**: 3:4 portrait category cards with zoom-on-hover effect.
- **LEO Favourites / Our Bestsellers**: Tabbed filters with 3:4 aspect ratio product cards, color swatch selector, discount tags, rating stars, lowest price callouts, and Quick Add size drawer.
- **Shop The Full Look**: Curated outfit bundles with multi-product breakdowns, bundle discount savings, and 1-click "Add Complete Look to Bag".
- **Customer Reviews & UGC Wall**: Verified customer photo reviews with 5-star ratings.
- **The LEO Journal**: Editorial fashion articles, styling guides, and fabric care tips.
- **App Promotion**: Mobile application showcase with QR code and App Store / Google Play buttons.
- **Footer Architecture**: Newsletter subscription with discount promo, category links, customer support links, track order shortcut, payment icons, and policies.

### 3. Product Listing Page (PLP) — `/shop`
- Sidebar filters (Category, Gender, Fit, Max Price Range slider, Tags).
- Mobile bottom filter drawer.
- Sort controls (Popularity, Price Low to High, Price High to Low, Rating, Newest).
- Active filter tags with "Clear All".
- Responsive 2-to-4 column product cards.

### 4. Product Detail Page (PDP) — `/product/:id`
- Multi-angle gallery with thumbnail navigation and high-res zoom.
- Pricing hierarchy with discount badge and "Lowest price in last 30 days" note.
- Color swatch switcher that dynamically updates gallery previews.
- Size selector with live stock urgency alerts and **Size Guide Modal** (Chest/Length/Waist measurements).
- **Live Delivery Pincode Checker**: Validates 6-digit Indian pincodes and calculates estimated delivery date.
- Accordion tabs: Fabric & Care Specs, Product Highlights, Shipping & Returns (7 Days).
- Verified Customer Reviews system with star rating distribution, write review form, and helpfulness voting.
- "You May Also Like" related product recommendations.

### 5. Checkout & Order Tracking
- **Checkout Page** (`/checkout`): Multi-field shipping form, payment options (UPI / QR, Cards, Netbanking, COD), coupon application, and instant order generation (`LEO-xxxxx`).
- **Live Track Order** (`/track-order`): Look up orders by Order ID + Phone/Email to view step-by-step progress: *Order Placed -> Processing -> Shipped -> Out for Delivery -> Delivered*, carrier info, and package contents.
- **Wishlist Page** (`/wishlist`): Dedicated grid with 1-click Move to Bag.
- **User Account Dashboard** (`/account`): Profile, address book, past order history with tracking links.
- **LEO Journal** (`/blogs/:slug`): Editorial article viewer with related reading.

### 6. Full Admin Control Center — `/admin`
- 📊 **Analytics Dashboard**: Gross revenue, total orders, average order value, conversion rate, live traffic, and weekly sales charts.
- 📦 **Product Catalog Management**: Add new garments (title, price, MRP, images, category, fabric, fit, sizes, stock), edit, toggle bestseller, delete.
- 🚚 **Orders Pipeline**: View customer details, update shipment tracking status from *Placed* to *Delivered*.
- 🖼️ **Hero Banners**: Add and manage homepage promotional slider banners.
- 🎟️ **Coupons & Promo Deals**: Create promo codes with flat or percentage discounts and min order values.
- ⭐ **Reviews Moderation**: Approve or reject customer-submitted feedback.
- 📝 **Editorial Blogs**: Manage LEO Journal style articles.

---

## 🚀 Running Locally

### 1. Start Backend API Server
```bash
cd server
npm install
npm start
# Server listens on http://localhost:5001
```

### 2. Start Frontend Client
```bash
cd client
npm install
npm run dev
# Client runs on http://localhost:3000
```

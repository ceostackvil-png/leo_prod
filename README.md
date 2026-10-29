# LEO — Premium Men's Fashion & Streetwear Ecommerce Platform

**LEO ("THE KING")** is a full-stack, production-grade Men's D2C fashion and streetwear e-commerce platform built with **React 18**, **Vite 5**, **Tailwind CSS**, and **Node.js / Express**. It features a high-conversion consumer storefront, curated outfit bundle pages, real-time cart/wishlist/coupon flows, live order tracking, and an **18-module Enterprise Admin Control Center**.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend (`client/`)** | React 18, Vite 5, React Router v6, Tailwind CSS 3, Framer Motion, Lucide React |
| **Backend (`server/`)** | Node.js (ESM), Express 4, CORS, Morgan, Persistent JSON Document Store (`db.json`) |
| **Deployment** | Vercel Multi-Service Architecture (`vercel.json` routing `/api/*` to Express & `/*` to Vite SPA) |

---

## 📂 Project Structure

```text
leo_prod/
├── .env                        # Root environment configuration
├── .env.example                # Template environment variables
├── vercel.json                 # Vercel multi-service & CDN rewrite config
├── package.json                # Root workspace scripts
├── README.md                   # Project documentation
├── client/                     # React + Vite Storefront & Admin SPA
│   ├── .env                    # Frontend Vite environment variables
│   ├── index.html              # HTML entry point
│   ├── vite.config.js          # Vite dev server (:3000), API proxy (:5001) & image fallback middleware
│   ├── tailwind.config.js      # Custom typography, colors & animation tokens
│   ├── public/                 # Local product & banner image assets
│   └── src/
│       ├── main.jsx            # React DOM entry
│       ├── App.jsx             # Storefront & Admin router configuration
│       ├── services/
│       │   └── api.js          # Centralized REST API client
│       ├── context/
│       │   ├── AuthContext.jsx     # User authentication & OTP modal state
│       │   ├── CartContext.jsx     # Cart items, coupons, GST & shipping calculation
│       │   └── WishlistContext.jsx # Persistent wishlist state
│       ├── components/         # Storefront UI components & Admin 18-tab modules
│       │   ├── Navbar.jsx
│       │   ├── HeroSlider.jsx
│       │   ├── MatchTheMood.jsx
│       │   ├── ShopByCollection.jsx
│       │   ├── ShopTheLook.jsx
│       │   ├── LeoFavourites.jsx
│       │   ├── EverydayBestsellers.jsx
│       │   ├── ExploreBlogs.jsx
│       │   ├── CustomerReviewsWall.jsx
│       │   ├── ProductCard.jsx
│       │   ├── CartDrawer.jsx
│       │   ├── Footer.jsx
│       │   └── admin/          # Admin Sidebar, Header, Data & 18 Modular Tabs
│       └── pages/              # Storefront & Admin Route Pages
│           ├── HomePage.jsx
│           ├── ShopPage.jsx
│           ├── CategoryPage.jsx
│           ├── ProductDetailPage.jsx
│           ├── LookDetailPage.jsx
│           ├── CartPage.jsx
│           ├── WishlistPage.jsx
│           ├── CheckoutPage.jsx
│           ├── TrackOrderPage.jsx
│           ├── AccountPage.jsx
│           └── AdminPage.jsx   # 18-Tab Enterprise Admin Dashboard
└── server/                     # Node.js + Express REST API Server
    ├── .env                    # Backend server environment variables
    ├── package.json            # Backend dependencies & scripts
    ├── server.js               # REST API routes, seed data & DB persistence
    └── data/
        ├── db.json             # Live persistent database (products, orders, looks, coupons, blogs, reviews)
        └── leo_full_products.json
```

---

## ⚙️ Environment Variables (`.env`)

Environment files are provided at the root ([.env](file:///c:/Users/ASUS/Downloads/LEO/leo_prod/.env), [.env.example](file:///c:/Users/ASUS/Downloads/LEO/leo_prod/.env.example)), backend ([server/.env](file:///c:/Users/ASUS/Downloads/LEO/leo_prod/server/.env)), and frontend ([client/.env](file:///c:/Users/ASUS/Downloads/LEO/leo_prod/client/.env)).

### Root / Backend Variables (`server/.env`)
```dotenv
NODE_ENV=development
PORT=5001
CORS_ORIGIN=http://localhost:3000
DB_FILE_PATH=./data/db.json

# Payment & Logistics Keys
RAZORPAY_KEY_ID=rzp_test_leo_menswear_key
RAZORPAY_KEY_SECRET=rzp_test_leo_menswear_secret
DELHIVERY_API_TOKEN=delhivery_sandbox_token_leo
DEFAULT_CARRIER="Delhivery Express"

# Admin & Security
ADMIN_DEFAULT_EMAIL=admin@leomenswear.com
JWT_SECRET=leo_super_secret_jwt_signing_key_2026
```

### Frontend Variables (`client/.env`)
```dotenv
VITE_APP_NAME="LEO — The King Men's Wear"
VITE_API_BASE_URL=/api
VITE_BACKEND_PROXY_TARGET=http://localhost:5001
VITE_CURRENCY=INR
VITE_CURRENCY_SYMBOL=₹
VITE_FREE_SHIPPING_THRESHOLD=999
```

---

## 🌟 Key Storefront Features

1. **Header & Mega Menu Navigation**
   - Auto-rotating top announcement bar with promo codes (`B2G10`, `LEO100`, `FIRST15`, `BUY2SAVE`).
   - Multi-column Men's category mega menu (Topwear, Bottomwear, Collections, New Arrivals, Oversized Tees, Co-Ords, Travel Essentials) with promotional cards.
   - Instant debounced search drawer, persistent wishlist badge, and slide-over shopping bag drawer.
2. **Homepage Merchandising Sections**
   - **Hero Slider**: Responsive desktop/mobile promotional banners.
   - **Match The Mood**: Curated seasonal mood tiles.
   - **Shop By Collection**: 10 Men's category portrait cards.
   - **Shop The Full Look**: Complete outfit bundles with interactive hotspots and 1-click bundle checkout (`/look/:id`).
   - **LEO Favourite**: Handpicked signature co-ord sets & joggers with `#dec562` `BESTSELLER` badges, rating pills, and 30-day lowest price callouts.
   - **Our Bestsellers**: Top-selling styles in a clean 4-column Nobero-style showcase.
   - **Explore Blogs & Customer Reviews Wall**: Editorial journal articles and verified buyer reviews.
3. **Product Listing (`/shop`, `/category/:slug`) & Product Detail (`/product/:id`)**
   - Multi-attribute filtering (Category, Price, Size, Color, Fit, Sort) and responsive 2-to-4 column product grids.
   - High-resolution product gallery, color swatch switcher, size chart modal, 6-digit Indian pincode delivery estimator, and verified customer review submission.
4. **Cart, Checkout & Live Order Tracking**
   - Dynamic free-shipping progress bar, 1-click coupon validation, UPI/Card/Netbanking/COD checkout, and real-time 5-step order tracking (`/track-order`).

---

## 🛡️ Enterprise Admin Dashboard (`/admin`)

Accessible at **`http://localhost:3000/admin`**, the Admin Portal provides **18 specialized management modules**:

1. **Executive Overview (`overview`)**: Live revenue, order volume, AOV, conversion rate, and weekly revenue trends.
2. **Products (`products`)**: Full CRUD catalog management, pricing/MRP/GST configuration, stock levels, and `#dec562` Bestseller tagging.
3. **Product Variants (`variants`)**: Size and colorway matrix management.
4. **Inventory (`inventory`)**: Low-stock alerts and warehouse stock adjustments.
5. **Categories & Collections (`categories`)**: Men's category hierarchy and collection curation.
6. **Orders (`orders`)**: Live order pipeline and status transitions (*Placed → Processing → Shipped → Out for Delivery → Delivered*).
7. **Customers (`customers`)**: Customer directory, LTV, and order history.
8. **Coupons & Discounts (`coupons`)**: Create and delete percentage or flat discount codes.
9. **Marketing & Banners (`marketing`)**: Manage homepage hero banners and promotional slides.
10. **Reviews & Ratings (`reviews`)**: Approve, reject, or moderate customer reviews.
11. **Returns & Refunds (`returns`)**: RMA requests and refund processing.
12. **Shipping Management (`shipping`)**: Carrier integrations and pincode serviceability.
13. **Payments (`payments`)**: Transaction logs, prepaid UPI/Card vs. COD breakdown, and settlements.
14. **Analytics & Reports (`analytics`)**: Category performance and top-selling SKU reports.
15. **Admin Users & Roles (`users`)**: RBAC permissions for store managers and staff.
16. **Audit Logs (`audit-logs`)**: Chronological security and admin activity trail.
17. **CMS & Blogs (`cms`)**: Manage LEO Journal articles and static policy pages.
18. **Notifications (`notifications`)**: Real-time system, inventory, and order alerts.

---

## 🔌 REST API Endpoints (`/api`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/categories` | Fetch navigation categories & mega menu groups |
| `GET` | `/api/collections` | Fetch curated Men's collections |
| `GET / POST / DELETE` | `/api/banners` | List, create, or delete homepage hero banners |
| `GET` | `/api/looks`, `/api/looks/:id` | Fetch curated outfit bundles ("Shop The Full Look") |
| `GET / POST` | `/api/products` | List products (supports `category`, `search`, `sort`, `minPrice`, `maxPrice`) or create a product |
| `GET / PUT / DELETE` | `/api/products/:id` | Fetch single product by ID/slug, update, or delete |
| `GET / POST / DELETE` | `/api/coupons` | List, create, or delete discount coupons |
| `POST` | `/api/coupons/validate` | Validate a coupon code against cart subtotal |
| `GET / POST` | `/api/reviews` | List or submit customer product reviews |
| `PATCH` | `/api/reviews/:id/status` | Approve or reject a review from Admin |
| `GET` | `/api/blogs`, `/api/blogs/:slug` | Fetch LEO Journal blog articles |
| `GET / POST` | `/api/orders` | List all orders or place a new order (`LEO-xxxxx`) |
| `GET` | `/api/orders/:id` | Track a specific order by Order ID |
| `PATCH` | `/api/orders/:id/status` | Update order fulfillment status |
| `GET` | `/api/analytics` | Fetch store revenue, order metrics, and 7-day sales trends |
| `POST` | `/api/pincode/check` | Validate 6-digit Indian pincode & return estimated delivery date |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### 1. Clone & Configure Environment
```bash
cd leo_prod
cp .env.example .env
```

### 2. Install & Run Backend API Server (`:5001`)
```bash
cd server
npm install
npm start
# LEO Backend Server running on http://localhost:5001
```

### 3. Install & Run Frontend Vite Server (`:3000`)
Open a second terminal:
```bash
cd client
npm install
npm run dev
# Frontend Storefront: http://localhost:3000
# Admin Dashboard:     http://localhost:3000/admin
```

### 4. Production Build
```bash
npm run build
```

---

## 🌐 Deployment (Vercel)

This repository includes a pre-configured [vercel.json](file:///c:/Users/ASUS/Downloads/LEO/leo_prod/vercel.json) that:
- Builds the React/Vite app from `client/`
- Deploys the Express API from `server/`
- Routes `/api/(.*)` requests to the backend service and all other routes `/(.*)` to the SPA client.

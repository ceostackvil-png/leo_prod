import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('server/data/db.json');
const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

const GENUINE_REVIEWS = [
  {
    id: "rev-1",
    author: "Shehla A.",
    name: "Shehla A.",
    rating: 5,
    verified: true,
    comment: "The LEO shirt jacket has become the go-to layer for travel and everyday wear. The fabric feels soft yet structured, and the fit is true to size with a clean, minimalist silhouette that looks great on camera and in person. The stitching and finishing are neat, the jacket layers easily over tees without feeling bulky.",
    shortComment: "The LEO shirt jacket has become the go-to layer for travel and everyday wear. The fabric...",
    image: "/images/reviews/review_mountain_shehla.jpg",
    productTitle: "Textured Shacket",
    status: "approved",
    date: "2026-06-21"
  },
  {
    id: "rev-2",
    author: "Rohit D.",
    name: "Rohit D.",
    rating: 5,
    verified: true,
    comment: "Nice product",
    shortComment: "Nice product",
    image: "/images/reviews/review_selfie_rohit.jpg",
    productTitle: "Full Sleeve T-Shirt",
    status: "approved",
    date: "2026-08-10"
  },
  {
    id: "rev-3",
    author: "Shehla A.",
    name: "Shehla A.",
    rating: 5,
    verified: true,
    comment: "Love the fit , the fabric and quality.",
    shortComment: "Love the fit , the fabric and quality.",
    image: "/images/reviews/review_bench_shehla.jpg",
    productTitle: "Relaxed Hoodie",
    status: "approved",
    date: "2026-06-21"
  },
  {
    id: "rev-4",
    author: "Siddhi N.",
    name: "Siddhi N.",
    rating: 5,
    verified: true,
    comment: "Loved the colour (bone white) & the minimalist design. The colour is unique & a better shade than standard stark white.",
    shortComment: "Loved the colour (bone white) & the minimalist design. The colour is unique & a better...",
    image: "/images/reviews/review_torii_siddhi.jpg",
    productTitle: "Oversized Graphic Tee",
    status: "approved",
    date: "2026-06-26"
  },
  {
    id: "rev-5",
    author: "Tirth V.",
    name: "Tirth V.",
    rating: 5,
    verified: true,
    comment: "🔥 Absolutely loving these Arctic Wolf Color Joggers! The fabric quality is excellent—super soft, comfortable, and feels very premium. The fit is perfect for travel and daily wear.",
    shortComment: "🔥 Absolutely loving these Arctic Wolf Color Joggers! The fabric quality is excellent...",
    image: "/images/reviews/review_pants_tirth.jpg",
    productTitle: "Travel Joggers",
    status: "approved",
    date: "2026-06-08"
  },
  {
    id: "rev-6",
    author: "Paritosh B.",
    name: "Paritosh B.",
    rating: 5,
    verified: true,
    comment: "Lovely fitting and unique color of T shirt",
    shortComment: "Lovely fitting and unique color of T shirt",
    image: "/images/reviews/review_tshirt_paritosh.jpg",
    productTitle: "Classic Fit Tee",
    status: "approved",
    date: "2026-06-08"
  },
  {
    id: "rev-7",
    author: "Jatinbhai P.",
    name: "Jatinbhai P.",
    rating: 5,
    verified: true,
    comment: "The set is all good to love. Perfect fabric, stitching, and resort feel.",
    shortComment: "The set is all good to love. Perfect fabric, stitching, and resort feel.",
    image: "/images/reviews/review_coord_jatin.jpg",
    productTitle: "Co-ord Set",
    status: "approved",
    date: "2026-06-10"
  }
];

db.reviews = GENUINE_REVIEWS;
fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated db.reviews with genuine reviews!');

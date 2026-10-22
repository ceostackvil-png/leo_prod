import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLLECTIONS = [
  {
    name: "Travel",
    filename: "col_travel.jpg",
    url: "https://nobero.com/cdn/shop/files/Travel_essential.jpg?v=1757745353",
    link: "/shop?category=travel"
  },
  {
    name: "Polos",
    filename: "col_polos.jpg",
    url: "https://nobero.com/cdn/shop/files/Polo.jpg?v=1757745353",
    link: "/shop?category=polos"
  },
  {
    name: "Shirts",
    filename: "col_shirts.jpg",
    url: "https://nobero.com/cdn/shop/files/Linen_Shirts-4.jpg?v=1778157293",
    link: "/shop?category=shirts"
  },
  {
    name: "Co-ords",
    filename: "col_coords.jpg",
    url: "https://nobero.com/cdn/shop/files/Co-ord-2.jpg?v=1786527383",
    link: "/shop?category=co-ords"
  },
  {
    name: "HD Tees",
    filename: "col_hd_tees.jpg",
    url: "https://nobero.com/cdn/shop/files/Premium_tee-2_jpg.jpg?v=1772443532",
    link: "/shop?category=premium-hd-tees"
  },
  {
    name: "T-Shirts",
    filename: "col_t_shirts.jpg",
    url: "https://nobero.com/cdn/shop/files/6_3947fc67-5783-4d32-9311-506c676a9ce8.jpg?v=1757745344",
    link: "/shop?category=t-shirts"
  },
  {
    name: "Joggers",
    filename: "col_joggers.jpg",
    url: "https://nobero.com/cdn/shop/files/Joggersssss.jpg?v=1762501540",
    link: "/shop?category=joggers"
  },
  {
    name: "Cargo Pants",
    filename: "col_cargo_pants.jpg",
    url: "https://nobero.com/cdn/shop/files/Cargo_Pants_f4f28077-9d53-45e8-92d8-ceebffdbb6f6.jpg?v=1762501471",
    link: "/shop?category=pants"
  },
  {
    name: "Shorts",
    filename: "col_shorts.png",
    url: "https://nobero.com/cdn/shop/files/Shorts_Home_Icon_aa3f709b-ca13-4da0-8902-38e06cb81454.png?v=1763279542",
    link: "/shop?category=shorts"
  },
  {
    name: "Oversized Tees",
    filename: "col_oversized_tees.jpg",
    url: "https://nobero.com/cdn/shop/files/Ov._Tee_13b98095-2712-4d73-ad6b-ed64bf134ab9.jpg?v=1778586377",
    link: "/shop?category=oversized-tees"
  }
];

const targetDir = path.join(__dirname, '..', 'client', 'public', 'images', 'collections');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadAll() {
  console.log('Downloading 10 exact Nobero Shop by Collection images...');
  for (const item of COLLECTIONS) {
    try {
      console.log(`Downloading ${item.name} from ${item.url}...`);
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed ${item.name}: ${res.status}`);
        continue;
      }
      const buf = await res.arrayBuffer();
      const dest = path.join(targetDir, item.filename);
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`Saved ${item.filename} (${buf.byteLength} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
}

downloadAll();

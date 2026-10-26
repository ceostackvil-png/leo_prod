import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "rewrite-images-to-cdn",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || "";
          if (/\.(jpg|jpeg|png|webp|avif|gif)(\?.*)?$/i.test(url)) {
            // Check if file exists locally in public folder first!
            const cleanPath = decodeURIComponent(url.split("?")[0].replace(/^\//, ""));
            const localFile = path.resolve(__dirname, "public", cleanPath);
            if (fs.existsSync(localFile) && !fs.statSync(localFile).isDirectory()) {
              return next();
            }

            // Check if product image in /images/products/
            if (url.includes('/images/products/')) {
              const filename = url.replace(/.*?\/images\/products\//, '').split('?')[0];
              const prodFile = path.resolve(__dirname, 'public/images/products', filename);
              if (fs.existsSync(prodFile)) {
                return next();
              }
              const scriptPath = path.resolve(__dirname, '../scripts/patch_one.py');
              const shopifyUrl = `https://cdn.shopify.com/s/files/1/0337/9413/0052/files/${filename}`;
              try {
                execSync(`python "${scriptPath}" "${shopifyUrl}"`, { stdio: 'inherit' });
                if (fs.existsSync(prodFile)) {
                  res.setHeader('Content-Type', filename.endsWith('.png') ? 'image/png' : 'image/jpeg');
                  return fs.createReadStream(prodFile).pipe(res);
                }
              } catch (e) {
                console.error('Error on-demand patching in vite:', e);
              }
              res.writeHead(302, { Location: shopifyUrl });
              return res.end();
            }

            // 1. Check if product image with hash (must have at least 8 digits timestamp)
            const prodMatch = url.match(/(?:men\(1\)\/[^/]+\/|images\/(?:leo|nobero)\/)?.*?_\d{8,14}_(.+\.(?:jpg|jpeg|png|webp|avif))/i);
            if (prodMatch && prodMatch[1]) {
              res.writeHead(302, { Location: `https://cdn.shopify.com/s/files/1/0337/9413/0052/files/${prodMatch[1]}` });
              return res.end();
            }
            // 2. Check hero banners
            if (url.includes("hero_banner_hoodies")) {
              res.writeHead(302, { Location: url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Hoodies_Jackets_mob.jpg" : "https://nobero.com/cdn/shop/files/HB_Hoodies_Jackets_des.jpg" });
              return res.end();
            }
            if (url.includes("hero_banner_shacket")) {
              res.writeHead(302, { Location: url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Shacket_mob_jpg.jpg" : "https://nobero.com/cdn/shop/files/HB_Shacket_des_jpg.jpg" });
              return res.end();
            }
            if (url.includes("hero_banner_coords")) {
              res.writeHead(302, { Location: url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Co-Ords_mob.jpg" : "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg" });
              return res.end();
            }
            if (url.includes("hero_banner_chinos")) {
              res.writeHead(302, { Location: url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Chinos_mob.jpg" : "https://nobero.com/cdn/shop/files/HB_Chinos_des.jpg" });
              return res.end();
            }
            if (url.includes("hero_banner_joggers")) {
              res.writeHead(302, { Location: url.includes("_mob") ? "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_mob.jpg" : "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg" });
              return res.end();
            }
            if (url.includes("col_coords_exact")) {
              res.writeHead(302, { Location: "https://nobero.com/cdn/shop/files/HB_Co-Ords_des.jpg" });
              return res.end();
            }
            if (url.includes("mood_travel")) {
              res.writeHead(302, { Location: "https://nobero.com/cdn/shop/files/HB_Fashion_Joggers_des.jpg" });
              return res.end();
            }
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
  build: {
    emptyOutDir: false,
  },
});

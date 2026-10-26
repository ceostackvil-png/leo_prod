import os
import sys
import json
import urllib.request
import urllib.parse
import numpy as np
from PIL import Image, ImageDraw

LEO_LOGO_PATH = 'client/public/images/logo (1).png'
OUT_DIR_PUB = 'client/public/images/products'
OUT_DIR_DIST = 'client/dist/images/products'

os.makedirs(OUT_DIR_PUB, exist_ok=True)
os.makedirs(OUT_DIR_DIST, exist_ok=True)

def patch_collar_logo(im):
    if im.mode != 'RGB':
        im = im.convert('RGB')
        
    w, h = im.size
    arr = np.array(im).copy()
    
    # Try Polo collar box first (y: 0.185..0.218), then crew neck box (y: 0.210..0.242)
    boxes = [
        (int(w * 0.472), int(w * 0.528), int(h * 0.185), int(h * 0.218), 0.026),
        (int(w * 0.475), int(w * 0.525), int(h * 0.210), int(h * 0.242), 0.035),
    ]
    
    for x1, x2, y1, y2, emb_ratio in boxes:
        sub = arr[y1:y2, x1:x2].astype(float)
        
        sample_strip = arr[y1:y2, max(0, x1 - 35):max(0, x1 - 5)].astype(float)
        valid = sample_strip.mean(axis=2) < 220
        if np.sum(valid) < 20:
            continue
            
        fabric_median = np.median(sample_strip[valid], axis=0)
        diff = np.linalg.norm(sub - fabric_median, axis=2)
        text_mask = diff > 15
        
        y_idxs, x_idxs = np.where(text_mask)
        if len(y_idxs) < 25:
            continue
            
        min_ly, max_ly = y_idxs.min(), y_idxs.max()
        min_lx, max_lx = x_idxs.min(), x_idxs.max()
        
        logo_w = max_lx - min_lx
        logo_h = max_ly - min_ly
        
        if not (int(w * 0.015) < logo_w < int(w * 0.10) and int(h * 0.008) < logo_h < int(h * 0.06)):
            continue
            
        # Erase text pixels by copying fabric 28px to the left
        for y in range(min_ly, max_ly + 1):
            for x in range(min_lx, max_lx + 1):
                if text_mask[y, x] or diff[y, x] > 10:
                    src_x = max(0, x1 + x - 28)
                    arr[y1 + y, x1 + x] = arr[y1 + y, src_x]
                    
        cleaned_im = Image.fromarray(arr)
        
        center_x = x1 + (min_lx + max_lx) // 2
        center_y = y1 + (min_ly + max_ly) // 2
        
        emblem_size = max(24, int(w * emb_ratio))
        
        leo_logo = Image.open(LEO_LOGO_PATH).convert('RGBA')
        leo_logo = leo_logo.resize((emblem_size, emblem_size), Image.Resampling.LANCZOS)
        gray = leo_logo.convert('L')
        
        print_color = (210, 210, 220, 215)
        white_leo = Image.new('RGBA', (emblem_size, emblem_size), print_color)
        mask = gray.point(lambda p: 255 if p > 120 else 0)
        white_leo.putalpha(mask)
        
        cleaned_im.paste(white_leo, (center_x - emblem_size // 2, center_y - emblem_size // 2 - 8), white_leo)
        
        draw = ImageDraw.Draw(cleaned_im)
        text_y = center_y + emblem_size // 2 + 8
        draw.text((center_x, text_y), 'LEO', fill=print_color, anchor='mm')
        
        return cleaned_im
        
    return im

import io

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
LEO_LOGO_PATH = os.path.join(ROOT_DIR, 'client/public/images/logo (1).png')
OUT_DIR_PUB = os.path.join(ROOT_DIR, 'client/public/images/products')
OUT_DIR_DIST = os.path.join(ROOT_DIR, 'client/dist/images/products')

from concurrent.futures import ThreadPoolExecutor

def process_image_url(url):
    clean_name = url.split('/')[-1].split('?')[0]
    out_pub = os.path.join(OUT_DIR_PUB, clean_name)
    out_dist = os.path.join(OUT_DIR_DIST, clean_name)
    
    if os.path.exists(out_pub):
        return out_pub
        
    fetch_url = url if url.startswith('http') else f"https://cdn.shopify.com/s/files/1/0337/9413/0052/files/{clean_name}"
    try:
        req = urllib.request.Request(fetch_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = resp.read()
            
        im = Image.open(io.BytesIO(data))
        patched = patch_collar_logo(im)
        
        patched.save(out_pub, 'JPEG', quality=95)
        patched.save(out_dist, 'JPEG', quality=95)
        print(f'Processed: {clean_name}')
        return out_pub
    except Exception as e:
        print(f'Error processing {clean_name}: {e}')
        return None

if __name__ == '__main__':
    db_path = os.path.join(ROOT_DIR, 'server/data/db.json')
    with open(db_path, 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    target_urls = set()
    
    # Target all featured, bestsellers, polos, tees, and hoodies
    for p in db.get('products', []):
        cat = p.get('category', '').lower()
        title = p.get('title', '').lower()
        slug = p.get('slug', '').lower()
        
        is_priority = (
            p.get('isBestseller') or 
            p.get('isFavourite') or
            'polo' in slug or 'polo' in title or cat == 'polos' or
            'tee' in slug or 'tee' in title or cat in ['t-shirts', 'oversized-tees', 'hoodies']
        )
        
        if is_priority:
            if p.get('image'): target_urls.add(p['image'])
            if p.get('secondaryImage'): target_urls.add(p['secondaryImage'])
            if p.get('colors'):
                for c in p['colors']:
                    if c.get('image'): target_urls.add(c['image'])
                    if c.get('frontImage'): target_urls.add(c['frontImage'])
                    if c.get('images'):
                        for img in c['images']: target_urls.add(img)

    # Filter out already existing files to save work
    to_process = [u for u in target_urls if not os.path.exists(os.path.join(OUT_DIR_PUB, u.split('/')[-1].split('?')[0]))]
    
    print(f'Total priority images: {len(target_urls)}. Remaining to process: {len(to_process)}')
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        list(executor.map(process_image_url, to_process))
        
    print(f'Finished batch processing priority images.')

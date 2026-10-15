import os
import json
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def brand_single_image(img_path, raw_logo_path):
    try:
        img = Image.open(img_path).convert('RGBA')
        w, h = img.size
        
        # Only process high-res flat-lay images
        if w < 600 or h < 800:
            return False
            
        bg_color = img.getpixel((int(w * 0.015), int(h * 0.015)))
        r, g, b, _ = bg_color
        
        # Check if background is studio neutral grey (R ~ G ~ B)
        if not (abs(r - g) < 25 and abs(g - b) < 25 and r > 150 and r < 245):
            return False
            
        draw = ImageDraw.Draw(img)
        
        # 1. Top-Left: Erase color card
        box_w = int(w * 0.28)
        box_h = int(h * 0.18)
        draw.rectangle([0, 0, box_w, box_h], fill=bg_color)
        
        # 2. Bottom-Left: Erase lastingcolor / tech badge if present
        bot_w = int(w * 0.35)
        bot_h = int(h * 0.12)
        draw.rectangle([0, h - bot_h, bot_w, h], fill=bg_color)
        
        # 3. Inside Collar: Erase Nobero logo and stamp LEO
        collar_cx = int(w * 0.495)
        collar_cy = int(h * 0.198)
        
        tag_w = int(w * 0.085)
        tag_h = int(h * 0.043)
        x1 = collar_cx - tag_w // 2
        y1 = collar_cy - tag_h // 2
        x2 = collar_cx + tag_w // 2
        y2 = collar_cy + tag_h // 2
        
        # Sample clean fabric above collar tag
        patch_crop = img.crop((x1, max(0, y1 - int(h * 0.015)), x2, y1))
        patch = patch_crop.resize((tag_w, tag_h), Image.Resampling.BICUBIC)
        
        # Feathered soft mask for collar fabric patch
        mask = Image.new('L', (tag_w, tag_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.ellipse([6, 6, tag_w - 6, tag_h - 6], fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(8))
        img.paste(patch, (x1, y1), mask)
        
        # 4. Stamp LEO Lion Emblem on Collar
        if os.path.exists(raw_logo_path):
            raw_logo = Image.open(raw_logo_path).convert('L')
            alpha = raw_logo.point(lambda p: 255 if p > 130 else 0)
            white_lion = Image.new('RGBA', raw_logo.size, (255, 255, 255, 255))
            white_lion.putalpha(alpha)
            
            collar_lion_size = int(w * 0.028)
            collar_lion = white_lion.resize((collar_lion_size, collar_lion_size), Image.Resampling.LANCZOS)
            
            lr, lg, lb, la = collar_lion.split()
            la = la.point(lambda p: int(p * 0.72))
            collar_lion.putalpha(la)
            
            img.paste(collar_lion, (collar_cx - collar_lion_size // 2, collar_cy - int(collar_lion_size * 0.9)), collar_lion)
            
            # Text 'L E O' under emblem on collar
            font_size = int(w * 0.013)
            try:
                font = ImageFont.truetype('arialbd.ttf', font_size)
            except:
                font = ImageFont.load_default()
            draw.text((collar_cx, collar_cy + int(collar_lion_size * 0.45)), 'L E O', fill=(255, 255, 255, 190), font=font, anchor='mm')
            
        img.convert('RGB').save(img_path, quality=95)
        return True
    except Exception as e:
        print(f"Error on {img_path}: {e}")
        return False

def main():
    raw_logo_path = os.path.abspath('client/public/images/logo (1).png')
    db_path = os.path.abspath('server/data/db.json')
    men_dir = os.path.abspath('server/public/men(1)')
    
    print("Indexing local files in server/public/men(1)...", flush=True)
    suffix_map = {}
    for root, dirs, files in os.walk(men_dir):
        for f in files:
            f_lower = f.lower()
            rel_url = '/' + os.path.relpath(os.path.join(root, f), os.path.abspath('server/public')).replace('\\', '/')
            val = (os.path.join(root, f), rel_url)
            suffix_map[f_lower] = val
            parts = f_lower.split('_')
            for i in range(1, len(parts)):
                sub = '_'.join(parts[i:])
                if sub not in suffix_map:
                    suffix_map[sub] = val
                    
    print(f"Indexed {len(suffix_map)} fast lookup keys.", flush=True)
    
    with open(db_path, 'r', encoding='utf-8') as f:
        db = json.load(f)
        
    branded_images = set()
    updated_urls = 0
    
    for p in db.get('products', []):
        for c in p.get('colors', []):
            for key in ['image', 'frontImage', 'backImage']:
                val = c.get(key)
                if val and 'shopify.com' in val:
                    filename = val.split('/')[-1].split('?')[0].lower()
                    if filename in suffix_map:
                        local_abs, rel_url = suffix_map[filename]
                        # Only brand front images
                        if key != 'backImage' and local_abs not in branded_images:
                            brand_single_image(local_abs, raw_logo_path)
                            branded_images.add(local_abs)
                        c[key] = rel_url
                        updated_urls += 1
                        
            # Variant images
            for v in p.get('variants', []):
                for v_key in ['image', 'frontImage', 'backImage']:
                    v_val = v.get(v_key)
                    if v_val and 'shopify.com' in v_val:
                        v_filename = v_val.split('/')[-1].split('?')[0].lower()
                        if v_filename in suffix_map:
                            _, v_rel_url = suffix_map[v_filename]
                            v[v_key] = v_rel_url
                            
        # Main product image
        p_img = p.get('image')
        if p_img and 'shopify.com' in p_img:
            p_filename = p_img.split('/')[-1].split('?')[0].lower()
            if p_filename in suffix_map:
                p_local_abs, p_rel_url = suffix_map[p_filename]
                if p_local_abs not in branded_images:
                    brand_single_image(p_local_abs, raw_logo_path)
                    branded_images.add(p_local_abs)
                p['image'] = p_rel_url
                
    print(f"Branded {len(branded_images)} images with LEO emblem on collar & erased color boxes.", flush=True)
    print(f"Updated {updated_urls} image references in db.json.", flush=True)
    
    with open(db_path, 'w', encoding='utf-8') as f:
        json.dump(db, f, indent=2)
    print("db.json updated successfully!", flush=True)

if __name__ == '__main__':
    main()

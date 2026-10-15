import os
import json
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def brand_garment_image(img_path, out_path=None):
    if out_path is None:
        out_path = img_path
        
    try:
        img = Image.open(img_path).convert('RGBA')
        w, h = img.size
        
        # Only process high-res flat-lay images
        if w < 600 or h < 800:
            return False
            
        # 1. Sample background studio color near top-left corner
        bg_color = img.getpixel((int(w * 0.015), int(h * 0.015)))
        
        # Check if background is studio neutral grey (R ~ G ~ B)
        r, g, b, _ = bg_color
        is_studio_bg = abs(r - g) < 20 and abs(g - b) < 20 and r > 160 and r < 245
        
        draw = ImageDraw.Draw(img)
        
        # 2. Top-Left: Clean color card if present
        # Check if there is a color box in region (0.03*w to 0.25*w, 0.02*h to 0.16*h)
        # In flat lays, garment never touches the top-left margin
        box_w = int(w * 0.28)
        box_h = int(h * 0.18)
        draw.rectangle([0, 0, box_w, box_h], fill=bg_color)
        
        # 3. Bottom-Left: Clean lastingcolor badge if present
        bot_w = int(w * 0.35)
        bot_h = int(h * 0.08)
        draw.rectangle([0, h - bot_h, bot_w, h], fill=bg_color)
        
        # 4. Inside Collar: Erase Nobero logo and stamp LEO
        collar_cx = int(w * 0.495)
        collar_cy = int(h * 0.198)
        
        # Approximate size of collar tag on 2000x3000 image
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
        
        # 5. Stamp LEO Lion Emblem on Collar
        raw_logo_path = os.path.abspath('client/public/images/logo (1).png')
        if os.path.exists(raw_logo_path):
            raw_logo = Image.open(raw_logo_path).convert('L')
            alpha = raw_logo.point(lambda p: 255 if p > 130 else 0)
            white_lion = Image.new('RGBA', raw_logo.size, (255, 255, 255, 255))
            white_lion.putalpha(alpha)
            
            collar_lion_size = int(w * 0.028)
            collar_lion = white_lion.resize((collar_lion_size, collar_lion_size), Image.Resampling.LANCZOS)
            
            # Subtle garment print opacity
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
            
            # 6. Top-Left: Add sleek LEO KING luxury brand badge
            top_badge_w = int(w * 0.17)
            top_badge_h = int(h * 0.036)
            top_x = int(w * 0.035)
            top_y = int(h * 0.03)
            
            badge = Image.new('RGBA', (top_badge_w, top_badge_h), (255, 255, 255, 240))
            b_draw = ImageDraw.Draw(badge)
            
            emblem_dim = int(top_badge_h * 0.75)
            lion_circle = Image.open(raw_logo_path).convert('RGBA').resize((emblem_dim, emblem_dim), Image.Resampling.LANCZOS)
            circle_mask = Image.new('L', (emblem_dim, emblem_dim), 0)
            ImageDraw.Draw(circle_mask).ellipse([0, 0, emblem_dim, emblem_dim], fill=255)
            badge.paste(lion_circle, (int(top_badge_h * 0.12), int(top_badge_h * 0.12)), circle_mask)
            
            try:
                f_leo = ImageFont.truetype('georgia.ttf', int(top_badge_h * 0.42))
                f_king = ImageFont.truetype('arialbd.ttf', int(top_badge_h * 0.18))
            except:
                f_leo = ImageFont.load_default()
                f_king = ImageFont.load_default()
                
            text_x = int(top_badge_h * 1.05)
            b_draw.text((text_x, int(top_badge_h * 0.35)), 'LEO', fill=(17, 24, 39, 255), font=f_leo, anchor='lm')
            b_draw.text((text_x + 1, int(top_badge_h * 0.72)), 'K I N G', fill=(107, 114, 128, 255), font=f_king, anchor='lm')
            
            badge_mask = Image.new('L', (top_badge_w, top_badge_h), 0)
            ImageDraw.Draw(badge_mask).rounded_rectangle([0, 0, top_badge_w, top_badge_h], radius=int(top_badge_h * 0.25), fill=255)
            img.paste(badge, (top_x, top_y), badge_mask)
            
        img.convert('RGB').save(out_path, quality=95)
        return True
    except Exception as e:
        print(f"Error processing {img_path}: {e}")
        return False

if __name__ == '__main__':
    # Test on Canary
    test_f = r'server/public/men(1)/POLOS/classic-polo-t-shirt_24_canary_7e7bd374-19e5-4e7a-be45-151dbae05e65.jpg'
    brand_garment_image(test_f)
    print("Canary polo branded successfully!")

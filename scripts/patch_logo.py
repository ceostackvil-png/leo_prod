import os
import sys
import numpy as np
from PIL import Image, ImageDraw

LEO_LOGO_PATH = 'client/public/images/logo (1).png'

def patch_collar_logo(im, debug_name=None):
    if im.mode != 'RGB':
        im = im.convert('RGB')
        
    w, h = im.size
    arr = np.array(im)
    
    # Collar logo region is horizontally centered: x in [0.46*w, 0.54*w]
    # Vertically in upper collar area: y in [0.15*h, 0.28*h]
    x1, x2 = int(w * 0.46), int(w * 0.54)
    y1, y2 = int(h * 0.15), int(h * 0.28)
    
    sub = arr[y1:y2, x1:x2].astype(float)
    
    # We want to identify the dark inner neck fabric vs the white background
    # Background pixels are usually very bright (near 250+)
    # Fabric pixels are darker (usually < 210)
    brightness = sub.mean(axis=2)
    fabric_pixels = brightness < 220
    
    if np.sum(fabric_pixels) < 100:
        # Not a collar flat-lay with dark inner fabric
        return im
        
    # Find the median color of the fabric inside this neck area
    fabric_colors = sub[fabric_pixels]
    fabric_median = np.median(fabric_colors, axis=0)
    
    # The logo text/wings are printed in white/light grey, so they are brighter than the fabric
    diff_from_fabric = np.linalg.norm(sub - fabric_median, axis=2)
    
    # Text mask: pixels within fabric area that are brighter than fabric by a threshold
    # but not part of the external background
    text_mask = (diff_from_fabric > 15) & fabric_pixels
    
    # Find connected components / coordinates of text pixels
    y_idxs, x_idxs = np.where(text_mask)
    if len(y_idxs) < 30:
        return im
        
    min_ly, max_ly = y_idxs.min(), y_idxs.max()
    min_lx, max_lx = x_idxs.min(), x_idxs.max()
    
    logo_w = max_lx - min_lx
    logo_h = max_ly - min_ly
    
    # Typical logo dimensions: width between 2% and 12% of image width, height up to 12% of height
    if not (int(w * 0.02) < logo_w < int(w * 0.14) and int(h * 0.01) < logo_h < int(h * 0.12)):
        return im
        
    # Erase the logo pixels by sampling fabric from the left side of each pixel
    # Offset is about 1.5% of image width (e.g. 30px in 2000w)
    offset_x = max(15, int(w * 0.015))
    
    # Pad the bounding box slightly
    pad_y1 = max(0, min_ly - 4)
    pad_y2 = min(sub.shape[0], max_ly + 5)
    pad_x1 = max(0, min_lx - 4)
    pad_x2 = min(sub.shape[1], max_lx + 5)
    
    for y in range(pad_y1, pad_y2):
        for x in range(pad_x1, pad_x2):
            if text_mask[y, x]:
                src_x = max(0, x1 + x - offset_x)
                arr[y1 + y, x1 + x] = arr[y1 + y, src_x]
                
    cleaned_im = Image.fromarray(arr)
    
    # Center of the detected logo
    center_x = x1 + (min_lx + max_lx) // 2
    center_y = y1 + (min_ly + max_ly) // 2
    
    # Emblem size matching original logo proportions
    emblem_size = max(24, int(logo_w * 0.60))
    
    leo_logo = Image.open(LEO_LOGO_PATH).convert('RGBA')
    leo_logo = leo_logo.resize((emblem_size, emblem_size), Image.Resampling.LANCZOS)
    gray = leo_logo.convert('L')
    
    # Light print color matching garment screen-print
    print_color = (215, 215, 225, 210)
    white_leo = Image.new('RGBA', (emblem_size, emblem_size), print_color)
    mask = gray.point(lambda p: 255 if p > 120 else 0)
    white_leo.putalpha(mask)
    
    # Paste Leo lion emblem
    cleaned_im.paste(white_leo, (center_x - emblem_size // 2, center_y - emblem_size // 2 - int(logo_h * 0.15)), white_leo)
    
    # Draw LEO text
    draw = ImageDraw.Draw(cleaned_im)
    text_y = center_y + emblem_size // 2 + max(5, int(emblem_size * 0.18))
    draw.text((center_x, text_y), 'LEO', fill=print_color, anchor='mm')
    
    return cleaned_im

if __name__ == '__main__':
    # Test on petunia, navy, canary, burgundy, tee_1
    for name in ['petunia', 'navy', 'canary', 'burgundy', 'tee_1']:
        path = f'scripts/test_{name}.jpg'
        if os.path.exists(path):
            im = Image.open(path)
            res = patch_collar_logo(im)
            out = f'scripts/out_{name}.jpg'
            res.save(out, 'JPEG', quality=95)
            print(f'Processed {name} -> {out}')

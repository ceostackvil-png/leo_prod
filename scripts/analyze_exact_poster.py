from PIL import Image
import numpy as np

img_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.user_uploaded\media_1792586916430.png"
img = Image.open(img_path)
w, h = img.size
print(f"Exact image size: {w} x {h}")

arr = np.array(img)

# Find the exact coordinates of the poster
# In the screenshot, the poster is the large colored banner in the middle
# Let's inspect rows around y = 200 to 500
poster_rows = []
for y in range(100, int(h * 0.9)):
    row = arr[y, :, :3]
    # Check pixels that are NOT the pure white background (255, 255, 255)
    # or pure page background
    diff = np.linalg.norm(row.astype(float) - [255, 255, 255], axis=1)
    non_white = np.where(diff > 25)[0]
    # In the poster area, non-white span should be large (> 400 pixels)
    if len(non_white) > 400:
        poster_rows.append((y, non_white[0], non_white[-1], non_white[-1] - non_white[0]))

if poster_rows:
    # Filter to only rows that belong to the poster (look at the consecutive block of rows)
    ys = [r[0] for r in poster_rows if r[3] > 600]
    xs_start = [r[1] for r in poster_rows if r[3] > 600]
    xs_end = [r[2] for r in poster_rows if r[3] > 600]
    
    top_y = min(ys)
    bottom_y = max(ys)
    left_x = int(np.median(xs_start))
    right_x = int(np.median(xs_end))
    poster_w = right_x - left_x
    poster_h = bottom_y - top_y
    
    print(f"Poster Top Y: {top_y}")
    print(f"Poster Bottom Y: {bottom_y}")
    print(f"Poster Left X: {left_x}")
    print(f"Poster Right X: {right_x}")
    print(f"Poster Width: {poster_w}px")
    print(f"Poster Height: {poster_h}px")
    print(f"Poster Aspect Ratio: {poster_w / poster_h:.4f} : 1 ({poster_w}:{poster_h})")
    print(f"Left margin in px: {left_x}px, % of screen: {left_x / w * 100:.2f}%")
    print(f"Right margin in px: {w - right_x}px, % of screen: {(w - right_x) / w * 100:.2f}%")
    print(f"Poster Width % of screen: {poster_w / w * 100:.2f}%")
    
    # Also inspect navbar coordinates in the same screenshot
    # Look at y around 80 to 120
    for nav_y in range(60, top_y - 10, 5):
        row = arr[nav_y, :, :3]
        diff = np.linalg.norm(row.astype(float) - [255, 255, 255], axis=1)
        nw = np.where(diff > 25)[0]
        if len(nw) > 0:
            print(f"Navbar at y={nav_y}: left={nw[0]}, right={nw[-1]}, span={nw[-1]-nw[0]}")

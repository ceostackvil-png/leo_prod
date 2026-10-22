from PIL import Image
import numpy as np

img_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.tempmediaStorage\media_1792579055866.jpg"
img = Image.open(img_path)
w, h = img.size
print(f"Image dimensions: {w} x {h}")

# Convert to numpy array
arr = np.array(img)

# Let's inspect rows around the poster (roughly between y=200 and y=900)
# The poster has distinct colors compared to the white background (255, 255, 255)
# In each row, let's find the left-most non-white pixel and right-most non-white pixel
poster_pixels = []
for y in range(int(h * 0.2), int(h * 0.9)):
    row = arr[y, :, :3]
    # Check non-white pixels (e.g. max channel < 245 or distance from white > 30)
    diff_from_white = np.linalg.norm(row.astype(float) - [255, 255, 255], axis=1)
    non_white = np.where(diff_from_white > 30)[0]
    if len(non_white) > 200: # Significant width
        x_start = non_white[0]
        x_end = non_white[-1]
        poster_pixels.append((y, x_start, x_end, x_end - x_start))

if poster_pixels:
    ys = [p[0] for p in poster_pixels]
    xs_start = [p[1] for p in poster_pixels]
    xs_end = [p[2] for p in poster_pixels]
    widths = [p[3] for p in poster_pixels]
    
    print(f"Poster Y range: {min(ys)} to {max(ys)} (Height: {max(ys) - min(ys)})")
    # Take median/mode of x_start and x_end
    median_start = np.median(xs_start)
    median_end = np.median(xs_end)
    median_width = median_end - median_start
    poster_height = max(ys) - min(ys)
    
    print(f"Poster X: {median_start} to {median_end} (Width: {median_width})")
    print(f"Left margin: {median_start}px ({median_start / w * 100:.2f}%)")
    print(f"Right margin: {w - median_end}px ({(w - median_end) / w * 100:.2f}%)")
    print(f"Poster Width % of screen: {median_width / w * 100:.2f}%")
    print(f"Poster Aspect Ratio: {median_width / poster_height:.4f} : 1 (or {median_width}:{poster_height})")

# Let's also check header width / margins
header_y = int(h * 0.15) # around navbar
header_row = arr[header_y, :, :3]
diff_from_white = np.linalg.norm(header_row.astype(float) - [255, 255, 255], axis=1)
non_white = np.where(diff_from_white > 30)[0]
if len(non_white) > 0:
    print(f"Navbar active content: x={non_white[0]} to x={non_white[-1]} (margins: left {non_white[0]}, right {w - non_white[-1]})")

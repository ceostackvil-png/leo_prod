from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.user_uploaded\media_1792586916430.png")
arr = np.array(img)

# Poster top-left is around (59, 173)
# Let's inspect a 15x15 pixel patch around (59, 173)
patch = arr[170:185, 55:70, :3]
print("Top-left patch corner check:")
for y_offset in range(10):
    for x_offset in range(10):
        pixel = arr[173 + y_offset, 59 + x_offset, :3]
        is_white = np.all(pixel > 250)
        print("." if is_white else "#", end="")
    print()

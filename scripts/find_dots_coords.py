from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.user_uploaded\media_1792586916430.png")
arr = np.array(img)

# Look below poster (y = 500 to 550)
for y in range(498, 540):
    row = arr[y, 400:600, :3] # around horizontal center
    diff = np.linalg.norm(row.astype(float) - [255, 255, 255], axis=1)
    nw = np.where(diff > 25)[0]
    if len(nw) > 0:
        print(f"Dots row y={y}: {len(nw)} non-white pixels, min x={400+nw[0]}, max x={400+nw[-1]}")

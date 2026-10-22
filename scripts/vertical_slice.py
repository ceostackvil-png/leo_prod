from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.tempmediaStorage\media_1792579055866.jpg")
arr = np.array(img)

# Print a vertical slice down the middle x=500
for y in range(0, 1000, 25):
    print(f"y={y}: RGB={arr[y, 500, :3]}")

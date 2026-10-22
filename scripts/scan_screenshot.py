from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.user_uploaded\media_1792586916430.png")
w, h = img.size
print(f"w={w}, h={h}")

# Let's check y=20 (tabs)
print("y=20 (tabs):", img.getpixel((10, 20)), img.getpixel((w//2, 20)), img.getpixel((w-10, 20)))

# Let's check y=70 (announcement bar)
print("y=70 (announcement bar):", img.getpixel((10, 70)), img.getpixel((w//2, 70)), img.getpixel((w-10, 70)))

# Let's check y=110 (navbar)
print("y=110 (navbar):", img.getpixel((10, 110)), img.getpixel((58, 110)), img.getpixel((w//2, 110)), img.getpixel((w-10, 110)))

# Let's check y=300 (middle of poster)
# Sample across horizontal line
print("\ny=300 horizontal scan:")
arr = np.array(img)
row = arr[300, :, :3]
for x in range(0, w, 20):
    print(f"x={x}: {row[x]}", end=" | ")
    if (x+20) % 200 == 0:
        print()
print()

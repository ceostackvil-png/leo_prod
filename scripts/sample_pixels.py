from PIL import Image
import numpy as np

img = Image.open(r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.tempmediaStorage\media_1792579055866.jpg")
print("Size:", img.size)

# Let's inspect a horizontal line through the middle of the poster
# In the screenshot, the browser has Chrome tabs at the top, address bar, announcement bar, navbar, then poster.
# Let's sample y = 300, 400, 500, 600
arr = np.array(img)
h, w, _ = arr.shape

for test_y in [250, 350, 450, 500]:
    row = arr[test_y, :, :3]
    # Check pixels from left to right
    # Find where the background turns into poster
    print(f"Row {test_y}:")
    # print first 100 pixels colors
    for x in range(0, w, 20):
        r, g, b = row[x]
        # print if not white
        if r < 240 or g < 240 or b < 240:
            print(f"  First non-white on left at x={x}: RGB({r},{g},{b})")
            break
    for x in range(w-1, -1, -20):
        r, g, b = row[x]
        if r < 240 or g < 240 or b < 240:
            print(f"  First non-white on right at x={x}: RGB({r},{g},{b})")
            break

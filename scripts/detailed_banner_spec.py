from PIL import Image
import numpy as np

# Let's inspect media_1792584039349.png (first screenshot with Co-ords) and media_1792586916430.png (second screenshot with Indigo)
for path in [
    r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.user_uploaded\media_1792584039349.png",
    r"C:\Users\ASUS\.gemini\antigravity-ide\brain\aa4a1127-d448-4290-b055-555b52a31ef1\.user_uploaded\media_1792586916430.png"
]:
    img = Image.open(path)
    w, h = img.size
    arr = np.array(img)
    print(f"\n--- Analyzing {path.split('/')[-1]} (size: {w}x{h}) ---")
    
    # Poster rows
    poster_rows = []
    for y in range(120, int(h * 0.9)):
        row = arr[y, :, :3]
        diff = np.linalg.norm(row.astype(float) - [255, 255, 255], axis=1)
        non_white = np.where(diff > 30)[0]
        if len(non_white) > 400:
            poster_rows.append((y, non_white[0], non_white[-1], non_white[-1] - non_white[0]))
            
    if poster_rows:
        ys = [r[0] for r in poster_rows if r[3] > 600]
        xs_start = [r[1] for r in poster_rows if r[3] > 600]
        xs_end = [r[2] for r in poster_rows if r[3] > 600]
        
        top_y = min(ys)
        bottom_y = max(ys)
        left_x = int(np.median(xs_start))
        right_x = int(np.median(xs_end))
        pw = right_x - left_x
        ph = bottom_y - top_y
        
        print(f"Poster Y: {top_y} to {bottom_y} (height: {ph}px)")
        print(f"Poster X: {left_x} to {right_x} (width: {pw}px)")
        print(f"Aspect ratio: {pw/ph:.4f} : 1 ({pw}:{ph})")
        print(f"Left margin: {left_x}px ({left_x/w*100:.2f}%)")
        print(f"Right margin: {w-right_x}px ({(w-right_x)/w*100:.2f}%)")
        print(f"Poster Width %: {pw/w*100:.2f}%")
        print(f"Poster Height % of screen height: {ph/h*100:.2f}%")

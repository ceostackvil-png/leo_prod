import sys
import os
import io
import urllib.request
from PIL import Image
from process_all_featured_products import patch_collar_logo, OUT_DIR_PUB, OUT_DIR_DIST

def patch_one(url):
    clean_name = url.split('/')[-1].split('?')[0]
    out_pub = os.path.join(OUT_DIR_PUB, clean_name)
    out_dist = os.path.join(OUT_DIR_DIST, clean_name)
    
    if os.path.exists(out_pub):
        return out_pub
        
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=12) as resp:
        data = resp.read()
        
    im = Image.open(io.BytesIO(data))
    patched = patch_collar_logo(im)
    patched.save(out_pub, 'JPEG', quality=95)
    patched.save(out_dist, 'JPEG', quality=95)
    print(f'Successfully patched {clean_name}')
    return out_pub

if __name__ == '__main__':
    if len(sys.argv) > 1:
        patch_one(sys.argv[1])

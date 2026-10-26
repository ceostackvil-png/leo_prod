import os
from PIL import Image

def inspect_img(path):
    if not os.path.exists(path):
        print(path, 'does not exist')
        return
    im = Image.open(path)
    print(path, im.size, im.format, im.mode)

inspect_img('client/public/images/banners/shackets_banner_desktop.jpg')
inspect_img('client/public/images/banners/joggers_banner_desktop.jpg')
inspect_img('client/public/images/banners/test_cand_3.jpg')
inspect_img('client/public/images/banners/test_cand_2.jpg')

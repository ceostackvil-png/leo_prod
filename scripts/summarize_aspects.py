from PIL import Image

def summarize(name, path):
    im = Image.open(path)
    # Check dimensions
    w, h = im.size
    print(f"{name}: size={w}x{h}, aspect={w/h:.3f}")

summarize("shackets_banner_desktop", "client/public/images/banners/shackets_banner_desktop.jpg")
summarize("joggers_banner_desktop", "client/public/images/banners/joggers_banner_desktop.jpg")
summarize("test_cand_3 (Shirts_1)", "client/public/images/banners/test_cand_3.jpg")
summarize("test_cand_2 (WhatsApp)", "client/public/images/banners/test_cand_2.jpg")

from PIL import Image, ImageFilter

def to_grayscale_and_resize(img_pil, max_size=(800, 600)):
    img = img_pil.convert('L')
    img.thumbnail(max_size, Image.Resampling.LANCZOS)
    return img

def detect_edges_binary(grayscale_img, threshold=30):
    edges = grayscale_img.filter(ImageFilter.FIND_EDGES)
    return edges.point(lambda p: 1 if p > threshold else 0, mode='1')

def compare_and_mark_differences(img1_gray, img2_gray, threshold=30):
    edges1 = detect_edges_binary(img1_gray, threshold)
    edges2 = detect_edges_binary(img2_gray, threshold)

    min_w = min(edges1.width, edges2.width)
    min_h = min(edges1.height, edges2.height)

    e1 = edges1.crop((0, 0, min_w, min_h))
    e2 = edges2.crop((0, 0, min_w, min_h))

    base = img2_gray.crop((0, 0, min_w, min_h)).convert('RGB')
    result = base.copy()

    total = min_w * min_h
    matches = 0

    for y in range(min_h):
        for x in range(min_w):
            p1 = e1.getpixel((x, y))
            p2 = e2.getpixel((x, y))
            if p1 == p2:
                matches += 1
            else:
                result.putpixel((x, y), (255, 0, 0))

    overlap = (matches / total) * 100
    return result, overlap
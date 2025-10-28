from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image, ImageFilter, UnidentifiedImageError
import io

Image.MAX_IMAGE_PIXELS = None

app = Flask(__name__)
CORS(app)

def to_grayscale_and_resize(img_pil, max_size=(800, 600)):
    img = img_pil.convert('L')
    img.thumbnail(max_size, Image.Resampling.LANCZOS)
    return img

def detect_edges_binary(grayscale_img, threshold=30):
    """Возвращает бинарное изображение границ (1 = граница, 0 = фон)."""
    edges = grayscale_img.filter(ImageFilter.FIND_EDGES)
    # Бинаризация: всё выше порога → 1 (граница), иначе → 0
    return edges.point(lambda p: 1 if p > threshold else 0, mode='1')

def compare_and_mark_differences(img1_gray, img2_gray, threshold=30):
    # Получаем бинарные карты границ
    edges1 = detect_edges_binary(img1_gray, threshold)
    edges2 = detect_edges_binary(img2_gray, threshold)

    min_w = min(edges1.width, edges2.width)
    min_h = min(edges1.height, edges2.height)

    e1 = edges1.crop((0, 0, min_w, min_h))
    e2 = edges2.crop((0, 0, min_w, min_h))

    # Основа для результата — вторая карта в RGB
    base = img2_gray.crop((0, 0, min_w, min_h)).convert('RGB')
    result = base.copy()

    # Подсчёт совпадений (опционально, для отладки)
    total = min_w * min_h
    matches = 0

    for y in range(min_h):
        for x in range(min_w):
            p1 = e1.getpixel((x, y))
            p2 = e2.getpixel((x, y))
            if p1 == p2:
                matches += 1
            else:
                # Различие — красный пиксель
                result.putpixel((x, y), (255, 0, 0))

    overlap = (matches / total) * 100
    print(f"Совпадение границ: {overlap:.1f}%")
    return result

@app.route('/compare', methods=['POST'])
def compare_images():
    try:
        if 'image1' not in request.files or 'image2' not in request.files:
            return jsonify({"error": "Требуются два изображения"}), 400

        img1 = Image.open(request.files['image1'].stream)
        img2 = Image.open(request.files['image2'].stream)

        # Переводим в ч/б и уменьшаем
        img1_gray = to_grayscale_and_resize(img1)
        img2_gray = to_grayscale_and_resize(img2)

        # Сравниваем и отмечаем различия красным
        result_img = compare_and_mark_differences(img1_gray, img2_gray)

        # Отправляем как PNG
        img_io = io.BytesIO()
        result_img.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')

    except UnidentifiedImageError:
        return jsonify({"error": "Один из файлов не является изображением"}), 400
    except Exception as e:
        print("Ошибка сервера:", str(e))
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')




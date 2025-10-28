from flask import request, send_file, jsonify
from PIL import Image, UnidentifiedImageError
import io
from services.image_compare import to_grayscale_and_resize, compare_and_mark_differences

Image.MAX_IMAGE_PIXELS = None

def compare_images_route():
    try:
        if 'image1' not in request.files or 'image2' not in request.files:
            return jsonify({"error": "Требуются два изображения"}), 400

        img1 = Image.open(request.files['image1'].stream)
        img2 = Image.open(request.files['image2'].stream)

        img1_gray = to_grayscale_and_resize(img1)
        img2_gray = to_grayscale_and_resize(img2)

        result_img, overlap = compare_and_mark_differences(img1_gray, img2_gray)
        print(f"Совпадение границ: {overlap:.1f}%")

        img_io = io.BytesIO()
        result_img.save(img_io, 'PNG')
        img_io.seek(0)
        return send_file(img_io, mimetype='image/png')

    except UnidentifiedImageError:
        return jsonify({"error": "Один из файлов не является изображением"}), 400
    except Exception as e:
        print("Ошибка сервера:", str(e))
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500
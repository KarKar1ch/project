from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image, UnidentifiedImageError
import io

Image.MAX_IMAGE_PIXELS = None
app = Flask(__name__)
CORS(app)

def compare_images_with_color_dict(img1_pil, img2_pil):
    min_width = min(img1_pil.width, img2_pil.width)
    min_height = min(img1_pil.height, img2_pil.height)
    img1 = img1_pil.crop((0, 0, min_width, min_height))
    img2 = img2_pil.crop((0, 0, min_width, min_height))

    color_set = set(img1.getdata())
    result_img = img2.copy()

    for y in range(min_height):
        for x in range(min_width):
            if img2.getpixel((x, y)) not in color_set:
                result_img.putpixel((x, y), (255, 0, 0))

    return result_img

@app.route('/compare', methods=['POST'])
def compare_images():
    try:
        if 'image1' not in request.files or 'image2' not in request.files:
            return jsonify({"error": "Требуются два изображения"}), 400

        img1 = Image.open(request.files['image1'].stream).convert('RGB')
        img2 = Image.open(request.files['image2'].stream).convert('RGB')

        max_size = (800, 600)
        img1.thumbnail(max_size, resample=Image.Resampling.LANCZOS)
        img2.thumbnail(max_size, resample=Image.Resampling.LANCZOS)

        result = compare_images_with_color_dict(img1, img2)

        img_io = io.BytesIO()
        result.save(img_io, 'PNG')
        img_io.seek(0)

        return send_file(img_io, mimetype='image/png')

    except UnidentifiedImageError:
        return jsonify({"error": "Один из файлов не является изображением"}), 400
    except Exception as e:
        print("Ошибка сервера:", str(e))
        return jsonify({"error": "Внутренняя ошибка сервера"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')




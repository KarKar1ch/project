from flask import Flask
from flask_cors import CORS
from routes.compare import compare_images_route

app = Flask(__name__)
CORS(app)

app.add_url_rule('/compare', view_func=compare_images_route, methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
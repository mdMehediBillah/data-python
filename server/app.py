
import sys
import os
from flask import Flask
from flask_cors import CORS

# Ensure server/ is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes.data_routes import data_routes  

app = Flask(__name__)
CORS(app)  

app.register_blueprint(data_routes)

# Home route definition
@app.route('/')
def home():
    return "Welcome to the Flask API. Access the data at /api/data."

if __name__ == '__main__':
    app.run(debug=True)

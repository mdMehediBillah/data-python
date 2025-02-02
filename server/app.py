# from flask import Flask
# from routes.data_routes import data_routes

# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Register the data_routes Blueprint
# # use route_prefix to add a prefix to all routes defined in the Blueprint
# app.register_blueprint(data_routes)

# # Define the default route
# @app.route('/')
# def home():
#     return "Welcome to the Flask API. Access the data at /api/data."

# if __name__ == '__main__':
#     app.run(debug=True)


import sys
import os
from flask import Flask
from flask_cors import CORS

# Ensure server/ is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes.data_routes import data_routes  # Now import should work

app = Flask(__name__)
CORS(app)  

app.register_blueprint(data_routes)

@app.route('/')
def home():
    return "Welcome to the Flask API. Access the data at /api/data."

if __name__ == '__main__':
    app.run(debug=True)


import sys
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Now you can use environment variables
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

print(f"🔹 AWS_ACCESS_KEY_ID: {AWS_ACCESS_KEY_ID}")
print(f"🔹 AWS_SECRET_ACCESS_KEY: {'✅ Loaded' if AWS_SECRET_ACCESS_KEY else '❌ MISSING!'}")
print(f"🔹 S3_BUCKET_NAME: {S3_BUCKET_NAME}")


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

import os
from flask import Blueprint, jsonify, request
from controllers.data_controller import get_data_from_excel

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Get the parent directory
FILEPATH = os.path.join(BASE_DIR, "uploads", "TestData.xlsx")  # file download in this path
# print(f"Trying to load data from: {FILEPATH}")  # Debugging log



data_routes = Blueprint("data_routes", __name__)

@data_routes.route("/api/v1/data", methods=["GET"])
def get_data():
    country = request.args.get("country")  

    try:
        data, columns, _ = get_data_from_excel(FILEPATH, country)
        return jsonify({"columns": columns, "data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 5000
    

    # Get unique countries
@data_routes.route("/api/v1/countries", methods=["GET"])
def get_countries():
    try:
        _, _, unique_countries = get_data_from_excel(FILEPATH)
        return jsonify({"countries": unique_countries})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



    

# @data_routes.route('/api/v1/countries', methods=['GET'])
# def get_countries():
#     return jsonify([{"name": "USA", "code": "US"}, {"name": "India", "code": "IN"}])  # Hardcoded data

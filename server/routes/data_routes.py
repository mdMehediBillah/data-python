
from flask import Blueprint, jsonify, request
from controllers.data_controller import get_data_from_excel

data_routes = Blueprint("data_routes", __name__)

# Data file path
FILEPATH = "uploads/TestData.xlsx"  


# Get data from Excel file
@data_routes.route("/api/v1/data", methods=["GET"])
def get_data():
    country = request.args.get("country")  # Get country from query parameter

    try:
        data, columns, _ = get_data_from_excel(FILEPATH, country)
        return jsonify({"columns": columns, "data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Get unique countries
@data_routes.route("/api/countries", methods=["GET"])
def get_countries():
    try:
        _, _, unique_countries = get_data_from_excel(FILEPATH)
        return jsonify({"countries": unique_countries})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

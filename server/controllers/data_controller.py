

# import pandas as pd
# import os

# print("Current directory:", os.getcwd())
# print("Available files:", os.listdir("uploads/"))

# def get_data_from_excel(filepath, country=None):
#     if not os.path.exists(filepath):
#         raise FileNotFoundError("File not found")

#     try:
#         df = pd.read_excel(filepath)

#         # Get unique country names
#         unique_countries = df["country"].dropna().unique().tolist()

#         # Filter data by country if a country is selected
#         if country:
#             df = df[df["country"] == country]

#         return df.to_dict(orient="records"), df.columns.tolist(), unique_countries
#     except Exception as e:
#         raise Exception(f"Error: {str(e)}")


import os
import pandas as pd
import boto3

# Get S3 credentials from environment variables
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")
S3_OBJECT_NAME = "TestData.xlsx"
LOCAL_FILE_PATH = "uploads/TestData.xlsx"

if os.path.exists(LOCAL_FILE_PATH):
    print("✅ File found! Reading from:", LOCAL_FILE_PATH)
    df = pd.read_excel(LOCAL_FILE_PATH)
    print("Data in memory:", df.head())
else:
    print("❌ File NOT found! Check if data is coming from somewhere else.")
    df = pd.DataFrame()  # Empty DataFrame


def download_from_s3(bucket_name, object_name, file_path):
    """Download a file from S3 to local storage."""
    s3 = boto3.client("s3")

    # Ensure the 'uploads' folder exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    try:
        s3.download_file(bucket_name, object_name, file_path)
        print(f"✅ Downloaded {object_name} from S3 to {file_path}")
    except Exception as e:
        raise FileNotFoundError(f"🚨 Failed to download from S3: {str(e)}")


def get_data_from_excel(filepath, country=None):
    """Fetch data from an Excel file, downloading from S3 if necessary."""
    if not os.path.exists(filepath):
        if not S3_BUCKET_NAME:
            raise FileNotFoundError("❌ S3 bucket is not configured, and local file is missing.")

        try:
            download_from_s3(S3_BUCKET_NAME, S3_OBJECT_NAME, filepath)
        except Exception as e:
            raise FileNotFoundError(f"❌ S3 Download Failed: {str(e)}")

    try:
        df = pd.read_excel(filepath)
        unique_countries = df["country"].dropna().unique().tolist()

        if country:
            df = df[df["country"] == country]

        return df.to_dict(orient="records"), df.columns.tolist(), unique_countries
    except Exception as e:
        raise Exception(f"❌ Error reading Excel file: {str(e)}")
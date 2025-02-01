

import pandas as pd
import os

def get_data_from_excel(filepath, country=None):
    if not os.path.exists(filepath):
        raise FileNotFoundError("File not found")

    try:
        df = pd.read_excel(filepath)

        # Get unique country names
        unique_countries = df["country"].dropna().unique().tolist()

        # Filter data by country if a country is selected
        if country:
            df = df[df["country"] == country]

        return df.to_dict(orient="records"), df.columns.tolist(), unique_countries
    except Exception as e:
        raise Exception(f"Error: {str(e)}")

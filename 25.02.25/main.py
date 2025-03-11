from fastapi import FastAPI, Query
import pandas as pd

app = FastAPI()

FILENAME = "LE.txt"

# Read CSV without treating the first row as column names
df = pd.read_csv(FILENAME, delimiter="\t", encoding="ISO-8859-1", on_bad_lines="skip", dtype=str, header=None)

@app.get("/")
def read_root():
    return {"message": "Server is running"}

@app.get("/products")
def get_products(page: int = Query(1, alias="page", ge=1)):
    """Returns a list of products with pagination."""
    
    per_page = 30
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page

    df_cleaned = df.fillna("Unknown")

    products = []
    for _, row in df_cleaned.iloc[start_idx:end_idx].iterrows():
        product = {
            "id": row[0],  # First column is likely an ID
            "name": row[1],  # Second column seems like the product name
            "price": float(row[8].replace(",", ".") if row[8] != "Unknown" else 0),  # Adjusted for European decimals
            "brand": row[9],  # Brand seems to be in column 9
            "category": "Misc",
            "currency": "EUR",
            "stock": 0,
            "ratings": 0,
            "description": "No description available",
            "reviews": [{"user": "Anonymous", "rating": 4, "comment": "No reviews yet"}],
            "images": [],
            "dimensions": {"width": "Unknown", "height": "Unknown", "depth": "Unknown", "weight": "Unknown"},
            "availability": "Unknown"
        }
        products.append(product)

    return {"total": len(df_cleaned), "page": page, "data": products}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


import pandas as pd

FILENAME = "LE.txt"

df = pd.read_csv(FILENAME, delimiter="\t", encoding="ISO-8859-1", on_bad_lines="skip", dtype=str)

print("Column Names in LE.txt:", df.columns.tolist())  # Print actual column names
print(df.head())  # Print the first few rows to check data

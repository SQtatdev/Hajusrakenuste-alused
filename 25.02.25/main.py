from fastapi import FastAPI, Query
import pandas as pd
import chardet

app = FastAPI()

FILENAME = "LE.txt"

# Определяем кодировку файла
with open(FILENAME, "rb") as f:
    raw_data = f.read(10000)  # Читаем первые 10 000 байт
    result = chardet.detect(raw_data)
    encoding = result["encoding"]
    print("Кодировка файла:", encoding)

# Загружаем файл с нужной кодировкой, пропуская некорректные строки
df = pd.read_csv(FILENAME, delimiter="        ", encoding=encoding, on_bad_lines="skip", dtype={"5": str})


@app.get("/")
def read_root():
    """Тестовый эндпоинт для проверки работы сервера"""
    return {"message": "Server is running"}

@app.get("/spare-parts")
def get_spare_parts(
    page: int = Query(1, alias="page", ge=1)
):
    """
    Возвращает список запчастей с поддержкой:
    - Пагинации (по 30 записей на страницу)
    """
    # Заменить все значения NaN или inf на None
    df_cleaned = df.apply(lambda col: col.map(lambda x: None if (isinstance(x, float) and (x != x or x == float("inf") or x == float("-inf"))) else x))

    per_page = 30
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page

    # Отдаем данные без фильтрации и сортировки для теста
    return {"total": len(df_cleaned), "page": page, "data": df_cleaned.iloc[start_idx:end_idx].to_dict(orient="records")}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)


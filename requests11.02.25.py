import requests  # Импортируем библиотеку

# 1. Устанавливаем метод (например, GET)
response = requests.get('https://example.com')  # Метод GET

# 2. Устанавливаем заголовки (setHeader)
headers = {
    'User-Agent': 'MyApp/1.0',  # Пример заголовка
    'Accept': 'application/json'
}
response = requests.get('https://example.com', headers=headers)  # Запрос с заголовками

# 3. Отправляем данные (setMethod: POST, send)
data = {'key': 'value'}
response = requests.post('https://example.com', data=data)  # Метод POST с данными

# 4. Проверяем статус и тело ответа
print(response.status_code)  # Статус ответа
print(response.text)  # Тело ответа

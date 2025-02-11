import http.client  # Импортируем http.client

# 1. Устанавливаем метод (setMethod)
connection = http.client.HTTPSConnection("example.com")

# 2. Устанавливаем заголовки (setHeader)
headers = {
    'User-Agent': 'MyApp/1.0',
    'Accept': 'application/json'
}

# 3. Отправляем запрос (send)
connection.request("GET", "/", headers=headers)  # Метод GET

# 4. Получаем ответ
response = connection.getresponse()

# 5. Выводим статус и тело ответа
print(response.status)  # Статус ответа
print(response.read().decode())  # Тело ответа

# Закрываем соединение
connection.close()

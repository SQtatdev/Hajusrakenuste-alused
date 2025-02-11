# Hajusrakenuste-alused


## HTTP     

           client library
           server library

Client and Server

Method, Code, Url


request    Response
payload    Html
Json       Json


### Methods: GET, POST, PUT, DELETE, OPTIONS,.... 

### Status Codes: 
```
          2xx - success
          3XX - redirect
          4xx - client errors
          5xx - server errors
```
Header and Body


# Task:
```
Use HTTP client library to send request to any webserver.
 
What methods dous your library provide?

What Method signatures those methods have:
          setMethod(?)
          setHeader(?, ?)
          send(?, ?)

```
# RU

Вот сокращенное сравнение библиотек **requests** и **http.client**:

| **Аспект**                | **`requests`**                        | **`http.client`**                         |
|--------------------------|---------------------------------------|------------------------------------------|
| **Уровень абстракции**    | Высокий, упрощает работу с HTTP       | Низкий, больше контроля, требует больше кода |
| **Простота использования**| Очень простой в использовании         | Сложнее, требует больше кода             |
| **Гибкость**              | Меньше гибкости, но удобнее           | Высокая гибкость, больше настроек        |
| **Поддержка сессий**      | Автоматическая поддержка сессий      | Нет встроенной поддержки сессий         |
| **Популярность**          | Очень популярна, хорошо поддерживается | Менее популярна, но полезна для низкого уровня |
| **Производительность**    | Быстрая, но с дополнительной абстракцией | Потенциально быстрее для специфичных задач |
| **Зависимости**           | Требует установки библиотеки         | Без сторонних зависимостей              |

### Когда использовать:
- **requests**: Если нужно быстро и просто отправить запросы.
- **http.client**: Если нужно больше контроля и работы с низким уровнем HTTP.

# ENG


Here’s the shortened comparison between **requests** and **http.client**:

| **Aspect**                | **requests**                        | **http.client**                         |
|--------------------------|---------------------------------------|------------------------------------------|
| **Level of Abstraction**  | High, simplifies working with HTTP    | Low, more control, requires more code    |
| **Ease of Use**           | Very easy to use                      | More complex, requires more code         |
| **Flexibility**           | Less flexible, but more convenient    | High flexibility, more settings available|
| **Session Management**    | Automatic session support             | No built-in session support              |
| **Popularity**            | Very popular, well-supported          | Less popular, but useful for low-level work|
| **Performance**           | Fast, but with added abstraction      | Potentially faster for specific tasks    |
| **Dependencies**          | Requires installing a library        | No external dependencies                 |

### When to Use:
- **requests**: When you need to quickly and easily send requests.
- **http.client**: When you need more control and low-level HTTP handling.

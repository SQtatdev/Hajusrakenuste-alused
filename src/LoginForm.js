import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setToken, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://demo2.z-bit.ee/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token); // Сохраняем токен
      setToken(response.data.token);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Ошибка аутентификации');
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginForm;

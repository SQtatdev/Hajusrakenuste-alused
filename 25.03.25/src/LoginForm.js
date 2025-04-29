import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://demo2.z-bit.ee/";

const LoginForm = ({ setToken, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Неверный email или пароль');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ setToken, setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://demo2.z-bit.ee/register', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token); // Сохраняем токен
      setToken(response.data.token);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Ошибка регистрации');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterForm;

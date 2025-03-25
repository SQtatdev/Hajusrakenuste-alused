import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import TaskList from './TaskList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <div>
      {!isAuthenticated ? (
        <>
          <LoginForm setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
          <RegisterForm setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
        </>
      ) : (
        <TaskList token={token} setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
};

export default App;

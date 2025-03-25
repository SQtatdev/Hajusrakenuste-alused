import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://demo2.z-bit.ee/";

const TaskList = ({ token, setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Функция для получения задач
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  };

  // Эффект для загрузки задач при изменении токена
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token, fetchTasks]);  // Добавляем fetchTasks в зависимости

  const addTask = async () => {
    if (!newTask) return;
    try {
      await axios.post(
        `${API_URL}/tasks`,
        { name: newTask },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTask('');
      fetchTasks(); // Обновление списка задач
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Обновление списка задач
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <button onClick={handleLogout}>Log in</button>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Новая задача"
      />
      <button onClick={addTask}>Добавить задачу</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

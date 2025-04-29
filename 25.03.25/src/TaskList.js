import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = "http://demo2.z-bit.ee/";

const TaskList = ({ token, setIsAuthenticated }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // ✅ UseCallback to prevent redefining fetchTasks
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token, fetchTasks]);

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
      fetchTasks(); // Re-fetch tasks
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Re-fetch tasks
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div className="container">
      <button onClick={handleLogout}>Выйти</button>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Новая задача"
      />
      <button onClick={addTask}>Добавить задачу</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

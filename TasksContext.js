import React, { createContext, useState } from 'react';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
  ]);

  const addTask = (newTask) => {
    setTasks([newTask,...tasks]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask ,setTasks}}>
      {children}
    </TasksContext.Provider>
  );
};

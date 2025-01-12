import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

//Auth 
export const registerUser = (name: string, surName: string, password: string) =>
  api.post('/auth/register', { name, surName, password });

export const loginUser = (name: string, password: string) =>
  api.post('/auth/login', { name, password });

// Todo
export const getTodos = (token: string) =>
  api.get('/todos', { headers: { Authorization: `Bearer ${token}` } });

export const addTodo = (title: string, dueDate: string, token: string) =>
  api.post('/todos', { title, dueDate }, { headers: { Authorization: `Bearer ${token}` } });

export const updateTodo = (id: number, title: string, completed: boolean, dueDate: string, token: string) =>
  api.put(`/todos/${id}`, { title, completed, dueDate }, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTodo = (id: number, token: string) =>
  api.delete(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const getCompletedTodos = (token: string) =>
  api.get('/todos/completed', { headers: { Authorization: `Bearer ${token}` } });
import axios from './axios';

const getTask = () => {
  return axios.get('/tasks');
};

const createTask = (data) => {
  return axios.post('/tasks', data);
};

const updateTask = (id, data) => {
  return axios.put(`/tasks/${id}`, data);
};

const deleteTask = (id) => {
  return axios.delete(`/tasks/${id}`);
};

export { getTask, createTask, deleteTask, updateTask };

import axios from './axios';

const getTask = (param) => {
  return axios.get('/tasks' + param);
};

const createTask = (data) => {
  const updatedDueDate = addOneDayWithLocalTime(data.dueDate);
  const updatedData = { ...data, dueDate: updatedDueDate };
  console.log(updatedData)
  return axios.post('/tasks', updatedData);
};

const updateTask = (id, data) => {
  return axios.put(`/tasks/${id}`, data);
};

const deleteTask = (id) => {
  return axios.delete(`/tasks/${id}`);
};

const addOneDayWithLocalTime = (dateString) => {
  // Convert the date string to a Date object
  const date = new Date(dateString);
  
  // Add one day (24 hours) to the date
  date.setDate(date.getDate() + 1);
  
  // Set the time to 23:59:59 in local time
  date.setHours(23, 59, 59, 999); // Set milliseconds to 999 to get the end of the day
  
  // Get the local time components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export { getTask, createTask, deleteTask, updateTask };

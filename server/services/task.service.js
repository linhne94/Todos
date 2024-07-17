const db = require('../models/index.js');
const { Task } = db;

const createTask = async (data) => {
  const task = await Task.create(data);
  return task;
};

const getAllTasks = async (whereClause = {}) => {
  const tasks = await Task.findAll({
    where: whereClause,
  });
  return tasks;
};

const getTaskById = async (id) => {
  const task = await Task.findByPk(id);
  return task;
};

const updateTask = async (id, data) => {
  const task = await Task.findByPk(id);
  if (!task) {
    return null;
  }
  await task.update(data);
  return task;
};

const deleteTask = async (id) => {
  const task = await Task.findByPk(id);
  if (!task) {
    return null;
  }
  await task.destroy();
  return { message: 'Task deleted successfully' };
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

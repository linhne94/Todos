const db = require("../models/index.js");
const { Task, Category } = db;

const createTask = async (data) => {
  // console.log(data);
  const task = await Task.create(data);
  return task;
};

const getAllTasks = async (whereClause = {}) => {
  try {
    const tasks = await Task.findAll({
      where: whereClause,
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });
    return tasks;
  } catch (error) {
    throw new Error(`Error retrieving tasks: ${error.message}`);
  }
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
  return { message: "Task deleted successfully" };
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

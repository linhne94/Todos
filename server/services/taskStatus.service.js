const db = require('../models/index.js');
const { TaskStatus } = db;

const createTaskStatus = async (data) => {
    const taskStatus = await TaskStatus.create(data);
    return taskStatus;
};

const getAllTaskStatuses = async () => {
    const taskStatuses = await TaskStatus.findAll();
    return taskStatuses;
};

const getTaskStatusById = async (id) => {
    const taskStatus = await TaskStatus.findByPk(id);
    return taskStatus;
};

const updateTaskStatus = async (id, data) => {
    const taskStatus = await TaskStatus.findByPk(id);
    await taskStatus.update(data);
    return taskStatus;
};

const deleteTaskStatus = async (id) => {
    const taskStatus = await TaskStatus.findByPk(id);
    await taskStatus.destroy();
    return { message: 'Task Status deleted successfully' };
};

module.exports = {
    createTaskStatus,
    getAllTaskStatuses,
    getTaskStatusById,
    updateTaskStatus,
    deleteTaskStatus,
};
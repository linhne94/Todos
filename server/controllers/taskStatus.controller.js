const httpStatus = require('http-status');
const errors = require('../utils/api-error.js');
const response = require('../middlewares/response-handler.js');
const { 
  createTaskStatus, 
  getAllTaskStatuses, 
  getTaskStatusById, 
  updateTaskStatus, 
  deleteTaskStatus 
} = require('../services/taskStatus.service.js');

const responseHandler = response;
const { NotFoundError } = errors;

const addTaskStatus = async (req, res) => {
  const taskStatusDetails = await createTaskStatus(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(taskStatusDetails));
};

const getTaskStatuses = async (req, res) => {
  const taskStatuses = await getAllTaskStatuses();
  res.status(httpStatus.OK).send(responseHandler(taskStatuses));
};

const getTaskStatus = async (req, res) => {
  const taskStatus = await getTaskStatusById(req.params.taskStatusId);
  if (!taskStatus) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(taskStatus));
};

const updateTaskStatusDetails = async (req, res) => {
  const taskStatus = await updateTaskStatus(req.params.taskStatusId, req.body);
  if (!taskStatus) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(taskStatus));
};

const removeTaskStatus = async (req, res) => {
  const result = await deleteTaskStatus(req.params.taskStatusId);
  if (!result) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(result));
};

module.exports = {
  addTaskStatus,
  getTaskStatuses,
  getTaskStatus,
  updateTaskStatusDetails,
  removeTaskStatus,
};

const httpStatus = require('http-status');
const { NotFoundError } = require("../utils/api-error.js");
const responseHandler = require("../middlewares/response-handler.js");
const { 
  createTaskStatus, 
  getAllTaskStatuses, 
  getTaskStatusById, 
  updateTaskStatus, 
  deleteTaskStatus 
} = require('../services/taskStatus.service.js');


const addTaskStatus = async (req, res, next) => {
  try {
    const taskStatusDetails = await createTaskStatus(req.body);
    res.status(httpStatus.CREATED).send(responseHandler(taskStatusDetails));
  } catch (error) {
    next(error)
  }
};

const getTaskStatuses = async (req, res, next) => {
  try {
    const taskStatuses = await getAllTaskStatuses();
    res.status(httpStatus.OK).send(responseHandler(taskStatuses));
  } catch (error) {
    next(error)
  } 
};

const getTaskStatus = async (req, res, next) => {
  try {
    const taskStatus = await getTaskStatusById(req.params.taskStatusId);
    if (!taskStatus) {
      throw new NotFoundError();
    }
    res.status(httpStatus.OK).send(responseHandler(taskStatus));
  } catch (error) {
    next(error)
  }
};

const updateTaskStatusDetails = async (req, res, next) => {
  try {
    const taskStatus = await updateTaskStatus(req.params.taskStatusId, req.body);
    if (!taskStatus) {
      throw new NotFoundError();
    }
    res.status(httpStatus.OK).send(responseHandler(taskStatus));
  } catch (error) {
    next(error)
  }
};

const removeTaskStatus = async (req, res, next) => {
  try {
    const result = await deleteTaskStatus(req.params.taskStatusId);
    res.status(httpStatus.OK).send(responseHandler(result));
  } catch (error) {
    next(error)
  }
};

module.exports = {
  addTaskStatus,
  getTaskStatuses,
  getTaskStatus,
  updateTaskStatusDetails,
  removeTaskStatus,
};

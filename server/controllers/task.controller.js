const httpStatus = require('http-status');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

const { NotFoundError } = require('../utils/api-error.js');
const responseHandler = require('../middlewares/response-handler.js');
const { 
  createTask, 
  getAllTasks, 
  getTaskById, 
  updateTask, 
  deleteTask 
} = require('../services/task.service.js');

const addTask = async (req, res) => {
  const taskDetails = await createTask(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(taskDetails));
};
const getTasks = async (req, res, next) => {
  let timezone = req.header('Timezone')
  if (!timezone || !moment.tz.zone(timezone)) {
      timezone = moment.tz.guess();
  }

  try {
    let tasks;
    let startOfDay;
    let startOfTomorrow;
    const { timeRange } = req.query;
    
    switch (timeRange) {
      case 'today':
        startOfDay = moment().tz(timezone).startOf('day').add(7, 'hour').toDate();
        startOfTomorrow = moment().tz(timezone).startOf('day').add(1, 'day').add(7, 'hour').toDate();

        
        tasks = await getAllTasks({
          dueDate: {
            [Op.gte]: startOfDay,
            [Op.lte]: startOfTomorrow
          }
        });
        break;
        
        
        case 'tomorrow':
          startOfDay = moment().tz(timezone).startOf('day').add(1, 'day').add(7, 'hour').toDate();;
          startOfTomorrow = moment().tz(timezone).startOf('day').add(2, 'day').add(7, 'hour').toDate();
          
        tasks = await getAllTasks({
          dueDate: {
            [Op.gte]: startOfDay,
            [Op.lte]: startOfTomorrow
          }
        });
        break;
      
      case 'next_week':
         startOfDay = moment().add(1, 'week').startOf('week').add(1, 'day');
         startOfTomorrow = moment().add(1, 'week').endOf('week').add(1, 'day');
        
        tasks = await getAllTasks({
          dueDate: {
            [Op.gte]: startOfDay,
            [Op.lte]: startOfTomorrow
          }
        });
        break;
      
      case 'this_week':
        startOfDay = moment().startOf('week').add(1, 'day');
        startOfTomorrow = moment().endOf('week').add(1, 'day');
        
        tasks = await getAllTasks({
            dueDate: {
              [Op.gte]: startOfDay,
              [Op.lte]: startOfTomorrow
            }
        });
        break;
      default:
        throw new Error('Invalid time range');
    }

    if (!tasks || tasks.length === 0) {
      throw new NotFoundError('No tasks found for the specified time range');
    }

    res.status(httpStatus.OK).send(responseHandler(tasks));
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    next(error);
  }
};



const getTask = async (err, req, res, next) => {
  const task = await getTaskById(req.params.taskId);
  if (!task) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(task));
};

const updateTaskDetails = async (req, res) => {
  const task = await updateTask(req.params.taskId, req.body);
  if (!task) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(task));
};

const removeTask = async (req, res) => {
  const result = await deleteTask(req.params.taskId);
  if (!result) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(result));
};

module.exports = {
  addTask,
  getTasks,
  getTask,
  updateTaskDetails,
  removeTask,
};

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
    const { timeRange } = req.query;
    
    switch (timeRange) {
      case 'today':
        const startOfDay = moment().tz(timezone).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endOfDay = moment().tz(timezone).endOf('day').format('YYYY-MM-DD HH:mm:ss');
        
        tasks = await getAllTasks({
          where: {
            dueDate: {
              [Op.gte]: moment.tz(startOfDay, timezone).toDate(),
              [Op.lte]: moment.tz(endOfDay, timezone).toDate()
            }
          }
        });
        break;



      
      case 'tomorrow':
        const tomorrowStart = moment().add(1, 'day').startOf('day');
        const tomorrowEnd = moment().add(1, 'day').endOf('day');
        
        tasks = await getAllTasks({
          where: {
            dueDate: {
              [Op.between]: [tomorrowStart.toDate(), tomorrowEnd.toDate()]
            }
          }
        });
        break;
      
      case 'next_week':
        const nextWeekStart = moment().add(1, 'week').startOf('week');
        const nextWeekEnd = moment().add(1, 'week').endOf('week');
        
        tasks = await getAllTasks({
          where: {
            dueDate: {
              [Op.between]: [nextWeekStart.toDate(), nextWeekEnd.toDate()]
            }
          }
        });
        break;
      
      case 'this_week':
        const thisWeekStart = moment().startOf('week');
        const thisWeekEnd = moment().endOf('week');
        
        tasks = await getAllTasks({
          where: {
            dueDate: {
              [Op.between]: [thisWeekStart.toDate(), thisWeekEnd.toDate()]
            }
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

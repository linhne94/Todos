const httpStatus = require("http-status");
const { NotFoundError, UnauthorizedError } = require("../utils/api-error.js");
const { Op } = require("sequelize");
const moment = require("moment-timezone");

const responseHandler = require("../middlewares/response-handler.js");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../services/task.service.js");

// Hàm thêm task
const addTask = async (req, res, next) => {
  try {
    const taskDetails = await createTask(req.body);
    res.status(httpStatus.CREATED).send(responseHandler(taskDetails));
  } catch (error) {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi
  }
};

// Hàm lấy danh sách task
const getTasks = async (req, res, next) => {
  let timezone = req.header("Timezone");
  if (!timezone || !moment.tz.zone(timezone)) {
    timezone = moment.tz.guess();
  }

  try {
    let tasks = [];
    let startOfDay;
    let startOfTomorrow;
    const { timeRange } = req.query;

    if (!timeRange) {
      tasks = await getAllTasks();
    } else {
      switch (timeRange) {
        case "today":
          startOfDay = moment()
            .tz(timezone)
            .startOf("day")
            .add(7, "hour")
            .toDate();
          startOfTomorrow = moment()
            .tz(timezone)
            .startOf("day")
            .add(1, "day")
            .add(7, "hour")
            .toDate();

          tasks = await getAllTasks({
            dueDate: {
              [Op.gte]: startOfDay,
              [Op.lte]: startOfTomorrow,
            },
          });
          break;

        case "tomorrow":
          startOfDay = moment()
            .tz(timezone)
            .startOf("day")
            .add(1, "day")
            .add(7, "hour")
            .toDate();
          startOfTomorrow = moment()
            .tz(timezone)
            .startOf("day")
            .add(2, "day")
            .add(7, "hour")
            .toDate();

          tasks = await getAllTasks({
            dueDate: {
              [Op.gte]: startOfDay,
              [Op.lte]: startOfTomorrow,
            },
          });
          break;

        case "next-weeks":
          startOfDay = moment().add(1, "week").startOf("week").add(1, "day");
          startOfTomorrow = moment().add(1, "week").endOf("week").add(1, "day");

          tasks = await getAllTasks({
            dueDate: {
              [Op.gte]: startOfDay,
              [Op.lte]: startOfTomorrow,
            },
          });
          break;

        case "this-week":
          startOfDay = moment().startOf("week").add(1, "day");
          startOfTomorrow = moment().endOf("week").add(1, "day");

          tasks = await getAllTasks({
            dueDate: {
              [Op.gte]: startOfDay,
              [Op.lte]: startOfTomorrow,
            },
          });
          break;

        default:
          throw new Error("Invalid time range");
      }
    }

    res.status(httpStatus.OK).send(responseHandler(tasks));
  } catch (error) {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi
  }
};

// Hàm lấy task theo ID
const getTask = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.taskId);
    if (!task) {
      throw new NotFoundError('No task found');
    }
    res.status(httpStatus.OK).send(responseHandler(task));
  } catch (error) {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi
  }
};

// Hàm cập nhật thông tin task
const updateTaskDetails = async (req, res, next) => {
  try {
    const task = await updateTask(req.params.taskId, req.body);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    res.status(httpStatus.OK).send(responseHandler(task));
  } catch (error) {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi
  }
};

// Hàm xóa task
const removeTask = async (req, res, next) => {
  try {
    const result = await deleteTask(req.params.taskId);
    if (!result) {
      throw new NotFoundError('No task found');
    }
    res.status(httpStatus.OK).send(responseHandler(result));
  } catch (error) {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi
  }
};

module.exports = {
  addTask,
  getTasks,
  getTask,
  updateTaskDetails,
  removeTask,
};

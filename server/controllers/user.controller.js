const httpStatus = require("http-status");
const { NotFoundError, UnauthorizedError } = require("../utils/api-error.js");
const { Op } = require("sequelize");
const moment = require("moment-timezone");

const responseHandler = require("../middlewares/response-handler.js");
const {
  createUser,
} = require("../services/user.service.js");

// Hàm thêm task
const addUser = async (req, res, next) => {
  try {
    const userDetails = await createUser(req.body);
    res.status(httpStatus.CREATED).send(responseHandler(userDetails));
  } catch (error) {
    next(error); // Chuyển lỗi cho middleware xử lý lỗi
  }
};

module.exports = {
    addUser
};

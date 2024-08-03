const db = require("../models/index.js");
const { User, Category } = db;

const createUser = async (data) => {
  // console.log(data);
  const user = await User.create(data);
  return user;
};

module.exports = {
  createUser,
};

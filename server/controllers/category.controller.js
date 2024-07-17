const httpStatus = require('http-status');
const errors = require('../utils/api-error.js');
const response = require('../middlewares/response-handler.js');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../services/category.service.js');

const responseHandler = response;
const { NotFoundError } = errors;

const addCategory = async (req, res) => {
  const categoryDetails = await createCategory(req.body);
  res.status(httpStatus.CREATED).send(responseHandler(categoryDetails));
};

const getCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.status(httpStatus.OK).send(responseHandler(categories));
};

const getCategory = async (req, res) => {
  const category = await getCategoryById(req.params.categoryId);
  if (!category) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(category));
};

const updateCategoryDetails = async (req, res) => {
  const category = await updateCategory(req.params.categoryId, req.body);
  if (!category) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(category));
};

const removeCategory = async (req, res) => {
  const result = await deleteCategory(req.params.categoryId);
  if (!result) {
    throw new NotFoundError();
  }
  res.status(httpStatus.OK).send(responseHandler(result));
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategoryDetails,
  removeCategory,
};
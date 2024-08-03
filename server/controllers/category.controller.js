const httpStatus = require('http-status');
const errors = require('../utils/api-error.js');
const response = require('../middlewares/response-handler.js');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../services/category.service.js');

const responseHandler = response;
const { NotFoundError } = errors;

const addCategory = async (req, res, next) => {
  try {
    const categoryDetails = await createCategory(req.body);
    res.status(httpStatus.CREATED).send(responseHandler(categoryDetails));
  } catch (error) {
    next(error)
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.status(httpStatus.OK).send(responseHandler(categories));
  } catch (error) {
    next(error)
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.categoryId);
    if (!category) {
      throw new NotFoundError();
    }
    res.status(httpStatus.OK).send(responseHandler(category));
  } catch (error) {
    next(error)
  }
};

const updateCategoryDetails = async (req, res, next) => {
  try {
    const category = await updateCategory(req.params.categoryId, req.body);
    if (!category) {
      throw new NotFoundError();
    }
    res.status(httpStatus.OK).send(responseHandler(category));
  } catch (error) {
    next(error)
  } 
};

const removeCategory = async (req, res, next) => {
  try {
    const result = await deleteCategory(req.params.categoryId);
    res.status(httpStatus.OK).send(responseHandler(result));
  } catch (error) {
    next(error)
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategoryDetails,
  removeCategory,
};
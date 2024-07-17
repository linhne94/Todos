const db = require('../models/index.js');
const { Category } = db;

const createCategory = async (data) => {
    const category = await Category.create(data);
    return category;
};

const getAllCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};

const getCategoryById = async (id) => {
    const category = await Category.findByPk(id);
    return category;
};

const updateCategory = async (id, data) => {
    const category = await Category.findByPk(id);
    await category.update(data);
    return category;
};

const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    await category.destroy();
    return { message: 'Category deleted successfully' };
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
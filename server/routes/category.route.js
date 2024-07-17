var express = require('express');
const { addCategory, getCategories, getCategory, updateCategoryDetails, removeCategory } = require('../controllers/category.controller.js');

const router = express.Router();

/**
 * @route POST /categories
 * @desc Add a new category
 * @access Public
 */
router.post('/', addCategory);

/**
 * @route GET /categories
 * @desc Get all categories
 * @access Public
 */
router.get('/', getCategories);

/**
 * @route GET /categories/:categoryId
 * @desc Get category by ID
 * @access Public
 */
router.get('/:categoryId', getCategory);

/**
 * @route PUT /categories/:categoryId
 * @desc Update category by ID
 * @access Public
 */
router.put('/:categoryId', updateCategoryDetails);

/**
 * @route DELETE /categories/:categoryId
 * @desc Delete category by ID
 * @access Public
 */
router.delete('/:categoryId', removeCategory);

module.exports = router;
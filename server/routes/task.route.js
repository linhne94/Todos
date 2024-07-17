var express = require('express');
const { 
  addTask, 
  getTasks, 
  getTask, 
  updateTaskDetails, 
  removeTask 
} = require('../controllers/task.controller.js');

const router = express.Router();

/**
 * @route POST /tasks
 * @desc Add a new task
 * @access Public
 */
router.post('/', addTask);

/**
 * @route GET /tasks
 * @desc Get all tasks
 * @access Public
 */
router.get('/', getTasks);

/**
 * @route GET /tasks/:taskId
 * @desc Get task by ID
 * @access Public
 */
router.get('/:taskId', getTask);

/**
 * @route PUT /tasks/:taskId
 * @desc Update task by ID
 * @access Public
 */
router.put('/:taskId', updateTaskDetails);

/**
 * @route DELETE /tasks/:taskId
 * @desc Delete task by ID
 * @access Public
 */
router.delete('/:taskId', removeTask);

module.exports = router;

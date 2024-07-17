var express = require('express');
const { 
  addTaskStatus, 
  getTaskStatuses, 
  getTaskStatus, 
  updateTaskStatusDetails, 
  removeTaskStatus 
} = require('../controllers/taskStatus.controller.js');

const router = express.Router();

/**
 * @route POST /taskStatuses
 * @desc Add a new task status
 * @access Public
 */
router.post('/', addTaskStatus);

/**
 * @route GET /taskStatuses
 * @desc Get all task statuses
 * @access Public
 */
router.get('/', getTaskStatuses);

/**
 * @route GET /taskStatuses/:taskStatusId
 * @desc Get task status by ID
 * @access Public
 */
router.get('/:taskStatusId', getTaskStatus);

/**
 * @route PUT /taskStatuses/:taskStatusId
 * @desc Update task status by ID
 * @access Public
 */
router.put('/:taskStatusId', updateTaskStatusDetails);

/**
 * @route DELETE /taskStatuses/:taskStatusId
 * @desc Delete task status by ID
 * @access Public
 */
router.delete('/:taskStatusId', removeTaskStatus);

module.exports = router;

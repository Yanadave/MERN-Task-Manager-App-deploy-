const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');

const router = require('express').Router();


// to GET all the task
router.get('/',fetchAllTasks)

// to create a task we use POST method
router.post('/',createTask);

// to update a task we use PUT method
router.put('/:id',updateTaskById);

// to delete a task we use delete method
router.delete('/:id',deleteTaskById);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    getTodoLists,
    addTodoList,
    addTaskToList,
    updateTaskStatus
} = require('../controllers/todo.controller');

router.get('/api/todos', getTodoLists);
router.post('/api/todos', addTodoList);
router.post('/api/todos/:listId/tasks', addTaskToList);
router.put('/api/todos/:listId/tasks/:taskId', updateTaskStatus);

module.exports = router;

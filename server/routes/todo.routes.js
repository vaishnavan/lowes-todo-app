const express = require('express');
const { createTodo, getAllTodos } = require('../controller/todo.controller');

const router = express.Router();

router.post('/create-todo', createTodo);
router.get('/get-todo', getAllTodos);

module.exports = router;

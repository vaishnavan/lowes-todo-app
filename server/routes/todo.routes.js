const express = require('express');
const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require('../controller/todo.controller');

const router = express.Router();

router.post('/create-todo', createTodo);
router.get('/get-todo', getAllTodos);
router.put('/update-todo/:id', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);

module.exports = router;

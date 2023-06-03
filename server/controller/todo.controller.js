const Todo = require('../model/todo.model');

const createTodo = async (req, res) => {
  try {
    const { itemName, completed } = req.body;
    const todo = new Todo({
      itemName,
      completed,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a Todo' });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Todos' });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
};

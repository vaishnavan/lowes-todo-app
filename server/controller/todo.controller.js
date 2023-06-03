/* eslint-disable consistent-return */
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

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { itemName, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Todo' });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Todo' });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};

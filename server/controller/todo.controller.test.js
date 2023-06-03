const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require('./todo.controller');
const Todo = require('../model/todo.model');

describe('createTodo', () => {
  let req;
  let res;
  let todoSaveSpy;

  beforeEach(() => {
    req = {
      body: {
        itemName: 'Test Todo',
        completed: false,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Todo, 'create');

    todoSaveSpy = jest.spyOn(Todo.prototype, 'save').mockResolvedValue({
      _id: '123',
      itemName: 'Test Todo',
      completed: false,
    });
  });

  afterEach(() => {
    Todo.create.mockRestore();
    todoSaveSpy.mockRestore();
  });

  it('should create a new Todo and return it in the response with status 201', async () => {
    await createTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      _id: '123',
      itemName: 'Test Todo',
      completed: false,
    });
  });

  it('should handle errors and return a response with status 500 and error message', async () => {
    Todo.prototype.save = jest
      .fn()
      .mockRejectedValue(new Error('Failed to create a Todo'));

    await createTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create a Todo' });
  });
});

describe('getAllTodos', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should retrieve all Todos and return them in the response with status 201', async () => {
    Todo.find = jest.fn().mockResolvedValue([
      { _id: '123', itemName: 'Todo 1', completed: false },
      { _id: '456', itemName: 'Todo 2', completed: true },
    ]);

    await getAllTodos(req, res);

    expect(Todo.find).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith([
      { _id: '123', itemName: 'Todo 1', completed: false },
      { _id: '456', itemName: 'Todo 2', completed: true },
    ]);
  });

  it('should handle errors and return a response with status 500 and error message', async () => {
    Todo.find = jest
      .fn()
      .mockRejectedValue(new Error('Failed to retrieve Todos'));

    await getAllTodos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      error: 'Failed to retrieve Todos',
    });
  });
});

describe('updateTodo', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: { id: '123' },
      body: {
        itemName: 'Updated Todo',
        completed: true,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should update an existing Todo and return it in the response', async () => {
    const updatedTodo = {
      _id: '123',
      itemName: 'Updated Todo',
      completed: true,
    };
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTodo);

    await updateTodo(req, res);

    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
      '123',
      { itemName: 'Updated Todo', completed: true },
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith(updatedTodo);
  });

  it('should handle updating a non-existing Todo and return a response with status 404', async () => {
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await updateTodo(req, res);

    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
      '123',
      { itemName: 'Updated Todo', completed: true },
      { new: true }
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Todo not found' });
  });

  it('should handle errors and return a response with status 500 and error message', async () => {
    Todo.findByIdAndUpdate = jest
      .fn()
      .mockRejectedValue(new Error('Failed to update Todo'));

    await updateTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update Todo' });
  });
});

describe('deleteTodo', () => {
  let req;
  let res;

  beforeEach(() => {
    // Create mock request and response objects
    req = {
      params: { id: '123' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should delete an existing Todo and return it in the response', async () => {
    const deletedTodo = {
      _id: '123',
      itemName: 'Deleted Todo',
      completed: true,
    };
    Todo.findByIdAndDelete = jest.fn().mockResolvedValue(deletedTodo);

    await deleteTodo(req, res);

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('123');

    expect(res.json).toHaveBeenCalledWith(deletedTodo);
  });

  it('should handle deleting a non-existing Todo and return a response with status 404', async () => {
    Todo.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await deleteTodo(req, res);

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Todo not found' });
  });

  it('should handle errors and return a response with status 500 and error message', async () => {
    Todo.findByIdAndDelete = jest
      .fn()
      .mockRejectedValue(new Error('Failed to delete Todo'));

    await deleteTodo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete Todo' });
  });
});

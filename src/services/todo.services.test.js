import axios from 'axios';

const {
  getTodoService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
} = require('./todo.services');

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('getTodoService', () => {
  it('should return the API response', async () => {
    const responseData = { result: 'Test response' };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await getTodoService();

    expect(result).toEqual({ result: responseData });
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/get-todo/
      )
    );
  });

  it('should throw an error if the API call fails', async () => {
    const errorMessage = 'API error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(getTodoService()).rejects.toThrowError(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/get-todo/
      )
    );
  });
});

describe('createTodoService', () => {
  it('should create a new todo and return the API response', async () => {
    const requestData = { itemName: 'Test Todo', completed: false };
    const responseData = { result: 'Test response' };

    axios.post = jest.fn().mockResolvedValue({ data: responseData });

    const result = await createTodoService(requestData);

    expect(result).toEqual({ result: responseData });
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/create-todo/
      ),
      requestData
    );
  });

  it('should throw an error if the API call fails', async () => {
    const requestData = { itemName: 'Test Todo', completed: false };

    axios.post = jest.fn().mockRejectedValue(new Error('API error'));

    await expect(createTodoService(requestData)).rejects.toThrowError(
      'API error'
    );
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/create-todo/
      ),
      requestData
    );
  });
});

describe('updateTodoService', () => {
  it('should update a todo and return the API response', async () => {
    const requestData = { itemName: 'Updated Todo', completed: true };
    const responseData = { result: 'Test response' };
    const id = 'todo-id';

    axios.put = jest.fn().mockResolvedValue({ data: responseData });

    const result = await updateTodoService(requestData, id);

    expect(result).toEqual({ result: responseData });
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/update-todo\/todo-id/
      ),
      requestData
    );
  });

  it('should throw an error if the API call fails', async () => {
    const requestData = { itemName: 'Updated Todo', completed: true };
    const id = 'todo-id';

    axios.put = jest.fn().mockRejectedValue(new Error('API error'));

    await expect(updateTodoService(requestData, id)).rejects.toThrowError(
      'API error'
    );
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/update-todo\/todo-id/
      ),
      requestData
    );
  });
});

describe('deleteTodoService', () => {
  it('should delete a todo and return the API response', async () => {
    const id = 'todo-id';
    const responseData = { result: 'Test response' };

    axios.delete = jest.fn().mockResolvedValue({ data: responseData });

    const result = await deleteTodoService(id);

    expect(result).toEqual({ result: responseData });
    expect(axios.delete).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/delete-todo\/todo-id/
      )
    );
  });

  it('should throw an error if the API call fails', async () => {
    const id = 'todo-id';

    axios.delete = jest.fn().mockRejectedValue(new Error('API error'));

    await expect(deleteTodoService(id)).rejects.toThrowError('API error');
    expect(axios.delete).toHaveBeenCalledWith(
      expect.stringMatching(
        /https:\/\/lowes-todo-app\.vercel\.app\/v1\/api\/delete-todo\/todo-id/
      )
    );
  });
});

import axios from 'axios';

const API_URL = 'https://lowes-todo-app.vercel.app/v1/api';

const createTodoService = async (data) => {
  try {
    const apiResponse = await axios.post(`${API_URL}/create-todo`, data);
    return {
      result: apiResponse.data,
    };
  } catch (error) {
    throw new Error('API error');
  }
};

const getTodoService = async () => {
  try {
    const apiResponse = await axios.get(`${API_URL}/get-todo`);
    return {
      result: apiResponse.data,
    };
  } catch (error) {
    throw new Error('API error');
  }
};

const updateTodoService = async (data, id) => {
  try {
    const apiResponse = await axios.put(`${API_URL}/update-todo/${id}`, data);
    return {
      result: apiResponse.data,
    };
  } catch (error) {
    throw new Error('API error');
  }
};

const deleteTodoService = async (id) => {
  try {
    const apiResponse = await axios.delete(`${API_URL}/delete-todo/${id}`);
    return {
      result: apiResponse.data,
    };
  } catch (error) {
    throw new Error('API error');
  }
};

export {
  getTodoService,
  createTodoService,
  updateTodoService,
  deleteTodoService,
};

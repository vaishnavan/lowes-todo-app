import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTodoService } from '../services/todo.services';

export const todoContext = createContext();

function TodoProvider({ children }) {
  const [todoData, setTodoData] = useState();

  useEffect(() => {
    getTodoService()
      .then((res) => {
        setTodoData(res.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <todoContext.Provider value={{ todoData, setTodoData }}>
      {children}
    </todoContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.node,
};

export default TodoProvider;

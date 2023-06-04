import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getTodoService } from '../services/todo.services';

export const todoContext = createContext();

function TodoProvider({ children }) {
  const [todoData, setTodoData] = useState();
  const [itemName, setItemName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      getTodoService()
        .then((res) => {
          setLoading(false);
          setTodoData(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <todoContext.Provider
      value={{ todoData, setTodoData, itemName, setItemName, loading }}
    >
      {children}
    </todoContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.node,
};

export default TodoProvider;

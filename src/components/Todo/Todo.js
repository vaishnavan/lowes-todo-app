/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import { todoContext } from '../../context/TodoProvider';
import {
  createTodoService,
  deleteTodoService,
  updateTodoService,
} from '../../services/todo.services';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import Header from '../Header/Header';

function Todo() {
  const { todoData, setTodoData, itemName, setItemName } =
    useContext(todoContext);
  const [btnToggle, setBtnToggle] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (event) => {
    setItemName(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const obj = {
      itemName,
    };
    if (editId) {
      updateTodoService(obj, editId)
        .then(() => {
          const updateData = todoData.map((data) => {
            if (data._id === editId) {
              return { ...data, itemName };
            }
            return data;
          });
          setTodoData(updateData);
          toast('Updated successfully');
          setItemName('');
          setBtnToggle(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createTodoService(obj)
        .then((res) => {
          setTodoData([...todoData, res.result]);
          toast('Added successfully');
          setItemName('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRemove = (id) => {
    const filterData = todoData.filter((data) => data._id !== id);
    deleteTodoService(id)
      .then(() => {
        setTodoData(filterData);
        toast('Deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    const findItem = todoData.find((data) => data._id === id);
    setItemName(findItem.itemName);
    setEditId(findItem._id);
    setBtnToggle(true);
  };

  const handleCheckBox = (id) => {
    const findData = todoData.find((findItem) => findItem._id === id);
    const obj = {
      itemName: findData.itemName,
      completed: !findData.completed,
    };
    updateTodoService(obj, id)
      .then(() => {
        const updateCheck = todoData.map((data) => {
          if (data._id === id) {
            return { ...data, completed: !data.completed };
          }
          return data;
        });
        setTodoData(updateCheck);
        toast(`${obj.completed ? 'Completed' : 'UnCompleted'} Successfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container style={{ marginTop: '2rem' }} maxWidth="sm">
      <Header />
      <TodoForm
        handleChange={handleChange}
        handleAdd={handleAdd}
        btnToggle={btnToggle}
      />
      <TodoList
        handleEdit={handleEdit}
        handleRemove={handleRemove}
        handleCheckBox={handleCheckBox}
      />
    </Container>
  );
}

export default Todo;

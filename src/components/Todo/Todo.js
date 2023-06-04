/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';
import { todoContext } from '../../context/TodoProvider';
import {
  createTodoService,
  updateTodoService,
} from '../../services/todo.services';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import Header from '../Header/Header';
import {
  ADD_SUCCESS,
  COMPLETED,
  UNCOMPLETED,
  UPDATE_SUCCESS,
} from '../../constants/constants';
import { StyledOuterFlow } from './Todo.styled';

function Todo() {
  const { todoData, setTodoData, itemName, setItemName } =
    useContext(todoContext);
  const [btnToggle, setBtnToggle] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (event) => {
    setItemName(event.target.value);
  };

  const handleAdd = (event) => {
    if (event.cancelable) {
      event.preventDefault();
    }
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
          toast(UPDATE_SUCCESS);
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
          toast(ADD_SUCCESS);
          setItemName('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        toast(`${obj.completed ? COMPLETED : UNCOMPLETED}`);
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
      <StyledOuterFlow>
        <TodoList handleEdit={handleEdit} handleCheckBox={handleCheckBox} />
      </StyledOuterFlow>
    </Container>
  );
}

export default Todo;

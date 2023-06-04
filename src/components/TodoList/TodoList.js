/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as UpdateIcon,
  CheckBoxOutlineBlankOutlined,
  CheckBox,
} from '@mui/icons-material';
import { todoContext } from '../../context/TodoProvider';
import { REMOVE_SUCCESS } from '../../constants/constants';
import { deleteTodoService } from '../../services/todo.services';
import DialogBox from '../DialogBox/DialogBox';

function TodoList({ handleEdit, handleCheckBox }) {
  const { todoData, loading, setTodoData } = useContext(todoContext);
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleDeleteConfirmation = (todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleRemove = (todo) => {
    const filterData = todoData.filter((data) => data._id !== todo._id);
    deleteTodoService(todo._id)
      .then(() => {
        setTodoData(filterData);
        toast(REMOVE_SUCCESS);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <DialogBox
        handleRemove={handleRemove}
        open={open}
        setOpen={setOpen}
        selectedTodo={selectedTodo}
      />
      <List>
        {loading && (
          <Typography
            variant="h4"
            component="h2"
            align="center"
            style={{ textAlign: 'center', color: '#1976d2' }}
          >
            Loading...
          </Typography>
        )}
        {todoData && !todoData.length && (
          <Typography
            variant="h4"
            component="h3"
            align="center"
            style={{ textAlign: 'center', color: '#1976d2' }}
          >
            No Item Available
          </Typography>
        )}
        {todoData &&
          todoData.map((todo) => (
            <ListItem key={todo._id}>
              <IconButton
                edge="end"
                aria-label="check"
                style={{ margin: '0 2px' }}
                onClick={() => handleCheckBox(todo._id)}
              >
                {todo.completed ? (
                  <CheckBox />
                ) : (
                  <CheckBoxOutlineBlankOutlined />
                )}
              </IconButton>
              <ListItemText
                primary={todo.itemName}
                style={
                  todo.completed
                    ? { textDecoration: 'line-through' }
                    : { textDecoration: 'none' }
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => handleDeleteConfirmation(todo)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon style={{ color: 'red' }} />
                </IconButton>
                <IconButton
                  onClick={() => handleEdit(todo._id)}
                  edge="end"
                  aria-label="update"
                  style={{ margin: '0 15px' }}
                >
                  <UpdateIcon style={{ color: '#1976d2' }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </>
  );
}

TodoList.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
};

export default TodoList;

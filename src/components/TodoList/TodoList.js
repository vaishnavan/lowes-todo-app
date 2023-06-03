/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as UpdateIcon,
  CheckBoxOutlineBlankOutlined,
  CheckBox,
} from '@mui/icons-material';
import { todoContext } from '../../context/TodoProvider';

function TodoList({ handleEdit, handleCheckBox, handleRemove }) {
  const { todoData, loading } = useContext(todoContext);
  return (
    <List>
      {loading && (
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>Loading...</h2>
      )}
      {todoData && !todoData.length && (
        <h3 style={{ textAlign: 'center', color: '#1976d2' }}>
          No Item Available
        </h3>
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
              {todo.completed ? <CheckBox /> : <CheckBoxOutlineBlankOutlined />}
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
                onClick={() => handleRemove(todo._id)}
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
  );
}

TodoList.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default TodoList;

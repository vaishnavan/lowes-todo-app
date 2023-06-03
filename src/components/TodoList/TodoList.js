/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as UpdateIcon,
  CheckBoxOutlineBlankOutlined,
  CheckBox,
} from '@mui/icons-material';
import { todoContext } from '../../context/TodoProvider';
import {
  createTodoService,
  deleteTodoService,
  updateTodoService,
} from '../../services/todo.services';

function TodoApp() {
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
        console.log('deleted successfully');
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container style={{ marginTop: '2rem' }} maxWidth="sm">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Todo Task List
      </Typography>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}
      >
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={itemName}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          style={{ width: '10rem' }}
          onClick={handleAdd}
        >
          {btnToggle ? 'Update' : 'Add Item'}
        </Button>
      </form>

      <List>
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
                >
                  <UpdateIcon style={{ color: 'blue' }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Container>
  );
}

export default TodoApp;

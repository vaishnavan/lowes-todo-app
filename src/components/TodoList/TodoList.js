/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
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
  Update as UpdateIcon,
} from '@mui/icons-material';
import { todoContext } from '../../context/TodoProvider';
import {
  createTodoService,
  deleteTodoService,
} from '../../services/todo.services';

function TodoApp() {
  const { todoData, setTodoData, itemName, setItemName } =
    useContext(todoContext);

  const handleChange = (event) => {
    setItemName(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const obj = {
      itemName,
    };
    createTodoService(obj)
      .then((res) => {
        setTodoData([...todoData, res.result]);
        setItemName('');
      })
      .catch((err) => {
        console.log(err);
      });
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
          Add Item
        </Button>
      </form>

      <List>
        {todoData &&
          todoData.map((todo) => (
            <ListItem key={todo._id}>
              <ListItemText primary={todo.itemName} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => handleRemove(todo._id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end" aria-label="update">
                  <UpdateIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Container>
  );
}

export default TodoApp;

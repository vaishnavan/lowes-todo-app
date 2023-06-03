import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { todoContext } from '../../context/TodoProvider';

function TodoForm({ handleAdd, handleChange, btnToggle }) {
  const { itemName } = useContext(todoContext);
  return (
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
  );
}

TodoForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  btnToggle: PropTypes.bool.isRequired,
};

export default TodoForm;

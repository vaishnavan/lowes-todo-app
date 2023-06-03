/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Typography } from '@mui/material';

function Header() {
  return (
    <header>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Todo Task List
      </Typography>
    </header>
  );
}

export default Header;

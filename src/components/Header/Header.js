/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Typography } from '@mui/material';
import { HEADER_TITLE } from '../../constants/constants';

function Header() {
  return (
    <header>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        {HEADER_TITLE}
      </Typography>
    </header>
  );
}

export default Header;

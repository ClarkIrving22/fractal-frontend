import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({
    text, handleClick
}) {
  return (
    <Stack spacing={0} direction="row">
      <Button variant="contained" onClick={handleClick}>{text}</Button>
    </Stack>
  );
}
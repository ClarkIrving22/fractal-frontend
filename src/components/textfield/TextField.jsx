import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({
    label ='',
    textInput = '',
    InputHandleOnChange,
    width
}) {
  return (
    <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: {width} },
        }}
        noValidate
        autoComplete="off"
    >

        <TextField
            label={label}
            id="outlined-size-small"
            size="small"
            value={textInput}
            onChange={InputHandleOnChange}
        />
    </Box>
  );
}
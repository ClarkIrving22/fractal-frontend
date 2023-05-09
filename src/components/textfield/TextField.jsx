import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({
    label,
    textInput,
    InputHandleOnChange,
    width,
    isDisabled,
    type,
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
            disabled={isDisabled}
            label={label}
            id="outlined-size-small"
            size="small"
            value={textInput}
            onChange={(event) => {
                InputHandleOnChange(event.target.value);
            }}
            type={type}
            inputProps={type==='number' ? { min: 1} : {}}
        />
    </Box>
  );
}
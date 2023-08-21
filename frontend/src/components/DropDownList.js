import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDownList( props ) {
  const { s , handleChange } = props;

  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Set</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={s}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={1}>Set - 1</MenuItem>
          <MenuItem value={2}>Set - 2</MenuItem>
          <MenuItem value={3}>Set - 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
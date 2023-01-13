import { SelectChangeEvent, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react'

type Props = {}

const Sortbar = (props: Props) => {
  const [sort, setSort] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By Price</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort By Price"
          onChange={handleChange}
        >
          <MenuItem value={1}>Low to High</MenuItem>
          <MenuItem value={2}>High to Low</MenuItem>

        </Select>
      </FormControl>
    </Box>
  )
}

export default Sortbar;
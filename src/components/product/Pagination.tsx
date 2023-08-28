import React from 'react';
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Pagination,
} from '@mui/material';

const PaginationItem = ({ setRowPerPage, rowPerPage }: any) => {
  const handleChange = (event: SelectChangeEvent) => {
    setRowPerPage(event.target.value as string);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Select
        id="pagination"
        value={rowPerPage}
        onChange={handleChange}
        sx={{
          color: '#1C4A14',
          '& fieldset': {
            borderColor: '#A2C18A !important',
            borderWidth: '1px !important',
          },
          '& svg': {
            color: '#417438',
          },
        }}
      >
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
      <Pagination
        count={10}
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            fontSize: '20px',
          },
          '& button': {
            padding: { md: '12px' },
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#ccc',
            },
          },
          '& li': {
            margin: { md: '0 8px' },
          },
          '& .Mui-selected': {
            color: '#fff',
            backgroundColor: '#417438 !important',
            '&:hover': {
              backgroundColor: '#417438 !important',
            },
          },
        }}
      />
    </Box>
  );
};

export default PaginationItem;

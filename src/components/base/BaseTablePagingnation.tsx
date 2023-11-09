'use client';

import { PAGE_SIZE_OPTIONS } from "@/constants/common.constant";
import { Box, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";

export interface ITablePagingProps {
  count: number,
  onPageChange?: () => void,
  page: number,
  size?: 'small' | 'medium' | 'large'
}

const BaseTablePagingnation: FunctionComponent<ITablePagingProps> = ({
  count,
  page,
  onPageChange,
  size
}) => {
  const [rowPerPage, setRowPerPage] = useState(5);
  const handleRowPerPageChange = (event: SelectChangeEvent<number>) => {
    const { value } = event.target;
    setRowPerPage(Number(value));
  }
  return(
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0.5rem 1rem' }}>
      <Typography color='#6C757D' fontSize={14}>Showing 1 to 10 of {count} entries</Typography>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Typography color='#6C757D' fontSize={14}>Display</Typography>
          <Select value={rowPerPage} size="small" onChange={handleRowPerPageChange}>
            {PAGE_SIZE_OPTIONS.map((item, index) => (<MenuItem key={index} value={item}>{item}</MenuItem>))}
          </Select>
        </Box>
        <Pagination
          count={count} 
          page={page} 
          onChange={onPageChange}
          size={size}
          variant="text"
          shape="rounded"
          showFirstButton
          showLastButton
          renderItem={(item) => {
            return (
              <PaginationItem 
                classes='table-page-item'
                {...item} 
                sx={{ 
                  "&.Mui-selected": {
                    color: '#fff', 
                    backgroundColor: '#FFC909',
                    '&:hover': {
                      color: '#fff', 
                      backgroundColor: '#FFC909',
                    }
                  }
                }}/>
            )
          }}
        />
      </Box>
    </Box>
  );
}

export default BaseTablePagingnation;
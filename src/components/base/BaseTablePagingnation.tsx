'use client';

import {DEFAULT_PAGE_LIMIT, PAGE_SIZE_OPTIONS} from "@/constants/common.constant";
import { Box, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import {ChangeEvent, FunctionComponent, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

export interface ITablePagingProps {
  count: number,
  page: number,
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void,
  size?: 'small' | 'medium' | 'large'
}

const BaseTablePagingnation: FunctionComponent<ITablePagingProps> = ({
  count,
  page,
  size,
  onPageChange
}) => {
  const [rowPerPage, setRowPerPage] = useState(DEFAULT_PAGE_LIMIT);

  const router = useRouter();
  const pathname = usePathname();
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
                {...item} 
                sx={{ 
                  '&.Mui-selected': {
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
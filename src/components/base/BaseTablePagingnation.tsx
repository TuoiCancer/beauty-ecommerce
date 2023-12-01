'use client'

import {
	DEFAULT_PAGE_LIMIT,
	PAGE_SIZE_OPTIONS
} from '@/constants/common.constant'
import {
	Box,
	MenuItem,
	Pagination,
	PaginationItem,
	Select,
	SelectChangeEvent,
	Typography
} from '@mui/material'
import {
	ChangeEvent,
	ChangeEventHandler,
	FunctionComponent,
	useState
} from 'react';

function calculateDisplayRange(currentPage: number, itemsPerPage: number, totalRecords: number) {
	const startIndex = (currentPage - 1) * itemsPerPage + 1;
	const endIndex = Math.min(currentPage * itemsPerPage, totalRecords);
	return { startIndex, endIndex };
}

export interface ITablePagingProps {
	count: number
	page: number
	totalRecords: number
	onPageChange: (event: ChangeEvent<unknown>, page: number) => void
	size?: 'small' | 'medium' | 'large'
	onRowsPerPageChange: (event: SelectChangeEvent<number>) => void
}

const BaseTablePagingnation: FunctionComponent<ITablePagingProps> = ({
	count,
	page,
	size,
	totalRecords,
	onPageChange,
	onRowsPerPageChange
}) => {
	const [rowPerPage, setRowPerPage] = useState(DEFAULT_PAGE_LIMIT);

	const handleRowPerPageChange = (event: SelectChangeEvent<number>) => {
		setRowPerPage(event.target.value as number)
		onRowsPerPageChange(event)
	}

	const { startIndex, endIndex } = calculateDisplayRange(page, rowPerPage, totalRecords);

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '0.5rem 1rem',
				position: 'fixed',
				bottom: 0,
				width: 'calc(100% - 268px)',
				backgroundColor: '#fff'
			}}

		>
			<Typography color='#6C757D' fontSize={14}>
				Showing {startIndex} to {endIndex} of {totalRecords} entries
			</Typography>
			<Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
					<Typography color='#6C757D' fontSize={14}>
						Display
					</Typography>
					<Select
						value={rowPerPage}
						size='small'
						onChange={handleRowPerPageChange}
					>
						{PAGE_SIZE_OPTIONS.map((item, index) => (
							<MenuItem key={index} value={item}>
								{item}
							</MenuItem>
						))}
					</Select>
				</Box>
				<Pagination
					count={count}
					page={page}
					onChange={onPageChange}
					size={size}
					variant='text'
					shape='rounded'
					showFirstButton
					showLastButton
					renderItem={item => {
						return (
							<PaginationItem
								{...item}
								sx={{
									'&.Mui-selected': {
										color: '#fff',
										backgroundColor: '#FFC909',
										'&:hover': {
											color: '#fff',
											backgroundColor: '#FFC909'
										}
									}
								}}
							/>
						)
					}}
				/>
			</Box>
		</Box>
	)
}

export default BaseTablePagingnation

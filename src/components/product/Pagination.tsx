import React from 'react'
import {
	Box,
	MenuItem,
	Select,
	SelectChangeEvent,
	Pagination,
	Typography
} from '@mui/material'

const PaginationItem = ({
	page,
	setPage,
	setRowPerPage,
	rowPerPage,
	paginationMeta,
	dictionary
}: any) => {
	const handleChange = (event: SelectChangeEvent) => {
		setRowPerPage(event.target.value as string)
	}
	return (
		<Box
			sx={{
				width: { xs: '100%' },
				display: 'flex',
				flexDirection: { xs: 'column', sm: 'row' },
				alignItems: { xs: 'center' },
				justifyContent: 'space-between',
				margin: { xs: '12px 0', sm: '24px 0 0 0' },
				flex: { sm: 2, lg: 1 }
			}}
		>
			<Box
				sx={{
					flex: { sm: 1 },
					display: 'flex',
					alignItems: 'center',
					mb: { xs: '24px', sm: '0' }
				}}
			>
				<Typography
					sx={{
						color: '#1C4A14',
						fontSize: '16px',
						fontWeight: 400,
						marginRight: '12px'
					}}
				>
					{dictionary.Product.showing}
				</Typography>
				<Select
					value={rowPerPage}
					onChange={handleChange}
					sx={{
						color: '#1C4A14',
						'& fieldset': {
							borderColor: '#A2C18A !important',
							borderWidth: '1px !important'
						},
						'& svg': {
							color: '#417438'
						}
					}}
				>
					<MenuItem value={12}>12</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={50}>50</MenuItem>
				</Select>
			</Box>
			<Pagination
				count={paginationMeta?.pageCount || 1}
				page={page}
				onChange={(event, value) => setPage(value)}
				color='primary'
				sx={{
					flex: { xs: 1, sm: 2, lg: 1 },
					'& ul': {
						width: { xs: '100%', lg: '600px' },
						marginLeft: { xs: '0', lg: 'auto' },
						justifyContent: { xs: 'center', md: 'flex-end' }
					},
					'& .MuiPaginationItem-root': {
						fontSize: { xs: '14px', md: '20px' }
					},
					'& button': {
						padding: { md: '12px' },
						borderRadius: '4px',
						'&:hover': {
							backgroundColor: '#ccc'
						}
					},
					'& li': {
						margin: { md: '0 8px' }
					},
					'& .Mui-selected': {
						color: '#fff',
						backgroundColor: '#417438 !important',
						'&:hover': {
							backgroundColor: '#417438 !important'
						}
					}
				}}
			/>
		</Box>
	)
}

export default PaginationItem

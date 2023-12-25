'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'

import Paper from '@mui/material/Paper'
import { TableHead, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

interface Data {
	name: string
	createdAt: string
	totalPrice: number
	order_status: string
	time_delivery: string
}

function createData(
	name: string,
	createdAt: string,
	totalPrice: number,
	order_status: string,
	time_delivery: string
): Data {
	return {
		name,
		createdAt,
		totalPrice,
		order_status,
		time_delivery
	}
}

const rows = []

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string }
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number
) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

interface HeadCell {
	disablePadding: boolean
	id: keyof Data
	label: string
	numeric: boolean
}

const headCells: readonly HeadCell[] = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Username'
	},
	{
		id: 'createdAt',
		numeric: false,
		disablePadding: false,
		label: 'createdAt'
	},
	{
		id: 'totalPrice',
		numeric: true,
		disablePadding: false,
		label: 'Total price'
	},
	{
		id: 'order_status',
		numeric: false,
		disablePadding: false,
		label: 'Status'
	},
	{
		id: 'time_delivery',
		numeric: false,
		disablePadding: false,
		label: 'Delivery time'
	}
]

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void
	order: Order
	orderBy: string
	rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, rowCount, onRequestSort } = props
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property)
		}

	return (
		<TableHead>
			<TableRow>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align='left'
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default function OrderTableAdmin({ listOrder }: any) {
	const [order, setOrder] = React.useState<Order>('desc')
	const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt')
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const rows = React.useMemo(() => {
		return listOrder.map((order: any) => {
			return createData(
				order.user.username,
				order.createdAt,
				order.order_checkout.totalPrice,

				order.time_delivery || 'On the way',
				order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)
			)
		})
	}, [listOrder])

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	const visibleRows = React.useMemo(
		() =>
			stableSort(rows, getComparator(order, orderBy)).slice(
				page * rowsPerPage,
				page * rowsPerPage + rowsPerPage
			),
		[order, orderBy, page, rowsPerPage]
	)

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', p: '8px 12px', mt: '24px' }}>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby='tableTitle'
						size={'medium'}
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							rowCount={rows.length}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const labelId = `enhanced-table-checkbox-${index}`

								return (
									<TableRow
										hover
										onClick={event => {}}
										role='checkbox'
										tabIndex={-1}
										key={index}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell
											component='th'
											id={labelId}
											scope='row'
											padding='none'
										>
											{row.name}
										</TableCell>
										<TableCell align='left'>{row.createdAt}</TableCell>
										<TableCell align='left'>{row.totalPrice}</TableCell>
										<TableCell align='left'>{row.time_delivery}</TableCell>
										<TableCell align='left'>{row.order_status}</TableCell>
									</TableRow>
								)
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 20, 50]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	)
}

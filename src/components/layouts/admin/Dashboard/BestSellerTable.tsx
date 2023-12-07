import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import ImageItem from '@/components/base/ImageItem'
import { formatCurrencyV2 } from '@/helper'

interface Data {
	id: string
	image: string
	product_price: number
	product_name: string
	product_category: string
	sold: number
	rating: number
}

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
	id: any
	label: string
	numeric: boolean
}

const headCells: readonly HeadCell[] = [
	{
		id: 'product_name',
		numeric: false,
		disablePadding: false,
		label: 'Product Name'
	},
	{
		id: 'product_price',
		numeric: true,
		disablePadding: false,
		label: 'Price'
	},
	{
		id: 'product_category',
		numeric: true,
		disablePadding: false,
		label: 'Category'
	},
	{
		id: 'sold',
		numeric: true,
		disablePadding: false,
		label: 'Sold'
	},
	{
		id: 'rating',
		numeric: true,
		disablePadding: false,
		label: 'Rating'
	}
]

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void
	order: Order
	orderBy: string
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property)
		}

	return (
		<TableHead>
			<TableRow
				sx={{
					'& > th, td': {
						color: '#8E95A9',
						fontFamily: 'Poppins',
						fontSize: '14px',
						fontWeight: 600
					}
				}}
			>
				<TableCell></TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
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

export default function BestSellerTable({ listBestSeller }: any) {
	const [order, setOrder] = React.useState<Order>('asc')
	const [orderBy, setOrderBy] = React.useState<keyof Data>('product_price')

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const visibleRows = React.useMemo(() => {
		return stableSort(listBestSeller || [], getComparator(order, orderBy))
	}, [listBestSeller, order, orderBy])

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
						/>
						<TableBody>
							{visibleRows.map((row: any, index: number) => {
								return (
									<TableRow
										hover
										tabIndex={-1}
										key={row.id}
										sx={{
											'& > th,td': {
												color: '#555F7E',
												fontFamily: 'Poppins',
												fontSize: '13px',
												lineHeight: '22px'
											}
										}}
									>
										<TableCell>
											<ImageItem
												imgSrc={row.product_thumbnail}
												style={{
													width: '50px',
													height: '50px',
													'& img': {
														borderRadius: '50%'
													}
												}}
											/>
										</TableCell>
										<TableCell component='th' scope='row' padding='none'>
											{row.product_name}
										</TableCell>
										<TableCell align='right'>
											{formatCurrencyV2(row.product_price)}
										</TableCell>
										<TableCell align='right'>{row.product_category}</TableCell>
										<TableCell align='right'>{row.sold}</TableCell>
										<TableCell align='right'>{row.rating}</TableCell>
									</TableRow>
								)
							})}
							{listBestSeller?.length === 0 && (
								<TableRow
									style={{
										height: 53 * listBestSeller?.length
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	)
}

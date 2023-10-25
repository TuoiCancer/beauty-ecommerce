'use client'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import RowItem from './RowItem'
import { toast } from 'react-toastify'
import { OrderInterface } from '@/utils/order.interface'

export default function OrderTable({
	listOrder,
	dictionary,
	cancelOrder
}: {
	listOrder: OrderInterface[]
	dictionary: any
	cancelOrder: any
}) {
	return (
		<TableContainer
			component={Paper}
			sx={{
				'&::-webkit-scrollbar': {
					background: 'transparent',
					height: '8px'
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: '#a4c18a',
					borderRadius: '6px',
					height: '8px'
				}
			}}
		>
			<Table aria-label='collapsible table'>
				<TableHead>
					<TableRow
						sx={{
							'& .MuiTableCell-root': {
								fontSize: '14px',
								fontFamily: 'Montserrat',
								fontWeight: '600',
								padding: '26px 6px'
							}
						}}
					>
						<TableCell />
						<TableCell>ID</TableCell>
						<TableCell align='left'>{dictionary.Order.time01}</TableCell>
						<TableCell align='left'>{dictionary.Order.time02}</TableCell>
						<TableCell align='left'>{dictionary.Order.address}</TableCell>
						<TableCell align='left'>{dictionary.Order.total}</TableCell>
						<TableCell align='left'>{dictionary.Order.status}</TableCell>
						<TableCell align='left'>{dictionary.Order.cancel}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{listOrder.map(row => (
						<RowItem
							key={row.id}
							row={row}
							dictionary={dictionary}
							cancelOrder={cancelOrder}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

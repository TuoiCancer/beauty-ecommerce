'use client'
import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import { listOrder } from '@/constants'
import RowItem from './RowItem'
import { toast } from 'react-toastify'

export default function OrderTable() {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [openColaspe, setOpenColapse] = React.useState(false)

	const openPopover = Boolean(anchorEl)

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleCancelOrder = () => {
		toast.success('Cancel order success')
		handleClose()
	}

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
						<TableCell align='left'>Time order</TableCell>
						<TableCell align='left'>Time delivery</TableCell>
						<TableCell align='left'>Address</TableCell>
						<TableCell align='left'>Total</TableCell>
						<TableCell align='left'>Status</TableCell>
						<TableCell align='left'>Cancel</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{listOrder.map(row => (
						<RowItem
							key={row.id}
							row={row}
							handleClick={handleClick}
							handleClose={handleClose}
							handleCancelOrder={handleCancelOrder}
							openColaspe={openColaspe}
							setOpenColapse={setOpenColapse}
							anchorEl={anchorEl}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

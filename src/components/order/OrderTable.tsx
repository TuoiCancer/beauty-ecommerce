'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { listOrder } from '@/constants'
import ImageItem from '../base/ImageItem'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
	price: number
) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: '2020-01-05',
				customerId: '11091700',
				amount: 3
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
				amount: 1
			}
		]
	}
}

function Row({ row }: { row: any }) {
	const [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<TableRow
				sx={{
					'& > *': {
						borderBottom: 'unset'
					},
					'& .MuiTableCell-root': {
						fontFamily: 'Montserrat',
						fontSize: '14px',
						whiteSpace: 'nowrap'
					}
				}}
			>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					{row.id}
				</TableCell>
				<TableCell align='left'>{row.createdAt}</TableCell>
				<TableCell align='left'>{row.createdAt}</TableCell>
				<TableCell align='left'>{row.order_shipping.address}</TableCell>
				<TableCell align='left'>{row.order_checkout.totalPrice}</TableCell>
				<TableCell align='left'>
					<Typography
						sx={{
							padding: '8px 12px',
							borderRadius: '12px',
							textTransform: 'capitalize',
							textAlign: 'center',
							color: '#fff',
							fontSize: '14px',
							backgroundColor: `var(--${row.order_status.toLowerCase()}-button)`
						}}
					>
						{row.order_status}
					</Typography>
				</TableCell>
				<TableCell align='center'>
					<ImageItem
						imgSrc='/img/trash.png'
						style={{
							width: { xs: '24px', md: '30px' },
							height: { xs: '24px', md: '30px' },
							cursor: 'pointer'
						}}
					/>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: '24px auto' }}>
							<Table size='small' aria-label='order'>
								<TableHead>
									<TableRow
										sx={{
											backgroundColor: '#F6F5F5',
											'& .MuiTableCell-root': {
												padding: '24px',
												fontFamily: 'Montserrat',
												fontSize: '14px',
												fontWeight: '600'
											}
										}}
									>
										<TableCell align='center'>Number</TableCell>
										<TableCell>Image</TableCell>
										<TableCell align='left'>Product name</TableCell>
										<TableCell align='left'>Shop</TableCell>
										<TableCell align='center'>Quantity</TableCell>
										<TableCell align='left'>Price</TableCell>
										<TableCell align='left'>Sub total</TableCell>
										<TableCell align='center'>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody
									sx={{
										maxHeight: '300px',
										overflowY: 'scroll'
									}}
								>
									{row.order_products.map((product: any, index: number) => (
										<TableRow
											key={product.createdAt}
											sx={{
												'& .MuiTableCell-root': {
													fontFamily: 'Montserrat',
													fontSize: '14px',
													margin: '0',
													whiteSpace: 'nowrap',
													padding: '12px 0'
												}
											}}
										>
											<TableCell component='th' scope='row' align='center'>
												{index + 1}
											</TableCell>
											<TableCell>
												<ImageItem
													imgSrc={product.thumbnail}
													style={{
														width: '60px',
														height: '60px'
													}}
												/>
											</TableCell>

											<TableCell align='left'>
												<Typography
													sx={{
														fontFamily: 'Montserrat',
														margin: '8px',
														display: '-webkit-box',
														WebkitLineClamp: 2,
														WebkitBoxOrient: 'vertical',
														overflow: 'hidden',
														fontSize: '14px',
														whiteSpace: 'normal'
													}}
												>
													{product.name}
												</Typography>
											</TableCell>
											<TableCell align='center'>
												{product.order_shop.shopName}
											</TableCell>
											<TableCell align='center'>{product.quantity}</TableCell>
											<TableCell align='center'>{product.price}</TableCell>
											<TableCell align='center'>
												{Math.round(product.quantity * product.price * 100) /
													100}
											</TableCell>
											<TableCell align='center'>
												<MoreHorizIcon
													sx={{
														cursor: 'pointer',
														color: '#000'
													}}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	)
}

export default function OrderTable() {
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
								fontWeight: '600'
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
						<Row key={row.id} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

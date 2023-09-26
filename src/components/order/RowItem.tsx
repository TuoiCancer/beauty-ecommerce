import * as React from 'react'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Popover from '@mui/material/Popover'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { formatDate } from '@/helper'
import ImageItem from '../base/ImageItem'
import BaseButton from '../base/BaseButton'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const RowItem = ({
	row,
	handleClose,
	handleCancelOrder,
	handleClick,
	openColaspe,
	setOpenColapse,
	anchorEl
}: any) => {
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
						whiteSpace: 'nowrap',
						py: '20px'
					}
				}}
			>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpenColapse(!openColaspe)}
					>
						{openColaspe ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component='th' scope='row'>
					{row.id}
				</TableCell>
				<TableCell align='left'>{formatDate(row.createdAt)}</TableCell>
				<TableCell align='left'>{formatDate(row.createdAt)}</TableCell>
				<TableCell align='left'>{row.order_shipping.address}</TableCell>
				<TableCell align='left'>{row.order_checkout.totalPrice}</TableCell>
				<TableCell align='left'>
					<Typography
						sx={{
							padding: '8px 12px',
							borderRadius: '24px',
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
				{row.order_status !== 'Cancelled' ? (
					<TableCell
						align='center'
						sx={{
							userSelect: 'none'
						}}
					>
						<ImageItem
							onClick={handleClick}
							imgSrc='/img/trash.png'
							style={{
								width: { xs: '24px', md: '30px' },
								height: { xs: '24px', md: '30px' },
								cursor: 'pointer'
							}}
						/>
						<Popover
							id='mouse-over-popover'
							open={Boolean(anchorEl)}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
						>
							<Box
								sx={{
									padding: '16px 20px 8px 20px',
									color: 'var(--main-green)'
								}}
							>
								<Typography>Are you sure to cancel this order</Typography>
								<Box
									sx={{
										marginTop: '12px',
										display: 'flex',
										justifyContent: 'flex-end',
										'& > button': {
											color: 'var(--main-green)'
										}
									}}
								>
									<BaseButton
										onClick={handleClose}
										label='Cancel'
										variant='text'
									/>
									<BaseButton
										onClick={handleCancelOrder}
										label='OK'
										variant='text'
									/>
								</Box>
							</Box>
						</Popover>
					</TableCell>
				) : (
					<TableCell></TableCell>
				)}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={openColaspe} timeout='auto' unmountOnExit>
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
												fontWeight: '600',
												whiteSpace: 'nowrap'
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

export default RowItem

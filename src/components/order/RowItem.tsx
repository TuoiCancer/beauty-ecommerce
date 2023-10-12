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
import { formatCurrency, formatCurrencyV2, formatDate } from '@/helper'
import ImageItem from '../base/ImageItem'
import BaseButton from '../base/BaseButton'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { OrderInterface } from '@/utils/order.interface'
import { ProductInterface } from '@/utils/product.interface'

const RowItem = ({
	row,
	handleClose,
	handleCancelOrder,
	handleClick,
	anchorEl
}: {
	row: OrderInterface
	handleClose: () => void
	handleCancelOrder: () => void
	handleClick: (event: any) => void
	anchorEl: any
}) => {
	const [openColaspe, setOpenColapse] = React.useState(false)
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
						py: '20px',
						fontWeight: '500'
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
				<TableCell align='left'>
					{`${row.order_shipping.address} - ${row.order_shipping.district} - ${row.order_shipping.city}`
						.length < 50
						? `${row.order_shipping.address} - ${row.order_shipping.district} - ${row.order_shipping.city}`
						: ` ${`${row.order_shipping.address} - ${row.order_shipping.district} - ${row.order_shipping.city}`.slice(
								0,
								50
						  )}...`}
				</TableCell>
				<TableCell align='left'>
					{formatCurrencyV2(row.order_checkout.totalPrice)}
				</TableCell>
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
							sx={{
								'& .MuiPopover-paper': {
									boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)'
								}
							}}
						>
							<Box
								sx={{
									padding: '16px 20px 8px 20px'
									// color: 'var(--main-green)'
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Montserrat',
										fontSize: '14px'
									}}
								>
									Are you sure to cancel this order
								</Typography>
								<Box
									sx={{
										marginTop: '12px',
										display: 'flex',
										justifyContent: 'flex-end'
									}}
								>
									<BaseButton
										onClick={handleClose}
										label='Cancel'
										variant='text'
										styleSx={{
											color: '#ccc',
											fontFamily: 'Montserrat',
											fontSize: '12px'
										}}
									/>
									<BaseButton
										onClick={handleCancelOrder}
										label='OK'
										variant='text'
										styleSx={{
											color: 'var(--main-green)',
											fontFamily: 'Montserrat',
											fontSize: '14px',
											fontWeight: '600'
										}}
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
									{row.products.map(
										(product: ProductInterface, index: number) => (
											<TableRow
												key={product.createdAt}
												sx={{
													'& .MuiTableCell-root': {
														fontFamily: 'Montserrat',
														fontSize: '14px',
														margin: '0',
														whiteSpace: 'nowrap',
														padding: '12px 0',
														fontWeight: '500'
													}
												}}
											>
												<TableCell component='th' scope='row' align='center'>
													{index + 1}
												</TableCell>
												<TableCell>
													<ImageItem
														imgSrc={product.product_thumbnail}
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
															whiteSpace: 'normal',
															fontWeight: '500'
														}}
													>
														{product.product_name}
													</Typography>
												</TableCell>
												<TableCell align='center'>
													{product?.user?.username}
												</TableCell>
												<TableCell align='center'>
													{product.quantityToBuy}
												</TableCell>
												<TableCell align='center'>
													{formatCurrencyV2(product.product_price)}
												</TableCell>
												<TableCell align='center'>
													{formatCurrencyV2(
														product.product_quantity * product.product_price
													)}
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
										)
									)}
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

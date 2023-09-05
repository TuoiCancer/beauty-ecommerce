import { poppins, roboto } from '@/assets/font'
import { Box, Checkbox, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import ImageItem from '../base/ImageItem'
import Lefticon from '../icon/Lefticon'

type Product = {
	id: string
	name: string
	price: number
	thumbnail: string
	quantity: number
	link: string
}

export interface CartItemProps {
	shopName: string
	link: string
	products: Product[]
}

const CartItem = ({ shopName, link, products }: CartItemProps) => {
	return (
		<Box
			sx={{
				mb: { xs: '16px', md: '52px', xl: '64px' }
			}}
		>
			{/* Header About Shop */}
			<Link
				href={link}
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					textDecoration: 'none'
				}}
			>
				<ImageItem
					imgSrc='/img/store.png'
					style={{
						width: { xs: '24px', md: '28px' },
						height: { xs: '24px', md: '28px' }
					}}
				/>
				<Typography
					className={roboto.className}
					variant='h3'
					sx={{
						color: '#626262',
						fontSize: { xs: '18px', md: '20px', lg: '22px' },
						fontWeight: 500,
						lineHeight: '125.5%',
						margin: { xs: '0 8px', lg: '0 16px' }
					}}
				>
					{shopName}
				</Typography>
				<Lefticon width='12px' height='12px' />
			</Link>
			{/* List Product in cart */}
			{products.map((item, index) => {
				return (
					<Box
						key={index}
						sx={{
							display: 'flex',
							alignItems: 'center',
							margin: { xs: '12px 0', md: '24px 0' }
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<Checkbox
								sx={{
									color: 'green',
									'&.Mui-checked': {
										color: 'green'
									},
									'& .MuiSvgIcon-root': {
										fontSize: {
											xs: '24px',
											md: '32px'
										}
									}
								}}
							/>
							<ImageItem
								imgSrc={item.thumbnail}
								style={{
									width: { xs: '60px', md: '120px', lg: '160px' },
									height: { xs: '60px', md: '120px', lg: '160px' },
									ml: { md: '24px' },
									mr: { xs: '12px', md: '18px' }
								}}
							/>
						</Box>
						<Box
							sx={{
								flex: 1,
								mr: { xs: '12px' }
							}}
						>
							<Link
								href={item.link}
								style={{
									flex: 1,
									textDecoration: 'none',
									color: '#000'
								}}
							>
								<Typography
									variant='h3'
									className={roboto.className}
									sx={{
										color: '#183A12',
										fontSize: { xs: '18px', md: '22px', xl: '24px' },
										fontWeight: 300,
										lineHeight: '125.5%',
										mb: { md: '12px' },
										display: '-webkit-box',
										WebkitLineClamp: 2,
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden'
									}}
								>
									{item.name}
								</Typography>
								<Typography
									variant='h3'
									className={poppins.className}
									sx={{
										color: '#575757',
										fontSize: {
											xs: '16px',
											md: '20px'
										},
										fontWeight: '400',
										display: { xs: 'none', md: 'block' }
									}}
								>
									${item.price.toFixed(2)}
								</Typography>
							</Link>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									mt: { xs: '8px' }
								}}
							>
								<Box
									className={roboto.className}
									sx={{
										display: 'flex',
										alignItems: 'center',
										'& p': {
											color: '#737373',
											fontSize: '32px',
											fontWeight: 500,
											lineHeight: '154.5%',
											margin: { md: '0 24px' },
											cursor: 'pointer'
										}
									}}
								>
									<Typography> - </Typography>
									<Typography
										variant='h5'
										sx={{
											fontSize: '16px',
											borderRadius: '4px',
											background: '#F2F2F2',
											padding: { xs: '6px 12px', md: ' 8px 12px ' },
											mx: { xs: '8px' }
										}}
									>
										{item.quantity}
									</Typography>
									<Typography> + </Typography>
								</Box>
								<Typography
									className={poppins.className}
									sx={{
										color: '#575757',
										fontSize: { xs: '18px', md: '24px' },
										margin: { xs: '0 12px', md: '0 42px' }
									}}
								>
									${(item.quantity * item.price).toFixed(2)}
								</Typography>
							</Box>
						</Box>
						<ImageItem
							imgSrc='/img/trash.png'
							style={{
								width: { xs: '24px', md: '30px' },
								height: { xs: '24px', md: '30px' },
								marginLeft: { md: 'auto' },
								cursor: 'pointer'
							}}
						/>
					</Box>
				)
			})}
		</Box>
	)
}

export default CartItem

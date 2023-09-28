import { poppins, roboto } from '@/assets/font'
import { Box, Checkbox, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import ImageItem from '../base/ImageItem'
import Lefticon from '../icon/Lefticon'
import ProductCartItem from './ProductCartItem'

export interface CartItemProps {
	shopName: string
	link: string
	products: {
		id: number
		product_thumbnail: string
		product_name: string
		product_price: number
		quantityToBuy: number
	}[]
	updateFn: (data: any) => void
	deleteCartUser: (data: any) => void
}

const CartItem = ({
	shopName,
	link,
	products,
	updateFn,
	deleteCartUser
}: CartItemProps) => {
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
					<ProductCartItem
						key={index}
						item={item}
						updateFn={updateFn}
						deleteCartUser={deleteCartUser}
					/>
				)
			})}
		</Box>
	)
}

export default CartItem

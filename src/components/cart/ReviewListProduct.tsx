import { Box, Typography } from '@mui/material'
import React from 'react'

type Shop = {
	id: string
	shopName: string
}

type Product = {
	id: number
	name: string
	price: number
	quantity: number
	thumbnail: string
}

export interface ReviewListProductProps {
	id: number
	shop: Shop
	products: Product[]
}

const ReviewListProduct = ({
	listProduct
}: {
	listProduct: ReviewListProductProps
}) => {
	return (
		<Box
			sx={{
				my: { xs: '12px' }
			}}
		>
			<Typography
				variant='h3'
				sx={{
					color: '#626262',
					fontSize: { xs: '16px', md: '18px' },
					fontWeight: 500,
					lineHeight: '125.5%'
				}}
			>
				{listProduct.shop.shopName}
			</Typography>
			<Box>
				{listProduct.products.map((product: Product) => {
					return (
						<Box
							key={product.id}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								margin: { xs: '4px 0', md: '18px 0' },
								'& h4': {
									color: '#343434',
									fontSize: '16px',
									fontWeight: 300,
									lineHeight: '125.5%',
									marginRight: { md: '24px' }
								},
								'& h5': {
									color: '#575757',
									fontFamily: 'Poppins',
									fontSize: '18px',
									fontWeight: 400
								}
							}}
						>
							<Typography
								variant='h4'
								sx={{
									flex: 1,
									textOverflow: 'ellipsis',
									WebkitLineClamp: 1,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
									whiteSpace: 'nowrap'
									// maxWidth: { md: '300px' },
								}}
							>
								{product.name}
							</Typography>
							<Typography
								variant='h4'
								sx={{
									mr: { md: '24px' }
								}}
							>
								x {product.quantity}
							</Typography>
							<Typography variant='h5'>${product.price.toFixed(2)}</Typography>
						</Box>
					)
				})}
			</Box>
		</Box>
	)
}

export default ReviewListProduct

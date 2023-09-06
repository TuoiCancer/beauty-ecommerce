import { poppins } from '@/assets/font'
import { listProduct } from '@/constants'
import { Box, Typography } from '@mui/material'
import React from 'react'
import Lefticon from '../icon/Lefticon'
import ProductItem from '../shop/ProductItem'

const SimilarProduct = () => {
	return (
		<Box
			sx={{
				mt: { md: '140px' }
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mb: { md: '54px' },
					alignItems: 'center'
				}}
			>
				<Typography
					className={poppins.className}
					variant='h3'
					sx={{
						color: '#000',
						fontSize: '36px',
						fontWeight: 500,
						lineHeight: '125.5%'
					}}
				>
					Similar Product
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						cursor: 'pointer',
						transition: 'all 0.3s ease',
						':hover': {
							transform: 'translateX(4px)'
						}
					}}
				>
					<Typography
						variant='h3'
						className={poppins.className}
						sx={{
							color: '#000',
							fontSize: {
								md: '20px'
							},
							mr: { md: '24px' }
						}}
					>
						View all
					</Typography>
					<Lefticon />
				</Box>
			</Box>
			{/* List product */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				{listProduct
					.filter((item, index) => index < 4)
					.map(item => {
						return (
							<ProductItem
								key={item.id}
								imgSrc={item.thumbnail}
								price={`${item.price}`}
								productName={item.name}
								productType={item.type}
							/>
						)
					})}
			</Box>
		</Box>
	)
}

export default SimilarProduct

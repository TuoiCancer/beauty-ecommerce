import { Box, Typography } from '@mui/material'
import React from 'react'
import BestSellerTable from './BestSellerTable'

const BestSeller = ({ listBestSeller }: any) => {
	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: 'white',
				borderRadius: '16px',
				background: '#FFF',
				boxShadow: '0px 8px 32px 0px rgba(51, 38, 174, 0.08)',
				padding: '32px 24px',
				mr: '36px',
				flex: 1.5
			}}
		>
			<Typography
				variant='h5'
				sx={{
					color: ' #000',
					fontFamily: 'Poppins',
					fontSize: '18px',
					fontWeight: '500',
					lineHeight: '150%' /* 27px */,
					marginBottom: '52px'
				}}
			>
				Best Seller
			</Typography>
			<BestSellerTable listBestSeller={listBestSeller} />
		</Box>
	)
}

export default BestSeller

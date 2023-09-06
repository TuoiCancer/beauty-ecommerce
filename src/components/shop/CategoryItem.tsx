import { Box, Typography } from '@mui/material'
import Image from 'next/legacy/image'
import React from 'react'
import ImageItem from '../base/ImageItem'

const CategoryItem = ({
	pathImg,
	title,
	description
}: {
	pathImg: string
	title: string
	description: string
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'center',
				backgroundColor: '#fff',
				width: { xs: '100%', md: '405px' },
				height: { md: '276px' },
				mr: { md: '12px', lg: '32px' },
				// pl: { md: '24px', lg: '64px' },
				pl: { md: '24px', lg: '64px' },
				mb: { xs: '18px', md: '0' },
				padding: { xs: '12px 16px', md: '0 8px 0 24px' },
				'&:hover': {
					cursor: 'pointer',
					boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
				}
			}}
		>
			<ImageItem
				imgSrc={pathImg}
				style={{
					width: { xs: '40px', md: '60px' },
					height: { xs: '40px', md: '60px' }
				}}
			/>
			<Typography
				variant='h3'
				sx={{
					mt: { xs: '16px', md: '24px' },
					mb: { xs: '8px', md: '16px' },
					color: '#171B1A',
					fontSize: { xs: '24px', md: '30px' }
				}}
			>
				{title}
			</Typography>
			<Typography
				variant='body1'
				sx={{
					fontSize: { md: '16px' },
					color: '#6D6D6D',
					lineHeight: { md: '125%' }
				}}
			>
				{description}
			</Typography>
		</Box>
	)
}

export default CategoryItem

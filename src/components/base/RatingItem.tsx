import { Box } from '@mui/material'
import React from 'react'
import ImageItem from './ImageItem'

const RatingItem = ({
	numberOfRate,
	sx
}: {
	numberOfRate: number
	sx?: any
}) => {
	const star = numberOfRate
	const starBorder = 5 - numberOfRate
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				'& img': {
					marginRight: '5px'
				},
				...sx
			}}
		>
			{[...Array(star)].map((_, index) => (
				<ImageItem
					key={index}
					imgSrc='/img/star.png'
					style={{
						width: '20px',
						height: '20px',
						mr: '5px'
					}}
				/>
			))}
			{[...Array(starBorder)].map((_, index) => (
				<ImageItem
					key={index}
					imgSrc='/img/starBorder.png'
					style={{
						width: '20px',
						height: '20px',
						mr: '5px'
					}}
				/>
			))}
		</Box>
	)
}

export default RatingItem

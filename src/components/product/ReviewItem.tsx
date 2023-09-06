'use client'
import React from 'react'
import { Box, Rating, Typography } from '@mui/material'
import Image from 'next/image'
import ImageItem from '../base/ImageItem'
import { styled } from '@mui/material/styles'
import StarIcon from '@/assets/icon/Star'
import EmptyStar from '../icon/EmptyStar'

export interface ReviewItemProps {
	img: string
	rating: number
	username: string
	content: string
	time: string
}

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff6d75'
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47'
	}
})

const ReviewItem = ({
	img,
	rating,
	username,
	content,
	time
}: ReviewItemProps) => {
	return (
		<Box
			sx={{
				mb: { md: '48px' },
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-start'
			}}
		>
			{/* Avatar */}
			<ImageItem
				imgSrc={img}
				style={{
					width: { md: '90px' },
					height: { md: '90px' },
					borderRadius: '50%',
					border: '1px solid var(--main-green)',
					'& img': {
						borderRadius: '50%'
					}
				}}
			/>
			<Box
				sx={{
					ml: { md: '36px' }
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<StyledRating
						readOnly
						name='customized-color'
						defaultValue={rating}
						getLabelText={(value: number) =>
							`${value} Heart${value !== 1 ? 's' : ''}`
						}
						precision={1}
						icon={<StarIcon />}
						emptyIcon={<EmptyStar />}
					/>
					<Typography
						sx={{
							color: '#478515',
							fontFamily: 'Roboto',
							fontSize: '20px',
							fontWeight: 500,
							lineHeight: '125.5%',
							mx: { md: '12px' },
							textTransform: 'capitalize'
						}}
					>
						{username}
					</Typography>
					<Typography
						sx={{
							color: '#BBB',
							fontFamily: 'Roboto',
							fontSize: '18px',
							fontWeight: 500,
							lineHeight: '154.5%'
						}}
					>
						{time}
					</Typography>
				</Box>
				<Typography
					sx={{
						color: '#000',
						fontFamily: 'Roboto',
						fontSize: '18px',
						fontWeight: 300,
						lineHeight: '154.5%',
						my: { md: '12px' }
					}}
				>
					{content}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						'& h5': {
							color: '#BBB',
							fontFamily: 'Roboto',
							fontSize: '18px',
							fontWeight: 500,
							lineHeight: '154.5%',
							mr: { md: '24px' },
							cursor: 'pointer'
						}
					}}
				>
					<Typography variant='h5'>Like</Typography>
					<Typography variant='h5'>Reply</Typography>
				</Box>
			</Box>
		</Box>
	)
}

export default ReviewItem

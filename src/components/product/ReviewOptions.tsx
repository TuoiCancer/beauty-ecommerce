import { Box, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'

const ReviewOptions = ({
	deleteReview,
	productId,
	reviewId,
	setShowOptionsReview,
	setShowEditBox,
	userId,
	UserSlice
}: any) => {
	const handleDeleteReview = () => {
		setShowOptionsReview(false)
		deleteReview({
			productId,
			reviewId
		})
	}

	return (
		<Box
			sx={{
				position: 'absolute',
				bottom: '-50%',
				right: '0',
				backgroundColor: '#fff',
				boxShadow: '0 0 10px rgba(0,0,0,.1)',
				padding: '12px 16px ',
				borderRadius: '8px',
				'& .option-item': {
					display: 'flex',
					alignItems: 'center',
					mb: '8px',
					border: '1px solid #f0f2f5',
					borderRadius: '8px',
					padding: '8px 12px',
					cursor: 'pointer',
					'&:hover': {
						backgroundColor: '#fbfbfb',
						borderColor: '#469f36',
						'& svg': {
							color: 'var(--main-green)'
						},
						'& p': {
							color: 'var(--main-green)',
							fontWeight: '500'
						}
					},
					'& p': {
						marginLeft: '8px',
						fontSize: '14px',
						color: '#858585',
						fontFamily: 'Roboto'
					},
					'& svg': {
						color: '#323232'
					}
				}
			}}
		>
			{userId === UserSlice?.user?.id && (
				<Box
					className='option-item'
					onClick={() => {
						setShowEditBox(true)
						setShowOptionsReview(false)
					}}
				>
					<EditIcon />
					<Typography variant='body1'>Edit</Typography>
				</Box>
			)}

			<Box className='option-item' onClick={handleDeleteReview}>
				<DeleteSweepIcon />
				<Typography variant='body1'>Delete</Typography>
			</Box>
		</Box>
	)
}

export default ReviewOptions

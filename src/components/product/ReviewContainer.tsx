import { ReviewInterface } from '@/utils/review.interface'
import { Box, Typography } from '@mui/material'
import React from 'react'
import ReviewItem from './ReviewItem'

export default function ReviewContainer({
	listReview,
	productId,
	getParentReviews
}: any) {
	if (!listReview)
		return (
			<Typography
				sx={{
					textAlign: 'center',
					fontSize: '16px',
					fontWeight: '400',
					color: '#000',
					fontFamily: 'Roboto'
				}}
			>
				Empty review
			</Typography>
		)
	return (
		<Box>
			{listReview.map((item: ReviewInterface, index: number) => (
				<ReviewItem
					key={index}
					id={item.id}
					img={item.user.avatar}
					username={item.user.username}
					userId={item.user.id}
					rating={item.rating}
					content={item.content}
					time={item.createdAt}
					totalReply={item.totalReply}
					productId={productId}
					getParentReviews={getParentReviews}
				/>
			))}
		</Box>
	)
}

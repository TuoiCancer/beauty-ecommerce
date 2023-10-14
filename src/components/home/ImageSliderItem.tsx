import React from 'react'

import { Box, Typography } from '@mui/material'
import ImageItem from '../base/ImageItem'
import { roboto } from '../../../public/font'

export interface Comment {
	id: string
	content: string
	user: {
		id: string
		username: string
		avatar: string
	}
}

const ImageSliderItem = ({ comment }: { comment: Comment }) => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: { md: '940px' },
				padding: { xs: '24px', md: '120px 178px 40px 178px' },
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#fff',
				border: { md: '1px solid #EEE' },
				boxShadow: '0px 18px 36px 0px rgba(0, 0, 0, 0.07)',
				margin: '0 auto'
			}}
		>
			<ImageItem
				imgSrc={comment.user.avatar}
				style={{
					position: { xs: 'relative', md: 'absolute' },
					top: '0',
					left: { md: '44%' },
					width: { xs: '60px', md: '100px' },
					height: { xs: '60px', md: '100px' },
					borderRadius: '50%',
					border: '1px solid #6DC229',
					margin: { xs: '0 auto', md: '0px' },
					'& img': {
						objectFit: 'cover !important',
						borderRadius: '50%'
					}
				}}
			/>
			<Typography
				variant='body1'
				className={roboto.className}
				sx={{
					color: '#6D6D6D',
					fontSize: '18px',
					fontStyle: 'italic',
					fontWeight: { xs: 400, md: 500 },
					lineHeight: '32px',
					mb: { md: '28px' },
					maxWidth: { md: '600px' },
					textAlign: 'center'
				}}
			>
				{comment.content}
			</Typography>
			<Typography
				variant='body1'
				className={roboto.className}
				sx={{
					color: '#656565',
					fontSize: { xs: '16px', md: '20px' },
					lineHeight: '150%',
					textTransform: 'capitalize',
					textAlign: 'center',
					pt: { xs: '20px', md: '0px' }
				}}
			>
				- {comment.user.username} -
			</Typography>
		</Box>
	)
}

export default ImageSliderItem

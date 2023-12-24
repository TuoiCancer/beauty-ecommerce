import { Box } from '@mui/material'
import React from 'react'
import ImageItem from '../base/ImageItem'

const Options = ({
	iconSrc,
	gifSrc,
	onClick
}: {
	iconSrc: string
	onClick?: any
	gifSrc: string
}) => {
	return (
		<Box
			onClick={onClick}
			id='option-item'
			sx={{
				backgroundColor: '#fff',
				borderRadius: '50%',
				width: { xs: '38px', md: '46px' },
				height: { xs: '38px', md: '46px' },
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				filter: ' drop-shadow(0px 0px 10px rgba(229, 229, 229, 0.40))',
				transition: 'all 0.2s ease-in-out',
				mb: { xs: '8px', md: '16px' },
				'& #gif-option': {
					display: 'none'
				},

				'&:hover': {
					// backgroundColor: '#6FD15D',
					'& #img-option': {
						display: 'none'
					},
					'& #gif-option': {
						display: 'block'
					}
				}
			}}
		>
			<ImageItem
				idBox='img-option'
				imgSrc={iconSrc}
				style={{
					width: { xs: '18px', xl: '25px' },
					height: { xs: '18px', xl: '23px' }
				}}
			/>
			<ImageItem
				idBox='gif-option'
				imgSrc={gifSrc}
				style={{
					width: { xs: '22px', xl: '30px' },
					height: { xs: '22px', xl: '30px' }
				}}
			/>
		</Box>
	)
}

export default Options

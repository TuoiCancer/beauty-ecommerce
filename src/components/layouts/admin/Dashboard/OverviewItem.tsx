import ImageItem from '@/components/base/ImageItem'
import { Box, Typography } from '@mui/material'
import React from 'react'

const OverviewItem = ({ title, value, imgUrl, sx }: any) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'flex-start',
				paddingRight: '52px',
				...sx
			}}
		>
			<Box>
				<Typography
					variant='h6'
					sx={{
						color: '#000',
						fontFamily: 'Poppins',
						fontSize: '26px',
						fontStyle: 'normal',
						fontWeight: 600,
						lineHeight: '150%' /* 42px */
					}}
				>
					{value}
				</Typography>
				<Typography
					variant='h6'
					sx={{
						color: '#000',
						fontFamily: 'Poppins',
						fontSize: '16px',
						fontStyle: 'normal',
						fontWeight: '400'
					}}
				>
					{title}
				</Typography>
			</Box>
			<Box
				sx={{
					padding: '10px',
					borderRadius: '12px',
					background: '#FFF',
					boxShadow: '0px 2px 10px 0px rgba(124, 141, 181, 0.12)',
					display: 'inline-block',
					marginLeft: '24px'
				}}
			>
				<ImageItem
					imgSrc={imgUrl}
					style={{
						width: '20px',
						height: '20px'
					}}
				/>
			</Box>
		</Box>
	)
}

export default OverviewItem

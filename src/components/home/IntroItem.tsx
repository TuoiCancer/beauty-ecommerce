import { Box, Typography } from '@mui/material'
import React from 'react'
import { hindMadurai, ibarra } from '../../../public/font'

const IntroItem = ({
	title,
	label,
	description,
	index,
	dictionary
}: {
	title: string
	label: string
	description: string
	index: number
	dictionary: any
}) => {
	return (
		<Box
			sx={{
				width: { xs: '100%', lg: '324px' },
				border: '1px solid #EEEEEE',
				padding: { xs: '12px 24px', md: '30px' },
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
				margin: { xs: '12px 0', md: '0 30px 30px 0' }
			}}
		>
			<Typography
				className={ibarra.className}
				sx={{
					color: '#315316',
					fontSize: { xs: '24px ', md: '48px' },
					fontWeight: 700,
					lineHeight: '125.5%'
				}}
			>
				{title}
			</Typography>
			<Typography
				className={hindMadurai.className}
				sx={{
					color: '#121212',
					fontSize: { xs: '18px', md: '24px' },
					fontWeight: 600,
					lineHeight: '115.5%',
					padding: { xs: '8px 0', md: '30px 0 20px 0' }
				}}
			>
				{dictionary['Home']['introduce'][`box${index + 1}`].label}
			</Typography>
			<Typography
				className={hindMadurai.className}
				sx={{
					color: '#3E3E3E',
					fontSize: '18px',
					fontWeight: 400,
					lineHeight: { xs: '140%', md: ' 180% ' }
				}}
			>
				{dictionary['Home']['introduce'][`box${index + 1}`].description}
			</Typography>
		</Box>
	)
}

export default IntroItem

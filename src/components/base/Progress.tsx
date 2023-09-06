import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const ProgressLoading = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				background: 'rgba(0,0,0,0.5)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: '999'
			}}
		>
			<CircularProgress
				sx={{
					color: '#fff'
				}}
			/>
		</Box>
	)
}

export default ProgressLoading

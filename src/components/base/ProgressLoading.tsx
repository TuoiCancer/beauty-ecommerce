import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const ProgressLoading = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				'& span': {
					color: 'var(--main-green)',
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: 11
				}
			}}
		>
			<CircularProgress />
			<Box
				sx={{
					position: 'fixed',
					top: '0',
					left: '0',
					bottom: '0',
					right: '0',
					zIndex: 10,
					background: '#ccc',
					opacity: 0.3,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					'& span': {
						color: 'var(--main-green)'
					}
				}}
			></Box>
		</Box>
	)
}

export default ProgressLoading

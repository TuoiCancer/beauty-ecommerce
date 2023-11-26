import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

const InputItem = ({ text, value, onChange }) => {
	return (
		<Box
			sx={{
				mb: '24px'
			}}
		>
			<Typography
				variant='h6'
				sx={{
					fontFamily: 'var(--font-family)',
					fontWeight: '500',
					fontSize: '12px',
					color: '#999999',
					mb: '12px'
				}}
			>
				{text}
			</Typography>
			<TextField
				fullWidth
				value={value || ''}
				variant='outlined'
				onChange={onChange}
				inputProps={{ min: 0, style: { textAlign: 'center' } }}
				sx={{
					fontFamily: 'var(--font-family)',
					fontWeight: '600',
					maxWidth: '360px',
					'& .MuiInputBase-root': {
						py: '4px',
						backgroundColor: '#FCFBFC',
						borderRadius: '20px',
						'&.Mui-focused': {
							backgroundColor: '#fff',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.09)'
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: 'rgba(0, 0, 0, 0.23)'
						},
						'& fieldset': {
							borderWidth: '2px'
						},
						'&:hover': {
							'& fieldset': {
								borderColor: 'rgba(0, 0, 0, 0.23)'
							}
						}
					}
				}}
			/>
		</Box>
	)
}

export default InputItem

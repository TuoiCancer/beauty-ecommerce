import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

const InputItem = ({ text, value, onChange }: any) => {
	return (
		<Box
			sx={{
				mb: '24px',
				marginRight: '32px'
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
					'& .MuiInputBase-root': {
						py: '4px',
						backgroundColor: '#FCFBFC',
						borderRadius: '8px',
						'&.Mui-focused': {
							backgroundColor: '#fff',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.09)'
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: '#02cbc5'
						},
						'& fieldset': {
							borderWidth: '1px',
							borderColor: '#02cbc5'
						},
						'&:hover': {
							'& fieldset': {
								borderColor: '#02cbc5'
							}
						}
					}
				}}
			/>
		</Box>
	)
}

export default InputItem

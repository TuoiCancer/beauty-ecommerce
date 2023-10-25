import { Typography } from '@mui/material'
import React from 'react'

const ItemDefaultText = ({ label, onClick }: any) => {
	return (
		<Typography variant='body1' onClick={onClick}>
			{label}
		</Typography>
	)
}

export default ItemDefaultText

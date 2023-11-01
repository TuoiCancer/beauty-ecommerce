import { Typography } from '@mui/material'
import React from 'react'

const ItemDefaultText = ({ label, onClick }: any) => {
	return (
		<Typography
			variant='body1'
			onClick={onClick}
			sx={{
				fontSize: '14px',
				fontWeight: '400',
				fontFamily: 'Montserrat',
				marginRight: '10px'
			}}
		>
			{label}
		</Typography>
	)
}

export default ItemDefaultText

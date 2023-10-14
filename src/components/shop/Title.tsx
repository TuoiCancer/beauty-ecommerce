import { Typography } from '@mui/material'
import React from 'react'
import { unicaOne } from '../../../public/font'

const Title = ({ title, dictionary }: { title: string; dictionary: any }) => {
	console.log('title', title)
	return (
		<Typography
			variant='h2'
			className={unicaOne.className}
			sx={{
				fontSize: { xs: '38px', md: '42px', lg: '56px' },
				textTransform: 'uppercase',
				color: '#171B1A'
			}}
		>
			{dictionary.Title[title]}
		</Typography>
	)
}

export default Title

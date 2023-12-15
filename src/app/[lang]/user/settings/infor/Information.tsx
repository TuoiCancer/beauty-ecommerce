'use client'
import React from 'react'

import UserInfo from './UserInfo'
import { Box } from '@mui/material'

const Information = ({ dictionary }: any) => {
	const [activeItem, setActiveItem] = React.useState(0)

	return (
		<Box
			id='content'
			sx={{
				gridColumn: { xs: '1 / 2', md: '2 / 3' },
				backgroundColor: '#F8F8F8',
				pt: '120px'
			}}
		>
			<UserInfo />
		</Box>
	)
}

export default Information

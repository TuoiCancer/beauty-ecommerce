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
				pl: { xs: '0', md: '104px' }
			}}
		>
			<UserInfo />
		</Box>
	)
}

export default Information

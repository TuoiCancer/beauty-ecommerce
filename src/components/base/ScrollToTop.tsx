'use client'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'

const ScrollToTop = () => {
	const [y, setY] = useState(0)

	const handleScroll = () => {
		setY(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})
	if (y > 500) {
		return (
			<Box
				sx={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
					zIndex: 999,
					cursor: 'pointer',
					transition: 'all 0.3s ease',
					backgroundColor: '#fff',
					boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
					borderRadius: '50%',
					width: '50px',
					height: '50px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					':hover': {
						transform: 'translateY(-6px)'
					}
				}}
				onClick={() => {
					window.scrollTo({
						top: 0,
						behavior: 'smooth'
					})
				}}
			>
				<VerticalAlignTopIcon />
			</Box>
		)
	}
	return <Box></Box>
}

export default ScrollToTop

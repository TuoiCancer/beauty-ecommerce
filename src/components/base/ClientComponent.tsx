'use client'
import { useStore } from '@/store'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const ClientComponent = ({ children }: { children: React.ReactNode }) => {
	const route = useRouter()

	const { UserSlice } = useStore()

	const [x, setX] = useState(0)
	useEffect(() => {
		if (UserSlice.isLoggedIn) {
			route.push('/home')
		} else {
			route.push('/login')
		}
	}, [])

	const handleScroll = () => {
		setX(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	return (
		<>
			{x > 500 && (
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
					top
					{/* <VerticalAlignTopIcon /> */}
				</Box>
			)}
			{children}
		</>
	)
}

export default ClientComponent

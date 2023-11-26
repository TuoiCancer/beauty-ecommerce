'use client'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SidebarInfoItem = ({ item, dictionary }: any) => {
	const [active, setActive] = React.useState(false)
	const pathname = usePathname()
	useEffect(() => {
		const itemPage = item.href.split('/')[4]
		if (pathname.includes(itemPage)) {
			setActive(true)
		} else setActive(false)
	}, [pathname])
	return (
		<Link
			href={item.href || ''}
			style={{
				textDecoration: 'none'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					p: '12px 0',
					color: active ? '#000' : '#9b9b9b',
					'& svg': {
						fontSize: '32px',
						mr: '12px'
					},
					'&:hover': {
						cursor: 'pointer'
					}
				}}
			>
				<item.icon />
				<Typography
					variant='h6'
					sx={{
						fontFamily: 'var(--font-family)',
						fontWeight: active ? '600' : '400'
					}}
				>
					{dictionary['Setting']['sidebar'][item.id]}
				</Typography>
				<Box
					sx={{
						width: '4px',
						height: '50px',
						backgroundColor: active ? 'var(--secondary-green)' : 'transparent',
						borderRadius: '12px',
						ml: 'auto'
					}}
				/>
			</Box>
		</Link>
	)
}

export default SidebarInfoItem

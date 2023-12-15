'use client'
import ImageItem from '@/components/base/ImageItem'
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
					alignItems: 'flex-start',
					p: '32px 0 32px 32px',
					backgroundColor: active ? '#FdFdFd' : 'transparent',
					color: active ? '#000' : '#BAC5D2',
					borderTop: '1px solid #F2F2F2',
					'&:hover': {
						cursor: 'pointer'
					}
				}}
			>
				<ImageItem
					style={{
						width: active ? '36px' : '32px',
						height: active ? '36px' : '32px',
						marginRight: '12px',
						filter: active ? 'opacity(1)' : 'opacity(0.5)'
					}}
					imgSrc={item.img}
				/>
				<Box>
					<Typography
						variant='h5'
						sx={{
							fontFamily: 'var(--font-family)',
							fontWeight: active ? '600' : '400',
							fontSize: active ? '20px' : '16px',
							pb: '8px',
							color: active ? '#02cbc5' : '#BAC5D2'
						}}
					>
						{item.text}
					</Typography>
					<Typography
						variant='h5'
						sx={{
							color: '#BAC5D2',
							fontSize: '12px',
							fontWeight: '400',
							fontFamily: 'var(--font-family)'
						}}
					>
						Change name, ava, title and bio
					</Typography>
				</Box>
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

'use client'
import React from 'react'
import { Box, Typography } from '@mui/material'

import FooterItem from './FooterItem'
import ImageItem from '../base/ImageItem'
import ListIcons from './ListIcons'
import { hindMadurai } from '@/assets/font'
import { usePathname } from 'next/navigation'

const ListItemFooter = [
	{
		id: '1',
		title: 'Services',
		listItem: [
			{
				id: '1.0',
				label: 'Blog',
				link: '/user/blog'
			},
			{
				id: '1.1',
				label: 'Our Products',
				link: '/user/product'
			},
			{
				id: '1.2',
				label: 'Account',
				link: '/user/account'
			}
		]
	},
	{
		id: '2',
		title: 'Customer Care',
		listItem: [
			{
				id: '2.0',
				label: 'Privacy Policy',
				link: '/user/privacy-policy'
			},
			{
				id: '2.1',
				label: 'FAQs',
				link: '/user/faqs'
			}
		]
	},
	{
		id: '3',
		title: 'Shop',
		listItem: [
			{
				id: '3.0',
				label: `L'Oréal`,
				link: '/user/shop/loreal'
			},
			{
				id: '3.1',
				label: 'The Ordinary',
				link: '/user/shop/ordinary'
			},
			{
				id: '3.2',
				label: 'Bioderma',
				link: '/user/shop/bioderma'
			}
		]
	}
]

const Footer = () => {
	const pathname = usePathname()

	if (pathname === '/login' || pathname === '/signup') {
		return null
	}

	return (
		<Box>
			<Box
				sx={{
					width: '100%',
					backgroundColor: '#2C5F23',
					padding: { xs: '50px 0', md: 0 }
				}}
			>
				<Box
					sx={{
						padding: { md: '50px 12px' },
						maxWidth: {
							xs: 'var(--max-width-xs)',
							sm: 'var(--max-width-sm)',
							md: 'var(--max-width-md)',
							lg: 'var(--max-width-lg)',
							xl: 'var(--max-width-xl)'
						},
						margin: { md: '0 auto' },
						display: 'flex',
						justifyContent: { xs: 'center', md: 'space-between' },
						alignItems: { xs: 'center', md: 'flex-start' },
						flexDirection: { xs: 'column', md: 'row' },
						textAlign: { xs: 'center', md: 'left' }
					}}
				>
					<Box>
						<ImageItem
							imgSrc='/img/logo/logo_white.png'
							style={{
								width: { xs: '180px', md: '300px' },
								height: { xs: '40px', md: '62px' },
								mb: { xs: '24px', md: '52px' }
							}}
						/>
						<Box
							sx={{
								pl: { md: '42px' },
								'& h4': {
									color: '#FFF',
									fontSize: '18px',
									lineHeight: '180%',
									fontWeight: 400,
									marginBottom: '20px'
								}
							}}
						>
							<Typography variant='h4'>xuantuoi@gmail.com</Typography>
							<Typography variant='h4'>0987654321</Typography>
							<ListIcons />
						</Box>
					</Box>
					{ListItemFooter.map(item => {
						return (
							<FooterItem
								key={item.id}
								title={item.title}
								listItems={item.listItem}
							/>
						)
					})}
				</Box>
			</Box>
			<Box
				sx={{
					backgroundColor: '#182E08',
					padding: { xs: '12px 0', md: '20px 0' },
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					textAlign: 'center'
				}}
			>
				<Typography
					variant='h5'
					className={hindMadurai.className}
					sx={{
						color: '#FFF',
						fontSize: { xs: '14px', md: '16px' },
						fontWeight: 400,
						lineHeight: '180%'
					}}
				>
					© 2023 Glow&Grace. All Right Reserved. With Love By XuanTuoi
				</Typography>
			</Box>
		</Box>
	)
}

export default Footer

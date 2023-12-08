'use client'
import { Box, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import ImageItem from '../base/ImageItem'
import HeaderItem from './HeaderItem'
import { SelectChangeEvent } from '@mui/material/Select'

import MenuIcon from '@mui/icons-material/Menu'
import CartHeader from './CartHeader'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useStore } from '@/store'

import { motion, sync, useCycle } from 'framer-motion'
import { useDimensions } from './use-dimensions'
import { MenuToggle } from './MenuToggle'
import { Navigation } from './Navigation'

const listMenu = [
	{
		id: 1,
		name: 'Home',
		link: '/user/home',
		isHaveSubItem: false
	},
	{
		id: 2,
		name: 'Product',
		link: '/user/product',
		isHaveSubItem: false
	},
	{
		id: 4,
		name: 'Shop',
		isHaveSubItem: true,
		subItem: [
			{
				sub_name: `L'oréal`,
				sub_link: '/user/shop/loreal'
			},
			{
				sub_name: `The Ordinary`,
				sub_link: '/user/shop/ordinary'
			},
			{
				sub_name: `Bioderma`,
				sub_link: '/user/shop/bioderma'
			}
		]
	}
]

const Header = ({
	dictionary,
	isFixed = true,
	isHaveBg = true,
	isHaveShadow = true,
	textColor = '#000',
	style = {}
}: any) => {
	const { UserSlice } = useStore()

	const pathName = usePathname()

	const searchParams = useSearchParams()
	const search = searchParams.get('shopName')
	const categoryPath = searchParams.get('category')

	if (pathName.includes('/shop/')) {
		textColor = '#fff'
		isHaveBg = false
		isHaveShadow = false
		style = {
			...style,
			position: 'absolute',
			top: { xs: 0 },
			left: 0,
			right: 0,
			zIndex: 999
		}
	}

	const matches = useMediaQuery('(min-width:900px)')
	const router = useRouter()
	const [openPoper, setOpenPoper] = React.useState(false)

	const [language, setLanguage] = React.useState('en')

	const [isOpen, toggleOpen] = useCycle(false, true)
	const containerRef = useRef(null)
	const { height } = useDimensions(containerRef)

	const sidebar = {
		open: (height = 1000) => ({
			clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
			transition: {
				type: 'spring',
				stiffness: 20,
				restDelta: 2
			}
		}),
		closed: {
			clipPath: 'circle(30px at 40px 40px)',
			transition: {
				delay: 0.5,
				type: 'spring',
				stiffness: 400,
				damping: 40
			}
		}
	}

	const redirectedPathName = (locale: string) => {
		if (!pathName) return '/'
		const segments = pathName.split('/')
		segments[1] = locale
		let path = segments.join('/')
		if (search) {
			path = `${path}?shopName=${search}`
		}
		if (categoryPath) {
			path = `${path}&category=${categoryPath}`
		}
		return path
	}

	const handleChange = (event: SelectChangeEvent) => {
		// UserSlice.setLang(event.target.value as string)
		setLanguage(event.target.value as string)
		router.push(redirectedPathName(event.target.value))
	}

	useEffect(() => {
		setLanguage(pathName.split('/')[1])
	}, [pathName])

	return matches ? (
		<Box
			// data-aos="fade-down"
			sx={{
				position: 'fixed',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: isHaveBg ? '#fff' : 'transparent',
				borderRadius: '8px',
				maxWidth: {
					md: 'var(--max-width-md)',
					lg: 'var(--max-width-lg)',
					xl: 'var(--max-width-xl)'
				},
				margin: '12px auto',
				color: `${textColor} !important`,
				boxShadow: isHaveShadow
					? '0px 18px 36px 0px rgba(200, 200, 200, 0.25)'
					: 'none',
				pr: '30px',
				'&::after': {
					content: '""',
					position: isHaveBg ? 'absolute' : 'fixed',
					display: openPoper ? 'block' : 'none',
					top: isHaveBg ? '-15px' : 0,
					right: '0',
					bottom: '0',
					left: '-16%',
					width: '120vw',
					height: '100vh',
					backgroundColor: 'rgba(200, 200, 200, 0.25)',
					zIndex: -1
				},
				...style
			}}
			onClick={e => {
				setOpenPoper(false)
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: { md: '20px 0px' }
				}}
			>
				{/* Logo */}
				<ImageItem
					imgSrc={
						textColor === '#000'
							? '/img/logo/logo_black.png'
							: '/img/logo/logo_white.png'
					}
					style={{
						width: { md: '300px' },
						height: { md: '54px' }
					}}
				/>
				{/* Menu */}
				{listMenu.map((item, index) => {
					return (
						<HeaderItem
							language={language}
							dictionary={dictionary}
							key={index}
							item={item}
							textColor={textColor}
							isPathNameMatch={pathName.includes(item?.link || '')}
						/>
					)
				})}
			</Box>
			<CartHeader
				openPoper={openPoper}
				setOpenPoper={setOpenPoper}
				textColor={textColor}
				handleChange={handleChange}
				language={language}
				dictionary={dictionary}
			/>
		</Box>
	) : (
		<Box
			sx={{
				position: 'fixed',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: isHaveBg ? '#fff' : 'transparent',
				maxWidth: {
					xs: '100%',
					sm: 'var(--max-width-sm)'
				},
				margin: '12px auto',
				color: '#000',
				boxShadow: isHaveShadow
					? '0px 18px 36px 0px rgba(200, 200, 200, 0.25)'
					: 'none',
				padding: '12px 16px',
				...style
			}}
		>
			{/* Logo */}
			<ImageItem
				imgSrc={
					textColor === '#000'
						? '/img/logo/logo_black.png'
						: '/img/logo/logo_white.png'
				}
				style={{
					width: '200px',
					height: '46px'
				}}
			/>
			<motion.nav
				initial={false}
				animate={isOpen ? 'open' : 'closed'}
				custom={height}
				ref={containerRef}
			>
				<motion.div className='background' variants={sidebar} />
				<Navigation
					textColor={textColor}
					dictionary={dictionary}
					language={language}
					listMenu={listMenu}
					handleChange={handleChange}
					openPoper={openPoper}
					setOpenPoper={setOpenPoper}
				/>
				<MenuToggle toggle={() => toggleOpen()} />
			</motion.nav>
		</Box>
	)
}

export default Header

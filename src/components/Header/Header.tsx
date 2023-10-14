'use client'
import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import ImageItem from '../base/ImageItem'
import HeaderItem from './HeaderItem'
import { SelectChangeEvent } from '@mui/material/Select'

import MenuIcon from '@mui/icons-material/Menu'
import CartHeader from './CartHeader'
import { usePathname, useRouter } from 'next/navigation'
import { useStore } from '@/store'

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

	const [language, setLanguage] = React.useState(pathName.split('/')[1])
	const [isShowMenu, setIsShowMenu] = React.useState(false)

	const redirectedPathName = (locale: string) => {
		if (!pathName) return '/'
		const segments = pathName.split('/')
		segments[1] = locale
		return segments.join('/')
	}

	const handleChange = (event: SelectChangeEvent) => {
		UserSlice.setLang(event.target.value as string)
		setLanguage(event.target.value as string)
		router.push(redirectedPathName(event.target.value as string))
	}

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
					position: 'absolute',
					display: openPoper ? 'block' : 'none',
					top: '-15px',
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
			<MenuIcon
				sx={{
					cursor: 'pointer',
					color: textColor
				}}
				onClick={() => {
					setIsShowMenu(!isShowMenu)
				}}
			/>

			{isShowMenu && (
				<Box
					sx={{
						position: 'absolute',
						top: '100%',
						right: '0',
						backgroundColor: '#fff',
						zIndex: 2,
						padding: '12px',
						boxShadow: '0px 18px 36px 0px rgba(200, 200, 200, 0.25)'
					}}
				>
					{/* Menu */}
					{listMenu.map(item => {
						return (
							<HeaderItem
								key={item.id}
								item={item}
								textColor={textColor}
								dictionary={dictionary}
								language={language}
							/>
						)
					})}
					<CartHeader
						textColor={textColor}
						handleChange={handleChange}
						language={language}
						openPoper={openPoper}
						setOpenPoper={setOpenPoper}
						dictionary={dictionary}
					/>
				</Box>
			)}
		</Box>
	)
}

export default Header

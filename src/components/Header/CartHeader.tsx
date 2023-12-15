import { stringAvatar } from '@/helper'
import { useStore } from '@/store'
import {
	Box,
	MenuItem,
	Popper,
	Select,
	Typography,
	useMediaQuery
} from '@mui/material'
import Avatar from '@mui/material/Avatar/Avatar'
import Link from 'next/link'
import React from 'react'
import ImageItem from '../base/ImageItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import LogoutIcon from '@mui/icons-material/Logout'
import AvatarPoper from './AvatarPoper'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import { useLogin, useLogout } from '@/service/react-query/user.query'
import { usePathname, useRouter } from 'next/navigation'
import { i18n } from '../../../i18n-config'
import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'

const CartHeader = ({
	textColor,
	language,
	handleChange,
	openPoper,
	setOpenPoper,
	dictionary
}: {
	textColor: string
	language: string
	handleChange: (event: any) => void
	openPoper: boolean
	setOpenPoper: (value: boolean) => void
	dictionary: any
}) => {
	const { UserSlice } = useStore()
	const router = useRouter()
	const { isLoading, mutate: logout } = useLogout()
	const matches = useMediaQuery('(min-width:900px)')
	const handleClick = () => {
		setOpenPoper(!openPoper)
	}

	const handleLogout = () => {
		signOut()
		logout()
		setOpenPoper(false)
	}

	const listAvatarPoper = [
		{
			id: '4',
			icon: <NotificationsActiveIcon />,
			href: `/${language}/user/settings/notifications`, // for both admin and user
			text: 'Notify',
			onClick: handleClick,
			img: '/icon/alarm.png',
			gif: '/icon/alarm.gif'
		},
		{
			id: '1',
			icon: <AccountCircleIcon />,
			href: `/${language}/user/settings/infor`, // for both admin and user
			text: 'Infor',
			onClick: handleClick,
			img: '/icon/profile.png',
			gif: '/icon/profile.gif'
		},
		{
			id: '2',
			icon: <LocalMallIcon />,
			// href: '/user/order', // for both admin and user
			text: 'Order',
			href: `/${language}/user/order`,
			onClick: handleClick,
			img: '/icon/orders.png',
			gif: '/icon/orders.gif'
		},
		{
			id: '3',
			icon: <LogoutIcon />,
			text: 'Logout',
			onClick: handleLogout,
			img: '/icon/logout.png',
			gif: '/icon/logout.gif'
		}
		// {
		// 	id: '4',
		// 	icon: <LogoutIcon />,
		// 	href: '/user/product/create',
		// 	text: 'create',
		// 	onClick: handleClick
		// }
	]

	const variants = {
		open: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 }
			}
		},
		closed: {
			y: 50,
			opacity: 0,
			transition: {
				y: { stiffness: 1000 }
			}
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: { xs: 'flex-start', md: 'center' },
				flexDirection: { xs: 'column', md: 'row' },
				'& li': {
					listStyle: 'none'
				}
			}}
		>
			<motion.li
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				<Select
					id='select language'
					value={language}
					onChange={handleChange}
					sx={{
						color: { xs: '#000', md: textColor },
						'& fieldset': {
							border: 'none'
						},
						'& svg': {
							color: { xs: '#000', md: textColor }
						},
						'& .MuiSelect-select': {
							p: { xs: '0' }
						}
					}}
				>
					{i18n.locales.map(locale => {
						return (
							<MenuItem key={locale} value={locale}>
								{locale === 'en'
									? 'English'
									: locale === 'vn'
									  ? 'Tiếng Việt'
									  : 'Korean'}
							</MenuItem>
						)
					})}
				</Select>
			</motion.li>

			<motion.li
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				<Box
					sx={{
						position: 'relative',
						mt: { xs: '24px', md: '0' },
						mr: '36px',
						mb: { xs: '12px', md: '0' }
					}}
				>
					<Box
						sx={{
							zIndex: 3,
							cursor: 'pointer',
							position: 'absolute',
							right: { xs: '-100%', md: '-50% ', xl: '-50%' },
							top: { xs: '-50%', md: '-32%', lg: '-30%' }
						}}
					>
						<Box
							sx={{
								backgroundColor: '#9E5F00',
								width: { xs: '24px', md: '28px' },
								height: { xs: '24px', md: '28px' },
								borderRadius: '50%',
								textAlign: 'center'
							}}
						>
							<Typography
								sx={{
									color: '#fff',
									fontSize: { xs: '12px', md: '16px' },
									fontWeight: 600,
									lineHeight: { xs: '24px', md: '28px' }
								}}
							>
								{UserSlice.isLoggedIn ? UserSlice.totalProductInCart : 0}
							</Typography>
						</Box>
					</Box>
					<Link
						href={`/${UserSlice.lang}/user/cart`}
						onClick={(e: any) => {
							e.preventDefault()
							if (!UserSlice.isLoggedIn) {
								// push ro login page
								router.push('/login')
								return
							}
							router.push(`/${UserSlice.lang}/user/cart`)
						}}
					>
						{textColor === '#000' ? (
							<ImageItem
								imgSrc='/img/Cart_000.png'
								style={{
									width: { xs: '26px', md: '39px' },
									height: { xs: '26px', md: '35px' },
									'& img': {
										objectFit: 'contain'
									}
								}}
							/>
						) : (
							<ImageItem
								imgSrc={matches ? '/img/Cart_fff.png' : '/img/Cart_000.png'}
								style={{
									width: { xs: '26px', md: '39px' },
									height: { xs: '26px', md: '35px' },
									'& img': {
										objectFit: 'contain'
									}
								}}
							/>
						)}
					</Link>
				</Box>
			</motion.li>

			{UserSlice.isLoggedIn && (
				<motion.li
					variants={variants}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<Box
						sx={{
							cursor: 'pointer',
							position: 'relative',
							'&::before': {
								content: '""',
								position: 'absolute',
								top: '-6%',
								right: '2px',
								backgroundColor: '#59ff94',
								width: '12px',
								height: '12px',
								borderRadius: '50%',
								zIndex: 5
							}
						}}
					>
						{UserSlice?.user?.avatar ? (
							<ImageItem
								onClick={(e: any) => {
									e.stopPropagation()
									// handleClick()
									setOpenPoper(!openPoper)
								}}
								imgSrc={UserSlice.user.avatar}
								style={{
									width: { xs: '40px', md: '48px' },
									height: { xs: '40px', md: '48px' },
									borderRadius: '50%',
									objectFit: 'cover',
									cursor: 'pointer',
									'& img': {
										borderRadius: '50%'
									}
								}}
							/>
						) : (
							<Avatar
								{...stringAvatar(UserSlice.user?.username || 'U')}
								onClick={e => {
									e.stopPropagation()
									// handleClick()
									setOpenPoper(!openPoper)
								}}
							/>
						)}
						{openPoper && (
							<Box
								sx={{
									position: 'absolute',
									top: { xs: '102%', md: '110%' },
									right: '0',
									zIndex: 5,
									backgroundColor: '#fff',
									color: '#000',
									boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
									borderRadius: '4px',
									padding: { xs: '8px 12px' },
									'& a': {
										textDecoration: 'none',
										color: '#000'
									}
								}}
							>
								{listAvatarPoper.map((item, index) => {
									return (
										<AvatarPoper
											key={index}
											href={item?.href}
											icon={item.icon}
											text={item.text}
											onClick={item?.onClick}
											img={item.img}
											gif={item.gif}
											dictionary={dictionary}
										/>
									)
								})}
							</Box>
						)}
					</Box>
				</motion.li>
			)}

			{!UserSlice.isLoggedIn && (
				<motion.li
					variants={variants}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
				>
					<Link
						href='/login'
						style={{
							textDecoration: 'none',
							color: textColor
						}}
					>
						{dictionary['navbar'].login}
					</Link>
				</motion.li>
			)}
		</Box>
	)
}

export default CartHeader

import { stringAvatar } from '@/helper'
import { useStore } from '@/store'
import { Box, MenuItem, Popper, Select, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar/Avatar'
import Link from 'next/link'
import React from 'react'
import ImageItem from '../base/ImageItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import AvatarPoper from './AvatarPoper'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import Loading from '@/app/loading'
import { useLogin, useLogout } from '@/service/react-query/user.query'
import { useRouter } from 'next/navigation'

const CartHeader = ({
	textColor,
	language,
	handleChange,
	openPoper,
	setOpenPoper
}: {
	textColor: string
	language: string
	handleChange: (event: any) => void
	openPoper: boolean
	setOpenPoper: (value: boolean) => void
}) => {
	const { UserSlice } = useStore()
	const router = useRouter()
	const { isLoading, mutate: logout } = useLogout()

	const handleClick = () => {
		setOpenPoper(!openPoper)
	}

	const handleLogout = () => {
		logout()
		setOpenPoper(false)
		//reload page
		// window.location.reload()
	}

	const listAvatarPoper = [
		{
			id: '1',
			icon: <AccountCircleIcon />,
			// href: '/user/infor', // for both admin and user
			text: 'Infor',
			onClick: handleClick
		},
		{
			id: '2',
			icon: <LocalMallIcon />,
			// href: '/user/order', // for both admin and user
			text: 'Order',
			onClick: handleClick
		},
		{
			id: '3',
			icon: <LogoutIcon />,
			text: 'Logout',
			onClick: handleLogout
		},
		{
			id: '4',
			icon: <LogoutIcon />,
			href: '/user/product/create',
			text: 'create',
			onClick: handleClick
		}
	]

	// if (isLoading) return <Loading />
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: { xs: 'flex-start', md: 'center' },
				flexDirection: { xs: 'column', md: 'row' }
			}}
		>
			<Select
				id='select language'
				value={language}
				onChange={handleChange}
				sx={{
					// mr: { md: '20px' },
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
				<MenuItem value={'en'}>Eng</MenuItem>
				<MenuItem value={'vn'}>Viet Nam</MenuItem>
				<MenuItem value={'ko'}>Korean</MenuItem>
			</Select>

			<Box
				sx={{
					position: 'relative',
					mt: { xs: '24px', md: '0' },
					mr: '36px'
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
					href='/user/cart'
					onClick={(e: any) => {
						e.preventDefault()
						if (!UserSlice.isLoggedIn) {
							// push ro login page
							router.push('/login')
							return
						}
						router.push('/user/cart')
					}}
				>
					{textColor === '#000' ? (
						<ImageItem
							imgSrc='/img/Cart_000.png'
							style={{
								width: { xs: '26px', md: '39px' },
								height: { xs: '26px', md: '35px' }
							}}
						/>
					) : (
						<ImageItem
							imgSrc='/img/Cart_fff.png'
							style={{
								width: { xs: '26px', md: '39px' },
								height: { xs: '26px', md: '35px' }
							}}
						/>
					)}
				</Link>
			</Box>
			{UserSlice.isLoggedIn && (
				<Box
					sx={{
						cursor: 'pointer'
					}}
				>
					<Avatar
						{...stringAvatar(UserSlice.user?.username || 'U')}
						onClick={e => {
							e.stopPropagation()
							// handleClick()
							setOpenPoper(!openPoper)
						}}
					/>
					{openPoper && (
						<Box
							sx={{
								position: 'absolute',
								top: '110%',
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
									/>
								)
							})}
						</Box>
					)}
				</Box>
			)}
			{!UserSlice.isLoggedIn && (
				<Link
					href='/login'
					style={{
						textDecoration: 'none',
						color: textColor
					}}
				>
					Login
				</Link>
			)}
		</Box>
	)
}

export default CartHeader

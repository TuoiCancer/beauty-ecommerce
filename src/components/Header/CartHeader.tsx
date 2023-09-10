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

const CartHeader = ({
	textColor,
	language,
	handleChange
}: {
	textColor: string
	language: string
	handleChange: (event: any) => void
}) => {
	const { UserSlice } = useStore()
	const [openPoper, setOpenPoper] = React.useState(false)

	const handleClick = () => {
		setOpenPoper(!openPoper)
	}

	const handleLogout = () => {
		UserSlice.setIsLoggedIn(false)
		localStorage.removeItem('data')
		localStorage.removeItem('rememberPassword')
		setOpenPoper(false)
		//reload page
		window.location.reload()
	}

	const listAvatarPoper = [
		{
			id: '1',
			icon: <AccountCircleIcon />,
			href: '/profile', // for both admin and user
			text: 'Infor'
		},
		{
			id: '2',
			icon: <LocalMallIcon />,
			href: '/profile', // for both admin and user
			text: 'Order'
		},
		{
			id: '3',
			icon: <LogoutIcon />,
			text: 'Logout',
			onClick: handleLogout
		}
	]

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
							{2}
						</Typography>
					</Box>
				</Box>
				<Link href='/user/cart'>
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
					<Avatar {...stringAvatar('Xuan Tuoi')} onClick={handleClick} />
					{openPoper && (
						<Box
							sx={{
								position: 'absolute',
								top: '110%',
								right: '0',
								zIndex: 2,
								backgroundColor: '#fff',
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
						color: '#000'
					}}
				>
					Login
				</Link>
			)}
		</Box>
	)
}

export default CartHeader

'use client'

import {
	Box,
	IconButton,
	Toolbar,
	Typography,
	styled,
	Popover
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { appbarHeight, drawerWidth } from '../RootAdminLayout'
import { usePathname } from 'next/navigation'
import BaseSearch from '@/components/base/BaseSearch'
import AdminAvatar from './AdminAvatar'
import { useStore } from '@/store'
import React from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { useLogout } from '@/service/react-query/user.query'

interface IAdminHeader {
	open: boolean
	onOpenDrawer: () => void
	dictionary: { [key: string]: any }
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		height: appbarHeight,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}))

const AdminHeader = ({ open, onOpenDrawer, dictionary }: IAdminHeader) => {
	const pathname = usePathname()
	const { UserSlice } = useStore()

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
	const openPopper = Boolean(anchorEl)
	const id = openPopper ? 'simple-popover' : undefined

	const { isLoading, mutate: logout } = useLogout()

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const getTitle = () => {
		const splitPath = pathname.split('/')
		const rawTitle = splitPath[splitPath.length - 1]
		return dictionary['sidebar'][rawTitle === 'admin' ? 'dashboard' : rawTitle]
	}

	const handleLogout = () => {
		logout()
		setAnchorEl(null)
	}

	return (
		<AppBar sx={{ backgroundColor: '#fff' }} position='fixed' open={open}>
			<Toolbar sx={{ justifyContent: 'space-between', height: '100%' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', width: '20%' }}>
					<IconButton
						aria-label='open drawer'
						onClick={onOpenDrawer}
						edge='start'
						sx={{
							marginRight: 5,
							color: '#000',
							...(open && { display: 'none' })
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div' color='#343A40'>
						{getTitle()}
					</Typography>
				</Box>
				<Box sx={{ width: '40%' }}>
					<BaseSearch />
				</Box>
				<Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
					<AdminAvatar
						username={UserSlice.user?.username}
						onClick={handleClick}
					/>
					<Popover
						id={id}
						open={openPopper}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						sx={{
							mt: '8px'
						}}
						onClick={handleLogout}
					>
						<Box
							sx={{
								padding: '1rem',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								cursor: 'pointer',
								transition: 'all 0.3s',
								'&:hover': {
									backgroundColor: '#0C2E4F',
									color: '#fff',
									opacity: 0.9
								}
							}}
						>
							<LogoutIcon />
							<Typography
								sx={{
									ml: '12px'
								}}
							>
								Logout
							</Typography>
						</Box>
					</Popover>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default AdminHeader

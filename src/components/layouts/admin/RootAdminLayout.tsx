'use client'

import { Box, CssBaseline } from '@mui/material'
import React, { useState } from 'react'
import AdminSidebar from './sidebar/AdminSidebar'
import AdminHeader from './header/AdminHeader'
import AdminMainContent from './AdminMainContent'
import { usePathname } from 'next/navigation'

interface IRootAdminLayout {
	children: React.ReactNode
	dictionary: { [key: string]: any }
}

export const drawerWidth = 268
export const appbarHeight = 70

const RootAdminLayout = ({ children, dictionary }: IRootAdminLayout) => {
	const [open, setOpen] = useState(true)

	const pathname = usePathname()

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AdminSidebar
				toggleDrawer={toggleDrawer}
				open={open}
				onCloseDrawer={handleDrawerClose}
				dictionary={dictionary}
			/>
			<AdminMainContent open={open}>
				<>
					{pathname.includes('/admin/dashboard') ? (
						<></>
					) : (
						<AdminHeader
							open={open}
							onOpenDrawer={handleDrawerOpen}
							dictionary={dictionary}
						/>
					)}
				</>
				<Box
					sx={{
						paddingTop: `${appbarHeight}px`,
						height: pathname.includes('/admin/dashboard')
							? '100%'
							: `calc(100% - ${appbarHeight}px)`,
						background: pathname.includes('/admin/dashboard')
							? '#F8F8F8'
							: '#fff',
						width: '100%'
					}}
				>
					{children}
				</Box>
			</AdminMainContent>
		</Box>
	)
}

export default RootAdminLayout

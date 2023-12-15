import React from 'react'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SecurityIcon from '@mui/icons-material/Security'
import EditIcon from '@mui/icons-material/Edit'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { Box, Typography } from '@mui/material'
import SidebarInfoItem from './information/SidebarInfoItem'

const SidebarSetting = ({ dictionary, lang }: any) => {
	const listSidebar = [
		{
			id: 'user-info',
			text: 'Profile',
			href: '/' + lang + '/user/settings/infor',
			img: '/img/user.png'
		},
		{
			id: 'notify',
			text: 'Notifications',
			href: '/' + lang + '/user/settings/notifications',
			img: '/img/bell.png'
		},
		{
			id: 'authen',
			text: 'Password and Security',
			href: '/' + lang + '/user/settings/security',
			img: '/img/shield.png'
		}
	]

	return (
		<Box
			id='sidebar'
			sx={{
				borderRight: '2px solid #f2f2f2',
				gridColumn: { xs: '1 / 2', md: '1 / 2' },
				boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
				height: '100%',
				padding: '120px 0 120px 0',
				maxWidth: '600px'
			}}
		>
			<Box
				sx={{
					padding: '24px 36px',
					'&::after': {
						content: '""',
						display: 'block',
						width: '20%',
						height: '1px',
						backgroundColor: '#98A8BB',
						marginTop: '24px'
					}
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Montserrat, sans-serif',
						fontWeight: '600',
						fontSize: '22px',
						mb: '16px'
					}}
				>
					Setting
				</Typography>
				<Typography
					sx={{
						fontFamily: 'Montserrat, sans-serif',
						fontWeight: '400',
						fontSize: '14px',
						color: '#C9D2DA'
					}}
				>
					This page allow you to change configuration what you have made
				</Typography>
			</Box>
			{listSidebar.map((item, index: number) => {
				return (
					<SidebarInfoItem key={index} item={item} dictionary={dictionary} />
				)
			})}
		</Box>
	)
}

export default SidebarSetting

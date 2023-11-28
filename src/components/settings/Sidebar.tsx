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
			text: 'User Info',
			icon: PersonOutlineIcon,
			href: '/' + lang + '/user/settings/infor'
		},
		{
			id: 'notify',
			text: 'Notifications',
			icon: NotificationsNoneIcon,
			href: '/' + lang + '/user/settings/notifications'
		},
		{
			id: 'authen',
			text: 'Password and Security',
			icon: SecurityIcon,
			href: '/' + lang + '/user/settings/security'
		}
	]
	return (
		<Box
			id='sidebar'
			sx={{
				borderRight: '2px solid #f2f2f2',
				gridColumn: { xs: '1 / 2', md: '1 / 2' }
			}}
		>
			<Typography
				variant='h2'
				sx={{
					fontFamily: 'var(--font-family)',
					fontWeight: '600',
					fontSize: '36px',
					marginBottom: '32px'
				}}
			>
				{dictionary['Setting']['sidebar']['title']}
			</Typography>
			{listSidebar.map((item, index: number) => {
				return (
					<SidebarInfoItem key={index} item={item} dictionary={dictionary} />
				)
			})}
		</Box>
	)
}

export default SidebarSetting

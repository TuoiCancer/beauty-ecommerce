import { stringAvatar } from '@/helper'
import { Avatar, Box, Typography } from '@mui/material'

interface IAdminAvatar {
	username: string
	onClick: any
}

const AdminAvatar = ({ username, onClick }: IAdminAvatar) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: '1rem',
				cursor: 'pointer'
			}}
			onClick={onClick}
		>
			<Typography color='#343A40' fontWeight='500' fontSize='14'>
				{username}
			</Typography>
			<Avatar {...stringAvatar(username || 'A')}></Avatar>
		</Box>
	)
}

export default AdminAvatar

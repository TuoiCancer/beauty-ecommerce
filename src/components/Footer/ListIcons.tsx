import React from 'react'

import { Box } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from 'next/link'
const ListIcons = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: { xs: 'center', md: 'flex-start' },
				'& svg': {
					color: '#fff',
					fontSize: '32px',
					marginRight: '20px'
				}
			}}
		>
			<Link href=''>
				<FacebookIcon />
			</Link>
			<Link href=''>
				<TwitterIcon />
			</Link>
			<Link href=''>
				<LinkedInIcon />
			</Link>
		</Box>
	)
}

export default ListIcons

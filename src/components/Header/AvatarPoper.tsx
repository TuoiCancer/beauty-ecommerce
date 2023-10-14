import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const AvatarPoper = ({
	icon,
	text,
	href,
	onClick,
	dictionary
}: {
	icon: React.ReactNode
	text: string
	href?: string
	onClick?: () => void
	dictionary: any
}) => {
	if (href) {
		return (
			<Link href={href}>
				<Box
					onClick={onClick}
					sx={{
						alignItems: 'center',
						paddingBottom: '8px',
						transition: 'all 0.2s ease-in-out',
						display: 'flex',
						'&:hover': {
							color: 'var(--main-green)'
						}
					}}
				>
					{icon}
					<Typography
						sx={{
							marginLeft: '10px',
							fontSize: '14px',
							fontFamily: 'Montserrat'
						}}
					>
						{dictionary['navbar'][text]}
					</Typography>
				</Box>
			</Link>
		)
	}
	return (
		<Box
			onClick={onClick}
			sx={{
				alignItems: 'center',
				paddingBottom: '8px',
				transition: 'all 0.2s ease-in-out',
				display: 'flex',
				'&:hover': {
					color: 'var(--main-green)'
				}
			}}
		>
			{icon}
			<Typography
				sx={{
					marginLeft: '10px',
					fontSize: '14px',
					fontFamily: 'Montserrat'
				}}
			>
				{dictionary['navbar'][text]}
			</Typography>
		</Box>
	)
}

export default AvatarPoper

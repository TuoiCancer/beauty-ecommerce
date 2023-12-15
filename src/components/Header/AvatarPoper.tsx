import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import ImageItem from '../base/ImageItem'

const AvatarPoper = ({
	icon,
	text,
	href,
	onClick,
	dictionary,
	img,
	gif
}: {
	icon: React.ReactNode
	text: string
	href?: string
	onClick?: () => void
	dictionary: any
	img?: string
	gif?: string
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
							color: 'var(--main-green)',
							'& #image-item': {
								display: 'none'
							}
						},
						'&:hover #gif-item': {
							display: 'block'
						},
						'& #gif-item': {
							display: 'none'
						}
					}}
				>
					<ImageItem
						idBox='image-item'
						imgSrc={img || ''}
						style={{
							width: '36px',
							height: '36px'
						}}
					/>
					<ImageItem
						idBox='gif-item'
						imgSrc={gif || ''}
						style={{
							width: '36px',
							height: '36px'
						}}
					/>
					<Typography
						sx={{
							marginLeft: '10px',
							fontSize: '14px',
							fontFamily: 'Montserrat',
							whiteSpace: 'nowrap'
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
					color: 'var(--main-green)',
					'& #image-item': {
						display: 'none'
					}
				},
				'&:hover #gif-item': {
					display: 'block'
				},
				'& #gif-item': {
					display: 'none'
				}
			}}
		>
			<ImageItem
				idBox='image-item'
				imgSrc={img || ''}
				style={{
					width: '36px',
					height: '36px'
				}}
			/>
			<ImageItem
				idBox='gif-item'
				imgSrc={gif || ''}
				style={{
					width: '36px',
					height: '36px'
				}}
			/>
			{/* {icon} */}
			<Typography
				sx={{
					marginLeft: '10px',
					fontSize: '14px',
					fontFamily: 'Montserrat',
					whiteSpace: 'nowrap'
				}}
			>
				{dictionary['navbar'][text]}
			</Typography>
		</Box>
	)
}

export default AvatarPoper

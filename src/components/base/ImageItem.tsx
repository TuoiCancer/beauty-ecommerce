'use client'
import { Box, Skeleton } from '@mui/material'
import Image from 'next/legacy/image'
import React, { useState } from 'react'

const ImageItem = ({
	imgSrc,
	width,
	height,
	style,
	onClick,
	priority,
	idBox
}: {
	imgSrc: string
	width?: string
	height?: string
	style?: any
	onClick?: any
	priority?: boolean
	idBox?: string
}) => {
	const [loaded, setLoaded] = useState(false)
	return (
		<Box
			id={idBox}
			onClick={onClick}
			sx={{
				position: 'relative',
				height: `${height}`,
				width: `${width}`,
				'& img': {
					objectFit: 'cover'
				},
				...style
			}}
		>
			{!loaded && (
				<Skeleton
					animation='wave'
					sx={{ bgcolor: 'grey.100' }}
					variant='rectangular'
					width='100%'
					height='100%'
				/>
			)}
			<Image
				src={imgSrc}
				priority={priority}
				layout='fill'
				alt='image'
				style={{
					transition: 'all 0.3s ease-in-out'
				}}
				onLoad={() => {
					setLoaded(false)
				}}
				onLoadingComplete={() => {
					setLoaded(true)
				}}
			/>
		</Box>
	)
}

export default ImageItem

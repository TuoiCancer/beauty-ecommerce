'use client'
import { Box } from '@mui/material'
import Image from 'next/legacy/image'
import React from 'react'

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
			<Image
				src={imgSrc}
				priority={priority}
				layout='fill'
				alt='image'
				style={{
					transition: 'all 0.3s ease-in-out',
					opacity: 0
				}}
				className='transition-opacity opacity-0 duration-[2s]'
				onLoadingComplete={() => {
					setTimeout(() => {
						document
							.querySelectorAll('.transition-opacity')
							.forEach(el => el.classList.add('opacity-100'))
					}, 10)
				}}
			/>
		</Box>
	)
}

export default ImageItem

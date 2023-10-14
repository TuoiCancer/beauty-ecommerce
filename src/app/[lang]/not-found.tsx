import ImageItem from '@/components/base/ImageItem'
import Header from '@/components/Header/Header'
import { Box } from '@mui/material'
import React from 'react'

const PageNotFound = () => {
	return (
		<Box
			sx={{
				overflow: 'hidden',
				pt: '100px'
			}}
		>
			<Header
				isHaveShadow={true}
				isHaveBg={true}
				textColor='#000'
				style={{
					left: 0,
					right: 0,
					zIndex: 999,
					top: 0
				}}
			/>
			<ImageItem
				imgSrc='/img/notfound.png'
				style={{
					width: '100vw',
					height: '100vh'
				}}
			/>
		</Box>
	)
}

export default PageNotFound

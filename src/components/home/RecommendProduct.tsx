import React from 'react'

// import Swiper core and required modules
import SwiperCore, { Navigation, A11y, EffectFade, Autoplay } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/components/navigation/navigation.scss'
import 'swiper/swiper.scss'
import 'swiper/components/effect-fade/effect-fade.scss'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ibarra } from '../../../public/font'
import { listProduct } from '@/constants'

// install Swiper modules
SwiperCore.use([Navigation, Autoplay, A11y])

const RecommendProduct = ({ lang }: { lang: string }) => {
	const theme = useTheme()
	const biggerSm = useMediaQuery(theme.breakpoints.up('md'))

	return (
		<Box
			sx={{
				maxWidth: {
					xs: 'var(--max-width-xs)',
					sm: 'var(--max-width-sm)',
					md: 'var(--max-width-md)',
					lg: 'var(--max-width-lg)',
					xl: 'var(--max-width-xl)'
				},
				margin: '0 auto',
				pt: { md: '80px', lg: '120px' },
				px: { md: '24px' },

				'& .swiper-button-next, .swiper-button-prev': {
					width: { md: '40px' },
					height: { md: '40px' },
					color: '#fff',
					background: 'var(--main-green) !important',
					padding: { md: '0 10px' },
					borderRadius: '50%',
					boxShadow: '0 0 10px rgba(255,255,255,.3)',
					'&::after': {
						fontSize: { md: '20px' }
					}
				},
				'& .swiper-slide': {
					background: '#ccc',
					width: '100%',
					height: '300px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: '10px'
				}
			}}
		>
			<Typography
				variant='h1'
				className={ibarra.className}
				sx={{
					textAlign: 'center',
					color: '#121212',
					fontSize: { xs: '24px', md: '40px', lg: '48px' },
					fontWeight: 700,
					lineHeight: '125.5%',
					pb: { md: '82px' }
				}}
			>
				Products for you
			</Typography>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false
				}}
				navigation
				onSwiper={swiper => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}
			>
				<SwiperSlide>
					{listProduct.map((item, index) => {
						return <div key={index}>{index + 1}</div>
					})}
				</SwiperSlide>
				<SwiperSlide>
					{listProduct.map((item, index) => {
						return <div key={index}>{index + 1}</div>
					})}
				</SwiperSlide>
			</Swiper>
		</Box>
	)
}

export default RecommendProduct

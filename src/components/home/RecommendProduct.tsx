import React from 'react'

// import Swiper core and required modules
import SwiperCore, { Navigation, A11y, EffectFade, Autoplay } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/components/navigation/navigation.scss'
import 'swiper/swiper.scss'
import 'swiper/components/effect-fade/effect-fade.scss'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { hindMadurai, ibarra } from '../../../public/font'
import { TopProductInterface } from '@/utils/product.interface'
import TopProductItem from './TopProductItem'

import { motion } from 'framer-motion'
import { useStore } from '@/store'
// install Swiper modules
SwiperCore.use([Navigation, Autoplay, A11y])

const recommendVariants = {
	hidden: { opacity: 0, y: 80 },
	visible: {
		opacity: 1,
		y: 0
	}
}

const RecommendProduct = ({
	lang,
	dataGetListProduct,
	dictionary
}: {
	lang: string
	dataGetListProduct: TopProductInterface[]
	dictionary: any
}) => {
	const { UserSlice } = useStore()
	const productPerPage = 12
	const totalPage = Math.ceil(dataGetListProduct?.length / productPerPage)

	const listTopProduct = Array.from({ length: totalPage }, (_, i) => i + 1).map(
		item => {
			return dataGetListProduct.slice(
				(item - 1) * productPerPage,
				item * productPerPage
			)
		}
	)

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
				pt: { md: '120px' },

				'& .swiper-button-next, .swiper-button-prev': {
					color: '#fff',
					background: 'var(--main-green) !important',
					padding: '0 22px',
					borderRadius: '50%',
					boxShadow: '0 0 10px rgba(255,255,255,.3)',
					'&::after': {
						fontSize: '20px'
					}
				},
				'& .swiper-slide': {
					width: '100%',
					px: { xs: '12px', sm: '16px', lg: '24px' },
					py: { xs: '12px', sm: '16px', lg: '24px' },
					// margin: { xs: '0 !important' },
					display: 'grid',
					gridTemplateColumns: {
						xl: '1fr 1fr 1fr 1fr',
						lg: '1fr 1fr 1fr',
						md: '1fr 1fr',
						sm: '1fr'
					},
					gridGap: '16px'
				}
			}}
		>
			<motion.div
				variants={recommendVariants}
				initial='hidden'
				whileInView='visible'
				transition={{ type: 'spring' }}
				style={{
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'column',
					width: '100%'
				}}
			>
				{UserSlice?.isLoggedIn && (
					<Typography
						variant='h1'
						className={ibarra.className}
						sx={{
							textAlign: 'center',
							color: '#121212',
							fontSize: { xs: '24px', md: '40px', lg: '48px' },
							fontWeight: 700,
							lineHeight: '125.5%'
						}}
					>
						{dictionary['Home']['topproduct'].title}
					</Typography>
				)}

				{!UserSlice?.isLoggedIn && (
					<Typography
						variant='h1'
						className={ibarra.className}
						sx={{
							textAlign: 'center',
							color: '#121212',
							fontSize: { xs: '24px', md: '40px', lg: '48px' },
							fontWeight: 700,
							lineHeight: '125.5%'
						}}
					>
						Best Sellers of the Week
					</Typography>
				)}

				<Typography
					variant='h2'
					className={hindMadurai.className}
					sx={{
						color: '#3E3E3E',
						fontSize: '18px',
						lineHeight: '180%',
						maxWidth: { md: '846px' },
						textAlign: 'center',
						margin: { md: '12px 0' },
						pb: { md: '40px' }
					}}
				>
					{dictionary['Home']['topproduct'].description}
				</Typography>
			</motion.div>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				// autoplay={{
				// 	delay: 5000,
				// 	disableOnInteraction: false
				// }}
				navigation
			>
				{listTopProduct &&
					listTopProduct.map((item, index) => {
						return (
							<SwiperSlide key={index}>
								{item.map((item, index) => {
									return (
										<TopProductItem
											key={item.id}
											item={item}
											dictionary={dictionary}
										/>
									)
								})}
							</SwiperSlide>
						)
					})}
			</Swiper>
		</Box>
	)
}

export default RecommendProduct

'use client'

import BaseButton from '@/components/base/BaseButton'
import ImageItem from '@/components/base/ImageItem'
import BrandItem from '@/components/home/BrandItem'
import ImageSliderItem, { Comment } from '@/components/home/ImageSliderItem'
import IntroItem from '@/components/home/IntroItem'
import TopProductItem from '@/components/home/TopProductItem'
import { listBrands, listComments } from '@/constants'
import SwipeableViews from 'react-swipeable-views'
import { Box, MobileStepper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { autoPlay } from 'react-swipeable-views-utils'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { useGetBestSellerProduct } from '@/service/react-query/product.query'
import {
	ProductInterface,
	TopProductInterface
} from '@/utils/product.interface'
import Loading from '../../loading'
import { hindMadurai, homemadeApple, ibarra } from '../../../../../public/font'
import RecommendProduct from '@/components/home/RecommendProduct'
import { motion } from 'framer-motion'
import { ListIntroduce } from '@/components/Header/Introduce'
import TextIntro from '@/components/Header/Introduce/TextIntro'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const textIntroVariants = {
	hidden: { opacity: 0, x: 40 },
	visible: {
		opacity: 1,
		x: 0
	}
}

const textHeaderVariants = {
	hidden: { opacity: 0, x: -40 },
	visible: {
		opacity: 1,
		x: 0
	}
}

const brandVariants = {
	hidden: { opacity: 0, y: 80 },
	visible: {
		opacity: 1,
		y: 0
	}
}

export default function Home({
	dictionary,
	lang
}: {
	dictionary: any
	lang: string
}) {
	const { UserSlice } = useStore()
	const theme = useTheme()
	const [activeStep, setActiveStep] = useState(0)

	const route = useRouter()
	const {
		isLoading: gettingProducts,
		data: dataGetListProduct,
		refetch
	} = useGetBestSellerProduct()

	useEffect(() => {
		refetch()
	}, [])

	const handleStepChange = (step: number) => {
		setActiveStep(step)
	}

	if (gettingProducts) return <Loading />
	return (
		<Box
			sx={{
				pb: { md: '180px' }
			}}
		>
			{/* Header */}
			<Box
				sx={{
					width: { md: '100%' },
					height: { xs: '50vh', md: '80vh', xl: '100vh' },
					background: 'linear-gradient(176deg, #FFF 0%, #F1F1F1 100%)',
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						top: { xs: '0', sm: '0', lg: '-36%', xl: '-58%' },
						right: { xs: '0', md: '-20%', lg: '-24%', xl: '-29%' },
						width: {
							xs: '200px',
							sm: '400px',
							md: '520px',
							lg: '860px',
							xl: '1400px'
						},
						height: {
							xs: '200px',
							sm: '400px',
							md: '520px',
							lg: '860px',
							xl: '1359px'
						},
						borderRadius: '50%',
						border: ' 1px solid rgba(110, 157, 72, 0.80)',
						background: '#A0BE88 '
					}}
				>
					<ImageItem
						imgSrc='/img/leaf.png'
						priority={true}
						style={{
							position: 'absolute',
							top: { sm: '50%', md: '82%', lg: '50%' },
							left: { sm: '-30%', md: '10%', lg: '-6%' },
							transform: 'translate(-50%, -50%)',
							width: { sm: '200px', lg: '400px' },
							height: { sm: '200px', lg: '386px' }
						}}
					/>
					<ImageItem
						imgSrc='/img/leaf.png'
						priority={true}
						style={{
							position: 'absolute',
							top: '60%',
							left: '37%',
							transform: 'rotate(45deg)',
							width: { lg: '216px' },
							height: { lg: '206px' }
						}}
					/>

					<ImageItem
						imgSrc='/img/shadow.png'
						style={{
							position: 'absolute',
							bottom: { md: '-20%', lg: '-14%', xl: '-10%' },
							right: { md: '-70%', lg: '2%', xl: ' 30%' },
							width: { md: '920px' },
							height: { md: '110px' },
							'& img': {
								objectFit: 'fill'
							}
						}}
					/>
				</Box>

				<motion.div
					variants={textHeaderVariants}
					initial='hidden'
					whileInView='visible'
					transition={{ type: 'spring' }}
				>
					<Box
						sx={{
							height: { md: '100%' },
							margin: {
								xs: '12px',
								sm: '12px 24px',
								md: ' 0 24px',
								lg: '0 64px',
								xl: '0 120px'
							},
							maxWidth: { sm: '520px', md: '620px' },
							position: 'relative',
							top: 0,
							transform: { xs: 'translateY(80%)', sm: 'translateY(50%)' }
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: '16%',
								right: '-20px',
								width: { lg: '40px', xl: '90px' },
								height: { lg: '40px', xl: '90px' },
								borderRadius: '50%',
								background:
									'linear-gradient(180deg, rgba(82, 115, 61, 0.80) 25%, rgba(200, 210, 172, 0.00) 100%)',
								backdropFilter: 'blur(20px)',
								zIndex: '-1'
							}}
						/>
						<Typography
							className={ibarra.className}
							variant='h1'
							sx={{
								color: '#121212',
								fontSize: { xs: '26px', sm: '36px', md: '48px', lg: '64px' },
								fontWeight: 700,
								lineHeight: '121.5%' /* 77.76px */
								// fontFamily: 'Ibarra Real Nova'
							}}
						>
							{dictionary['header'].title}
						</Typography>
						<Typography
							className={hindMadurai.className}
							variant='h2'
							sx={{
								color: '#3E3E3E',
								fontSize: { xs: '14px', sm: '16px', md: '18px' },
								fontWeight: 400,
								lineHeight: '180%',
								padding: { xs: '12px 0', md: '45px 0' }
							}}
						>
							{dictionary['header'].description}
						</Typography>
						<Box>
							<BaseButton
								bgStyle='gradient'
								label={dictionary['header'].button}
								variant='contained'
								type='button'
								styleSx={{
									padding: { md: '16px 40px' },
									borderRadius: { md: '50px' },
									color: '#fff',
									background:
										'linear-gradient(146deg, #315316 0%, #72A748 100%)',
									fontStyle: 'capitalize',
									mr: { xs: '12px', md: '20px' }
								}}
								onClick={() => route.push(`/${UserSlice.lang}/user/product`)}
							/>

							<BaseButton
								bgStyle='gradient'
								label={dictionary['header'].button02}
								variant='outlined'
								type='button'
								styleSx={{
									padding: { md: '16px 40px' },
									borderRadius: { md: '50px' },
									color: '#000',
									border: '1px solid #72A748',
									'&:hover': {
										border: '1px solid #315316',
										background: 'transparent'
									}
								}}
							/>
						</Box>
					</Box>
				</motion.div>
			</Box>
			{/* Introduce */}
			<Box
				id='introduce'
				sx={{
					maxWidth: {
						xs: '100%',
						sm: 'var(--max-width-sm)',
						md: 'var(--max-width-md)',
						lg: 'var(--max-width-lg)',
						xl: 'var(--max-width-xl)'
					},
					margin: { xs: '0 12px', sm: '0 auto' },
					px: { sm: '24px' },
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					pt: { sm: '62px', md: '80px', lg: '136px' },
					flexDirection: { xs: 'column', lg: 'row' },
					overflow: 'hidden'
				}}
			>
				<ListIntroduce dictionary={dictionary} />

				<Box
					sx={{
						flex: { lg: 1 }
					}}
				>
					<motion.div
						className='box'
						variants={textIntroVariants}
						initial='hidden'
						whileInView='visible'
						transition={{ type: 'spring' }}
					>
						<Typography
							className={ibarra.className}
							variant='h1'
							sx={{
								color: '#121212',
								fontSize: { xs: '24px', md: '48px' },
								fontWeight: 700,
								lineHeight: '125.5%'
							}}
						>
							{dictionary['Home']['introduce'].title}
						</Typography>
						<Typography
							variant='h2'
							className={hindMadurai.className}
							sx={{
								color: '#3E3E3E',
								fontSize: { xs: '16px', md: '18px' },
								lineHeight: '180%',
								padding: { xs: '12px 0', md: '48px 0' }
							}}
						>
							{dictionary['Home']['introduce'].description}
						</Typography>
						<Typography
							variant='h3'
							className={homemadeApple.className}
							sx={{
								color: '#315316',
								fontSize: { xs: '20px', md: '36px' },
								fontFamily: 'Homemade Apple',
								margin: { xs: '16px 0' }
							}}
						>
							glow $ grace
						</Typography>
						<Typography
							variant='h4'
							sx={{
								color: '#121212',
								fontSize: '20px',
								lineHeight: '150%',
								margin: { md: '20px 0 0px 0' }
							}}
							className={hindMadurai.className}
						>
							Xuan Tuoi
						</Typography>
						<Typography
							variant='h4'
							sx={{
								color: '#121212',
								fontSize: '14px',
								lineHeight: '180%'
							}}
							className={hindMadurai.className}
						>
							{dictionary['Home']['introduce'].founder}
						</Typography>
					</motion.div>
				</Box>
			</Box>
			{/* Brands  */}
			<Box
				sx={{
					position: 'relative',
					overflow: 'hidden',
					mb: { xs: '64px' },
					pt: { xs: '32px', sm: '64px' }
				}}
			>
				<Box
					sx={{
						width: { md: '100%' },
						height: { md: '200px', lg: '312px' },
						background: 'linear-gradient(176deg, #FFF 0%, #F1F1F1 100%)',
						position: 'absolute',
						bottom: { md: '0%' },
						left: 0,
						zIndex: -1
					}}
				/>
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
						py: { md: '36px', lg: '136px' },
						px: { sm: '24px' },
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column'
					}}
				>
					<motion.div
						variants={brandVariants}
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
						<Typography
							variant='h1'
							className={ibarra.className}
							sx={{
								color: '#121212',
								fontSize: { xs: '24px', md: '40px', lg: '48px' },
								fontWeight: 700,
								lineHeight: '125.5%'
							}}
						>
							{dictionary['Home']['brands'].title}
						</Typography>
						<Typography
							variant='h2'
							className={hindMadurai.className}
							sx={{
								color: '#3E3E3E',
								fontSize: '18px',
								lineHeight: '180%',
								maxWidth: { md: '846px' },
								textAlign: 'center',
								margin: { md: '12px 0' }
							}}
						>
							{dictionary['Home']['brands'].description}
						</Typography>
					</motion.div>
					<Box
						sx={{
							width: '100%',
							pt: { md: '78px' },
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							flexDirection: { xs: 'column', md: 'row' }
						}}
					>
						{listBrands.map(item => {
							if (item.name !== 'All') {
								return (
									<BrandItem
										key={item.id}
										brandName={item.name}
										imgSrc={item.imgSrc}
										link={item.link}
									/>
								)
							} else {
								return null
							}
						})}
					</Box>
				</Box>
			</Box>
			{/* Recommend Products */}
			<RecommendProduct
				lang={lang}
				dataGetListProduct={dataGetListProduct}
				dictionary={dictionary}
			/>
			{/* Review */}

			<Box
				sx={{
					// display: 'none',
					overflow: 'hidden',
					pt: { xs: '54px', md: '160px' },
					pb: { xs: '54px', md: '0' },
					maxWidth: {
						xs: 'var(--max-width-xs)',
						sm: 'var(--max-width-sm)',
						md: 'var(--max-width-md)',
						lg: 'var(--max-width-lg)',
						xl: 'var(--max-width-xl)'
					},
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					justifyContent: 'center'
				}}
			>
				<ImageItem
					imgSrc='/img/leaf.png'
					priority={true}
					style={{
						position: 'absolute',
						top: { xs: '12%', md: '30%' },
						left: '9%',
						width: { xs: '100px', md: '230px' },
						height: { xs: '100px', md: '230px' },
						transform: 'rotate(250deg)',
						zIndex: 2
					}}
				/>

				<ImageItem
					imgSrc='/img/leaf.png'
					priority={true}
					style={{
						position: 'absolute',
						top: '50%',
						right: '9%',
						width: { xs: '100px', md: '230px' },
						height: { xs: '100px', md: '230px' },
						transform: 'rotate(250deg)',
						zIndex: 2
					}}
				/>

				<Typography
					variant='h2'
					className={ibarra.className}
					sx={{
						color: '#121212',
						textAlign: 'center',
						fontSize: { xs: '24px', md: '40px', lg: '48px' },
						fontWeight: 700,
						lineHeight: '125.5%',
						pb: { xs: '10px', md: '124px' }
					}}
				>
					{dictionary['Home']['review'].title}
				</Typography>

				<AutoPlaySwipeableViews
					// className="w-full"
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={handleStepChange}
					enableMouseEvents
				>
					{listComments.map((item: Comment, index: number) => {
						return (
							<div key={item.id}>
								{Math.abs(activeStep - index) <= 2 ? (
									<ImageSliderItem comment={item} />
								) : null}
							</div>
						)
					})}
				</AutoPlaySwipeableViews>
				<MobileStepper
					variant='dots'
					steps={listComments.length}
					position='static'
					activeStep={activeStep}
					sx={{ flexGrow: 1 }}
					backButton={false}
					nextButton={false}
				/>
			</Box>
		</Box>
	)
}

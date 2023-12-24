import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ibarra } from '../../../public/font'
import BaseButton from '../base/BaseButton'
import ImageItem from '../base/ImageItem'
import RatingItem from '../base/RatingItem'

import { motion } from 'framer-motion'

const textBanner = {
	hidden: { opacity: 0, y: 160 },
	visible: {
		opacity: 1,
		y: 0
	}
}

const scaleImage = {
	hidden: { scale: 0 },
	visible: {
		scale: 1
	}
}

const inforSlide = {
	hidden: { opacity: 0, x: 160 },
	visible: {
		opacity: 1,
		x: 0
	}
}

const BannerSlide = ({ dictionary }: any) => {
	return (
		<Box
			sx={{
				width: { md: '100%' },
				height: { xs: '50vh', md: '80vh', xl: '100vh' },
				background: '#fff',
				overflow: 'hidden',
				display: 'flex',
				alignItems: 'center',
				position: 'relative',
				padding: { xs: '32px 10px 0 10px', lg: '0 100px', xl: '0 260px' },
				flexDirection: { xs: 'column', md: 'row' },
				justifyContent: { xs: 'flex-end', md: 'center' }
			}}
		>
			<ImageItem
				style={{
					position: 'absolute',
					top: '0',
					right: '0',
					width: '100%',
					height: '100%',
					objectFit: 'cover'
				}}
				imgSrc='/img/vector01.png'
			/>
			{/* Text content */}
			<motion.div
				variants={textBanner}
				initial='hidden'
				whileInView='visible'
				transition={{ type: 'spring' }}
			>
				<Box>
					<Box>
						<Typography
							variant='h1'
							className={ibarra.className}
							sx={{
								fontSize: {
									xs: '26px',
									sm: '36px',
									md: '52px',
									lg: '84px',
									xl: '92px'
								},
								fontWeight: 'bold',
								color: ' #171717',
								marginBottom: '18px'
							}}
						>
							{dictionary['header']['slide02'].title}
						</Typography>
						<Typography
							variant='h2'
							sx={{
								fontFamily: 'Poppins',
								color: '#797979',
								fontSize: { xs: '14px', sm: '16px', md: '20px' },
								fontWeight: '400',
								marginBottom: { xs: '20px', sm: '8px', md: '48px' },
								maxWidth: '500px'
							}}
						>
							{dictionary['header']['slide02'].description}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<BaseButton
							variant='contained'
							label={dictionary['header']['slide02'].button}
							styleSx={{
								padding: { xs: '8px 12px', md: '12px 24px', lg: '12px 36px' },
								fontSize: { xs: '12px', md: '18px' },
								borderRadius: '12px',
								background: '#78B25D',
								color: '#fff',
								textTransform: 'none',
								fontFamily: 'Poppins',
								'&:hover': {
									background: '#78B25D'
								}
							}}
						/>
						<Box
							sx={{
								display: { xs: 'none', md: 'flex' },
								alignItems: 'center',
								marginLeft: '26px'
							}}
						>
							<ImageItem
								imgSrc='/img/youtube.png'
								style={{
									height: '62px',
									width: '62px',
									ojbectFit: 'cover'
								}}
							/>
							<Typography
								variant='h3'
								sx={{
									color: '#797979',
									fontFamily: 'Poppins',
									fontSize: '18px',
									fontWeight: '500'
								}}
							>
								{dictionary['header']['slide02'].text}
							</Typography>
						</Box>
					</Box>
				</Box>
			</motion.div>
			{/* Image and information */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'flex-start'
				}}
			>
				<motion.div
					variants={scaleImage}
					initial='hidden'
					whileInView='visible'
					transition={{ type: 'spring' }}
				>
					<ImageItem
						imgSrc='/img/home03.png'
						style={{
							width: { xs: '120px', sm: '150px', md: '300px', xl: '485px' },
							height: { xs: '160px', sm: '200px', md: '400px', xl: '657px' },
							objectFit: 'cover'
						}}
					/>
				</motion.div>
				<motion.div
					variants={inforSlide}
					initial='hidden'
					whileInView='visible'
					transition={{ type: 'spring' }}
				>
					<Box
						sx={{
							display: { xs: 'none', xl: 'flex' },
							width: '244px',
							height: '346px',
							paddingLeft: '20px',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'flex-start',
							borderRadius: '8px',
							background: '#86BD6C',
							marginTop: '36px',
							marginLeft: '36px'
						}}
					>
						<Typography
							variant='h5'
							sx={{
								color: '#FFF',
								fontFamily: 'Poppins',
								fontSize: '18px',
								marginBottom: '12px'
							}}
						>
							Details
						</Typography>
						<Typography
							className={ibarra.className}
							variant='h5'
							sx={{
								color: ' #FFF',
								fontSize: '43px',
								fontWeight: '700',
								marginBottom: '36px'
							}}
						>
							$100.45
						</Typography>
						<Typography
							variant='h5'
							className={ibarra.className}
							sx={{
								color: '#FFF',
								fontSize: '20px',
								fontWeight: '700',
								marginBottom: '12px'
							}}
						>
							Mockup design dsad...
						</Typography>
						<RatingItem numberOfRate={4} />
					</Box>
				</motion.div>
			</Box>
		</Box>
	)
}

export default BannerSlide

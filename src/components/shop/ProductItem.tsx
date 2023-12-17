import { formatCurrency } from '@/helper'
import { useStore } from '@/store'
import { Box, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import ImageItem from '../base/ImageItem'
import Options from './Options'
import { motion } from 'framer-motion'

const ProductItem = ({
	imgSrc,
	productName,
	productType,
	price,
	style,
	productId,
	addToCart,
	shopId,
	quantity,
	lang
}: {
	imgSrc: string
	productName: string
	productType: string
	price: string
	style?: any
	productId: string
	addToCart: any
	shopId: string
	quantity?: number
	lang: string
}) => {
	const { UserSlice } = useStore()
	const router = useRouter()

	const handleAddToCart = (e: any) => {
		e.preventDefault()
		if (!UserSlice.isLoggedIn) {
			// push ro login page
			router.push('/login')
			return
		}
		const user = UserSlice.user
		addToCart({
			userId: user.id,
			product: {
				productId: productId,
				shopId: shopId,
				quantity: 1,
				price: price
			}
		})
	}

	return (
		<Box
			sx={{
				mb: { xs: '24px', md: '32px', lg: '62px' },
				width: { xs: '100%', md: '280px', lg: '280px' },
				overflow: 'hidden',
				transition: 'all 0.3s linear',
				'&:hover': {
					cursor: 'pointer',
					'& #layer_product': {
						display: 'block'
					},
					'& #img-product': {
						transform: 'scale(1.2)'
					}
				},
				'& a': {
					height: '100%',
					display: 'flex',
					flexDirection: { xs: 'column', sm: 'row', md: 'column' },
					alignItems: 'center'
				},
				...style
			}}
		>
			<motion.div
				animate={{
					opacity: 1
				}}
				initial={{
					opacity: 0
				}}
				layout
				exit={{
					opacity: 0
				}}
			>
				<Link
					href={`/${lang}/user/product/${productId}`}
					style={{
						textDecoration: 'none'
					}}
				>
					<Box
						sx={{
							width: '100%',
							height: { xs: '200px', lg: '320px' },
							position: 'relative',
							overflow: 'hidden'
						}}
					>
						{/* SOLD OUT IMAGE */}
						{quantity === 0 && (
							<ImageItem
								imgSrc='/img/soldout.png'
								style={{
									position: 'absolute',
									top: '0',
									left: '0',
									width: '64px',
									height: { xs: '40px', md: '40px' },
									zIndex: '3'
								}}
							/>
						)}
						<Box
							id='layer_product'
							sx={{
								width: '100%',
								height: { xs: '200px', md: '420px' },
								position: 'absolute',
								top: '0',
								left: '0',
								display: 'none',
								transition: 'all 0.3s linear'
							}}
						>
							{/* Layer  */}
							<Box
								sx={{
									width: '100%',
									height: { xs: '200px', md: '420px' },
									position: 'absolute',
									top: '0',
									left: '0',
									zIndex: '1',
									overflow: 'hidden',
									backgroundColor: '#000',
									opacity: '0.5'
								}}
							/>
							{/* List Options */}
							<Box
								id='option-container'
								sx={{
									position: 'absolute',
									zIndex: '3',
									top: { xs: '50%' },
									right: { xs: '12px' },
									transform: { xs: 'translate(0,-50%)' }
								}}
							>
								<Options
									gifSrc='/icon/shopping-cart.gif'
									iconSrc='/icon/shopping-cart.png'
									onClick={handleAddToCart}
								/>
								<Options
									gifSrc='/icon/heart.gif'
									iconSrc='/icon/heart.png'
									onClick={(e: any) => {
										e.preventDefault()
									}}
								/>
								<Options
									gifSrc='/icon/view.gif'
									iconSrc='/icon/view.png'
									onClick={(e: any) => {
										e.preventDefault()
										router.push(`/user/product/${productId}`)
									}}
								/>
							</Box>
						</Box>
						<ImageItem
							idBox='img-product'
							imgSrc={imgSrc}
							style={{
								width: '100%',
								height: '100%',
								transition: 'all 0.3s ease-in-out',
								'&:hover': {
									'& img': {
										transform: 'scale(1.1)'
									}
								},
								'& img': {
									objectFit: 'contain'
								}
							}}
						/>
					</Box>
					<Box
						sx={{
							marginLeft: { sm: '20px' },
							mt: { xs: '8px', md: '18px' },
							width: '100%'
						}}
					>
						<Tooltip title={productName} placement='bottom'>
							<Typography
								variant='h3'
								sx={{
									mt: { xs: '8px', md: '18px' },
									color: '#000',
									fontSize: { xs: '18px', md: '20px' },
									WebkitLineClamp: 1,
									WebkitBoxOrient: 'vertical',
									overflow: 'hidden',
									fontWeight: '400',
									display: '-webkit-box',
									textOverflow: 'ellipsis',
									fontFamily: 'Poppins'
								}}
							>
								{productName} {productName}
							</Typography>
						</Tooltip>
						<Typography
							variant='h5'
							sx={{
								color: '#000',
								fontSize: { xs: '14px', md: '15px' },
								fontWeight: '300',
								my: { xs: '2px' },
								fontFamily: 'Poppins'
							}}
						>
							{productType}
						</Typography>
						<Typography
							variant='h6'
							sx={{
								color: '#406D1C',
								fontSize: { lg: '20px' },
								fontWeight: '400',
								fontFamily: 'Poppins'
							}}
						>
							{formatCurrency(price)}
						</Typography>
					</Box>
				</Link>
			</motion.div>
		</Box>
	)
}

export default ProductItem

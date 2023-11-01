'use client'

import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import AddIcon from '@mui/icons-material/Add'
import BaseButton from '@/components/base/BaseButton'
import ImageItem from '@/components/base/ImageItem'
import ReviewItem from '@/components/product/ReviewItem'
import SimilarProduct from '@/components/product/SimilarProduct'
import { listComments, priceSale } from '@/constants'
import {
	useGetProductById,
	useGetSimilarProduct
} from '@/service/react-query/product.query'
import { Box, ButtonBase, TextField, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAddToCart } from '@/service/react-query/cart.query'
import { useStore } from '@/store'
import { formatCurrency } from '@/helper'
import Loading from '@/app/[lang]/loading'

import {
	roboto,
	hindMadurai,
	ibarra,
	poppins
} from '../../../../../../public/font'
import { useGetReviewByParentId } from '@/service/react-query/review.query'
import { ReviewInterface } from '@/utils/review.interface'
import ReviewContainer from '@/components/product/ReviewContainer'

const ProductDetail = ({ dictionary, lang }: any) => {
	const [activeImg, setActiveImg] = React.useState(0)
	const [quantity, setQuantity] = React.useState(1)
	const [isActiveReviews, setIsActiveReviews] = React.useState(false)
	const pathname = usePathname() // /user/product/bd90e1ae-ee68-4b94-87bb-d291f992d03f
	const id = pathname.split('/').pop() || ''

	const { UserSlice } = useStore()
	const router = useRouter()

	const {
		isLoading,
		refetch,
		data: productData
	} = useGetProductById({
		id: id
	})

	const {
		isLoading: gettingSimilarProducts,
		refetch: getListSimilarProduct,
		data: listSimilarProduct
	} = useGetSimilarProduct({
		shop_id: productData?.user.id,
		product_category: productData?.product_category,
		product_id: id
	})

	const {
		data: listReviewParent,
		isLoading: isGettingReviewParents,
		mutate: getParentReviews
	} = useGetReviewByParentId()

	const { isLoading: isAddingToCart, mutate: addToCart } = useAddToCart()
	useEffect(() => {
		getParentReviews({
			productId: id
		})
	}, [])
	useEffect(() => {
		if (id) {
			refetch()
		}
	}, [pathname])

	useEffect(() => {
		if (productData) {
			Object.keys(productData?.product_attribute).map((key, index) => {
				const listUseage =
					productData?.product_attribute[key].split('/ENTER/') || []
			})

			getListSimilarProduct()
		}
	}, [productData])

	const handleAddToCart = (e: any) => {
		if (!UserSlice.isLoggedIn) {
			// push ro login page
			router.push('/login')
			return
		}
		addToCart({
			userId: UserSlice.user.id,
			product: {
				productId: id,
				shopId: productData?.user.id,
				quantity: quantity,
				price: productData?.price
			}
		})
	}

	if (isLoading || gettingSimilarProducts) return <Loading />
	return (
		<Box
			sx={{
				pt: { xs: '80px', md: '140px' },
				pb: '120px'
			}}
		>
			{/* Header */}
			<Box
				sx={{
					position: 'relative',
					width: '100%',
					height: { xs: '30vh', md: '400px', lg: '318px' },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				{/* Image */}
				<ImageItem
					imgSrc='/img/banner.jpg'
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: '0',
						left: '0',
						zIndex: '-1',
						'& img': { objectFit: 'cover' },
						'&::after': {
							content: '""',
							position: 'absolute',
							top: '0',
							left: '0',
							width: '100%',
							height: '100%',
							backgroundColor: 'rgba(0, 0, 0, 0.39)'
						}
					}}
				/>

				<Typography
					className={ibarra.className}
					variant='h1'
					sx={{
						color: '#FFF',
						fontSize: { xs: '32px', sm: '42px', md: '52px' },
						fontWeight: 700,
						lineHeight: '125.5%',
						textAlign: 'center'
					}}
				>
					{productData?.user?.username}
				</Typography>

				<Typography
					className={ibarra.className}
					variant='h1'
					sx={{
						color: '#FFF',
						maxWidth: { md: '80%' },
						fontSize: { xs: '16px', sm: '18px', md: ' 24px' },
						pt: { md: '16px' },
						fontWeight: 400,
						lineHeight: '125.5%',
						textAlign: 'center',
						mx: { xs: '24px' }
					}}
				>
					The {productData?.user?.username} is a cosmetics brand from Canada
					with affordable prices but quality that is comparable to other
					high-end brands.
				</Typography>
			</Box>
			{/* Info Product Detail  */}
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
					pt: { md: '40px', lg: '120px' },
					px: { xs: '12px' }
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: { xs: 'center', lg: 'flex-start' },
						flexDirection: { xs: 'column', lg: 'row' },
						padding: { xs: '24px 0' }
					}}
				>
					<Box
						sx={{
							mr: { lg: '44px' },
							display: { xs: 'flex', lg: 'block' },
							justifyContent: { xs: 'space-between' },
							width: { xs: '100%', lg: 'auto' },
							flexWrap: { xs: 'wrap', lg: 'unset' }
						}}
					>
						{productData.product_listImages?.map(
							(item: string, index: number) => (
								<ImageItem
									key={index}
									imgSrc={item}
									style={{
										width: { xs: '80px', md: '100px' },
										height: { xs: '80px', md: '100px' },
										mb: { xs: '24px', lg: '64px' },
										border: index === activeImg ? '3px solid #6BB82F' : 'none'
									}}
									onClick={() => setActiveImg(index)}
								/>
							)
						)}
					</Box>
					<Box
						sx={{
							position: 'relative',
							width: { xs: '80%', md: '540px', lg: '500px' },
							height: { xs: '200px', md: '560px' }
						}}
					>
						<ImageItem
							imgSrc={
								productData?.product_listImages[activeImg] ||
								productData?.product_thumbnail
							}
							style={{
								width: '100%',
								height: '100%',
								position: 'relative',
								borderRadius: '8px',
								boxShadow: '0px 18px 36px 0px rgba(0, 0, 0, 0.12)',
								'&::before': {
									content: '"On - sale"',
									fontSize: { xs: '14px', md: '16px', lg: '18px' },
									textAlign: 'center',
									zIndex: '1',
									position: 'absolute',
									lineHeight: '40px',
									top: '16px',
									left: '-46px',
									width: { xs: '100px', md: '140px' },
									height: { xs: '40px', md: '40px' },
									backgroundColor: '#6BB82F',
									boxShadow: '0px 18px 36px 0px rgba(255, 255, 255, 0.12)',
									borderRadius: '8px',
									color: '#FFF',
									transform: 'rotate(-45deg)',
									display: productData.product_quantity ? 'block' : 'none'
								},
								'& img': {
									objectFit: 'contain'
								}
							}}
						/>
						{productData.product_quantity === 0 && (
							<ImageItem
								imgSrc='/img/soldout.png'
								style={{
									position: 'absolute',
									top: '10px',
									left: '12px',
									width: '90px',
									height: { xs: '40px', md: '60px' },
									zIndex: '3'
								}}
							/>
						)}
					</Box>

					<Box
						sx={{
							marginLeft: { lg: '32px', xl: '110px' },
							maxWidth: { lg: '700px', xl: '100%' },
							textAlign: { xs: 'center', lg: 'left' },
							mt: { xs: '32px' },
							flex: { lg: 1 }
						}}
					>
						<Typography
							className={roboto.className}
							variant='h3'
							sx={{
								color: '#000',
								fontSize: { xs: '24px', md: '38px' },
								fontWeight: 500,
								lineHeight: '125.5%',
								display: ' -webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 2,
								overflow: 'hidden'
							}}
						>
							{productData?.product_name}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								paddingTop: { xs: '8px' },
								justifyContent: { xs: 'center', lg: 'flex-start' }
							}}
						>
							<Typography
								className={poppins.className}
								variant='h3'
								sx={{
									color: '#AFAFAF',
									fontSize: { xs: '16px', md: '24px' },
									fontWeight: 400,
									textDecoration: 'line-through'
								}}
							>
								{formatCurrency(
									productData?.product_price > 800000
										? productData?.product_price + 300000
										: productData?.product_price + priceSale
								)}
							</Typography>
							<Typography
								variant='h3'
								className={poppins.className}
								sx={{
									color: '#6A6A6A',
									fontSize: '18px',
									fontWeight: 400,
									margin: { xs: '0 12px', md: '0 24px' }
								}}
							>
								{(
									(productData?.product_price > 800000
										? 300000 /
										  (productData?.product_price + 300000 ||
												productData?.product_price * 2)
										: priceSale /
										  (productData?.product_price + priceSale ||
												productData?.product_price * 2)) * 100
								).toFixed(1)}
								%
							</Typography>
							<Typography
								className={poppins.className}
								variant='h3'
								sx={{
									color: '#355F14',
									fontSize: { xs: '26px', md: '30px' },
									fontWeight: 500
								}}
							>
								{formatCurrency(productData?.product_price)}
							</Typography>
						</Box>
						<Box
							sx={{
								padding: { md: '24px 0 24px 0' },
								maxHeight: { md: '400px' },
								mb: '24px',
								overflowY: 'scroll',
								'&::-webkit-scrollbar': {
									display: 'none'
								},
								'&::-webkit-scrollbar-track': {
									display: 'none'
								}
							}}
						>
							{productData?.product_description
								?.split('/ENTER/')
								.map((item: string, index: number) => (
									<Typography
										key={index}
										className={roboto.className}
										sx={{
											color: '#737373',
											fontSize: '18px',
											fontWeight: 300,
											lineHeight: '180%',
											my: { xs: '8px' }
										}}
									>
										{item}
									</Typography>
								))}
						</Box>
						{/* <Box>
							
						</Box> */}
						{/* Buttons */}
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: { xs: 'space-between', lg: 'flex-start' }
								// pt: { md: '62px' }
							}}
						>
							<Box
								className={roboto.className}
								sx={{
									display: 'flex',
									alignItems: 'center',
									mr: { md: '52px' },
									'& svg': {
										color: '#737373',
										margin: { xs: '0 12px', sm: '0 18px', md: '0 28px' },
										cursor: 'pointer',
										userSelect: 'none',
										border: '1px solid #ccc',
										borderRadius: '50%',
										fontSize: '26px',
										'&:hover': {
											borderColor: '#72A748',
											color: '#72A748'
										}
									}
								}}
							>
								<HorizontalRuleIcon
									onClick={() => quantity > 1 && setQuantity(quantity - 1)}
								/>
								<TextField
									type='number'
									variant='filled'
									value={quantity}
									onChange={e =>
										+e.target.value && setQuantity(+e.target.value)
									}
									sx={{
										width: { xs: '60px', md: '92px' },
										margin: { md: '0 16px' },
										'& input': {
											pt: { xs: '8px', md: '12px' },
											fontSize: '20px',
											pl: { md: '24px' }
										},
										'& .MuiInputBase-root': {
											'&::before': {
												borderBottom: 'none'
											},
											'&::after': {
												borderBottom: 'none'
											},
											'&:hover ': {
												'&::before': {
													borderBottom: 'none'
												}
											}
										}
									}}
								/>
								<AddIcon onClick={() => setQuantity(quantity + 1)} />
							</Box>
							<BaseButton
								variant='contained'
								bgStyle='color'
								label={dictionary['Product']['button']}
								className={hindMadurai.className}
								styleSx={{
									padding: { md: '8px 30px' },
									borderRadius: '12px',
									background:
										'linear-gradient(146deg, #315316 0%, #72A748 100%)',
									color: '#FFF',
									fontSize: { xs: '16px', sm: '18px', md: '22px' },
									lineHeight: '180%',
									textTransform: 'none'
								}}
								onClick={handleAddToCart}
							/>
						</Box>
					</Box>
				</Box>
				{/* Review */}
				<Box
					sx={{
						pt: { xs: '24px', md: '60px' }
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: { xs: 'space-between', md: 'flex-start' },

							'& h4': {
								fontSize: { xs: '20px', md: '24px' },
								lineHeight: '125.5%',
								mr: { md: '32px' },
								userSelect: 'none',
								cursor: 'pointer'
							}
						}}
					>
						<Typography
							variant='h4'
							className={roboto.className}
							sx={{
								color: !isActiveReviews ? '#315316' : '#000',
								fontWeight: !isActiveReviews ? 500 : 300
							}}
							onClick={() => setIsActiveReviews(false)}
						>
							{dictionary['Product']['description']}
						</Typography>
						<Typography
							variant='h4'
							className={roboto.className}
							sx={{
								color: isActiveReviews ? '#315316' : '#000',
								fontWeight: isActiveReviews ? 500 : 300
							}}
							onClick={() => setIsActiveReviews(true)}
						>
							{dictionary['Product']['review']}
						</Typography>
					</Box>
					<Box
						sx={{
							mt: { xs: '20px', md: '32px' }
						}}
					>
						{isActiveReviews &&
						listReviewParent &&
						listReviewParent.length > 0 ? (
							<ReviewContainer
								getParentReviews={getParentReviews}
								listReview={listReviewParent}
								productId={id}
							/>
						) : (
							isActiveReviews &&
							listReviewParent &&
							listReviewParent.length === 0 && (
								<Typography
									sx={{
										color: '#737373',
										fontSize: '18px',
										fontWeight: 300,
										lineHeight: '180%',
										fontFamily: 'Roboto'
									}}
								>
									No reviews
								</Typography>
							)
						)}
						{!isActiveReviews &&
							Object.keys(productData?.product_attribute).map((key, index) => {
								const listUseage =
									key !== 'benefits'
										? productData?.product_attribute[key].split('/ENTER/') || []
										: productData?.product_attribute[key].split('ENTER') || []
								return (
									<Box key={index}>
										<Typography
											variant='h4'
											className={roboto.className}
											sx={{
												color: '#737373',
												fontSize: '22px',
												fontWeight: 300,
												lineHeight: '180%',
												mt: { md: '24px' }
											}}
										>
											{key === 'size'
												? 'Size:'
												: key === 'useage'
												? 'How to use: '
												: key === 'benefits'
												? 'Benefits:'
												: 'Ingredients:'}
										</Typography>
										{listUseage.map((useage: string, idx: number) => {
											return (
												<Typography
													key={idx}
													className={roboto.className}
													sx={{
														color: '#737373',
														fontSize: '18px',
														fontWeight: 300,
														lineHeight: '180%',
														my: { md: '8px' }
													}}
												>
													{useage}
												</Typography>
											)
										})}
									</Box>
								)
							})}
					</Box>
				</Box>
				{/* Similar Product */}
				<SimilarProduct
					lang={lang}
					listSimilarProduct={listSimilarProduct}
					productData={productData}
					addToCart={addToCart}
					dictionary={dictionary}
				/>
			</Box>
		</Box>
	)
}

export default ProductDetail

'use client'
import React, { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import HeaderShopDetail from '@/components/shop/HeaderShopDetail'
import CategoryItem from '@/components/shop/CategoryItem'
import Title from '@/components/shop/Title'

//Icons
import { listCategory, listNews, listShop } from '@/constants'
import ProductItem from '@/components/shop/ProductItem'
import Lefticon from '@/components/icon/Lefticon'
import Link from 'next/link'
import BlogItem from '@/components/shop/BlogItem'
import { poppins } from '@/assets/font'
import { useGetProductByPage } from '@/service/react-query/product.query'
import Loading from '@/app/loading'
import { usePathname } from 'next/navigation'
import { ProductInterface } from '@/utils/product.interface'
import { useAddToCart } from '@/service/react-query/cart.query'

const ShopPageDetail = () => {
	const productListRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()
	const shopId = pathname.split('/')[3] // loreal,"oridinary" ,"bioderma"
	const shopName = listShop.find(item => item.id === shopId)?.name

	const {
		isLoading: gettingProducts,
		mutate: getProductByPage,
		data: dataGetListProduct
	} = useGetProductByPage()

	const { mutate: addToCart } = useAddToCart()

	useEffect(() => {
		getProductByPage({
			page: 1,
			limit: 10,
			sort: 'createdAt',
			product_shop: shopName
		})
	}, [pathname])

	const scrollToProducts = () => {
		if (productListRef.current) {
			productListRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	if (gettingProducts) return <Loading />
	return (
		<Box>
			{/* Header */}
			<HeaderShopDetail onClick={scrollToProducts} />

			{/* Category */}
			<Box
				sx={{
					backgroundColor: '#F7F7F7',
					padding: {
						xs: '32px 12px',
						md: '200px 24px 100px 24px',
						xl: '208px 0 108px 0'
					}
				}}
			>
				<Box
					sx={{
						maxWidth: {
							xs: 'var(--max-width-xs)',
							sm: 'var(--max-width-sm)',
							md: 'var(--max-width-md)',
							lg: 'var(--max-width-lg)',
							xl: 'var(--max-width-xl)'
						},
						margin: '0 auto'
					}}
				>
					<Title title='Shop' />
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							mt: { xs: '32px', lg: '64px' },
							flexDirection: { xs: 'column', md: 'row' }
						}}
					>
						{listCategory.map(item => {
							if (item.title === 'All') {
								return null
							}
							return (
								<CategoryItem
									key={item.id}
									pathImg={item.pathImg}
									title={item.title}
									description={item.description}
									shopName={shopName || ''}
								/>
							)
						})}
					</Box>
				</Box>
			</Box>
			{/* Products */}
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
					pt: { xs: '32px', md: '64px', lg: '149px' },
					pb: { md: '132px' },
					px: { xs: '12px' }
				}}
			>
				{/* Title */}
				<Box
					ref={productListRef}
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Box>
						<Title title='Products' />
						<Typography
							className={poppins.className}
							variant='body1'
							sx={{ mt: '10px', color: '#000', fontSize: { md: '16px' } }}
						>
							Women made purely natural ingredients, taken from the earth’s
							crust.
						</Typography>
					</Box>
					<Link
						href={`/user/product?shopName=${shopName}`}
						style={{
							textDecoration: 'none'
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
								transition: 'all 0.3s ease',
								marginLeft: { xs: '20px' },
								':hover': {
									transform: 'translateX(4px)'
								}
							}}
						>
							<Typography
								variant='h3'
								className={poppins.className}
								sx={{
									color: '#000',
									fontSize: {
										xs: '16px',
										md: '20px',
										whiteSpace: 'nowrap'
									},
									mr: { xs: '12px', md: '24px' }
								}}
							>
								View all
							</Typography>
							<Lefticon />
						</Box>
					</Link>
				</Box>
				{/* List products */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						alignItems: 'center',
						justifyContent: 'space-between',
						mt: { xs: '48px', md: '74px' }
					}}
				>
					{dataGetListProduct?.result[0]?.data &&
						dataGetListProduct?.result[0]?.data.map(
							(item: ProductInterface) => {
								return (
									<ProductItem
										productId={item.id}
										key={item.id}
										imgSrc={item.product_thumbnail}
										productName={item.product_name}
										productType={item.product_category}
										price={item.product_price.toFixed(2)}
										shopId={item.user.id}
										addToCart={addToCart}
									/>
								)
							}
						)}
				</Box>
			</Box>
			{/* Video */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: { xs: 'column', lg: 'row' },
					py: { xs: '32px' },
					height: { lg: '640px', xl: '720px' }
				}}
			>
				<Box
					sx={{
						width: { xs: '100%', lg: '480px', xl: '950px' },
						height: { xs: '320px', md: '480px', lg: '100%' },
						position: 'relative'
					}}
				>
					<video
						autoPlay={true}
						loop
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							flex: 1
						}}
					>
						<source src='/video/loreal.mp4' />
					</video>
				</Box>

				<Box
					sx={{
						padding: {
							xs: '32px 12px',
							md: '32px ',
							lg: '114px  32px 118px 94px'
						},
						flex: 1,
						backgroundColor: '#F7F7F7',
						height: '100%'
					}}
				>
					<Title title='about L’Oréal ' />
					<Typography
						variant='body1'
						sx={{
							mt: '32px',
							color: '#000',
							fontSize: { xs: '16px', md: '20px', lg: '24px' },
							fontWeight: 300,
							lineHeight: '187.5%' /* 45px */,
							letterSpacing: '2px'
						}}
					>
						Elivering financial performance while being a committed corporate
						citizen is probably our greatest source of pride. This is what
						motivates us to always go the extra mile...
					</Typography>
					<Box
						sx={{
							pt: { xs: '12px', md: '24px', lg: '88px' },
							'& a': {
								color: '#000',
								fontSize: { xs: '16px', md: '20px', lg: '24px' },
								fontWeight: 600,
								lineHeight: '187.5%' /* 45px */,
								letterSpacing: '2px',
								textDecoration: 'none',
								underline: 'none'
							}
						}}
					>
						<Link href='/about'>Learn more</Link>
					</Box>
				</Box>
			</Box>

			{/* News and Blogs */}
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
					pt: { sm: '32px', md: '64px', lg: '180px' },
					pb: { xs: '46px', md: '64px', lg: '200px' },
					px: { xs: '12px' }
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						pb: { xs: '32px' }
					}}
				>
					<Title title='Latest news' />
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
							transition: 'all 0.3s ease',
							':hover': {
								transform: 'translateX(4px)'
							}
						}}
					>
						<Typography
							variant='h3'
							className={poppins.className}
							sx={{
								color: '#000',
								fontSize: {
									xs: '16px',
									md: '20px',
									whiteSpace: 'nowrap'
								},
								mr: { xs: '12px', md: '24px' }
							}}
						>
							View all
						</Typography>
						<Lefticon />
					</Box>
				</Box>
				{/* List news */}
				<Box
					sx={{
						pt: { md: '32px', lg: '74px' },
						display: 'grid',
						gridTemplateColumns: {
							xs: 'repeat(1, 1fr)',
							lg: 'repeat(2, 1fr)',
							xl: 'repeat(3, 1fr)'
						},
						gap: { lg: '32px' }
					}}
				>
					{listNews.map(item => {
						return <BlogItem key={item.id} />
					})}
				</Box>
			</Box>
			{/* Footer */}
		</Box>
	)
}

export default ShopPageDetail

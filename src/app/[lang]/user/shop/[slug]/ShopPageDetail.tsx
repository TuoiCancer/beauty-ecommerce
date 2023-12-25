'use client'

import dynamic from 'next/dynamic'

import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { autoPlay } from 'react-swipeable-views-utils'
import { useTheme } from '@mui/material/styles'
import SwipeableViews from 'react-swipeable-views'
import { listCategory, listImgURL, listNews, listShop } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ProductInterface } from '@/utils/product.interface'
import { useAddToCart } from '@/service/react-query/cart.query'
import {
	useCollectVoucher,
	useGetListVoucher
} from '@/service/react-query/voucher.query'
import { useStore } from '@/store'
import { poppins } from '../../../../../../public/font'
import { useGetBestSellerProductsByShopId } from '../../../../../service/react-query/product.query'
import { useGetShopByName } from '@/service/react-query/user.query'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

//lazy loading
const HeaderShopDetail = dynamic(
	() => import('@/components/shop/HeaderShopDetail')
)
const CategoryItem = dynamic(() => import('@/components/shop/CategoryItem'))
const Title = dynamic(() => import('@/components/shop/Title'))
const ProductItem = dynamic(() => import('@/components/shop/ProductItem'))
const Lefticon = dynamic(() => import('@/components/icon/Lefticon'))
const BlogItem = dynamic(() => import('@/components/shop/BlogItem'))
const VoucherItem = dynamic(() => import('@/components/shop/VoucherItem'))
const Loading = dynamic(() => import('@/app/[lang]/loading'))
const ImageItem = dynamic(() => import('@/components/base/ImageItem'))

const ShopPageDetail = ({ dictionary, lang }: any) => {
	const theme = useTheme()
	const { UserSlice } = useStore()
	const productListRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()
	const shopId = pathname.split('/')[4] // loreal,"oridinary" ,"bioderma"
	const shop = listShop.find(item => item.id === shopId)
	const shopName = shop?.name

	const [listImg, setListImg] = useState<string[]>([])
	const [activeStep, setActiveStep] = useState(0)

	const [isRefetchFn, setIsRefetchFn] = React.useState(false)

	const { data: shopInfo } = useGetShopByName({
		name: shopId || ''
	})

	const {
		data: listBestSeller,
		refetch,
		isLoading
	} = useGetBestSellerProductsByShopId(shopInfo ? shopInfo?.id : '')

	// const
	const { mutate: collectVoucherFn, isSuccess } = useCollectVoucher()

	const { mutate: addToCart } = useAddToCart()

	const {
		data: listVoucher,
		refetch: getListVoucher,
		isLoading: isGettingVouchers
	} = useGetListVoucher({
		shopId: shopInfo ? shopInfo.id : '',
		userId: UserSlice.user?.id
	})

	useEffect(() => {
		setListImg(listImgURL.find(item => item.shopId === shopId)?.urls || [])
		getListVoucher()
	}, [pathname])

	useEffect(() => {
		if (shopInfo) {
			console.log('shopInfo', shopInfo)
			refetch()
			getListVoucher()
		}
	}, [shopInfo])

	useEffect(() => {
		if (isSuccess) {
			getListVoucher()
			setIsRefetchFn(false)
		}
	}, [isRefetchFn, isSuccess])

	const scrollToProducts = () => {
		if (productListRef.current) {
			productListRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleStepChange = (step: number) => {
		setActiveStep(step)
	}

	if (isLoading || isGettingVouchers) return <Loading />
	return (
		<Box>
			{/* Header */}
			<HeaderShopDetail onClick={scrollToProducts} dictionary={dictionary} />

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
					<Title title='Shop' dictionary={dictionary} />
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
									dictionary={dictionary}
									lang={lang}
								/>
							)
						})}
					</Box>
				</Box>
			</Box>

			{/* Voucher Banner */}
			<Box
				sx={{
					maxWidth: {
						xs: '100%',
						sm: 'var(--max-width-sm)',
						md: 'var(--max-width-md)',
						lg: 'var(--max-width-lg)',
						xl: 'var(--max-width-xl)'
					},
					margin: '0 auto'
				}}
			>
				<AutoPlaySwipeableViews
					// className="w-full"
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={handleStepChange}
					enableMouseEvents
				>
					{listImg.map((item: any, index: number) => {
						return (
							<div key={index}>
								<ImageItem
									imgSrc={item}
									style={{
										width: '100%',
										height: { xs: '300px', md: '500px' },
										'& img': {
											objectFit: 'cover'
										}
									}}
								/>
							</div>
						)
					})}
				</AutoPlaySwipeableViews>
			</Box>

			{/* List Voucher */}
			<Box
				sx={{
					pt: { xs: '32px', md: '64px', lg: '64px' },
					maxWidth: {
						xs: '100%',
						sm: 'var(--max-width-sm)',
						md: 'var(--max-width-md)',
						lg: 'var(--max-width-lg)',
						xl: 'var(--max-width-xl)'
					},
					margin: '0 auto',
					px: { xs: '12px' }
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						alignItems: 'center',
						flexWrap: 'wrap',
						justifyContent: { xs: 'center', md: 'flex-start' }
					}}
				>
					{listVoucher &&
						listVoucher.map((item: any, index: number) => {
							return (
								<VoucherItem
									key={index}
									voucher={item}
									collectVoucherFn={collectVoucherFn}
									dictionary={dictionary}
								/>
							)
						})}
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
					pt: { xs: '32px', md: '64px', lg: '80px' },
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
						<Title title='Products' dictionary={dictionary} />
						<Typography
							className={poppins.className}
							variant='body1'
							sx={{ mt: '10px', color: '#000', fontSize: { md: '16px' } }}
						>
							{dictionary.Shop.Product.description}
						</Typography>
					</Box>
					<Link
						href={`/${lang}/user/product?shopName=${shopName}`}
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
								{dictionary.Shop.Product.all}
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
					{listBestSeller &&
						listBestSeller.map((item: ProductInterface) => {
							return (
								<ProductItem
									lang={lang}
									productId={item.id}
									key={item.id}
									imgSrc={item.product_thumbnail}
									productName={item.product_name}
									productType={item.product_category}
									price={item.product_price.toFixed(2)}
									shopId={shopInfo ? shopInfo?.id : ''}
									addToCart={addToCart}
								/>
							)
						})}
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
					<Title title='about L’Oréal ' dictionary={dictionary} />
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
					<Title title='Latest news' dictionary={dictionary} />
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
							{dictionary.Shop.Product.all}
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
					{listNews.map((item, index) => {
						return <BlogItem key={index} />
					})}
				</Box>
			</Box>
			{/* Footer */}
		</Box>
	)
}

export default ShopPageDetail

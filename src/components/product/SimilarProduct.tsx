import { poppins } from '@/assets/font'
import { classifyCategoryByType, listProduct } from '@/constants'
import { useStore } from '@/store'
import { ProductInterface } from '@/utils/product.interface'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import Lefticon from '../icon/Lefticon'
import ProductItem from '../shop/ProductItem'

const SimilarProduct = ({
	listSimilarProduct,
	productData,
	addToCart
}: any) => {
	const category = classifyCategoryByType.find(item =>
		item.type.includes(productData?.product_category)
	)
	if (!listSimilarProduct) return <></>
	return (
		<Box
			sx={{
				mt: { xs: '60px', md: '80px' }
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mb: { md: '54px' },
					alignItems: 'center'
				}}
			>
				<Typography
					className={poppins.className}
					variant='h3'
					sx={{
						color: '#000',
						fontSize: { xs: '24px', md: '36px' },
						fontWeight: 500,
						lineHeight: '125.5%'
					}}
				>
					Similar Product
				</Typography>
				<Link
					href={`/user/product?shopName=${productData?.user?.username}&category=${category?.category}`}
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
									xs: '18px',
									md: '20px'
								},
								mr: { xs: '18px', md: '24px' }
							}}
						>
							View all
						</Typography>
						<Lefticon />
					</Box>
				</Link>
			</Box>
			{/* List product */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					alignItems: 'center',
					paddingTop: '20px'
				}}
			>
				{listSimilarProduct.map((item: ProductInterface) => {
					return (
						<ProductItem
							productId={item.id}
							key={item.id}
							imgSrc={item.product_thumbnail}
							price={`${item.product_price}`}
							productName={item.product_name}
							productType={item.product_category}
							shopId={item.user.id}
							addToCart={addToCart}
						/>
					)
				})}
			</Box>
		</Box>
	)
}

export default SimilarProduct

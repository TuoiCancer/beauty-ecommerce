import { ProductInterface } from '@/utils/product.interface'
import React from 'react'
import ProductItem from '../shop/ProductItem'

const ProductSearchWrapper = ({
	listProduct,
	page,
	rowPerPage,
	addToCart,
	lang
}: {
	listProduct: any[]
	page: number
	rowPerPage: number
	addToCart: any
	lang: string
}) => {
	const listProductDisplay = listProduct.filter(item => item.page === page)[0]
		?.data

	return (
		<>
			{listProductDisplay?.map((item: ProductInterface, index: number) => {
				return (
					<ProductItem
						key={index}
						addToCart={addToCart}
						imgSrc={item.product_thumbnail}
						productName={item.product_name}
						productType={item.product_category}
						productId={item.id}
						price={`${item.product_price}`}
						shopId={item.user.id}
						quantity={item.product_quantity}
						lang={lang}
						style={{
							width: { md: '200px', xl: '260px' },
							height: { md: '300px', xl: '430px' },
							'& h3': {
								fontSize: { md: '16px' }
							},
							'& h6': {
								md: '18px'
							},
							mb: { sm: '24px', md: 0 },
							'& #option-container': {
								top: { md: '21%', xl: '50%', lg: '20%' },
								'& #option-item': {
									width: { xs: '40px', md: '32px', xl: '52px' },
									height: { xs: '40px', md: '32px', xl: '52px' },
									'& img': {
										width: { xs: '32px' },
										height: { xs: '32px' }
									}
								}
							}
						}}
					/>
				)
			})}
		</>
	)
}

export default ProductSearchWrapper

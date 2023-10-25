'use client'

import ImageItem from '@/components/base/ImageItem'
import ProgressLoading from '@/components/base/ProgressLoading'
import PaginationItem from '@/components/product/Pagination'
import ProductSearchWrapper from '@/components/product/ProductSearchWrapper'
import SidebarProduct from '@/components/product/Sidebar'
import ProductItem from '@/components/shop/ProductItem'
import { useAddToCart } from '@/service/react-query/cart.query'
import { useGetProductByPage } from '@/service/react-query/product.query'
import { useStore } from '@/store'
import { IFilterOption } from '@/utils/filterOption.interface'
import { Box, TextField, Typography } from '@mui/material'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ibarra } from '../../../../../public/font'

const ProductPage = ({ dictionary, lang }: any) => {
	const searchParams = useSearchParams()
	const search = searchParams.get('shopName')
	const categoryPath = searchParams.get('category')

	const { UserSlice } = useStore()

	const [page, setPage] = React.useState(1)
	const [rowPerPage, setRowPerPage] = React.useState(12)
	const [sorting, setSorting] = React.useState('createdAt')
	const [orderBy, setOrderBy] = React.useState('ASC')
	const [brand, setBrand] = React.useState(search || 'All')
	const [category, setCategory] = React.useState(categoryPath || 'All')
	const [searchKey, setSearchKey] = React.useState('')
	const [listProduct, setListProduct] = React.useState<any>([])

	const [filterOptions, setFilterOptions] = React.useState<IFilterOption>({
		searchKey: '',
		brand: brand,
		category: category,
		sort: 'createdAt',
		order: 'ASC'
	})

	const [paginationMeta, setPaginationMeta] = React.useState({
		pageCount: 0, // tổng số page
		page: 1,
		limit: 12,
		itemCount: 0 // tổng số product get được từ api
	})

	const {
		isLoading: gettingProducts,
		mutate: getProductByPage,
		data: dataGetListProduct
	} = useGetProductByPage()

	const { isLoading: isAddingToCart, mutate: addToCart } = useAddToCart()

	useEffect(() => {
		if (rowPerPage) {
			getProductByPage({
				page: 1,
				limit: rowPerPage,
				sort: filterOptions.sort,
				order: orderBy,
				product_shop: filterOptions.brand,
				product_category: filterOptions.category,
				user_id: UserSlice.user?.id,
				search_key: filterOptions.searchKey
			})
		}
	}, [rowPerPage])

	useEffect(() => {
		if (dataGetListProduct !== undefined) {
			if (dataGetListProduct?.result?.length === 0) {
				setListProduct([])
				setPaginationMeta({
					pageCount: 0,
					page: 1,
					limit: 12,
					itemCount: 0
				})
				return
			}
			setPaginationMeta(dataGetListProduct.pageMetaDto)

			const oldData = listProduct || []
			const newData = [...dataGetListProduct?.result, ...oldData]

			const dataFilter = newData.filter((item, index) => {
				return newData.findIndex(item2 => item2.page === item.page) === index
			})
			// sắp xếp từ bé đến lớn của page
			dataFilter.sort((a, b) => {
				return a.page - b.page
			})

			setListProduct(dataFilter)
		}
	}, [dataGetListProduct])

	useEffect(() => {
		if (page >= 5 && page - 5 >= 0) {
			if (page === paginationMeta?.pageCount) {
				// nếu là page cuối cùng -> load 5 page trước đấy
				getProductByPage({
					page: page - 5,
					limit: rowPerPage,
					sort: filterOptions.sort,
					product_shop: filterOptions.brand,
					product_category: filterOptions.category,
					search_key: filterOptions.searchKey,
					user_id: UserSlice.user?.id,
					order: orderBy
				})
			} else {
				// load 5 page previous current page
				const start = page - 4
				const isExsitStart = listProduct.find(
					(item: any) => item.page === start
				)
				if (!isExsitStart && page % 5 === 0) {
					getProductByPage({
						page: page - 5,
						limit: rowPerPage,
						sort: filterOptions.sort,
						product_shop: filterOptions.brand,
						product_category: filterOptions.category,
						search_key: filterOptions.searchKey,
						user_id: UserSlice.user?.id,
						order: orderBy
					})
				}

				// load 5 page after current page
				const end = page + 5
				const isExsitEnd = listProduct.find((item: any) => item.page === end)
				if (!isExsitEnd && page % 5 === 0 && end <= paginationMeta.pageCount) {
					getProductByPage({
						page: page + 1,
						limit: rowPerPage,
						sort: filterOptions.sort,
						product_shop: filterOptions.brand,
						product_category: filterOptions.category,
						search_key: filterOptions.searchKey,
						user_id: UserSlice.user?.id,
						order: orderBy
					})
				}

				const isNearPageEnd = paginationMeta.pageCount - page
				// check current page đã có data hay chưa
				const isExsit = listProduct.find((item: any) => item.page === page)
				if (
					isNearPageEnd <= 5 &&
					isNearPageEnd > 0 &&
					page % 5 === 0 &&
					!isExsit
				) {
					getProductByPage({
						page: page,
						limit: rowPerPage,
						sort: filterOptions.sort,
						product_shop: filterOptions.brand,
						product_category: filterOptions.category,
						search_key: filterOptions.searchKey,
						user_id: UserSlice.user?.id,
						order: orderBy
					})
				}
			}
		} else {
			// const isFirstPage = listProduct.find((item: any) => item.page === 1)
			// if (!isFirstPage) {
			// 	getProductByPage({
			// 		page: 1,
			// 		limit: rowPerPage,
			// 		sort: sort
			// 	})
			// }
		}
	}, [page])

	return (
		<Box
			sx={{
				pb: { xs: '42px', md: '60px' },
				pt: { xs: '100px', md: '200px' },
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
			{/* Search Box */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					mb: { xs: '42px' }
				}}
			>
				<Typography
					className={ibarra.className}
					variant='h2'
					sx={{
						color: '#121212',
						fontSize: { xs: '32px', md: '48px' },
						fontWeight: 700,
						lineHeight: '125.5%'
					}}
				>
					{dictionary.Product.title}
				</Typography>
				<Typography
					sx={{
						color: '#898989',
						fontSize: { xs: '16px', md: '20px', lg: '24px' },
						fontWeight: 200,
						padding: { xs: '12px', md: '12px 0 40px 0', lg: '12px 0 60px 0' },
						maxWidth: { md: '1000px' },
						textAlign: 'center'
					}}
				>
					{dictionary.Product.content}
				</Typography>
				<Box
					sx={{
						position: 'relative',
						width: { xs: '80%', xl: '1080px' }
					}}
				>
					<TextField
						id='outlined-basic'
						variant='outlined'
						placeholder={dictionary.Product.search}
						onKeyDown={e => {
							if (e.code === 'Enter') {
								setPage(1)
								getProductByPage({
									page: 1,
									limit: rowPerPage,
									sort: filterOptions.sort,
									product_shop: filterOptions.brand,
									product_category: filterOptions.category,
									search_key: searchKey,
									user_id: UserSlice.user?.id
								})
								setFilterOptions({
									...filterOptions,
									searchKey: searchKey
								})
							}
						}}
						onChange={e => {
							setSearchKey(e.target.value)
						}}
						sx={{
							width: '100%',
							background: '#FFF',
							'& input': {
								color: '#2D5210',
								fontSize: { md: '18px' },
								padding: { md: '20px', lg: '24px' }
							},
							'& fieldset': {
								border: '1px solid rgba(56, 97, 23, 0.40) !important',
								borderRadius: '12px'
							}
						}}
					/>
					<ImageItem
						onClick={() => {
							setPage(1)
							getProductByPage({
								page: 1,
								limit: rowPerPage,
								sort: filterOptions.sort,
								product_shop: filterOptions.brand,
								product_category: filterOptions.category,
								search_key: searchKey,
								user_id: UserSlice.user?.id
							})
							setFilterOptions({
								...filterOptions,
								searchKey: searchKey
							})
						}}
						imgSrc='/img/Search.png'
						style={{
							width: { md: '42px' },
							height: { md: '42px' },
							position: 'absolute',
							right: { md: '2%' },
							top: { md: '50%' },
							zIndex: 1,
							cursor: 'pointer',
							transform: 'translate(0,-50%)'
						}}
					/>
				</Box>
			</Box>
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
					padding: { sm: '0 14px', md: '80px 18px', xl: '100px 18px' },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'space-around',
						flexDirection: { xs: 'column', md: 'row' },
						width: '100%'
					}}
				>
					{/* Sidebar */}
					<SidebarProduct
						page={page}
						rowPerPage={rowPerPage}
						category={category}
						setCategory={setCategory}
						brand={brand}
						searchKey={searchKey}
						setBrand={setBrand}
						setPage={setPage}
						sorting={sorting}
						setSorting={setSorting}
						getProductByPage={getProductByPage}
						setFilterOptions={setFilterOptions}
						filterOptions={filterOptions}
						orderBy={orderBy}
						setOrderBy={setOrderBy}
						dictionary={dictionary}
					/>
					{/* List Product */}
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: {
								xs: 'repeat(1, 1fr)',
								md: 'repeat(3, 1fr)',
								lg: 'repeat(4, 1fr)',
								xl: 'repeat(4, 1fr)'
							},
							gridGap: { xs: '12px', md: '20px', lg: '32px' },
							mx: { xs: '12px', sm: 0 }
						}}
					>
						{listProduct.length !== 0 && (
							<ProductSearchWrapper
								listProduct={listProduct}
								page={page}
								rowPerPage={rowPerPage}
								addToCart={addToCart}
								lang={lang}
							/>
						)}

						{listProduct.length === 0 && (
							<Typography
								sx={{
									fontSize: { xs: '14px', md: '18px' },
									whiteSpace: 'nowrap',
									fontFamily: 'Montserrat'
								}}
							>
								Empty product
							</Typography>
						)}
						{gettingProducts && <ProgressLoading />}
					</Box>
				</Box>
				{/* Pagination */}
				<PaginationItem
					page={page}
					setPage={setPage}
					setRowPerPage={setRowPerPage}
					rowPerPage={rowPerPage}
					paginationMeta={paginationMeta}
					dictionary={dictionary}
				/>
			</Box>
		</Box>
	)
}

export default ProductPage

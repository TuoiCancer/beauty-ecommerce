import { poppins, roboto } from '../../../public/font'
import { Box, Checkbox, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ImageItem from '../base/ImageItem'
import Lefticon from '../icon/Lefticon'
import ProductCartItem from './ProductCartItem'

export interface CartItemProps {
	shopName: string
	link: string
	products: {
		id: string
		product_thumbnail: string
		product_name: string
		product_price: number
		quantityToBuy: number
	}[]
	productSelected: any[]
	updateFn: (data: any) => void
	deleteCartUser: (data: any) => void
	setProductSelected: (data: any) => void
	cartDetail: any
	dictionary: any
}

const CartItem = ({
	shopName,
	link,
	products,
	updateFn,
	deleteCartUser,
	setProductSelected,
	productSelected,
	cartDetail,
	dictionary
}: CartItemProps) => {
	const [isSelectAll, setIsSelectAll] = useState(false)
	const [listSelected, setListSelected] = useState<any[]>([]) // danh sách các sản phẩm trong cart được chọn, chỉ dùng để hiển thị tick xanh ở select all

	useEffect(() => {
		if (isSelectAll) {
			// chèn thêm các sản phẩm vào mảng danh sách tổng các sản phẩm được chọn
			setProductSelected((prev: any[]) => {
				return [...prev, ...products.map(item => item)].filter(
					(item, index, arr) => arr.indexOf(item) === index
				)
			}) // xóa các phần tử trùng lặp trong mảng
			// set tất cả các sản phẩm trong shop này là được chọn hết
			setListSelected(products.map(item => item))
		} else {
			if (
				listSelected.length === 0 ||
				listSelected.length === products.length
			) {
				setListSelected([])
			}
		}
	}, [isSelectAll])

	useEffect(() => {
		if (listSelected.length === products.length) {
			setIsSelectAll(true)
		} else {
			setIsSelectAll(false)
		}
		if (listSelected.length === 0) {
			setProductSelected((prev: any[]) => {
				return prev.filter(id => !products.find(item => item.id === id.id))
			})
		}
	}, [listSelected])

	useEffect(() => {
		// khi 1 sản phẩm trong giỏ bị xóa thì xóa nó khỏi danh sách các sản phẩm được chọn
		setListSelected((prev: any[]) => {
			return prev.filter(product =>
				products.find(item => item.id === product.id)
			)
		})
	}, [products])

	return (
		<Box
			sx={{
				mb: { xs: '16px', md: '52px', xl: '64px' }
			}}
		>
			{/* Header About Shop */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
				<Link
					href={link}
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						textDecoration: 'none'
					}}
				>
					<ImageItem
						imgSrc='/img/store.png'
						style={{
							width: { xs: '24px', md: '28px' },
							height: { xs: '24px', md: '28px' }
						}}
					/>
					<Typography
						className={roboto.className}
						variant='h3'
						sx={{
							color: '#626262',
							fontSize: { xs: '18px', md: '20px', lg: '22px' },
							fontWeight: 500,
							lineHeight: '125.5%',
							margin: { xs: '0 8px', lg: '0 16px' }
						}}
					>
						{shopName}
					</Typography>
					<Lefticon width='12px' height='12px' />
				</Link>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<Checkbox
						checked={isSelectAll}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setIsSelectAll(event.target.checked)
						}}
						sx={{
							color: 'green',
							borderRadius: '50px',
							'&.Mui-checked': {
								color: 'green'
							},
							'& .MuiSvgIcon-root': {
								fontSize: {
									xs: '18px',
									md: '24px'
								}
							}
						}}
					/>
					<Typography
						sx={{
							fontSize: { xs: '14px', md: '16px' },
							fontFamily: 'Poppins'
						}}
					>
						{dictionary.Cart.select}
					</Typography>
				</Box>
			</Box>
			{/* List Product in cart */}
			{products.map((item, index) => {
				return (
					<ProductCartItem
						key={index}
						item={item}
						updateFn={updateFn}
						deleteCartUser={deleteCartUser}
						setProductSelected={setProductSelected}
						setListSelected={setListSelected}
						listSelected={listSelected}
						dictionary={dictionary}
					/>
				)
			})}
		</Box>
	)
}

export default CartItem

import React, { useEffect, useState } from 'react'
import { poppins, roboto } from '../../../public/font'

import { Box, Checkbox, Typography } from '@mui/material'
import ImageItem from '../base/ImageItem'
import Link from 'next/link'
import { useStore } from '@/store'
import { formatCurrency, getPriceFormat } from '@/helper'
const ProductCartItem = ({
	item,
	updateFn,
	deleteCartUser,
	setProductSelected,
	setListSelected,
	listSelected,
	dictionary
}: any) => {
	const { UserSlice } = useStore()
	const [isSelected, setIsSelected] = useState(false)

	useEffect(() => {
		if (listSelected.find((product: any) => product.id === item.id)) {
			setIsSelected(true)
		} else {
			setIsSelected(false)
		}
	}, [listSelected])

	const handleIncreaseCartUser = () => {
		updateFn({
			userId: UserSlice.user.id,
			quantity: item.quantityToBuy + 1,
			productId: item.id
		})
	}

	const handleDecreaseCartUser = () => {
		if (item.quantityToBuy > 1) {
			updateFn({
				userId: UserSlice.user.id,
				quantity: item.quantityToBuy - 1,
				productId: item.id
			})
		} else {
			deleteCartUser({
				userId: UserSlice.user.id,
				productId: item.id
			})
		}
	}

	const handleSelectProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			setProductSelected((prev: any[]) => [...prev, item])
			setListSelected((prev: any[]) => [...prev, item])
			setIsSelected(true)
		} else {
			setIsSelected(false)
			setProductSelected((prev: any[]) => {
				return prev.filter(id => id.id !== item.id)
			})
			setListSelected((prev: any[]) => {
				return prev.filter(id => id.id !== item.id)
			})
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				margin: { xs: '12px 0', md: '24px 0' }
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<Checkbox
					checked={isSelected}
					onChange={handleSelectProduct}
					sx={{
						color: 'green',
						'&.Mui-checked': {
							color: 'green'
						},
						'& .MuiSvgIcon-root': {
							fontSize: {
								xs: '24px',
								md: '32px'
							}
						}
					}}
				/>
				<ImageItem
					imgSrc={item.product_thumbnail}
					style={{
						width: { xs: '60px', md: '120px', lg: '160px' },
						height: { xs: '60px', md: '120px', lg: '160px' },
						marginLeft: { md: '24px' },
						mr: { xs: '12px', md: '18px' }
					}}
				/>
			</Box>
			<Box
				sx={{
					flex: 1,
					mr: { xs: '12px' }
				}}
			>
				<Link
					href={`/${UserSlice.lang}/user/product/${item.id}`}
					style={{
						flex: 1,
						textDecoration: 'none',
						color: '#000'
					}}
				>
					<Typography
						variant='h3'
						className={roboto.className}
						sx={{
							color: '#183A12',
							fontSize: { xs: '18px', md: '20px' },
							fontWeight: 300,
							lineHeight: '125.5%',
							mb: { md: '12px' },
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden'
						}}
					>
						{item?.product_name}
					</Typography>
					<Typography
						variant='h3'
						className={poppins.className}
						sx={{
							color: '#575757',
							fontSize: {
								xs: '16px',
								md: '18px'
							},
							fontWeight: '400',
							display: { xs: 'none', md: 'block' }
						}}
					>
						{formatCurrency(item.product_price) || 0}
					</Typography>
				</Link>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						mt: { xs: '8px' }
					}}
				>
					<Box
						className={roboto.className}
						sx={{
							display: 'flex',
							alignItems: 'center',
							'& p': {
								color: '#737373',
								fontSize: '32px',
								fontWeight: 500,
								lineHeight: '154.5%',
								margin: { md: '0 24px' },
								cursor: 'pointer'
							}
						}}
					>
						<Typography onClick={handleDecreaseCartUser}> - </Typography>
						<Typography
							variant='h5'
							sx={{
								fontSize: '16px',
								borderRadius: '4px',
								background: '#F2F2F2',
								padding: { xs: '6px 12px', md: ' 8px 12px ' },
								mx: { xs: '8px' }
							}}
						>
							{item.quantityToBuy}
						</Typography>
						<Typography onClick={handleIncreaseCartUser}> + </Typography>
					</Box>
					<Typography
						className={poppins.className}
						sx={{
							color: '#575757',
							fontSize: { xs: '18px', md: '20px' },
							margin: { xs: '0 12px', md: '0 42px' }
						}}
					>
						{formatCurrency(
							+item.quantityToBuy * +getPriceFormat(item.product_price)
						) || 0}
					</Typography>
				</Box>
			</Box>
			<ImageItem
				imgSrc='/img/trash.png'
				style={{
					width: { xs: '24px', md: '30px' },
					height: { xs: '24px', md: '30px' },
					marginLeft: { md: 'auto' },
					cursor: 'pointer'
				}}
				onClick={() => {
					deleteCartUser({
						userId: UserSlice.user.id,
						productId: item.id
					})
				}}
			/>
		</Box>
	)
}

export default ProductCartItem

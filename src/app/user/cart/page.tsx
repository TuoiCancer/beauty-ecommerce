'use client'
import { poppins, roboto } from '@/assets/font'
import BaseButton from '@/components/base/BaseButton'
import ImageItem from '@/components/base/ImageItem'
import CartItem from '@/components/cart/CartItem'
import StepperItem from '@/components/cart/StepperItem'
import {
	useDeleteCartUser,
	useGetCartDetailByUserId,
	useUpdateCartUser
} from '@/service/react-query/cart.query'
import { useStore } from '@/store'
import { Box, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const CartPage = () => {
	const { UserSlice } = useStore()
	const { data: cartDetail, refetch: getCartDetail } = useGetCartDetailByUserId(
		{
			userId: UserSlice.user?.id
		}
	)
	const { mutate: updateCartUser, isLoading, isSuccess } = useUpdateCartUser()
	const { mutate: deleteCartUser, isSuccess: isDeleted } = useDeleteCartUser()

	const [isRefetchFn, setIsRefetchFn] = React.useState(false)
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	useEffect(() => {
		getCartDetail()
	}, [])
	useEffect(() => {
		if (isSuccess || isDeleted) {
			console.log('refetch')
			getCartDetail()
			setIsRefetchFn(false)
		}
	}, [isRefetchFn, isSuccess, isDeleted])

	const shopList = [
		{
			name: `L'Oreal`,
			link: '/user/shop/loreal'
		},
		{
			name: `The Ordinary`,
			link: '/user/shop/oridinary'
		},
		{
			name: `Bioderma`,
			link: '/user/shop/bioderma'
		}
	]

	// loading progess
	return (
		<Box
			sx={{
				maxWidth: {
					md: 'var(--max-width-md)',
					lg: 'var(--max-width-lg)',
					xl: 'var(--max-width-xl)'
				},
				margin: { md: '0 auto' },
				pt: { xs: '100px', md: '160px' },
				mb: { xs: '32px', md: '120px' },
				px: { xs: '8px', lg: '48px' }
			}}
		>
			<Typography
				className={roboto.className}
				variant='h1'
				sx={{
					color: '#000',
					fontSize: { xs: '28px', md: '48px' },
					fontWeight: 500,
					lineHeight: '125.5%',
					textAlign: 'center',
					mb: { xs: '32px', lg: '92px' }
				}}
			>
				Shopping Cart
			</Typography>
			{/* Items in cart */}
			<Box
				sx={{
					mb: { xs: '32px', md: '94px' }
				}}
			>
				{!cartDetail ||
					(cartDetail?.cart_count_product === 0 && (
						<ImageItem
							imgSrc='/img/empty_cart.png'
							style={{
								margin: { xs: '0 auto', md: '0 auto' },
								width: { xs: '100%', md: '60%' },
								height: '500px',
								'& img': {
									objectFit: 'contain'
								}
							}}
						/>
					))}
				{cartDetail &&
					Object.keys(cartDetail.cart_products).length > 0 &&
					Object.keys(cartDetail.cart_products).map(
						(key: string, index: number) => {
							const shop = shopList.find(item => item.name === key)
							return (
								<CartItem
									key={index}
									shopName={key}
									link={shop?.link || ''}
									products={cartDetail.cart_products[key].products}
									updateFn={updateCartUser}
									deleteCartUser={deleteCartUser}
								/>
							)
						}
					)}
			</Box>
			{/* Sub total */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
					justifyContent: 'space-between',
					alignItems: 'flex-start'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'roww',
						alignItems: 'center',
						mb: { xs: '32px', md: '0' },
						justifyContent: { xs: 'space-between', sm: 'flex-start' },
						width: '100%'
					}}
				>
					<Typography
						className={roboto.className}
						variant='h5'
						sx={{
							color: '#000',
							fontSize: { xs: '16px', md: '20px' },
							fontWeight: 300,
							lineHeight: '125.5%',
							mr: { md: '24px' }
						}}
					>
						Voucher code
					</Typography>
					<TextField
						id='outlined-basic'
						variant='outlined'
						sx={{
							flex: { xs: 1, md: '0 0 auto' },
							width: { md: '300px' },
							mx: { xs: '12px' },
							'& fieldset': {
								borderColor: '#A2C18A !important'
							}
						}}
					/>
					<BaseButton
						bgStyle='color'
						label='Apply'
						variant='contained'
						styleSx={{
							marginLeft: { md: '42px' },
							p: { xs: '8px 16px', md: '8px 30px' },
							borderRadius: '8px',
							background: '#204700',
							color: '#fff',
							fontSize: { xs: '14px', md: '20px' },
							'&:hover': {
								background: '#2b5c02'
							}
						}}
					/>
				</Box>
				<Box
					sx={{
						'& h5': {
							color: '#000',
							fontSize: { xs: '18px', lg: '20px', xl: '22px' },
							fontWeight: 300,
							lineHeight: '125.5%'
						}
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: { md: '24px' }
						}}
					>
						<Typography variant='h5'>Voucher: </Typography>
						<Typography
							variant='h6'
							className={poppins.className}
							sx={{
								color: '#575757',
								fontFamily: 'Poppins',
								fontSize: '24px',
								marginLeft: { md: '24px' }
							}}
						>
							$0
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							whiteSpace: 'nowrap'
						}}
					>
						<Typography variant='h5'>Sub total:</Typography>
						<Typography
							variant='h3'
							sx={{
								color: '#575757',
								fontFamily: 'Poppins',
								fontSize: { xs: '24px', md: '28px' },
								marginLeft: { xs: '12px', md: '12px' }
							}}
						>
							$0
						</Typography>
					</Box>
				</Box>
			</Box>
			<BaseButton
				onClick={handleOpen}
				bgStyle='gradient'
				label='Checkout'
				variant='contained'
				styleSx={{
					mt: { xs: '24px' },
					padding: { md: '8px 30px' },
					background: 'linear-gradient(146deg, #315316 0%, #72A748 100%)',
					textTransform: 'none',
					borderRadius: '0',
					fontSize: { xs: '16px', md: '20px' },
					fontWeight: 400,
					marginLeft: 'auto',
					'&:hover': {
						background: 'linear-gradient(146deg, #315316 0%, #72A748 100%)'
					}
				}}
			/>
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						width: { md: '776px' },
						height: { xs: '620px', md: '780px' },
						borderRadius: '4px',
						background: '#FFF',
						margin: { xs: '92px 8px', md: '80px auto' },
						padding: { xs: '32px 12px', md: '50px 45px 70px 45px' },
						overflowY: 'scroll',
						scrollBehavior: 'smooth',
						'&::-webkit-scrollbar': {
							backgroundColor: '#fff',
							width: '4px'
						},
						'&::-webkit-scrollbar-track': {},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#A4C18A',
							width: '2px',
							borderRadius: '20px'
						}
					}}
				>
					<StepperItem handleClose={handleClose} />
				</Box>
			</Modal>
			{/* {isLoading && <ProgressLoading />} */}
		</Box>
	)
}

export default CartPage

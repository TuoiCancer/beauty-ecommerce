/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import BaseButton from '@/components/base/BaseButton'
import ImageItem from '@/components/base/ImageItem'
import CartItem from '@/components/cart/CartItem'
import SelectVoucherModal from '@/components/cart/SelectVoucherModal'
import StepperItem from '@/components/cart/StepperItem'
import Lefticon from '@/components/icon/Lefticon'
import { formatCurrency, getPriceFormat } from '@/helper'
import {
	useDeleteCartUser,
	useGetCartDetailByUserId,
	useUpdateCartUser
} from '@/service/react-query/cart.query'
import { useCreateOrder } from '@/service/react-query/order.query'
import {
	useGetVoucherByVoucherCode,
	useGetVoucherOfUser
} from '@/service/react-query/voucher.query'
import { useStore } from '@/store'
import { Box, Modal, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { poppins, roboto } from '../../../../../public/font'
import Loading from '../../loading'

const CartPage = ({ dictionary }: any) => {
	const { UserSlice } = useStore()
	const route = useRouter()
	const { data: cartDetail, refetch: getCartDetail } = useGetCartDetailByUserId(
		{
			userId: UserSlice.user?.id
		}
	)
	const { mutate: updateCartUser, isLoading, isSuccess } = useUpdateCartUser()
	const { mutate: deleteCartUser, isSuccess: isDeleted } = useDeleteCartUser()

	// get voucher by voucher code
	const { mutate: getVoucherByVoucherCode, data: voucherCodeFound } =
		useGetVoucherByVoucherCode()

	const { data: listVoucherCollectedByUser } = useGetVoucherOfUser({
		userId: UserSlice.user?.id
	})

	const {
		mutate: createOrderFn,
		isSuccess: isCreateOrderDone,
		data: dataOrderCreate
	} = useCreateOrder()

	const [isRefetchFn, setIsRefetchFn] = useState(false)
	const [open, setOpen] = useState(false)

	const [voucherCode, setVoucherCode] = useState('')
	const [voucherShipping, setVoucherShipping] = useState(0)
	const [voucherDiscount, setVoucherDiscount] = useState(0)

	// state to save id of voucher discount and voucher freeship of user
	const [voucherFreeShipId, setVoucherFreeShipId] = useState('')
	const [voucherDiscountId, setVoucherDiscountId] = useState('')

	const [isApplyVoucher, setIsApplyVoucher] = useState(true)
	const [isApplyVoucherShipping, setIsApplyVoucherShipping] = useState(true)

	const [subTotal, setSubTotal] = useState(0)

	const [productSelected, setProductSelected] = useState<any[]>([]) // danh sách id của các sản phẩm trong từng shop được chọn sẽ được push vào

	const [listCheckout, setListCheckout] = useState<any[]>([]) // giống với productSelected nhưng chứa thông tin của product và của shop -> dùng để hiển thị trong component Confirm Checkout

	const [openPopup, setOpenPopup] = useState(false)

	const handleOpen = () => {
		if (!productSelected.length) {
			toast.warn(dictionary.Cart.err, {
				position: 'top-center'
			})
		} else {
			setOpen(true)
		}
	}
	const handleClose = () => setOpen(false)
	useEffect(() => {
		getCartDetail()
	}, [])

	useEffect(() => {
		if (isSuccess || isDeleted || isCreateOrderDone) {
			getCartDetail()
			setIsRefetchFn(false)
		}
	}, [isRefetchFn, isSuccess, isDeleted, isCreateOrderDone])

	useEffect(() => {
		// khi user xóa sản phẩm trong cart thì cũng phải xóa sản phẩm đó trong danh sách các sản phẩm được chọn
		if (cartDetail) {
			// từ id lấy ra thông tin sản phẩm và shop của sản phẩm đó
			const listProduct = Object.keys(cartDetail?.cart_products).map(key => {
				return cartDetail?.cart_products[key]
			})

			const newListProduct = listProduct
				.map(item => {
					const shopInfo = {
						shopId: item.shop.id,
						shopName: item.shop.username
					}
					return item.products.map((product: any) => {
						return {
							...product,
							...shopInfo
						}
					})
				})
				.flat()

			if (productSelected.length > 0) {
				// nếu user đã chọn sản phẩm  , rồi xóa sản phẩm trong cart thì cũng phải xóa sản phẩm đó trong danh sách các sản phẩm được chọn
				const newProductSelected = newListProduct.filter(item => {
					return productSelected.find(product => product.id === item.id)
				})
				setProductSelected(newProductSelected)
			}
		}
	}, [cartDetail])

	useEffect(() => {
		if (productSelected.length > 0) {
			const total = productSelected.reduce((acc, item) => {
				return acc + +getPriceFormat(item.product_price) * item.quantityToBuy
			}, 0)
			setSubTotal(total)
			// từ id lấy ra thông tin sản phẩm và shop của sản phẩm đó
			const listProduct = Object.keys(cartDetail?.cart_products).map(key => {
				return cartDetail?.cart_products[key]
			})

			const newListProduct = listProduct
				.map(item => {
					const shopInfo = {
						shopId: item.shop.id,
						shopName: item.shop.username
					}
					return item.products.map((product: any) => {
						return {
							...product,
							...shopInfo
						}
					})
				})
				.flat()
			const items = newListProduct.filter(item => {
				return productSelected.find(product => product.id === item.id)
			})
			setListCheckout(items)
		} else {
			setSubTotal(0)
		}
	}, [productSelected])

	useEffect(() => {
		if (
			voucherCodeFound &&
			listVoucherCollectedByUser?.freeShipMaxValueVoucher
		) {
			// value = max of 2 voucher
			const tmp1 =
				voucherCodeFound?.voucher_scope === 'freeship' &&
				voucherCodeFound.voucher_min_order_value < subTotal
					? voucherCodeFound.voucher_value
					: 0
			const tmp2 =
				listVoucherCollectedByUser.freeShipMaxValueVoucher
					.voucher_min_order_value < subTotal
					? listVoucherCollectedByUser.freeShipMaxValueVoucher.voucher_value
					: 0
			setVoucherShipping(Math.max(tmp1, tmp2))

			if (tmp1 > tmp2) {
				setVoucherFreeShipId(voucherCodeFound.id)
			} else {
				setVoucherFreeShipId(
					listVoucherCollectedByUser.freeShipMaxValueVoucher.id
				)
			}
		} else if (voucherCodeFound) {
			if (voucherCodeFound?.voucher_scope === 'freeship') {
				// check total price is valid for voucher
				if (voucherCodeFound.voucher_min_order_value > subTotal) {
					toast.warn(
						`This voucher is only valid for orders over ${formatCurrency(
							voucherCodeFound.voucher_min_order_value
						)}`,
						{
							position: 'top-center'
						}
					)
				} else {
					setVoucherShipping(voucherCodeFound.voucher_value)
					setVoucherFreeShipId(voucherCodeFound.id)
				}
			}
		} else if (listVoucherCollectedByUser?.freeShipMaxValueVoucher) {
			if (
				subTotal >
				listVoucherCollectedByUser.freeShipMaxValueVoucher
					.voucher_min_order_value
			) {
				setVoucherShipping(
					listVoucherCollectedByUser.freeShipMaxValueVoucher.voucher_value
				)
				setVoucherFreeShipId(
					listVoucherCollectedByUser?.freeShipMaxValueVoucher?.id
				)
			} else {
				setVoucherShipping(0)
				setVoucherFreeShipId('')
			}
		}
		if (listVoucherCollectedByUser?.storewideMaxValueVoucher) {
			if (
				subTotal >
				listVoucherCollectedByUser.storewideMaxValueVoucher
					.voucher_min_order_value
			) {
				setVoucherDiscount(
					listVoucherCollectedByUser.storewideMaxValueVoucher.voucher_value
				)
				setVoucherDiscountId(
					listVoucherCollectedByUser?.storewideMaxValueVoucher?.id
				)
			} else {
				setVoucherDiscount(0)
				setVoucherDiscountId('')
			}
		}
	}, [listVoucherCollectedByUser, voucherCodeFound, subTotal])

	useEffect(() => {
		if (!UserSlice.user) {
			route.push('/user/home')
		}
	}, [UserSlice])

	useEffect(() => {
		if (isCreateOrderDone) {
			const sendEmail = async () => {
				await fetch('/api/send', {
					method: 'POST',
					body: JSON.stringify({
						username: UserSlice.user.username,
						email: UserSlice.user.email,
						order: dataOrderCreate
					})
				})
					.then(res => {
						return res.json()
					})
					.then(data => {
						if (data && data.message === 'success') {
							toast.success(
								`Thank you for your order, ${UserSlice.user.username}! We've already send you an email. Check your inbox!`,
								{
									position: 'top-center'
								}
							)
						} else {
							alert('Apologies! Please try again.')
						}
					})
					.catch(err => {
						alert('Ooops! unfortunately some error has occurred.')
					})
			}
			sendEmail()
			route.push(`/user/order/success`)
		}
	}, [isCreateOrderDone])

	const shopList = [
		{
			name: `L'Oreal`,
			link: '/user/shop/loreal'
		},
		{
			name: `The Ordinary`,
			link: '/user/shop/ordinary'
		},
		{
			name: `Bioderma`,
			link: '/user/shop/bioderma'
		}
	]

	const handleSelectVoucher = () => {
		setOpenPopup(true)
	}

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
					fontSize: { xs: '28px', md: '32px', lg: '40px' },
					fontWeight: 500,
					lineHeight: '125.5%',
					textAlign: 'center',
					mb: { xs: '24px', lg: '52px' }
				}}
			>
				{dictionary.Cart.title}
			</Typography>
			{/* Items in cart */}
			<Box
				sx={{
					mb: { xs: '32px', md: '52px' },
					maxHeight: { xs: '100%', md: '70vh' },
					overflowY: 'auto',
					'&::-webkit-scrollbar': {
						width: '0px'
					},
					'&::-webkit-scrollbar-thumb': {
						width: '0px'
					}
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
									link={`/${UserSlice.lang}${shop?.link}` || ''}
									products={cartDetail.cart_products[key].products}
									cartDetail={cartDetail}
									updateFn={updateCartUser}
									deleteCartUser={deleteCartUser}
									setProductSelected={setProductSelected}
									productSelected={productSelected}
									dictionary={dictionary}
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
						mb: { xs: '32px', md: '12px' },
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
						{dictionary.Cart.vouchercode}
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
						onChange={e => {
							setVoucherCode(e.target.value)
						}}
					/>
					<BaseButton
						onClick={() => {
							if (!voucherCode) {
								toast.warn(dictionary.Cart.err02, {
									position: 'top-center'
								})
							} else {
								getVoucherByVoucherCode(voucherCode)
							}
						}}
						bgStyle='color'
						label={dictionary.Cart.apply}
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
				<Box>
					{isApplyVoucherShipping && voucherShipping !== 0 && (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								mb: { xs: '12px', md: '24px' },
								'& h5': {
									color: '#000',
									fontSize: { xs: '16px', md: '20px', xl: '22px' },
									fontWeight: 300,
									lineHeight: '125.5%',
									whiteSpace: 'nowrap'
								}
							}}
						>
							<Typography
								variant='h5'
								sx={{
									color: '#000'
								}}
							>
								{voucherShipping ? `${dictionary.Cart.freeship}: ` : ''}
							</Typography>
							<Typography
								variant='h6'
								className={poppins.className}
								sx={{
									color: '#575757',
									fontFamily: 'Poppins',
									fontSize: { xs: '16px', md: '20px' },
									marginLeft: '12px'
								}}
							>
								{`-${formatCurrency(voucherShipping)}`}
							</Typography>
							<Lefticon
								width='12px'
								height='12px'
								sx={{
									cursor: 'pointer'
								}}
								onClick={handleSelectVoucher}
							/>
						</Box>
					)}

					{isApplyVoucher && voucherDiscount !== 0 && (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								mb: { md: '24px' },
								'& h5': {
									color: '#000',
									fontSize: { xs: '16px', md: '20px', xl: '22px' },
									fontWeight: 300,
									lineHeight: '125.5%',
									whiteSpace: 'nowrap'
								}
							}}
						>
							<Typography variant='h5'>
								{voucherDiscount ? `${dictionary.Cart.coupon}: ` : ''}
							</Typography>
							<Typography
								variant='h6'
								className={poppins.className}
								sx={{
									color: '#575757',
									fontFamily: 'Poppins',
									fontSize: { xs: '16px', md: '20px' },
									margin: '0 12px'
								}}
							>
								{`-${formatCurrency(voucherDiscount)}`}
							</Typography>
							<Lefticon
								width='12px'
								height='12px'
								sx={{
									cursor: 'pointer'
								}}
								onClick={handleSelectVoucher}
							/>
						</Box>
					)}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							whiteSpace: 'nowrap',
							mt: '12px',
							'& h5': {
								color: '#000',
								fontSize: { xs: '16px', md: '20px', xl: '22px' },
								fontWeight: 300,
								lineHeight: '125.5%'
							}
						}}
					>
						<Typography variant='h5'>
							{dictionary.Cart.subtotal}
							<Typography
								variant='h6'
								component='span'
								sx={{
									color: '#575757',
									fontFamily: 'Poppins',
									fontSize: '16px',
									marginLeft: { md: '8px' },
									fontWeight: 400
								}}
							>
								({productSelected?.length || 0} {dictionary.Cart.item}) :
							</Typography>
						</Typography>
						<Typography
							variant='h3'
							sx={{
								color: '#575757',
								fontFamily: 'Poppins',
								fontSize: { xs: '20px', md: '24px' },
								marginLeft: { xs: '12px', md: '12px' }
							}}
						>
							{isApplyVoucher
								? formatCurrency(subTotal - voucherDiscount)
								: formatCurrency(subTotal)}
						</Typography>
					</Box>
				</Box>
			</Box>
			<BaseButton
				onClick={handleOpen}
				bgStyle='gradient'
				label={dictionary.Cart.checkout}
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
						padding: { xs: '32px 12px', md: '50px 45px 30px 45px' },
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
					<StepperItem
						handleClose={handleClose}
						productSelected={listCheckout}
						voucherShipping={voucherShipping}
						voucherDiscount={voucherDiscount}
						createOrderFn={createOrderFn}
						voucherFreeShipId={voucherFreeShipId}
						voucherDiscountId={voucherDiscountId}
						isApplyVoucher={isApplyVoucher}
						isApplyVoucherShipping={isApplyVoucherShipping}
						dictionary={dictionary}
					/>
				</Box>
			</Modal>
			<Modal
				open={openPopup}
				onClose={() => {
					setOpenPopup(false)
				}}
			>
				<SelectVoucherModal
					listVoucherCollectedByUser={listVoucherCollectedByUser}
					voucherCodeFound={voucherCodeFound}
					subTotal={subTotal}
					isApplyVoucher={isApplyVoucher}
					setIsApplyVoucher={setIsApplyVoucher}
					isApplyVoucherShipping={isApplyVoucherShipping}
					setIsApplyVoucherShipping={setIsApplyVoucherShipping}
				/>
			</Modal>
			{/* {isLoading && <ProgressLoading />} */}
		</Box>
	)
}

export default CartPage

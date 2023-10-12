import { roboto } from '@/assets/font'
import { checkout } from '@/constants'
import { useStore } from '@/store'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ImageItem from '../base/ImageItem'
import ReviewListProduct, { ReviewListProductProps } from './ReviewListProduct'

import PersonIcon from '@mui/icons-material/Person'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import PlaceIcon from '@mui/icons-material/Place'
import { formatCurrency, formatCurrencyV2, getPriceFormat } from '@/helper'

const ConfirmCheckout = ({
	activeStep,
	steps,
	handleBack,
	setActiveStep,
	productSelected,
	handleClose,
	voucherShipping,
	voucherDiscount,
	createOrderFn,
	voucherFreeShipId,
	voucherDiscountId,
	isApplyVoucher,
	isApplyVoucherShipping
}: any) => {
	const { UserSlice } = useStore()

	const listProductSelectedByShop = productSelected.reduce(
		(acc: any, cur: any) => {
			const shopName = cur.shopName
			if (acc[shopName]) {
				acc[shopName].products.push(cur)
			} else {
				acc[shopName] = {
					shopName: shopName,
					shopId: cur.shopId,
					products: [cur]
				}
			}
			return acc
		},
		{}
	)

	const totalProductPrice =
		productSelected.reduce((acc: any, item: any) => {
			return acc + +getPriceFormat(item.product_price) * item.quantityToBuy
		}, 0) -
		(isApplyVoucher ? voucherDiscount : 0) +
		(isApplyVoucherShipping
			? 15000 - voucherShipping > 0
				? 15000 - voucherShipping
				: 0
			: 15000)

	const handleNext = () => {
		createOrderFn({
			userId: UserSlice.user.id,
			products: productSelected,
			orderShipping: UserSlice.shippingInfor,
			orderPayment: UserSlice.paymentInfor,
			orderCheckout: {
				totalPrice: totalProductPrice,
				...(isApplyVoucher && {
					voucherId: voucherDiscountId
				}),
				...(isApplyVoucherShipping && { voucherFreeShipId })
			}
		})
		handleClose()
	}

	return (
		<Box>
			<Typography
				className={roboto.className}
				variant='h2'
				sx={{
					color: '#000',
					fontSize: { xs: '20px', md: '22px' },
					fontWeight: 500,
					margin: { xs: '12px 0', md: '36px 0 36px 0' }
				}}
			>
				Order summary
			</Typography>
			<Box
				sx={{
					my: { xs: '16px' }
				}}
			>
				{/* {checkout.listProduct.map(
					(productInfo: ReviewListProductProps, index: number) => {
						return <ReviewListProduct key={index} listProduct={productInfo} />
					}
				)} */}
				{Object.keys(listProductSelectedByShop).map(
					(key: any, index: number) => {
						return (
							<ReviewListProduct
								key={index}
								listProduct={listProductSelectedByShop[key]}
							/>
						)
					}
				)}
			</Box>
			<Box
				sx={{
					'& h3': {
						color: '#626262',
						fontFamily: 'Roboto',
						fontSize: '18px',
						fontWeight: 500,
						lineHeight: '125.5%'
					},
					'& h4': {
						color: '#575757',
						fontFamily: 'Poppins',
						fontSize: '18px'
					},
					'& > .MuiBox-root': {
						margin: { xs: '12px 0', md: '22px 0' }
					},
					paddingBottom: { md: '22px' }
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Typography variant='h3'>Shipping</Typography>
					<Typography variant='h4'>
						{isApplyVoucherShipping
							? formatCurrencyV2(
									15000 - voucherShipping > 0 ? 15000 - voucherShipping : 0
							  )
							: formatCurrencyV2(15000)}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Typography variant='h3'>Voucher</Typography>
					<Typography variant='h4'>
						{isApplyVoucher ? `-${formatCurrency(voucherDiscount)}` : 0}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Typography variant='h3'>Total</Typography>
					<Typography variant='h4'>
						{formatCurrency(totalProductPrice)}
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					'& h3': {
						color: '#626262',
						fontFamily: 'Roboto',
						fontSize: '18px',
						fontWeight: 500,
						paddingBottom: { xs: '8px', md: '18px' },
						pt: { xs: '8px' }
					},
					'& h4': {
						color: '#343434',
						fontSize: '16px',
						fontWeight: 300,
						lineHeight: '125.5%',
						paddingBottom: { xs: '8px', md: '18px' }
					},
					'& h5': {
						color: '#626262',
						fontSize: '16px',
						fontWeight: 500,
						lineHeight: '125.5%',
						paddingRight: { md: '12px' }
					},
					'& h6': {
						color: '#626262',
						fontSize: '16px',
						fontWeight: 300,
						lineHeight: '125.5%'
					}
				}}
			>
				<Box
					sx={{
						flex: 1,
						'& .shipping-wrapper': {
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'flex-start',
							marginBottom: '12px',
							// alignItems: 'center',
							'& h4': {
								padding: 0
							},
							'& svg': {
								marginRight: '8px',
								color: '#777'
							}
						}
					}}
				>
					<Typography
						variant='h3'
						sx={{ color: '#000', fontSize: { xs: '18px', md: '22px' } }}
					>
						Shipping Address
					</Typography>
					<Box className='shipping-wrapper'>
						<PersonIcon />
						<Typography variant='h4'>{`${UserSlice.shippingInfor?.firstName} ${UserSlice.shippingInfor?.lastName}`}</Typography>
					</Box>
					<Box className='shipping-wrapper'>
						<LocalPhoneIcon />
						<Typography variant='h4'>
							{UserSlice.shippingInfor?.phone}
						</Typography>
					</Box>
					<Box className='shipping-wrapper'>
						<PlaceIcon />
						<Typography variant='h4'>
							{/* {UserSlice.shippingInfor?.address}, */}
							4th floor - 8 Ton That Thuyet - My Dinh 2 - Nam Tu Liem - Ha Noi
							{UserSlice.shippingInfor?.district} -{' '}
							{UserSlice.shippingInfor?.city}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						'& > .MuiBox-root': {
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							paddingBottom: { md: '12px' }
						}
					}}
				>
					<Typography variant='h3'>Payment details</Typography>
					{UserSlice.paymentInfor?.paymentMethod === 'card' ? (
						<>
							<Box
								sx={{
									mb: { xs: '8px' }
								}}
							>
								<Typography variant='h5'>Card name:</Typography>
								<Typography variant='h6'>Techcombank</Typography>
							</Box>
							<Box>
								<Typography variant='h5'>Card num:</Typography>
								<Typography variant='h6'>xxxxxxxx021</Typography>
							</Box>
						</>
					) : (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							<Typography variant='h6'>Payment when recieve</Typography>
							<ImageItem
								imgSrc='https://cdn-icons-png.flaticon.com/128/1570/1570917.png'
								width='32px'
								height='32px'
								style={{
									marginLeft: '12px'
								}}
							/>
						</Box>
					)}
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					pt: { xs: '24px', md: '32px' }
				}}
			>
				<Button
					color='inherit'
					disabled={activeStep === 0}
					onClick={handleBack}
					sx={{ mr: 1 }}
				>
					Back
				</Button>
				<Box sx={{ flex: '1 1 auto' }} />
				<Button
					onClick={handleNext}
					sx={{
						borderRadius: '12px',
						background: 'linear-gradient(146deg, #315316 0%, #72A748 100%)',
						padding: { md: '8px 30px' },
						textTransform: 'capitalize',
						color: '#fff'
					}}
				>
					{activeStep === steps.length - 1 ? 'Buy' : 'Next'}
				</Button>
			</Box>
		</Box>
	)
}

export default ConfirmCheckout

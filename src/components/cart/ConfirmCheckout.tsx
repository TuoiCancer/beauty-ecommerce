import { useStore } from '@/store'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ImageItem from '../base/ImageItem'
import ReviewListProduct from './ReviewListProduct'

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
	isApplyVoucherShipping,
	dictionary
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
			orderShipping: `${UserSlice.shippingInfor.address}, ${UserSlice.shippingInfor.ward}, ${UserSlice.shippingInfor.district.name}, ${UserSlice.shippingInfor.city.name}`,
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
					<Typography variant='h3'>{dictionary.Cart.shipping}</Typography>
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
					<Typography variant='h3'>{dictionary.Cart.voucher}</Typography>
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
					<Typography variant='h3'>{dictionary.Cart.total}</Typography>
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
						{dictionary.Cart['steplabel1']}
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
							{UserSlice.shippingInfor?.address} -{' '}
							{UserSlice.shippingInfor?.ward} -{' '}
							{UserSlice.shippingInfor?.district?.name} -{' '}
							{UserSlice.shippingInfor?.city?.name}
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
					<Typography variant='h3'>{dictionary.Cart.steplabel2}</Typography>
					{UserSlice.paymentInfor?.paymentMethod === 'card' ? (
						<>
							<Box
								sx={{
									mb: { xs: '8px' }
								}}
							>
								<Typography variant='h5'>
									{dictionary.Cart.cardname}:
								</Typography>
								<Typography variant='h6'>Techcombank</Typography>
							</Box>
							<Box>
								<Typography variant='h5'>{dictionary.Cart.cardnum}:</Typography>
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
							<Typography variant='h6'>{dictionary.Cart.recieve}</Typography>
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
					{dictionary.Cart.backBtn}
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
					{activeStep === steps.length - 1
						? `${dictionary.Cart.buyBtn}`
						: `${dictionary.Cart.nextBtn}`}
				</Button>
			</Box>
		</Box>
	)
}

export default ConfirmCheckout

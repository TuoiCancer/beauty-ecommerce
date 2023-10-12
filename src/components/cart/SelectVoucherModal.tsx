import { formatCurrency } from '@/helper'
import { Box, Checkbox, Typography } from '@mui/material'
import React from 'react'
import ImageItem from '../base/ImageItem'

const SelectVoucherModal = ({
	listVoucherCollectedByUser,
	voucherCodeFound,
	subTotal,
	isApplyVoucher,
	isApplyVoucherShipping,
	setIsApplyVoucher,
	setIsApplyVoucherShipping
}: {
	listVoucherCollectedByUser: any
	voucherCodeFound: any
	subTotal: number
	isApplyVoucher: boolean
	setIsApplyVoucher: (data: boolean) => void
	isApplyVoucherShipping: boolean
	setIsApplyVoucherShipping: (data: boolean) => void
}) => {
	// tìm voucher free ship có giá trị lớn nhất từ listVoucherCollectedByUser và voucherCodeFound (nếu có)
	let voucherFreeship = {
		voucher_name: '',
		voucher_code: '',
		voucher_value: 0
	}

	const voucherCoupon = listVoucherCollectedByUser?.storewideMaxValueVoucher

	if (voucherCodeFound && listVoucherCollectedByUser?.freeShipMaxValueVoucher) {
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
		voucherFreeship =
			tmp1 > tmp2
				? voucherCodeFound
				: listVoucherCollectedByUser.freeShipMaxValueVoucher
	} else if (voucherCodeFound) {
		if (
			voucherCodeFound?.voucher_scope === 'freeship' &&
			voucherCodeFound.voucher_min_order_value <= subTotal
		) {
			voucherFreeship = voucherCodeFound
		}
	} else if (listVoucherCollectedByUser?.freeShipMaxValueVoucher) {
		if (
			listVoucherCollectedByUser.freeShipMaxValueVoucher
				.voucher_min_order_value <= subTotal
		) {
			voucherFreeship = listVoucherCollectedByUser.freeShipMaxValueVoucher
		}
	}

	return (
		<Box
			sx={{
				width: { md: '500px' },
				height: { xs: '260px', md: '480px' },
				borderRadius: '4px',
				background: '#FFF',
				margin: { xs: '92px 8px', md: '0 auto' },
				padding: { xs: '32px 12px', md: '50px 45px 70px 45px' },
				transform: { xs: 'translateY(0)', md: 'translate(0, 50%)' }
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<ImageItem imgSrc='/img/coupon.png' width='100px' height='100px' />
				<Box>
					<Typography
						sx={{
							fontSize: '18px',
							fontWeight: '600',
							fontFamily: 'Montserrat'
						}}
					>
						{voucherCoupon?.voucher_name}
					</Typography>
					<Typography
						sx={{
							fontSize: '16px',
							fontWeight: '400',
							fontFamily: 'Montserrat'
						}}
					>{`-${formatCurrency(voucherCoupon?.voucher_value)}`}</Typography>
				</Box>
				<Checkbox
					checked={isApplyVoucher}
					onChange={() => setIsApplyVoucher(!isApplyVoucher)}
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
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mt: '20px'
				}}
			>
				<ImageItem imgSrc='/img/freeship.png' width='100px' height='100px' />
				<Box>
					<Typography
						sx={{
							fontSize: '18px',
							fontWeight: '600',
							fontFamily: 'Montserrat'
						}}
					>
						{voucherFreeship?.voucher_name}
					</Typography>
					<Typography
						sx={{
							fontSize: '16px',
							fontWeight: '400',
							fontFamily: 'Montserrat'
						}}
					>{`-${formatCurrency(voucherFreeship?.voucher_value)}`}</Typography>
				</Box>
				<Checkbox
					checked={isApplyVoucherShipping}
					onChange={() => setIsApplyVoucherShipping(!isApplyVoucherShipping)}
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
			</Box>
		</Box>
	)
}

export default SelectVoucherModal

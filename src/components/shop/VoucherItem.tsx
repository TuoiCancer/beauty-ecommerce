import React from 'react'
import { Box, Typography } from '@mui/material'
import BaseButton from '../base/BaseButton'
import { formatCurrency } from '@/helper'
import { useStore } from '@/store'
const VoucherItem = ({ voucher, collectVoucherFn }: any) => {
	const { UserSlice } = useStore()

	const handleCollectVoucher = () => {
		const userId = UserSlice.user.id
		const voucherId = voucher.id
		collectVoucherFn({
			userId,
			voucherId
		})
	}

	return (
		<Box
			sx={{
				padding: '12px 16px',
				borderRadius: '8px',
				border: '1px dashed #B5FF79',
				background: 'rgba(136, 223, 66, 0.09)',
				marginRight: { xs: '12px', md: '18px' },
				// maxWidth: '300px',
				minWidth: { xs: '320px' },
				marginBottom: { xs: '8px', md: '18px' }
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Box
					sx={{
						marginRight: { md: '52px' }
					}}
				>
					<Typography
						variant='h6'
						sx={{
							color: '#406D1C',
							fontSize: '12px',
							fontStyle: 'italic',
							fontWeight: 500,
							marginBottom: { xs: '8px', md: '16px' }
						}}
					>
						{voucher.voucher_scope.charAt(0).toUpperCase() +
							voucher.voucher_scope.slice(1)}
					</Typography>
					<Box>
						<Typography
							variant='h3'
							sx={{
								color: '#406D1C',
								fontSize: { xs: '20px', md: '22px' },
								fontStyle: 'normal'
							}}
						>
							đ {formatCurrency(voucher.voucher_value).replace('₫', '')}
						</Typography>
						<Typography
							variant='h4'
							sx={{
								color: '#406D1C',
								fontSize: { xs: '16px', md: '18px' },
								whiteSpace: 'nowrap'
							}}
						>
							Min. spend {formatCurrency(voucher.voucher_min_order_value)}
						</Typography>
					</Box>
				</Box>
				{voucher.isCollected ? (
					<Box
						sx={{
							position: 'relative',
							width: { md: '42px' },
							height: { md: '42px' },
							borderRadius: '50%',
							border: '2px solid rgba(114, 167, 72, 0.38)',
							display: 'flex',
							textAlign: 'center'
						}}
					>
						<Typography
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%) rotate(-20.875deg)',
								fontSize: '14px',
								color: '#406D1C38',
								fontWeight: 500,
								whiteSpace: 'nowrap',
								background: '#F4FCEE'
							}}
						>
							COLLECTED
						</Typography>
					</Box>
				) : (
					<BaseButton
						label='COLLECT'
						variant='contained'
						type='button'
						styleSx={{
							backgroundColor: '#679B3D',
							color: '#fff',
							fontSize: { xs: '14px', md: '16px' },
							'&:hover': {
								backgroundColor: '#679B3D'
							}
						}}
						onClick={handleCollectVoucher}
					/>
				)}
			</Box>
			<Typography
				variant='h5'
				sx={{
					color: '#406D1C',
					fontSize: '14px',
					marginTop: '18px'
				}}
			>
				1 Oct,2023-29 Sep,2024
			</Typography>
		</Box>
	)
}

export default VoucherItem

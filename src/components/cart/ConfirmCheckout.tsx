import { roboto } from '@/assets/font'
import { checkout } from '@/constants'
import { useStore } from '@/store'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ReviewListProduct, { ReviewListProductProps } from './ReviewListProduct'

const ConfirmCheckout = ({
	activeStep,
	steps,
	handleBack,
	setActiveStep,
	productSelected,
	handleClose
}: any) => {
	const { UserSlice } = useStore()
	console.log('productSelected', productSelected)
	const handleNext = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
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
				{checkout.listProduct.map(
					(productInfo: ReviewListProductProps, index: number) => {
						return <ReviewListProduct key={index} listProduct={productInfo} />
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
					<Typography variant='h4'>${checkout.feeShip.toFixed(2)}</Typography>
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
					<Typography variant='h4'>${checkout.feeShip.toFixed(2)}</Typography>
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
					<Typography variant='h4'>${checkout.feeShip.toFixed(2)}</Typography>
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
				<Box>
					<Typography
						variant='h3'
						sx={{ color: '#000', fontSize: { xs: '18px', md: '22px' } }}
					>
						Shipping Address
					</Typography>
					<Typography variant='h4'>Nguyen Van A</Typography>
					<Typography variant='h4'>0123456789</Typography>
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
					{checkout.paymentDetail.type === 'card' ? (
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
						<Typography variant='h6'>Payment when recieve</Typography>
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

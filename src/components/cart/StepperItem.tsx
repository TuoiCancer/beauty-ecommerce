'use client'
import {
	Box,
	Button,
	Step,
	StepLabel,
	Typography,
	Stepper,
	CircularProgress
} from '@mui/material'
import React from 'react'
import { roboto } from '../../../public/font'
import ConfirmCheckout from './ConfirmCheckout'
import PaymentDetails from './PaymentDetails'
import ShippingAddressForm from './ShippingAddressForm'

const steps = [
	{
		id: 1,
		title: 'Shipping Address',
		Component: ShippingAddressForm
	},
	{
		id: 2,
		title: 'Payment details',
		Component: PaymentDetails
	},
	{
		id: 3,
		title: 'Review your order',
		Component: ConfirmCheckout
	}
]

const StepperItem = ({
	handleClose,
	productSelected,
	voucherShipping,
	voucherDiscount,
	createOrderFn,
	voucherFreeShipId,
	voucherDiscountId,
	isApplyVoucher,
	isApplyVoucherShipping,
	dictionary
}: any) => {
	const [activeStep, setActiveStep] = React.useState(0)

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	return (
		<Box>
			<Typography
				variant='h1'
				className={roboto.className}
				sx={{
					color: '#232323',
					fontSize: { xs: '24px', md: '32px' },
					fontWeight: { xs: 500, md: 700 },
					textAlign: 'center',
					mb: { xs: '24px', md: '32px' }
				}}
			>
				{dictionary.Cart.checkout}
			</Typography>
			<Box>
				<Stepper activeStep={activeStep} alternativeLabel>
					{steps.map((item, index) => {
						const stepProps: { completed?: boolean } = {}
						const labelProps: {
							optional?: React.ReactNode
						} = {}
						return (
							<Step key={index} {...stepProps}>
								<StepLabel
									{...labelProps}
									sx={{
										'& .MuiSvgIcon-root': {
											color: '#B3B3B3',
											'&.Mui-active': {
												color: '#0F8113'
											},
											'&.Mui-completed': {
												color: '#0F8113'
											}
										}
									}}
								>
									{dictionary.Cart[`steplabel${item.id}`]}
								</StepLabel>
							</Step>
						)
					})}
				</Stepper>
				{activeStep !== steps.length && (
					<Box
						sx={{
							pt: { xs: '24px' }
						}}
					>
						{/* Start render Body  */}
						{steps.map((item, index) => {
							if (index === activeStep) {
								return (
									<item.Component
										dictionary={dictionary}
										key={index}
										activeStep={activeStep}
										steps={steps}
										handleBack={handleBack}
										setActiveStep={setActiveStep}
										productSelected={productSelected}
										handleClose={handleClose}
										voucherShipping={voucherShipping}
										voucherDiscount={voucherDiscount}
										createOrderFn={createOrderFn}
										voucherFreeShipId={voucherFreeShipId}
										voucherDiscountId={voucherDiscountId}
										isApplyVoucher={isApplyVoucher}
										isApplyVoucherShipping={isApplyVoucherShipping}
									/>
								)
							}
						})}
						{/* End  */}
					</Box>
				)}
			</Box>
		</Box>
	)
}

export default StepperItem

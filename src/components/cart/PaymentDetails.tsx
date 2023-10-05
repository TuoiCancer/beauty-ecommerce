import { listCard } from '@/constants'
import { useStore } from '@/store'
import {
	Box,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl
} from '@mui/material'
import Button from '@mui/material/Button'
import React from 'react'

const PaymentDetails = ({
	activeStep,
	steps,
	handleBack,
	setActiveStep
}: any) => {
	const { UserSlice } = useStore()
	const handleNext = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
	}
	return (
		<Box>
			<Box
				sx={{
					pt: { lg: '42px' }
				}}
			>
				<Typography
					variant='h6'
					sx={{
						color: '#000',
						fontSize: { xs: '16px', md: '18px', lg: '22px' },
						fontWeight: 500,
						mb: { xs: '20px', lg: '24px' }
					}}
				>
					Payment method
				</Typography>
				<Box>
					<RadioGroup
						defaultValue='card'
						name='radio-buttons-group'
						sx={{
							'& .MuiFormControlLabel-root': {
								'& .MuiRadio-root': {
									color: '#0F8113'
								}
							}
						}}
						value={UserSlice.paymentInfor.paymentMethod}
						onChange={e => {
							UserSlice.setPaymentInfor((prev: any) => {
								return {
									...prev,
									paymentMethod: e.target.value
								}
							})
						}}
					>
						<FormControlLabel
							value='card'
							control={<Radio />}
							sx={{
								mb: { md: '32px' },
								'& .MuiTypography-root': {
									width: '100%'
								}
							}}
							label={
								<Box
									sx={{
										pl: { md: '16px' },
										flex: 1,
										width: '100%'
									}}
								>
									<Typography
										variant='body1'
										sx={{
											color: '#000',
											fontSize: '16px',
											fontWeight: 400,
											lineHeight: '24px',
											mb: { xs: '12px', md: 0 }
										}}
									>
										Credit card
									</Typography>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
											'& input': {
												borderRadius: '10px',
												border: '1px solid #EBEBEB',
												background: '#F8F8F9',
												fontSize: '16px',
												fontWeight: 300,
												fontFamily: 'Roboto',
												flex: 1
											},
											'& .MuiInputBase-root': {
												mt: { md: '16px' },
												'& fieldset': {
													border: '1px solid #EBEBEB !important'
												},
												'&.Mui-focused': {
													// border: '1px solid #EBEBEB ',
												},
												'&:hover': {
													'& fieldset': {
														border: 'none'
													}
												}
											}
										}}
									>
										<Select
											id='demo-simple-select-label'
											sx={{
												mr: { xs: '24px', md: '56px' },
												flex: 1
											}}
											value={UserSlice.paymentInfor.paymentData.cardName || ''}
											placeholder='Card type *'
											onChange={e => {
												UserSlice.setPaymentInfor((prev: any) => {
													return {
														...prev,
														paymentData: {
															cardName: e.target.value,
															cardNumber: prev.paymentData.cardNumber
														}
													}
												})
											}}
										>
											{listCard.map((item, index) => {
												return (
													<MenuItem key={item.id} value={item.value}>
														{item.name}
													</MenuItem>
												)
											})}
										</Select>

										<TextField
											sx={{
												flex: 1
											}}
											placeholder='Card number *'
											value={UserSlice.paymentInfor.paymentData.cardNumber}
											onChange={e => {
												UserSlice.setPaymentInfor((prev: any) => {
													return {
														...prev,
														paymentData: {
															cardName: prev.paymentData.cardName,
															cardNumber: e.target.value
														}
													}
												})
											}}
										/>
									</Box>
								</Box>
							}
						/>

						<FormControlLabel
							value='money'
							onChange={(e: any) => {
								UserSlice.setPaymentInfor((prev: any) => {
									return {
										...prev,
										paymentMethod: e.target.value
									}
								})
							}}
							control={<Radio />}
							label={
								<Typography
									variant='body1'
									sx={{
										pl: { md: '16px' }
									}}
								>
									Payment when receive product
								</Typography>
							}
						/>
					</RadioGroup>
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

export default PaymentDetails

import { listCard } from '@/constants'
import { useStore } from '@/store'
import { BankInterface } from '@/utils/bank.interface'
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
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import ImageItem from '../base/ImageItem'

const PaymentDetails = ({
	activeStep,
	steps,
	handleBack,
	setActiveStep,
	dictionary
}: any) => {
	const { UserSlice } = useStore()
	const handleNext = () => {
		setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
	}

	const { data: listBank, isLoading: isGetting } = useQuery({
		queryKey: ['get list bank'],
		queryFn: () =>
			axios
				.get(
					'https://api.vietqr.io/v2/banks?utm_source=j2team&utm_medium=url_shortener&utm_campaign=bank-list-api'
				)
				.then(response => {
					return response.data.data
				})
	})

	console.log('listBank', listBank)

	return (
		<Box>
			<Box
				sx={{
					pt: { lg: '42px' }
				}}
			>
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
						value={UserSlice?.paymentInfor?.paymentMethod}
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
										{dictionary.Cart.creditcard}
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
											value={
												UserSlice?.paymentInfor?.paymentData?.cardName || ''
											}
											placeholder='Card type *'
											onChange={e => {
												UserSlice.setPaymentInfor((prev: any) => {
													return {
														...prev,
														paymentData: {
															cardName: e.target.value,
															cardNumber: prev?.paymentData?.cardNumber
														}
													}
												})
											}}
										>
											{listBank?.map((item: BankInterface, index: number) => {
												return (
													<MenuItem
														key={item.id}
														value={item.shortName}
														sx={{
															display: 'flex',
															justifyContent: 'space-between',
															alignItems: 'center'
															// top: '47%'
														}}
													>
														<Typography>{item.shortName}</Typography>
														<ImageItem
															imgSrc={item.logo}
															style={{
																width: '100px',
																height: '50px',
																marginLeft: '10px'
															}}
														/>
													</MenuItem>
												)
											})}
										</Select>

										<TextField
											sx={{
												flex: 1
											}}
											placeholder={dictionary.Cart.cardnum}
											value={UserSlice?.paymentInfor?.paymentData?.cardNumber}
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
									{dictionary.Cart.recieve}
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

export default PaymentDetails

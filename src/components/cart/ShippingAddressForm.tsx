import { listCity, listDistrict } from '@/constants'
import { useStore } from '@/store'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const ShippingAddressForm = ({
	activeStep,
	steps,
	handleBack,
	setActiveStep,
	productSelected,
	handleClose
}: any) => {
	const { UserSlice } = useStore()

	const handleNext = () => {
		if (
			UserSlice.shippingInfor.city === '' ||
			UserSlice.shippingInfor.district === '' ||
			UserSlice.shippingInfor.address === ''
		) {
			toast.warning('Please fill in all fields', {
				position: 'top-center'
			})
		} else {
			setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
		}
	}

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					pt: { md: '52px' },
					'& input': {
						borderRadius: '10px',
						border: '1px solid #EBEBEB',
						background: '#F8F8F9',
						fontSize: '16px',
						fontWeight: 300,
						fontFamily: 'Roboto',
						mb: { xs: '12px', md: '36px' },
						width: '100%',
						flex: 1,
						padding: { md: '16px 24px' }
					},
					'& .MuiInputBase-root': {
						'&:hover': {
							'& fieldset': {
								border: 'none'
							}
						},
						'& fieldset': {
							border: 'none'
						}
					}
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%'
					}}
				>
					<TextField
						sx={{
							flex: 1,
							mr: { md: '56px' },
							width: '100%'
						}}
						value={UserSlice.shippingInfor.firstName}
						placeholder='First name *'
						onChange={e => {
							UserSlice.setShippingInfor((prev: any) => {
								return {
									...prev,
									firstName: e.target.value
								}
							})
						}}
					/>
					<TextField
						sx={{
							flex: 1,
							width: '100%'
						}}
						value={UserSlice.shippingInfor.lastName}
						placeholder='Last name *'
						onChange={e => {
							UserSlice.setShippingInfor((prev: any) => {
								return {
									...prev,
									lastName: e.target.value
								}
							})
						}}
					/>
				</Box>
				<TextField
					value={UserSlice.shippingInfor.phone}
					placeholder='Phone number *'
					onChange={e => {
						//regex phone number
						const regex = /(84|0[3|2|8|9])+([0-9]{8})\b/
						if (e.target.value !== '' || regex.test(e.target.value)) {
							UserSlice.setShippingInfor((prev: any) => {
								return {
									...prev,
									phone: e.target.value
								}
							})
						}
					}}
				/>
				<TextField
					value={UserSlice.shippingInfor.address}
					placeholder='Address *'
					onChange={e => {
						UserSlice.setShippingInfor((prev: any) => {
							return {
								...prev,
								address: e.target.value
							}
						})
					}}
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						'& .MuiInputBase-root': {
							flex: 1,
							borderRadius: '10px',
							border: '1px solid #EBEBEB',
							background: '#F8F8F9',
							fontSize: '16px',
							fontWeight: 300,
							fontFamily: 'Roboto',
							mb: { md: '36px' }
						}
					}}
				>
					<Select
						label='City *'
						sx={{
							mr: { xs: '32px', md: '56px' }
						}}
						value={UserSlice.shippingInfor.city}
						onChange={e => {
							UserSlice.setShippingInfor((prev: any) => {
								return {
									...prev,
									city: e.target.value
								}
							})
						}}
					>
						{listCity.map((item, index) => {
							return (
								<MenuItem key={item.id} value={item.value || ''}>
									{item.name || ''}
								</MenuItem>
							)
						})}
					</Select>
					<Select
						label='State/Provine/Region *'
						value={UserSlice.shippingInfor.district}
						onChange={e => {
							UserSlice.setShippingInfor((prev: any) => {
								return {
									...prev,
									district: e.target.value
								}
							})
						}}
					>
						{listDistrict.map((item, index) => {
							return (
								<MenuItem key={item.id} value={item.value || ''}>
									{item.name || ''}
								</MenuItem>
							)
						})}
					</Select>
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

export default ShippingAddressForm

import { listCity, listDistrict } from '@/constants'
import { Box, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const ShippingAddressForm = () => {
	const [phoneNum, setPhoneNum] = React.useState('')
	return (
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
					placeholder='First name *'
				/>
				<TextField
					sx={{
						flex: 1,
						width: '100%'
					}}
					placeholder='Last name *'
				/>
			</Box>
			<TextField
				placeholder='Phone number *'
				onChange={e => {
					//regex phone number
					const regex = /(84|0[3|2|8|9])+([0-9]{8})\b/
					if (e.target.value === '' || regex.test(e.target.value)) {
						setPhoneNum(e.target.value)
					}
				}}
			/>
			<TextField placeholder='Address *' />
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
				>
					{listCity.map((item, index) => {
						return (
							<MenuItem key={item.id} value={item.value}>
								{item.name}
							</MenuItem>
						)
					})}
				</Select>
				<Select label='State/Provine/Region *'>
					{listDistrict.map((item, index) => {
						return (
							<MenuItem key={item.id} value={item.value}>
								{item.name}
							</MenuItem>
						)
					})}
				</Select>
			</Box>
		</Box>
	)
}

export default ShippingAddressForm

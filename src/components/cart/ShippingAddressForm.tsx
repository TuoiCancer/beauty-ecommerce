import { listCity, listDistrict } from '@/constants'
import { useStore } from '@/store'
import {
	DistrictInterface,
	ProvinceInterface,
	WardInterface
} from '@/utils/index.interface'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import ProgressLoading from '../base/ProgressLoading'

const ShippingAddressForm = ({
	activeStep,
	steps,
	handleBack,
	setActiveStep,
	dictionary
}: any) => {
	const { UserSlice } = useStore()
	const { data: listProvinces, isLoading } = useQuery({
		queryKey: ['get list province'],
		queryFn: () =>
			axios.get('https://provinces.open-api.vn/api/p/').then(res => res.data)
	})

	const { data: listDistrictData, isLoading: isGettingDistricts } = useQuery({
		queryKey: ['get list district'],
		queryFn: () =>
			axios.get('https://provinces.open-api.vn/api/d/').then(response => {
				return response.data
			})
	})

	const { data: listWardData, isLoading: isGetting } = useQuery({
		queryKey: ['get list ward'],
		queryFn: () =>
			axios.get('https://provinces.open-api.vn/api/w/').then(response => {
				return response.data
			})
	})

	const [province, setProvince] = React.useState<ProvinceInterface | undefined>(
		UserSlice.shippingInfor.city
	)
	const [district, setDistrict] = React.useState<DistrictInterface | undefined>(
		UserSlice.shippingInfor.district
	)
	const [listDistrict, setListDistrict] = React.useState<DistrictInterface[]>()

	const [listWard, setListWard] = React.useState<WardInterface[]>([])

	const handleNext = () => {
		const regex = /(84|0[3|2|8|9])+([0-9]{8})\b/

		if (
			UserSlice.shippingInfor.city === '' ||
			UserSlice.shippingInfor.district === '' ||
			UserSlice.shippingInfor.address === '' ||
			UserSlice.shippingInfor.phone === ''
		) {
			toast.warning(dictionary.Cart.err03, {
				position: 'top-center'
			})
		} else if (!regex.test(UserSlice.shippingInfor.phone)) {
			toast.warning('Phone number is not valid', {
				position: 'top-center'
			})
		} else {
			setActiveStep((prevActiveStep: number) => prevActiveStep + 1)
		}
	}

	useEffect(() => {
		if (province) {
			// set list district when province change
			const tmpDistrict = listDistrictData?.filter(
				(item: DistrictInterface) => {
					return item.province_code === province?.code
				}
			)
			setListDistrict(tmpDistrict)
		} else if (UserSlice?.shippingInfor?.city) {
			const tmpDistrict = listDistrictData?.filter(
				(item: DistrictInterface) => {
					return item.province_code === UserSlice?.shippingInfor?.city?.code
				}
			)
			setListDistrict(tmpDistrict)
		}
	}, [province, UserSlice, listDistrictData])

	useEffect(() => {
		if (district) {
			const listWardTmp = listWardData?.filter((item: WardInterface) => {
				return item.district_code === district?.code
			})
			setListWard(listWardTmp)
		} else if (UserSlice?.shippingInfor?.district) {
			setListWard(
				listWardData?.filter((item: WardInterface) => {
					return item.district_code === UserSlice?.shippingInfor?.district?.code
				})
			)
		}
	}, [district, UserSlice, listWardData])

	if (isLoading || isGettingDistricts || isGetting) return <ProgressLoading />

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
						placeholder={`${dictionary.Cart.firstname} *`}
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
						placeholder={`${dictionary.Cart.lastname} *`}
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
					placeholder={`${dictionary.Cart.phone} *`}
					onChange={e => {
						UserSlice.setShippingInfor((prev: any) => {
							return {
								...prev,
								phone: e.target.value
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
							mr: { xs: '32px', md: '56px' },
							'& .MuiPaper-root': {
								background: 'red'
							}
						}}
						value={UserSlice?.shippingInfor?.city?.name || province?.name || ''}
						onChange={e => {
							const tmpCity = listProvinces?.find(
								(item: ProvinceInterface) => item.name === e.target.value
							)
							setProvince(tmpCity)
							UserSlice.setShippingInfor((prev: any) => {
								return {
									...prev,
									city: tmpCity
								}
							})
						}}
					>
						{listProvinces?.map((item: ProvinceInterface, index: number) => {
							return (
								<MenuItem key={item.code} value={item.name || ''}>
									{item.name || ''}
								</MenuItem>
							)
						})}
					</Select>
					<Select
						label='State/Provine/Region *'
						value={UserSlice?.shippingInfor?.district?.name}
						onChange={e => {
							const tmpDistrict = listDistrict?.find(
								(item: DistrictInterface) => item.name === e.target.value
							)
							setDistrict(tmpDistrict)
							UserSlice.setShippingInfor((prev: any) => {
								return {
									...prev,
									district: tmpDistrict
								}
							})
						}}
					>
						{listDistrict?.map((item: DistrictInterface, index: number) => {
							return (
								<MenuItem key={item.code} value={item.name || ''}>
									{item.name || ''}
								</MenuItem>
							)
						})}
					</Select>
				</Box>
				<Select
					sx={{
						borderRadius: '10px',
						border: '1px solid #EBEBEB',
						background: '#F8F8F9',
						fontSize: '16px',
						fontWeight: 300,
						fontFamily: 'Roboto',
						mb: { md: '36px' }
					}}
					label='State/Provine/Region *'
					value={UserSlice?.shippingInfor?.ward || ''}
					onChange={e => {
						const tmpWard = listWard.find(
							(item: WardInterface) => item.name === e.target.value
						)
						UserSlice.setShippingInfor((prev: any) => {
							return {
								...prev,
								ward: tmpWard?.name
							}
						})
					}}
				>
					{listWard?.map((item: WardInterface, index: number) => {
						return (
							<MenuItem key={item.code} value={item.name || ''}>
								{item.name || ''}
							</MenuItem>
						)
					})}
				</Select>
				<TextField
					value={UserSlice.shippingInfor.address}
					placeholder={`${dictionary.Cart.address} * `}
					onChange={e => {
						UserSlice.setShippingInfor((prev: any) => {
							return {
								...prev,
								address: e.target.value
							}
						})
					}}
				/>
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

export default ShippingAddressForm

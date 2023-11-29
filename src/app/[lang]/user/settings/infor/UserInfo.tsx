import BaseButton from '@/components/base/BaseButton'
import ImageItem from '@/components/base/ImageItem'
import InputItem from '@/components/settings/information/InputItem'
import { stringAvatar } from '@/helper'
import { useUpdateUserInfo } from '@/service/react-query/user.query'
import { useStore } from '@/store'
import { Avatar, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { toast } from 'react-toastify'

const UserInfo = () => {
	const { UserSlice } = useStore()

	const { isLoading, mutate: updateUserInfo } = useUpdateUserInfo()

	const [userName, setUserName] = React.useState(UserSlice?.user?.username)
	const [phoneNumber, setPhoneNumber] = React.useState(UserSlice?.user?.phone)
	const [gender, setGender] = React.useState(UserSlice?.user?.gender)
	const [address, setAddress] = React.useState(UserSlice?.user?.address)
	const [age, setAge] = React.useState(UserSlice?.user?.age)

	const handleUpdateUserInfo = () => {
		if (!userName || !phoneNumber || !gender || !address) {
			toast.warn('Please fill in all fields', {
				position: toast.POSITION.TOP_CENTER
			})
			return
		}
		updateUserInfo({
			username: userName,
			phone: phoneNumber,
			age,
			gender,
			address,
			id: UserSlice?.user?.id
		})
	}

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					mb: '32px'
				}}
			>
				{UserSlice?.user?.avatar ? (
					<ImageItem imgSrc={UserSlice?.user?.avatar} />
				) : (
					<Avatar
						{...stringAvatar(UserSlice?.user?.username || 'U', {
							width: 80,
							height: 80,
							fontSize: '32px'
						})}
					/>
				)}
				<Typography
					variant='h2'
					sx={{
						fontFamily: 'var(--font-family)',
						fontWeight: '600',
						fontSize: '28px',
						marginLeft: '24px'
					}}
				>
					{userName}
				</Typography>
			</Box>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr'
				}}
			>
				<InputItem
					text='Username'
					value={userName}
					onChange={(e: any) => {
						setUserName(e.target.value)
					}}
				/>
				<InputItem
					text='Phone Number'
					value={phoneNumber}
					onChange={(e: any) => {
						setPhoneNumber(e.target.value)
					}}
				/>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
				>
					<Box>
						<Typography
							variant='h6'
							sx={{
								fontFamily: 'var(--font-family)',
								fontWeight: '500',
								fontSize: '12px',
								color: '#999999',
								mb: '12px'
							}}
						>
							Age
						</Typography>
						<Select
							id='Gender'
							value={age}
							onChange={(e: any) => {
								setAge(e.target.value)
							}}
							sx={{
								width: '100px',
								height: '60px'
							}}
						>
							{[...Array(100)].map((_, index) => (
								<MenuItem key={index} value={index + 1}>
									{index + 1}
								</MenuItem>
							))}
						</Select>
					</Box>

					<Box>
						<Typography
							variant='h6'
							sx={{
								fontFamily: 'var(--font-family)',
								fontWeight: '500',
								fontSize: '12px',
								color: '#999999',
								mb: '12px'
							}}
						>
							Gender
						</Typography>
						<Select
							id='Gender'
							value={gender}
							onChange={(e: any) => {
								setGender(e.target.value)
							}}
							sx={{
								width: '120px',
								height: '60px'
							}}
						>
							<MenuItem value='Male'>Male</MenuItem>
							<MenuItem value='Female'>Female</MenuItem>
							<MenuItem value='Other'>Other</MenuItem>
						</Select>
					</Box>
				</Box>

				<InputItem
					text='Address'
					value={address}
					onChange={(e: any) => {
						setAddress(e.target.value)
					}}
				/>
			</Box>

			<BaseButton
				label='Save Changes'
				variant='contained'
				onClick={handleUpdateUserInfo}
				styleSx={{
					textTransform: 'none',
					fontFamily: 'var(--font-family)',
					fontWeight: '500',
					fontSize: '14px',
					borderRadius: '12px',
					padding: '12px 32px',
					marginTop: '32px'
				}}
			/>
		</Box>
	)
}

export default UserInfo

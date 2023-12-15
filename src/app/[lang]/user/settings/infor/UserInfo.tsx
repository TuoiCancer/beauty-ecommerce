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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Box
				sx={{
					backgroundColor: '#fff',
					borderRadius: '8px',
					p: '32px',
					margin: '32px'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						mb: '32px'
					}}
				>
					{UserSlice?.user?.avatar ? (
						<ImageItem
							imgSrc={UserSlice?.user?.avatar}
							style={{
								width: { xs: '40px', md: '120px' },
								height: { xs: '40px', md: '120px' },
								borderRadius: '50%',
								objectFit: 'cover',
								cursor: 'pointer',
								'& img': {
									borderRadius: '4px'
								}
							}}
						/>
					) : (
						<Avatar
							{...stringAvatar(UserSlice?.user?.username || 'U', {
								width: 100,
								height: 100,
								fontSize: '32px'
							})}
						/>
					)}
					<Box
						sx={{
							marginLeft: '24px'
						}}
					>
						<Typography
							variant='h2'
							sx={{
								fontFamily: 'var(--font-family)',
								fontWeight: '600',
								fontSize: '24px'
							}}
						>
							Profile Picture
						</Typography>
						<Typography
							sx={{
								fontFamily: 'var(--font-family)',
								fontWeight: '400',
								fontSize: '12px',
								color: '#999999'
							}}
						>
							This setting will change your photo&apos;s profile
						</Typography>
						<BaseButton
							label='Upload New'
							styleSx={{
								marginTop: '16px',
								textTransform: 'none',
								fontFamily: 'var(--font-family)',
								background: '#02cbc5'
							}}
							variant='contained'
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						py: '32px',
						'& input': {
							fontFamily: 'var(--font-family)'
						}
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
							justifyContent: 'flex-start',
							alignItems: 'center'
						}}
					>
						<Box
							sx={{
								mr: '32px'
							}}
						>
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
									height: '60px',
									'& fieldset': {
										borderColor: '#02cbc5'
									},
									'& svg': {
										color: '#02cbc5'
									}
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
									height: '60px',
									'& fieldset': {
										borderColor: '#02cbc5'
									},
									'& svg': {
										color: '#02cbc5'
									}
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
			</Box>
			<Box
				sx={{
					textAlign: 'end',
					overflow: 'hidden'
				}}
			>
				<BaseButton
					label='Save Changes'
					variant='outlined'
					onClick={handleUpdateUserInfo}
					styleSx={{
						textTransform: 'none',
						fontFamily: 'var(--font-family)',
						fontWeight: '500',
						fontSize: '14px',
						borderRadius: '12px',
						padding: '12px 32px',
						margin: '32px',
						'&:hover': {
							background: '#02cbc5',
							color: '#fff',
							borderColor: '#02cbc5'
						}
					}}
				/>
			</Box>
		</Box>
	)
}

export default UserInfo

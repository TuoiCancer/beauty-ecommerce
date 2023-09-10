'use client'

import BaseButton from '@/components/base/BaseButton'
import { Box, Checkbox, TextField, Typography } from '@mui/material'
import Image from 'next/legacy/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import { poppins } from '@/assets/font'
import { validateSigninForm } from '@/helper/validate'
import { toast } from 'react-toastify'
import { useLogin } from '@/service/react-query/user.query'
import { useStore } from '@/store'

const LoginPage = () => {
	const router = useRouter()
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [rememberPassword, setRememberPassword] = React.useState(false)
	const [typeInputPassword, setTypeInputPassword] = React.useState(true)
	const { UserSlice } = useStore()

	const { isLoading, mutate: LoginFunc, isSuccess } = useLogin()
	if (UserSlice.isLoggedIn) {
		router.push('/user/home')
	}
	const handleLogin = () => {
		const err = validateSigninForm({ email, password })
		if (err?.msg) {
			toast.warning(err.msg)
			return
		}
		LoginFunc({ email, password, rememberPassword })
		UserSlice.setIsError(false)
	}

	React.useEffect(() => {
		if (isSuccess) {
			console.log('isSuccess ------------>', isSuccess)
			router.push('/user/home')
		}
	}, [isSuccess])

	return (
		<Box
			sx={{
				backgroundColor: 'var(--bg-login)',
				height: '100vh',
				position: 'relative'
			}}
		>
			<Box
				sx={{
					backgroundColor: 'var(--bg-login)',
					display: 'flex',
					width: { xs: '90%', sm: '500px', lg: 'auto' },
					margin: { xs: '0 auto', lg: 0 },
					paddingTop: { xs: '50%', sm: '20%', md: '32px' }
				}}
			>
				<Box
					sx={{
						flex: { xl: 1 },
						display: { xs: 'none', lg: 'block' }
					}}
				>
					{/* Logo Header */}
					<Box
						sx={{
							width: { md: '240px' },
							height: { md: '64px' },
							objectFit: 'contain',
							position: 'relative',
							mb: '52px',
							ml: { md: '68px' },
							mt: { md: '42px' }
						}}
					>
						<Image
							layout='fill'
							src='/img/logo/logoWeb.svg'
							alt='Picture of the author'
						/>
					</Box>
					<Box
						sx={{
							width: { md: '380px' },
							height: { md: '367px' },
							objectFit: 'contain',
							position: 'relative',
							mt: { md: '118px' },
							ml: { lg: '32px', xl: '190px' }
						}}
					>
						<Image
							layout='fill'
							src='/img/shapes.png'
							alt='Picture of the author'
						/>
					</Box>
					<Box
						sx={{
							backgroundColor: '#95BFB5',
							width: { md: '100%' },
							height: { md: '1px' }
						}}
					/>
				</Box>
				{/* Form Login */}
				<Box
					sx={{
						// flex: 1,
						background: ' #FFF',
						boxShadow: ' 12px 12px 24px -3px rgba(126, 126, 126, 0.22)',
						width: { xs: '100%', md: '545px', lg: '100%', xl: '560px' },
						// height: { md: '618px' },
						borderRadius: { xs: '8px', md: '40px' },
						marginTop: { md: '80px', xl: '170px' },
						padding: {
							xs: '24px 12px',
							md: '32px',
							lg: '56px 26px 32px 40px '
						},
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					{/* header  */}
					<Typography
						variant='h1'
						sx={{
							fontSize: { xs: '32px', md: '48px', lg: '52px' },
							fontWeight: '600',
							color: ' #004339',
							mb: { xs: '12px' }
						}}
					>
						Login
					</Typography>
					<Typography
						variant='h4'
						sx={{
							textAlign: 'center',
							fontSize: {
								xs: '14px',
								md: '16px',
								lg: '18px'
							},
							fontWeight: '400',
							color: ' #6D827F'
						}}
					>
						Natural cosmetic purity for every skin
					</Typography>
					<TextField
						type='email'
						variant='outlined'
						value={email}
						placeholder='Email'
						onChange={e => setEmail(e.target.value)}
						sx={{
							mt: { xs: '52px', md: '75px' },
							width: { xs: '100%' },
							height: { xs: '32px', md: '52px' },
							'& .MuiOutlinedInput-root': {
								borderRadius: '10px',
								background: '#F8F8F9',
								border: '1px solid #EBEBEB',
								input: {
									padding: { xs: '12px 18px', md: '16px 24px' },
									fontSize: { xs: '14px', md: '16px' }
								},
								fieldset: {
									border: 'none'
								}
							}
						}}
					/>
					{/* Inputs */}
					<Box
						sx={{
							position: 'relative',
							mt: '30px',
							width: { xs: '100%' },
							height: { md: '52px' }
						}}
					>
						<TextField
							type={typeInputPassword ? 'password' : 'text'}
							variant='outlined'
							value={password}
							placeholder='Password'
							onChange={e => setPassword(e.target.value)}
							sx={{
								width: { xs: '100%' },
								'& .MuiOutlinedInput-root': {
									borderRadius: '10px',
									background: '#F8F8F9',
									border: '1px solid #EBEBEB',
									input: {
										padding: { xs: '12px 18px', md: '16px 24px' },
										fontSize: { xs: '14px', md: '16px' }
									},
									fieldset: {
										border: 'none'
									}
								}
							}}
						/>
						<Typography
							variant='h6'
							sx={{
								position: 'absolute',
								top: '50%',
								transform: 'translateY(-50%)',
								right: '24px',
								color: '#9D9D9D',
								fontSize: { xs: '14px', md: '16px' },
								fontStyle: 'normal',
								fontWeight: 300,
								cursor: 'pointer',
								userSelect: 'none'
							}}
							onClick={() => {
								setTypeInputPassword(!typeInputPassword)
							}}
						>
							Hide
						</Typography>
					</Box>
					<Box
						sx={{
							width: { xs: '100%' },
							display: 'flex',
							alignItems: 'center',
							pb: '20px',
							pt: { xs: '12px', md: '24px' }
						}}
					>
						<Checkbox onClick={() => setRememberPassword(!rememberPassword)} />
						<Typography
							sx={{
								fontSize: { xs: '14px', md: '16px' }
							}}
						>
							Remember password
						</Typography>
					</Box>

					<BaseButton
						styleSx={{
							my: { xs: '32px', lg: '40px' },
							backgroundColor: '#2C8578',
							padding: '12px 80px',
							fontSize: { xs: '16px', md: '20px' },
							fontWeight: '500',
							borderRadius: ' 5px',
							'&:hover': { backgroundColor: '#2C8578', opacity: '0.9' }
						}}
						label='Login'
						variant='contained'
						bgStyle='color'
						type='button'
						onClick={handleLogin}
					/>
					<Box
						sx={{
							mt: { md: '32px' },
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: { md: '100%' }
						}}
					>
						<Typography
							className={poppins.className}
							sx={{
								fontSize: { xs: '12px', md: '15px' },
								color: '#000',
								fontWeight: '400',
								marginRight: '8px'
							}}
						>
							Don’t have an account ?
						</Typography>
						<Typography
							className={poppins.className}
							sx={{
								fontSize: { xs: '14px', md: '18px' },
								color: '#000',
								fontWeight: '600',
								cursor: 'pointer',
								transition: 'all 0.3s linear',
								'&:hover': {
									color: '#2C8578'
								}
							}}
							onClick={() => {
								router.push('/signup')
							}}
						>
							Request now
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						// flex: 1,
						display: { xs: 'none', lg: 'block' }
					}}
				>
					<Box
						sx={{
							width: { md: '440px', xl: '676px' },
							height: { md: '587px' },
							objectFit: 'cover',
							position: 'relative'
						}}
					>
						<Image
							layout='fill'
							src='/img/bg_login.png'
							alt='Picture of the author'
							priority
						/>
					</Box>

					<Box
						sx={{
							backgroundColor: '#95BFB5',
							width: { md: '100%' },
							height: { md: '1px' }
						}}
					/>
				</Box>
			</Box>
			<Typography
				variant='h6'
				sx={{
					color: '#3F3F3F',
					fontWeight: '500',
					fontSize: '14px',
					textAlign: 'center',
					whiteSpace: 'nowrap',
					bottom: '20px',
					position: 'absolute',
					left: '50%',
					transform: 'translate(-50%,-50%)'
				}}
			>
				Copyright by @xuantuoi 2023 | Privacy Policy
			</Typography>
		</Box>
	)
}

export default LoginPage

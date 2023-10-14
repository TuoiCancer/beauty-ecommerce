'use client'

import BaseButton from '@/components/base/BaseButton'
import FormInput from '@/components/login/FormInput'
import {
	Box,
	Button,
	FormControlLabel,
	Radio,
	RadioGroup,
	Step,
	StepLabel,
	Stepper
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/legacy/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { poppins } from '../../../public/font'
import WestIcon from '@mui/icons-material/West'
import { useSignup } from '@/service/react-query/user.query'
import { toast } from 'react-toastify'
import { validateSignupForm } from '@/helper/validate'
import Loading from '../loading'

const SignupPage = () => {
	const router = useRouter()
	const [username, setUsername] = React.useState('')
	const [role, setRole] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [email, setEmail] = React.useState('')
	const [phoneNumber, setPhoneNumber] = React.useState('')

	const steps = ['You are _______? ', 'Fill all information']
	const [activeStep, setActiveStep] = React.useState(0)

	const { isLoading, mutate: signupFn, isSuccess } = useSignup()

	useEffect(() => {
		if (isSuccess) {
			router.push('/user/home')
		}
	}, [isSuccess])

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const handleSignup = async () => {
		const error = validateSignupForm({
			fullname: username,
			password: password,
			email: email,
			phoneNumber: phoneNumber
		})
		if (error.msg) {
			toast.warning(error.msg, {
				position: 'top-center'
			})
			return
		}
		const infor = {
			role,
			username,
			password,
			email,
			phoneNumber
		}
		// alert('Sign up success');
		signupFn(infor)
		// router.push('/home')
	}

	if (isLoading) return <Loading />

	return (
		<Box
			sx={{
				backgroundColor: 'var(--bg-signup)',
				height: '100vh',
				padding: { xs: '0 24px 0 24px', lg: '42px 0 0 68px' },
				display: 'flex'
			}}
		>
			<Box
				sx={{
					flex: 1
				}}
			>
				{/* Logo header */}
				<Box
					sx={{
						width: { xs: '200px', sm: '240px' },
						height: { xs: '160px', sm: '160px' },
						objectFit: 'contain',
						position: 'relative',
						mb: { xs: '40px' }
					}}
				>
					<Image
						layout='fill'
						src='/img/logo/logoWeb.svg'
						alt='Picture of the author'
					/>
				</Box>
				{/* Text header */}
				<Box
					sx={{
						textAlign: { xs: 'center' }
					}}
				>
					<Typography
						variant='h1'
						sx={{
							color: '#fff',
							fontSize: { xs: '32px', sm: '46px', lg: '96px' },
							textTransform: 'uppercase',
							fontWeight: '800'
						}}
					>
						Welcome
					</Typography>
					<Typography
						variant='h2'
						sx={{
							color: '#FFF',
							fontSize: { xs: '18px', md: '32px' },
							fontStyle: 'normal',
							fontWeight: 400,
							mb: { xs: '32px', md: '64px' }
						}}
					>
						Create your account and get personalized care
					</Typography>
				</Box>
				{/* Form */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: { xs: 'center' },
						width: { md: '720px' }
					}}
				>
					<Stepper
						activeStep={activeStep}
						sx={{
							width: { md: '100%' },
							justifyContent: 'space-between',
							'& .MuiStepConnector-root': {
								display: 'none'
							}
						}}
					>
						{steps.map((label, index) => {
							const stepProps: { completed?: boolean } = {}
							const labelProps: {
								optional?: React.ReactNode
							} = {}
							return (
								<Step key={label} {...stepProps}>
									<StepLabel
										{...labelProps}
										sx={{
											'& .MuiStepLabel-label': {
												fontFamily: poppins,
												fontSize: { xs: '16px', md: '18px' },
												color: '#fff',
												'&.Mui-active': {
													color: '#fff'
												},
												'&.Mui-completed': {
													color: '#fff'
												}
											},
											'& svg': {
												color: '#A77A63 !important',
												'& text': {
													fill: '#fff !important'
												}
											}
										}}
									>
										{label}
									</StepLabel>
								</Step>
							)
						})}
					</Stepper>

					<React.Fragment>
						<Box
							sx={{
								pt: { md: '32px', lg: 0 },
								width: { xs: '100%' },
								'& .MuiFormControl-root': {
									width: { md: '320px' }
								}
							}}
						>
							{steps[activeStep] === 'You are _______? ' ? (
								<RadioGroup
									aria-labelledby='demo-radio-buttons-group-label'
									name='radio-buttons-group'
									sx={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
										justifyContent: 'flex-start',
										mb: { md: '60px' },
										mt: { xs: '12px' },
										'& .MuiFormControlLabel-root': {
											'& .MuiButtonBase-root': {
												color: '#fff'
											}
										}
									}}
									value={role}
								>
									<FormControlLabel
										onChange={() => {
											setRole('shop')
											handleNext()
										}}
										value='shop'
										control={<Radio />}
										label='Shop'
										sx={{
											color: '#fff',
											'& .MuiTypography-root': {
												fontSize: { xs: '16px', md: '20px' },
												fontWeight: '400'
											},
											'& .MuiRadio-root': {}
										}}
									/>
									<FormControlLabel
										onChange={() => {
											setRole('user')
											handleNext()
										}}
										value='user'
										control={<Radio />}
										label='Buyer'
										sx={{
											color: '#fff',
											'& .MuiTypography-root': {
												fontSize: { xs: '16px', md: '20px' },
												fontWeight: '400'
											}
										}}
									/>
								</RadioGroup>
							) : (
								<Box
									sx={{
										mt: '32px'
									}}
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											flexDirection: { xs: 'column', md: 'row' },
											width: { xs: '100%' }
										}}
									>
										<FormInput
											label='Fullname'
											type='text'
											typeOfVariant='outlined'
											placeholder='Xuan Tuoi'
											value={username}
											onChange={e => setUsername(e.target.value)}
										/>

										<FormInput
											label='Email'
											type='text'
											typeOfVariant='outlined'
											placeholder='xuantuoi@gmail.com'
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</Box>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											flexDirection: { xs: 'column', md: 'row' },
											width: { xs: '100%' },
											'& input': {
												width: { xs: '100%' }
											}
										}}
									>
										<FormInput
											label='Password'
											type='password'
											typeOfVariant='outlined'
											placeholder='********'
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>

										<FormInput
											label='Phone number'
											type='text'
											typeOfVariant='outlined'
											placeholder='(+84) 123 456 789'
											value={phoneNumber}
											onChange={e => setPhoneNumber(e.target.value)}
										/>
									</Box>

									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											margin: { xs: '32px 0 20px 0', md: '62px 0 20px 0' },
											alignItems: 'center',
											'& svg': {
												cursor: 'pointer',
												color: '#A77A63',
												fontSize: { xs: '24px', md: '32px' },
												transition: 'all 0.3s ease',
												'&:hover': {
													color: '#DD8D63',
													transform: 'translateX(-5px)'
												}
											}
										}}
									>
										<WestIcon onClick={handleBack} />
										<BaseButton
											label='Sign up'
											variant='contained'
											bgStyle='color'
											onClick={handleSignup}
											styleSx={{
												padding: { xs: '12px 24px', md: '12px 80px' },
												fontSize: { xs: '14px', md: '20px' },
												fontWeight: '500',
												borderRadius: ' 5px',
												background: '#DD8D63',
												marginRight: 'auto',
												marginLeft: 'auto',
												'&:hover': {
													background: '#e37c46'
												}
											}}
										/>
									</Box>
								</Box>
							)}
						</Box>
					</React.Fragment>

					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<Typography
								className={poppins.className}
								sx={{
									color: '#A77A63',
									fontSize: '15px',
									fontWeight: '400'
								}}
							>
								Already have an account?{' '}
							</Typography>
							<Button
								variant='text'
								sx={{
									color: '#A77A63',
									fontSize: '18px',
									textTransform: 'unset',
									fontWeight: 600,
									'&:hover': {
										background: 'unset',
										color: '#DD8D63'
									}
								}}
								onClick={() => router.push('/login')}
							>
								Log in
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					width: ' 100%',
					height: '100%',
					objectFit: 'contain',
					position: 'relative',
					flex: 1,
					display: { xs: 'none', md: 'block' }
				}}
			>
				<Image
					priority
					layout='fill'
					src='/img/bg_signup.jpg'
					alt='Picture of the author'
				/>
			</Box>
		</Box>
	)
}

export default SignupPage

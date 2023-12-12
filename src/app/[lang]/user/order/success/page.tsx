'use client'
import BaseButton from '@/components/base/BaseButton'
import ImageItem from '@/components/base/ImageItem'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/navigation'
import React from 'react'

const OrderSuccess = () => {
	const router = useRouter()

	const redirectToHome = () => {
		router.push('/user/home')
	}

	const redirectToOrders = () => {
		router.push('/user/order')
	}

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				maxWidth: {
					md: 'var(--max-width-md)',
					lg: 'var(--max-width-lg)',
					xl: 'var(--max-width-xl)'
				},
				margin: '0 auto',
				pb: '160px',
				pt: '120px'
			}}
		>
			<ImageItem
				imgSrc='/animations/order_success.gif'
				style={{
					width: '100%',
					maxWidth: '400px',
					height: '400px'
				}}
			/>
			<Typography
				variant='h1'
				sx={{
					fontSize: '48px',
					fontWeight: 700,
					my: '12px'
				}}
			>
				Thank you for your order!
			</Typography>
			<Typography
				variant='h2'
				sx={{
					fontSize: '20px',
					fontWeight: 400,
					mb: '36px',
					textAlign: 'center'
				}}
			>
				Your order has been confirmed. you will receive an email with the
				details of your order.
			</Typography>
			<Box>
				<BaseButton
					variant='contained'
					label='Back to Home'
					onClick={redirectToHome}
					styleSx={{
						mr: '24px',
						textTransform: 'none',
						fontSize: '16px',
						borderRadius: '8px',
						backgroundColor: '#2C5F23',
						'&:hover': {
							backgroundColor: '#2C5F23'
						}
					}}
				/>
				<BaseButton
					variant='outlined'
					label='View all orders'
					onClick={redirectToOrders}
					styleSx={{
						mr: '24px',
						textTransform: 'none',
						fontSize: '16px',
						borderRadius: '8px',
						borderColor: '#2C5F23',
						color: '#2C5F23',
						'&:hover': {
							backgroundColor: '#fff',
							borderColor: '#2C5F23'
						}
					}}
				/>
			</Box>
		</Box>
	)
}

export default OrderSuccess

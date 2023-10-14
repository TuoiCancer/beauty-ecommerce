'use client'
import OrderTable from '@/components/order/OrderTable'
import { useGetAllOrder } from '@/service/react-query/order.query'
import { useStore } from '@/store'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Loading from '../../loading'

const OrderPage = ({ dictionary }: any) => {
	const { UserSlice } = useStore()

	const {
		data: listOrder,
		isLoading,
		refetch
	} = useGetAllOrder({
		userId: UserSlice.user?.id
	})

	useEffect(() => {
		refetch()
	}, [])

	if (isLoading) return <Loading />

	return (
		<Box
			sx={{
				padding: '200px 0 200px 0',
				maxWidth: {
					xs: 'var(--max-width-xs)',
					sm: 'var(--max-width-sm)',
					md: 'var(--max-width-md)',
					lg: 'var(--max-width-lg)',
					xl: 'var(--max-width-xl)'
				},
				margin: '0 auto'
			}}
		>
			<Typography
				sx={{
					color: '#000',
					fontSize: { xs: '', md: '32px', lg: '38px' },
					fontWeight: '500',
					textAlign: 'center',
					mb: { xs: '20px', md: '40px' }
				}}
			>
				{dictionary.Order.title}
			</Typography>
			<OrderTable listOrder={listOrder.data} dictionary={dictionary} />
		</Box>
	)
}

export default OrderPage

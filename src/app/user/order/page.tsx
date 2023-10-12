'use client'
import Loading from '@/app/loading'
import OrderTable from '@/components/order/OrderTable'
import { useGetAllOrder } from '@/service/react-query/order.query'
import { useStore } from '@/store'
import { Box, Typography } from '@mui/material'
import React from 'react'

const OrderPage = () => {
	const { UserSlice } = useStore()

	const { data: listOrder, isLoading } = useGetAllOrder({
		userId: UserSlice.user?.id
	})
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
			<Typography>Orders</Typography>
			<OrderTable listOrder={listOrder.data} />
		</Box>
	)
}

export default OrderPage

'use client'
import dynamic from 'next/dynamic'
import {
	useCancelOrder,
	useGetAllOrder
} from '@/service/react-query/order.query'
import { useStore } from '@/store'
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const Loading = dynamic(() => import('../../loading'))
const OrderTable = dynamic(() => import('@/components/order/OrderTable'))

const OrderPage = ({ dictionary }: any) => {
	const [isRefetchFn, setIsRefetchFn] = React.useState(false)
	const { UserSlice } = useStore()

	const {
		data: listOrder,
		isLoading,
		refetch
	} = useGetAllOrder({
		userId: UserSlice.user?.id
	})

	const {
		isLoading: isCancelOrder,
		mutate: cancelOrder,
		isSuccess
	} = useCancelOrder()

	useEffect(() => {
		refetch()
	}, [])

	useEffect(() => {
		if (isSuccess) {
			refetch()
			// setIsRefetchFn(false)
		}
	}, [isSuccess])

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
			<OrderTable
				listOrder={listOrder.data}
				dictionary={dictionary}
				cancelOrder={cancelOrder}
			/>
		</Box>
	)
}

export default OrderPage

'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useGetAllShopOrder } from '@/service/react-query/order.query'
import { useStore } from '@/store'
import Loading from '../../loading'

const OrderTableAdmin = dynamic(
	() => import('@/components/order/admin/OrderComponent.table')
)

const OrdersPage = () => {
	const { UserSlice } = useStore()

	const { isLoading, data: listOrder } = useGetAllShopOrder({
		shopId: UserSlice?.user?.id
	})

	console.log('listOrder', listOrder)

	if (isLoading) {
		return <Loading />
	}
	return <OrderTableAdmin listOrder={listOrder?.data || []} />
}

export default OrdersPage

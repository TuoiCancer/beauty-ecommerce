'use client'
import React from 'react'

import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { formatCurrencyV2, getListDate } from '@/helper'

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const OrderAnalytics = ({ orderAnalyticData, toDate, fromDate }: any) => {
	const listDate = getListDate(fromDate, toDate)
	const colorPalette = ['#E3631B', '#FDB140', '#E3631B', '#319E48', '#ACACAC']

	const listOrderPendingByDay =
		Object.values(orderAnalyticData?.listOrderPendingByDay || {}) || []
	const listOrderPackagedByDay =
		Object.values(orderAnalyticData?.listOrderPackagedByDay || {}) || []

	const listOrderShippingByDay =
		Object.values(orderAnalyticData?.listOrderShippingByDay || {}) || []
	const listOrderDeliveredByDay =
		Object.values(orderAnalyticData?.listOrderDeliveredByDay || {}) || []
	const listOrderCancelByDay =
		Object.values(orderAnalyticData?.listOrderCancelByDay || {}) || []

	const series = [
		{
			name: 'Order Pending',
			data: listOrderPendingByDay
		},
		{
			name: 'Order Packaged',
			data: listOrderPackagedByDay
		},
		{
			name: 'Order Shipping',
			data: listOrderShippingByDay
		},
		{
			name: 'Order Delivered',
			data: listOrderDeliveredByDay
		},
		{
			name: 'Order Cancel',
			data: listOrderCancelByDay
		}
	]

	const optionsLine = {
		type: 'line',
		chart: {
			height: 340,
			type: 'line',
			zoom: {
				enabled: false
			}
		},
		plotOptions: {
			stroke: {
				width: 0,
				curve: 'smooth'
			}
		},
		colors: colorPalette,
		stroke: {
			curve: 'smooth'
		},
		xaxis: {
			categories: listDate
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right'
		}
	}

	return (
		<Box
			sx={{
				width: '100%',
				borderRadius: '12px',
				border: ' 1px solid var(--Border, #E6EDFF)',
				background: '#FFF',
				padding: '32px 24px',
				margin: '40px 0'
			}}
		>
			<Typography
				variant='h5'
				sx={{
					color: '#000',
					fontSize: '18px',
					fontWeight: '500',
					fontFamily: 'Poppins'
				}}
			>
				Order Analytics
			</Typography>
			<ApexChart
				type='line'
				options={optionsLine}
				series={series}
				height={360}
				width={'100%'}
			/>
		</Box>
	)
}

export default OrderAnalytics

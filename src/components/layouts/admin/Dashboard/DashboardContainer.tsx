'use client'

import dynamic from 'next/dynamic'



import {
	useGetDashboardOrverview,
	useGetOrderAnalytics,
	useGetTop5Product,
	useGetUserByCountry
} from '@/service/react-query/dashboard.query'
import { useStore } from '@/store'
import { Box } from '@mui/material'
import { DateRange } from '@mui/x-date-pickers-pro'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect } from 'react'

//lazy load
const Loading = dynamic(() => import('@/app/[lang]/loading'))
const DashboardHeader = dynamic(() => import('../header/DashboardHeader'))
const BestSeller = dynamic(() => import('./BestSeller'))
const OrderAnalytics = dynamic(() => import('./OrderAnalytics'))
const OverviewContainer = dynamic(() => import('./OverviewContainer'))
const PieChart = dynamic(() => import('./PieChart'))
const RevenueOverview = dynamic(() => import('./RevenueOverview'))

const DashboardContainer = ({ dictionary }: { [key: string]: any }) => {
	const today = dayjs()
	const sevenDayAgo = today.subtract(7, 'day')
	const nextSevenDay = today.add(7, 'day')
	const [value, setValue] = React.useState<DateRange<Dayjs>>([
		sevenDayAgo,
		today
	])

	const { UserSlice } = useStore()

	const { data: dashboardOverviewData, isLoading: isGettingDashboardOverview } =
		useGetDashboardOrverview({
			from: value[0]?.format('YYYY-MM-DD') || '',
			to: value[1]?.format('YYYY-MM-DD') || '',
			userId: UserSlice.user?.id
		})

	const { data: orderAnalyticData, isLoading: isGettingOrderAnalytic } =
		useGetOrderAnalytics({
			from: value[0]?.format('YYYY-MM-DD') || '',
			to: value[1]?.format('YYYY-MM-DD') || '',
			userId: UserSlice.user?.id
		})

	const { data: listBestSeller, isLoading: isGettingListBestSeller } =
		useGetTop5Product({
			userId: UserSlice.user?.id,
			from: value[0]?.format('YYYY-MM-DD') || '',
			to: value[1]?.format('YYYY-MM-DD') || ''
		})

	const { data: listUserByCountry, isLoading: isGettingUserByCountry } =
		useGetUserByCountry({
			userId: UserSlice.user?.id,
			from: value[0]?.format('YYYY-MM-DD') || '',
			to: value[1]?.format('YYYY-MM-DD') || ''
		})

	if (
		isGettingDashboardOverview ||
		isGettingOrderAnalytic ||
		isGettingListBestSeller ||
		isGettingUserByCountry
	)
		return <Loading />
	return (
		<Box
			sx={{
				margin: { xs: '0 12px', lg: '0 24px', xl: '0 auto' },
				background: '#F8F8F8',
				pb: '32px',
				maxWidth: {
					xs: '100%',
					xl: 'var(--max-width-xl)'
				}
			}}
		>
			<DashboardHeader value={value} setValue={setValue} />

			<OverviewContainer dashboardOverviewData={dashboardOverviewData} />

			<RevenueOverview
				dashboardOverviewData={dashboardOverviewData}
				fromDate={value[0]?.format('YYYY-MM-DD') || ''}
				toDate={value[1]?.format('YYYY-MM-DD') || ''}
			/>
			<OrderAnalytics
				orderAnalyticData={orderAnalyticData}
				fromDate={value[0]?.format('YYYY-MM-DD') || ''}
				toDate={value[1]?.format('YYYY-MM-DD') || ''}
			/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					flexWrap: 'wrap'
				}}
			>
				<BestSeller listBestSeller={listBestSeller} />
				<PieChart listUserByCountry={listUserByCountry} />
			</Box>
		</Box>
	)
}

export default DashboardContainer

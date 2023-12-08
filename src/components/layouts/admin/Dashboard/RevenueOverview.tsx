'use client'
import { Box, Typography } from '@mui/material'
import React from 'react'

import dynamic from 'next/dynamic'
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

import { formatCurrencyV2, getListDate } from '@/helper'

const RevenueOverview = ({ dashboardOverviewData, toDate, fromDate }: any) => {
	const listDate = getListDate(fromDate, toDate)
	const listRevenue =
		Object.values(dashboardOverviewData?.listRevenueByDay || {}).map(item =>
			formatCurrencyV2(item, '')
		) || []

	const option = {
		chart: {
			id: 'Revenue Overview'
		},
		xaxis: {
			categories: listDate
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.5,
				opacityTo: 0.9,
				stops: [0, 80, 95]
			}
		},
		toolbar: {
			show: false
		},
		colors: ['#1F76CB'],
		dataLabels: {
			enabled: false
		}
	}

	const series = [
		{
			name: 'Revenue',
			data: listRevenue
		}
	]

	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: 'white',
				borderRadius: '16px',
				boxShadow: '0px 8px 32px 0px rgba(51, 38, 174, 0.08)',
				padding: '32px 24px'
			}}
		>
			<Typography
				variant='h5'
				sx={{
					color: ' #000',
					fontFamily: 'Poppins',
					fontSize: '18px',
					fontWeight: '500',
					lineHeight: '150%' /* 27px */,
					marginBottom: '52px'
				}}
			>
				Revenue Overview
			</Typography>
			<ApexChart
				type='area'
				options={option}
				series={series}
				height={360}
				width={'100%'}
			/>
		</Box>
	)
}

export default RevenueOverview

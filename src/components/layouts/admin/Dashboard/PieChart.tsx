'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'
import { upperCaseWord } from '@/helper/format'
import { formatCurrencyV2 } from '@/helper'
import { ApexOptions } from 'apexcharts'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const PieChart = ({ listUserByCountry }: any) => {
	const colorPalette = ['#FF8901', '#00C3F8', '#2F80ED', '#FF392B']
	const listLabel = listUserByCountry?.map((item: any) => {
		return `${upperCaseWord(item.country)} - ${formatCurrencyV2(
			item.total_price
		)} - ${item.percent}%`
	})

	const options: ApexOptions = {
		chart: {
			width: '100%',
			height: 900
		},
		dataLabels: {
			enabled: false
		},
		plotOptions: {
			pie: {
				customScale: 0.8,
				donut: {
					size: '60%'
				},
				offsetY: 20
			}
		},
		colors: colorPalette,
		labels: listLabel,
		legend: {
			position: 'right',
			offsetY: 20
		}
	}

	const series = [44, 55, 41, 17]

	return (
		<Box
			sx={{
				width: '100%',
				borderRadius: '12px',
				border: ' 1px solid var(--Border, #E6EDFF)',
				background: '#FFF',
				padding: '32px 24px',
				flex: 1,
				margin: { md: '32px 0', lg: 0 }
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
				User by Country
			</Typography>
			<Chart
				type='donut'
				options={options}
				series={series}
				height={200}
				width={500}
			/>
		</Box>
	)
}

export default PieChart

import { formatCurrencyV2 } from '@/helper'
import { Box } from '@mui/material'
import React from 'react'
import OverviewItem from './OverviewItem'

interface Props {
	totalProduct: number
	listRevenueByDay: any[]
	totalRevenueByDay: number
	totalRefundByDay: number
	listLatestOrder: any[]
}

const OverviewContainer = ({
	dashboardOverviewData
}: {
	dashboardOverviewData: Props
}) => {
	return (
		<Box
			sx={{
				mb: '52px',
				padding: '26px',
				borderRadius: '12px',
				border: '1px solid var(--Border, #E6EDFF)',
				background: '#FFF',
				display: 'flex',
				justifyContent: 'space-between',
				maxWidth: '1200px'
			}}
		>
			<OverviewItem
				title='Total Revenue'
				value={formatCurrencyV2(dashboardOverviewData?.totalRevenueByDay) || 0}
				imgUrl='/img/check.png'
				sx={{
					borderRight: '1px solid #E6EDFF'
				}}
			/>
			<OverviewItem
				title='Total products'
				value={dashboardOverviewData?.totalProduct || 0}
				imgUrl='/img/shape.png'
				sx={{
					borderRight: '1px solid #E6EDFF'
				}}
			/>
			<OverviewItem
				title='Total users'
				value='1,000'
				imgUrl='/img/users.png'
				sx={{
					borderRight: '1px solid #E6EDFF'
				}}
			/>
			<OverviewItem
				title='Canceled orders'
				value={
					formatCurrencyV2(dashboardOverviewData?.totalRefundByDay, ',') || 0
				}
				imgUrl='/img/arrow-right.png'
			/>
		</Box>
	)
}

export default OverviewContainer

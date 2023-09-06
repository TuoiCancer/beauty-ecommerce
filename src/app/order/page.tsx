import OrderTable from '@/components/order/OrderTable'
import { Box, Typography } from '@mui/material'
import React from 'react'

const OrderPage = () => {
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
			<OrderTable />
		</Box>
	)
}

export default OrderPage

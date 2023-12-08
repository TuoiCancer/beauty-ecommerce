import { Suspense } from 'react'

const OrdersPage = () => {
	return (
		<Suspense fallback={<p>Loading feed...</p>}>
			<div>Orders</div>
		</Suspense>
	)
}

export default OrdersPage

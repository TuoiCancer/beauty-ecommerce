import { Metadata } from 'next'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

import { Suspense } from 'react'
import Loading from './loading'
import QueryClientProviderComponent from '@/components/base/QueryClientProviderComp'
import ScrollToTop from '@/components/base/ScrollToTop'
import ShowErr from '@/components/base/ShowErr'
import HandleRoute from '@/components/base/HandleRoute'

export const metadata: Metadata = {
	title: 'Glow & Grace',
	description: 'Beauty Ecommerce',
	keywords: ['Glow & Grace', 'Beauty Ecommerce']
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<QueryClientProviderComponent>
					<Suspense fallback={<Loading />}>
						<HandleRoute />
						<ScrollToTop />
						{children}
						<ShowErr />
					</Suspense>
				</QueryClientProviderComponent>
			</body>
		</html>
	)
}

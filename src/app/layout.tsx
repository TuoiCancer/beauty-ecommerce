import { Metadata } from 'next'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

import { ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import Loading from './loading'
import ScrollToTop from '@/components/base/ScrollToTop'
import QueryClientProviderComponent from '@/components/base/QueryClientProviderComp'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

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
						<Header
							isHaveShadow={true}
							isHaveBg={true}
							textColor='#000'
							style={{
								left: 0,
								right: 0,
								zIndex: 999
							}}
						/>
						<ScrollToTop />
						{children}
						<Footer />
						<ToastContainer />
					</Suspense>
				</QueryClientProviderComponent>
			</body>
		</html>
	)
}

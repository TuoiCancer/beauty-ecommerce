'use client'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/service/react-query/client'
import ScrollToTop from '@/components/base/ScrollToTop'

export default function HomeLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<QueryClientProvider client={queryClient}>
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
			</QueryClientProvider>
		</>
	)
}

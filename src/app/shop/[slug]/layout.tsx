'use client'
import { motion } from 'framer-motion'

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
					isHaveShadow={false}
					isHaveBg={false}
					textColor='#fff'
					style={{
						position: 'absolute',
						top: { xs: 0, lg: '40px' },
						left: 0,
						right: 0,
						zIndex: 999
					}}
				/>
				<ScrollToTop />
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						type: 'spring',
						stiffness: 260,
						damping: 20
					}}
				>
					{children}
				</motion.div>
				<Footer />
			</QueryClientProvider>
		</>
	)
}

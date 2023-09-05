'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/service/react-query/client'

export default function HomeLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</section>
	)
}

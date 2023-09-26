'use client'
import React, { useEffect } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/service/react-query/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const QueryClientProviderComponent = ({
	children
}: {
	children: React.ReactNode
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default QueryClientProviderComponent

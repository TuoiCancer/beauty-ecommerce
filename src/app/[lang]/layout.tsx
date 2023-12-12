import { Metadata } from 'next'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

import { Suspense } from 'react'
import QueryClientProviderComponent from '@/components/base/QueryClientProviderComp'
import ScrollToTop from '@/components/base/ScrollToTop'
import ShowErr from '@/components/base/ShowErr'
import HandleRoute from '@/components/base/HandleRoute'
import Loading from './loading'
import { i18n } from '../../../i18n-config'
import { NextAuthProvider } from '@/config/provider'

export const metadata: Metadata = {
	title: 'Glow & Grace',
	description: 'Beauty Ecommerce',
	keywords: ['Glow & Grace', 'Beauty Ecommerce']
}

export async function generateStaticParams() {
	return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: { lang: string }
}) {
	return (
		<html lang={params.lang}>
			<body>
				<NextAuthProvider>
					<Suspense fallback={<Loading />}>
						<QueryClientProviderComponent>
							<HandleRoute>{children}</HandleRoute>
							<ScrollToTop />
							<ShowErr />
						</QueryClientProviderComponent>
					</Suspense>
				</NextAuthProvider>
			</body>
		</html>
	)
}

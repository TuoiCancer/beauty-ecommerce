import { getDictionary } from '../../../../get-dictionary'
import { Locale } from '../../../../i18n-config'
import RootAdminLayout from '@/components/layouts/admin/RootAdminLayout'
import { Suspense } from 'react'
import Loading from '../loading'

export default async function RootLayout({
	children,
	params: { lang }
}: {
	children: React.ReactNode
	params: { lang: Locale }
}) {
	const dictionary = await getDictionary(lang)
	return (
		<>
			<Suspense fallback={<Loading />}>
				<RootAdminLayout dictionary={dictionary}>{children}</RootAdminLayout>
			</Suspense>
		</>
	)
}

import { getDictionary } from '../../../../get-dictionary'
import { Locale } from '../../../../i18n-config'
import RootAdminLayout from '@/components/layouts/admin/RootAdminLayout'
import { Suspense } from 'react'
import Loading from '../loading'
import LoadingAdmin from './loading'

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
			<RootAdminLayout dictionary={dictionary}>{children}</RootAdminLayout>
		</>
	)
}

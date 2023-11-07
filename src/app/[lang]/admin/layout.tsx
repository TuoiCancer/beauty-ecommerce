import CheckLogin from '@/components/base/CheckLogin'
import { getDictionary } from '../../../../get-dictionary'
import { Locale } from '../../../../i18n-config'
import RootAdminLayout from '@/components/layouts/admin/RootAdminLayout'

export default async function RootLayout({
	children,
	params: { lang }
}: {
	children: React.ReactNode,
	params: { lang: Locale }
}) {
	const dictionary = await getDictionary(lang);
	return (
		<>
			<CheckLogin>
				<RootAdminLayout>
					{children}
				</RootAdminLayout>
			</CheckLogin>
		</>
	)
}

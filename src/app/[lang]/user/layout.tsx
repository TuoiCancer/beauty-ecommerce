import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Locale } from '../../../../i18n-config'
import { getDictionary } from '../../../../get-dictionary'
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
		<Suspense fallback={<Loading />}>
			<Header
				dictionary={dictionary}
				isHaveShadow={true}
				isHaveBg={true}
				textColor='#000'
				style={{
					left: 0,
					right: 0,
					zIndex: 6
				}}
			/>
			{children}
			<Footer dictionary={dictionary} />
		</Suspense>
	)
}

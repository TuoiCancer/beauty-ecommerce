import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Locale } from '../../../../i18n-config'
import { getDictionary } from '../../../../get-dictionary'

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
			{/* <HandleRoute /> */}
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
		</>
	)
}

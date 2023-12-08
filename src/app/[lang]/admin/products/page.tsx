import AdminProductPage from './AdminProductPage'
import { Locale } from '../../../../../i18n-config'
import { getDictionary } from '../../../../../get-dictionary'
import { Suspense } from 'react'
import Loading from '../../loading'

const Page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)

	return (
		<Suspense fallback={<Loading />}>
			<AdminProductPage dictionary={dictionary} lang={lang} />;
		</Suspense>
	)
}

export default Page

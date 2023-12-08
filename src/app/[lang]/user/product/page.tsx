import React, { Suspense } from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'
import Loading from '../../loading'
import LoadingProduct from './loading'
import ProductPage from './ProductPage'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)

	return (
		<Suspense fallback={<Loading />}>
			<ProductPage dictionary={dictionary} lang={lang} />
		</Suspense>
	)
}

export default page

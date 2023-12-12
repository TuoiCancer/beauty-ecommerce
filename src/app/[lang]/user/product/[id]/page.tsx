import React, { Suspense } from 'react'
import { getDictionary } from '../../../../../../get-dictionary'
import { Locale } from '../../../../../../i18n-config'
import LoadingProduct from '../loading'
import LoadingProductId from './loading'
import ProductDetail from './ProductDetail'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)
	return (
		<Suspense fallback={<LoadingProductId />}>
			<ProductDetail dictionary={dictionary} lang={lang} />
		</Suspense>
	)
}

export default page

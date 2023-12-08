import React, { Suspense } from 'react'
import { getDictionary } from '../../../../../../get-dictionary'
import { Locale } from '../../../../../../i18n-config'
import LoadingShop from './loading'
import ShopPageDetail from './ShopPageDetail'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)

	return (
		<Suspense fallback={<LoadingShop />}>
			<ShopPageDetail dictionary={dictionary} lang={lang} />
		</Suspense>
	)
}

export default page

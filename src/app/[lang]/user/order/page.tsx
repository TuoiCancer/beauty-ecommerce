import React, { Suspense } from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'
import LoadingOrder from './loading'
import OrderPage from './OrderPage'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)
	return (
		<Suspense fallback={<LoadingOrder />}>
			<OrderPage dictionary={dictionary} />
		</Suspense>
	)
}

export default page

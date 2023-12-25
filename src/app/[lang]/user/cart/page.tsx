import React, { Suspense } from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'
import CartPage from './CartPage'
import LoadingCart from './loading'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)
	return <CartPage dictionary={dictionary} />
}

export default page

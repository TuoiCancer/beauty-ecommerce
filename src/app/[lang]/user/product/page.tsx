import React from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'
import ProductPage from './ProductPage'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)
	return <ProductPage dictionary={dictionary} />
}

export default page

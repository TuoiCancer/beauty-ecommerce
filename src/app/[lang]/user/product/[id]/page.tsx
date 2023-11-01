import React from 'react'
import { getDictionary } from '../../../../../../get-dictionary'
import { Locale } from '../../../../../../i18n-config'
import ProductDetail from './ProductDetail'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)
	return <ProductDetail dictionary={dictionary} lang={lang} />
}

export default page

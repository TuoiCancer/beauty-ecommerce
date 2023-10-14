import React from 'react'
import { getDictionary } from '../../../../../../get-dictionary'
import { Locale } from '../../../../../../i18n-config'
import ShopPageDetail from './ShopPageDetail'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)
	return <ShopPageDetail dictionary={dictionary} />
}

export default page

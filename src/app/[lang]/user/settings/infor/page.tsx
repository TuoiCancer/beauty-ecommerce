import React from 'react'
import { getDictionary } from '../../../../../../get-dictionary'
import { Locale } from '../../../../../../i18n-config'
import Information from './Information'

const page = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang)
	return <Information dictionary={dictionary} />
}

export default page

import { Box } from '@mui/system'
import React, { Suspense } from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'
import Home from './HomePage'
import LoadingHome from './loading'

const HomeComponent = async ({
	params: { lang }
}: {
	params: { lang: Locale }
}) => {
	const dictionary = await getDictionary(lang)

	return (
		<Suspense fallback={<LoadingHome />}>
			<Home dictionary={dictionary} lang={lang} />
		</Suspense>
	)
}

export default HomeComponent

import { Box } from '@mui/system'
import React from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'
import Home from './HomePage'

const HomeComponent = async ({
	params: { lang }
}: {
	params: { lang: Locale }
}) => {
	const dictionary = await getDictionary(lang)

	return (
		<Box>
			<Home dictionary={dictionary} lang={lang} />
		</Box>
	)
}

export default HomeComponent

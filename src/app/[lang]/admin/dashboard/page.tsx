import DashboardContainer from '@/components/layouts/admin/Dashboard/DashboardContainer'
import React, { Suspense } from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'
import Loading from '../../loading'

const DashboardPage = async ({
	params: { lang }
}: {
	params: { lang: Locale }
}) => {
	const dictionary = await getDictionary(lang)
	return (
		<Suspense fallback={<Loading />}>
			<DashboardContainer dictionary={dictionary} />
		</Suspense>
	)
}

export default DashboardPage

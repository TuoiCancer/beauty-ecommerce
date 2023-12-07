import DashboardContainer from '@/components/layouts/admin/Dashboard/DashboardContainer'
import React from 'react'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'

const DashboardPage = async ({
	children,
	params: { lang }
}: {
	children: React.ReactNode
	params: { lang: Locale }
}) => {
	const dictionary = await getDictionary(lang)
	return (
		<DashboardContainer dictionary={dictionary}>{children}</DashboardContainer>
	)
}

export default DashboardPage

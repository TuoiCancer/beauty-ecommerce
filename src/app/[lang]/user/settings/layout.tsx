import SidebarSetting from '@/components/settings/Sidebar'
import { Box } from '@mui/material'
import { getDictionary } from '../../../../../get-dictionary'
import { Locale } from '../../../../../i18n-config'

export default async function RootLayout({
	children,
	params: { lang }
}: {
	children: React.ReactNode
	params: { lang: Locale }
}) {
	const dictionary = await getDictionary(lang)
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' }
			}}
		>
			<SidebarSetting dictionary={dictionary} lang={lang} />
			{children}
		</Box>
	)
}

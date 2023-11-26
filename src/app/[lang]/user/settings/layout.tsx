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
				pb: { md: '180px' },
				pt: { md: '240px' },
				maxWidth: {
					xs: '100%',
					sm: 'var(--max-width-sm)',
					md: 'var(--max-width-md)',
					lg: 'var(--max-width-lg)',
					xl: 'var(--max-width-xl)'
				},
				margin: { xs: '0 12px', sm: '0 auto' },
				display: 'grid',
				gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' }
			}}
		>
			<SidebarSetting dictionary={dictionary} lang={lang} />
			{children}
		</Box>
	)
}

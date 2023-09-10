import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header
				isHaveShadow={true}
				isHaveBg={true}
				textColor='#000'
				style={{
					left: 0,
					right: 0,
					zIndex: 6
				}}
			/>
			{children}
			<Footer />
		</>
	)
}

import { montserrat } from '@/assets/font'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import ImageItem from '../base/ImageItem'

const HeaderItem = ({ item, sx, textColor, isPathNameMatch }: any) => {
	const [openSubItem, setOpenSubItem] = React.useState(false)

	const handleClickOpenSubItem = () => {
		setOpenSubItem(true)
	}

	const handleCloseSubItem = (value: string) => {
		setOpenSubItem(false)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				marginRight: { xs: '0', md: '24px', lg: '64px' },
				cursor: 'pointer',
				position: 'relative',
				mb: { xs: '20px', md: 0 },
				'& a, p': {
					textDecoration: 'none',
					fontSize: { xs: '16px', md: '20px' },
					fontWeight: 400,
					textTransform: 'capitalize',
					userSelect: 'none'
				},
				'&::after': {
					content: '""',
					position: 'absolute',
					bottom: '-5px',
					left: '0',
					width: '0',
					height: '2px',
					backgroundColor: '#A2C18A',
					transition: 'all 0.3s ease'
				},
				'&:hover::after': {
					width: '100%'
				},
				...sx
			}}
			onClick={() => {
				setOpenSubItem(!openSubItem)
			}}
		>
			<Box
				sx={{
					'& a': {
						color: { xs: '#000', md: isPathNameMatch ? '#A2C18A' : textColor }
					}
				}}
			>
				{item.link ? (
					<Link
						href={item.link}
						style={{
							fontWeight: isPathNameMatch ? 600 : 400
						}}
					>
						{item?.name}
					</Link>
				) : (
					<Typography className={montserrat.className}>{item?.name}</Typography>
				)}
			</Box>

			{item.isHaveSubItem &&
				(textColor === '#000' ? (
					<ImageItem
						imgSrc='/img/down_000.png'
						style={{
							'margin-left': '12px',
							width: '20px',
							height: '16px'
						}}
					/>
				) : (
					<ImageItem
						imgSrc='/img/down_fff.png'
						style={{
							'margin-left': '12px',
							width: '18px',
							height: '10px'
						}}
					/>
				))}
			{item.isHaveSubItem && (
				<Box
					sx={{
						display: openSubItem ? 'block' : 'none',
						borderRadius: '8px',
						background: '#FFF',
						boxShadow: '0px 4px 20px 0px rgba(166, 166, 166, 0.25)',
						padding: { xs: '24px 12px', md: '14px 40px 0 30px' },
						position: 'absolute',
						top: '130%',
						left: { xs: '-100%' },
						zIndex: 4
					}}
				>
					{item.subItem.map((sub: any, index: number) => {
						return (
							<Box
								onClick={() => setOpenSubItem(false)}
								key={index}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									'& a': {
										textDecoration: 'none',
										color: '#000',
										fontSize: '18px',
										fontWeight: 400,
										textTransform: 'capitalize',
										pb: '15px',
										whiteSpace: 'nowrap',
										'&:hover': {
											color: '#2C5A09'
										}
									}
								}}
							>
								<Link
									href={sub.sub_link}
									style={{
										fontWeight: 500
									}}
								>
									{sub.sub_name}
								</Link>
							</Box>
						)
					})}
				</Box>
			)}
		</Box>
	)
}

export default HeaderItem

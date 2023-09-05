import { Box, MenuItem, Select, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import ImageItem from '../base/ImageItem'

const CartHeader = ({
	textColor,
	language,
	handleChange
}: {
	textColor: string
	language: string
	handleChange: (event: any) => void
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: { xs: 'flex-start', md: 'center' },
				flexDirection: { xs: 'column', md: 'row' }
			}}
		>
			<Select
				id='select language'
				value={language}
				onChange={handleChange}
				sx={{
					// mr: { md: '20px' },
					color: { xs: '#000', md: textColor },
					'& fieldset': {
						border: 'none'
					},
					'& svg': {
						color: { xs: '#000', md: textColor }
					},
					'& .MuiSelect-select': {
						p: { xs: '0' }
					}
				}}
			>
				<MenuItem value={'en'}>Eng</MenuItem>
				<MenuItem value={'vn'}>Viet Nam</MenuItem>
				<MenuItem value={'ko'}>Korean</MenuItem>
			</Select>

			<Box
				sx={{
					position: 'relative',
					mt: { xs: '24px', md: '0' }
				}}
			>
				<Box
					sx={{
						zIndex: 3,
						cursor: 'pointer',
						position: 'absolute',
						right: { xs: '-100%', md: '-50% ', xl: '-50%' },
						top: { xs: '-50%', md: '-32%', lg: '-30%' }
					}}
				>
					<Box
						sx={{
							backgroundColor: '#9E5F00',
							width: { xs: '24px', md: '28px' },
							height: { xs: '24px', md: '28px' },
							borderRadius: '50%',
							textAlign: 'center'
						}}
					>
						<Typography
							sx={{
								color: '#fff',
								fontSize: { xs: '12px', md: '16px' },
								fontWeight: 600,
								lineHeight: { xs: '24px', md: '28px' }
							}}
						>
							{2}
						</Typography>
					</Box>
				</Box>
				<Link href='/cart'>
					{textColor === '#000' ? (
						<ImageItem
							imgSrc='/img/Cart_000.png'
							style={{
								width: { xs: '26px', md: '39px' },
								height: { xs: '26px', md: '35px' }
							}}
						/>
					) : (
						<ImageItem
							imgSrc='/img/Cart_fff.png'
							style={{
								width: { xs: '26px', md: '39px' },
								height: { xs: '26px', md: '35px' }
							}}
						/>
					)}
				</Link>
			</Box>
		</Box>
	)
}

export default CartHeader

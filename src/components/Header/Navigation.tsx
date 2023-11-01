import * as React from 'react'
import { motion } from 'framer-motion'
import { MenuItem } from './MenuItem'
import { Box } from '@mui/material'
import HeaderItem from './HeaderItem'
import CartHeader from './CartHeader'

const variants = {
	open: {
		transition: {
			staggerChildren: 0.07,
			delayChildren: 0.2
		},
		opacity: 1
	},
	closed: {
		transition: {
			staggerChildren: 0.05,
			staggerDirection: -1
		},
		opacity: 0
	}
}
const itemIds = [0, 1, 2, 3, 4]

export const Navigation = ({
	textColor,
	dictionary,
	language,
	listMenu,
	handleChange,
	openPoper,
	setOpenPoper
}: any) => (
	<Box
		sx={{
			'& ul': {
				position: 'absolute',
				top: '100%',
				right: '3%',
				backgroundColor: 'white',
				padding: '1rem 30px',
				borderRadius: '8px',
				boxShadow: '0px 18px 36px 0px rgba(200, 200, 200, 0.25)',
				// minWidth: '200px',
				'& li': {
					listStyle: 'none'
				}
			}
		}}
	>
		<motion.ul variants={variants}>
			{listMenu.map((item: any) => {
				return (
					<MenuItem
						key={item.id}
						item={item}
						textColor={textColor}
						dictionary={dictionary}
						language={language}
					/>
				)
			})}
			<CartHeader
				textColor={textColor}
				handleChange={handleChange}
				language={language}
				openPoper={openPoper}
				setOpenPoper={setOpenPoper}
				dictionary={dictionary}
			/>
		</motion.ul>
	</Box>
)

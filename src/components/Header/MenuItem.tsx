import * as React from 'react'
import { motion } from 'framer-motion'
import HeaderItem from './HeaderItem'

const variants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100 }
		}
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000 }
		}
	}
}

export const MenuItem = ({ item, textColor, dictionary, language }: any) => {
	return (
		<motion.li
			variants={variants}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.95 }}
		>
			<HeaderItem
				key={item.id}
				item={item}
				textColor={textColor}
				dictionary={dictionary}
				language={language}
			/>
		</motion.li>
	)
}

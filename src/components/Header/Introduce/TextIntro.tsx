import React from 'react'
import { motion } from 'framer-motion'

const textIntroVariants = {
	hidden: { opacity: 0, x: -100 },
	visible: {
		opacity: 1,
		x: 0
	}
}

const TextIntro = () => {
	return (
		<motion.div
			className='box'
			variants={textIntroVariants}
			initial='hidden'
			whileInView='visible'
			transition={{ type: 'spring' }}
		>
			We make your daily routine more sustainable with products
		</motion.div>
	)
}

export default TextIntro

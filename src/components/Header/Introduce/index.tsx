import * as React from 'react'
import { motion } from 'framer-motion'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import IntroItem from '@/components/home/IntroItem'

const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2
		}
	}
}

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1
	}
}

const listIntroduce = [
	{
		id: '1',
		title: '05+',
		lable: 'Years of Experience',
		description:
			'We are 05 years of experienced in this yoga field. Giving the best instructions.'
	},
	{
		id: '2',
		title: '15+',
		lable: 'Experienced Trainer',
		description:
			'We are 05 years of experienced in this yoga field. Giving the best instructions.'
	},
	{
		id: '3',
		title: '5K+',
		lable: 'Happy Clients',
		description:
			'We are 05 years of experienced in this yoga field. Giving the best instructions.'
	},
	{
		id: '4',
		title: '24+',
		lable: 'Monthly Routine',
		description:
			'We are 05 years of experienced in this yoga field. Giving the best instructions.'
	}
]

export const ListIntroduce = ({ dictionary }: any) => {
	return (
		<Box
			sx={{
				flex: { lg: 1.6, xl: 1 },
				margin: { md: '16px', lg: 0 },
				'& .container': {
					display: { md: 'grid', lg: 'block' },
					gridTemplateColumns: { md: 'repeat(2, 1fr)' },
					gridGap: { md: '16px', lg: 0 }
				}
			}}
		>
			<motion.ul
				className='container'
				variants={container}
				initial='hidden'
				whileInView='visible'
				style={{
					padding: '0'
				}}
			>
				{listIntroduce.map((introItem, index: number) => {
					return (
						<motion.li
							key={index}
							className='item'
							variants={item}
							style={{
								display: 'inline-block'
							}}
						>
							<IntroItem
								title={introItem.title}
								label={introItem.lable}
								description={introItem.description}
								index={index}
								dictionary={dictionary}
								style={{
									background: index === 0 ? '#376016' : '',
									position: 'relative',
									'& #title': {
										color: index === 0 ? '#91E050' : '315316'
									},
									'& #label01': {
										color: index === 0 ? '#fff' : '#000'
									},
									'& #label02': {
										color: index === 0 ? '#fff' : '#000'
									},
									'&::before': {
										position: 'absolute',
										content: '""',
										top: '-10px',
										left: '10px',
										width: '100%',
										height: '100%',
										border: '1px solid #74C92F',
										borderColor: index === 0 ? '#74C92F' : '#fff'
									}
								}}
							/>
						</motion.li>
					)
				})}
			</motion.ul>
		</Box>
	)
}

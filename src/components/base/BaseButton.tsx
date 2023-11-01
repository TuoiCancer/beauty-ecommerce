'use client'

import { Button } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'

interface IBaseButtonProps {
	label: string
	variant: 'contained' | 'outlined' | 'text'
	className?: string
	onClick?: any
	type?: 'button' | 'submit' | 'reset'
	styleSx?: any
	bgStyle?: 'color' | 'gradient'
}

const BaseButton: React.FunctionComponent<IBaseButtonProps> = ({
	label,
	variant,
	className,
	onClick,
	type,
	styleSx,
	bgStyle
}) => {
	return (
		<motion.div
			style={{
				display: 'inline-block'
			}}
			whileHover={{ scale: 1.05 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
		>
			<Button
				className={`${className}`}
				variant={variant}
				onClick={onClick}
				type={type}
				sx={{ ...styleSx }}
			>
				{label}
			</Button>
		</motion.div>
	)
}

export default BaseButton

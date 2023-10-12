import React from 'react'

const Lefticon = ({
	sx,
	width,
	height,
	onClick
}: {
	sx?: any
	width?: string
	height?: string
	onClick?: any
}) => {
	return (
		<svg
			width={width || '13'}
			height={height || '26'}
			viewBox='0 0 13 26'
			fill='none'
			style={sx}
			onClick={onClick}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0.88623 2.91782C0.104708 2.03604 -0.305705 1.58111 0.449767 0.668921C0.840528 0.212822 1.33549 -2.09808e-05 1.85651 -2.09808e-05C2.35147 -2.09808e-05 2.84644 0.212822 3.21115 0.668921L12.3029 11.22C12.6676 11.6457 12.876 12.2234 12.876 12.8315C12.876 13.4396 12.6676 14.0174 12.3029 14.4431L3.21115 24.9941C2.45568 25.9063 1.66775 26.0068 0.88623 25.0946C0.130758 24.2128 -0.395292 22.4748 0.38623 21.593L10.3862 12.8315L0.88623 2.91782Z'
				fill='#747474'
			/>
		</svg>
	)
}

export default Lefticon

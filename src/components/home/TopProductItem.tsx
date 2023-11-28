import { formatCurrency } from '@/helper'
import { useStore } from '@/store'
import { TopProductInterface } from '@/utils/product.interface'
import {
	Box,
	styled,
	Tooltip,
	tooltipClasses,
	TooltipProps,
	Typography
} from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { montserrat } from '../../../public/font'
import BaseButton from '../base/BaseButton'
import ImageItem from '../base/ImageItem'
import RatingItem from '../base/RatingItem'
import { motion } from 'framer-motion'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.8)',
		boxShadow: theme.shadows[1],
		fontSize: 12
	}
}))

const TopProductItem = ({
	item,
	dictionary
}: {
	item: TopProductInterface
	dictionary: any
}) => {
	const { UserSlice } = useStore()

	return (
		<motion.div
			className='box'
			whileHover={{ scale: 1.05 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			style={{
				margin: '0'
			}}
		>
			<Link
				href={`/${UserSlice.lang}/user/product/${item.id}`}
				style={{
					textDecoration: 'none'
				}}
			>
				<Box
					sx={{
						position: 'relative',
						border: { md: '1px solid #EEE' },
						background: '#FFF',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						mb: { xs: '12px', md: '24px' },
						mt: { xs: '30px', md: '0px' },
						marginLeft: { xs: '12px', sm: '0' },
						padding: {
							xs: '12px',
							sm: '16px 24px',
							lg: '32px 16px 32px 16px'
						},
						transition: 'all 0.2s ease-in-out',
						boxShadow: {
							xs: '0px 18px 36px 0px rgba(0, 0, 0, 0.07)',
							md: 'none'
						},
						'&:hover': {
							boxShadow: {
								md: '0px 18px 20px 0px rgba(0, 0, 0, 0.07)'
							},
							borderColor: '#6DC229'
						}
					}}
				>
					<Box
						sx={{
							background: '#FFF',
							mr: { xs: '0px', md: '24px', lg: '0' }
						}}
					>
						<ImageItem
							imgSrc={item.product_thumbnail}
							style={{
								width: { xs: '100%', md: '300px' },
								height: { xs: '260px', md: '200px', lg: '268px' },
								'& img': {
									objectFit: 'contain !important'
								}
							}}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							textAlign: 'center'
						}}
					>
						<LightTooltip title={item.product_name}>
							<Typography
								className={montserrat.className}
								variant='h5'
								sx={{
									color: '#1a383a',
									fontSize: { xs: '18px', md: '20px' },
									margin: { xs: '20px 0 8px 0', md: '20px 0 8px 0' },
									fontWeight: 600,
									lineHeight: '115.5%',
									display: '-webkit-box',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									WebkitLineClamp: 1,
									WebkitBoxOrient: 'vertical'
								}}
							>
								{item.product_name}
							</Typography>
						</LightTooltip>
						<Typography
							className={montserrat.className}
							variant='h6'
							sx={{
								color: '#315316',
								fontSize: '16px',
								lineHeight: '150%',
								padding: { xs: '0 0 12px 0', md: '0' },
								fontWeight: 400
							}}
						>
							{dictionary['Home']['topproduct'].from}{' '}
							{formatCurrency(item.product_price)} /
							{dictionary['Home']['topproduct'].item}
						</Typography>
						<Typography
							sx={{
								color: '#3E3E3E',
								fontSize: '14px',
								m: { md: '8px 0 12px 0' },
								textOverflow: 'ellipsis',
								fontWeight: 300,
								overflow: 'hidden',
								WebkitLineClamp: 3,
								WebkitBoxOrient: 'vertical',
								display: '-webkit-box'
								// fontFamily: 'Popins, sans-serif'
							}}
							className={montserrat.className}
						>
							{item.product_description}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								flexDirection: { md: 'column', lg: 'row' }
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									mb: { md: '12px' }
								}}
							>
								<RatingItem numberOfRate={item?.product_ratings_average} />
								<Typography
									className={montserrat.className}
									sx={{
										color: '#3E3E3E',
										fontSize: '16px',
										lineHeight: '180%',
										fontWeight: 400,
										marginLeft: '10px'
									}}
								>
									({item.product_quantity})
								</Typography>
							</Box>
							<BaseButton
								variant='contained'
								bgStyle='gradient'
								label='Shop now'
								styleSx={{
									marginLeft: { xs: '12px', sm: '0', lg: '32px' },
									padding: { md: '8px 36px' },
									borderRadius: '50px',
									background:
										'linear-gradient(123deg, #4eae3d 0%, #3ba3ab 100%)',
									fontSize: '14px',
									fontWeight: 300,
									lineHeight: '180%',
									textTransform: 'capitalize',
									width: { md: '123px' },
									whiteSpace: 'nowrap'
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Link>
		</motion.div>
	)
}

export default TopProductItem

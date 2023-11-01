import { useCreateReviewMutation } from '@/service/react-query/review.query'
import { useStore } from '@/store'
import { Box, Rating, styled, TextField, Typography } from '@mui/material'
import React from 'react'
import StarIcon from '../../../assets/icon/Star'
import BaseButton from '../base/BaseButton'
import ImageItem from '../base/ImageItem'
import EmptyStar from '../icon/EmptyStar'
import ItemDefaultText from './ItemDefaultText'

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff6d75'
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47'
	}
})

const ReviewOrder = ({ product, onClose }: any) => {
	const { UserSlice } = useStore()
	const { isLoading, mutate: addReviewFn } = useCreateReviewMutation()
	const [text, setText] = React.useState('')
	const [rating, setRating] = React.useState(5)
	const addReviewTitle = (item: string) => () =>
		setText(prev => {
			return `${prev}\n${item}: `
		})

	const addReview = () => {
		addReviewFn({
			productId: product.id,
			userId: UserSlice.user.id,
			rating,
			content: text
		})
		onClose()
	}

	return (
		<Box
			sx={{
				backgroundColor: '#fff',
				padding: '48px 32px',
				borderRadius: '10px',
				boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				margin: '20px auto',
				maxWidth: '1000px'
			}}
		>
			<Typography
				variant='h1'
				sx={{
					fontSize: '30px',
					fontWeight: '700',
					fontFamily: 'Montserrat',
					marginBottom: '48px'
				}}
			>
				Review Order
			</Typography>
			<Box
				sx={{
					width: '100%'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					{/* Thông tin sản phẩm */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							mb: { md: '24px' }
						}}
					>
						<ImageItem
							imgSrc={product.product_thumbnail}
							width='100px'
							height='100px'
						/>
						<Box
							sx={{
								ml: { md: '20px' }
							}}
						>
							<Typography
								variant='h6'
								sx={{
									fontSize: '18px',
									fontWeight: '500',
									fontFamily: 'Montserrat'
								}}
							>
								{product.product_name}
							</Typography>
							<Typography
								variant='body1'
								sx={{
									fontSize: '16px',
									fontWeight: '400',
									fontFamily: 'Montserrat'
								}}
							>
								Type: {product.product_category}
							</Typography>
						</Box>
					</Box>
					{/* Rating sản phẩm */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'flex-end',
							marginBottom: '20px'
						}}
					>
						<StyledRating
							name='customized-color'
							value={rating}
							onChange={(event, newValue) => {
								setRating(newValue || 0)
							}}
							getLabelText={(value: number) =>
								`${value} Heart${value !== 1 ? 's' : ''}`
							}
							precision={1}
							icon={<StarIcon />}
							emptyIcon={<EmptyStar />}
						/>
						<Typography
							variant='body1'
							sx={{
								fontSize: '14px',
								fontWeight: '500',
								fontFamily: 'Montserrat',
								ml: '10px'
							}}
						>
							{rating === 5
								? 'Excellent'
								: rating === 4
								? 'Good'
								: rating === 3
								? 'Average'
								: rating === 2
								? 'Fair'
								: 'Poor'}
						</Typography>
					</Box>
				</Box>

				{/* Hòm thư nhận xét */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: '8px',
							mt: '12px'
						}}
					>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<ItemDefaultText
								label={'Quality'}
								onClick={addReviewTitle('Quality')}
							/>
							<ItemDefaultText
								label={'Ingredients'}
								onClick={addReviewTitle('Ingredients')}
							/>
							<ItemDefaultText
								label={'Usefulness'}
								onClick={addReviewTitle('Usefulness')}
							/>
						</Box>
						<Typography
							sx={{
								fontSize: '14px',
								color: 'var(--secondary-green)'
							}}
						>
							Review detail
						</Typography>
					</Box>

					<TextField
						multiline
						rows={8}
						defaultValue='Default Value'
						value={text}
						placeholder='What did you like or dislike?'
						onChange={event => {
							setText(event.target.value)
						}}
						sx={{
							'& fieldset': {
								border: '1px solid var(--main-green) !important'
							},
							'&:hover fieldset': {
								border: '1px solid var(--main-green) !important'
							}
						}}
					/>
				</Box>
			</Box>
			<BaseButton
				label='Send'
				onClick={addReview}
				variant='contained'
				styleSx={{
					width: '100%',
					marginTop: '20px',
					fontSize: '16px',
					backgroundColor: 'var(--secondary-green)',
					'&:hover': {
						backgroundColor: 'var(--main-green)'
					}
				}}
			/>
		</Box>
	)
}

export default ReviewOrder

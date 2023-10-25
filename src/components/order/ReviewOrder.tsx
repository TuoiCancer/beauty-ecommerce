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

const ReviewOrder = ({ product }: any) => {
	const [text, setText] = React.useState('')
	const [rating, setRating] = React.useState(5)
	const addReviewTitle = (item: string) => () =>
		setText(prev => {
			return `${prev}\n${item}: `
		})

	return (
		<Box
			sx={{
				backgroundColor: '#fff',
				padding: '20px',
				borderRadius: '10px',
				boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				margin: '20px auto',
				maxWidth: '1000px'
			}}
		>
			<h1>Review Order</h1>
			<Box
				sx={{
					width: '100%'
				}}
			>
				{/* Thông tin sản phẩm */}
				<Box>
					<ImageItem
						imgSrc='https://static.thcdn.com/images/small/original//productimg/original/11688505-1344949795595249.jpg'
						width='100px'
						height='100px'
					/>
					<Box>
						<Typography variant='h6'>Sua duong the vaseline</Typography>
						<Typography variant='body1'>Loai: Combo ngay dem</Typography>
					</Box>
				</Box>
				{/* Rating sản phẩm */}
				<Box>
					<Typography variant='body1'>Đánh giá tổng quát</Typography>
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
				</Box>
				<Box
					sx={{
						backgroundColor: '#f5f5f5',
						height: '10px',
						width: '100%'
					}}
				/>
				{/* Hòm thư nhận xét */}
				<Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
					<Box>
						<ItemDefaultText
							label={'Chất lượng'}
							onClick={addReviewTitle('Chất lượng')}
						/>
						<ItemDefaultText
							label={'Kết cấu'}
							onClick={addReviewTitle('Kết cấu')}
						/>
						<ItemDefaultText
							label={'Hiệu quả'}
							onClick={addReviewTitle('Hiệu quả')}
						/>
					</Box>
					<TextField
						multiline
						rows={6}
						defaultValue='Default Value'
						value={text}
						onChange={event => {
							setText(event.target.value)
						}}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default ReviewOrder

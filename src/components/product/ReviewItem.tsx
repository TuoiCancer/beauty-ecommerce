'use client'
import React, { lazy, useEffect } from 'react'
import {
	Avatar,
	Box,
	CircularProgress,
	Rating,
	Typography
} from '@mui/material'
import ImageItem from '../base/ImageItem'
import { styled } from '@mui/material/styles'
import EmptyStar from '../icon/EmptyStar'
import StarIcon from '../../../assets/icon/Star'
import { formatDate, stringAvatar } from '@/helper'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import {
	useCreateReviewMutation,
	useDeleteReview,
	useEditReview,
	useGetReviewByParentId
} from '@/service/react-query/review.query'
import { useStore } from '@/store'
import { toast } from 'react-toastify'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { motion } from 'framer-motion'
import ReviewOptions from './ReviewOptions'
import EditReview from './EditReview'

export interface ReviewItemProps {
	img: string
	rating: number
	username: string
	content: string
	time: string
	id: string
	productId: string
	totalReply: number
	getParentReviews: any
}

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff6d75'
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47'
	}
})

// Client Components:
const DynamicReplyReview = lazy(() => import('./ReplyReview'))
const ReviewContainer = lazy(() => import('./ReviewContainer'))

export default function ReviewItem({
	img,
	id,
	rating,
	username,
	content,
	time,
	totalReply,
	productId,
	getParentReviews
}: ReviewItemProps) {
	const {
		data: listReviewChildrent,
		isLoading: isGettingReviewChildrent,
		mutate: getChildrentReviews
	} = useGetReviewByParentId()

	const { UserSlice } = useStore()

	const {
		isLoading: isSubmitReview,
		mutate: createReviews,
		isSuccess
	} = useCreateReviewMutation()

	const { mutate: deleteReview, isSuccess: successDeleted } = useDeleteReview()

	const { mutate: editReview, isSuccess: successEdit } = useEditReview()

	const [showCommentChild, setShowCommentChild] = React.useState(false)
	const [showReplyBox, setShowReplyBox] = React.useState(false)
	const [idParentReply, setIdParentReply] = React.useState('')
	const [contentReply, setContentReply] = React.useState('')
	const [contentEdit, setContentEdit] = React.useState(content)

	const [showOptionsReview, setShowOptionsReview] = React.useState(false)

	const [showEditBox, setShowEditBox] = React.useState(false)

	useEffect(() => {
		if (showCommentChild) {
			getChildrentReviews({
				parentId: id,
				productId
			})
		}
	}, [showCommentChild])

	useEffect(() => {
		if (isSuccess || successDeleted || successEdit) {
			getParentReviews({
				productId: productId
			})
		}
	}, [isSuccess, successDeleted, successEdit])

	const handleGetListReplyChild = () => {
		setShowCommentChild(!showCommentChild)
	}

	const handleCreateReview = () => {
		if (contentReply.trim() === '') {
			toast.error('Please enter your comment', {
				position: 'top-center'
			})
			return
		}
		setContentReply('')
		createReviews({
			productId,
			parentCommentId: id,
			content: contentReply,
			userId: UserSlice.user.id
		})
	}

	const handleEditReview = () => {
		if (contentEdit.trim() === '') {
			toast.error('Please enter your comment', {
				position: 'top-center'
			})
			return
		}
		setContentEdit(contentEdit)
		setShowEditBox(false)
		editReview({
			content: contentEdit,
			reviewId: id
		})
	}

	if (isGettingReviewChildrent) {
		return (
			<CircularProgress
				sx={{
					margin: '12px auto',
					display: 'block',
					width: '30px',
					height: '30px',
					color: '#9cc688'
				}}
			/>
		)
	}
	return (
		<Box
			sx={{
				mb: { xs: '18px', md: '24px' },
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: { xs: 'space-between', md: 'flex-start' }
			}}
		>
			{/* Avatar */}
			{img && (
				<ImageItem
					imgSrc={img}
					style={{
						width: { xs: '60px', md: '90px' },
						height: { xs: '60px', md: '90px' },
						borderRadius: '50%',
						border: '1px solid var(--main-green)',
						'& img': {
							borderRadius: '50%'
						}
					}}
				/>
			)}
			{!img && <Avatar {...stringAvatar(username || 'U')} />}

			<Box
				sx={{
					marginLeft: { xs: '12px' },
					flex: 1
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						position: 'relative',
						'&:hover': {
							'&   #option-review': {
								display: 'block !important'
							}
						}
					}}
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 20
						}}
						style={{
							width: '100%'
						}}
					>
						<Box
							sx={{
								background: '#f0f2f5',
								padding: { xs: '12px', md: '16px 24px' },
								borderRadius: '12px',
								mb: { xs: '12px' },
								mr: { xs: '4px' }
							}}
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center'
								}}
							>
								<Typography
									sx={{
										color: '#478515',
										fontFamily: 'Roboto',
										fontSize: { xs: '18px', lg: '20px' },
										fontWeight: { xs: 400, md: 500 },
										lineHeight: '125.5%',
										mr: { xs: '12px' },
										textTransform: 'capitalize'
									}}
								>
									{username}
								</Typography>
								{rating > 0 && (
									<StyledRating
										readOnly
										name='customized-color'
										defaultValue={rating}
										getLabelText={(value: number) =>
											`${value} Heart${value !== 1 ? 's' : ''}`
										}
										precision={1}
										icon={<StarIcon />}
										emptyIcon={<EmptyStar />}
									/>
								)}

								<Typography
									sx={{
										color: '#BBB',
										fontFamily: 'Roboto',
										fontSize: { xs: '14px', md: '16px' },
										fontWeight: { xs: 400 },
										lineHeight: '154.5%',
										flex: 1,
										textAlign: 'right'
									}}
								>
									{formatDate(time)}
								</Typography>
							</Box>
							<Typography
								sx={{
									color: '#737373',
									fontFamily: 'Roboto',
									fontSize: { xs: '16px', lg: '18px' },
									fontWeight: 300,
									lineHeight: '154.5%',
									mt: { xs: '8px', md: '12px' }
								}}
							>
								{content}
							</Typography>
						</Box>
					</motion.div>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1.2 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 20
						}}
						id='option-review'
						style={{
							display: 'none'
						}}
						onClick={() => setShowOptionsReview(!showOptionsReview)}
					>
						<MoreHorizIcon
							sx={{
								transform: 'rotate(90deg)',
								color: '#a3a3a3',
								mt: '8px',
								cursor: 'pointer',
								transition: 'all 0.3s ease',
								'&:hover': {
									color: '#000'
								}
							}}
						/>
					</motion.div>
					{showOptionsReview && (
						<ReviewOptions
							setShowEditBox={setShowEditBox}
							deleteReview={deleteReview}
							productId={productId}
							reviewId={id}
							setShowOptionsReview={setShowOptionsReview}
						/>
					)}
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						'& h5': {
							color: '#a3a3a3',
							fontFamily: 'Roboto',
							fontSize: { xs: '16px' },
							fontWeight: 500,
							lineHeight: '154.5%',
							mr: { xs: '12px', md: '24px' },
							ml: { xs: '12px' },
							cursor: 'pointer'
						}
					}}
				>
					<Typography variant='h5'>Like</Typography>
					<Typography
						variant='h5'
						onClick={() => {
							setShowReplyBox(true)
							setIdParentReply(id)
						}}
						sx={{
							userSelect: 'none',
							color:
								idParentReply === id
									? 'var(--main-green) !important'
									: '#a3a3a3',
							fontWeight: idParentReply === id ? ' 600 !important' : 500
						}}
					>
						Reply
					</Typography>
				</Box>

				{showEditBox && (
					<EditReview
						contentEdit={contentEdit}
						setContentEdit={setContentEdit}
						setShowEditBox={setShowEditBox}
						handleEditReview={handleEditReview}
					/>
				)}

				{totalReply > 0 && (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							my: '12px',
							'& h5': {
								color: showCommentChild ? '#000' : '#a3a3a3',
								fontFamily: 'Roboto',
								fontSize: { xs: '16px' },
								fontWeight: 400,
								lineHeight: '154.5%',
								ml: '8px',
								userSelect: 'none'
							}
						}}
						onClick={handleGetListReplyChild}
					>
						<KeyboardDoubleArrowDownIcon
							sx={{
								transform: showCommentChild ? 'rotate(180deg)' : 'rotate(0deg)',
								color: !showCommentChild ? '#a3a3a3' : ''
							}}
						/>
						<Typography variant='h5'>
							{showCommentChild ? 'Hide' : 'Show'} {totalReply} reply
						</Typography>
					</Box>
				)}

				{showCommentChild && (
					<ReviewContainer
						listReview={listReviewChildrent}
						productId={productId}
						getParentReviews={getParentReviews}
					/>
				)}

				{showReplyBox && (
					<DynamicReplyReview
						contentReply={contentReply}
						setContentReply={setContentReply}
						setShowReplyBox={setShowReplyBox}
						focus={showReplyBox}
						setIdParentReply={setIdParentReply}
						handleCreateReview={handleCreateReview}
					/>
				)}
			</Box>
		</Box>
	)
}

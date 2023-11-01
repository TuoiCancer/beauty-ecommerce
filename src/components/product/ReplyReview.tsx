import { Box, TextField } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send'
import { motion } from 'framer-motion'

export default function ReplyReview({
	contentReply,
	setShowReplyBox,
	focus,
	setContentReply,
	setIdParentReply,
	handleCreateReview
}: any) {
	return (
		<Box
			sx={{
				position: 'relative',
				mb: { xs: '12px' }
			}}
		>
			<TextField
				value={contentReply}
				autoFocus={focus}
				multiline
				rows={2}
				fullWidth
				sx={{
					background: '#f0f2f5',
					padding: { xs: '12px', md: '8px 24px 16px 6px' },
					borderRadius: '12px',
					border: 'none',
					'& fieldset': {
						border: 'none'
					},
					'& .MuiInputBase-root': {
						padding: '8px 12px'
					}
				}}
				onChange={e => {
					setContentReply(e.target.value)
				}}
				onKeyDown={e => {
					if (e.key === 'Escape') {
						setShowReplyBox(false)
						setIdParentReply('')
					}
				}}
			/>
			<Box
				onClick={handleCreateReview}
				sx={{
					'&:hover': {
						'& svg': {
							scale: '1.3'
						}
					},
					'& svg': {
						transition: 'all 0.3s ease'
					}
				}}
			>
				<SendIcon
					sx={{
						position: 'absolute',
						right: '12px',
						top: '12px',
						cursor: 'pointer',
						color: '#4f8135',
						fontSize: '28px'
					}}
				/>
			</Box>
		</Box>
	)
}

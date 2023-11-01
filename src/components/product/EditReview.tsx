import React from 'react'
import { Box, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const EditReview = ({
	contentEdit,
	setContentEdit,
	setShowEditBox,
	handleEditReview
}: any) => {
	return (
		<Box
			sx={{
				position: 'relative',
				mb: { xs: '12px' }
			}}
		>
			<TextField
				value={contentEdit}
				autoFocus={true}
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
					setContentEdit(e.target.value)
				}}
				onKeyDown={e => {
					if (e.key === 'Escape') {
						setShowEditBox(false)
					}
				}}
			/>
			<Box
				onClick={handleEditReview}
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

export default EditReview

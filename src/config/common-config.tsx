import React, { useState } from 'react'

import { PRODUCT_STATUS } from '@/constants/product_status.constant'
import { formatCurrencyV2 } from '@/helper'
import { Box, Modal, Popover, Typography } from '@mui/material'
import {
	GridColDef,
	GridColumnHeaderParams,
	GridRenderCellParams,
	gridPaginatedVisibleSortedGridRowEntriesSelector,
	gridPaginationRowRangeSelector,
	gridPageSelector
} from '@mui/x-data-grid'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import BaseButton from '@/components/base/BaseButton'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4
}

export const configDefaultOption = {
	renderHeader: (params: GridColumnHeaderParams) => (
		<RenderHeader {...params} />
	),
	filterable: false,
	editable: false,
	disableColumnMenu: true,
	hideable: false,
	cellClassName: 'table-cell-text'
}

export const RenderHeader = (params: GridColumnHeaderParams) => {
	return (
		<Typography fontWeight='600' color='#343A40' fontSize='14px' noWrap>
			{params.colDef.headerName}
		</Typography>
	)
}

export const RenderNoCell = (params: GridRenderCellParams) => {
	const { id, api } = params
	const apiRef = { current: api }
	const range = gridPaginationRowRangeSelector(apiRef)
	const rows = gridPaginatedVisibleSortedGridRowEntriesSelector(apiRef)
	const page = gridPageSelector(apiRef)
	const index = rows.findIndex(r => r.id === id)
	return index === -1 ? null : <>{range!.firstRowIndex + index + 1}</>
}

export const RenderDateCell = (params: GridRenderCellParams) => {
	const day = new Date(params.value).getDate()
	const month = new Date(params.value).getMonth() + 1
	const year = new Date(params.value).getFullYear()
	return (
		<>
			{day}-{month}-{year}
		</>
	)
}

export const RenderPriceCell = (params: GridRenderCellParams) => {
	return <>{formatCurrencyV2(params.value)}đ</>
}

export const renderColorChip = (status: string) => {
	switch (status) {
		case PRODUCT_STATUS.IN_STOCK:
			return 'var(--packaged-button)'
		case PRODUCT_STATUS.OUT_OF_STOCK:
			return 'var(--cancelled-button)'
		case PRODUCT_STATUS.COMMING_SOON:
			return 'var(--waiting-button)'
		case PRODUCT_STATUS.ON_SALE:
			return 'var(--completed-button)'
	}
}

export default function RenderOptionCell(
	params: GridRenderCellParams,
	onClickDeleteButton: () => void
) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	const [openModal, setOpenModal] = React.useState(false)
	const handleOpenModal = () => setOpenModal(true)
	const handleCloseModal = () => setOpenModal(false)

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				cursor: 'pointer',
				transition: 'all 0.3s ease',
				'&:hover': {
					color: '#fff',
					backgroundColor: '#1C2A53',
					'& svg': {
						transform: 'scale(1.2)'
					}
				}
			}}
		>
			<Box onClick={handleClick}>
				<MoreHorizIcon />
			</Box>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				sx={{
					'& .MuiPaper-root': {
						padding: '10px 16px'
					}
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						pb: '10px',
						cursor: 'pointer',
						borderBottom: '1px solid #E0E0E0',
						borderRadius: '4px 4px 0 0',
						'&:hover': {
							color: '#fff',
							backgroundColor: '#1C2A53',
							'& p': {
								color: '#fff'
							}
						}
					}}
				>
					<EditIcon />
					<Typography
						sx={{
							fontWeight: '600',
							color: '#1C2A53',
							ml: '10px'
						}}
					>
						Edit
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						cursor: 'pointer',
						pt: '10px',
						borderRadius: '0 0 4px 4px',
						'&:hover': {
							color: '#fff',
							backgroundColor: '#1C2A53',
							'& p': {
								color: '#fff'
							}
						}
					}}
					onClick={handleOpenModal}
				>
					<DeleteIcon />
					<Typography
						sx={{
							fontWeight: '600',
							color: '#1C2A53',
							ml: '10px'
						}}
					>
						Delete
					</Typography>
				</Box>
			</Popover>

			<Modal open={openModal} onClose={handleCloseModal}>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Do you want to delete this product?
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							mt: '20px',
							'& button': {
								marginLeft: '10px',
								textTransform: 'none'
							}
						}}
					>
						<BaseButton
							onClick={() => {
								handleClose()
								handleCloseModal()
							}}
							label='No'
							variant='text'
						/>
						<BaseButton
							label={`Yes, I'm sure`}
							variant='contained'
							onClick={() => {
								handleClose()
								handleCloseModal()
								onClickDeleteButton()
							}}
						/>
					</Box>
				</Box>
			</Modal>
		</Box>
	)
}

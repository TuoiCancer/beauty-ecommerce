import { PRODUCT_STATUS } from '@/constants/product_status.constant'
import { formatCurrencyV2 } from '@/helper'
import { Box, Typography } from '@mui/material'
import {
	GridColDef,
	GridColumnHeaderParams,
	GridRenderCellParams,
	gridPaginatedVisibleSortedGridRowEntriesSelector,
	gridPaginationRowRangeSelector
} from '@mui/x-data-grid'

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
		<Typography fontWeight='600' color='#343A40' fontSize='14px'>
			{params.colDef.headerName}
		</Typography>
	)
}

export const RenderNoCell = (params: GridRenderCellParams) => {
	const { id, api } = params
	const apiRef = { current: api }
	const range = gridPaginationRowRangeSelector(apiRef)
	const rows = gridPaginatedVisibleSortedGridRowEntriesSelector(apiRef)
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
			return 'var(--packaged-button)';
		case PRODUCT_STATUS.OUT_OF_STOCK:
			return 'var(--cancelled-button)';
		case PRODUCT_STATUS.COMMING_SOON:
			return 'var(--waiting-button)';
		case PRODUCT_STATUS.ON_SALE:
			return 'var(--completed-button)';
	};
}

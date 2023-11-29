import { PAGE_SIZE_OPTIONS } from '@/constants/common.constant'
import {
	PagingData,
	PagingParam,
	SearchingParam,
	SortingParam
} from '@/models/base-param-payload.type'
import {
	DataGrid,
	GridColDef,
	GridPaginationModel,
	GridSortModel
} from '@mui/x-data-grid'
import BaseTablePagingnation, {
	ITablePagingProps
} from './BaseTablePagingnation'

interface IDataTableProps {
	total: number
	data: any[]
	paging: PagingData
	configColumn: GridColDef[]
	onPagingModelChange: (page: number) => void
	onSearch?: (search: SearchingParam) => void
	onSortModelChange?: (sort: SortingParam) => void
	onLimitChange: (limit: number) => void
}

const BaseDataTable: React.FunctionComponent<IDataTableProps> = ({
	total,
	data,
	paging,
	configColumn,
	onPagingModelChange,
	onLimitChange,
	onSearch: handleSearch,
	onSortModelChange: handleSortingModelChange
}) => {
	const { page, limit, total: totalRecords } = paging

	const changeSortingModel = (sort: GridSortModel) => {
		const sortParam: SortingParam = {
			sort: sort[0]?.field,
			order: sort[0]?.sort ?? 'desc'
		}
		handleSortingModelChange?.(sortParam)
	}

	return (
		<DataGrid
      rows={data}
			// {...data.map((item, index) => {
			// 	return {
			// 		...item,
			// 		No: limit * (page - 1) + index + 1
			// 	}
			// })}
			rowSelection={true}
			columns={configColumn}
      autoPageSize
			initialState={{
				pagination: {
					paginationModel: { page: page - 1, pageSize: limit }
				}
			}}
			pageSizeOptions={PAGE_SIZE_OPTIONS}
			checkboxSelection={false}
			onSortModelChange={changeSortingModel}
			sortingOrder={['desc', 'asc']}
			sx={{
				'& .table-cell-text': {
					fontSize: '14px',
					color: '#6C757D'
				}
			}}
			slots={{
				pagination: BaseTablePagingnation,
			}}
			slotProps={{
				pagination: {
					count: total,
					size: 'medium',
					onPageChange: (event, page) => onPagingModelChange(page),
					onRowsPerPageChange: event => onLimitChange(Number(event.target.value))
				}
			}}
		/>
	)
}

export default BaseDataTable

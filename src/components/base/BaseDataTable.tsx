import {
	PagingData,
	SearchingParam,
	SortingParam
} from '@/models/base-param-payload.type'
import {
	DataGrid,
	GridColDef,
	GridRowId,
	GridSortModel
} from '@mui/x-data-grid'
import BaseTablePagingnation from './BaseTablePagingnation'
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, SelectChangeEvent } from '@mui/material';
import RenderOptionCell from '@/config/common-config';

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

  const { data: dataGrid } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
  });

	const changeSortingModel = (sort: GridSortModel) => {
		const sortParam: SortingParam = {
			sort: sort[0]?.field,
			order: sort[0]?.sort ?? 'desc'
		}
		handleSortingModelChange?.(sortParam)
	}

	return (
		<>
      <DataGrid
        {...dataGrid}
        rows={data}
        rowSelection={true}
        columns={configColumn}
        checkboxSelection={false}
        onSortModelChange={changeSortingModel}
        sortingOrder={['desc', 'asc']}
        sx={{
          '& .table-cell-text': {
            fontSize: '14px',
            color: '#6C757D'
          }
        }}
        hideFooter
				slotProps={{
					cell: {
						onClick: () => {
							return 'a';
						}
					}
				}}
      />
      <BaseTablePagingnation
        page={page}
        count={total}
        size='medium'
        totalRecords={totalRecords}
        onPageChange={(event, page) => onPagingModelChange(page)}
        onRowsPerPageChange={(event: SelectChangeEvent<number>) => onLimitChange(Number(event.target.value))}
      />
    </>
	)
}

export default BaseDataTable

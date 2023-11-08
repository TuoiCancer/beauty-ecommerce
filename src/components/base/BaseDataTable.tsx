import { PAGE_SIZE_OPTIONS } from '@/constants/common.constant';
import { PageLimit, PagingData, PagingParam, SearchingParam, SortingParam } from '@/models/base-param-payload.type';
import { DataGrid, GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import PaginationItem from '../product/Pagination';

interface IDataTableProps {
  total: number;
  data: any[];
  paging: PagingData;
  configColumn: GridColDef[];
  onPagingModelChange?: (paging: PagingParam) => void;
  onSearch?: (search: SearchingParam) => void;
  onSortModelChange?: (sort: SortingParam) => void;
}

const BaseDataTable: React.FunctionComponent<IDataTableProps> = ({
  total,
  data,
  paging,
  configColumn,
  onPagingModelChange: handlePagingModelChange,
  onSearch: handleSearch,
  onSortModelChange: handleSortingModelChange,
}) => {
  const { page, limit } = paging;

  const changePagingModel = ({
    page,
    pageSize: limit,
  }: GridPaginationModel) => {
    handlePagingModelChange?.({ page: page + 1, limit: limit as PageLimit });
  };
  
  const changeSortingModel = (sort: GridSortModel) => {
    const sortParam: SortingParam = {
      sort: sort[0]?.field,
      order: sort[0]?.sort ?? "desc",
    };
    handleSortingModelChange?.(sortParam);
  };

  return (
    <DataGrid
      rows={data}
      rowCount={total}
      columns={configColumn}
      initialState={{
        pagination: {
          paginationModel: { page: page - 1, pageSize: limit },
        },
      }}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      checkboxSelection={false}
      paginationMode="client"
      onPaginationModelChange={changePagingModel}
      onSortModelChange={changeSortingModel}
      sortingOrder={['desc', 'asc']}
    />
  );
}

export default BaseDataTable;
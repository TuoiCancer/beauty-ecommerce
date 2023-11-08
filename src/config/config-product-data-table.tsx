import { GridColDef } from "@mui/x-data-grid";

export const productTableColumn: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
  },
  {
    field: 'product_thumbnail',
    headerName: 'Image'
  },
  {
    field: 'product_name',
    headerName: 'Product Name'
  },
  {
    field: 'product_category',
    headerName: 'Category'
  },
  // {
  //   field: 'product_sold',
  //   headerName: 'Sold'
  // },
  {
    field: 'product_quantity',
    headerName: 'Inventory'
  },
  {
    field: 'product_price',
    headerName: 'Price'
  },
  {
    field: 'product_original_price',
    headerName: 'Original Price'
  },
  {
    field: 'createdAt',
    headerName: 'Created At'
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At'
  },
  {
    field: 'product_status',
    headerName: 'Status'
  },
  {
    field: 'Action',
    headerName: 'Action'
  },
];
import ImageItem from '@/components/base/ImageItem'
import { Chip } from '@mui/material'
import { GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'
import RenderOptionCell, {
	RenderDateCell,
	RenderNoCell,
	RenderPriceCell,
	renderColorChip
} from './common-config'
import { configDefaultOption } from './common-config'

export const productTableColumn = (
	handleButtonDelete: (id: GridRowId) => void
): GridColDef[] => [
	{
		field: 'No',
		headerName: '',
		width: 80,
		renderCell: (params: GridRenderCellParams) => <RenderNoCell {...params} />,
		sortable: false,
		...configDefaultOption
	},
	{
		field: 'product_name',
		headerName: 'Product Name',
		flex: 1,
		minWidth: 200,
		...configDefaultOption
	},
	{
		field: 'product_thumbnail',
		headerName: 'Image',
		flex: 1,
		headerAlign: 'center',
		align: 'center',
		sortable: false,
		renderCell: (params: GridRenderCellParams) => {
			return (
				<ImageItem
					imgSrc={params.value}
					style={{
						width: '50px',
						height: '50px',
						borderRadius: '50%',
						'& img': {
							borderRadius: '50%'
						}
					}}
				/>
			)
			// return <Avatar src={params.value} alt='product thumbnail' />
		},
		...configDefaultOption
	},
	{
		field: 'product_category',
		headerName: 'Category',
		flex: 1,
		...configDefaultOption
	},
	{
		field: 'product_sold',
		headerName: 'Sold',
		flex: 1,
		renderCell: () => 10, //mock data tạm thời
		...configDefaultOption
	},
	{
		field: 'product_quantity',
		headerName: 'Inventory',
		flex: 1,
		...configDefaultOption
	},
	{
		field: 'product_price',
		headerName: 'Price',
		flex: 1,
		renderCell: (params: GridRenderCellParams) => (
			<RenderPriceCell {...params} />
		),
		...configDefaultOption
	},
	{
		field: 'product_original_price',
		headerName: 'Original Price',
		flex: 1,
		renderCell: (params: GridRenderCellParams) => (
			<RenderPriceCell {...params} />
		),
		...configDefaultOption
	},
	{
		field: 'createdAt',
		headerName: 'Created At',
		renderCell: (params: GridRenderCellParams) => (
			<RenderDateCell {...params} />
		),
		flex: 1,
		...configDefaultOption
	},
	{
		field: 'product_status',
		headerName: 'Status',
		flex: 1,
		sortable: false,
		headerAlign: 'center',
		align: 'center',
		renderCell: (params: GridRenderCellParams) => {
			const color = renderColorChip(params.value)
			const outputLabel = (params.value as string).replace(/([A-Z])/g, ' $1')
			const label = outputLabel.charAt(0).toUpperCase() + outputLabel.slice(1)
			return (
				<Chip
					label={label}
					sx={{ color: '#fff', backgroundColor: `${color}` }}
				/>
			)
		},
		...configDefaultOption
	},
	{
		field: 'action',
		headerName: 'Action',
		headerAlign: 'center',
		flex: 1,
		maxWidth: 150,
		sortable: false,
		renderCell: (params: GridRenderCellParams) => {
			return RenderOptionCell(params, () => handleButtonDelete(params.id))
		},
		...configDefaultOption
	}
]

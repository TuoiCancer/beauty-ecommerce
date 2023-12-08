import DashboardIcon from '@mui/icons-material/Dashboard'
import ReceiptIcon from '@mui/icons-material/Receipt'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import ReviewsIcon from '@mui/icons-material/Reviews'
import { ReactElement } from 'react'

export type ListAdminSidebarItemType = {
	id: string
	label: string
	path: string
	icon: ReactElement
	isActive: boolean
}

export const listAdminSidebarItems: ListAdminSidebarItemType[] = [
	{
		id: 'dashboard',
		label: 'dashboard',
		path: '/admin/dashboard',
		icon: <DashboardIcon />,
		isActive: false
	},
	{
		id: 'order',
		label: 'orders',
		path: '/admin/orders',
		icon: <ReceiptIcon />,
		isActive: false
	},
	{
		id: 'product',
		label: 'products',
		path: '/admin/products',
		icon: <Inventory2Icon />,
		isActive: false
	},
	{
		id: 'blog',
		label: 'blogs',
		path: '/admin/blogs',
		icon: <NoteAltIcon />,
		isActive: false
	},
	{
		id: 'voucher',
		label: 'vouchers',
		path: '/admin/vouchers',
		icon: <LocalActivityIcon />,
		isActive: false
	},
	{
		id: 'review',
		label: 'reviews',
		path: '/admin/reviews',
		icon: <ReviewsIcon />,
		isActive: false
	}
]

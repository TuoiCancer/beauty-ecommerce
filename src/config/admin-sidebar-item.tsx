import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { ReactElement } from 'react';

export type ListAdminSidebarItemType = {
  id: string,
  label: string,
  path: string,
  icon: ReactElement
  isActive: boolean
};

export const listAdminSidebarItems: ListAdminSidebarItemType[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin',
    icon: <DashboardIcon />,
    isActive: false
  },
  {
    id: 'order',
    label: 'Orders',
    path: '/admin/orders',
    icon: <ReceiptIcon />,
    isActive: false
  },
  {
    id: 'product',
    label: 'Products',
    path: '/admin/products',
    icon: <Inventory2Icon />,
    isActive: false
  },
  {
    id: 'blog',
    label: 'Blogs',
    path: '/admin/blogs',
    icon: <NoteAltIcon />,
    isActive: false
  },
  {
    id: 'voucher',
    label: 'Vouchers',
    path: '/admin/vouchers',
    icon: <LocalActivityIcon />,
    isActive: false
  },
  {
    id: 'review',
    label: 'Reviews',
    path: '/admin/reviews',
    icon: <ReviewsIcon />,
    isActive: false
  },
];
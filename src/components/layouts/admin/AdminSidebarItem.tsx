import { ListItem, ListItemButton, ListItemIcon, ListItemText, makeStyles, styled } from '@mui/material';
import { ListAdminSidebarItemType, listAdminSidebarItems } from '../../../config/admin-sidebar-item';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminSidebarItem = ({ open }: {open?: boolean}) => {
  const router = useRouter();
  const [sidebarSettings, setSidebarSettings] = useState<ListAdminSidebarItemType[]>(listAdminSidebarItems);

  const pathname = usePathname();
  const params = useParams();
  const pathMatch = pathname.replace(`/${params.lang}`, '');

  useEffect(() => {
    setSidebarSettings(prev => prev.map(item => ({ ...item, isActive: item.path === pathMatch })));
  }, []);

  const handleActive = (sidebarItem: ListAdminSidebarItemType) => {
    setSidebarSettings(prev => {
      const index = prev.findIndex(item => item.id === sidebarItem.id);
      return [
        ...prev.slice(0, index).map(item => ({ ...item, isActive: false })),
        {
          ...prev[index],
          isActive: true
        },
        ...prev.slice(index + 1).map(item => ({ ...item, isActive: false })),
      ];
    });
    router.push(sidebarItem.path);
  }
  return (
    <>
       {sidebarSettings.map(item => (
        <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              width: open ? '90%' : '100%',
              marginBottom: '0.5rem',
              color: '#fff',
              backgroundColor: item.isActive ? '#FDB140' : '',
              borderRadius: open ? '0 30px 30px 0' : 'unset',
              '&:before': {
                content: '""',
                width: 0,
              },
              '&:hover': !item.isActive ? {
                position: 'relative',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: open ? '0 30px 30px 0' : 'unset',
                  width: '100%',
                  transition: 'width 0.5s',
                  zIndex: -1
                },
              } : {
                backgroundColor: '#FDB140',
                borderRadius: open ? '0 30px 30px 0' : 'unset',
              }
            }}
            onClick={() => handleActive(item)}
            title={!open ? item.label : ''}
          >
            <ListItemIcon 
              sx={{ 
                marginLeft: open ? 0 : '3px',
                color: '#fff', 
                justifyContent: open ? 'center' : 'flex-start' 
              }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText sx={{ fontSize: '16px' }} primary={item.label} />
          </ListItemButton>
        </ListItem>
       ))}
    </>
  )
};

export default AdminSidebarItem;
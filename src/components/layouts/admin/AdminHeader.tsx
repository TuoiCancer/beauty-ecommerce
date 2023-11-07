'use client';

import { IconButton, Toolbar, Typography, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { drawerWidth } from "./RootAdminLayout";
import { useParams, usePathname } from "next/navigation";
import BaseSearch from "@/components/base/BaseSearch";
import Avatar from "./AdminAvatar";

interface IAdminHeader {
  open: boolean;
  onOpenDrawer: () => void
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AdminHeader = ({ open, onOpenDrawer }: IAdminHeader) => {
  const pathname = usePathname();
  const params = useParams();

  const getTitle = () => {
    const splitPath = pathname.split('/');
    const rawTitle = splitPath[splitPath.length - 1];
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.substring(1);   
    return title === 'Admin' ? 'Dashboard' : title;
  }

  return (
    <AppBar sx={{ backgroundColor: '#fff' }} position="fixed" open={open}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          aria-label="open drawer"
          onClick={onOpenDrawer}
          edge="start"
          sx={{
            marginRight: 5,
            color: '#000',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" color='#000'>
          {getTitle()}
        </Typography>
        <BaseSearch />
        <Avatar />
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
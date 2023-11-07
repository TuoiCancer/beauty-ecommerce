'use client';

import { Box, CSSObject, Divider, IconButton, List, Theme, Typography, styled, useTheme } from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from "react";
import AdminSidebarItem from "./AdminSidebarItem";
import { appbarHeight, drawerWidth } from "./RootAdminLayout";

interface IAdminSidebar {
  open: boolean;
  onCloseDrawer: () => void
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: '#0C2E4F',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#0C2E4F',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: appbarHeight,
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.06)'
  },
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const AdminSidebar = ({open, onCloseDrawer}: IAdminSidebar) => {
  return (
    <Box sx={{ height: '100vh' }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography color='#fff' fontSize={36} fontFamily='Poly' sx={{ position: 'relative' }}>L&apos;oréal</Typography>
            <IconButton sx={{ position: 'absolute', right: 0, }} onClick={onCloseDrawer}>
            <ChevronLeftIcon sx={{ color: '#fff' }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <AdminSidebarItem open={open} />
        </List>
      </Drawer>
    </Box>
  );
}

export default AdminSidebar;
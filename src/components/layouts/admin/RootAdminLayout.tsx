'use client';

import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import AdminSidebar from "./sidebar/AdminSidebar";
import AdminHeader from "./header/AdminHeader";
import AdminMainContent from "./AdminMainContent";

interface IRootAdminLayout {
  children: React.ReactNode,
  dictionary: { [key: string]: any }
}

export const drawerWidth = 268;
export const appbarHeight = 70;

const RootAdminLayout = ({ children, dictionary }: IRootAdminLayout) => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminSidebar open={open} onCloseDrawer={handleDrawerClose} dictionary={dictionary}/>
      <AdminMainContent open={open}>
        <AdminHeader open={open} onOpenDrawer={handleDrawerOpen} dictionary={dictionary}/>
        <Box sx={{ marginTop: `${appbarHeight}px`, height: `calc(100% - ${appbarHeight}px)` }}>
          {children}
        </Box>
      </AdminMainContent>
    </Box>
  );
};

export default RootAdminLayout;
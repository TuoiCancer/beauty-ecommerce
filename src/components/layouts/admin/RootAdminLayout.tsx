'use client';

import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import AdminSidebar from "./sidebar/AdminSidebar";
import AdminHeader from "./header/AdminHeader";

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
      <Box sx={{ width: '100%' }}>
        <AdminHeader open={open} onOpenDrawer={handleDrawerOpen} dictionary={dictionary}/>
        <Box sx={{ marginTop: `${appbarHeight}px` }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default RootAdminLayout;
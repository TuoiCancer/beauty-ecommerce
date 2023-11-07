'use client';

import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface IRootAdminLayout {
  children: React.ReactNode
}

export const drawerWidth = 268;
export const appbarHeight = 70;

const RootAdminLayout = ({ children }: IRootAdminLayout) => {
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
      <Box>
        <AdminSidebar open={open} onCloseDrawer={handleDrawerClose}/>
      </Box>
      <Box>
        <AdminHeader open={open} onOpenDrawer={handleDrawerOpen}/>
        <Box sx={{ marginTop: `${appbarHeight}px` }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default RootAdminLayout;
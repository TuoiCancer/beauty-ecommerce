'use client';

import BaseNavbar from '@/components/base/BaseNavbar';
import { Box } from '@mui/material';
import React, { useState } from 'react';

const menuItems = [
  { id: 1, label: 'Home', isHasDropdown: false },
  { id: 2, label: 'Product', isHasDropdown: false },
  { id: 3, label: 'Shop', isHasDropdown: true },
];

const menuDropdownItems = [
  { id: 1, label: 'L’Oréal' },
  { id: 2, label: 'The Ordinary' },
  { id: 3, label: 'Bioderma' },
];

export default function Home() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        pb: '1000px',
      }}
    >
      Home page
    </Box>
  );
}

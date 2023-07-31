"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BaseButton from "./BaseButton";

interface IBaseNavbarProps {
  position?: 'static' | 'sticky',
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl',
  disableGutters?: boolean,
  typoVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  typoNoWrap?: boolean,
  menuItems: IMenuItem[],
  menuDropdownItems: IMenuDropdownItem[],
  anchorElNav?: HTMLElement | null,
  onOpenDropdown?: any,
  onCloseDropdown?: any,
}

interface IMenuItem {
  id: number,
  label: string,
  isHasDropdown: boolean
}

interface IMenuDropdownItem {
  id: number,
  label: string
}

const BaseNavbar: React.FunctionComponent<IBaseNavbarProps> = ({
  position,
  containerMaxWidth,
  disableGutters,
  typoVariant,
  typoNoWrap,
  menuItems,
  anchorElNav,
  menuDropdownItems,
  onOpenDropdown,
  onCloseDropdown
}) => {
  return (
    <>
      <AppBar position={position} className="bg-white py-4">
        <Container maxWidth={containerMaxWidth}>
          <Toolbar disableGutters={disableGutters}>
            <Typography
              variant={typoVariant}
              noWrap={typoNoWrap}
              component="a"
              href="/"
              className="no-underline mr-6 text-black"
            >
              <div className="navbar-title">
                <h1 className="flex items-center font-bold m-0">
                  GLOW&nbsp;
                  <span className="text-base m-0">&</span>
                  &nbsp;GRACE
                </h1>
                <p className="text-xs font-medium mt-0 text-center w-[95%]">NATURAL SKINCARE</p>
              </div>
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
              {menuItems.map(item => (
                item.isHasDropdown ? (
                  <BaseButton 
                    key={item.id}
                    label={item.label} 
                    variant="text"
                    className="text-black text-2xl capitalize" 
                  />
                ) : (
                  <Menu
                    key={item.id}
                    id="meny-appbar"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={onCloseDropdown}
                  >
                    {menuDropdownItems.map(dropdownItem => (
                      <MenuItem key={dropdownItem.id} onClick={onOpenDropdown}>
                        <Typography textAlign="center">{dropdownItem.label}</Typography>
                      </MenuItem>
                    ))}
                  </Menu> 
                )
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default BaseNavbar;
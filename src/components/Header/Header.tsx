import { Box, Select, MenuItem, Typography } from '@mui/material';
import React from 'react';
import ImageItem from '../base/ImageItem';
import HeaderItem from './HeaderItem';
import { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';
const listMenu = [
  {
    id: 1,
    name: 'Home',
    link: '/home',
    isHaveSubItem: false,
  },
  {
    id: 2,
    name: 'Product',
    link: '/product',
    isHaveSubItem: false,
  },
  {
    id: 3,
    name: 'Shop',
    isHaveSubItem: true,
    subItem: [
      {
        sub_name: `L'oréal`,
        sub_link: '/shop/loreal',
      },
      {
        sub_name: `The Ordinary`,
        sub_link: '/shop/oridinary',
      },
      {
        sub_name: `Bioderma`,
        sub_link: '/shop/bioderma',
      },
    ],
  },
];

const Header = ({
  isFixed = false,
  isHaveBg = true,
  isHaveShadow = true,
  textColor = '#000',
  style = {},
}) => {
  const [language, setLanguage] = React.useState('en');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
  };
  return (
    <Box
      sx={{
        position: isFixed ? 'fixed' : 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: isHaveBg ? '#fff' : 'transparent',
        borderRadius: '8px',
        maxWidth: '1500px',
        margin: '0 auto',
        color: textColor,
        boxShadow: isHaveShadow
          ? '0px 18px 36px 0px rgba(200, 200, 200, 0.25)'
          : 'none',
        pr: '30px',
        ...style,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { md: '30px 0px' },
        }}
      >
        {/* Logo */}
        <ImageItem
          imgSrc={
            textColor === '#000'
              ? '/img/logo/logo_black.png'
              : '/img/logo/logo_white.png'
          }
          style={{
            width: { md: '300px' },
            height: { md: '54px' },
          }}
        />

        {/* Menu */}
        {listMenu.map((item) => {
          return <HeaderItem key={item.id} item={item} textColor={textColor} />;
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Select
          id="select language"
          value={language}
          onChange={handleChange}
          sx={{
            mr: '20px',
            color: textColor,
            '& fieldset': {
              border: 'none',
            },
            '& svg': {
              color: textColor,
            },
          }}
        >
          <MenuItem value={'en'}>Eng</MenuItem>
          <MenuItem value={'vn'}>Viet Nam</MenuItem>
          <MenuItem value={'ko'}>Korean</MenuItem>
        </Select>

        <Box
          sx={{
            zIndex: 3,
            cursor: 'pointer',
            position: 'absolute',
            right: '-16px',
            top: '-3px',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#9E5F00',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                fontSze: '16px',
                fontWeight: 600,
                lineHeight: '32px',
              }}
            >
              {2}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Link href="#">
            {textColor === '#000' ? (
              <ImageItem
                imgSrc="/img/Cart_000.png"
                style={{
                  width: '39px',
                  height: '35px',
                }}
              />
            ) : (
              <ImageItem
                imgSrc="/img/Cart_fff.png"
                style={{
                  width: '39px',
                  height: '35px',
                }}
              />
            )}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

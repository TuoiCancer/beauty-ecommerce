import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Unica_One } from 'next/font/google';
import BaseButton from '@/components/base/BaseButton';
import InfoTag from './InfoTag';
const unicaOne = Unica_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['normal'],
});

const HeaderShopDetail = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > img': {
          zIndex: ' -1',
        },
      }}
    >
      <Image
        alt="bg"
        src="/img/home-hero-lg 2.png"
        fill
        style={{
          objectFit: 'cover',
        }}
      />
      <Typography
        variant="h1"
        className={unicaOne.className}
        sx={{
          color: '#fff',
          fontSize: { md: '96px' },
          mb: { md: '24px' },
          textTransform: 'uppercase',
        }}
      >
        A Deep Dive Into Beauty
      </Typography>

      <Typography
        variant="h3"
        sx={{ color: '#fff', fontSize: { md: '20px' }, mb: { md: '48px' } }}
      >
        L’Oréal has set itself the mission of offering all women and men
        worldwide the best of cosmetics innovation in terms of quality, efficacy
        and safety
      </Typography>
      <BaseButton
        label="Buy Now"
        variant="contained"
        bgStyle="color"
        styleSx={{
          textTransform: 'normal',
          padding: '28px 88px',
          color: '#171B1A',
          backgroundColor: '#fff',
          borderRadius: '0px',
          fontSize: '20px',
          '&:hover': {
            backgroundColor: '#fff',
            opacity: '0.95',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-80px',
        }}
      >
        <InfoTag />
      </Box>
    </Box>
  );
};

export default HeaderShopDetail;

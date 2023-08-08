import { hindMadurai, ibarra } from '@/assets/font';
import { Box, Typography } from '@mui/material';
import React from 'react';

const IntroItem = ({
  title,
  label,
  description,
}: {
  title: string;
  label: string;
  description: string;
}) => {
  return (
    <Box
      sx={{
        width: { md: '324px' },
        border: '1px solid #EEEEEE',
        padding: { md: '30px' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: { md: '0 30px 30px 0' },
      }}
    >
      <Typography
        className={ibarra.className}
        sx={{
          color: '#315316',
          fontSize: '48px',
          fontWeight: 700,
          lineHeight: '125.5%',
        }}
      >
        {title}
      </Typography>
      <Typography
        className={hindMadurai.className}
        sx={{
          color: '#121212',
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: '115.5%',
          padding: { md: '30px 0 20px 0' },
        }}
      >
        {label}
      </Typography>
      <Typography
        className={hindMadurai.className}
        sx={{
          color: '#3E3E3E',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: ' 180% ',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default IntroItem;

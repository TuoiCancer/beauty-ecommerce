import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import ImageItem from '../base/ImageItem';

const CategoryItem = ({
  pathImg,
  title,
  description,
}: {
  pathImg: string;
  title: string;
  description: string;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: { md: '405px' },
        height: { md: '276px' },
        mr: { md: '32px' },
        pl: { md: '64px' },
        '&:hover': {
          cursor: 'pointer',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <ImageItem imgSrc={pathImg} width="60px" height="60px" />
      <Typography
        variant="h3"
        sx={{
          mt: { md: '24px' },
          mb: { md: '16px' },
          color: '#171B1A',
          fontSize: { md: '30px' },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { md: '16px' },
          color: '#6D6D6D',
          lineHeight: { md: '125%' },
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default CategoryItem;

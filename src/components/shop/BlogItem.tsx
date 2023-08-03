import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ImageItem from '../base/ImageItem';

const BlogItem = () => {
  return (
    <Box
      sx={{
        width: { md: '466px' },
        margin: { md: '0 10px' },
        '& p': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          webkitLineClamp: 1,
          webkitBoxOrient: 'vertical',
        },
      }}
    >
      <ImageItem
        imgSrc="/img/blog.png"
        style={{
          width: '100%',
          height: { md: '345px' },
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: '#000',
          fontSize: '32px',
          fontWeight: 400,
          lineHeight: ' 102%' /* 32.64px */,
          textTransform: 'capitalize',
          pt: { md: '32px' },
          pb: { md: '8px' },
        }}
      >
        Skincare brands for women Skincare brands for women
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#6B6765',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '170%' /* 27.2px */,
          letterSpacing: ' 0.32px',
          pb: { md: '74px' },
        }}
      >
        Justo maecenas facilisi cursus fermentum enim viverra. Skincare brands
        for women
      </Typography>
      <Box
        sx={{
          '& a': {
            color: '#6B6765',
            fontSize: '17px',
            fontWeight: 600,
            letterSpacing: ' 2.04px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            underline: 'none',
            transition: 'all 0.3s linear',
            '&:hover': {
              color: '#000',
            },
          },
        }}
      >
        <Link href="#">read blogs </Link>
      </Box>
    </Box>
  );
};

export default BlogItem;

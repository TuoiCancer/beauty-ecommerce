import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ImageItem from '../base/ImageItem';

const BlogItem = () => {
  return (
    <Box
      sx={{
        width: { xs: '100%', xl: '440px' },
        margin: { xs: '0 0 36px 0', md: '12px 10px', lg: '0' },
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: { lg: 'wrap' },
        flexDirection: { xs: 'column', sm: 'row', lg: 'column' },
      }}
    >
      <ImageItem
        imgSrc="/img/blog.png"
        style={{
          width: { xs: '100%', sm: '240px', md: '320px', lg: '100%' },
          height: { xs: '180px', sm: '240px', md: '345px' },
        }}
      />
      <Box
        sx={{
          flex: 1,
          width: '100%',
          ml: { sm: '12px', md: '32px', lg: 0 },
          padding: { lg: '0 0 0 20px' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: '#000',
            fontSize: { xs: '24px', md: '32px' },
            fontWeight: 400,
            lineHeight: ' 102%' /* 32.64px */,
            textTransform: 'capitalize',
            pt: { xs: '16px', md: '32px' },
            mb: { xs: '12px', md: '8px' },
            // textOverflow: 'ellipsis',
            overflow: 'hidden',
            display: ' -webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            maxWidth: '100%',
          }}
        >
          Skincare brands for women Skincare brands for women
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#6B6765',
            fontSize: { xs: '14px', md: '16px' },
            fontWeight: 400,
            lineHeight: '170%' /* 27.2px */,
            letterSpacing: ' 0.32px',
            mb: { xs: '12px', md: '74px' },
            overflow: 'hidden',
            display: ' -webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            maxWidth: '100%',
          }}
        >
          Justo maecenas facilisi cursus fermentum enim viverra. Skincare brands
          for women Justo maecenas facilisi cursus fermentum enim viverra.
          Skincare brands for women Justo maecenas facilisi cursus fermentum
          enim viverra. Skincare brands for women Justo maecenas facilisi cursus
          fermentum enim viverra. Skincare brands for women
        </Typography>
        <Box
          sx={{
            '& a': {
              color: '#6B6765',
              fontSize: { xs: '14px', md: '17px' },
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
          <Link href="/blog">read blogs </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogItem;

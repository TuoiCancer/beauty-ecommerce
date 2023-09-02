import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ImageItem from '../base/ImageItem';

const BrandItem = ({
  brandName,
  imgSrc,
  link,
}: {
  brandName: string;
  imgSrc: string;
  link: string;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: { xs: '12px', md: '20px' },
        boxShadow: {
          xs: '0px 4px 4px rgba(155, 155, 155, 0.25)',
          md: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
        width: { xs: '50%', md: '260px', lg: '324px' },
        height: { xs: '180px', md: '200px', lg: '249px' },
        my: { xs: '24px', md: '0px' },
        '& img': {
          padding: { xs: '24px  !important ', md: '30px !important' },
        },
        '&:hover': {
          transform: { md: 'translateX(3px)' },
        },
      }}
    >
      <Link href={link}>
        <ImageItem
          imgSrc={imgSrc}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '20px',
            '& img': {
              objectFit: 'contain',
            },
          }}
        />
      </Link>
    </Box>
  );
};

export default BrandItem;

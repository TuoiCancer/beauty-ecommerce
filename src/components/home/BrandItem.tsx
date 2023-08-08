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
        borderRadius: { md: '20px' },
        boxShadow: { md: '0px 4px 4px rgba(0, 0, 0, 0.25)' },
        width: { md: '372px' },
        height: { md: '249px' },

        '& img': {
          padding: { md: '30px !important' },
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

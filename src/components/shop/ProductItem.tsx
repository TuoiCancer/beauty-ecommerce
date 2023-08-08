import { poppins } from '@/assets/font';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ImageItem from '../base/ImageItem';
import Options from './Options';

const ProductItem = ({
  imgSrc,
  productName,
  productType,
  price,
}: {
  imgSrc: string;
  productName: string;
  productType: string;
  price: string;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: { md: '320px' },
        mb: { md: '62px' },
        overflow: 'hidden',
        transition: 'all 0.3s linear',
        position: 'relative',
        '&:hover': {
          cursor: 'pointer',
          '& > div:nth-of-type(1)': {
            display: 'block',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: { md: '420px' },
          position: 'absolute',
          top: '0',
          left: '0',
          display: 'none',
          transition: 'all 0.3s linear',
        }}
      >
        {/* Layer  */}
        <Box
          sx={{
            width: '100%',
            height: { md: '420px' },
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '1',
            overflow: 'hidden',
            backgroundColor: '#000',
            opacity: '0.5',
          }}
        />
        {/* List Options */}
        <Box
          sx={{
            position: 'absolute',
            zIndex: '3',
            top: '20%',
            right: '10%',
          }}
        >
          <Options iconSrc="/img/Cart_000.png" />
          <Options iconSrc="/img/Heart.png" />
          <Link href="/product/1">
            <Options iconSrc="/img/Eye.png" />
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: { md: '420px' },
          overflow: 'hidden',
        }}
      >
        <ImageItem
          imgSrc={imgSrc}
          style={{
            width: '100%',
            height: '100%',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
      </Box>
      <Typography
        variant="h3"
        className={poppins.className}
        sx={{
          mt: { md: '18px' },
          color: '#000',
          fontSize: { md: '20px' },
          textOverflow: 'ellipsis',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontWeight: '400',
          maxWidth: { md: '100%' },
          whiteSpace: 'nowrap',
        }}
      >
        {productName}
      </Typography>
      <Typography
        variant="h5"
        className={poppins.className}
        sx={{
          color: '#000',
          fontSize: { md: '15px' },
          fontWeight: '300',
          my: { md: '4px' },
        }}
      >
        {productType}
      </Typography>
      <Typography
        variant="h5"
        className={poppins.className}
        sx={{
          color: '#406D1C',
          fontSize: { md: '30px' },
          fontWeight: '400',
        }}
      >
        ${price}
      </Typography>
    </Box>
  );
};

export default ProductItem;

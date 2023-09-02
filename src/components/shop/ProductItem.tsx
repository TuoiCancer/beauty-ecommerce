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
        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
        alignItems: 'center',
        width: { xs: '100%', md: '280px', lg: '280px' },
        mb: { xs: '24px', md: '32px', lg: '62px' },
        overflow: 'hidden',
        transition: 'all 0.3s linear',
        '&:hover': {
          cursor: 'pointer',
          '& #layer_product': {
            display: 'block',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: { xs: '200px', md: '360px' },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          id="layer_product"
          sx={{
            width: '100%',
            height: { xs: '200px', md: '420px' },
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
              height: { xs: '200px', md: '420px' },
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
              top: { xs: '50%' },
              right: { xs: '12px' },
              transform: { xs: 'translate(0,-50%)' },
            }}
          >
            <Options iconSrc="/img/Cart_000.png" />
            <Options iconSrc="/img/Heart.png" />
            <Link href="/product/1">
              <Options iconSrc="/img/Eye.png" />
            </Link>
          </Box>
        </Box>
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
      <Box
        sx={{
          ml: { sm: '20px' },
          mt: { xs: '8px', md: '18px' },
          width: '100%',
        }}
      >
        <Typography
          variant="h3"
          className={poppins.className}
          sx={{
            mt: { xs: '8px', md: '18px' },
            color: '#000',
            fontSize: { xs: '18px', md: '20px' },
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontWeight: '400',
            display: '-webkit-box',
            textOverflow: 'ellipsis',
          }}
        >
          {productName} {productName}
        </Typography>
        <Typography
          variant="h5"
          className={poppins.className}
          sx={{
            color: '#000',
            fontSize: { xs: '14px', md: '15px' },
            fontWeight: '300',
            my: { xs: '2px' },
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
    </Box>
  );
};

export default ProductItem;

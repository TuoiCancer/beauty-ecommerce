'use client';

import { ibarra } from '@/assets/font';
import ImageItem from '@/components/base/ImageItem';
import PaginationItem from '@/components/product/Pagination';
import Pagination from '@/components/product/Pagination';
import SidebarProduct from '@/components/product/Sidebar';
import ProductItem from '@/components/shop/ProductItem';
import { listProduct } from '@/constants';
import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

const ProductPage = () => {
  const [rowPerPage, setRowPerPage] = React.useState(12);
  return (
    <Box
      sx={{
        pb: '1000px',
        pt: { md: '300px' },
      }}
    >
      {/* Search Box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          className={ibarra.className}
          variant="h2"
          sx={{
            color: '#121212',
            fontSize: { md: '48px' },
            fontWeight: 700,
            lineHeight: '125.5%',
          }}
        >
          Search
        </Typography>
        <Typography
          sx={{
            color: '#898989',
            fontSize: { md: '24px' },
            fontWeight: 200,
            padding: { md: '12px 0 90px 0' },
            maxWidth: { md: '1000px' },
            textAlign: 'center',
          }}
        >
          Find your perfect skincare solution with our comprehensive product
          search. Discover a wide range of skincare cosmetics for your unique
          needs.
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: { md: '1204px' },
          }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Search for... "
            sx={{
              width: '100%',
              background: '#FFF',
              '& input': {
                color: '#2D5210',
                padding: { md: '30px ' },
              },
              '& fieldset': {
                border: '1px solid rgba(56, 97, 23, 0.40)',
                borderRadius: '12px',
              },
              '&:hover': {
                '& fieldset': {
                  border: '1px solid rgba(56, 97, 23, 0.65)',
                },
              },
              '&:focus': {
                '& fieldset': {
                  border: '1px solid rgba(56, 97, 23, 0.40)',
                },
              },
            }}
          ></TextField>
          <ImageItem
            imgSrc="/img/Search.png"
            style={{
              width: { md: '52px' },
              height: { md: '52px' },
              position: 'absolute',
              right: { md: '30px' },
              top: { md: '16px' },
              zIndex: 1,
              cursor: 'pointer',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: { md: '1600px' },
          margin: '0 auto',
          padding: { md: '160px 0' },
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        {/* Sidebar */}
        <SidebarProduct />
        <Box
          sx={{
            ml: { md: '178px' },
          }}
        >
          {/* List Product */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { md: 'repeat(3, 1fr)' },
              gridGap: '32px',
            }}
          >
            {listProduct.map((item) => {
              return (
                <ProductItem
                  key={item.id}
                  imgSrc={item.image[0]}
                  productName={item.name}
                  productType={item.type}
                  price={`${item.price}`}
                />
              );
            })}
          </Box>
          {/* Pagination */}
          <PaginationItem
            setRowPerPage={setRowPerPage}
            rowPerPage={rowPerPage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;

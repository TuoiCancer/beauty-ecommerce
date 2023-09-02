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
        pb: { xs: '42px', md: '60px' },
        pt: { xs: '100px', md: '200px' },
        maxWidth: {
          xs: 'var(--max-width-xs)',
          sm: 'var(--max-width-sm)',
          md: 'var(--max-width-md)',
          lg: 'var(--max-width-lg)',
          xl: 'var(--max-width-xl)',
        },
        margin: '0 auto',
      }}
    >
      {/* Search Box */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mb: { xs: '42px' },
        }}
      >
        <Typography
          className={ibarra.className}
          variant="h2"
          sx={{
            color: '#121212',
            fontSize: { xs: '32px', md: '48px' },
            fontWeight: 700,
            lineHeight: '125.5%',
          }}
        >
          Search
        </Typography>
        <Typography
          sx={{
            color: '#898989',
            fontSize: { xs: '16px', md: '20px', lg: '24px' },
            fontWeight: 200,
            padding: { xs: '12px', md: '12px 0 40px 0', lg: '12px 0 60px 0' },
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
            width: { xs: '80%', xl: '1080px' },
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
                fontSize: { md: '18px' },
                padding: { md: '20px', lg: '24px' },
              },
              '& fieldset': {
                border: '1px solid rgba(56, 97, 23, 0.40) !important',
                borderRadius: '12px',
              },
            }}
          ></TextField>
          <ImageItem
            imgSrc="/img/Search.png"
            style={{
              width: { md: '42px' },
              height: { md: '42px' },
              position: 'absolute',
              right: { md: '2%' },
              top: { md: '50%' },
              zIndex: 1,
              cursor: 'pointer',
              transform: 'translate(0,-50%)',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: {
            xs: 'var(--max-width-xs)',
            sm: 'var(--max-width-sm)',
            md: 'var(--max-width-md)',
            lg: 'var(--max-width-lg)',
            xl: 'var(--max-width-xl)',
          },
          margin: '0 auto',
          padding: { sm: '0 14px', md: '80px 18px', xl: '100px 18px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
          }}
        >
          {/* Sidebar */}
          <SidebarProduct />
          {/* List Product */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
              },
              gridGap: '32px',
              mx: { xs: '12px', sm: 0 },
            }}
          >
            {listProduct.map((item) => {
              return (
                <ProductItem
                  key={item.id}
                  imgSrc={item.thumbnail}
                  productName={item.name}
                  productType={item.type}
                  price={`${item.price}`}
                />
              );
            })}
          </Box>
        </Box>
        {/* Pagination */}
        <PaginationItem setRowPerPage={setRowPerPage} rowPerPage={rowPerPage} />
      </Box>
    </Box>
  );
};

export default ProductPage;

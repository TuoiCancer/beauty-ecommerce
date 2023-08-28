'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import HeaderShopDetail from '@/components/shop/HeaderShopDetail';
import CategoryItem from '@/components/shop/CategoryItem';
import Title from '@/components/shop/Title';

//Icons
import { listCategory, listNews, listProduct } from '@/constants';
import ProductItem from '@/components/shop/ProductItem';
import Lefticon from '@/components/icon/Lefticon';
import Link from 'next/link';
import BlogItem from '@/components/shop/BlogItem';
import { poppins } from '@/assets/font';

const ShopPageDetail = () => {
  return (
    <Box>
      {/* Header */}
      <HeaderShopDetail />

      {/* Category */}
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          padding: { md: '208px 0 108px 0' },
        }}
      >
        <Box
          sx={{
            maxWidth: {
              md: 'var(--max-width-md)',
              lg: 'var(--max-width-lg)',
              xl: 'var(--max-width-xl)',
            },
            margin: '0 auto',
          }}
        >
          <Title title="Shop" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              mt: { md: '64px' },
            }}
          >
            {listCategory.map((item) => {
              if (item.title === 'All') {
                return null;
              }
              return (
                <CategoryItem
                  key={item.id}
                  pathImg={item.pathImg}
                  title={item.title}
                  description={item.description}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
      {/* Products */}
      <Box
        sx={{
          maxWidth: {
            md: 'var(--max-width-md)',
            lg: 'var(--max-width-lg)',
            xl: 'var(--max-width-xl)',
          },
          margin: '0 auto',
          pt: { md: '149px' },
          pb: { md: '132px' },
        }}
      >
        {/* Title */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Title title="Products" />
            <Typography
              className={poppins.className}
              variant="body1"
              sx={{ mt: '10px', color: '#000', fontSize: { md: '16px' } }}
            >
              women made purely natural ingredients, taken from the earth’s
              crust.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateX(4px)',
              },
            }}
          >
            <Typography
              variant="h3"
              className={poppins.className}
              sx={{
                color: '#000',
                fontSize: {
                  md: '20px',
                },
                mr: { md: '24px' },
              }}
            >
              View all
            </Typography>
            <Lefticon />
          </Box>
        </Box>
        {/* List products */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: { md: '74px' },
          }}
        >
          {listProduct.map((item) => {
            return (
              <ProductItem
                key={item.id}
                imgSrc={item.thumbnail}
                productName={item.name}
                productType={item.type}
                price={item.price.toFixed(2)}
              />
            );
          })}
        </Box>
      </Box>
      {/* Video */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: { md: '950px' },
            height: { md: '600px' },
            position: 'relative',
          }}
        >
          <video
            autoPlay={true}
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              flex: 1,
            }}
          >
            <source src="/video/loreal.mp4" />
          </video>
        </Box>

        <Box
          sx={{
            padding: { md: '114px  32px 118px 94px' },
            flex: 1,
            backgroundColor: '#F7F7F7',
          }}
        >
          <Title title="about L’Oréal " />
          <Typography
            variant="body1"
            sx={{
              mt: '32px',
              color: '#000',
              fontSize: '24px',
              fontWeight: 300,
              lineHeight: '187.5%' /* 45px */,
              letterSpacing: '2px',
            }}
          >
            Elivering financial performance while being a committed corporate
            citizen is probably our greatest source of pride. This is what
            motivates us to always go the extra mile...
          </Typography>
          <Box
            sx={{
              pt: { md: '88px' },
              '& a': {
                color: '#000',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '187.5%' /* 45px */,
                letterSpacing: '2px',
                textDecoration: 'none',
                underline: 'none',
              },
            }}
          >
            <Link href="/about">Learn more</Link>
          </Box>
        </Box>
      </Box>

      {/* News and Blogs */}
      <Box
        sx={{
          maxWidth: {
            md: 'var(--max-width-md)',
            lg: 'var(--max-width-lg)',
            xl: 'var(--max-width-xl)',
          },
          margin: '0 auto',
          pt: { md: '180px' },
          pb: { md: '200px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title title="Latest news" />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateX(4px)',
              },
            }}
          >
            <Typography
              variant="h3"
              className={poppins.className}
              sx={{
                color: '#000',
                fontSize: {
                  md: '20px',
                },
                mr: { md: '24px' },
              }}
            >
              View all
            </Typography>
            <Lefticon />
          </Box>
        </Box>
        {/* List news */}
        <Box
          sx={{
            pt: { md: '74px' },
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {listNews.map((item) => {
            return <BlogItem key={item.id} />;
          })}
        </Box>
      </Box>
      {/* Footer */}
    </Box>
  );
};

export default ShopPageDetail;

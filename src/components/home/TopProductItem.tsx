import { hindMadurai } from '@/assets/font';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import BaseButton from '../base/BaseButton';
import ImageItem from '../base/ImageItem';
import RatingItem from '../base/RatingItem';

const TopProductItem = ({ item }: any) => {
  return (
    <Link href={`product/${item.id}`}>
      <Box
        sx={{
          position: 'relative',
          border: '1px solid #EEE',
          background: '#FFF',
          mr: { md: '30px' },
          padding: { md: '244px 16px 32px 16px ' },
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 18px 36px 0px rgba(0, 0, 0, 0.07)',
            borderColor: '#6DC229',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-11%',
            left: '6%',
            zIndex: '1',
            border: '1px solid #EEE',
          }}
        >
          <ImageItem
            imgSrc={item.thumbnail}
            style={{
              width: { md: '300px' },
              height: { md: '268px' },
              '& img': {
                objectFit: 'cover !important',
              },
            }}
          />
        </Box>
        <Box>
          <Typography
            className={hindMadurai.className}
            variant="h5"
            sx={{
              color: '#121212',
              fontSize: '24px',
              fontWeight: 600,
              lineHeight: '115.5%',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              maxWidth: { md: '300px' },
              whiteSpace: 'nowrap',
            }}
          >
            {item.name}
          </Typography>
          <Typography
            className={hindMadurai.className}
            variant="h6"
            sx={{
              color: '#315316',
              fontSize: '20px',
              lineHeight: '150%',
              padding: { md: '12px 0' },
            }}
          >
            from {item.price} /item
          </Typography>
          <Typography
            sx={{
              color: '#3E3E3E',
              fontSize: ' 18px',
              lineHeight: '180%',
              pb: { md: '20px' },
              width: { md: '300px' },
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            className={hindMadurai.className}
          >
            {item.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <RatingItem numberOfRate={item.rate} />
              <Typography
                className={hindMadurai.className}
                sx={{
                  color: '#3E3E3E',
                  fontSize: '16px',
                  lineHeight: '180%',
                  fontWeight: 400,
                  ml: '10px',
                }}
              >
                ({item.inventory})
              </Typography>
            </Box>
            <BaseButton
              variant="contained"
              bgStyle="gradient"
              label="Shop now"
              styleSx={{
                ml: { md: '32px' },
                padding: { md: '8px 36px' },
                borderRadius: '50px',
                background: 'linear-gradient(146deg, #315316 0%, #72A748 100%)',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: '180%',
                textTransform: 'capitalize',
                width: { md: '123px' },
                whiteSpace: 'nowrap',
              }}
            />
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default TopProductItem;

import { poppins, roboto } from '@/assets/font';
import { Box, Checkbox, Typography } from '@mui/material';
import React from 'react';
import ImageItem from '../base/ImageItem';
import Lefticon from '../icon/Lefticon';

type Product = {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export interface CartItemProps {
  shopName: string;
  products: Product[];
}

const CartItem = ({ shopName, products }: CartItemProps) => {
  return (
    <Box
      sx={{
        mb: { md: '94px' },
      }}
    >
      {/* Header About Shop */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: { md: '24px 0' },
        }}
      >
        <ImageItem
          imgSrc="/img/store.png"
          style={{
            width: { md: '42px' },
            height: { md: '42px' },
          }}
        />
        <Typography
          className={roboto.className}
          variant="h3"
          sx={{
            color: '#626262',
            fontSize: '28px',
            fontWeight: 500,
            lineHeight: '125.5%',
            margin: { md: '0 16px' },
          }}
        >
          {shopName}
        </Typography>
        <Lefticon />
      </Box>
      {/* List Product in cart */}
      {products.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              margin: { md: '48px 0' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox
                sx={{
                  color: 'green',
                  '&.Mui-checked': {
                    color: 'green',
                  },
                  '& .MuiSvgIcon-root': { fontSize: 28 },
                }}
              />
              <ImageItem
                imgSrc={item.thumbnail}
                style={{
                  width: { md: '160px' },
                  height: { md: '160px' },
                  ml: { md: '24px' },
                }}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                margin: { md: '0 32px' },
              }}
            >
              <Typography
                variant="h3"
                className={roboto.className}
                sx={{
                  color: '#183A12',
                  fontSize: '26px',
                  fontWeight: 300,
                  lineHeight: '125.5%',
                  mb: { md: '12px' },
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="h3"
                className={poppins.className}
                sx={{
                  color: '#575757',
                  fontSize: '30px',
                  fontWeight: '400',
                }}
              >
                ${item.price.toFixed(2)}
              </Typography>
            </Box>
            <Box
              className={roboto.className}
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& p': {
                  color: '#737373',
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: '154.5%',
                  margin: { md: '0 24px' },
                  cursor: 'pointer',
                },
              }}
            >
              <Typography> - </Typography>
              <Typography
                variant="h5"
                sx={{
                  borderRadius: '4px',
                  background: '#F2F2F2',
                  padding: { md: ' 8px 12px ' },
                }}
              >
                {item.quantity}{' '}
              </Typography>
              <Typography> + </Typography>
            </Box>
            <Typography
              className={poppins.className}
              sx={{
                color: '#575757',
                fontSize: '30px',
                margin: { md: '0 42px' },
              }}
            >
              ${item.quantity * item.price}
            </Typography>
            <ImageItem
              imgSrc="/img/trash.png"
              style={{
                width: { md: '50px' },
                height: { md: '50px' },
                marginLeft: { md: 'auto' },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default CartItem;

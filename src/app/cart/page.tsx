'use client';
import { poppins, roboto } from '@/assets/font';
import BaseButton from '@/components/base/BaseButton';
import CartItem from '@/components/cart/CartItem';
import StepperItem from '@/components/cart/StepperItem';
import { cart } from '@/constants';
import { Box, Modal, TextField, Typography } from '@mui/material';
import React from 'react';

const CartPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        maxWidth: { md: '1600px' },
        margin: { md: '0 auto' },
        mt: { md: '240px' },
        mb: { md: '120px' },
      }}
    >
      <Typography
        className={roboto.className}
        variant="h1"
        sx={{
          color: '#000',
          fontSize: '48px',
          fontWeight: 500,
          lineHeight: '125.5%',
          textAlign: 'center',
          mb: { md: '92px' },
        }}
      >
        Shopping Cart
      </Typography>
      {/* Items in cart */}
      <Box>
        {cart.map((item, index) => {
          return (
            <CartItem
              key={index}
              shopName={item.shop.shopName}
              products={item.products}
            />
          );
        })}
      </Box>
      {/* Sub total */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography
            className={roboto.className}
            variant="h5"
            sx={{
              color: '#000',
              fontSize: '20px',
              fontWeight: 300,
              lineHeight: '125.5%',
              mr: { md: '24px' },
            }}
          >
            Voucher code
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            sx={{
              '& fieldset': {
                borderColor: '#A2C18A !important',
              },
            }}
          />
          <BaseButton
            bgStyle="color"
            label="Apply"
            variant="contained"
            styleSx={{
              ml: { md: '42px' },
              p: { md: '8px 30px' },
              borderRadius: '8px',
              background: '#204700',
              color: '#fff',
              fontSize: '20px',
              '&:hover': {
                background: '#2b5c02',
              },
            }}
          />
        </Box>
        <Box
          sx={{
            '& h5': {
              color: '#000',
              fontSize: '28px',
              fontWeight: 300,
              lineHeight: '125.5%',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mb: { md: '32px' },
            }}
          >
            <Typography variant="h5">Voucher: </Typography>
            <Typography
              variant="h6"
              className={poppins.className}
              sx={{
                color: '#575757',
                fontFamily: 'Poppins',
                fontSize: '24px',
                ml: { md: '24px' },
              }}
            >
              $0
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5">Sub total:</Typography>
            <Typography
              variant="h3"
              sx={{
                color: '#575757',
                fontFamily: 'Poppins',
                fontSize: '32px',
                ml: { md: '12px' },
              }}
            >
              $0
            </Typography>
          </Box>
        </Box>
      </Box>
      <BaseButton
        onClick={handleOpen}
        bgStyle="gradient"
        label="Checkout"
        variant="contained"
        styleSx={{
          padding: { md: '8px 30px' },
          background: 'linear-gradient(146deg, #315316 0%, #72A748 100%)',
          textTransform: 'none',
          borderRadius: '0',
          fontSize: '20px',
          fontWeight: 400,
          marginLeft: 'auto',
          '&:hover': {
            background: 'linear-gradient(146deg, #315316 0%, #72A748 100%)',
          },
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: { md: '776px' },
            height: { md: '780px' },
            borderRadius: '4px',
            background: '#FFF',
            margin: { md: '80px auto' },
            padding: { md: '50px 45px 70px 45px' },
            overflowY: 'scroll',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': {
              backgroundColor: '#fff',
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {},
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#A4C18A',
              width: '2px',
              borderRadius: '20px',
            },
          }}
        >
          <StepperItem />
        </Box>
      </Modal>
    </Box>
  );
};

export default CartPage;

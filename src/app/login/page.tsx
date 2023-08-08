'use client';

import BaseButton from '@/components/base/BaseButton';
import { Box, TextField, Typography } from '@mui/material';
import Image from 'next/legacy/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { poppins } from '@/assets/font';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [typeInputPassword, setTypeInputPassword] = React.useState(true);
  return (
    <Box
      sx={{
        backgroundColor: 'var(--bg-login)',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'var(--bg-login)',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          {/* Logo Header */}
          <Box
            sx={{
              width: { md: '240px' },
              height: { md: '64px' },
              objectFit: 'contain',
              position: 'relative',
              mb: '52px',
              ml: { md: '68px' },
              mt: { md: '42px' },
            }}
          >
            <Image
              layout="fill"
              src="/img/logo/logoWeb.svg"
              alt="Picture of the author"
            />
          </Box>
          <Box
            sx={{
              width: { md: '385px' },
              height: { md: '367px' },
              objectFit: 'contain',
              position: 'relative',
              mt: { md: '118px' },
              ml: { md: '190px' },
            }}
          >
            <Image
              layout="fill"
              src="/img/shapes.png"
              alt="Picture of the author"
            />
          </Box>
          <Box
            sx={{
              backgroundColor: '#95BFB5',
              width: { md: '657px' },
              height: { md: '1px' },
            }}
          />
        </Box>
        {/* Form Login */}
        <Box
          sx={{
            flex: 1,
            background: ' #FFF',
            boxShadow: ' 12px 12px 24px -3px rgba(126, 126, 126, 0.22)',
            width: { md: '545px' },
            height: { md: '618px' },
            borderRadius: { md: '40px' },
            marginTop: { md: '170px' },
            padding: { md: '56px 26px 72px 40px ' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* header  */}
          <Typography
            variant="h1"
            sx={{
              fontSize: '52px',
              fontWeight: '600',
              color: ' #004339',
              mb: { md: '12px' },
            }}
          >
            Login
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: '18px', fontWeight: '400', color: ' #6D827F' }}
          >
            Natural cosmetic purity for every skin
          </Typography>
          <TextField
            type="email"
            variant="outlined"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mt: '75px',
              width: { md: '100%' },
              height: { md: '52px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                background: '#F8F8F9',
                border: '1px solid #EBEBEB',
                input: {
                  padding: '16px 24px',
                },
                fieldset: {
                  border: 'none',
                },
              },
            }}
          />
          {/* Inputs */}
          <Box
            sx={{
              position: 'relative',
              mt: '30px',
              width: { md: '100%' },
              height: { md: '52px' },
            }}
          >
            <TextField
              type={typeInputPassword ? 'password' : 'text'}
              variant="outlined"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                width: { md: '100%' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  background: '#F8F8F9',
                  border: '1px solid #EBEBEB',
                  input: {
                    padding: '16px 24px',
                  },
                  fieldset: {
                    border: 'none',
                  },
                },
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                top: '32%',
                right: '24px',
                color: '#9D9D9D',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: 300,
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onClick={() => {
                setTypeInputPassword(!typeInputPassword);
              }}
            >
              Hide
            </Typography>
          </Box>

          <BaseButton
            styleSx={{
              mt: '60px',
              backgroundColor: '#2C8578',
              padding: '12px 80px',
              fontSize: '20px',
              fontWeight: '500',
              borderRadius: ' 5px',
              '&:hover': { backgroundColor: '#2C8578', opacity: '0.9' },
            }}
            label="Login"
            variant="contained"
            bgStyle="color"
            type="button"
            onClick={() => {
              router.push('/home');
            }}
          />
          <Box
            sx={{
              mt: { md: '32px' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { md: '100%' },
            }}
          >
            <Typography
              className={poppins.className}
              sx={{
                fontSize: '15px',
                color: '#000',
                fontWeight: '400',
                marginRight: '8px',
              }}
            >
              Don’t have an account ?
            </Typography>
            <Typography
              className={poppins.className}
              sx={{
                fontSize: '18px',
                color: '#000',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s linear',
                '&:hover': {
                  color: '#2C8578',
                },
              }}
              onClick={() => {
                router.push('/signup');
              }}
            >
              Request now
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            sx={{
              width: { md: '676px' },
              height: { md: '587px' },
              objectFit: 'cover',
              position: 'relative',
            }}
          >
            <Image
              layout="fill"
              src="/img/bg_login.png"
              alt="Picture of the author"
            />
          </Box>

          <Box
            sx={{
              backgroundColor: '#95BFB5',
              width: { md: '100%' },
              height: { md: '1px' },
            }}
          />
        </Box>
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: '#3F3F3F',
          fontWeight: '500',
          fontSize: '15px',
          textAlign: 'center',
          bottom: '20px',
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        Copyright by @xuantuoi 2023 | Privacy Policy
      </Typography>
    </Box>
  );
};

export default LoginPage;

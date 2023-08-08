'use client';

import BaseButton from '@/components/base/BaseButton';
import FormInput from '@/components/login/FormInput';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'next/legacy/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { poppins } from '@/assets/font';

const SignupPage = () => {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  return (
    <Box
      sx={{
        backgroundColor: 'var(--bg-signup)',
        height: '100vh',
        padding: '42px 0 0 68px',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        {/* Logo header */}
        <Box
          sx={{
            width: { md: '240px' },
            height: { md: '64px' },
            objectFit: 'contain',
            position: 'relative',
            mb: '52px',
          }}
        >
          <Image
            layout="fill"
            src="/img/logo/logoWeb.svg"
            alt="Picture of the author"
          />
        </Box>
        {/* Text header */}
        <Box>
          <Typography
            variant="h1"
            sx={{
              color: '#fff',
              fontSize: '96px',
              textTransform: 'uppercase',
              fontWeight: '800',
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: '#FFF',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 400,
              mb: '76px',
            }}
          >
            Create your account and get personalized care
          </Typography>
        </Box>
        {/* Form */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: { md: '640px' },
          }}
        >
          <Box>
            <FormInput
              label="Fullname"
              type="text"
              typeOfVariant="outlined"
              placeholder="Xuan Tuoi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <FormInput
              label="Email"
              type="text"
              typeOfVariant="outlined"
              placeholder="xuantuoi@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              label="Password"
              type="password"
              typeOfVariant="outlined"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <BaseButton
              label="Sign up"
              variant="contained"
              bgStyle="color"
              styleSx={{
                margin: '42px 0 20px 0',
                padding: '12px 80px',
                fontSize: '20px',
                fontWeight: '500',
                borderRadius: ' 5px',
                background: '#DD8D63',
                '&:hover': {
                  background: '#e37c46',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                className={poppins.className}
                sx={{
                  color: '#A77A63',
                  fontSize: '15px',
                  fontWeight: '400',
                }}
              >
                Already have an account?{' '}
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: '#A77A63',
                  fontSize: '18px',
                  textTransform: 'unset',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'unset',
                    color: '#DD8D63',
                  },
                }}
                onClick={() => router.push('/login')}
              >
                Log in
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: ' 100%',
          height: '100%',
          objectFit: 'contain',
          position: 'relative',
          flex: 1,
        }}
      >
        <Image
          priority
          layout="fill"
          src="/img/bg_signup.jpg"
          alt="Picture of the author"
        />
      </Box>
    </Box>
  );
};

export default SignupPage;

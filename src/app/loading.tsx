'use client';
import React from 'react';

import { Box, keyframes } from '@mui/material';

const Loading = () => {
  const bounce = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -2.6rem, 0);
  }
`;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#F6F4F1',
      }}
    >
      <Box
        sx={{
          width: '2rem',
          height: '2rem',
          margin: '3rem 1rem',
          background: 'var(--main-green)',
          borderRadius: '50%',
          animation: `0.9s ${bounce} infinite alternate`,
        }}
      ></Box>
      <Box
        sx={{
          width: '2rem',
          height: '2rem',
          margin: '3rem 1rem',
          background: 'var(--main-green)',
          borderRadius: '50%',
          animation: `0.9s ${bounce} infinite alternate`,
          animationDelay: '0.2s',
        }}
      ></Box>
      <Box
        sx={{
          width: '2rem',
          height: '2rem',
          margin: '3rem 1rem',
          background: 'var(--main-green)',
          borderRadius: '50%',
          animation: `0.9s ${bounce} infinite alternate`,
          animationDelay: '0.4s',
        }}
      ></Box>
    </Box>
  );
};

export default Loading;

import { Box } from '@mui/material';
import React from 'react';
import ImageItem from '../base/ImageItem';

const Options = ({ iconSrc }: { iconSrc: string }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '50%',
        width: { xs: '32px', md: '46px' },
        height: { xs: '32px', md: '46px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: ' drop-shadow(0px 0px 10px rgba(229, 229, 229, 0.40))',
        transition: 'all 0.2s ease-in-out',
        mb: { xs: '8px', md: '16px' },

        '&:hover': {
          backgroundColor: '#6FD15D',
        },
      }}
    >
      <ImageItem
        imgSrc={iconSrc}
        style={{
          width: { xs: '16px', md: '25px' },
          height: { xs: '16px', md: '23px' },
        }}
      />
    </Box>
  );
};

export default Options;
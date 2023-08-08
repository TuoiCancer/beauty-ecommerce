import ImageItem from '@/components/base/ImageItem';
import { Box } from '@mui/material';
import React from 'react';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        pt: '100px',
      }}
    >
      <ImageItem
        imgSrc="/img/notfound.png"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
    </Box>
  );
};

export default PageNotFound;

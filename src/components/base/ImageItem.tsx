import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const ImageItem = ({
  imgSrc,
  width,
  height,
  style,
}: {
  imgSrc: string;
  width?: string;
  height?: string;
  style?: any;
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: `${height}`,
        width: `${width}`,
        ...style,
      }}
    >
      <Image
        src={imgSrc}
        fill
        alt="image"
        style={{
          objectFit: 'cover',
        }}
      />
    </Box>
  );
};

export default ImageItem;

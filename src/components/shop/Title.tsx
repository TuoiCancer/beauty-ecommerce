import { unicaOne } from '@/assets/font';
import { Typography } from '@mui/material';
import React from 'react';

const Title = ({ title }: { title: string }) => {
  return (
    <Typography
      variant="h2"
      className={unicaOne.className}
      sx={{
        fontSize: { md: '56px' },
        textTransform: 'uppercase',
        color: '#171B1A',
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;

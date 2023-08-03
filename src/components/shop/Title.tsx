import { Typography } from '@mui/material';
import { Unica_One } from 'next/font/google';
import React from 'react';
const unicaOne = Unica_One({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['normal'],
});
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

import React from 'react';

import { Box, Typography } from '@mui/material';
import { Ibarra_Real_Nova } from 'next/font/google';
import Link from 'next/link';
const ibarra = Ibarra_Real_Nova({
  display: 'swap',
  subsets: ['latin-ext'],
  style: 'normal',
});

interface ListItem {
  id: string;
  label: string;
  link: string;
}
// Define the type for the component props
export interface FooterProps {
  title: string;
  listItems: ListItem[];
}
const FooterItem = ({ title, listItems }: FooterProps) => {
  return (
    <Box
      sx={{
        pt: { xs: '24px', md: '40px' },
      }}
    >
      <Typography
        variant="h2"
        className={ibarra.className}
        sx={{
          fontSize: { xs: '24px', md: '32px' },
          fontWeight: 600,
          color: '#fff',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          marginTop: { xs: '16px', md: '30px' },
          '& a': {
            color: '#FFF',
            fontSize: { xs: '16px', md: '18px' },
            lineHeight: '145%',
            textDecoration: 'none',
            marginBottom: { xs: '16px', md: '32px' },
          },
        }}
      >
        {listItems.map((item) => {
          return (
            <Link key={item.id} href={item?.link || ''}>
              {item.label}
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default FooterItem;

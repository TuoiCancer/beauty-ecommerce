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
        pt: { md: '40px' },
      }}
    >
      <Typography
        variant="h2"
        className={ibarra.className}
        sx={{
          fontSize: '32px',
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
          alignItems: 'flex-start',
          marginTop: '30px',
          '& a': {
            color: '#FFF',
            fontSize: '18px',
            lineHeight: '145%',
            textDecoration: 'none',
            marginBottom: '32px',
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

'use client';
import Footer from '@/components/Footer/Footer';

import Header from '@/components/Header/Header';
import { useStore } from '@/store';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [y, setY] = useState(0);
  const { UserSlice } = useStore();

  const handleScroll = () => {
    setY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <Header
        isHaveShadow={true}
        isHaveBg={true}
        textColor="#000"
        style={{
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      />
      {y > 500 && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 999,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ':hover': {
              transform: 'translateY(-6px)',
            },
          }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <VerticalAlignTopIcon />
        </Box>
      )}
      {children}
      <Footer />
    </>
  );
}

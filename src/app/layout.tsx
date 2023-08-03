'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Box } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import { usePathname } from 'next/navigation';

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import Header from '@/components/Header/Header';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Glow & Grace',
  description: 'Beauty Ecommerce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [x, setX] = useState(0);

  const handleScroll = () => {
    setX(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <Box>
            {x > 500 && (
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
            {/* Header */}
            {pathname !== '/signup' &&
              pathname !== '/login' &&
              pathname.includes('shop') && (
                <Header
                  isHaveShadow={false}
                  isHaveBg={false}
                  textColor="#fff"
                  style={{
                    position: 'absolute',
                    top: '40px',
                    left: 0,
                    right: 0,
                    zIndex: 999,
                  }}
                />
              )}
            {pathname === '/home' && (
              <Header
                isHaveShadow={true}
                isHaveBg={true}
                textColor="#000"
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: 0,
                  right: 0,
                  zIndex: 999,
                }}
              />
            )}
            {children}
            {pathname !== '/signup' && pathname !== '/login' && <Footer />}
          </Box>
        </Suspense>
      </body>
    </html>
  );
}

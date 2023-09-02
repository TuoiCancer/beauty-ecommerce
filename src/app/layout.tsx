'use client';
import './globals.css';
import type { Metadata } from 'next';
import { Box } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import Footer from '@/components/Footer/Footer';
import { usePathname, useRouter } from 'next/navigation';

import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import Header from '@/components/Header/Header';
import Loading from './loading';
import { roboto } from '@/assets/font';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { motion } from 'framer-motion';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/service/react-query/client';
import { useStore } from '@/store';

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
  const route = useRouter();
  const { UserSlice } = useStore();
  // useEffect(() => {
  //   if (UserSlice.isLoggedIn) {
  //     route.push('/home');
  //   } else {
  //     route.push('/login');
  //   }
  // }, []);

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
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loading />}>
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
              {pathname.includes('/shop') && (
                <Header
                  isHaveShadow={false}
                  isHaveBg={false}
                  textColor="#fff"
                  style={{
                    position: 'absolute',
                    top: { xs: 0, lg: '40px' },
                    left: 0,
                    right: 0,
                    zIndex: 999,
                  }}
                />
              )}
              {pathname !== '/signup' &&
                pathname !== '/login' &&
                pathname !== '/' &&
                !pathname.includes('shop') && (
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
                )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {children}
              </motion.div>
              {pathname !== '/signup' &&
                pathname !== '/login' &&
                pathname !== '/' && <Footer />}
              <ToastContainer />
            </Box>
          </Suspense>
        </QueryClientProvider>
      </body>
    </html>
  );
}

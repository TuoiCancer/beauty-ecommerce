'use client';
import { motion } from 'framer-motion';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
      <Footer />
    </>
  );
}

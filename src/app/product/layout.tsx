// 'use client';
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
        isHaveShadow={true}
        isHaveBg={true}
        textColor="#000"
        style={{
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      />
      {children}
      <Footer />
    </>
  );
}

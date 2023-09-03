import { Metadata } from 'next';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import Loading from './loading';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { queryClient } from '@/service/react-query/client';

export const metadata: Metadata = {
  title: 'Glow & Grace',
  description: 'Beauty Ecommerce',
  keywords: ['Glow & Grace', 'Beauty Ecommerce'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <QueryClientProvider client={queryClient}> */}
        <Suspense fallback={<Loading />}>
          {children}
          <ToastContainer />
        </Suspense>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
}

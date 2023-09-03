import { Metadata } from 'next';

import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import Loading from './loading';

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
        <Suspense fallback={<Loading />}>
          {children}
          <ToastContainer />
        </Suspense>
      </body>
    </html>
  );
}

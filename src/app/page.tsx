'use client';

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserSlice from '@/store/UserSlice';
import { useStore } from '@/store';

const Homepage = () => {
  const route = useRouter();
  const { UserSlice } = useStore();
  useEffect(() => {
    if (UserSlice.isLoggedIn) {
      route.push('/home');
    } else {
      route.push('/login');
    }
  }, []);
};

export default Homepage;

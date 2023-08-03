'use client';

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const route = useRouter();
  useEffect(() => {
    return route.push('/signup');
  }, []);
};

export default Homepage;

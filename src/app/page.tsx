'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const route = useRouter();
  return route.push('/signup');
};

export default Homepage;

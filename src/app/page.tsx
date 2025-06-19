'use client';
import { useRef } from 'react';
import LatestRelease from '@/components/sections/LatestRelease';
import NextRelease from '@/components/sections/NextRelease';
import AboutUs from '@/components/sections/AboutUs';
import Shop from '@/components/sections/Shop';
import LatestVideo from '@/components/sections/LatestVideo';

export default function Home() {
  const ref = useRef(null);

  return (
    <div ref={ref} className='relative'>
      <LatestRelease />
      <LatestVideo />
      <NextRelease />
      <AboutUs />
      <Shop />
    </div>
  );
}

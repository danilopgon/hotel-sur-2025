'use client';
import NextRelease from '@/components/sections/NextRelease';
import AboutUs from '@/components/sections/AboutUs';
import Shop from '@/components/sections/Shop';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef(null);

  return (
    <div ref={ref} className='relative'>
      <div className='relative z-10 min-h-[350vh] overflow-hidden'>
        <NextRelease />
        <AboutUs />
        <Shop />
      </div>
    </div>
  );
}

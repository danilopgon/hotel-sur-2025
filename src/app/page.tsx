'use client';
import Hero from '@/components/sections/Hero';
import SecondSection from '@/components/sections/SecondSection';
import ThirdSection from '@/components/sections/ThirdSection';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef(null);

  return (
    <div ref={ref} className='relative'>
      <div className='relative z-10 min-h-[350vh]'>
        <Hero />
        <SecondSection />
        <ThirdSection />
      </div>
    </div>
  );
}

'use client';
import {useRef} from 'react';
import Hero from '@/components/sections/Hero';
import AboutUs from '@/components/sections/AboutUs';
import Shop from '@/components/sections/Shop';
import Releases from "@/components/sections/Releases";

export default function Home() {
    const ref = useRef(null);

    return (
        <div ref={ref} className='relative'>
            <Hero/>
            <Releases/>
            <AboutUs/>
            <Shop/>
        </div>
    );
}

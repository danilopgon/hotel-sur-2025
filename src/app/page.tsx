'use client';
import {useRef} from 'react';
import TrasLaTormenta from '@/components/sections/TrasLaTormenta';
import AguasRojas from '@/components/sections/AguasRojas';
import AboutUs from '@/components/sections/AboutUs';
import Shop from '@/components/sections/Shop';
import TrasLaTormentaVideo from '@/components/sections/TrasLaTormentaVideo';
import AguasRojasVideo from "@/components/sections/AguasRojasVideo";
import NextRelease from "@/components/sections/NextRelease";

export default function Home() {
    const ref = useRef(null);

    return (
        <div ref={ref} className='relative'>
            <TrasLaTormenta/>
            <TrasLaTormentaVideo/>
            <AguasRojas/>
            <AguasRojasVideo/>
            <NextRelease/>
            <AboutUs/>
            <Shop/>
        </div>
    );
}

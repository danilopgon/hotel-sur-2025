'use client';
import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useReduceMotion} from '@/hooks/useReduceMotion';

gsap.registerPlugin(ScrollTrigger);

export default function AguasRojas() {
    const bgRef = useRef<HTMLDivElement>(null);
    const grainRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReduceMotion();

    useEffect(() => {
        if (reduceMotion) return;

        gsap.to(bgRef.current, {
            y: -30,
            scale: 1.25,
            scrollTrigger: {
                trigger: bgRef.current,
                start: 'top top',
                end: '+=400',
                scrub: true,
            },
        });

        gsap.fromTo(
            grainRef.current,
            {opacity: 0.8},
            {
                opacity: 1,
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top top',
                    end: 'top+=400 top',
                    scrub: true,
                },
            }
        );

        gsap.to(textRef.current, {
            opacity: 0,
            y: -30,
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top+=150 top',
                end: 'top+=400 top',
                scrub: true,
            },
        });
    }, [reduceMotion]);

    return (
        <section
            className='relative h-[160vh]'
            aria-labelledby='next-release-title'
        >
            <div
                className='sticky top-0 h-screen w-full overflow-hidden'
                aria-hidden='true'
            >
                <div
                    ref={bgRef}
                    className='absolute inset-0 z-0'
                    style={{
                        backgroundImage: "url('/images/aguas-rojas.webp')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                    }}
                />
                <div
                    ref={grainRef}
                    className='absolute inset-0 z-10 pointer-events-none mix-blend-soft-light'
                    style={{
                        backgroundImage: "url('/images/ruido.gif')",
                        backgroundRepeat: 'repeat',
                    }}
                />
            </div>

            <div className='absolute top-0 w-full h-screen flex justify-end items-end p-6 md:p-12 z-20'>
                <hgroup
                    ref={textRef}
                    aria-label='Información del próximo lanzamiento'
                    className='pb-24 md:pb-36 text-right text-white drop-shadow-lg'
                >
                    <h1
                        id='next-release-title'
                        className='text-4xl md:text-7xl font-bold uppercase'
                    >
                        Aguas Rojas I
                    </h1>
                    <h3 className='text-xl md:text-2xl mt-4 uppercase'>
                        &#34;Sienta bien el aire en la cara&#34;
                    </h3>
                </hgroup>
            </div>
        </section>
    );
}

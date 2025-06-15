'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function NextRelease() {
  const bgRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) return;

    gsap.to(bgRef.current, {
      y: -50,
      scale: 1.5,
      scrollTrigger: {
        trigger: bgRef.current,
        start: 'top top',
        end: '+=700',
        scrub: true,
      },
    });

    gsap.fromTo(
      grainRef.current,
      { opacity: 0.8},
      {
        opacity: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top top',
          end: 'top+=800 top',
          scrub: true,
        },
      }
    );

    gsap.to(textRef.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top+=300 top',
        end: 'top+=700 top',
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <div className='fixed inset-0 h-screen w-full overflow-hidden'>
        <div
          ref={bgRef}
          className='absolute inset-0 z-0'
          style={{
            backgroundImage: "url('/images/fondo-escritorio.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />
        <div
          ref={grainRef}
          className='absolute inset-0 z-5 pointer-events-none mix-blend-soft-light'
          style={{
            backgroundImage: "url('/images/ruido.gif')",
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className='min-h-[150vh] relative'>
        <div className='sticky top-[4rem] flex justify-end p-6 md:p-12'>
          <div
            ref={textRef}
            className='pb-24 md:pb-36 text-right text-white drop-shadow-lg'
          >
            <h1 className='text-4xl md:text-7xl font-bold uppercase'>
              Aguas Rojas I
            </h1>
            <h3 className='text-xl md:text-2xl mt-4 uppercase'>
              Próximo lanzamiento
            </h3>
            <h2 className='text-md md:text-lg mt-4 uppercase'>26/06/2025</h2>
          </div>
        </div>
      </div>
    </>
  );
}

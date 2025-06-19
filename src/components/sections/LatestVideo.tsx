'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReduceMotion } from '@/hooks/useReduceMotion';

gsap.registerPlugin(ScrollTrigger);

export default function LatestVideo() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (reduceMotion || isMobile) return;

    const animateOnScroll = (
      el: React.RefObject<HTMLElement | null>,
      start = 'top bottom',
      end = 'top center'
    ) => {
      if (!el.current) return;
      gsap.fromTo(
        el.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el.current,
            start,
            end,
            scrub: true,
          },
        }
      );
    };

    animateOnScroll(titleRef);
    animateOnScroll(videoRef);
  }, [isMobile, reduceMotion]);

  return (
    <section
      className='relative min-h-screen bg-neutral-900'
      aria-labelledby='latest-video-title'
    >
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 md:p-12'>
        <h2
          id='latest-video-title'
          ref={titleRef}
          className='text-3xl md:text-6xl font-bold text-center text-primary mb-8 pb-4 uppercase'
        >
          “Llévame contigo y enséñame a volar”
        </h2>

        <div
          ref={videoRef}
          className='w-full md:w-2/4 aspect-video rounded-lg overflow-hidden shadow-lg'
          aria-label='Último videoclip de Hotel Sur en YouTube'
        >
          <iframe
            className='w-full h-full'
            src='https://www.youtube.com/embed/XKvTCaeI5VI?si=OGCLlXBuZuv81xtj'
            title='Último videoclip de Hotel Sur'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

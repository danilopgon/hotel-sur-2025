'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReduceMotion } from '@/hooks/useReduceMotion';

gsap.registerPlugin(ScrollTrigger);

export default function LatestVideo() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const youTubeRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
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
    animateOnScroll(youTubeRef);
  }, [isMobile, reduceMotion]);

  return (
    <div className='relative min-h-screen'>
      <div className='absolute inset-0 bg-neutral-900 z-0'></div>
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 md:p-12'>
        <h2
          ref={titleRef}
          className='text-3xl md:text-6xl font-bold text-center text-primary mb-8 pb-4 uppercase'
        >
          &ldquo;Llevame contigo y enseñame a volar&ldquo;
        </h2>
        <div className='w-full md:w-2/4 aspect-video rounded-lg overflow-hidden'>
          <iframe
            className='w-full h-full'
            src='https://www.youtube.com/embed/XKvTCaeI5VI?si=OGCLlXBuZuv81xtj'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

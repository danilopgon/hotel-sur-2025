'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReduceMotion } from '@/hooks/useReduceMotion';

gsap.registerPlugin(ScrollTrigger);

export default function LatestRelease() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const reduceMotion = useReduceMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    const grain = grainRef.current;
    const text = textRef.current;

    if (!video || !wrapper || !grain || !text) return;

    if (reduceMotion) return;

    const onLoaded = () => {
      setIsVideoLoaded(true);
      const duration = video.duration || 8;

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: '+=5000',
        scrub: true,
        pin: video.parentElement,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (video.readyState >= 2) {
            video.currentTime = self.progress * duration;
          }
        },
      });

      gsap.fromTo(
        grain,
        { opacity: 0.6 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: text,
            start: 'top top',
            end: 'top+=800 top',
            scrub: true,
          },
        }
      );
    };

    if (video.readyState >= 1) {
      onLoaded();
    } else {
      video.addEventListener('loadedmetadata', onLoaded);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduceMotion]);

  return (
    <div ref={wrapperRef} className='relative h-[350vh]'>
      <div className='sticky top-0 h-screen w-full overflow-hidden z-0'>
        <div className='relative h-full w-full'>
          <video
            ref={videoRef}
            src='/videos/tras-la-tormenta.webm'
            poster='/images/tras-la-tormenta.webp'
            muted
            playsInline
            preload='auto'
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
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
      </div>

      <div className='sticky top-0 w-full h-screen flex justify-end items-end p-6 md:p-12 z-30 pointer-events-none'>
        <div
          ref={textRef}
          className='pb-16 md:pb-24 text-right text-primary drop-shadow-lg'
        >
          <h1 className='text-6xl md:text-9xl font-bold uppercase'>
            Hotel Sur
          </h1>
        </div>
      </div>
    </div>
  );
}

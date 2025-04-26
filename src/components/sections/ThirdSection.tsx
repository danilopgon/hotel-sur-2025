'use client';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThirdSection() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

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

  const titleOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.65, 0.75], [30, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.75, 0.85], [30, 0]);
  const bgScale = useTransform(scrollYProgress, [0.6, 0.9], [1.05, 1]);

  return (
    <div className='relative min-h-screen'>
      <motion.div
        className='absolute inset-0 bg-neutral-900 z-0'
        style={{
          scale: shouldReduceMotion || isMobile ? 1 : bgScale,
        }}
      ></motion.div>
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 md:p-12'>
        <motion.h2
          className='text-2xl md:text-4xl font-bold text-neutral-0 mb-8 uppercase mt-6 md:mt-0'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : titleOpacity,
            y: shouldReduceMotion || isMobile ? 0 : titleY,
          }}
        >
          Ultima sección
        </motion.h2>
        <motion.p
          className='text-xl md:text-2xl text-neutral-0 max-w-2xl text-center'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : contentOpacity,
            y: shouldReduceMotion || isMobile ? 0 : contentY,
          }}
        >
          Para mostrar los productos de la tienda
        </motion.p>
        <motion.div
          className='mt-12 flex gap-6 flex-wrap justify-center'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : contentOpacity,
            y: shouldReduceMotion || isMobile ? 0 : contentY,
          }}
        >
          <div className='w-64 h-64 bg-neutral-800 rounded-lg'></div>
          <div className='w-64 h-64 bg-neutral-800 rounded-lg'></div>
          <div className='w-64 h-64 bg-neutral-800 rounded-lg'></div>
        </motion.div>
      </div>
    </div>
  );
}

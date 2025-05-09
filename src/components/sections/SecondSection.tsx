'use client';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SecondSection() {
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

  const titleOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);

  return (
    <div className='relative min-h-screen'>
      <div className='absolute inset-0 bg-neutral-0 z-0'></div>
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 md:p-12'>
        <motion.h2
          className='text-2xl md:text-4xl font-bold text-primary mb-8 border-b-primary border-b-2 pb-4 uppercase'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : titleOpacity,
            y: shouldReduceMotion || isMobile ? 0 : titleY,
          }}
        >
          &quot;Llevame contigo y enseñame a volar&quot;
        </motion.h2>

        <motion.p
          className='text-xl md:text-2xl text-neutral-900 max-w-3xl text-left mb-8 text-balance'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : contentOpacity,
            y: shouldReduceMotion || isMobile ? 0 : contentY,
          }}
        >
          Hotel Sur es un proyecto musical fundado en 2019 que fusiona rock
          alternativo y electrónica con una identidad propia. Su sonido viaja
          entre el post-punk y la electrónica más experimental, tejiendo
          paisajes sonoros envolventes y letras cargadas de emoción y
          pensamiento crítico. Actualmente, la banda se encuentra inmersa en el
          lanzamiento de su segundo LP.
        </motion.p>

        <motion.p
          className='text-md md:text-lg text-neutral-900 max-w-2xl text-center'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : contentOpacity,
            y: shouldReduceMotion || isMobile ? 0 : contentY,
          }}
        >
          Escucha nuestros temas en Spotify:
        </motion.p>

        <motion.div
          className='w-full max-w-3xl mt-8 mb-16 md:mb-8'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : contentOpacity,
            y: shouldReduceMotion || isMobile ? 0 : contentY,
          }}
        >
          <iframe
            title='spotify player'
            style={{
              borderRadius: '12px',
              zIndex: 4,
              borderWidth: 0,
              border: 0,
            }}
            src='https://open.spotify.com/embed/artist/5ZsW4wbMl8qYFZ0L9xvBeu?utm_source=generator&theme=0'
            width='100%'
            height='352'
            allow='encrypted-media'
            loading='lazy'
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
}

'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 400, 700], [-50, 0, 0]);
  const scale = useTransform(scrollY, [0, 300], [1.5, 1]);
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);
  const initialY = useTransform(scrollY, [0, 200], [100, 0]);

  return (
    <>
      <div className='fixed inset-0 h-screen w-full overflow-hidden'>
        <motion.div
          className='absolute inset-0 z-0'
          style={{
            y: bgY,
            scale,
            backgroundImage: "url('/images/fondo-escritorio.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />

        <div
          className='absolute inset-0 z-5 pointer-events-none mix-blend-overlay opacity-90'
          style={{
            backgroundImage: "url('/images/ruido.gif')",
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className='min-h-[200vh] relative'>
        <div className='sticky top-[4rem] flex justify-end p-6 md:p-12'>
          <motion.div
            style={{
              opacity: scrollY.get() < 200 ? opacity : 1,
              y: scrollY.get() < 200 ? initialY : 0,
            }}
            className='pb-24 md:pb-36 text-right text-primary'
          >
            <h1 className='text-6xl md:text-8xl font-bold uppercase drop-shadow-sm'>
              HOTEL SUR
            </h1>
            <h3 className='text-xl md:text-2xl mt-4 uppercase'>
              Aguas Rojas II (Tras La Tormenta)
            </h3>
            <p className='text-lg md:text-xl mt-4 uppercase'>
              30/05/2025
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
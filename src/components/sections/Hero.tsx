'use client';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const bgY = useTransform(scrollY, [0, 400, 700], [0, -25, -50]);
  const scale = useTransform(scrollY, [0, 300, 500], [1, 1.25, 1.5]);
  const textOpacity = useTransform(scrollY, [300, 500], [1, 0]);
  const textY = useTransform(scrollY, [300, 700], [0, -50]);
  const grainOpacity = useTransform(
    scrollY,
    [0, 400, 600, 900],
    [0.6, 0.9, 1, 1]
  );

  return (
    <>
      <div className='fixed inset-0 h-screen w-full overflow-hidden'>
        <motion.div
          className='absolute inset-0 z-0'
          style={{
            y: shouldReduceMotion ? 0 : bgY,
            scale: shouldReduceMotion ? 1 : scale,
            backgroundImage: "url('/images/fondo-escritorio.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        />

        <motion.div
          className='absolute inset-0 z-5 pointer-events-none mix-blend-overlay'
          style={{
            opacity: shouldReduceMotion ? 0.9 : grainOpacity,
            backgroundImage: "url('/images/ruido.gif')",
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className='min-h-[150vh] relative'>
        <div className='sticky top-[4rem] flex justify-end p-6 md:p-12'>
          <motion.div
            style={{
              opacity: shouldReduceMotion ? 1 : textOpacity,
              y: shouldReduceMotion ? 0 : textY,
            }}
            className='pb-24 md:pb-36 text-right text-primary'
          >
            <h1 className='text-6xl md:text-8xl font-bold uppercase drop-shadow-sm'>
              HOTEL SUR
            </h1>
            <h3 className='text-xl md:text-2xl mt-4 uppercase'>
              Aguas Rojas II (Tras La Tormenta)
            </h3>
            <p className='text-lg md:text-xl mt-4 uppercase'>30/05/2025</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

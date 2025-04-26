'use client';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

export default function ThirdSection() {
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const titleOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  const titleY = useTransform(scrollYProgress, [0.6, 0.7], [30, 0]);

  const contentOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  const contentY = useTransform(scrollYProgress, [0.7, 0.8], [30, 0]);

  const bgScale = useTransform(scrollYProgress, [0.5, 0.9], [1.05, 1]);

  return (
    <div className='relative min-h-screen'>
      <motion.div
        className='absolute inset-0 bg-neutral-900 z-0'
        style={{
          scale: shouldReduceMotion ? 1 : bgScale,
        }}
      ></motion.div>
      <div className='relative z-10 min-h-screen flex flex-col justify-center items-center p-6 md:p-12'>
        <motion.h2
          className='text-2xl md:text-4xl font-bold text-neutral-0 mb-8 uppercase'
          style={{
            opacity: shouldReduceMotion ? 1 : titleOpacity,
            y: shouldReduceMotion ? 0 : titleY,
          }}
        >
          Ultima sección
        </motion.h2>
        <motion.p
          className='text-xl md:text-2xl text-neutral-0 max-w-2xl text-center'
          style={{
            opacity: shouldReduceMotion ? 1 : contentOpacity,
            y: shouldReduceMotion ? 0 : contentY,
          }}
        >
          Para mostrar los productos de la tienda
        </motion.p>
        <motion.div
          className='mt-12 flex gap-6 flex-wrap justify-center'
          style={{
            opacity: shouldReduceMotion ? 1 : contentOpacity,
            y: shouldReduceMotion ? 0 : contentY,
          }}
        >
          {/* Aquí podrías añadir una cuadrícula de productos */}
          <div className='w-64 h-64 bg-neutral-800 rounded-lg'></div>
          <div className='w-64 h-64 bg-neutral-800 rounded-lg'></div>
          <div className='w-64 h-64 bg-neutral-800 rounded-lg'></div>
        </motion.div>
      </div>
    </div>
  );
}

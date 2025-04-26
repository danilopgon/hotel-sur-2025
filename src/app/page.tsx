'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Ajustamos el parallax para que no quede hueco arriba
  // Comenzamos en -50px para eliminar el hueco superior
  const bgY = useTransform(scrollY, [0, 400, 700], [-50, 0, 0]);

  // Efecto de zoom-out acelerado para la imagen de fondo (150% -> 100%)
  // Terminamos antes el zoom (300px en lugar de 400px) para ver la imagen completa antes
  const scale = useTransform(scrollY, [0, 300], [1.5, 1]);

  // Animación de aparición del texto (solo para la fase inicial)
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  // Solo animamos la posición Y hasta los 200px de scroll
  const initialY = useTransform(scrollY, [0, 200], [100, 0]);

  return (
    <main ref={ref} className='relative'>
      {/* Contenedor fijo para la imagen de fondo */}
      <div className='fixed inset-0 h-screen w-full overflow-hidden'>
        {/* Imagen de fondo animada con parallax y zoom */}
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

        {/* Capa de ruido fija */}
        <div
          className='absolute inset-0 z-5 pointer-events-none mix-blend-overlay opacity-90'
          style={{
            backgroundImage: "url('/images/ruido.gif')",
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* Contenedor de contenido con altura adicional para permitir scroll */}
      <div className='relative z-10 min-h-[450vh]'>
        {/* Primera sección con animación de aparición y sticky header */}
        <div className='min-h-[200vh] relative'>
          {/* Contenedor sticky para el título */}
          <div className='sticky top-[1rem] flex justify-end p-6 md:p-12'>
            <motion.div
              style={{
                opacity: scrollY.get() < 200 ? opacity : 1,
                y: scrollY.get() < 200 ? initialY : 0,
              }}
              className='pb-24 md:pb-36'
            >
              <h1 className='text-6xl md:text-8xl font-bold uppercase text-primary drop-shadow-sm'>
                HOTEL SUR
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Segunda sección con fondo de color neutro */}
        <div className='relative min-h-screen'>
          {/* Fondo de color neutro */}
          <div className='absolute inset-0 bg-neutral-900 z-0'></div>

          {/* Contenido de la sección */}
          <div className='relative z-10 h-screen flex flex-col justify-center items-center p-6 md:p-12'>
            <h2 className='text-4xl md:text-6xl font-bold text-white mb-8'>
              Nueva sección
            </h2>
            <p className='text-xl md:text-2xl text-white max-w-2xl text-center'>
              Contenido adicional que aparece después del scroll
            </p>
          </div>
        </div>

        {/* Tercera sección - Fondo neutral-0 */}
        <div className='h-screen flex justify-center items-center bg-neutral-0'>
          {/* Más contenido */}
        </div>
      </div>
    </main>
  );
}

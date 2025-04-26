'use client';
import { Button } from '@/components/ui/button';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';

// Definición de productos de merchandising para simular la futura conexión con Fourthwall
const merchProducts = [
  {
    id: 1,
    name: 'Camiseta Hotel Sur',
    description: 'Camiseta de algodón orgánico con diseño exclusivo',
    color: 'bg-amber-500',
    featured: true,
    size: 'col-span-2 row-span-1 md:col-span-2',
  },
  {
    id: 2,
    name: 'Tote Bag',
    description: 'Bolsa de tela con estampado minimalista',
    color: 'bg-purple-500',
    featured: false,
    size: 'col-span-2 row-span-1 md:col-span-2',
  },
  {
    id: 3,
    name: 'Pin Enamel',
    description: 'Pin coleccionable de metal esmaltado',
    color: 'bg-teal-500',
    featured: false,
    size: 'col-span-2 row-span-1 md:col-span-1 md:row-span-2',
  },
  {
    id: 4,
    name: 'Poster Edición Limitada',
    description: 'Impresión artística de alta calidad',
    color: 'bg-indigo-600',
    featured: true,
    size: 'col-span-2 row-span-1 md:col-span-1',
  },
  {
    id: 5,
    name: 'Lámina Hotel Sur',
    description: 'Diseño exclusivo impreso en papel premium',
    color: 'bg-rose-500',
    featured: false,
    size: 'col-span-2 row-span-1 md:col-span-2',
  },
];

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

  // Modificamos los rangos de animación para que el título aparezca más temprano
  const titleOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.6, 0.7], [30, 0]);
  // Añadimos animación para el bento que aparecerá después
  const bentoOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
  const bentoY = useTransform(scrollYProgress, [0.7, 0.8], [30, 0]);
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
          className='text-2xl md:text-4xl font-bold text-neutral-0 mb-4 uppercase mt-6 md:mt-0'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : titleOpacity,
            y: shouldReduceMotion || isMobile ? 0 : titleY,
          }}
        >
          Merchandising
        </motion.h2>
        <motion.p
          className='text-xl md:text-2xl text-neutral-0 max-w-2xl text-center mb-8'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : contentOpacity,
            y: shouldReduceMotion || isMobile ? 0 : contentY,
          }}
        >
          Productos exclusivos de Hotel Sur
        </motion.p>

        {/* Diseño tipo bento para productos - con animaciones ajustadas */}
        <motion.div
          className='w-full max-w-5xl'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : bentoOpacity,
            y: shouldReduceMotion || isMobile ? 0 : bentoY,
          }}
        >
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
            {merchProducts.map((product) => (
              <div
                key={product.id}
                className={`${product.size} ${product.color} rounded-md shadow-lg p-4 md:p-6 flex flex-col justify-between cursor-pointer h-[180px] md:h-[220px] transition-all hover:scale-[1.02]`}
              >
                <div>
                  <h3 className='text-lg md:text-xl font-bold text-white'>
                    {product.name}
                  </h3>
                  <p className='text-sm text-white/80 mt-1'>
                    {product.description}
                  </p>
                </div>
                <div className='mt-4 flex justify-end'>
                  <span className='bg-white/20 text-white text-xs rounded-md px-3 py-1'>
                    Próximamente
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-12 text-center'>
            <a
              href='https://tienda.hotelsur.es'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button variant='default' className='bg-primary text-white'>
                Ver todo el catálogo
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

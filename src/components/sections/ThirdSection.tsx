'use client';
import { Button } from '@/components/ui/button';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useState } from 'react';

const merchProducts = [
  {
    id: 1,
    name: 'Taza - "Voy a Tener que Ser Dios"',
    description: 'Taza (para ambidiestros) con diseño de Mónica Ríos',
    image: '/images/taza-voy-a-tener-que-ser-dios.jpg',
    hoverImage: '/images/taza-voy-a-tener-que-ser-dios-2.jpg',
    url: 'https://tienda.hotelsur.es/en-eur/products/taza-voy-a-tener-que-ser-dios',
    featured: true,
    size: 'col-span-2 row-span-1 md:col-span-2',
  },
  {
    id: 2,
    name: 'Sudadera - "Ministerio del Ritmo"',
    description: 'Nuestro sello, ahora con logo renovado',
    image: '/images/sudadera-unisex-ministerio-del-ritmo.jpg',
    hoverImage: '/images/sudadera-unisex-ministerio-del-ritmo-2.jpg',
    url: 'https://tienda.hotelsur.es/en-eur/products/sudadera-unisex-ministerio-del-ritmo',
    featured: false,
    size: 'col-span-2 row-span-1 md:col-span-2',
  },
  {
    id: 3,
    name: 'Camiseta - "Voy a Tener que Ser Dios"',
    description: 'Camiseta unisex con diseño de Mónica Ríos',
    image: '/images/camiseta-unisex-voy-a-tener-que-ser-dios-granate.jpg',
    hoverImage: '/images/camiseta-unisex-voy-a-tener-que-ser-dios-granate-2.jpg',
    url: 'https://tienda.hotelsur.es/en-eur/products/camiseta-unisex-voy-a-tener-que-ser-dios-granate',
    featured: false,
    size: 'col-span-2 row-span-1 md:col-span-2',    
  },
  {
    id: 4,
    name: 'Print - "Casas Colgadas"',
    description: 'Diseño de Dani para el concierto de Cuenca en 2022',
    image: '/images/print-casas-colgadas.jpg',
    hoverImage: '/images/print-casas-colgadas-2.jpg', // Mock
    url: 'https://tienda.hotelsur.es/en-eur/products/print-casas-colgadas',
    featured: true,
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

  const titleOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.6, 0.7], [30, 0]);
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

        <motion.div
          className='w-full max-w-5xl'
          style={{
            opacity: shouldReduceMotion || isMobile ? 1 : bentoOpacity,
            y: shouldReduceMotion || isMobile ? 0 : bentoY,
          }}
        >
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4'>
            {merchProducts.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${product.size} rounded-md shadow-lg overflow-hidden cursor-pointer transition-all hover:scale-[1.02] min-h-[400px]`}
              >
                <div className="relative w-full h-full group">
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 group-hover:opacity-0"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${product.hoverImage})` }}
                  ></div>
                  <div className="relative z-10 bg-black/50 p-4 h-full flex flex-col justify-between">
                    <div>
                      <h3 className='text-lg md:text-xl font-bold text-white'>
                        {product.name}
                      </h3>
                      <p className='text-sm text-white/80 mt-1'>
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
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

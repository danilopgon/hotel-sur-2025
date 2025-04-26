'use client';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';
  const navbarOpacity = useTransform(scrollY, [150, 300], [0, 1]);
  const isActive = (path: string) => pathname === path;

  return (
    <motion.div
      className='fixed top-0 left-0 right-0 z-20 backdrop-blur-sm bg-neutral-700/80'
      style={{ opacity: isHomePage ? navbarOpacity : 1 }}
      initial={{ opacity: isHomePage ? 0 : 1 }}
    >
      <div className='container mx-auto flex justify-between items-center p-4'>
        <div className='flex items-center space-x-2'>
          <Link href="/">
            <span className='text-lg font-bold text-primary'>HOTEL SUR</span>
          </Link>
        </div>
        <nav>
          <ul className='flex space-x-6'>
            <li>
              <Link href="/">
                <Button
                  variant={isActive('/') ? 'default' : 'ghost'}
                  className={isActive('/') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-black/20 text-primary'}
                >
                  Inicio
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/contacto">
                <Button
                  variant={isActive('/contacto') ? 'default' : 'ghost'}
                  className={isActive('/contacto') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-black/20 text-primary'}
                >
                  Contacto
                </Button>
              </Link>
            </li>
            <li>
              <a href="https://tienda.hotelsur.es" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="hover:bg-black/10 text-primary border-primary/30 flex items-center gap-1"
                >
                  Merchandising
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17L17 7"></path>
                  </svg>
                </Button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}
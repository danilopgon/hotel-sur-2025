'use client';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isHomePage = pathname === '/';
  const navbarOpacity = useTransform(scrollY, [150, 300], [0, 1]);
  const isActive = (path: string) => pathname === path;

  // Check if screen is mobile size
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

  // Close mobile menu when changing route
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <motion.div
      className='fixed top-0 left-0 right-0 z-20 backdrop-blur-sm bg-neutral-700/80'
      style={{ opacity: isHomePage ? navbarOpacity : 1 }}
      initial={{ opacity: isHomePage ? 0 : 1 }}
    >
      <div className='container mx-auto flex justify-between items-center p-4'>
        <div className='flex items-center space-x-2'>
          <Link href='/'>
            <span className='text-lg font-bold text-primary'>HOTEL SUR</span>
          </Link>
        </div>

        {/* Mobile hamburger button */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex flex-col justify-center items-center md:hidden text-primary relative h-6 w-6'
            aria-label='Toggle menu'
          >
            <span
              className={`absolute block w-6 h-0.5 bg-primary transition-all duration-300 ease-out ${
                isOpen ? 'top-[11px] rotate-45' : 'top-1'
              }`}
            ></span>
            <span
              className={`absolute block w-6 h-0.5 bg-primary transition-all duration-300 ease-out ${
                isOpen ? 'opacity-0' : 'opacity-100 top-[11px]'
              }`}
            ></span>
            <span
              className={`absolute block w-6 h-0.5 bg-primary transition-all duration-300 ease-out ${
                isOpen ? 'top-[11px] -rotate-45' : 'top-[19px]'
              }`}
            ></span>
          </button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav>
            <ul className='flex space-x-6'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <Button
                      variant={isActive(item.href) ? 'default' : 'ghost'}
                      className={
                        isActive(item.href)
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-black/20 text-primary'
                      }
                    >
                      {item.label}
                    </Button>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href='https://tienda.hotelsur.es'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button
                    variant='outline'
                    className='hover:bg-black/10 text-primary border-primary/30 flex items-center gap-1'
                  >
                    Merchandising
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='14'
                      height='14'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M7 7h10v10'></path>
                      <path d='M7 17L17 7'></path>
                    </svg>
                  </Button>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <motion.nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute w-full bg-neutral-800/95 backdrop-blur-sm shadow-lg`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <ul className='flex flex-col py-4 px-6 space-y-4'>
            {navItems.map((item) => (
              <li key={item.href} className='w-full'>
                <Link href={item.href}>
                  <Button
                    variant={isActive(item.href) ? 'default' : 'ghost'}
                    className={`${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-black/20 text-primary'
                    } w-full justify-start`}
                  >
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
            <li className='w-full'>
              <a
                href='https://tienda.hotelsur.es'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full block'
              >
                <Button
                  variant='outline'
                  className='hover:bg-black/10 text-primary border-primary/30 flex items-center gap-1 w-full justify-start'
                >
                  Merchandising
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M7 7h10v10'></path>
                    <path d='M7 17L17 7'></path>
                  </svg>
                </Button>
              </a>
            </li>
          </ul>
        </motion.nav>
      )}
    </motion.div>
  );
}

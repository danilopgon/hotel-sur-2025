'use client';

export default function ThirdSection() {
  return (
<div className='relative min-h-screen'>
      <div className='absolute inset-0 bg-neutral-900 z-0'></div>
      <div className='relative z-10 h-screen flex flex-col justify-center items-center p-6 md:p-12'>
        <h2 className='text-4xl md:text-6xl font-bold text-neutral-0 mb-8'>
          Ultima sección
        </h2>
        <p className='text-xl md:text-2xl text-neutral-0 max-w-2xl text-center'>
         Para mostrar los productos de la tienda
        </p>
      </div>
    </div>
  );
}

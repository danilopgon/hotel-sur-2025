'use client';

export default function SecondSection() {
  return (
    <div className='relative min-h-screen'>
      <div className='absolute inset-0 bg-neutral-0 z-0'></div>
      <div className='relative z-10 h-screen flex flex-col justify-center items-center p-6 md:p-12'>
        <h2 className='text-4xl md:text-6xl font-bold text-neutral-900 mb-8'>
          Nueva sección
        </h2>
        <p className='text-xl md:text-2xl text-neutral-900 max-w-2xl text-center'>
          Contenido adicional que aparece después del scroll
        </p>
      </div>
    </div>
  );
}
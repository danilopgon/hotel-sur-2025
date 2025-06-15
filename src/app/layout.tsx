import Footer from '@/components/layout/Footer';
import LenisWrapper from '@/components/layout/LenisWrapper';
import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hotel Sur',
  description: 'Banda de rock y electrónica de Tarancón (Cuenca)',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className='antialiased min-h-screen flex flex-col overflow-x-hidden'>
        <LenisWrapper>
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </LenisWrapper>
        <Toaster position='top-center' />
      </body>
    </html>
  );
}

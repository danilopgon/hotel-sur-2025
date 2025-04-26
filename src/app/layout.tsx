import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hotel Sur',
  description: 'Banda de rock y electrónica de Tarancón (Cuenca)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className='antialiased min-h-screen flex flex-col'>
        <Navbar />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

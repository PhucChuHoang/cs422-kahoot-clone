import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/provider';
import { LandingHeaderForm } from '@/components/landing_header_form';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toohak',
  description: 'A quiz platform for everyone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LandingHeaderForm />
          {children}
        </Providers>
      </body>
    </html>
  );
}

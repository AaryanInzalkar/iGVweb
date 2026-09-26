import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_METADATA } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: '%s | AIESEC in Bhopal',
  },
  description: SITE_METADATA.description,
  keywords: [
    'AIESEC',
    'AIESEC in Bhopal',
    'Global Volunteer',
    'iGV',
    'Bhopal',
    'India',
    'Volunteer Projects',
    'UN SDG',
    'Youth Exchange',
    'Leadership Development',
  ],
  authors: [{ name: 'AIESEC in Bhopal' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_METADATA.siteUrl,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: 'AIESEC in Bhopal iGV',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'AIESEC in Bhopal Global Volunteer Project Spotlight',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: ['https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-[#071B2F]">
        {children}
      </body>
    </html>
  );
}

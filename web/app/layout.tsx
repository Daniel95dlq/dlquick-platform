import './globals.css';
import { Analytics } from './analytics';
import { PerformanceMonitor } from './performance';
import { ErrorBoundary } from './error-tracking';

export const metadata = {
  metadataBase: new URL('https://dlquick.co.uk'),
  title: {
    default: 'DLQuick — Lightning Fast Delivery Across UK | Same-Day Delivery Liverpool & London',
    template: '%s | DLQuick'
  },
  description: 'Ultra-fast delivery platform connecting Liverpool and London. Same-day deliveries, groceries, food, removals, and more — all in one place. Professional courier services with real-time tracking.',
  keywords: [
    'delivery service UK',
    'same day delivery',
    'Liverpool delivery',
    'London delivery', 
    'courier service',
    'food delivery',
    'grocery delivery',
    'removals service',
    'fast delivery',
    'DLQuick'
  ],
  authors: [{ name: 'DLQuick Team' }],
  creator: 'DLQuick',
  publisher: 'DLQuick',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://dlquick.co.uk',
    siteName: 'DLQuick',
    title: 'DLQuick — Lightning Fast Delivery Across UK',
    description: 'Ultra-fast delivery platform connecting Liverpool and London. Same-day deliveries, groceries, food, removals, and more — all in one place.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'DLQuick - Lightning Fast Delivery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dlquick',
    creator: '@dlquick',
    title: 'DLQuick — Lightning Fast Delivery Across UK',
    description: 'Ultra-fast delivery platform connecting Liverpool and London. Same-day deliveries, groceries, food, removals, and more.',
    images: ['/og.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://dlquick.co.uk',
  },
  category: 'delivery service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/dlq-logo.svg" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <PerformanceMonitor />
        <ErrorBoundary />
      </body>
    </html>
  );
}

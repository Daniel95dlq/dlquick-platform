import './globals.css';

export const metadata = {
  title: 'DLQuick — From the store to your door',
  description: 'Ultra-fast delivery platform connecting the entire UK. Same-day deliveries, groceries, food, removals, and more — all in one place.',
  openGraph: {
    title: 'DLQuick — From the store to your door',
    description: 'Ultra-fast delivery platform connecting the entire UK.',
    images: ['/og.jpg']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

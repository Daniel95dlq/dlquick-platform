import './globals.css';

export const metadata = {
  title: 'DLQuick — From the store to your door',
  description: 'Same-day deliveries, groceries, food, removals, and more — one platform.',
  openGraph: {
    title: 'DLQuick',
    description: 'Same-day deliveries and more.',
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

"use client"

import { DefaultSeo } from 'next-seo'

export default function SEO() {
  return (
    <DefaultSeo
      titleTemplate="%s • DLQuick"
      defaultTitle="DLQuick — From the store to your door"
      description="Same-day deliveries, groceries, food, removals, trades and more — one platform."
      canonical="https://dlquick.co.uk/"
      openGraph={{
        type: 'website',
        locale: 'en_GB',
        url: 'https://dlquick.co.uk/',
        siteName: 'DLQuick',
        images: [
          { url: 'https://dlquick.co.uk/og.jpg', width: 1200, height: 630, alt: 'DLQuick' },
        ],
      }}
      twitter={{ cardType: 'summary_large_image' }}
      additionalMetaTags={[
        { name: 'theme-color', content: '#0b1330' },
      ]}
    />
  )
}

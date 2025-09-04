'use client';

import Script from 'next/script'

interface AnalyticsProps {
  gaId?: string;
}

export function Analytics({ gaId = 'G-XXXXXXXXXX' }: AnalyticsProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Custom event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    })
  }
}

// Service request tracking
export const trackServiceRequest = (serviceName: string, location: string) => {
  trackEvent('service_request', {
    service_type: serviceName,
    user_location: location,
    event_category: 'engagement',
  })
}

// Order tracking events
export const trackOrderTracking = (trackingNumber: string, status: string) => {
  trackEvent('order_tracking', {
    tracking_number: trackingNumber,
    order_status: status,
    event_category: 'order_management',
  })
}

// Partner application tracking
export const trackPartnerApplication = (partnerType: string, location: string) => {
  trackEvent('partner_application', {
    partner_type: partnerType,
    location: location,
    event_category: 'partnerships',
  })
}

// Page view tracking for SPA navigation
export const trackPageView = (url: string, title: string) => {
  trackEvent('page_view', {
    page_location: url,
    page_title: title,
    event_category: 'navigation',
  })
}

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
  }
}

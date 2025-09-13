import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DLQuick — The Ultimate Local App'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  const navy = '#0E2640'
  const gold = '#D4AF37'
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 52,
          color: gold,
          background: navy,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Minimal mark: circle stopwatch with wings */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="36" r="16" stroke={gold} strokeWidth="4" />
            <path d="M32 20v4" stroke={gold} strokeWidth="4" strokeLinecap="round" />
            <rect x="27" y="12" width="10" height="6" rx="1.5" stroke={gold} strokeWidth="4" />
            <path d="M32 36l8-5" stroke={gold} strokeWidth="4" strokeLinecap="round" />
            <circle cx="32" cy="36" r="2" fill={gold} />
            <path d="M16 34c-6 0-10-3-12-7 4 1 9 1 13-2-4 0-7-2-9-5 4 1 9 1 13-1" stroke={gold} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M48 34c6 0 10-3 12-7-4 1-9 1-13-2 4 0 7-2 9-5-4 1-9 1-13-1" stroke={gold} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ fontWeight: 700, letterSpacing: 1 }}>DLQuick</div>
        </div>
        <div style={{ fontSize: 36, color: '#E6D9A2', marginTop: 16 }}>The Ultimate Local App — Services, Delivery, Everything.</div>
        <div style={{ fontSize: 24, color: '#cbd5e1', marginTop: 24 }}>On-demand deliveries and services across the UK.</div>
        <div style={{ fontSize: 20, color: '#94a3b8', marginTop: 24 }}>www.dlquick.co.uk</div>
      </div>
    ),
    { ...size }
  )
}

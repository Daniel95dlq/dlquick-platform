"use client"
import React from "react"

type Props = {
  className?: string
  fill?: string
}

// Simple winged stopwatch mark inspired by the provided artwork
export default function BrandLogo({ className = "w-8 h-8", fill = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-label="DLQuick logo"
      role="img"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stopwatch body */}
      <circle cx="32" cy="36" r="16" stroke={fill} strokeWidth="2.5" />
      <path d="M32 20v4" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="27" y="12" width="10" height="6" rx="1.5" stroke={fill} strokeWidth="2.5" />
      {/* Hands */}
      <path d="M32 36l8-5" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="36" r="2" fill={fill} />
      {/* Wings */}
      <path d="M16 34c-6 0-10-3-12-7 4 1 9 1 13-2-4 0-7-2-9-5 4 1 9 1 13-1" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M48 34c6 0 10-3 12-7-4 1-9 1-13-2 4 0 7-2 9-5-4 1-9 1-13-1" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

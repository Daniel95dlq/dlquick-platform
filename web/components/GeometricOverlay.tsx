'use client'

import React from 'react'

interface GeometricOverlayProps {
  className?: string
  variant?: 'circles' | 'hexagons' | 'triangles' | 'mixed'
}

const GeometricOverlay: React.FC<GeometricOverlayProps> = ({ 
  className = '', 
  variant = 'mixed' 
}) => {
  const renderCircles = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
      {/* Large floating circles */}
      <circle 
        cx="200" 
        cy="300" 
        r="120" 
        fill="none" 
        stroke="rgba(212, 175, 55, 0.3)" 
        strokeWidth="2"
        className="animate-pulse"
      />
      <circle 
        cx="1600" 
        cy="200" 
        r="80" 
        fill="rgba(212, 175, 55, 0.1)" 
        className="animate-bounce-slow"
      />
      <circle 
        cx="300" 
        cy="800" 
        r="60" 
        fill="none" 
        stroke="rgba(11, 28, 57, 0.4)" 
        strokeWidth="3"
      />
      <circle 
        cx="1500" 
        cy="700" 
        r="100" 
        fill="rgba(11, 28, 57, 0.2)" 
        className="animate-float"
      />
    </svg>
  )

  const renderHexagons = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
      {/* Hexagon pattern */}
      <defs>
        <pattern id="hexPattern" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
          <polygon 
            points="50,5 85,25 85,65 50,85 15,65 15,25" 
            fill="none" 
            stroke="rgba(212, 175, 55, 0.2)" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexPattern)" opacity="0.5" />
      
      {/* Featured hexagons */}
      <polygon 
        points="400,100 450,125 450,175 400,200 350,175 350,125" 
        fill="rgba(212, 175, 55, 0.3)"
        className="animate-pulse"
      />
      <polygon 
        points="1400,400 1480,440 1480,520 1400,560 1320,520 1320,440" 
        fill="rgba(11, 28, 57, 0.3)"
        className="animate-spin-slow"
      />
    </svg>
  )

  const renderTriangles = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
      {/* Floating triangles */}
      <polygon 
        points="100,200 200,200 150,100" 
        fill="rgba(212, 175, 55, 0.2)"
        className="animate-bounce-slow"
      />
      <polygon 
        points="1700,300 1800,400 1600,400" 
        fill="none" 
        stroke="rgba(212, 175, 55, 0.4)" 
        strokeWidth="2"
        className="animate-pulse"
      />
      <polygon 
        points="500,700 600,800 400,800" 
        fill="rgba(11, 28, 57, 0.3)"
        className="animate-float"
      />
      <polygon 
        points="1300,600 1400,700 1200,700" 
        fill="none" 
        stroke="rgba(11, 28, 57, 0.5)" 
        strokeWidth="3"
      />
    </svg>
  )

  const renderMixed = () => (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080">
      {/* Mixed geometric elements */}
      {/* Circles */}
      <circle 
        cx="150" 
        cy="200" 
        r="80" 
        fill="none" 
        stroke="rgba(212, 175, 55, 0.3)" 
        strokeWidth="2"
        className="animate-pulse"
      />
      <circle 
        cx="1750" 
        cy="150" 
        r="60" 
        fill="rgba(212, 175, 55, 0.1)" 
        className="animate-float"
      />
      
      {/* Hexagons */}
      <polygon 
        points="1600,500 1650,525 1650,575 1600,600 1550,575 1550,525" 
        fill="rgba(11, 28, 57, 0.2)"
        className="animate-spin-slow"
      />
      
      {/* Triangles */}
      <polygon 
        points="300,600 400,600 350,500" 
        fill="none" 
        stroke="rgba(212, 175, 55, 0.4)" 
        strokeWidth="2"
        className="animate-bounce-slow"
      />
      
      {/* Lines and connections */}
      <line 
        x1="200" 
        y1="300" 
        x2="350" 
        y2="500" 
        stroke="rgba(212, 175, 55, 0.3)" 
        strokeWidth="1"
        className="animate-pulse"
      />
      <line 
        x1="1600" 
        y1="200" 
        x2="1650" 
        y2="525" 
        stroke="rgba(11, 28, 57, 0.3)" 
        strokeWidth="1"
        className="animate-float"
      />
      
      {/* Dots */}
      <circle cx="800" cy="100" r="3" fill="rgba(212, 175, 55, 0.6)" className="animate-pulse" />
      <circle cx="1200" cy="200" r="4" fill="rgba(11, 28, 57, 0.6)" className="animate-bounce-slow" />
      <circle cx="600" cy="900" r="3" fill="rgba(212, 175, 55, 0.5)" className="animate-float" />
      <circle cx="1400" cy="800" r="5" fill="rgba(11, 28, 57, 0.5)" className="animate-pulse" />
    </svg>
  )

  const renderPattern = () => {
    switch (variant) {
      case 'circles':
        return renderCircles()
      case 'hexagons':
        return renderHexagons()
      case 'triangles':
        return renderTriangles()
      case 'mixed':
      default:
        return renderMixed()
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {renderPattern()}
      
      {/* Additional floating elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold-500 rounded-full animate-ping opacity-60" />
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-navy-500 rounded-full animate-pulse opacity-50" />
      <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-gold-400 rounded-full animate-bounce opacity-70" />
    </div>
  )
}

export default GeometricOverlay

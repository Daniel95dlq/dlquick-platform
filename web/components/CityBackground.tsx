'use client'

import React, { useState, useEffect } from 'react'

interface CityBackgroundProps {
  children: React.ReactNode
  className?: string
}

const CityBackground: React.FC<CityBackgroundProps> = ({ children, className = '' }) => {
  const [currentCity, setCurrentCity] = useState('london')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // UK Cities with coordinates and background info
  const ukCities = {
    london: {
      name: 'London',
      background: '/london-background.svg',
      video: '/videos/london-timelapse.mp4',
      gradient: 'from-blue-900/80 via-purple-900/60 to-indigo-900/80',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    manchester: {
      name: 'Manchester',
      background: '/manchester-background.svg',
      video: '/videos/manchester-cityscape.mp4',
      gradient: 'from-red-900/70 via-orange-800/60 to-yellow-900/70',
      coordinates: { lat: 53.4808, lng: -2.2426 }
    },
    birmingham: {
      name: 'Birmingham',
      background: '/birmingham-background.svg',
      video: '/videos/birmingham-modern.mp4',
      gradient: 'from-green-900/70 via-emerald-800/60 to-teal-900/70',
      coordinates: { lat: 52.4862, lng: -1.8904 }
    },
    liverpool: {
      name: 'Liverpool',
      background: '/liverpool-background.svg',
      video: '/videos/liverpool-docks.mp4',
      gradient: 'from-cyan-900/70 via-blue-800/60 to-indigo-900/70',
      coordinates: { lat: 53.4084, lng: -2.9916 }
    },
    leeds: {
      name: 'Leeds',
      background: '/leeds-background.svg',
      video: '/videos/leeds-modern.mp4',
      gradient: 'from-purple-900/70 via-pink-800/60 to-rose-900/70',
      coordinates: { lat: 53.8008, lng: -1.5491 }
    },
    glasgow: {
      name: 'Glasgow',
      background: '/glasgow-background.svg',
      video: '/videos/glasgow-heritage.mp4',
      gradient: 'from-amber-900/70 via-orange-800/60 to-red-900/70',
      coordinates: { lat: 55.8642, lng: -4.2518 }
    },
    edinburgh: {
      name: 'Edinburgh',
      background: '/edinburgh-background.svg',
      video: '/videos/edinburgh-historic.mp4',
      gradient: 'from-stone-900/70 via-slate-800/60 to-gray-900/70',
      coordinates: { lat: 55.9533, lng: -3.1883 }
    },
    bristol: {
      name: 'Bristol',
      background: '/bristol-background.svg',
      video: '/videos/bristol-harbour.mp4',
      gradient: 'from-emerald-900/70 via-green-800/60 to-lime-900/70',
      coordinates: { lat: 51.4545, lng: -2.5879 }
    }
  }

  // Get user's location and determine nearest city
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          setUserLocation({ lat: userLat, lng: userLng })

          // Find nearest city
          let nearestCity = 'london'
          let minDistance = Infinity

          Object.entries(ukCities).forEach(([cityKey, city]) => {
            const distance = Math.sqrt(
              Math.pow(userLat - city.coordinates.lat, 2) + 
              Math.pow(userLng - city.coordinates.lng, 2)
            )
            if (distance < minDistance) {
              minDistance = distance
              nearestCity = cityKey
            }
          })

          setCurrentCity(nearestCity)
        },
        () => {
          // Default to London if geolocation fails
          setCurrentCity('london')
        }
      )
    }
  }, [])

  const city = ukCities[currentCity as keyof typeof ukCities]

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster={city.background}
        >
          <source src={city.video} type="video/mp4" />
        </video>
        
        {/* Fallback static background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${city.background})` }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 z-10 bg-gradient-to-br ${city.gradient}`} />
      
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-brand-navy/30 via-transparent to-brand-navy/50 backdrop-blur-[1px]" />

      {/* City Info Badge */}
      <div className="absolute top-6 right-6 z-30">
        <div className="glass-card px-4 py-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">
            📍 Serving {city.name}
          </span>
        </div>
      </div>

      {/* City Selector */}
      <div className="absolute top-6 left-6 z-30">
        <select
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
          className="glass-card px-3 py-2 text-white text-sm bg-white/10 border border-white/20 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
        >
          {Object.entries(ukCities).map(([key, city]) => (
            <option key={key} value={key} className="bg-brand-navy text-white">
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>

      {/* Weather-like floating elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-brand-gold/40 rounded-full animate-bounce-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-brand-gold/30 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  )
}

export default CityBackground

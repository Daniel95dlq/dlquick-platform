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
      background: '/backgrounds/london-skyline.jpg',
      video: '/videos/london-timelapse.mp4',
      gradient: 'from-blue-900/80 via-purple-900/60 to-indigo-900/80',
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    manchester: {
      name: 'Manchester',
      background: '/backgrounds/manchester-skyline.jpg',
      video: '/videos/manchester-cityscape.mp4',
      gradient: 'from-red-900/70 via-orange-800/60 to-yellow-900/70',
      coordinates: { lat: 53.4808, lng: -2.2426 }
    },
    birmingham: {
      name: 'Birmingham',
      background: '/backgrounds/birmingham-skyline.jpg',
      video: '/videos/birmingham-modern.mp4',
      gradient: 'from-green-900/70 via-emerald-800/60 to-teal-900/70',
      coordinates: { lat: 52.4862, lng: -1.8904 }
    },
    liverpool: {
      name: 'Liverpool',
      background: '/backgrounds/liverpool-waterfront.jpg',
      video: '/videos/liverpool-docks.mp4',
      gradient: 'from-cyan-900/70 via-blue-800/60 to-indigo-900/70',
      coordinates: { lat: 53.4084, lng: -2.9916 }
    },
    leeds: {
      name: 'Leeds',
      background: '/backgrounds/leeds-cityscape.jpg',
      video: '/videos/leeds-modern.mp4',
      gradient: 'from-purple-900/70 via-pink-800/60 to-rose-900/70',
      coordinates: { lat: 53.8008, lng: -1.5491 }
    },
    glasgow: {
      name: 'Glasgow',
      background: '/backgrounds/glasgow-architecture.jpg',
      video: '/videos/glasgow-heritage.mp4',
      gradient: 'from-amber-900/70 via-orange-800/60 to-red-900/70',
      coordinates: { lat: 55.8642, lng: -4.2518 }
    },
    edinburgh: {
      name: 'Edinburgh',
      background: '/backgrounds/edinburgh-castle.jpg',
      video: '/videos/edinburgh-historic.mp4',
      gradient: 'from-stone-900/70 via-slate-800/60 to-gray-900/70',
      coordinates: { lat: 55.9533, lng: -3.1883 }
    },
    bristol: {
      name: 'Bristol',
      background: '/backgrounds/bristol-bridge.jpg',
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
        }
      } catch (error) {
        console.log('City detection error:', error)
        setUserLocation('default')
        setBackgroundVideo(cityBackgrounds.default)
      }
    }

    detectUserCity()
  }, [])

  // Simulate reverse geocoding (replace with actual service in production)
  const getCityFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    // Major Australian city coordinates (approximate)
    const cities = [
      { name: 'Sydney', lat: -33.8688, lng: 151.2093, threshold: 1 },
      { name: 'Melbourne', lat: -37.8136, lng: 144.9631, threshold: 1 },
      { name: 'Brisbane', lat: -27.4698, lng: 153.0251, threshold: 1 },
      { name: 'Perth', lat: -31.9505, lng: 115.8605, threshold: 1 },
      { name: 'Adelaide', lat: -34.9285, lng: 138.6007, threshold: 1 },
      { name: 'Canberra', lat: -35.2809, lng: 149.1300, threshold: 0.5 },
      { name: 'Liverpool', lat: 53.4084, lng: -2.9916, threshold: 0.5 },
      { name: 'London', lat: 51.5074, lng: -0.1278, threshold: 1 },
      { name: 'Darwin', lat: -12.4634, lng: 130.8456, threshold: 1 },
      { name: 'Hobart', lat: -42.8821, lng: 147.3272, threshold: 1 },
    ]

    for (const city of cities) {
      const distance = Math.sqrt(
        Math.pow(lat - city.lat, 2) + Math.pow(lng - city.lng, 2)
      )
      if (distance < city.threshold) {
        return city.name
      }
    }

    return 'default'
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* SVG Background */}
      {backgroundVideo && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-50"
          style={{
            backgroundImage: `url(${backgroundVideo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Fallback animated gradient for cities without backgrounds */}
      <div className="absolute inset-0 animated-gradient opacity-40" />
      
      {/* City-specific overlay effects */}
      <div className="absolute inset-0">
        {userLocation === 'sydney' && (
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent" />
        )}
        {userLocation === 'melbourne' && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-orange-900/10" />
        )}
        {userLocation === 'brisbane' && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-green-900/10" />
        )}
        {userLocation === 'perth' && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 to-red-900/10" />
        )}
        {userLocation === 'liverpool' && (
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-blue-900/10" />
        )}
        {userLocation === 'london' && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-gold-900/10" />
        )}
      </div>
      
      {/* Location indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="glass px-3 py-1 text-sm text-white/80 rounded-full">
          📍 {userLocation.charAt(0).toUpperCase() + userLocation.slice(1)}
        </div>
      </div>
    </div>
  )
}

export default CityBackground

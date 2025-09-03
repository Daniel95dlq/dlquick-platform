'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface TrackingStage {
  id: string
  name: string
  description: string
  completed: boolean
  timestamp?: string
  icon: string
}

interface VehicleInfo {
  type: string
  regPlate: string
  branded: boolean
  driverName: string
  driverPhoto?: string
}

interface TrackingData {
  orderId: string
  status: 'preparing' | 'collected' | 'in-transit' | 'delivered' | 'cancelled'
  eta: string
  currentLocation: string
  vehicle: VehicleInfo
  stages: TrackingStage[]
  notes?: string[]
  photos?: string[]
}

const TrackPage: React.FC = () => {
  const [orderId, setOrderId] = useState('')
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock tracking data for demonstration
  const mockTrackingData: TrackingData = {
    orderId: 'DLQ-2024-089234',
    status: 'in-transit',
    eta: '14:30',
    currentLocation: 'Liverpool City Centre',
    vehicle: {
      type: 'Van',
      regPlate: 'DLQ 123',
      branded: true,
      driverName: 'James Wilson',
      driverPhoto: '/img/driver-placeholder.jpg'
    },
    stages: [
      {
        id: 'order-placed',
        name: 'Order Placed',
        description: 'Your order has been received and confirmed',
        completed: true,
        timestamp: '2024-09-03 12:15',
        icon: '📋'
      },
      {
        id: 'preparing',
        name: 'Preparing',
        description: 'Items are being prepared for collection',
        completed: true,
        timestamp: '2024-09-03 12:45',
        icon: '📦'
      },
      {
        id: 'collected',
        name: 'Collected',
        description: 'Items collected and loaded for delivery',
        completed: true,
        timestamp: '2024-09-03 13:20',
        icon: '🚚'
      },
      {
        id: 'in-transit',
        name: 'In Transit',
        description: 'On the way to your delivery address',
        completed: true,
        timestamp: '2024-09-03 13:45',
        icon: '🛣️'
      },
      {
        id: 'delivered',
        name: 'Delivered',
        description: 'Successfully delivered to recipient',
        completed: false,
        icon: '✅'
      }
    ],
    notes: [
      'Driver will ring doorbell',
      'Please ensure someone is available to receive',
      'Contact driver if any issues: 07123 456789'
    ],
    photos: []
  }

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) {
      setError('Please enter a valid order ID')
      return
    }

    setLoading(true)
    setError('')

    // Simulate API call
    setTimeout(() => {
      if (orderId.toLowerCase().includes('dlq') || orderId.length > 5) {
        setTrackingData(mockTrackingData)
      } else {
        setError('Order not found. Please check your order ID and try again.')
        setTrackingData(null)
      }
      setLoading(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'text-yellow-500'
      case 'collected': return 'text-blue-500'
      case 'in-transit': return 'text-purple-500'
      case 'delivered': return 'text-green-500'
      case 'cancelled': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-500/20'
      case 'collected': return 'bg-blue-500/20'
      case 'in-transit': return 'bg-purple-500/20'
      case 'delivered': return 'bg-green-500/20'
      case 'cancelled': return 'bg-red-500/20'
      default: return 'bg-gray-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Track Your <span className="text-brand-gold">Order</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enter your order ID below to get real-time updates on your delivery
            </p>
          </div>

          {/* Tracking Form */}
          <div className="glass-card max-w-2xl mx-auto mb-12">
            <form onSubmit={handleTrack} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-white mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. DLQ-2024-089234"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 backdrop-blur-sm"
                  required
                />
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-gold text-brand-navy font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Tracking Results */}
      {trackingData && (
        <section className="relative py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Order Status Overview */}
            <div className="glass-card mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Order #{trackingData.orderId}
                  </h2>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(trackingData.status)}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(trackingData.status).replace('text-', 'bg-')}`} />
                    <span className={getStatusColor(trackingData.status)}>
                      {trackingData.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-gray-300 text-sm">Estimated Delivery</p>
                  <p className="text-2xl font-bold text-brand-gold">{trackingData.eta}</p>
                  <p className="text-gray-400 text-sm">{trackingData.currentLocation}</p>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center space-x-4">
                  {trackingData.vehicle.driverPhoto && (
                    <img
                      src={trackingData.vehicle.driverPhoto}
                      alt={trackingData.vehicle.driverName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-white">{trackingData.vehicle.driverName}</p>
                    <p className="text-gray-300 text-sm">
                      {trackingData.vehicle.branded ? 'DLQuick' : 'Partner'} {trackingData.vehicle.type} - {trackingData.vehicle.regPlate}
                    </p>
                  </div>
                  <div className="flex-1" />
                  <button className="glass-button text-sm">
                    📞 Contact Driver
                  </button>
                </div>
              </div>
            </div>

            {/* Tracking Stages */}
            <div className="glass-card mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Delivery Progress</h3>
              
              <div className="space-y-4">
                {trackingData.stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-start space-x-4 relative">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      stage.completed 
                        ? 'bg-brand-gold text-brand-navy' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {stage.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-medium ${stage.completed ? 'text-white' : 'text-gray-400'}`}>
                            {stage.name}
                          </h4>
                          <p className={`text-sm ${stage.completed ? 'text-gray-300' : 'text-gray-500'}`}>
                            {stage.description}
                          </p>
                        </div>
                        {stage.timestamp && (
                          <span className="text-xs text-gray-400">
                            {stage.timestamp}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Notes */}
            {trackingData.notes && trackingData.notes.length > 0 && (
              <div className="glass-card mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Delivery Notes</h3>
                <ul className="space-y-2">
                  {trackingData.notes.map((note, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-brand-gold mt-1">•</span>
                      <span className="text-gray-300 text-sm">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/help" className="glass-button text-center">
                ❓ Need Help?
              </Link>
              <Link href="/services" className="glass-button text-center">
                📦 Book Another Service
              </Link>
              <button className="glass-button">
                📧 Email Updates
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Quick Access */}
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-bold text-white mb-2">Download App</h3>
              <p className="text-gray-300 text-sm mb-4">Get real-time notifications</p>
              <button className="glass-button w-full">Download</button>
            </div>
            
            <div className="glass-card text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-3">🔔</div>
              <h3 className="font-bold text-white mb-2">SMS Updates</h3>
              <p className="text-gray-300 text-sm mb-4">Get delivery updates via SMS</p>
              <button className="glass-button w-full">Subscribe</button>
            </div>
            
            <div className="glass-card text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-bold text-white mb-2">Email Tracking</h3>
              <p className="text-gray-300 text-sm mb-4">Full delivery report via email</p>
              <button className="glass-button w-full">Enable</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TrackPage

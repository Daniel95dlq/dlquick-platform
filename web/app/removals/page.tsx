'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface RemovalOption {
  id: string
  name: string
  basePrice: number
  description: string
}

interface ExtraService {
  id: string
  name: string
  price: number
  description: string
  category: 'helpers' | 'materials' | 'services' | 'access'
}

interface RemovalCalculation {
  basePrice: number
  extras: { [key: string]: number }
  total: number
  breakdown: { item: string; price: number }[]
}

const RemovalsPage: React.FC = () => {
  // Form state
  const [propertyType, setPropertyType] = useState<string>('')
  const [fromFloor, setFromFloor] = useState<number>(0)
  const [toFloor, setToFloor] = useState<number>(0)
  const [fromLift, setFromLift] = useState<boolean>(false)
  const [toLift, setToLift] = useState<boolean>(false)
  const [helpers, setHelpers] = useState<number>(1)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [extraStops, setExtraStops] = useState<number>(0)
  const [calculation, setCalculation] = useState<RemovalCalculation | null>(null)

  // Property types with base pricing
  const propertyTypes: RemovalOption[] = [
    {
      id: 'studio',
      name: 'Studio/Bedsit',
      basePrice: 199,
      description: 'Small studio apartment or bedsit'
    },
    {
      id: '1-bed',
      name: '1 Bedroom',
      basePrice: 299,
      description: '1 bedroom flat or house'
    },
    {
      id: '2-bed',
      name: '2 Bedroom',
      basePrice: 399,
      description: '2 bedroom flat or house'
    },
    {
      id: '3-bed',
      name: '3 Bedroom',
      basePrice: 549,
      description: '3 bedroom house'
    },
    {
      id: '4-bed',
      name: '4+ Bedroom',
      basePrice: 699,
      description: '4+ bedroom house'
    },
    {
      id: 'office-small',
      name: 'Small Office',
      basePrice: 399,
      description: 'Small office or commercial space'
    },
    {
      id: 'office-large',
      name: 'Large Office',
      basePrice: 799,
      description: 'Large office or warehouse'
    }
  ]

  // Extra services
  const extraServices: ExtraService[] = [
    // Helpers
    { id: 'helper-1', name: '1 Additional Helper', price: 25, description: 'Extra pair of hands (per hour)', category: 'helpers' },
    { id: 'helper-2', name: '2 Additional Helpers', price: 45, description: 'Two extra helpers (per hour)', category: 'helpers' },
    { id: 'helper-3', name: '3+ Additional Helpers', price: 65, description: 'Three or more helpers (per hour)', category: 'helpers' },
    
    // Materials & Protection
    { id: 'packing-materials', name: 'Packing Materials', price: 45, description: 'Boxes, tape, bubble wrap, etc.', category: 'materials' },
    { id: 'protective-covers', name: 'Protective Covers', price: 25, description: 'Furniture covers and protection', category: 'materials' },
    { id: 'wardrobe-boxes', name: 'Wardrobe Boxes', price: 35, description: 'Hanging wardrobe boxes (set of 5)', category: 'materials' },
    
    // Services
    { id: 'packing-service', name: 'Full Packing Service', price: 125, description: 'Professional packing service', category: 'services' },
    { id: 'unpacking-service', name: 'Unpacking Service', price: 85, description: 'Professional unpacking service', category: 'services' },
    { id: 'dismantling', name: 'Dismantling & Assembly', price: 65, description: 'Furniture dismantling and reassembly', category: 'services' },
    { id: 'cleaning-service', name: 'End of Tenancy Clean', price: 145, description: 'Professional cleaning after move', category: 'services' },
    
    // Access & Special Requirements
    { id: 'parking-permit', name: 'Parking Permit', price: 35, description: 'Council parking permit arrangement', category: 'access' },
    { id: 'storage-temp', name: 'Temporary Storage (7 days)', price: 95, description: '7 days storage if needed', category: 'access' },
    { id: 'piano-move', name: 'Piano Moving', price: 185, description: 'Specialist piano moving service', category: 'access' },
    { id: 'appliance-disconnect', name: 'Appliance Disconnection', price: 45, description: 'Safe disconnection of appliances', category: 'access' }
  ]

  // Calculate pricing
  const calculatePrice = () => {
    if (!propertyType) return

    const selectedProperty = propertyTypes.find(p => p.id === propertyType)
    if (!selectedProperty) return

    let basePrice = selectedProperty.basePrice
    const breakdown: { item: string; price: number }[] = [
      { item: selectedProperty.name, price: basePrice }
    ]

    // Floor charges (only if no lift)
    let floorCharges = 0
    if (!fromLift && fromFloor > 0) {
      floorCharges += fromFloor * 15 // £15 per floor
    }
    if (!toLift && toFloor > 0) {
      floorCharges += toFloor * 15
    }
    if (floorCharges > 0) {
      breakdown.push({ item: `Floor charges (${fromFloor + toFloor} floors)`, price: floorCharges })
    }

    // Helper charges
    let helperCharges = 0
    if (helpers > 1) {
      const additionalHelpers = helpers - 1
      helperCharges = additionalHelpers * 25 // £25 per additional helper per hour (estimated 4 hours)
      helperCharges *= 4 // 4 hour average
      breakdown.push({ item: `${additionalHelpers} Additional Helper${additionalHelpers > 1 ? 's' : ''} (4 hrs)`, price: helperCharges })
    }

    // Extra stops
    let stopCharges = 0
    if (extraStops > 0) {
      stopCharges = extraStops * 45 // £45 per extra stop
      breakdown.push({ item: `${extraStops} Extra Stop${extraStops > 1 ? 's' : ''}`, price: stopCharges })
    }

    // Extra services
    let extraCharges = 0
    const extras: { [key: string]: number } = {}
    selectedExtras.forEach(extraId => {
      const extra = extraServices.find(e => e.id === extraId)
      if (extra) {
        extraCharges += extra.price
        extras[extraId] = extra.price
        breakdown.push({ item: extra.name, price: extra.price })
      }
    })

    const total = basePrice + floorCharges + helperCharges + stopCharges + extraCharges

    setCalculation({
      basePrice,
      extras,
      total,
      breakdown
    })
  }

  // Auto-calculate when form changes
  useEffect(() => {
    calculatePrice()
  }, [propertyType, fromFloor, toFloor, fromLift, toLift, helpers, selectedExtras, extraStops])

  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    )
  }

  const groupedExtras = extraServices.reduce((groups, extra) => {
    const category = extra.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(extra)
    return groups
  }, {} as { [key: string]: ExtraService[] })

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-navy via-brand-navy/90 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/90 to-brand-navy/70" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Removals <span className="text-brand-gold">Calculator</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get an instant quote for your home or office removal. Our transparent pricing 
              includes all standard services with no hidden costs.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Property Type */}
              <div className="glass-card">
                <h3 className="text-2xl font-bold text-white mb-6">Property Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyTypes.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => setPropertyType(property.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        propertyType === property.id
                          ? 'border-brand-gold bg-brand-gold/20 text-white'
                          : 'border-white/20 bg-white/5 text-gray-300 hover:border-brand-gold/50'
                      }`}
                    >
                      <div className="font-bold text-lg">{property.name}</div>
                      <div className="text-sm opacity-80 mb-2">{property.description}</div>
                      <div className="text-brand-gold font-bold">From £{property.basePrice}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Access Details */}
              <div className="glass-card">
                <h3 className="text-2xl font-bold text-white mb-6">Access Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* From Address */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">From Address</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Floor Level</label>
                        <select
                          value={fromFloor}
                          onChange={(e) => setFromFloor(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                        >
                          <option value={0}>Ground Floor</option>
                          <option value={1}>1st Floor</option>
                          <option value={2}>2nd Floor</option>
                          <option value={3}>3rd Floor</option>
                          <option value={4}>4th Floor</option>
                          <option value={5}>5th Floor+</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="fromLift"
                          checked={fromLift}
                          onChange={(e) => setFromLift(e.target.checked)}
                          className="mr-2 w-4 h-4 text-brand-gold"
                        />
                        <label htmlFor="fromLift" className="text-gray-300">Lift Available</label>
                      </div>
                    </div>
                  </div>

                  {/* To Address */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">To Address</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Floor Level</label>
                        <select
                          value={toFloor}
                          onChange={(e) => setToFloor(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                        >
                          <option value={0}>Ground Floor</option>
                          <option value={1}>1st Floor</option>
                          <option value={2}>2nd Floor</option>
                          <option value={3}>3rd Floor</option>
                          <option value={4}>4th Floor</option>
                          <option value={5}>5th Floor+</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="toLift"
                          checked={toLift}
                          onChange={(e) => setToLift(e.target.checked)}
                          className="mr-2 w-4 h-4 text-brand-gold"
                        />
                        <label htmlFor="toLift" className="text-gray-300">Lift Available</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Size & Extras */}
              <div className="glass-card">
                <h3 className="text-2xl font-bold text-white mb-6">Team & Additional Services</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of Helpers</label>
                    <select
                      value={helpers}
                      onChange={(e) => setHelpers(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                    >
                      <option value={1}>1 Helper (Standard)</option>
                      <option value={2}>2 Helpers (+£25/hr each)</option>
                      <option value={3}>3 Helpers (+£25/hr each)</option>
                      <option value={4}>4 Helpers (+£25/hr each)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Extra Stops</label>
                    <select
                      value={extraStops}
                      onChange={(e) => setExtraStops(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
                    >
                      <option value={0}>No Extra Stops</option>
                      <option value={1}>1 Extra Stop (+£45)</option>
                      <option value={2}>2 Extra Stops (+£45 each)</option>
                      <option value={3}>3+ Extra Stops (+£45 each)</option>
                    </select>
                  </div>
                </div>

                {/* Extra Services by Category */}
                {Object.entries(groupedExtras).map(([category, services]) => (
                  <div key={category} className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3 capitalize">
                      {category.replace('-', ' ')}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => toggleExtra(service.id)}
                          className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                            selectedExtras.includes(service.id)
                              ? 'border-brand-gold bg-brand-gold/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-brand-gold/50'
                          }`}
                        >
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm opacity-80">{service.description}</div>
                          <div className="text-brand-gold font-bold mt-1">+£{service.price}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Summary Column */}
            <div className="lg:col-span-1">
              <div className="glass-card sticky top-8">
                <h3 className="text-2xl font-bold text-white mb-6">Quote Summary</h3>
                
                {calculation && propertyType ? (
                  <div className="space-y-4">
                    {/* Breakdown */}
                    <div className="space-y-2">
                      {calculation.breakdown.map((item, index) => (
                        <div key={index} className="flex justify-between text-gray-300">
                          <span className="text-sm">{item.item}</span>
                          <span className="font-medium">£{item.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <hr className="border-white/20" />
                    
                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total</span>
                      <span className="text-3xl font-bold text-brand-gold">£{calculation.total}</span>
                    </div>
                    
                    <div className="text-xs text-gray-400 mt-2">
                      * Price includes: Professional removal team, fully insured service, 
                      basic moving equipment. Additional time charged at £65/hour.
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3 mt-6">
                      <button className="w-full bg-brand-gold text-brand-navy font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-300">
                        Book This Removal
                      </button>
                      <button className="w-full glass-button">
                        Get Detailed Quote
                      </button>
                      <Link href="/track" className="block w-full glass-button text-center">
                        Track Existing Order
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    <div className="text-4xl mb-4">📦</div>
                    <p>Select a property type to see your quote</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-white mb-2">Fully Insured</h3>
              <p className="text-gray-300 text-sm">Complete protection for your belongings during the move</p>
            </div>
            
            <div className="glass-card text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="font-bold text-white mb-2">Professional Team</h3>
              <p className="text-gray-300 text-sm">Experienced removals specialists with background checks</p>
            </div>
            
            <div className="glass-card text-center">
              <div className="text-3xl mb-3">💯</div>
              <h3 className="font-bold text-white mb-2">No Hidden Costs</h3>
              <p className="text-gray-300 text-sm">Transparent pricing with everything included in your quote</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RemovalsPage

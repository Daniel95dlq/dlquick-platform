'use client'

import { useState } from 'react'
import Link from 'next/link'
import BookingDrawer from '@/components/BookingDrawer'

interface ServiceDetailClientProps {
  service: {
    id: string
    name: string
    slug: string
    description: string | null
    shortDesc: string | null
    basePrice: number
    priceType: string
    timeEstimate: string | null
    features: string | null
    subcategory: {
      name: string
      slug: string
      category: {
        name: string
        slug: string
        pillar: string
      }
    }
  }
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const features = service.features ? JSON.parse(service.features) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      {/* Breadcrumb */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/services`} className="hover:text-white transition-colors">{service.subcategory.category.name}</Link>
            <span>/</span>
            <span className="text-white">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Service Details */}
      <div className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white/90 mb-4">
                    {service.subcategory.category.name} → {service.subcategory.name}
                  </span>
                  <h1 className="text-4xl font-bold text-white mb-4">{service.name}</h1>
                  {service.shortDesc && (
                    <p className="text-xl text-white/80">{service.shortDesc}</p>
                  )}
                </div>

                {service.description && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                    <p className="text-white/70 leading-relaxed">{service.description}</p>
                  </div>
                )}

                {features.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">What's Included</h2>
                    <ul className="space-y-3">
                      {features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center text-white/80">
                          <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Pricing</h3>
                    <div className="text-3xl font-bold text-white">
                      £{service.basePrice}
                      {service.priceType === 'HOURLY' && <span className="text-lg">/hr</span>}
                      {service.priceType === 'QUOTE' && <span className="text-lg"> from</span>}
                    </div>
                    <p className="text-white/60 text-sm mt-2">
                      {service.priceType === 'FIXED' && 'Fixed price'}
                      {service.priceType === 'HOURLY' && 'Per hour'}
                      {service.priceType === 'QUOTE' && 'Custom quote'}
                    </p>
                  </div>

                  {service.timeEstimate && (
                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Time Estimate</h3>
                      <div className="text-2xl font-bold text-white">{service.timeEstimate}</div>
                      <p className="text-white/60 text-sm mt-2">Typical completion time</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 sticky top-8">
                <h3 className="text-2xl font-bold text-white mb-6">Ready to book?</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-white/80">
                    <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Professional service
                  </div>
                  <div className="flex items-center text-white/80">
                    <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Insured & reliable
                  </div>
                  <div className="flex items-center text-white/80">
                    <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Customer support
                  </div>
                </div>

                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-6 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-200 transform hover:scale-105 mb-4"
                >
                  Book Now - £{service.basePrice}
                  {service.priceType === 'HOURLY' && '/hr'}
                  {service.priceType === 'QUOTE' && ' from'}
                </button>

                <p className="text-white/60 text-sm text-center">
                  Free consultation • No upfront payment required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Drawer */}
      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={{
          id: service.id,
          name: service.name,
          basePrice: service.basePrice,
          priceType: service.priceType,
        }}
      />
    </div>
  )
}

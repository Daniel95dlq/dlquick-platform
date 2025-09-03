'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface ServiceTabsProps {
  className?: string
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('jobs')
  const [activeService, setActiveService] = useState('delivery')

  const jobCategories = {
    delivery: {
      title: 'Delivery Drivers',
      icon: '🚗',
      video: '/videos/delivery-driver.mp4',
      background: 'from-blue-900/80 to-cyan-900/80',
      positions: [
        { title: 'Food Delivery Driver', pay: '£12-18/hour', type: 'Immediate Start', requirements: 'Valid Licence, Own Vehicle' },
        { title: 'Parcel Driver', pay: '£10-15/hour', type: 'Full/Part Time', requirements: 'Clean Driving Record' },
        { title: 'Van Driver', pay: '£15-22/hour', type: 'Contract', requirements: 'Van License, Insurance' },
        { title: 'Cycle Courier', pay: '£8-12/hour', type: 'Flexible Hours', requirements: 'Own Bike, Fitness' }
      ]
    },
    removals: {
      title: 'Removals Team',
      icon: '📦',
      video: '/videos/removals-team.mp4',
      background: 'from-green-900/80 to-emerald-900/80',
      positions: [
        { title: 'Removals Porter', pay: '£11-16/hour', type: 'Team Work', requirements: 'Physical Fitness, Lifting' },
        { title: 'Team Leader', pay: '£16-22/hour', type: 'Leadership', requirements: 'Experience, Management' },
        { title: 'Van Driver (Removals)', pay: '£14-20/hour', type: 'Specialized', requirements: 'Large Vehicle License' },
        { title: 'Packing Specialist', pay: '£10-14/hour', type: 'Detail Work', requirements: 'Care, Attention to Detail' }
      ]
    },
    trades: {
      title: 'Trade Services',
      icon: '🔧',
      video: '/videos/trade-work.mp4',
      background: 'from-orange-900/80 to-red-900/80',
      positions: [
        { title: 'Plumber', pay: '£20-35/hour', type: 'Qualified', requirements: 'City & Guilds, Gas Safe' },
        { title: 'Electrician', pay: '£18-30/hour', type: 'Certified', requirements: '18th Edition, NICEIC' },
        { title: 'Handyman', pay: '£15-25/hour', type: 'Multi-Skill', requirements: 'Tools, Experience' },
        { title: 'Carpenter', pay: '£16-28/hour', type: 'Skilled', requirements: 'NVQ, Portfolio' }
      ]
    },
    cleaning: {
      title: 'Home Services',
      icon: '🏠',
      video: '/videos/home-services.mp4',
      background: 'from-purple-900/80 to-pink-900/80',
      positions: [
        { title: 'House Cleaner', pay: '£10-15/hour', type: 'Regular Work', requirements: 'DBS Check, References' },
        { title: 'Garden Maintenance', pay: '£12-18/hour', type: 'Outdoor Work', requirements: 'Tools, Experience' },
        { title: 'Pet Care Assistant', pay: '£9-14/hour', type: 'Animal Care', requirements: 'Love for Animals' },
        { title: 'Personal Assistant', pay: '£11-16/hour', type: 'Support Work', requirements: 'Organization Skills' }
      ]
    }
  }

  const serviceCategories = {
    delivery: {
      title: 'Delivery Services',
      icon: '🚚',
      video: '/videos/delivery-service.mp4',
      background: 'from-blue-900/80 to-indigo-900/80',
      services: [
        { name: 'Food Delivery', price: 'From £3.99', time: '15-45 mins', description: 'Restaurant & takeaway delivery' },
        { name: 'Grocery Shopping', price: 'From £4.99', time: '30-90 mins', description: 'Fresh groceries delivered' },
        { name: 'Parcel Delivery', price: 'From £2.99', time: 'Same day', description: 'Local & nationwide parcels' },
        { name: 'Pharmacy Delivery', price: 'From £3.49', time: '20-60 mins', description: 'Prescription & health items' }
      ]
    },
    removals: {
      title: 'Moving & Storage',
      icon: '🏠',
      video: '/videos/moving-service.mp4',
      background: 'from-green-900/80 to-teal-900/80',
      services: [
        { name: 'House Removals', price: 'From £299', time: '4-8 hours', description: 'Complete home moving service' },
        { name: 'Office Relocation', price: 'From £199', time: '2-6 hours', description: 'Business moving solutions' },
        { name: 'Storage Solutions', price: 'From £89/month', time: 'Flexible', description: 'Secure storage facilities' },
        { name: 'Man & Van', price: 'From £49/hour', time: 'By hour', description: 'Flexible moving help' }
      ]
    },
    trades: {
      title: 'Professional Trades',
      icon: '⚡',
      video: '/videos/trade-services.mp4',
      background: 'from-yellow-900/80 to-orange-900/80',
      services: [
        { name: 'Emergency Plumber', price: 'From £75', time: '30-90 mins', description: '24/7 plumbing emergency' },
        { name: 'Electrician', price: 'From £65', time: '45-120 mins', description: 'Electrical repairs & installs' },
        { name: 'Handyman', price: 'From £45/hour', time: 'Same day', description: 'General maintenance & repairs' },
        { name: 'Appliance Repair', price: 'From £55', time: '60-180 mins', description: 'White goods & electronics' }
      ]
    },
    personal: {
      title: 'Personal Services',
      icon: '💼',
      video: '/videos/personal-services.mp4',
      background: 'from-purple-900/80 to-pink-900/80',
      services: [
        { name: 'House Cleaning', price: 'From £35', time: '2-4 hours', description: 'Professional home cleaning' },
        { name: 'Pet Walking', price: 'From £15', time: '30-60 mins', description: 'Dog walking & pet care' },
        { name: 'Personal Shopping', price: 'From £25', time: '1-3 hours', description: 'Shopping & errand services' },
        { name: 'Elderly Care', price: 'From £18/hour', time: 'Flexible', description: 'Companion & care services' }
      ]
    }
  }

  return (
    <div className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 flex space-x-2">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'jobs'
                  ? 'bg-brand-gold text-brand-navy shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              💼 Find Work
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'services'
                  ? 'bg-brand-gold text-brand-navy shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              🛍️ Book Services
            </button>
          </div>
        </div>

        {/* Jobs Section */}
        {activeTab === 'jobs' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Join Our <span className="text-brand-gold">Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Flexible work opportunities with competitive pay. Start earning with DLQuick today.
              </p>
            </div>

            {/* Job Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.entries(jobCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveService(key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeService === key
                      ? 'glass-card bg-white/20 text-white border-brand-gold'
                      : 'glass-card text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            {/* Active Job Category Content */}
            <div className="relative">
              {Object.entries(jobCategories).map(([key, category]) => (
                activeService === key && (
                  <div key={key} className="relative overflow-hidden rounded-2xl">
                    {/* Background Video */}
                    <div className="absolute inset-0">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-40"
                      >
                        <source src={category.video} type="video/mp4" />
                      </video>
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.background}`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {category.positions.map((position, index) => (
                          <div key={index} className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-bold text-white mb-2">{position.title}</h3>
                            <div className="text-brand-gold font-bold text-lg mb-1">{position.pay}</div>
                            <div className="text-green-400 text-sm mb-3">{position.type}</div>
                            <p className="text-gray-300 text-sm mb-4">{position.requirements}</p>
                            <button className="w-full bg-brand-gold text-brand-navy font-semibold py-2 px-4 rounded-lg hover:bg-brand-gold/90 transition-colors">
                              Apply Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Services Section */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Book <span className="text-brand-gold">Services</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Professional services at your fingertips. Fast, reliable, and trusted.
              </p>
            </div>

            {/* Service Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.entries(serviceCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveService(key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeService === key
                      ? 'glass-card bg-white/20 text-white border-brand-gold'
                      : 'glass-card text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            {/* Active Service Category Content */}
            <div className="relative">
              {Object.entries(serviceCategories).map(([key, category]) => (
                activeService === key && (
                  <div key={key} className="relative overflow-hidden rounded-2xl">
                    {/* Background Video */}
                    <div className="absolute inset-0">
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-40"
                      >
                        <source src={category.video} type="video/mp4" />
                      </video>
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.background}`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {category.services.map((service, index) => (
                          <div key={index} className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                            <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                            <div className="text-brand-gold font-bold text-lg mb-1">{service.price}</div>
                            <div className="text-green-400 text-sm mb-3">⏱️ {service.time}</div>
                            <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                            <button className="w-full bg-brand-gold text-brand-navy font-semibold py-2 px-4 rounded-lg hover:bg-brand-gold/90 transition-colors">
                              Book Now
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to get started?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of satisfied customers and workers using DLQuick every day.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/partners" className="bg-brand-gold text-brand-navy font-semibold py-3 px-6 rounded-lg hover:bg-brand-gold/90 transition-colors">
                Join as Partner
              </Link>
              <Link href="/services" className="border border-white/30 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceTabs

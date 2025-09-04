'use client';

import { useState } from 'react';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = {
    delivery: [
      {
        name: 'Same-Day Delivery',
        description: 'Get your packages delivered within hours',
        price: 'From £5.99',
        time: '2-4 hours',
        icon: '📦',
        features: ['Real-time tracking', 'Insurance included', 'Photo confirmation']
      },
      {
        name: 'Express Delivery',
        description: 'Ultra-fast delivery for urgent items',
        price: 'From £9.99',
        time: '30-60 minutes',
        icon: '⚡',
        features: ['Priority handling', 'Live GPS tracking', 'Direct delivery']
      }
    ],
    food: [
      {
        name: 'Restaurant Delivery',
        description: 'Hot meals from your favorite restaurants',
        price: 'From £2.99',
        time: '20-45 minutes',
        icon: '🍕',
        features: ['Temperature controlled', 'Multiple restaurants', 'Group orders']
      },
      {
        name: 'Grocery Delivery',
        description: 'Fresh groceries and essentials',
        price: 'From £3.99',
        time: '30-90 minutes',
        icon: '🛒',
        features: ['Fresh produce selection', 'Substitution options', 'Bulk orders']
      }
    ],
    business: [
      {
        name: 'Business Courier',
        description: 'Professional document and package delivery',
        price: 'From £7.99',
        time: '1-3 hours',
        icon: '💼',
        features: ['Proof of delivery', 'Chain of custody', 'Invoice billing']
      },
      {
        name: 'Removals Service',
        description: 'Professional moving and furniture delivery',
        price: 'From £49.99',
        time: '2-6 hours',
        icon: '🚚',
        features: ['Professional movers', 'Furniture protection', 'Assembly service']
      }
    ]
  };

  const allServices = Object.values(services).flat();
  const filteredServices = selectedCategory === 'all' ? allServices : services[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-2">
              <img src="/dlq-winged-clock-logo.svg" alt="DLQuick" className="w-10 h-10" />
              <span className="text-xl font-bold text-white">DLQuick</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/services" className="text-yellow-400 font-semibold">Services</a>
              <a href="/partners" className="text-gray-300 hover:text-white transition-colors">Partners</a>
              <a href="/track" className="text-gray-300 hover:text-white transition-colors">Track</a>
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            From lightning-fast food delivery to professional removals, we've got all your delivery needs covered across Liverpool and London.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-yellow-500 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setSelectedCategory('delivery')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              selectedCategory === 'delivery'
                ? 'bg-yellow-500 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            📦 Delivery
          </button>
          <button
            onClick={() => setSelectedCategory('food')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              selectedCategory === 'food'
                ? 'bg-yellow-500 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🍕 Food & Groceries
          </button>
          <button
            onClick={() => setSelectedCategory('business')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              selectedCategory === 'business'
                ? 'bg-yellow-500 text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            💼 Business
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-blue-200 mb-4">{service.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Price:</span>
                  <span className="text-yellow-400 font-bold">{service.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Delivery Time:</span>
                  <span className="text-green-400 font-semibold">{service.time}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-blue-200 text-sm flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200">
                Order Now
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need something custom?
            </h2>
            <p className="text-blue-200 mb-6">
              Can't find what you're looking for? We offer bespoke delivery solutions tailored to your specific needs.
            </p>
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200">
              Contact Us for Custom Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

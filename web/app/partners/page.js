'use client';

import { useState } from 'react';

export default function PartnersPage() {
  const [applicationData, setApplicationData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    location: '',
    experience: '',
    vehicles: '',
    availability: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Partner application:', applicationData);
    alert('Thank you for your interest! We will review your application and contact you within 48 hours.');
    setApplicationData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: '',
      location: '',
      experience: '',
      vehicles: '',
      availability: '',
      message: ''
    });
  };

  const benefits = [
    {
      icon: '💰',
      title: 'Competitive Earnings',
      description: 'Earn up to £25/hour during peak times with transparent pricing'
    },
    {
      icon: '📱',
      title: 'Easy-to-Use App',
      description: 'Professional driver app with route optimization and real-time updates'
    },
    {
      icon: '🚀',
      title: 'Flexible Schedule',
      description: 'Work when you want, where you want. Full-time or part-time options'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Track your earnings, ratings, and performance with detailed insights'
    },
    {
      icon: '🛡️',
      title: 'Insurance Coverage',
      description: 'Comprehensive insurance coverage for you and your vehicle while working'
    },
    {
      icon: '🎯',
      title: 'Priority Support',
      description: '24/7 partner support line with dedicated account managers'
    }
  ];

  const partnerTypes = [
    {
      type: 'Individual Driver',
      description: 'Perfect for drivers with their own vehicle looking for flexible work',
      requirements: ['Valid UK driving license', 'Insured vehicle', 'Smartphone', 'Background check'],
      earning: '£12-25/hour'
    },
    {
      type: 'Courier Company',
      description: 'Established courier services looking to expand their client base',
      requirements: ['Business registration', 'Fleet of vehicles', 'Experienced drivers', 'Commercial insurance'],
      earning: 'Volume-based pricing'
    },
    {
      type: 'Restaurant Partner',
      description: 'Restaurants wanting to offer delivery without managing their own fleet',
      requirements: ['Food business license', 'Hygiene rating', 'Order management system', 'Quality standards'],
      earning: 'Commission-based'
    }
  ];

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
              <a href="/services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="/partners" className="text-yellow-400 font-semibold">Partners</a>
              <a href="/track" className="text-gray-300 hover:text-white transition-colors">Track</a>
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Join Our Network
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Become a DLQuick partner and be part of the UK's fastest-growing delivery platform. Whether you're a driver, courier company, or restaurant, we have opportunities for you.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-blue-200">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Partnership Options</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerTypes.map((partner, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{partner.type}</h3>
                <p className="text-blue-200 mb-6">{partner.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {partner.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="text-blue-200 text-sm flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <span className="text-yellow-400 font-bold">Earning Potential: {partner.earning}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Apply to Become a Partner</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Business/Company Name</label>
                <input
                  type="text"
                  name="businessName"
                  required
                  value={applicationData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Contact Name</label>
                <input
                  type="text"
                  name="contactName"
                  required
                  value={applicationData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={applicationData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={applicationData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="+44 7xxx xxx xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Business Type</label>
                <select
                  name="businessType"
                  required
                  value={applicationData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select business type</option>
                  <option value="individual">Individual Driver</option>
                  <option value="courier">Courier Company</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Location</label>
                <select
                  name="location"
                  required
                  value={applicationData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="">Select your location</option>
                  <option value="london">London</option>
                  <option value="liverpool">Liverpool</option>
                  <option value="both">Both Cities</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Years of Experience</label>
              <input
                type="text"
                name="experience"
                required
                value={applicationData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., 3 years in courier services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Vehicle Information</label>
              <input
                type="text"
                name="vehicles"
                required
                value={applicationData.vehicles}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., 2 vans, 1 motorcycle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Availability</label>
              <input
                type="text"
                name="availability"
                required
                value={applicationData.availability}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., Mon-Fri 9am-6pm, Weekends available"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Additional Information</label>
              <textarea
                name="message"
                value={applicationData.message}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                placeholder="Tell us more about your business and why you want to partner with DLQuick..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105"
            >
              🚀 Submit Application
            </button>

            <p className="text-xs text-gray-300 text-center">
              We'll review your application and contact you within 48 hours. All applications are treated confidentially.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

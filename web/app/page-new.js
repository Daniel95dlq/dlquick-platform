'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('london'); 
  const [bgImage, setBgImage] = useState('/london-background.svg');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    details: ''
  });

  // Load services data
  useEffect(() => {
    fetch('/content/services-complete.json')
      .then(res => res.json())
      .then(data => setServices(data.categories))
      .catch(err => console.error('Error loading services:', err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          const liverpoolLat = 53.4084;
          const liverpoolLng = -2.9916;
          const londonLat = 51.5074;
          const londonLng = -0.1278;
          
          const distanceToLiverpool = Math.sqrt(
            Math.pow(latitude - liverpoolLat, 2) + Math.pow(longitude - liverpoolLng, 2)
          );
          const distanceToLondon = Math.sqrt(
            Math.pow(latitude - londonLat, 2) + Math.pow(longitude - londonLng, 2)
          );
          
          if (distanceToLiverpool < distanceToLondon) {
            setCity('liverpool');
            setBgImage('/liverpool-background.svg');
            setLocation('Liverpool, UK');
          } else {
            setCity('london');
            setBgImage('/london-background.svg');
            setLocation('London, UK');
          }
        },
        (error) => {
          console.error('Location error:', error);
          setCity('london');
          setBgImage('/london-background.svg');
          setLocation('London, UK');
        }
      );
    } else {
      setLocation('London, UK');
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('Service request:', formData);
    alert(`Thank you ${formData.name}! Your ${formData.service} request has been submitted. We'll contact you within 15 minutes.`);
    
    setActiveModal(null);
    setSelectedService(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      service: '',
      details: ''
    });
  };

  const openServiceModal = (serviceName) => {
    setSelectedService(serviceName);
    setFormData({ ...formData, service: serviceName });
    setActiveModal('request');
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    
    const mockTrackingData = {
      'DLQ123456': {
        status: 'In Transit',
        location: city === 'liverpool' ? 'Liverpool Central Hub' : 'London Warehouse',
        estimatedDelivery: '2:30 PM today',
        progress: 75,
        updates: [
          { time: '10:00 AM', status: 'Order confirmed', location: 'Store pickup completed' },
          { time: '10:45 AM', status: 'In transit', location: `${city} delivery hub` },
          { time: '1:30 PM', status: 'Out for delivery', location: `${city} courier van` },
        ]
      },
      'DLQ789012': {
        status: 'Delivered',
        location: 'Your doorstep',
        estimatedDelivery: 'Completed',
        progress: 100,
        updates: [
          { time: '9:00 AM', status: 'Order confirmed', location: 'Store pickup completed' },
          { time: '9:30 AM', status: 'In transit', location: `${city} delivery hub` },
          { time: '11:15 AM', status: 'Delivered', location: 'Left at front door' },
        ]
      }
    };

    const result = mockTrackingData[trackingNumber] || {
      status: 'Not Found',
      location: 'Order not found',
      estimatedDelivery: 'N/A',
      progress: 0,
      updates: []
    };

    setTrackingResult(result);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background with City Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(11, 26, 58, 0.7), rgba(7, 14, 34, 0.8)), url('${bgImage}')`,
          zIndex: -2
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div 
        className="fixed inset-0 opacity-60 animate-gradient"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(11, 26, 58, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          zIndex: -1
        }}
      />

      {/* Header Navigation */}
      <header className="relative z-20 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/dlq-winged-clock-logo.svg" 
                  alt="DLQuick Winged Clock" 
                  className="w-12 h-12 drop-shadow-2xl animate-glow" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent">
                  DLQuick
                </h1>
                <p className="text-xs text-white/70 font-medium">Lightning Fast Delivery</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setActiveModal('services')}
                className="glass-button text-white hover:text-yellow-400 transition-all duration-300 font-medium"
              >
                🚚 All Services
              </button>
              <button 
                onClick={() => setActiveModal('tracking')}
                className="glass-button text-white hover:text-yellow-400 transition-all duration-300 font-medium"
              >
                📱 Track Order
              </button>
              <div className="hidden md:flex items-center space-x-2 text-white/80 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                📍 {location || `${city.charAt(0).toUpperCase() + city.slice(1)}, UK`}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 pt-16">
        <section className="container mx-auto px-6 py-16 text-center">
          
          <div className="max-w-5xl mx-auto">
            
            {/* Main Logo Display */}
            <div className="mb-12 relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-full w-48 h-48 mx-auto animate-pulse opacity-30"></div>
              <img 
                src="/dlq-winged-clock-logo.svg" 
                alt="DLQuick Winged Clock" 
                className="w-40 h-40 mx-auto relative z-10 drop-shadow-2xl animate-float" 
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 60px rgba(212, 175, 55, 0.3))'
                }}
              />
            </div>

            {/* Hero Title */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-yellow-400 via-white to-yellow-400 bg-clip-text text-transparent animate-gradient block mb-4">
                DLQuick
              </span>
              <span className="text-3xl md:text-4xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent block">
                {city === 'liverpool' 
                  ? 'Lightning Fast Delivery Across Liverpool' 
                  : 'From Store to Door in Record Time - London'
                }
              </span>
            </h1>

            {/* Hero Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              The UK's most comprehensive delivery platform. Food, groceries, parcels, removals, 
              business services, and everything in between — all delivered with lightning speed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={() => setActiveModal('services')}
                className="group relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-10 py-5 rounded-2xl text-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl min-w-[250px]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-2xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  🚀 Browse All Services
                </span>
              </button>
              
              <button 
                onClick={() => setActiveModal('tracking')}
                className="group relative bg-white/10 backdrop-blur-xl border border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-2xl min-w-[250px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-2xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  📱 Track Your Order
                </span>
              </button>
            </div>

            {/* Quick Service Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div 
                className="service-card p-6 cursor-pointer group" 
                onClick={() => openServiceModal('Food Delivery')}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🍔</div>
                <h3 className="text-lg font-semibold text-white mb-2">Food Delivery</h3>
                <p className="text-white/70 text-sm">Restaurants & takeaways in 30 min</p>
                <div className="mt-3 text-yellow-400 font-medium">From £3.99</div>
              </div>
              
              <div 
                className="service-card p-6 cursor-pointer group" 
                onClick={() => openServiceModal('Grocery Delivery')}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🛒</div>
                <h3 className="text-lg font-semibold text-white mb-2">Groceries</h3>
                <p className="text-white/70 text-sm">Fresh groceries same-day</p>
                <div className="mt-3 text-yellow-400 font-medium">From £4.99</div>
              </div>
              
              <div 
                className="service-card p-6 cursor-pointer group" 
                onClick={() => openServiceModal('Same-Day Delivery')}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📦</div>
                <h3 className="text-lg font-semibold text-white mb-2">Parcels</h3>
                <p className="text-white/70 text-sm">Same-day parcel delivery</p>
                <div className="mt-3 text-yellow-400 font-medium">From £5.99</div>
              </div>
              
              <div 
                className="service-card p-6 cursor-pointer group" 
                onClick={() => openServiceModal('Removals')}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🚚</div>
                <h3 className="text-lg font-semibold text-white mb-2">Removals</h3>
                <p className="text-white/70 text-sm">Home & office moving</p>
                <div className="mt-3 text-yellow-400 font-medium">From £299</div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-8 text-center group">
                <div className="text-5xl mb-4 group-hover:animate-bounce">👥</div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">50K+</div>
                <div className="text-white/80 text-lg">Happy Customers</div>
              </div>
              <div className="glass-card p-8 text-center group">
                <div className="text-5xl mb-4 group-hover:animate-bounce">🌍</div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">100+</div>
                <div className="text-white/80 text-lg">UK Cities</div>
              </div>
              <div className="glass-card p-8 text-center group">
                <div className="text-5xl mb-4 group-hover:animate-bounce">⚡</div>
                <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-white/80 text-lg">Lightning Support</div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-nav border-t border-white/20 mt-24">
        <div className="container mx-auto px-6 py-16">
          
          {/* Logo & Description */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/dlq-winged-clock-logo.svg" 
                alt="DLQuick" 
                className="w-16 h-16 drop-shadow-2xl animate-glow" 
              />
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-400 to-white bg-clip-text text-transparent">
                  DLQuick
                </h2>
                <p className="text-white/70 text-sm">Lightning Fast Delivery</p>
              </div>
            </div>
            <p className="text-white/80 max-w-3xl mx-auto text-lg">
              The UK's most comprehensive delivery platform. From groceries to parcels, 
              we deliver everything across the UK with speed and reliability you can trust.
            </p>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-white font-bold mb-6 text-lg">🚚 Services</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveModal('services')}
                  className="block text-white/70 hover:text-yellow-400 transition-colors mx-auto font-medium"
                >
                  All Services
                </button>
                <div className="text-white/70">Express Delivery</div>
                <div className="text-white/70">Grocery Shopping</div>
                <div className="text-white/70">Home Services</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold mb-6 text-lg">📱 Support</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveModal('tracking')}
                  className="block text-white/70 hover:text-yellow-400 transition-colors mx-auto font-medium"
                >
                  Track Order
                </button>
                <div className="text-white/70">Help Center</div>
                <div className="text-white/70">Contact Us</div>
                <div className="text-white/70">24/7 Support</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold mb-6 text-lg">🏢 Company</h3>
              <div className="space-y-3">
                <div className="text-white/70">About DLQuick</div>
                <div className="text-white/70">Careers</div>
                <div className="text-white/70">Press & Media</div>
                <div className="text-white/70">Partnerships</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold mb-6 text-lg">⚖️ Legal</h3>
              <div className="space-y-3">
                <div className="text-white/70">Privacy Policy</div>
                <div className="text-white/70">Terms of Service</div>
                <div className="text-white/70">Cookie Policy</div>
                <div className="text-white/70">GDPR Compliance</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/70 text-sm mb-4 md:mb-0">
                © 2025 DLQuick Ltd. All rights reserved. Lightning fast delivery across the UK.
              </p>
              <div className="flex items-center space-x-4 text-white/70 text-sm">
                <span>🌍 Available in 100+ UK Cities</span>
                <span>⚡ Average delivery: 30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Complete Services Modal with All Categories */}
      {activeModal === 'services' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">🚚 Complete Service Catalog</h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-light"
                >
                  ×
                </button>
              </div>
              
              {/* Category Filter Tabs */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`tab-button ${selectedCategory === 'all' ? 'active' : ''}`}
                >
                  🌟 All Services
                </button>
                {services.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`tab-button ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Service Categories with Photos */}
              {services
                .filter(category => selectedCategory === 'all' || category.id === selectedCategory)
                .map(category => (
                <div key={category.id} className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      {category.image && (
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-20 h-20 rounded-2xl object-cover shadow-xl"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="absolute -bottom-2 -right-2 text-3xl bg-white rounded-full p-2 shadow-lg">
                        {category.icon}
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-lg">{category.description}</p>
                    </div>
                  </div>

                  {/* Service Cards Grid with All Services */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map(service => (
                      <div key={service.id} className="service-card p-6 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl">{service.icon}</div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-yellow-600">{service.pricing}</div>
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mb-3">{service.name}</h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                        {/* Features List */}
                        <div className="space-y-2 mb-6">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-700">
                              <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setSelectedService(service.name);
                            setFormData({ ...formData, service: service.name });
                            setActiveModal('request');
                          }}
                          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          🚀 Request {service.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Loading state */}
              {services.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">🚚</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading Complete Service Catalog...</h3>
                  <p className="text-gray-600 text-lg">Please wait while we load all categories and services with photos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Service Request Modal */}
      {activeModal === 'request' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">🚀 Request {selectedService}</h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder={`Enter your ${city} address`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Details</label>
                  <textarea
                    name="details"
                    required
                    value={formData.details}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                    placeholder="Describe what you need delivered..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105"
                  >
                    🚀 Submit Request
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  We'll contact you within 15 minutes to confirm your order
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Tracking Modal */}
      {activeModal === 'tracking' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">📱 Track Your Order</h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {!trackingResult ? (
                <form onSubmit={handleTrackOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter tracking number (e.g., DLQ123456)"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200"
                    >
                      📱 Track Order
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Try these sample tracking numbers:</p>
                    <div className="space-y-1">
                      <button 
                        type="button"
                        onClick={() => setTrackingNumber('DLQ123456')}
                        className="block w-full text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        DLQ123456 (In Transit)
                      </button>
                      <button 
                        type="button"
                        onClick={() => setTrackingNumber('DLQ789012')}
                        className="block w-full text-sm text-green-600 hover:text-green-800 font-medium"
                      >
                        DLQ789012 (Delivered)
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Order Status Header */}
                  <div className="text-center">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                      trackingResult.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      trackingResult.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trackingResult.status === 'Delivered' ? '✅' : 
                       trackingResult.status === 'In Transit' ? '🚚' : '❌'} {trackingResult.status}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">Order #{trackingNumber}</h3>
                    <p className="text-gray-600">{trackingResult.location}</p>
                    <p className="text-sm text-gray-500">Estimated delivery: {trackingResult.estimatedDelivery}</p>
                  </div>

                  {/* Progress Bar */}
                  {trackingResult.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{trackingResult.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${trackingResult.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Tracking Updates */}
                  {trackingResult.updates.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Tracking Updates</h4>
                      <div className="space-y-3">
                        {trackingResult.updates.map((update, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{update.status}</p>
                              <p className="text-xs text-gray-500">{update.time} - {update.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 space-y-2">
                    <button
                      onClick={() => setTrackingResult(null)}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200"
                    >
                      Track Another Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

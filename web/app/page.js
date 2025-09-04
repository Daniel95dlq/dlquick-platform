'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState('london'); // default
  const [bgImage, setBgImage] = useState('/london-background.svg');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
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

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Simple city detection based on coordinates
          const liverpoolLat = 53.4084;
          const liverpoolLng = -2.9916;
          const londonLat = 51.5074;
          const londonLng = -0.1278;
          
          // Calculate distance to both cities
          const distanceToLiverpool = Math.sqrt(
            Math.pow(latitude - liverpoolLat, 2) + Math.pow(longitude - liverpoolLng, 2)
          );
          const distanceToLondon = Math.sqrt(
            Math.pow(latitude - londonLat, 2) + Math.pow(longitude - londonLng, 2)
          );
          
          if (distanceToLiverpool < distanceToLondon) {
            setCity('liverpool');
            setBgImage('/liverpool-background.svg');
          } else {
            setCity('london');
            setBgImage('/london-background.svg');
          }
          
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Default to London
          setCity('london');
          setBgImage('/london-background.svg');
        }
      );
    }
  }, []);

  const openServiceModal = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, service: service });
    setShowServiceModal(true);
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate API call
    console.log('Service request:', formData);
    
    // Show success message
    alert(`Thank you ${formData.name}! Your ${formData.service} request has been submitted. We'll contact you within 15 minutes.`);
    
    closeServiceModal();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openTrackingModal = () => {
    setShowTrackingModal(true);
  };

  const closeTrackingModal = () => {
    setShowTrackingModal(false);
    setTrackingNumber('');
    setTrackingResult(null);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    
    // Simulate tracking lookup
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
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <img 
                src="/dlq-winged-clock-logo.svg" 
                alt="DLQuick" 
                className="w-10 h-10" 
              />
              <span className="text-xl font-bold text-white">DLQuick</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/services" className="text-gray-300 hover:text-white transition-colors duration-200">Services</a>
              <a href="/partners" className="text-gray-300 hover:text-white transition-colors duration-200">Partners</a>
              <a href="/track" className="text-gray-300 hover:text-white transition-colors duration-200">Track</a>
              <a href="/support" className="text-gray-300 hover:text-white transition-colors duration-200">Support</a>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full font-semibold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200">
                Get Started
              </button>
            </div>

          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section 
          className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.85), rgba(88, 28, 135, 0.85)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* City indicator */}
          <div className="absolute top-20 right-6 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">
              📍 {city.charAt(0).toUpperCase() + city.slice(1)}
            </span>
          </div>
          
          <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
            
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/dlq-winged-clock-logo.svg" 
                alt="DLQuick Winged Clock" 
                className="w-32 h-32 mx-auto animate-bounce" 
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                DLQuick
              </span>
              <br />
              <span className="text-4xl md:text-5xl text-blue-200">
                {city === 'liverpool' ? 'Lightning fast delivery across Liverpool' : 'From the store to your door in London'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              Ultra-fast delivery platform connecting the entire UK. Same-day deliveries, groceries, food, removals, and more — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200 shadow-lg">
                🚀 Get Started Now
              </button>
              <button 
                onClick={openTrackingModal}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200"
              >
                📱 Track Your Order
              </button>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              
              <div className="text-center group cursor-pointer" onClick={() => openServiceModal('Grocery Delivery')}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">🏪</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Grocery Delivery</h3>
                <p className="text-blue-200 text-sm">Fresh groceries in 30 minutes</p>
              </div>

              <div className="text-center group cursor-pointer" onClick={() => openServiceModal('Food Delivery')}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">🍕</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Food Delivery</h3>
                <p className="text-blue-200 text-sm">Your favorite meals delivered</p>
              </div>

              <div className="text-center group cursor-pointer" onClick={() => openServiceModal('Same-Day Delivery')}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Same-Day Delivery</h3>
                <p className="text-blue-200 text-sm">Packages delivered today</p>
              </div>

              <div className="text-center group cursor-pointer" onClick={() => openServiceModal('Removals')}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Removals</h3>
                <p className="text-blue-200 text-sm">Professional moving services</p>
              </div>

            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
                <div className="text-blue-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
                <div className="text-blue-200">UK Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-blue-200">Support</div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          
          {/* Logo & Description */}
          <div className="text-center mb-8">
            <a href="/" className="flex items-center justify-center space-x-2 mb-4">
              <img 
                src="/dlq-winged-clock-logo.svg" 
                alt="DLQuick" 
                className="w-10 h-10" 
              />
              <span className="text-2xl font-bold text-white">DLQuick</span>
            </a>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ultra-fast delivery platform connecting the UK. From your local store to your door in record time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <a href="/services/delivery" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Same-Day Delivery</a>
              <a href="/services/groceries" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Grocery Delivery</a>
              <a href="/services/business" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Business Services</a>
            </div>
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <a href="/about" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">About Us</a>
              <a href="/partners" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Partners</a>
              <a href="/careers" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Careers</a>
            </div>
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <a href="/support" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Help Center</a>
              <a href="/track" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Track Order</a>
              <a href="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Contact Us</a>
            </div>
            <div className="text-center">
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <a href="/legal/terms" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Terms of Service</a>
              <a href="/legal/privacy" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Privacy Policy</a>
              <a href="/legal/cookies" className="block text-gray-400 hover:text-white transition-colors duration-200 mb-2">Cookies</a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 DLQuick. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Order Tracking Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Track Your Order</h2>
                <button 
                  onClick={closeTrackingModal}
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
                        className="block w-full text-sm text-blue-600 hover:text-blue-800"
                      >
                        DLQ123456 (In Transit)
                      </button>
                      <button 
                        type="button"
                        onClick={() => setTrackingNumber('DLQ789012')}
                        className="block w-full text-sm text-green-600 hover:text-green-800"
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

      {/* Service Request Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Request {selectedService}</h2>
                <button 
                  onClick={closeServiceModal}
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
    </div>
  );
}

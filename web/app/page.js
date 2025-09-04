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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    service: '',
    details: ''
  });
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postcode: ''
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

  const handleAuthChange = (e) => {
    setAuthData({
      ...authData,
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

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email: authData.email });
    // Simulate login
    setUserProfile({
      name: 'John Smith',
      email: authData.email,
      membership: 'Premium',
      orders: 12
    });
    setIsLoggedIn(true);
    setActiveModal(null);
    alert('Welcome back! You are now logged in.');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (authData.password !== authData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Registration attempt:', authData);
    // Simulate registration
    setUserProfile({
      name: `${authData.firstName} ${authData.lastName}`,
      email: authData.email,
      membership: 'Standard',
      orders: 0
    });
    setIsLoggedIn(true);
    setActiveModal(null);
    alert('Account created successfully! Welcome to DLQuick!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    alert('You have been logged out successfully.');
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
      {/* Royal Blue Dynamic Background with City Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.9)), url('${bgImage}')`,
          zIndex: -2
        }}
      />
      
      {/* Chrome Gold Animated Gradient Overlay */}
      <div 
        className="fixed inset-0 opacity-70 animate-gradient"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 223, 0, 0.3) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
          zIndex: -1
        }}
      />

      {/* Royal Blue Header Navigation */}
      <header className="relative z-20 bg-blue-900/20 backdrop-blur-xl border-b border-yellow-400/30">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Chrome Gold Premium Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/dlq-premium-logo.svg" 
                  alt="DLQuick Premium Logo" 
                  className="w-16 h-16 drop-shadow-2xl animate-glow" 
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 40px rgba(255, 223, 0, 0.4))'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-transparent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  DLQuick
                </h1>
                <p className="text-xs text-yellow-200/90 font-medium">⚡ Royal Delivery Platform</p>
              </div>
            </div>

            {/* Royal Navigation Menu */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setActiveModal('services')}
                className="bg-blue-800/30 backdrop-blur-xl border border-yellow-400/50 text-yellow-300 hover:text-yellow-400 transition-all duration-300 font-medium px-4 py-2 rounded-xl"
              >
                🚚 All Services
              </button>
              <button 
                onClick={() => setActiveModal('tracking')}
                className="bg-blue-800/30 backdrop-blur-xl border border-yellow-400/50 text-yellow-300 hover:text-yellow-400 transition-all duration-300 font-medium px-4 py-2 rounded-xl"
              >
                📱 Track Order
              </button>
              
              {/* Royal User Authentication Section */}
              {isLoggedIn && userProfile ? (
                <div className="flex items-center space-x-4">
                  <div className="text-yellow-300 text-sm">
                    <div className="font-semibold">👤 {userProfile.name}</div>
                    <div className="text-yellow-200/70 text-xs">{userProfile.membership} Member</div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-800/30 backdrop-blur-xl border border-red-400/50 text-red-300 hover:text-red-400 transition-all duration-300 font-medium px-4 py-2 rounded-xl"
                  >
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setActiveModal('login')}
                    className="bg-blue-800/30 backdrop-blur-xl border border-yellow-400/50 text-yellow-300 hover:text-yellow-400 transition-all duration-300 font-medium px-4 py-2 rounded-xl"
                  >
                    🔐 Login
                  </button>
                  <button 
                    onClick={() => setActiveModal('register')}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-6 py-2 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg"
                  >
                    ✨ Register
                  </button>
                </div>
              )}
              
              <div className="hidden md:flex items-center space-x-2 text-yellow-200/80 text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                📍 {location || `${city.charAt(0).toUpperCase() + city.slice(1)}, UK`}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Premium Hero Section */}
      <main className="relative z-10 pt-16">
        <section className="container mx-auto px-6 py-20 text-center">
          
          <div className="max-w-6xl mx-auto">
            
            {/* Royal Chrome Gold Logo Display */}
            <div className="mb-16 relative">
              <div className="absolute inset-0 bg-yellow-400/10 backdrop-blur-xl rounded-full w-56 h-56 mx-auto animate-pulse opacity-40"></div>
              <img 
                src="/dlq-premium-logo.svg" 
                alt="DLQuick Premium Logo" 
                className="w-52 h-52 mx-auto relative z-10 drop-shadow-2xl animate-float" 
                style={{
                  filter: 'drop-shadow(0 0 50px rgba(255, 215, 0, 0.7)) drop-shadow(0 0 100px rgba(255, 223, 0, 0.5))'
                }}
              />
            </div>

            {/* Royal Hero Title */}
            <h1 className="text-7xl md:text-9xl font-bold mb-10">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-gradient block mb-6">
                DLQuick
              </span>
              <span className="text-3xl md:text-5xl bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent block">
                {city === 'liverpool' 
                  ? '👑 Royal Express Delivery Across Liverpool' 
                  : '⚡ Premium Royal Service - London Crown'
                }
              </span>
            </h1>

            {/* Royal Subtitle */}
            <p className="text-2xl md:text-3xl text-yellow-100/95 mb-16 max-w-5xl mx-auto leading-relaxed">
              The UK's most royal delivery platform. From premium dining to luxury services, 
              executive parcels to royal removals — all delivered with crown-level excellence.
            </p>

            {/* Royal Chrome Gold CTA Section */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-20">
              <button 
                onClick={() => setActiveModal('services')}
                className="group relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-12 py-6 rounded-3xl text-2xl font-bold hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-2xl min-w-[300px]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-3xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-4">
                  👑 Royal Services
                </span>
              </button>
              
              <button 
                onClick={() => setActiveModal('tracking')}
                className="group relative bg-blue-800/30 backdrop-blur-xl border-2 border-yellow-400/60 text-yellow-300 px-12 py-6 rounded-3xl text-2xl font-semibold hover:bg-blue-700/40 transition-all duration-300 shadow-2xl min-w-[300px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12 rounded-3xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-4">
                  📱 Track Royal Order
                </span>
              </button>
            </div>

            {/* Royal Service Showcase */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <div 
                className="service-card p-8 cursor-pointer group bg-blue-800/30 backdrop-blur-xl rounded-3xl border border-yellow-400/30 hover:bg-blue-700/40 hover:border-yellow-400/60 transition-all duration-300 shadow-xl" 
                onClick={() => openServiceModal('Gourmet Food Delivery')}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🍽️</div>
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Royal Dining</h3>
                <p className="text-blue-100 text-sm leading-relaxed">Premium restaurants & fine dining delivered with royal treatment</p>
                <div className="mt-4 text-yellow-400 font-bold text-lg">From £4.99</div>
              </div>
              
              <div 
                className="service-card p-8 cursor-pointer group bg-blue-800/30 backdrop-blur-xl rounded-3xl border border-yellow-400/30 hover:bg-blue-700/40 hover:border-yellow-400/60 transition-all duration-300 shadow-xl" 
                onClick={() => openServiceModal('Luxury Shopping')}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🛍️</div>
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Royal Shopping</h3>
                <p className="text-blue-100 text-sm leading-relaxed">Premium brands & boutique items with royal treatment</p>
                <div className="mt-4 text-yellow-400 font-bold text-lg">From £6.99</div>
              </div>
              
              <div 
                className="service-card p-8 cursor-pointer group bg-blue-800/30 backdrop-blur-xl rounded-3xl border border-yellow-400/30 hover:bg-blue-700/40 hover:border-yellow-400/60 transition-all duration-300 shadow-xl" 
                onClick={() => openServiceModal('Executive Parcels')}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📋</div>
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Royal Parcels</h3>
                <p className="text-blue-100 text-sm leading-relaxed">Executive parcel delivery with crown-level care</p>
                <div className="mt-4 text-yellow-400 font-bold text-lg">From £8.99</div>
              </div>
              
              <div 
                className="service-card p-8 cursor-pointer group bg-blue-800/30 backdrop-blur-xl rounded-3xl border border-yellow-400/30 hover:bg-blue-700/40 hover:border-yellow-400/60 transition-all duration-300 shadow-xl" 
                onClick={() => openServiceModal('Premium Removals')}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🏰</div>
                <h3 className="text-xl font-bold text-yellow-300 mb-3">Royal Moves</h3>
                <p className="text-blue-100 text-sm leading-relaxed">Premium moving services with royal excellence</p>
                <div className="mt-4 text-yellow-400 font-bold text-lg">From £399</div>
              </div>
            </div>

            {/* Royal Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="bg-blue-800/30 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-10 text-center group hover:bg-blue-700/40 transition-all duration-300 shadow-xl">
                <div className="text-6xl mb-6 group-hover:animate-bounce">👑</div>
                <div className="text-5xl font-bold text-yellow-400 mb-3">50K+</div>
                <div className="text-yellow-100 text-lg font-medium">Royal Customers</div>
              </div>
              <div className="bg-blue-800/30 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-10 text-center group hover:bg-blue-700/40 transition-all duration-300 shadow-xl">
                <div className="text-6xl mb-6 group-hover:animate-bounce">🌍</div>
                <div className="text-5xl font-bold text-yellow-400 mb-3">200+</div>
                <div className="text-yellow-100 text-lg font-medium">UK Cities</div>
              </div>
              <div className="bg-blue-800/30 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-10 text-center group hover:bg-blue-700/40 transition-all duration-300 shadow-xl">
                <div className="text-6xl mb-6 group-hover:animate-bounce">⚡</div>
                <div className="text-5xl font-bold text-yellow-400 mb-3">24/7</div>
                <div className="text-yellow-100 text-lg font-medium">Royal Concierge</div>
              </div>
              <div className="bg-blue-800/30 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-10 text-center group hover:bg-blue-700/40 transition-all duration-300 shadow-xl">
                <div className="text-6xl mb-6 group-hover:animate-bounce">🏆</div>
                <div className="text-5xl font-bold text-yellow-400 mb-3">99.9%</div>
                <div className="text-yellow-100 text-lg font-medium">Royal Satisfaction</div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Royal Footer */}
      <footer className="bg-blue-900/40 backdrop-blur-xl border-t border-yellow-400/30 mt-32">
        <div className="container mx-auto px-6 py-20">
          
          {/* Royal Logo & Description */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-6 mb-8">
              <img 
                src="/dlq-premium-logo.svg" 
                alt="DLQuick Royal" 
                className="w-20 h-20 drop-shadow-2xl animate-glow" 
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.6))'
                }}
              />
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  DLQuick Royal
                </h2>
                <p className="text-yellow-100 text-lg">👑 Royal Delivery Excellence</p>
              </div>
            </div>
            <p className="text-blue-100 max-w-4xl mx-auto text-xl leading-relaxed">
              The UK's most royal delivery platform. From crown-level services to premium dining, 
              we deliver with royal excellence across Britain with unmatched grace and reliability.
            </p>
          </div>

          {/* Royal Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="text-center">
              <h3 className="text-yellow-300 font-bold mb-8 text-xl">🚚 Royal Services</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveModal('services')}
                  className="block text-blue-100 hover:text-yellow-400 transition-colors mx-auto font-medium text-lg"
                >
                  All Royal Services
                </button>
                <div className="text-blue-200">Royal Delivery</div>
                <div className="text-blue-200">Crown Shopping</div>
                <div className="text-blue-200">Executive Services</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-yellow-300 font-bold mb-8 text-xl">👑 Royal Support</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveModal('tracking')}
                  className="block text-blue-100 hover:text-yellow-400 transition-colors mx-auto font-medium text-lg"
                >
                  Track Royal Order
                </button>
                <div className="text-blue-200">24/7 Royal Concierge</div>
                <div className="text-blue-200">Crown Priority Support</div>
                <div className="text-blue-200">Royal Helpdesk</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-yellow-300 font-bold mb-8 text-xl">🏢 Royal Company</h3>
              <div className="space-y-4">
                <div className="text-blue-200">About DLQuick Royal</div>
                <div className="text-blue-200">Royal Executive Team</div>
                <div className="text-blue-200">Press & Royal Media</div>
                <div className="text-blue-200">Crown Partnerships</div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-yellow-300 font-bold mb-8 text-xl">⚖️ Royal Legal</h3>
              <div className="space-y-4">
                <div className="text-blue-200">Royal Privacy Policy</div>
                <div className="text-blue-200">Crown Terms of Service</div>
                <div className="text-blue-200">Royal Cookie Policy</div>
                <div className="text-blue-200">Crown GDPR Compliance</div>
              </div>
            </div>
          </div>

          {/* Royal Bottom Bar */}
          <div className="border-t border-yellow-400/30 pt-10 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-blue-100 text-lg mb-6 md:mb-0">
                © 2025 DLQuick Royal Ltd. All crown rights reserved. Royal delivery excellence across the UK.
              </p>
              <div className="flex items-center space-x-6 text-yellow-100 text-lg">
                <span>🌍 Available in 200+ UK Cities</span>
                <span>⚡ Royal delivery: 25 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Royal Login Modal */}
      {activeModal === 'login' && (
        <div className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-800/90 to-blue-900/95 backdrop-blur-xl border border-yellow-400/30 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-yellow-300">🔐 Royal Welcome Back</h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-yellow-400 hover:text-yellow-300 text-3xl font-light"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={authData.email}
                    onChange={handleAuthChange}
                    className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Enter your royal email"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={authData.password}
                    onChange={handleAuthChange}
                    className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Enter your royal password"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 py-4 rounded-2xl text-xl font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    👑 Royal Login
                  </button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-blue-200">Don't have a royal account?</p>
                  <button
                    type="button"
                    onClick={() => setActiveModal('register')}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold text-lg"
                  >
                    Join Royal Members
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Royal Registration Modal */}
      {activeModal === 'register' && (
        <div className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-blue-800/90 to-blue-900/95 backdrop-blur-xl border border-yellow-400/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-yellow-300">✨ Join Royal DLQuick</h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-yellow-400 hover:text-yellow-300 text-3xl font-light"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={authData.firstName}
                      onChange={handleAuthChange}
                      className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                      placeholder="Your royal first name"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={authData.lastName}
                      onChange={handleAuthChange}
                      className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                      placeholder="Your royal last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={authData.email}
                    onChange={handleAuthChange}
                    className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="your.royal.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={authData.phone}
                    onChange={handleAuthChange}
                    className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="+44 7XXX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={authData.address}
                    onChange={handleAuthChange}
                    className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    placeholder="Your royal residence address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={authData.city}
                      onChange={handleAuthChange}
                      className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                      placeholder="London, Liverpool, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      required
                      value={authData.postcode}
                      onChange={handleAuthChange}
                      className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                      placeholder="SW1A 1AA"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-yellow-100 mb-2">Royal Password</label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={authData.password}
                      onChange={handleAuthChange}
                      className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                      placeholder="Create a royal password"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-yellow-100 mb-2">Confirm Royal Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={authData.confirmPassword}
                      onChange={handleAuthChange}
                      className="w-full px-6 py-4 bg-blue-800/30 border border-yellow-400/30 rounded-2xl text-lg text-yellow-100 placeholder-blue-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                      placeholder="Confirm your royal password"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 py-4 rounded-2xl text-xl font-bold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    👑 Create Royal Account
                  </button>
                </div>

                <div className="text-center pt-4">
                  <p className="text-blue-200">Already have a royal account?</p>
                  <button
                    type="button"
                    onClick={() => setActiveModal('login')}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold text-lg"
                  >
                    Royal Login Here
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Complete Services Modal with All Categories */}
      {activeModal === 'services' && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">🚚 Premium Service Catalog</h2>
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
                    {category.services && category.services.map(service => (
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
                          {service.features && service.features.map((feature, index) => (
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading Premium Service Catalog...</h3>
                  <p className="text-gray-600 text-lg">Please wait while we load all categories and services.</p>
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
                  {trackingResult.updates && trackingResult.updates.length > 0 && (
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

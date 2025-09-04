'use client';

import { useState } from 'react';

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockTrackingData = {
    'DLQ123456': {
      status: 'In Transit',
      location: 'London Central Hub',
      estimatedDelivery: '2:30 PM today',
      progress: 75,
      orderDetails: {
        orderNumber: 'DLQ123456',
        orderDate: '2025-09-04',
        customerName: 'John Smith',
        deliveryAddress: '123 Baker Street, London, NW1 6XE',
        items: 'Grocery delivery from Tesco'
      },
      updates: [
        { time: '10:00 AM', status: 'Order confirmed', location: 'Store pickup completed', icon: '✅' },
        { time: '10:45 AM', status: 'In transit', location: 'London delivery hub', icon: '🚚' },
        { time: '1:30 PM', status: 'Out for delivery', location: 'London courier van', icon: '🚐' },
        { time: '', status: 'Delivered', location: 'Your doorstep', icon: '📦', pending: true }
      ]
    },
    'DLQ789012': {
      status: 'Delivered',
      location: 'Delivered to doorstep',
      estimatedDelivery: 'Completed at 11:15 AM',
      progress: 100,
      orderDetails: {
        orderNumber: 'DLQ789012',
        orderDate: '2025-09-04',
        customerName: 'Sarah Johnson',
        deliveryAddress: '456 Queens Road, Liverpool, L1 1RX',
        items: 'Food delivery from Pizza Express'
      },
      updates: [
        { time: '9:00 AM', status: 'Order confirmed', location: 'Restaurant preparation', icon: '✅' },
        { time: '9:30 AM', status: 'Ready for pickup', location: 'Pizza Express Liverpool', icon: '🍕' },
        { time: '9:45 AM', status: 'In transit', location: 'Liverpool delivery hub', icon: '🚚' },
        { time: '11:15 AM', status: 'Delivered', location: 'Left at front door', icon: '📦' }
      ]
    },
    'DLQ345678': {
      status: 'Processing',
      location: 'Warehouse preparation',
      estimatedDelivery: '4:00 PM today',
      progress: 25,
      orderDetails: {
        orderNumber: 'DLQ345678',
        orderDate: '2025-09-04',
        customerName: 'Mike Wilson',
        deliveryAddress: '789 High Street, London, SW1A 1AA',
        items: 'Electronics delivery from Currys PC World'
      },
      updates: [
        { time: '2:00 PM', status: 'Order received', location: 'Processing center', icon: '📋' },
        { time: '2:15 PM', status: 'Items being prepared', location: 'Currys PC World warehouse', icon: '📦' },
        { time: '', status: 'Ready for dispatch', location: 'Awaiting courier assignment', icon: '🚚', pending: true },
        { time: '', status: 'Out for delivery', location: 'En route to destination', icon: '🚐', pending: true }
      ]
    }
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = mockTrackingData[trackingNumber] || {
      status: 'Not Found',
      location: 'Order not found in our system',
      estimatedDelivery: 'N/A',
      progress: 0,
      orderDetails: null,
      updates: []
    };

    setTrackingResult(result);
    setIsLoading(false);
  };

  const resetSearch = () => {
    setTrackingNumber('');
    setTrackingResult(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-400';
      case 'In Transit': return 'text-blue-400';
      case 'Out for delivery': return 'text-yellow-400';
      case 'Processing': return 'text-orange-400';
      default: return 'text-red-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/20 border-green-500/30';
      case 'In Transit': return 'bg-blue-500/20 border-blue-500/30';
      case 'Out for delivery': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'Processing': return 'bg-orange-500/20 border-orange-500/30';
      default: return 'bg-red-500/20 border-red-500/30';
    }
  };

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
              <a href="/partners" className="text-gray-300 hover:text-white transition-colors">Partners</a>
              <a href="/track" className="text-yellow-400 font-semibold">Track</a>
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Track Your Order
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Enter your tracking number to get real-time updates on your delivery status and estimated arrival time.
          </p>
        </div>

        {!trackingResult ? (
          // Search Form
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-white mb-3">Tracking Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white text-lg placeholder-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter tracking number (e.g., DLQ123456)"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                    Tracking your order...
                  </div>
                ) : (
                  '📱 Track Order'
                )}
              </button>
            </form>

            {/* Sample Tracking Numbers */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-4">Try these sample tracking numbers:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setTrackingNumber('DLQ123456')}
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                  disabled={isLoading}
                >
                  DLQ123456 (In Transit)
                </button>
                <button 
                  onClick={() => setTrackingNumber('DLQ789012')}
                  className="px-4 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                  disabled={isLoading}
                >
                  DLQ789012 (Delivered)
                </button>
                <button 
                  onClick={() => setTrackingNumber('DLQ345678')}
                  className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-lg hover:bg-orange-500/30 transition-colors"
                  disabled={isLoading}
                >
                  DLQ345678 (Processing)
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Tracking Results
          <div className="space-y-8">
            {/* Status Header */}
            <div className={`rounded-3xl p-8 border-2 ${getStatusBgColor(trackingResult.status)}`}>
              <div className="text-center">
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${getStatusColor(trackingResult.status)} bg-black/30`}>
                  {trackingResult.status === 'Delivered' ? '✅' : 
                   trackingResult.status === 'In Transit' ? '🚚' :
                   trackingResult.status === 'Out for delivery' ? '🚐' :
                   trackingResult.status === 'Processing' ? '⏳' : '❌'} {trackingResult.status}
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">Order #{trackingNumber}</h2>
                <p className="text-xl text-gray-300 mt-2">{trackingResult.location}</p>
                <p className="text-lg text-yellow-400 mt-1">Estimated delivery: {trackingResult.estimatedDelivery}</p>
              </div>

              {/* Progress Bar */}
              {trackingResult.progress > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between text-sm text-gray-300 mb-3">
                    <span>Progress</span>
                    <span>{trackingResult.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${trackingResult.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Details */}
            {trackingResult.orderDetails && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Order Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 text-sm">Order Date</p>
                    <p className="text-white font-semibold">{trackingResult.orderDetails.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm">Customer</p>
                    <p className="text-white font-semibold">{trackingResult.orderDetails.customerName}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-300 text-sm">Delivery Address</p>
                    <p className="text-white font-semibold">{trackingResult.orderDetails.deliveryAddress}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-300 text-sm">Items</p>
                    <p className="text-white font-semibold">{trackingResult.orderDetails.items}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tracking Timeline */}
            {trackingResult.updates.length > 0 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8">Tracking Updates</h3>
                <div className="space-y-6">
                  {trackingResult.updates.map((update, index) => (
                    <div key={index} className={`flex items-start space-x-4 ${update.pending ? 'opacity-50' : ''}`}>
                      <div className={`text-2xl ${update.pending ? 'grayscale' : ''}`}>{update.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-white">{update.status}</h4>
                          {update.time && (
                            <span className="text-sm text-gray-400">{update.time}</span>
                          )}
                        </div>
                        <p className="text-gray-300 mt-1">{update.location}</p>
                        {update.pending && (
                          <span className="text-xs text-yellow-400 mt-1 block">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={resetSearch}
                className="flex-1 bg-white/10 text-white py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
              >
                Track Another Order
              </button>
              <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 rounded-xl font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-200">
                Contact Support
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-white/10 backdrop-blur-lg rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-6">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">📞</div>
              <h4 className="text-lg font-semibold text-white mb-2">Call Us</h4>
              <p className="text-gray-300">0800 123 4567</p>
            </div>
            <div>
              <div className="text-4xl mb-3">💬</div>
              <h4 className="text-lg font-semibold text-white mb-2">Live Chat</h4>
              <p className="text-gray-300">Available 24/7</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📧</div>
              <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
              <p className="text-gray-300">support@dlquick.co.uk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

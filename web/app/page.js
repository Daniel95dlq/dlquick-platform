export default function Home() {
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
        <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            
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
                From the store to your door
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
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-200">
                📱 Track Your Order
              </button>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">🏪</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Grocery Delivery</h3>
                <p className="text-blue-200 text-sm">Fresh groceries in 30 minutes</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">🍕</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Food Delivery</h3>
                <p className="text-blue-200 text-sm">Your favorite meals delivered</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Same-Day Delivery</h3>
                <p className="text-blue-200 text-sm">Packages delivered today</p>
              </div>

              <div className="text-center group">
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
    </div>
  );
}

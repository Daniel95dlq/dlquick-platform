export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-amber-500/20"></div>
        
        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              DLQuick
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mt-4 font-light">
              Premium UK Delivery Platform
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Personal', desc: 'Individual deliveries' },
              { title: 'Business', desc: 'Corporate solutions' },
              { title: 'Groceries', desc: 'Fresh food delivery' },
              { title: 'Removals', desc: 'Moving services' },
              { title: 'Trades', desc: 'Professional services' },
              { title: 'Marketplace', desc: 'E-commerce delivery' }
            ].map((service, index) => (
              <div key={index} className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-blue-100 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 font-bold px-8 py-4 rounded-full text-lg hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-2xl">
              Start Your Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
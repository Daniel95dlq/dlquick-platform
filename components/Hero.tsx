import React from 'react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-[url('/dlq-hero.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/60 to-brand-navy/40" />
      
      {/* Main Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-brand-gold/10 backdrop-blur-sm" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Enhanced Logo with 3D effect */}
        <div className="mb-8 transform perspective-1000 hover:rotate-x-12 transition-transform duration-700">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 tracking-wider drop-shadow-2xl">
            DL<span className="text-brand-gold drop-shadow-lg animate-pulse">Quick</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto rounded-full shadow-lg shadow-brand-gold/50 pulse-glow" />
        </div>
        
        {/* Enhanced Glassmorphism description card */}
        <div className="glass-card max-w-3xl mx-auto mb-8 group hover:scale-105 transition-all duration-300">
          <p className="text-xl md:text-2xl text-gray-100 mb-4 leading-relaxed">
            Fast, reliable delivery and services across all of Australia. From groceries to removals, we&apos;ve got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-gold font-medium">
            <span className="glass px-4 py-2 rounded-full border border-brand-gold/30 hover:border-brand-gold/60 transition-all duration-300 hover:scale-110">
              ⚡ 24/7 Service
            </span>
            <span className="glass px-4 py-2 rounded-full border border-brand-gold/30 hover:border-brand-gold/60 transition-all duration-300 hover:scale-110">
              🌏 Australia Wide
            </span>
            <span className="glass px-4 py-2 rounded-full border border-brand-gold/30 hover:border-brand-gold/60 transition-all duration-300 hover:scale-110">
              👑 Premium Quality
            </span>
          </div>
        </div>
        
        {/* Enhanced 3D button with multiple layers */}
        <div className="relative group">
          <button className="relative bg-gradient-to-r from-brand-gold via-yellow-500 to-brand-gold hover:from-yellow-500 hover:via-brand-gold hover:to-yellow-500 text-brand-navy px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-500 transform hover:scale-110 hover:rotate-1 shadow-2xl shadow-brand-gold/40 border-2 border-brand-gold/50 hover:border-brand-gold overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <span className="text-2xl">🚀</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-2xl group-hover:from-white/50 transition-all duration-300" />
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-all duration-300" />
          </button>
        </div>
      </div>
      
      {/* Enhanced floating elements with improved animations */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 rounded-2xl floating-element backdrop-blur-sm border border-brand-gold/20 shadow-lg shadow-brand-gold/20" />
      <div className="absolute bottom-32 right-16 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl animate-bounce backdrop-blur-sm border border-white/20 shadow-lg" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-br from-brand-navy/40 to-brand-navy/20 rounded-full animate-ping backdrop-blur-sm border border-brand-navy/30" />
      <div className="absolute bottom-1/4 left-20 w-12 h-12 bg-gradient-to-br from-brand-gold/40 to-brand-gold/20 rounded-lg floating-element backdrop-blur-sm border border-brand-gold/30 rotate-45" />
      
      {/* Enhanced animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brand-gold rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/6 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/6 left-1/3 w-1 h-1 bg-brand-gold rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="glass px-3 py-2 rounded-full animate-bounce">
          <div className="w-1 h-6 bg-gradient-to-b from-transparent via-brand-gold to-transparent rounded-full" />
        </div>
      </div>
    </section>
  )
}
